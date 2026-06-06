import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Hash } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { PostCard } from '../components/post/PostCard';
export function TagDetailPage() {
  const { tag } = useParams();
  const [activeTab, setActiveTab] = useState<'latest' | 'top'>('latest');
  const [isFollowing, setIsFollowing] = useState(false);
  // Mock data based on the route param
  const tagName = tag ? tag.charAt(0).toUpperCase() + tag.slice(1) : 'Tag';
  const MOCK_POSTS = [
  {
    id: '1',
    author_id: '1',
    title: `The Future of ${tagName} in 2026`,
    slug: `future-of-${tag}-2026`,
    excerpt: `Exploring the latest trends in ${tagName} and how it's reshaping the industry.`,
    content: '...',
    cover_image_url:
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    status: 'published' as const,
    reading_time_minutes: 5,
    view_count: 1205,
    like_count: 342,
    comment_count: 28,
    published_at: '2026-05-15T10:00:00Z',
    created_at: '2026-05-10T10:00:00Z',
    author: {
      id: '1',
      username: 'alexdev',
      display_name: 'Alex Developer',
      avatar_url: 'https://i.pravatar.cc/150?u=alex',
      bio: '',
      website_url: null,
      twitter_url: null,
      github_url: null,
      linkedin_url: null,
      follower_count: 0,
      following_count: 0,
      post_count: 0,
      created_at: ''
    },
    tags: [
    {
      id: '1',
      name: tagName,
      slug: tag || ''
    }]

  },
  {
    id: '2',
    author_id: '2',
    title: `Advanced ${tagName} Patterns You Should Know`,
    slug: `advanced-${tag}-patterns`,
    excerpt: `Take your ${tagName} skills to the next level with these advanced techniques and patterns.`,
    content: '...',
    cover_image_url: null,
    status: 'published' as const,
    reading_time_minutes: 8,
    view_count: 8500,
    like_count: 1240,
    comment_count: 156,
    published_at: '2026-05-14T10:00:00Z',
    created_at: '2026-05-14T10:00:00Z',
    author: {
      id: '2',
      username: 'sarahcodes',
      display_name: 'Sarah Jenkins',
      avatar_url: 'https://i.pravatar.cc/150?u=sarah',
      bio: '',
      website_url: null,
      twitter_url: null,
      github_url: null,
      linkedin_url: null,
      follower_count: 0,
      following_count: 0,
      post_count: 0,
      created_at: ''
    },
    tags: [
    {
      id: '1',
      name: tagName,
      slug: tag || ''
    }]

  }];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tag Header */}
      <div className="bg-white dark:bg-surface-card-dark border border-gray-200 dark:border-gray-800 rounded-2xl p-8 mb-12 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-6">
          <Hash className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
          {tagName}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mb-8">
          Stories, tutorials, and discussions about {tagName}. Follow this tag
          to see more stories like this in your feed.
        </p>
        <div className="flex items-center gap-6 mb-8 text-sm text-gray-500">
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 dark:text-white text-lg">
              1,240
            </span>
            <span>Stories</span>
          </div>
          <div className="w-px h-8 bg-gray-200 dark:bg-gray-800" />
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 dark:text-white text-lg">
              4,500
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

      {/* Feed */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
          <h2 className="text-2xl font-bold font-serif">Stories</h2>
          <div className="flex gap-4 text-sm">
            <button
              onClick={() => setActiveTab('latest')}
              className={`font-medium pb-4 -mb-[17px] border-b-2 transition-colors ${activeTab === 'latest' ? 'text-gray-900 dark:text-white border-gray-900 dark:border-white' : 'text-gray-500 border-transparent hover:text-gray-900 dark:hover:text-white'}`}>
              
              Latest
            </button>
            <button
              onClick={() => setActiveTab('top')}
              className={`font-medium pb-4 -mb-[17px] border-b-2 transition-colors ${activeTab === 'top' ? 'text-gray-900 dark:text-white border-gray-900 dark:border-white' : 'text-gray-500 border-transparent hover:text-gray-900 dark:hover:text-white'}`}>
              
              Top
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {MOCK_POSTS.map((post) =>
          <PostCard key={post.id} post={post} />
          )}
        </div>
      </div>
    </div>);

}