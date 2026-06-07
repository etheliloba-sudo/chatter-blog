import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { PostCard } from '../components/post/PostCard';
import type { Post } from '../types';
import { useAuth } from '../context/AuthContext';
import { getBookmarkedPosts, togglePostBookmark } from '../lib/engagement';
import { useEffect } from 'react';

export function BookmarksPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!user) {
        setBookmarkedPosts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        setBookmarkedPosts(await getBookmarkedPosts(user.id));
      } catch {
        setError('Unable to load your bookmarks right now.');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [user]);

  const handleRemoveBookmark = async (postId: string) => {
    if (!user) {
      return;
    }

    const previous = bookmarkedPosts;
    setUpdatingId(postId);
    setError(null);
    setBookmarkedPosts((current) => current.filter((post) => post.id !== postId));

    try {
      await togglePostBookmark(postId, user.id, false);
    } catch {
      setBookmarkedPosts(previous);
      setError('Unable to update bookmarks right now.');
    } finally {
      setUpdatingId(null);
    }
  };

  const tags = [
  'all',
  ...Array.from(
    new Set(bookmarkedPosts.flatMap((p) => p.tags?.map((t) => t.name) || []))
  )];

  const displayedPosts =
  filter === 'all' ?
  bookmarkedPosts :
  bookmarkedPosts.filter((p) => p.tags?.some((t) => t.name === filter));
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
          <Bookmark className="h-8 w-8 text-brand-600 dark:text-brand-400" />
          Bookmarks
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Stories you've saved to read later.
        </p>
      </div>

      {bookmarkedPosts.length > 0 &&
      <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) =>
        <button
          key={tag}
          onClick={() => setFilter(tag)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${filter === tag ? 'bg-brand-600 text-white' : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-brand-50 dark:hover:bg-brand-900/30'}`}>
          
              {tag === 'all' ? 'All Bookmarks' : tag}
            </button>
        )}
        </div>
      }

      <div className="space-y-6">
        {loading ?
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] py-16 text-center">
            <p className="text-[var(--color-text-secondary)]">Loading bookmarks...</p>
          </div> :
        error ?
        <div className="text-center py-16 bg-red-50 dark:bg-red-500/10 border border-red-300 dark:border-red-500/40 rounded-2xl">
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div> :
        !user ?
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] py-16 text-center">
            <p className="mb-4 text-[var(--color-text-secondary)]">Sign in to view your bookmarks.</p>
            <Link to="/login" className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
              Go to Sign In
            </Link>
          </div> :
        displayedPosts.length === 0 ?
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] py-16 text-center">
            <Bookmark className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              No bookmarks found
            </h3>

            <p className="text-[var(--color-text-secondary)]">
              {filter === 'all' ?
            "You haven't saved any stories yet." :
            `No bookmarks found for "${filter}".`}
            </p>
          </div> :

        displayedPosts.map((post) =>
        <div key={post.id} className="relative group">
              <PostCard post={post} />
              <button
            onClick={() => void handleRemoveBookmark(post.id)}
            disabled={updatingId === post.id}
            className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
            title="Remove bookmark">
            
                <Bookmark className="h-4 w-4 fill-current" />
              </button>
            </div>
        )
        }
      </div>
    </div>);

}