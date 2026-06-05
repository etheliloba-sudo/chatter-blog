// import React from 'react';
// import { PostCard } from '../components/post/PostCard';
// import { mockPosts, mockTags } from '../data/mockdata';
// import { Badge } from '../components/ui/Badge';


// export function HomePage() {
//   return (
//     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
//       <div className="flex flex-col lg:flex-row gap-12">
//         {/* Main Feed */}
//         <div className="flex-1">
//           <div className="mb-8 border-b border-[var(--color-border)] pb-4">
//             <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
//               For You
//             </h1>
//           </div>

//           <div className="flex flex-col gap-8">
//             {mockPosts.map((post) =>
//             <PostCard key={post.id} post={post} />
//             )}
//           </div>
//         </div>

//         {/* Sidebar */}
//         <aside className="w-full lg:w-80 shrink-0">
//           <div className="sticky top-24 flex flex-col gap-8">
//             <div className="rounded-2xl bg-[var(--color-surface)] p-6 border border-[var(--color-border)]">
//               <h2 className="font-bold text-[var(--color-text-primary)] mb-4">
//                 Discover more of what matters to you
//               </h2>
//               <div className="flex flex-wrap gap-2">
//                 {mockTags.map((tag) =>
//                 <Badge
//                   key={tag.id}
//                   variant="outline"
//                   className="cursor-pointer hover:bg-[var(--color-border)]">
                  
//                     {tag.name}
//                   </Badge>
//                 )}
//               </div>
//             </div>

//             <div className="text-sm text-[var(--color-text-secondary)]">
//               <p>Chatter is a place to write, read, and connect.</p>
//             </div>
//           </div>
//         </aside>
//       </div>
//     </div>);

// }

import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, Sparkles } from 'lucide-react';
import { PostCard } from '../components/post/PostCard';
import { mockPosts, mockTags } from '../data/mockdata';
import type { Post } from '../types';

const MOCK_FEED: Post[] = [
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
  status: 'published',
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
  },
  {
    id: '2',
    name: 'Frontend',
    slug: 'frontend'
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
  status: 'published',
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
    id: '3',
    name: 'Productivity',
    slug: 'productivity'
  },
  {
    id: '4',
    name: 'Vim',
    slug: 'vim'
  }]

}];

export function HomePage() {
  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <div className="flex-1 space-y-8">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
          <h1 className="text-2xl font-bold font-serif">Your Feed</h1>
          <div className="flex gap-4 text-sm">
            <button className="flex items-center gap-1 font-medium text-brand-600 dark:text-brand-400 border-b-2 border-brand-600 dark:border-brand-400 pb-4 -mb-[17px]">
              <Sparkles className="h-4 w-4" /> For You
            </button>
            <button className="flex items-center gap-1 font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 pb-4 -mb-[17px]">
              <Clock className="h-4 w-4" /> Following
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {mockPosts.map((post) =>
          <PostCard key={post.id} post={post} />
          )}
        </div>
      </div>

      <div className="w-full lg:w-80 space-y-8">
        <div className="bg-brand-50 dark:bg-brand-900/20 rounded-xl p-6 border border-brand-100 dark:border-brand-900/50">
          <h3 className="font-serif font-bold text-lg mb-2 text-brand-900 dark:text-brand-100">
            Write on Chatter
          </h3>
          <p className="text-sm text-brand-700 dark:text-brand-300 mb-4">
            Share your knowledge, connect with developers, and build your
            audience.
          </p>
          <Link
            to="/write"
            className="inline-block bg-brand-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-700 transition-colors">
            
            Start Writing
          </Link>
        </div>

        <div>
          <h3 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-4">
            <TrendingUp className="h-5 w-5 text-brand-500" /> Trending Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {mockTags.map((tag) =>
            <Link
              key={tag.id}
              to={`/tag/${tag.slug}`}
              className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-1.5 rounded-full text-sm transition-colors">
              
                {tag.name}
              </Link>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">
            Who to follow
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) =>
            <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                  src={`https://i.pravatar.cc/150?u=${i}`}
                  alt=""
                  className="w-10 h-10 rounded-full" />
                
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">User {i}</span>
                    <span className="text-xs text-gray-500">
                      Software Engineer
                    </span>
                  </div>
                </div>
                <button className="text-sm border border-gray-300 dark:border-gray-700 rounded-full px-3 py-1 hover:bg-gray-50 dark:hover:bg-gray-800">
                  Follow
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}