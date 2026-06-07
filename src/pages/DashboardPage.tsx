import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  Bookmark,
  FileText,
  Settings,
  Edit3,
  Trash2 } from
'lucide-react';
import { Badge } from '../components/ui/Badge';
export function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'posts' | 'stats' | 'bookmarks'>(
    'posts'
  );
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
        {activeTab === 'posts' &&
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
                <button className="-mb-[17px] border-b-2 border-[var(--color-text-primary)] pb-4 text-[var(--color-text-primary)]">
                  Drafts (2)
                </button>
                <button className="-mb-[17px] pb-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
                  Published (5)
                </button>
              </div>

              <div className="divide-y divide-[var(--color-border)]">
                {[1, 2].map((i) =>
              <div
                key={i}
                className="p-6 flex items-center justify-between group">
                
                    <div>
                      <h3 className="font-bold text-lg mb-1 group-hover:text-brand-600 transition-colors">
                        Untitled Draft {i}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                        <span>Last edited 2 days ago</span>
                        <span>·</span>
                        <Badge variant="default">Draft</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                    to={`/edit/${i}`}
                    className="rounded-md p-2 text-[var(--color-text-secondary)] hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/30">
                    
                        <Edit3 className="h-4 w-4" />
                      </Link>
                      <button className="rounded-md p-2 text-[var(--color-text-secondary)] hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
              )}
              </div>
            </div>
          </div>
        }

        {activeTab === 'stats' &&
        <div className="space-y-6">
            <h1 className="text-3xl font-serif font-bold text-[var(--color-text-primary)]">Stats</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <div className="mb-2 text-sm font-medium text-[var(--color-text-secondary)]">
                  Total Views
                </div>
                <div className="text-3xl font-bold text-[var(--color-text-primary)]">12.4k</div>
              </div>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <div className="mb-2 text-sm font-medium text-[var(--color-text-secondary)]">
                  Total Reads
                </div>
                <div className="text-3xl font-bold text-[var(--color-text-primary)]">8.2k</div>
              </div>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <div className="mb-2 text-sm font-medium text-[var(--color-text-secondary)]">
                  Followers
                </div>
                <div className="text-3xl font-bold text-[var(--color-text-primary)]">452</div>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-12 text-[var(--color-text-secondary)]">
              Chart visualization would go here
            </div>
          </div>
        }

        {activeTab === 'bookmarks' &&
        <div className="space-y-6">
            <h1 className="text-3xl font-serif font-bold text-[var(--color-text-primary)]">Bookmarks</h1>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-12 text-center text-[var(--color-text-secondary)]">
              You haven't bookmarked any stories yet.
            </div>
          </div>
        }
      </div>
    </div>);

}