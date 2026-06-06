import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  Bookmark,
  Share,
  MessageCircle,
  MoreHorizontal } from
'lucide-react';
import { PostHeader } from '../components/post/PostHeader';
import { PostContent } from '../components/post/PostContent';
import { PostAuthorCard } from '../components/post/PostAuthorCard';
import { CommentList } from '../components/post/CommentList';
import { PostCard } from '../components/post/PostCard';
import { Post } from '../types';


const MOCK_MARKDOWN = `
The landscape of frontend development is shifting rapidly. As we move deeper into 2026, the tools and paradigms we use to build user interfaces are evolving to meet the demands of increasingly complex web applications.

## The Rise of Intelligent Tooling

One of the most significant changes we've seen is the integration of AI directly into our development workflows. It's no longer just about autocomplete; we're talking about context-aware architectural suggestions and automated refactoring.

> "The best tools get out of your way and let you focus on the problem, not the boilerplate." — A wise developer

### Key Trends to Watch

1. **WebAssembly Mainstreaming**: Rust and Go are becoming first-class citizens in the frontend ecosystem.
2. **Edge Rendering**: Moving computation closer to the user is no longer a luxury, it's the baseline.
3. **Zero-JS by Default**: Frameworks that ship zero JavaScript to the client until interaction occurs are winning the performance wars.

Here's a quick example of how we might define a component in the new paradigm:

\`\`\`tsx
import { server } from '@framework/core';

export default async function UserProfile({ id }) {
  const user = await db.users.find(id);
  
  return (
    <div className="profile-card">
      <h2>{user.name}</h2>
      <InteractiveFollowButton userId={id} />
    </div>
  );
}
\`\`\`

As you can see, the boundary between client and server continues to blur. The focus is returning to standard HTML and CSS, augmented by JavaScript only where necessary.

![A futuristic workspace](https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80)

The future is bright, and it's rendering faster than ever.
`;
const MOCK_POST: Post = {
  id: '1',
  author_id: '1',
  title: 'The Future of Frontend Development in 2026',
  slug: 'future-of-frontend-2026',
  excerpt:
  'Exploring the latest trends in React, WebAssembly, and AI-assisted development tools that are reshaping how we build user interfaces.',
  content: MOCK_MARKDOWN,
  cover_image_url:
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
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
    bio: 'Software engineer and writer. Passionate about web technologies, UI design, and building great user experiences.',
    website_url: 'https://alex.dev',
    twitter_url: 'https://twitter.com/alexdev',
    github_url: 'https://github.com/alexdev',
    linkedin_url: null,
    follower_count: 1240,
    following_count: 85,
    post_count: 12,
    created_at: '2025-01-01T00:00:00Z'
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
  },
  {
    id: '3',
    name: 'Web Dev',
    slug: 'web-dev'
  }]

};
export function PostPage() {
  const { username, slug } = useParams();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  return (
    <div className="relative flex justify-center max-w-7xl mx-auto">
      <div className="hidden md:flex flex-col items-center gap-6 sticky top-32 h-fit mr-12 lg:mr-24 shrink-0">
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => setLiked(!liked)}
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${liked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
            
            <Heart className={`h-6 w-6 ${liked ? 'fill-current' : ''}`} />
          </button>
          <span className="text-sm text-gray-500">
            {MOCK_POST.like_count + (liked ? 1 : 0)}
          </span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <a
            href="#comments"
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            
            <MessageCircle className="h-6 w-6" />
          </a>
          <span className="text-sm text-gray-500">
            {MOCK_POST.comment_count}
          </span>
        </div>

        <div className="w-8 h-px bg-gray-200 dark:bg-gray-800 my-2" />

        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${bookmarked ? 'text-brand-600 dark:text-brand-400' : 'text-gray-500 dark:text-gray-400'}`}>
          
          <Bookmark className={`h-6 w-6 ${bookmarked ? 'fill-current' : ''}`} />
        </button>

        <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Share className="h-6 w-6" />
        </button>

        <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <MoreHorizontal className="h-6 w-6" />
        </button>
      </div>

      {/* Main Content Column */}
      <article className="w-full max-w-3xl min-w-0 px-4 sm:px-0 pb-24 md:pb-12">
        <PostHeader post={MOCK_POST} />
        <PostContent content={MOCK_POST.content} />
        <PostAuthorCard author={MOCK_POST.author!} />
        <CommentList />
      </article>

      {/* Right Sidebar (Desktop lg+) */}
      <aside className="hidden lg:block w-80 ml-12 shrink-0 space-y-10 sticky top-32 h-fit">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">
            More from {MOCK_POST.author?.display_name}
          </h3>
          <div className="space-y-4">
            {[1, 2].map((i) =>
            <div key={i} className="group cursor-pointer">
                <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 line-clamp-2 mb-1">
                  Designing with Tailwind CSS: A Comprehensive Guide
                </h4>
                <p className="text-sm text-gray-500">8 min read</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">
            Related posts
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) =>
            <div
              key={i}
              className="group cursor-pointer flex gap-4 items-start">
              
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 line-clamp-2 mb-1 text-sm">
                    Why I Switched from VS Code to Neovim
                  </h4>
                  <p className="text-xs text-gray-500">Sarah Jenkins</p>
                </div>
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-md shrink-0 overflow-hidden">
                  <img
                  src={`https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=150&q=80&sig=${i}`}
                  alt=""
                  className="w-full h-full object-cover" />
                
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 p-3 flex items-center justify-around z-40">
        <button
          onClick={() => setLiked(!liked)}
          className={`p-2 flex items-center gap-2 ${liked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
          
          <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
          <span className="text-sm">
            {MOCK_POST.like_count + (liked ? 1 : 0)}
          </span>
        </button>
        <a
          href="#comments"
          className="p-2 flex items-center gap-2 text-gray-500 dark:text-gray-400">
          
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm">{MOCK_POST.comment_count}</span>
        </a>
        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`p-2 ${bookmarked ? 'text-brand-600 dark:text-brand-400' : 'text-gray-500 dark:text-gray-400'}`}>
          
          <Bookmark className={`h-5 w-5 ${bookmarked ? 'fill-current' : ''}`} />
        </button>
        <button className="p-2 text-gray-500 dark:text-gray-400">
          <Share className="h-5 w-5" />
        </button>
      </div>
    </div>);

}