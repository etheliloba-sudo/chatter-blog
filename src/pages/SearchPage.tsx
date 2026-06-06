import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { PostCard } from '../components/post/PostCard';
export function SearchPage() {
  const [query, setQuery] = useState('');
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-serif font-bold">Explore Chatter</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Search for posts, tags, or people
        </p>

        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-14 pl-12 pr-4 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-card-dark focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm text-lg" />
          
        </div>
      </div>

      {query ?
      <div className="space-y-6">
          <h2 className="text-xl font-bold">Results for "{query}"</h2>
          <div className="text-gray-500 py-12 text-center">
            Mock search results would appear here.
          </div>
        </div> :

      <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="font-bold text-lg border-b border-gray-100 dark:border-gray-800 pb-2">
              Popular Topics
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
            'Technology',
            'Programming',
            'Design',
            'Productivity',
            'Career',
            'Startups'].
            map((topic) =>
            <span
              key={topic}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
              
                  {topic}
                </span>
            )}
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="font-bold text-lg border-b border-gray-100 dark:border-gray-800 pb-2">
              Featured Writers
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) =>
            <div key={i} className="flex items-center gap-3">
                  <img
                src={`https://i.pravatar.cc/150?u=writer${i}`}
                alt=""
                className="w-10 h-10 rounded-full" />
              
                  <div>
                    <div className="font-medium text-sm">
                      Featured Writer {i}
                    </div>
                    <div className="text-xs text-gray-500">
                      Top writer in Technology
                    </div>
                  </div>
                </div>
            )}
            </div>
          </div>
        </div>
      }
    </div>);

}