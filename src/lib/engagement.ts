import type { Post, PostComment, Profile } from '../types';
import { supabase } from './supabase';
import { getPublishedPosts } from './content';

type CommentRow = {
  id: string;
  post_id: string;
  author_id: string;
  parent_id: string | null;
  content: string;
  created_at: string;
  depth?: number | null;
};

function toCommentAuthor(profile: Profile | undefined): PostComment['author'] {
  return {
    username: profile?.username ?? 'unknown',
    display_name: profile?.display_name ?? 'Unknown user',
    avatar_url: profile?.avatar_url ?? null
  };
}

export async function getPostInteractionState(postId: string, userId: string) {
  const [likeResult, bookmarkResult] = await Promise.all([
    supabase
      .from('likes')
      .select('post_id')
      .eq('user_id', userId)
      .eq('post_id', postId)
      .maybeSingle(),
    supabase
      .from('bookmarks')
      .select('post_id')
      .eq('user_id', userId)
      .eq('post_id', postId)
      .maybeSingle()
  ]);

  if (likeResult.error) {
    throw likeResult.error;
  }

  if (bookmarkResult.error) {
    throw bookmarkResult.error;
  }

  return {
    liked: Boolean(likeResult.data),
    bookmarked: Boolean(bookmarkResult.data)
  };
}

export async function togglePostLike(postId: string, userId: string, shouldLike: boolean) {
  const query = shouldLike
    ? supabase.from('likes').insert({ user_id: userId, post_id: postId })
    : supabase.from('likes').delete().eq('user_id', userId).eq('post_id', postId);

  const { error } = await query;
  if (error) {
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
    : supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', userId)
        .eq('post_id', postId);

  const { error } = await query;
  if (error) {
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

  if (error) {
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
    ? supabase
        .from('follows')
        .insert({ follower_id: userId, following_id: targetUserId })
    : supabase
        .from('follows')
        .delete()
        .eq('follower_id', userId)
        .eq('following_id', targetUserId);

  const { error } = await query;
  if (error) {
    throw error;
  }
}

export async function getCommentsForPost(postId: string): Promise<PostComment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('id, post_id, author_id, parent_id, content, created_at, depth')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) {
    throw error;
  }

  const rows = (data ?? []) as CommentRow[];
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

  const repliesByParentId = new Map<string, PostComment[]>();
  const topLevel: PostComment[] = [];

  for (const row of rows) {
    const comment: PostComment = {
      id: row.id,
      post_id: row.post_id,
      author_id: row.author_id,
      parent_id: row.parent_id,
      content: row.content,
      created_at: row.created_at,
      like_count: 0,
      author: toCommentAuthor(profilesById.get(row.author_id)),
      replies: []
    };

    if (row.parent_id) {
      const current = repliesByParentId.get(row.parent_id) ?? [];
      current.push(comment);
      repliesByParentId.set(row.parent_id, current);
    } else {
      topLevel.push(comment);
    }
  }

  return topLevel.map((comment) => ({
    ...comment,
    replies: repliesByParentId.get(comment.id) ?? []
  }));
}

export async function createComment(params: {
  postId: string;
  authorId: string;
  content: string;
  parentId?: string | null;
  profile: Profile;
}): Promise<PostComment> {
  const { postId, authorId, content, parentId, profile } = params;
  const { data, error } = await supabase
    .from('comments')
    .insert({
      post_id: postId,
      author_id: authorId,
      parent_id: parentId ?? null,
      content,
      depth: parentId ? 1 : 0
    })
    .select('id, post_id, author_id, parent_id, content, created_at')
    .single();

  if (error) {
    throw error;
  }

  const row = data as CommentRow;
  return {
    id: row.id,
    post_id: row.post_id,
    author_id: row.author_id,
    parent_id: row.parent_id,
    content: row.content,
    created_at: row.created_at,
    like_count: 0,
    author: toCommentAuthor(profile),
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

  const posts = await getPublishedPosts(100);
  return posts.filter((post) => postIds.includes(post.id));
}
