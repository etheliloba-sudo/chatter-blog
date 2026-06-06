import { Link } from 'react-router-dom';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Post } from '../../types';
import { FollowAuthorButton } from './FollowAuthorButton';
interface PostHeaderProps {
  post: Post;
}
export function PostHeader({ post }: PostHeaderProps) {
  const publishDate = post.published_at ?
  new Date(post.published_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) :
  'Draft';
  return (
    <header className="mb-10">
      {post.cover_image_url &&
      <div className="w-full aspect-video mb-8 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
          src={post.cover_image_url}
          alt={post.title}
          className="w-full h-full object-cover" />
        
        </div>
      }

      <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white leading-tight mb-4">
        {post.title}
      </h1>

      {post.excerpt &&
      <p className="text-xl text-gray-500 dark:text-gray-400 italic mb-8">
          {post.excerpt}
        </p>
      }

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Link to={`/@${post.author?.username}`}>
            <Avatar
              src={post.author?.avatar_url || ''}
              fallback={post.author?.display_name}
              size="md" />
            
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Link
                to={`/@${post.author?.username}`}
                className="font-medium text-gray-900 dark:text-white hover:underline">
                
                {post.author?.display_name}
              </Link>
              {post.author && (
                <FollowAuthorButton
                  authorId={post.author.id}
                  authorName={post.author.display_name}
                  variant="ghost"
                  size="sm"
                />
              )}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <span>{publishDate}</span>
              <span>·</span>
              <span>{post.reading_time_minutes} min read</span>
            </div>
          </div>
        </div>
      </div>

      {post.tags && post.tags.length > 0 &&
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-800 pb-8">
          {post.tags.map((tag) =>
        <Link key={tag.id} to={`/tag/${tag.slug}`}>
              <Badge
            variant="default"
            className="hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
            
                {tag.name}
              </Badge>
            </Link>
        )}
        </div>
      }
    </header>);

}