import type { Post, PostComment, Profile, Tag } from '../types';
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
  content?: string | null;
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

const POST_LIST_SELECT =
  'id, author_id, title, slug, excerpt, cover_image_url, status, reading_time_minutes, view_count, like_count, comment_count, bookmark_count, published_at, created_at, updated_at';

const POST_DETAIL_SELECT = `${POST_LIST_SELECT}, content`;

function withDefaultPostValues(row: PostRow): Post {
  return {
    ...row,
    content: row.content ?? '',
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

  const { data, error } = await supabase
    .from('post_tags')
    .select('tag_id');

  if (error) {
    throw error;
  }

  const targetTagIds = new Set(tags.map((tag) => tag.id));
  const counts = new Map<string, number>();
  for (const row of data ?? []) {
    if (!targetTagIds.has(row.tag_id)) {
      continue;
    }

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
    for (const row of tagsResult.data as Array<{ post_id: string; tags: TagRow | TagRow[] | null }>) {
      const tagValue = Array.isArray(row.tags) ? row.tags[0] : row.tags;
      if (!tagValue) {
        continue;
      }

      const current = tagsByPostId.get(row.post_id) ?? [];
      current.push(normalizeTag(tagValue));
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
    .select(POST_LIST_SELECT)
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
    .select('id, name, slug, description, post_count')
    .limit(Math.max(limit * 3, limit));

  if (error) {
    throw error;
  }

  const initialTags = ((data ?? []) as TagRow[]).map(normalizeTag);
  const hasStoredCounts = initialTags.some((tag) => tag.post_count > 0);
  const tagsWithCounts = hasStoredCounts ? initialTags : await attachTagCounts(initialTags);

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
    .select('id, name, slug, description, post_count')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  const normalized = normalizeTag(data as TagRow);
  if (normalized.post_count > 0) {
    return normalized;
  }

  const [tag] = await attachTagCounts([normalized]);
  return tag ?? normalized;
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
    .select(POST_LIST_SELECT)
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
    .select(POST_LIST_SELECT)
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
    .select(POST_LIST_SELECT)
    .eq('author_id', authorId)
    .eq('status', 'published')
    .order('published_at', { ascending: false, nullsFirst: false });

  if (error) {
    throw error;
  }

  return hydratePosts((data ?? []) as PostRow[]);
}

export async function getPostsByAuthor(authorId: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(POST_LIST_SELECT)
    .eq('author_id', authorId)
    .order('updated_at', { ascending: false });

  if (error) {
    throw error;
  }

  return hydratePosts((data ?? []) as PostRow[]);
}

function isMissingColumnError(error: unknown): boolean {
  if (!error || typeof error !== 'object') {
    return false;
  }

  const maybeError = error as { code?: string; message?: string };
  return (
    maybeError.code === '42703' ||
    Boolean(
      maybeError.message &&
        maybeError.message.toLowerCase().includes('does not exist')
    )
  );
}

function extractCommentContent(row: { content?: string; body?: string }): string {
  return row.content ?? row.body ?? '';
}

export async function getPostInteractionState(postId: string, userId: string) {
  const { data: likeData, error: likeError } = await supabase
    .from('likes')
    .select('post_id')
    .eq('user_id', userId)
    .eq('post_id', postId)
    .maybeSingle();

  if (likeError && !isMissingColumnError(likeError)) {
    throw likeError;
  }

  const { data: bookmarkData, error: bookmarkError } = await supabase
    .from('bookmarks')
    .select('post_id')
    .eq('user_id', userId)
    .eq('post_id', postId)
    .maybeSingle();

  if (bookmarkError && !isMissingColumnError(bookmarkError)) {
    throw bookmarkError;
  }

  return {
    liked: Boolean(likeData),
    bookmarked: Boolean(bookmarkData)
  };
}

export async function togglePostLike(postId: string, userId: string, shouldLike: boolean) {
  const query = shouldLike
    ? supabase.from('likes').insert({ user_id: userId, post_id: postId })
    : supabase.from('likes').delete().eq('user_id', userId).eq('post_id', postId);

  const { error } = await query;
  if (error && !isMissingColumnError(error)) {
    throw error;
  }
}

export async function togglePostBookmark(
  postId: string,
  userId: string,
  shouldBookmark: boolean
) {
  const query = shouldBookmark
    ? supabase.from('bookmarks').insert({ user_id: userId, post_id: postId })
    : supabase.from('bookmarks').delete().eq('user_id', userId).eq('post_id', postId);

  const { error } = await query;
  if (error && !isMissingColumnError(error)) {
    throw error;
  }
}

export async function getFollowState(targetUserId: string, userId: string) {
  const { data, error } = await supabase
    .from('follows')
    .select('following_id')
    .eq('follower_id', userId)
    .eq('following_id', targetUserId)
    .maybeSingle();

  if (error && !isMissingColumnError(error)) {
    throw error;
  }

  return Boolean(data);
}

export async function toggleFollowUser(
  targetUserId: string,
  userId: string,
  shouldFollow: boolean
) {
  const query = shouldFollow
    ? supabase.from('follows').insert({ follower_id: userId, following_id: targetUserId })
    : supabase.from('follows').delete().eq('follower_id', userId).eq('following_id', targetUserId);

  const { error } = await query;
  if (error && !isMissingColumnError(error)) {
    throw error;
  }
}

export async function getCommentsForPost(postId: string): Promise<PostComment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('id, post_id, author_id, parent_id, body, created_at, depth')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) {
    throw error;
  }

  const rows = (data ?? []) as Array<{
    id: string;
    post_id: string;
    author_id: string;
    parent_id: string | null;
    body?: string;
    created_at: string;
  }>;

  const authorIds = [...new Set(rows.map((row) => row.author_id))];
  const profilesById = new Map<string, Profile>();

  if (authorIds.length > 0) {
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .in('id', authorIds);

    if (profilesError) {
      throw profilesError;
    }

    for (const profile of profiles ?? []) {
      profilesById.set(profile.id, profile as Profile);
    }
  }

  return rows.map((row) => ({
    id: row.id,
    post_id: row.post_id,
    author_id: row.author_id,
    parent_id: row.parent_id,
    content: extractCommentContent(row),
    created_at: row.created_at,
    like_count: 0,
    author: {
      username: profilesById.get(row.author_id)?.username ?? 'unknown',
      display_name: profilesById.get(row.author_id)?.display_name ?? 'Unknown user',
      avatar_url: profilesById.get(row.author_id)?.avatar_url ?? null
    },
    replies: []
  })) as Awaited<ReturnType<typeof getCommentsForPost>>;
}

export async function createComment(params: {
  postId: string;
  authorId: string;
  content: string;
  parentId?: string | null;
  profile: Profile;
}) {
  const { postId, authorId, content, parentId, profile } = params;
  const { data, error } = await supabase
    .from('comments')
    .insert({
      post_id: postId,
      author_id: authorId,
      parent_id: parentId ?? null,
      body: content,
      depth: parentId ? 1 : 0
    })
    .select('id, post_id, author_id, parent_id, body, created_at')
    .single();

  if (error) {
    throw error;
  }

  return {
    id: data.id,
    post_id: data.post_id,
    author_id: data.author_id,
    parent_id: data.parent_id,
    content: extractCommentContent(data),
    created_at: data.created_at,
    like_count: 0,
    author: {
      username: profile.username,
      display_name: profile.display_name,
      avatar_url: profile.avatar_url
    },
    replies: []
  };
}

export async function getBookmarkedPosts(userId: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from('bookmarks')
    .select('post_id')
    .eq('user_id', userId);

  if (error) {
    throw error;
  }

  const postIds = (data ?? []).map((row) => row.post_id);
  if (postIds.length === 0) {
    return [];
  }

  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select(POST_LIST_SELECT)
    .in('id', postIds)
    .eq('status', 'published');

  if (postsError) {
    throw postsError;
  }

  return hydratePosts((posts ?? []) as PostRow[]);
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
    .select(POST_DETAIL_SELECT)
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
