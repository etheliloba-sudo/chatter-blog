import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Hash } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { PostCard } from '../components/post/PostCard';
import type { Post, Tag } from '../types';
import { getPostsByTagSlug, getTagBySlug } from '../lib/content';

export function TagDetailPage() {
  const { tag } = useParams();
  const [activeTab, setActiveTab] = useState<'latest' | 'top'>('latest');
  const [isFollowing, setIsFollowing] = useState(false);
  const [tagDetails, setTagDetails] = useState<Tag | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tag) {
      return;
    }

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const [tagRow, postsRows] = await Promise.all([
          getTagBySlug(tag),
          getPostsByTagSlug(tag, activeTab)
        ]);

        setTagDetails(tagRow);
        setPosts(postsRows);
      } catch {
        setError('Unable to load this tag right now.');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [activeTab, tag]);

  const tagName = tagDetails?.name ?? (tag ? tag.charAt(0).toUpperCase() + tag.slice(1) : 'Tag');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12 flex flex-col items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-6">
          <Hash className="h-8 w-8" />
        </div>
        <h1 className="mb-4 text-4xl font-serif font-bold text-[var(--color-text-primary)]">
          {tagName}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mb-8">
          {tagDetails?.description ||
            `Stories, tutorials, and discussions about ${tagName}.`}
        </p>
        <div className="flex items-center gap-6 mb-8 text-sm text-gray-500">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-[var(--color-text-primary)]">
              {tagDetails?.post_count ?? posts.length}
            </span>
            <span>Stories</span>
          </div>
          <div className="w-px h-8 bg-gray-200 dark:bg-gray-800" />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-[var(--color-text-primary)]">
              --
            </span>
            <span>Followers</span>
          </div>
        </div>
        <Button
          variant={isFollowing ? 'outline' : 'primary'}
          size="lg"
          onClick={() => setIsFollowing(!isFollowing)}
          className="w-full sm:w-auto min-w-[160px]">
          
          {isFollowing ? 'Following' : 'Follow Tag'}
        </Button>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
          <h2 className="text-2xl font-bold font-serif">Stories</h2>
          <div className="flex gap-4 text-sm">
            <button
              onClick={() => setActiveTab('latest')}
              className={`-mb-[17px] border-b-2 pb-4 font-medium transition-colors ${activeTab === 'latest' ? 'border-[var(--color-text-primary)] text-[var(--color-text-primary)]' : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
              
              Latest
            </button>
            <button
              onClick={() => setActiveTab('top')}
              className={`-mb-[17px] border-b-2 pb-4 font-medium transition-colors ${activeTab === 'top' ? 'border-[var(--color-text-primary)] text-[var(--color-text-primary)]' : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
              
              Top
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {loading && (
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center text-[var(--color-text-secondary)]">
              Loading stories...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300">
              {error}
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center text-[var(--color-text-secondary)]">
              No stories published for this tag yet.
            </div>
          )}

          {!loading && posts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      </div>
    </div>);

}