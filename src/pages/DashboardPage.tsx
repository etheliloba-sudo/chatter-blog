import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  Bookmark,
  FileText,
  Settings,
  Edit3,
  Eye
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { PostCard } from '../components/post/PostCard';
import { useAuth } from '../context/AuthContext';
import { getPostsByAuthor } from '../lib/content';
import { getBookmarkedPosts } from '../lib/engagement';
import type { Post } from '../types';

export function DashboardPage() {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'posts' | 'stats' | 'bookmarks'>(
    'posts'
  );
  const [postFilter, setPostFilter] = useState<'drafts' | 'published'>('drafts');
  const [posts, setPosts] = useState<Post[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!user) {
        setPosts([]);
        setBookmarkedPosts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const [authorPosts, bookmarks] = await Promise.all([
          getPostsByAuthor(user.id),
          getBookmarkedPosts(user.id)
        ]);

        setPosts(authorPosts);
        setBookmarkedPosts(bookmarks);
      } catch {
        setError('Unable to load your dashboard right now.');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [user]);

  const { drafts, published, totalViews, totalLikes, totalComments, topPosts } = useMemo(() => {
    const draftPosts = posts.filter((post) => post.status === 'draft');
    const publishedPosts = posts.filter((post) => post.status === 'published');

    return {
      drafts: draftPosts,
      published: publishedPosts,
      totalViews: publishedPosts.reduce((sum, post) => sum + post.view_count, 0),
      totalLikes: publishedPosts.reduce((sum, post) => sum + post.like_count, 0),
      totalComments: publishedPosts.reduce((sum, post) => sum + post.comment_count, 0),
      topPosts: [...publishedPosts]
        .sort((left, right) => right.view_count - left.view_count)
        .slice(0, 5)
    };
  }, [posts]);

  const displayedStories = postFilter === 'drafts' ? drafts : published;

  const compactNumber = (value: number) =>
    new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(value);

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 md:flex-row">
      <div className="w-full md:w-64 shrink-0 space-y-1">
        <button
          onClick={() => setActiveTab('posts')}
          className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'posts' ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'}`}>
          
          <FileText className="h-5 w-5" /> Your Stories
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'stats' ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'}`}>
          
          <BarChart3 className="h-5 w-5" /> Stats
        </button>
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'bookmarks' ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'}`}>
          
          <Bookmark className="h-5 w-5" /> Bookmarks
        </button>
        <Link
          to="/settings"
          className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface)]">
          
          <Settings className="h-5 w-5" /> Settings
        </Link>
      </div>

      <div className="flex-1">
        {loading &&
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-[var(--color-text-secondary)]">
            Loading your dashboard...
          </div>
        }

        {!loading && error &&
          <div className="rounded-xl border border-red-300 bg-red-50 p-6 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300">
            {error}
          </div>
        }

        {!loading && !error && activeTab === 'posts' &&
        <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-serif font-bold text-[var(--color-text-primary)]">Your Stories</h1>
              <Link
              to="/write"
              className="bg-brand-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-700">
              
                Write a story
              </Link>
            </div>

            <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
              <div className="flex gap-4 border-b border-[var(--color-border)] p-4 text-sm font-medium">
                <button
                  onClick={() => setPostFilter('drafts')}
                  className={`-mb-[17px] border-b-2 pb-4 ${postFilter === 'drafts' ? 'border-[var(--color-text-primary)] text-[var(--color-text-primary)]' : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
                  Drafts ({drafts.length})
                </button>
                <button
                  onClick={() => setPostFilter('published')}
                  className={`-mb-[17px] border-b-2 pb-4 ${postFilter === 'published' ? 'border-[var(--color-text-primary)] text-[var(--color-text-primary)]' : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
                  Published ({published.length})
                </button>
              </div>

              <div className="divide-y divide-[var(--color-border)]">
                {displayedStories.map((post) =>
              <div
                key={post.id}
                className="p-6 flex items-center justify-between group">
                
                    <div>
                      <h3 className="font-bold text-lg mb-1 group-hover:text-brand-600 transition-colors">
                        {post.status === 'published' ?
                          <Link to={`/@${profile?.username ?? 'user'}/${post.slug}`}>{post.title}</Link> :
                          post.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                        <span>
                          {post.status === 'published' && post.published_at
                            ? `Published ${new Date(post.published_at).toLocaleDateString()}`
                            : `Last edited ${new Date(post.updated_at).toLocaleDateString()}`}
                        </span>
                        <span>·</span>
                        <Badge variant={post.status === 'published' ? 'outline' : 'default'}>
                          {post.status === 'published' ? 'Published' : 'Draft'}
                        </Badge>
                        {post.status === 'published' &&
                          <span className="inline-flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5" /> {post.view_count}
                          </span>
                        }
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                    to={`/edit/${post.id}`}
                    className="rounded-md p-2 text-[var(--color-text-secondary)] hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/30">
                    
                        <Edit3 className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
              )}

                {displayedStories.length === 0 &&
                  <div className="p-6 text-sm text-[var(--color-text-secondary)]">
                    {postFilter === 'drafts' ? 'No drafts yet.' : 'No published stories yet.'}
                  </div>
                }
              </div>
            </div>
          </div>
        }

        {!loading && !error && activeTab === 'stats' &&
        <div className="space-y-6">
            <h1 className="text-3xl font-serif font-bold text-[var(--color-text-primary)]">Stats</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <div className="mb-2 text-sm font-medium text-[var(--color-text-secondary)]">
                  Total Views
                </div>
                <div className="text-3xl font-bold text-[var(--color-text-primary)]">{compactNumber(totalViews)}</div>
              </div>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <div className="mb-2 text-sm font-medium text-[var(--color-text-secondary)]">
                  Total Likes
                </div>
                <div className="text-3xl font-bold text-[var(--color-text-primary)]">{compactNumber(totalLikes)}</div>
              </div>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <div className="mb-2 text-sm font-medium text-[var(--color-text-secondary)]">
                  Total Comments
                </div>
                <div className="text-3xl font-bold text-[var(--color-text-primary)]">{compactNumber(totalComments)}</div>
              </div>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <h2 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">Top performing posts</h2>
              <div className="space-y-3">
                {topPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/@${profile?.username ?? 'user'}/${post.slug}`}
                    className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-[var(--color-bg)]"
                  >
                    <span className="font-medium text-[var(--color-text-primary)] line-clamp-1">{post.title}</span>
                    <span className="text-sm text-[var(--color-text-secondary)]">{post.view_count.toLocaleString()} views</span>
                  </Link>
                ))}
                {topPosts.length === 0 &&
                  <p className="text-sm text-[var(--color-text-secondary)]">Publish stories to start seeing live stats.</p>
                }
              </div>
            </div>
          </div>
        }

        {!loading && !error && activeTab === 'bookmarks' &&
        <div className="space-y-6">
            <h1 className="text-3xl font-serif font-bold text-[var(--color-text-primary)]">Bookmarks</h1>
            {bookmarkedPosts.length === 0 ?
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-12 text-center text-[var(--color-text-secondary)]">
                You have not bookmarked any stories yet.
              </div> :
              <div className="space-y-4">
                {bookmarkedPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>}
          </div>
        }
      </div>
    </div>);

}