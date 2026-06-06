import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { PostCard } from '../components/post/PostCard';

export function BookmarksPage() {
  const [filter, setFilter] = useState('all');

  const bookmarkedPosts = [
  {
    id: '1',
    author_id: '1',
    title: 'The Future of Frontend Development in 2026',
    slug: 'future-of-frontend-2026',
    excerpt:
    'Exploring the latest trends in React, WebAssembly, and AI-assisted development tools that are reshaping how we build user interfaces.',
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
      name: 'React',
      slug: 'react'
    }]

  },
  {
    id: '2',
    author_id: '2',
    title: 'Why I Switched from VS Code to Neovim',
    slug: 'why-i-switched-to-neovim',
    excerpt:
    'A deep dive into my new terminal-based workflow and why I believe it makes me a faster, more focused developer.',
    content: '...',
    cover_image_url: null,
    status: 'published' as const,
    reading_time_minutes: 12,
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
      id: '4',
      name: 'Vim',
      slug: 'vim'
    }]

  }];

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
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === tag ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}>
          
              {tag === 'all' ? 'All Bookmarks' : tag}
            </button>
        )}
        </div>
      }

      <div className="space-y-6">
        {displayedPosts.length === 0 ?
        <div className="text-center py-16 bg-white dark:bg-surface-card-dark border border-gray-200 dark:border-gray-800 rounded-2xl">
            <Bookmark className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              No bookmarks found
            </h3>

            <p className="text-gray-500">
              {filter === 'all' ?
            "You haven't saved any stories yet." :
            `No bookmarks found for "${filter}".`}
            </p>
          </div> :

        displayedPosts.map((post) =>
        <div key={post.id} className="relative group">
              <PostCard post={post} />
              <button
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