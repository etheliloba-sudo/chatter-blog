import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hash, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
const MOCK_TAGS = [
{
  id: '1',
  name: 'React',
  slug: 'react',
  description: 'A JavaScript library for building user interfaces.',
  postCount: 1240,
  followerCount: 4500,
  trending: true
},
{
  id: '2',
  name: 'Frontend',
  slug: 'frontend',
  description:
  'Everything related to building the client side of web applications.',
  postCount: 3200,
  followerCount: 8200,
  trending: true
},
{
  id: '3',
  name: 'Web Dev',
  slug: 'web-dev',
  description: 'General web development topics, tutorials, and discussions.',
  postCount: 5600,
  followerCount: 12000,
  trending: false
},
{
  id: '4',
  name: 'TypeScript',
  slug: 'typescript',
  description: 'Typed JavaScript at Any Scale.',
  postCount: 890,
  followerCount: 3100,
  trending: true
},
{
  id: '5',
  name: 'CSS',
  slug: 'css',
  description: 'Cascading Style Sheets for styling web pages.',
  postCount: 1500,
  followerCount: 4200,
  trending: false
},
{
  id: '6',
  name: 'Career',
  slug: 'career',
  description: 'Advice, stories, and tips for navigating a career in tech.',
  postCount: 750,
  followerCount: 2800,
  trending: false
},
{
  id: '7',
  name: 'AI',
  slug: 'ai',
  description:
  'Artificial Intelligence, Machine Learning, and their impact on development.',
  postCount: 420,
  followerCount: 5600,
  trending: true
},
{
  id: '8',
  name: 'Design',
  slug: 'design',
  description: 'UI/UX design principles, tools, and case studies.',
  postCount: 1100,
  followerCount: 3800,
  trending: false
}];

export function TagsPage() {
  const [filter, setFilter] = useState<'trending' | 'popular' | 'all'>(
    'popular'
  );
  const displayedTags = [...MOCK_TAGS].sort((a, b) => {
    if (filter === 'trending')
    return a.trending === b.trending ? 0 : a.trending ? -1 : 1;
    if (filter === 'popular') return b.postCount - a.postCount;
    return a.name.localeCompare(b.name);
  });
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
      </div>

      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={() => setFilter('trending')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'trending' ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}>
          
          Trending
        </button>
        <button
          onClick={() => setFilter('popular')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'popular' ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}>
          
          Most Popular
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'all' ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}>
          
          A-Z
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedTags.map((tag) =>
        <div
          key={tag.id}
          className="bg-white dark:bg-surface-card-dark border border-gray-200 dark:border-gray-800 rounded-xl p-6 flex flex-col hover:shadow-md transition-shadow">
          
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
                  {tag.trending &&
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
                  {tag.postCount.toLocaleString()}
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