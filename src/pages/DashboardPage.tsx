import React, { useState } from 'react';
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
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0 space-y-1">
        <button
          onClick={() => setActiveTab('posts')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'posts' ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50'}`}>
          
          <FileText className="h-5 w-5" /> Your Stories
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'stats' ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50'}`}>
          
          <BarChart3 className="h-5 w-5" /> Stats
        </button>
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'bookmarks' ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50'}`}>
          
          <Bookmark className="h-5 w-5" /> Bookmarks
        </button>
        <Link
          to="/settings"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50 transition-colors">
          
          <Settings className="h-5 w-5" /> Settings
        </Link>
      </div>

      {/* Content Area */}
      <div className="flex-1">
        {activeTab === 'posts' &&
        <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-serif font-bold">Your Stories</h1>
              <Link
              to="/write"
              className="bg-brand-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-700">
              
                Write a story
              </Link>
            </div>

            <div className="bg-white dark:bg-surface-card-dark border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-800 p-4 flex gap-4 text-sm font-medium">
                <button className="text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white pb-4 -mb-[17px]">
                  Drafts (2)
                </button>
                <button className="text-gray-500 hover:text-gray-900 dark:text-gray-400 pb-4 -mb-[17px]">
                  Published (5)
                </button>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {[1, 2].map((i) =>
              <div
                key={i}
                className="p-6 flex items-center justify-between group">
                
                    <div>
                      <h3 className="font-bold text-lg mb-1 group-hover:text-brand-600 transition-colors">
                        Untitled Draft {i}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>Last edited 2 days ago</span>
                        <span>·</span>
                        <Badge variant="default">Draft</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                    to={`/edit/${i}`}
                    className="p-2 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-md dark:hover:bg-brand-900/30">
                    
                        <Edit3 className="h-4 w-4" />
                      </Link>
                      <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md dark:hover:bg-red-900/30">
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
            <h1 className="text-3xl font-serif font-bold">Stats</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-surface-card-dark border border-gray-200 dark:border-gray-800 p-6 rounded-xl">
                <div className="text-gray-500 text-sm font-medium mb-2">
                  Total Views
                </div>
                <div className="text-3xl font-bold">12.4k</div>
              </div>
              <div className="bg-white dark:bg-surface-card-dark border border-gray-200 dark:border-gray-800 p-6 rounded-xl">
                <div className="text-gray-500 text-sm font-medium mb-2">
                  Total Reads
                </div>
                <div className="text-3xl font-bold">8.2k</div>
              </div>
              <div className="bg-white dark:bg-surface-card-dark border border-gray-200 dark:border-gray-800 p-6 rounded-xl">
                <div className="text-gray-500 text-sm font-medium mb-2">
                  Followers
                </div>
                <div className="text-3xl font-bold">452</div>
              </div>
            </div>
            <div className="bg-white dark:bg-surface-card-dark border border-gray-200 dark:border-gray-800 p-12 rounded-xl flex items-center justify-center text-gray-500">
              Chart visualization would go here
            </div>
          </div>
        }

        {activeTab === 'bookmarks' &&
        <div className="space-y-6">
            <h1 className="text-3xl font-serif font-bold">Bookmarks</h1>
            <div className="text-gray-500 text-center py-12 bg-white dark:bg-surface-card-dark border border-gray-200 dark:border-gray-800 rounded-xl">
              You haven't bookmarked any stories yet.
            </div>
          </div>
        }
      </div>
    </div>);

}