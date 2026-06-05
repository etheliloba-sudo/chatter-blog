import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';
import { Post } from '../../types';
import { Badge } from '../ui/Badge';


interface PostCardProps {
  post: Post;
  showAuthor?: boolean;
}
export function PostCard({ post, showAuthor = true }: PostCardProps) {
  const postUrl = `/@${post.author?.username}/${post.slug}`;
  return (
    <article className="group flex flex-col gap-4 rounded-2xl p-4 transition-all hover:bg-[var(--color-surface)] hover:shadow-sm border border-transparent hover:border-[var(--color-border)]">
      {showAuthor && post.author &&
      <div className="flex items-center gap-3">
          <Link to={`/@${post.author.username}`}>
            <img
            src={post.author.avatar_url || ''}
            alt={post.author.display_name}
            className="h-8 w-8 rounded-full object-cover" />
          
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <Link
            to={`/@${post.author.username}`}
            className="font-medium text-[var(--color-text-primary)] hover:underline">
            
              {post.author.display_name}
            </Link>
            <span className="text-[var(--color-text-secondary)]">·</span>
            <span className="text-[var(--color-text-secondary)]">
              {post.published_at ?
            formatDistanceToNow(new Date(post.published_at), {
              addSuffix: true
            }) :
            'Draft'}
            </span>
          </div>
        </div>
      }

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-3">
          <Link to={postUrl} className="flex flex-col gap-2">
            <h2 className="font-serif text-2xl font-bold text-[var(--color-text-primary)] group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h2>
            {post.excerpt &&
            <p className="text-[var(--color-text-secondary)] line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            }
          </Link>

          <div className="mt-auto pt-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {post.tags?.[0] &&
              <Link to={`/tags/${post.tags[0].slug}`}>
                  <Badge variant="purple">{post.tags[0].name}</Badge>
                </Link>
              }
              <span className="text-xs text-[var(--color-text-secondary)]">
                {post.reading_time_minutes} min read
              </span>
            </div>

            <div className="flex items-center gap-4 text-[var(--color-text-secondary)]">
              <button className="flex items-center gap-1.5 hover:text-primary transition-colors text-sm">
                <Heart className="h-4 w-4" />
                <span>{post.like_count}</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-primary transition-colors text-sm">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comment_count}</span>
              </button>
              <button className="hover:text-primary transition-colors">
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {post.cover_image_url &&
        <Link
          to={postUrl}
          className="w-full md:w-48 h-48 md:h-32 shrink-0 overflow-hidden rounded-xl">
          
            <img
            src={post.cover_image_url}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
          
          </Link>
        }
      </div>
    </article>);

}