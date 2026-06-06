import type { Post, Profile, Tag } from '../types';
import { supabase } from './supabase';

type TagRow = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  post_count?: number | null;
};

type PostRow = {
  id: string;
  author_id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  status: 'draft' | 'published' | 'archived';
  reading_time_minutes: number;
  view_count: number;
  like_count: number;
  comment_count: number;
  bookmark_count: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

function withDefaultPostValues(row: PostRow): Post {
  return {
    ...row,
    reading_time_minutes: row.reading_time_minutes ?? 1,
    view_count: row.view_count ?? 0,
    like_count: row.like_count ?? 0,
    comment_count: row.comment_count ?? 0,
    bookmark_count: row.bookmark_count ?? 0,
    excerpt: row.excerpt ?? null,
    cover_image_url: row.cover_image_url ?? null
  };
}

function normalizeTag(row: TagRow): Tag {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? null,
    post_count: row.post_count ?? 0
  };
}

async function attachTagCounts(tags: Tag[]): Promise<Tag[]> {
  if (tags.length === 0) {
    return [];
  }

  const tagIds = tags.map((tag) => tag.id);
  const { data, error } = await supabase
    .from('post_tags')
    .select('tag_id')
    .in('tag_id', tagIds);

  if (error) {
    throw error;
  }

  const counts = new Map<string, number>();
  for (const row of data ?? []) {
    const current = counts.get(row.tag_id) ?? 0;
    counts.set(row.tag_id, current + 1);
  }

  return tags.map((tag) => ({
    ...tag,
    post_count: counts.get(tag.id) ?? 0
  }));
}

async function hydratePosts(rows: PostRow[]): Promise<Post[]> {
  if (rows.length === 0) {
    return [];
  }

  const authorIds = [...new Set(rows.map((row) => row.author_id))];
  const postIds = rows.map((row) => row.id);

  const [profilesResult, tagsResult] = await Promise.all([
    supabase.from('profiles').select('*').in('id', authorIds),
    supabase
      .from('post_tags')
      .select('post_id, tags ( id, name, slug, description )')
      .in('post_id', postIds)
  ]);

  const profileById = new Map<string, Profile>();
  if (profilesResult.data) {
    for (const profile of profilesResult.data) {
      profileById.set(profile.id, profile as Profile);
    }
  }

  const tagsByPostId = new Map<string, Tag[]>();
  if (tagsResult.data) {
    for (const row of tagsResult.data as Array<{ post_id: string; tags: TagRow[] | null }>) {
      const firstTag = row.tags?.[0];
      if (!firstTag) {
        continue;
      }

      const current = tagsByPostId.get(row.post_id) ?? [];
      current.push(normalizeTag(firstTag));
      tagsByPostId.set(row.post_id, current);
    }
  }

  return rows.map((row) => {
    const post = withDefaultPostValues(row);
    return {
      ...post,
      author: profileById.get(row.author_id),
      tags: tagsByPostId.get(row.id) ?? []
    };
  });
}

export async function getPublishedPosts(limit = 20): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false, nullsFirst: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return hydratePosts((data ?? []) as PostRow[]);
}

export async function getTrendingTags(limit = 12): Promise<Tag[]> {
  const { data, error } = await supabase
    .from('tags')
    .select('id, name, slug, description')
    .limit(Math.max(limit * 3, limit));

  if (error) {
    throw error;
  }

  const tagsWithCounts = await attachTagCounts(
    ((data ?? []) as TagRow[]).map(normalizeTag)
  );

  return tagsWithCounts
    .sort((left, right) => {
      if (right.post_count !== left.post_count) {
        return right.post_count - left.post_count;
      }

      return left.name.localeCompare(right.name);
    })
    .slice(0, limit);
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const { data, error } = await supabase
    .from('tags')
    .select('id, name, slug, description')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  const [tag] = await attachTagCounts([normalizeTag(data as TagRow)]);
  return tag ?? null;
}

export async function getPostsByTagSlug(
  slug: string,
  sort: 'latest' | 'top' = 'latest'
): Promise<Post[]> {
  const tag = await getTagBySlug(slug);
  if (!tag) {
    return [];
  }

  const { data: postTags, error: postTagsError } = await supabase
    .from('post_tags')
    .select('post_id')
    .eq('tag_id', tag.id);

  if (postTagsError) {
    throw postTagsError;
  }

  const postIds = (postTags ?? []).map((item) => item.post_id);
  if (postIds.length === 0) {
    return [];
  }

  let query = supabase
    .from('posts')
    .select('*')
    .in('id', postIds)
    .eq('status', 'published')
    .limit(50);

  if (sort === 'top') {
    query = query.order('like_count', { ascending: false });
  } else {
    query = query.order('published_at', { ascending: false, nullsFirst: false });
  }

  const { data: posts, error: postsError } = await query;

  if (postsError) {
    throw postsError;
  }

  return hydratePosts((posts ?? []) as PostRow[]);
}

export async function searchPosts(query: string, limit = 20): Promise<Post[]> {
  const normalized = query.trim();
  if (!normalized) {
    return [];
  }

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .or(`title.ilike.%${normalized}%,excerpt.ilike.%${normalized}%,content.ilike.%${normalized}%`)
    .order('published_at', { ascending: false, nullsFirst: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return hydratePosts((data ?? []) as PostRow[]);
}

export async function getProfileByUsername(username: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (data as Profile | null) ?? null;
}

export async function getPublishedPostsByAuthor(authorId: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('author_id', authorId)
    .eq('status', 'published')
    .order('published_at', { ascending: false, nullsFirst: false });

  if (error) {
    throw error;
  }

  return hydratePosts((data ?? []) as PostRow[]);
}

export async function getPostByUsernameAndSlug(
  username: string,
  slug: string
): Promise<Post | null> {
  const profile = await getProfileByUsername(username);
  if (!profile) {
    return null;
  }

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('author_id', profile.id)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  const [post] = await hydratePosts([data as PostRow]);
  return post ?? null;
}
