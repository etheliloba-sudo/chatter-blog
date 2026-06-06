import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Badge } from '../components/ui/Badge'
import { MessageCircle, Heart, Eye } from 'lucide-react'
export function ProfileStoriesPage() {
  const { username } = useParams()
  const { profile: currentUser } = useAuth()
  const [filter, setFilter] = useState<'all' | 'published' | 'drafts'>('all')
  const isOwnProfile = currentUser?.username === username
  const stories = [
    {
      id: '1',
      title: 'The Future of Frontend Development in 2026',
      excerpt:
        'Exploring the latest trends in React, WebAssembly, and AI-assisted development tools that are reshaping how we build user interfaces.',
      status: 'published',
      published_at: '2026-05-15T10:00:00Z',
      reading_time_minutes: 5,
      view_count: 1205,
      like_count: 342,
      comment_count: 28,
    },
    {
      id: '2',
      title: 'Designing with Tailwind CSS: A Comprehensive Guide',
      excerpt:
        'How to build scalable and maintainable design systems using utility-first CSS frameworks.',
      status: 'published',
      published_at: '2026-04-20T10:00:00Z',
      reading_time_minutes: 8,
      view_count: 850,
      like_count: 124,
      comment_count: 12,
    },
    {
      id: '3',
      title: 'My Journey into Rust',
      excerpt:
        "A frontend developer's perspective on learning systems programming.",
      status: 'draft',
      published_at: null,
      reading_time_minutes: 0,
      view_count: 0,
      like_count: 0,
      comment_count: 0,
    },
  ]
  const displayedStories = stories.filter((s) => {
    if (!isOwnProfile && s.status === 'draft') return false
    if (filter === 'all') return true
    return s.status === filter
  })
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          to={`/@${username}`}
          className="text-sm text-brand-600 dark:text-brand-400 hover:underline mb-4 inline-block"
        >
          ← Back to Profile
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white">
            {isOwnProfile ? 'Your Stories' : `Stories by @${username}`}
          </h1>
          {isOwnProfile && (
            <Link
              to="/write"
              className="bg-brand-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-700"
            >
              Write a story
            </Link>
          )}
        </div>
      </div>

      {isOwnProfile && (
        <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setFilter('all')}
            className={`pb-4 -mb-px text-sm font-medium border-b-2 transition-colors ${filter === 'all' ? 'border-gray-900 text-gray-900 dark:border-white dark:text-white' : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`pb-4 -mb-px text-sm font-medium border-b-2 transition-colors ${filter === 'published' ? 'border-gray-900 text-gray-900 dark:border-white dark:text-white' : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
          >
            Published
          </button>
          <button
            onClick={() => setFilter('drafts')}
            className={`pb-4 -mb-px text-sm font-medium border-b-2 transition-colors ${filter === 'drafts' ? 'border-gray-900 text-gray-900 dark:border-white dark:text-white' : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
          >
            Drafts
          </button>
        </div>
      )}

      <div className="space-y-6">
        {displayedStories.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-[var(--color-surface-card-dark)] rounded-xl border border-gray-200 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400">
              No stories found.
            </p>
          </div>
        ) : (
          displayedStories.map((story) => (
            <div
              key={story.id}
              className="bg-white dark:bg-[var(--color-surface-card-dark)] border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand-600">
                  <Link
                    to={
                      story.status === 'published'
                        ? `/@${username}/${story.id}`
                        : `/edit/${story.id}`
                    }
                  >
                    {story.title}
                  </Link>
                </h2>
                {story.status === 'draft' && (
                  <Badge variant="outline" className="shrink-0">
                    Draft
                  </Badge>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {story.excerpt}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span>
                    {story.published_at
                      ? new Date(story.published_at).toLocaleDateString(
                          undefined,
                          {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          },
                        )
                      : 'Not published'}
                  </span>
                  {story.status === 'published' && (
                    <>
                      <span>·</span>
                      <span>{story.reading_time_minutes} min read</span>
                    </>
                  )}
                </div>

                {story.status === 'published' && (
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" /> {story.view_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" /> {story.like_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />{' '}
                      {story.comment_count}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
