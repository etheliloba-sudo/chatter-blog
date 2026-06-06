import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';
import { Post } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { formatDate } from '../../lib/utils';
interface PostCardProps {
  post: Post;
  showAuthor?: boolean;
}
export function PostCard({ post, showAuthor = true }: PostCardProps) {
  return (
    <article className="group flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-surface-card-dark">
      {showAuthor && post.author &&
      <div className="flex items-center gap-3">
          <Link to={`/@${post.author.username}`}>
            <Avatar
            src={post.author.avatar_url || ''}
            fallback={post.author.display_name}
            size="sm" />
          
          </Link>
          <div className="flex flex-col">
            <Link
            to={`/@${post.author.username}`}
            className="text-sm font-medium hover:underline">
            
              {post.author.display_name}
            </Link>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {post.published_at ? formatDate(post.published_at) : 'Draft'}
            </span>
          </div>
        </div>
      }

      <div className="flex flex-col-reverse md:flex-row gap-6">
        <div className="flex-1 space-y-3">
          <Link
            to={`/@${post.author?.username || 'user'}/${post.slug}`}
            className="block group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            
            <h2 className="font-serif text-xl font-bold leading-tight text-gray-900 dark:text-white mb-2">
              {post.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {post.excerpt}
            </p>
          </Link>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>{post.reading_time_minutes} min read</span>
              <span>·</span>
              <div className="flex gap-2">
                {post.tags?.slice(0, 2).map((tag) =>
                <Badge
                  key={tag.id}
                  variant="outline"
                  className="text-[10px] py-0">
                  
                    {tag.name}
                  </Badge>
                )}
              </div>
            </div>

            <div className="ml-auto flex items-center gap-4 text-gray-400">
              <button className="flex items-center gap-1 hover:text-brand-600 transition-colors">
                <Heart className="h-4 w-4" />
                <span className="text-xs">{post.like_count}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-brand-600 transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">{post.comment_count}</span>
              </button>
              <button className="hover:text-brand-600 transition-colors">
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {post.cover_image_url &&
        <Link
          to={`/@${post.author?.username || 'user'}/${post.slug}`}
          className="block shrink-0">
          
            <img
            src={post.cover_image_url}
            alt={post.title}
            className="h-32 w-full md:w-48 object-cover rounded-lg" />
          
          </Link>
        }
      </div>
    </article>);

}