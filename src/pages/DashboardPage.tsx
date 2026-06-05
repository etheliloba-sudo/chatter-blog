import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Edit, Trash2, Globe, Archive } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockPosts } from '../data/mockdata';
import { Button } from '../components/ui/Button';
import { PostStatusBadge } from '../components/editor/PostStatusBadge';

type Tab = 'published' | 'draft' | 'archived';


export function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('published');
  if (!user) return null;
  const userPosts = mockPosts.filter((p) => p.author_id === user.id);
  const filteredPosts = userPosts.filter((p) => p.status === activeTab);
  const tabs: {
    id: Tab;
    label: string;
  }[] = [
  {
    id: 'published',
    label: 'Published'
  },
  {
    id: 'draft',
    label: 'Drafts'
  },
  {
    id: 'archived',
    label: 'Archived'
  }];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="font-serif text-3xl font-bold text-(--color-text-primary)">
          Your Stories
        </h1>
        <Link to="/write">
          <Button>Write a story</Button>
        </Link>
      </div>

      <div className="border-b border-(--color-border) mb-6">
        <nav className="-mb-px flex gap-6">
          {tabs.map((tab) =>
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-(--color-text-secondary) hover:border-(--color-border) hover:text-(--color-text-primary)'}`}>
            
              {tab.label} ({userPosts.filter((p) => p.status === tab.id).length}
              )
            </button>
          )}
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        {filteredPosts.length > 0 ?
        filteredPosts.map((post) =>
        <div
          key={post.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-(--color-border) bg-(--color-surface) p-4 sm:p-6 transition-colors hover:border-primary/30">
          
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <PostStatusBadge status={post.status} />
                  <span className="text-sm text-(--color-text-secondary)">
                    {post.updated_at ?
                `Last edited ${formatDistanceToNow(new Date(post.updated_at))} ago` :
                ''}
                  </span>
                </div>
                <Link to={`/edit/${post.id}`} className="block">
                  <h2 className="text-xl font-bold text-(--color-text-primary) truncate hover:text-primary transition-colors">
                    {post.title || 'Untitled Draft'}
                  </h2>
                </Link>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link to={`/edit/${post.id}`}>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Edit className="h-4 w-4" /> Edit
                  </Button>
                </Link>
                {post.status === 'published' &&
            <Link to={`/@${user.email?.split('@')[0]}/${post.slug}`}>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Globe className="h-4 w-4" /> View
                    </Button>
                  </Link>
            }
                <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
              
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
        ) :

        <div className="text-center py-12 rounded-xl border border-dashed border-(--color-border)">
            <p className="text-(--color-text-secondary)">
              No {activeTab} stories found.
            </p>
            {activeTab === 'draft' &&
          <Link
            to="/write"
            className="mt-4 inline-block text-primary hover:underline">
            
                Start writing your first draft
              </Link>
          }
          </div>
        }
      </div>
    </div>);

}