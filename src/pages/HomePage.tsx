import React from 'react';
import { PostCard } from '../components/post/PostCard';
import { mockPosts, mockTags } from '../data/mockdata';
import { Badge } from '../components/ui/Badge';


export function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Feed */}
        <div className="flex-1">
          <div className="mb-8 border-b border-[var(--color-border)] pb-4">
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
              For You
            </h1>
          </div>

          <div className="flex flex-col gap-8">
            {mockPosts.map((post) =>
            <PostCard key={post.id} post={post} />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-80 shrink-0">
          <div className="sticky top-24 flex flex-col gap-8">
            <div className="rounded-2xl bg-[var(--color-surface)] p-6 border border-[var(--color-border)]">
              <h2 className="font-bold text-[var(--color-text-primary)] mb-4">
                Discover more of what matters to you
              </h2>
              <div className="flex flex-wrap gap-2">
                {mockTags.map((tag) =>
                <Badge
                  key={tag.id}
                  variant="outline"
                  className="cursor-pointer hover:bg-[var(--color-border)]">
                  
                    {tag.name}
                  </Badge>
                )}
              </div>
            </div>

            <div className="text-sm text-[var(--color-text-secondary)]">
              <p>Chatter is a place to write, read, and connect.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>);

}