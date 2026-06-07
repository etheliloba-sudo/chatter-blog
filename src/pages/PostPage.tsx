import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Heart,
  Bookmark,
  Share,
  MessageCircle,
  MoreHorizontal
} from 'lucide-react';
import { PostHeader } from '../components/post/PostHeader';
import { PostContent } from '../components/post/PostContent';
import { PostAuthorCard } from '../components/post/PostAuthorCard';
import { CommentList } from '../components/post/CommentList';
import { PostCard } from '../components/post/PostCard';
import type { Post } from '../types';
import { getPostByUsernameAndSlug, getPostsByTagSlug } from '../lib/content';
import { useAuth } from '../context/AuthContext';
import {
  getPostInteractionState,
  togglePostBookmark,
  togglePostLike
} from '../lib/engagement';

export function PostPage() {
  const { username: rawUsername, slug } = useParams();
  const username = rawUsername?.startsWith('@') ? rawUsername.slice(1) : rawUsername;
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [interactionError, setInteractionError] = useState<string | null>(null);

  useEffect(() => {
    if (!username || !slug) {
      return;
    }

    const load = async () => {
      setLoading(true);
      setError(null);
      setRelatedPosts([]);

      try {
        const postData = await getPostByUsernameAndSlug(username, slug);
        setPost(postData);

        if (postData?.tags?.[0]) {
          void (async () => {
            try {
              const relatedTag = postData.tags?.[0];
              if (!relatedTag) {
                return;
              }

              const related = await getPostsByTagSlug(relatedTag.slug, 'latest');
              setRelatedPosts(related.filter((item) => item.id !== postData.id).slice(0, 3));
            } catch {
              setRelatedPosts([]);
            }
          })();
        }
      } catch {
        setError('Unable to load this post right now.');
      } finally {
        setLoading(false);
      }
    };

    void load();
    window.scrollTo(0, 0);
  }, [slug, username]);

  useEffect(() => {
    if (!user || !post) {
      return;
    }

    const loadInteractions = async () => {
      try {
        const state = await getPostInteractionState(post.id, user.id);
        setLiked(state.liked);
        setBookmarked(state.bookmarked);
      } catch {
        setInteractionError('Some post actions are unavailable right now.');
      }
    };

    void loadInteractions();
  }, [post, user]);

  const handleLikeToggle = async () => {
    if (!user || !post) {
      return;
    }

    const nextValue = !liked;
    setLiked(nextValue);
    setPost((current) =>
      current
        ? {
            ...current,
            like_count: current.like_count + (nextValue ? 1 : -1)
          }
        : current
    );

    try {
      await togglePostLike(post.id, user.id, nextValue);
    } catch {
      setLiked(!nextValue);
      setPost((current) =>
        current
          ? {
              ...current,
              like_count: current.like_count + (nextValue ? -1 : 1)
            }
          : current
      );
      setInteractionError('Unable to update likes right now.');
    }
  };

  const handleBookmarkToggle = async () => {
    if (!user || !post) {
      return;
    }

    const nextValue = !bookmarked;
    setBookmarked(nextValue);
    setPost((current) =>
      current
        ? {
            ...current,
            bookmark_count: current.bookmark_count + (nextValue ? 1 : -1)
          }
        : current
    );

    try {
      await togglePostBookmark(post.id, user.id, nextValue);
    } catch {
      setBookmarked(!nextValue);
      setPost((current) =>
        current
          ? {
              ...current,
              bookmark_count: current.bookmark_count + (nextValue ? -1 : 1)
            }
          : current
      );
      setInteractionError('Unable to update bookmarks right now.');
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center text-[var(--color-text-secondary)]">
        Loading post...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl rounded-xl border border-red-300 bg-red-50 p-6 text-center text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300">
        {error}
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center">
        <h1 className="font-serif text-3xl font-bold text-[var(--color-text-primary)]">Post not found</h1>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">This post may be unpublished or unavailable.</p>
      </div>
    );
  }

  return (
    <div className="relative flex justify-center max-w-7xl mx-auto">
      <div className="hidden md:flex flex-col items-center gap-6 sticky top-32 h-fit mr-12 lg:mr-24 shrink-0">
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleLikeToggle}
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${liked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <Heart className={`h-6 w-6 ${liked ? 'fill-current' : ''}`} />
          </button>
          <span className="text-sm text-gray-500">{post.like_count}</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <a
            href="#comments"
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <MessageCircle className="h-6 w-6" />
          </a>
          <span className="text-sm text-gray-500">{post.comment_count}</span>
        </div>

        <div className="w-8 h-px bg-gray-200 dark:bg-gray-800 my-2" />

        <button
          onClick={handleBookmarkToggle}
          className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${bookmarked ? 'text-brand-600 dark:text-brand-400' : 'text-gray-500 dark:text-gray-400'}`}
        >
          <Bookmark className={`h-6 w-6 ${bookmarked ? 'fill-current' : ''}`} />
        </button>

        <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Share className="h-6 w-6" />
        </button>

        <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <MoreHorizontal className="h-6 w-6" />
        </button>
      </div>

      <article className="w-full max-w-3xl min-w-0 px-4 sm:px-0 pb-24 md:pb-12">
        {interactionError && (
          <div className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300">
            {interactionError}
          </div>
        )}
        <PostHeader post={post} />
        <PostContent content={post.content} />
        {post.author && <PostAuthorCard author={post.author} />}
        <CommentList postId={post.id} />
      </article>

      <aside className="hidden lg:block w-80 ml-12 shrink-0 space-y-10 sticky top-32 h-fit">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Related posts</h3>
          <div className="space-y-4">
            {relatedPosts.map((related) => (
              <PostCard key={related.id} post={related} />
            ))}
            {relatedPosts.length === 0 && (
              <p className="text-sm text-[var(--color-text-secondary)]">No related posts yet.</p>
            )}
          </div>
        </div>
      </aside>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-surface)] border-t border-[var(--color-border)] p-3 flex items-center justify-around z-40">
        <button
          onClick={handleLikeToggle}
          className={`p-2 flex items-center gap-2 ${liked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}
        >
          <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
          <span className="text-sm">{post.like_count}</span>
        </button>
        <a href="#comments" className="p-2 flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm">{post.comment_count}</span>
        </a>
        <button
          onClick={handleBookmarkToggle}
          className={`p-2 ${bookmarked ? 'text-brand-600 dark:text-brand-400' : 'text-gray-500 dark:text-gray-400'}`}
        >
          <Bookmark className={`h-5 w-5 ${bookmarked ? 'fill-current' : ''}`} />
        </button>
        <button className="p-2 text-gray-500 dark:text-gray-400">
          <Share className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
