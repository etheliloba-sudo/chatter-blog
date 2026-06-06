import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Hash, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
import type { Tag } from '../types';
import { getTrendingTags } from '../lib/content';

export function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [filter, setFilter] = useState<'trending' | 'popular' | 'all'>(
    'popular'
  );
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        setTags(await getTrendingTags(100));
      } catch {
        setError('Unable to load tags right now.');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const displayedTags = useMemo(() => {
    const filtered = tags.filter((tag) =>
      tag.name.toLowerCase().includes(search.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
      if (filter === 'trending' || filter === 'popular') {
        return b.post_count - a.post_count;
      }

      return a.name.localeCompare(b.name);
    });

    return sorted;
  }, [filter, search, tags]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
          Explore Tags
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover topics, follow your interests, and find the best stories on
          Chatter.
        </p>

        <div className="mx-auto mt-6 max-w-xl">
          <input
            type="text"
            placeholder="Filter tags"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-11 w-full rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={() => setFilter('trending')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'trending' ? 'bg-brand-600 text-white' : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-brand-50 dark:hover:bg-brand-900/30'}`}>
          
          Trending
        </button>
        <button
          onClick={() => setFilter('popular')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'popular' ? 'bg-brand-600 text-white' : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-brand-50 dark:hover:bg-brand-900/30'}`}>
          
          Most Popular
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'all' ? 'bg-brand-600 text-white' : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-brand-50 dark:hover:bg-brand-900/30'}`}>
          
          A-Z
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && (
          <div className="col-span-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center text-[var(--color-text-secondary)]">
            Loading tags...
          </div>
        )}

        {!loading && error && (
          <div className="col-span-full rounded-xl border border-red-300 bg-red-50 p-4 text-center text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && displayedTags.length === 0 && (
          <div className="col-span-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center text-[var(--color-text-secondary)]">
            No tags match your filter.
          </div>
        )}

        {displayedTags.map((tag) =>
        <div
          key={tag.id}
          className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 flex flex-col hover:shadow-md transition-shadow">
          
            <div className="flex items-start justify-between mb-4">
              <Link
              to={`/tag/${tag.slug}`}
              className="flex items-center gap-2 group">
              
                <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:bg-brand-100 dark:group-hover:bg-brand-900/50 transition-colors">
                  <Hash className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {tag.name}
                  </h3>
                  {tag.post_count >= 10 &&
                <span className="flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400">
                      <TrendingUp className="h-3 w-3" /> Trending
                    </span>
                }
                </div>
              </Link>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1 line-clamp-2">
              {tag.description}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {tag.post_count.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500">Stories</span>
              </div>
              <Button variant="outline" size="sm">
                Follow
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>);

}