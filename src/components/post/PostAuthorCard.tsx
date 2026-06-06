import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Profile } from '../../types';
interface PostAuthorCardProps {
  author: Profile;
}
export function PostAuthorCard({ author }: PostAuthorCardProps) {
  return (
    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
      <div className="bg-gray-50 dark:bg-surface-card-dark rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <Link to={`/@${author.username}`} className="shrink-0">
            <Avatar
              src={author.avatar_url || ''}
              fallback={author.display_name}
              size="xl"
              className="w-20 h-20 sm:w-24 sm:h-24" />
            
          </Link>
          <div className="flex-1 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  <Link to={`/@${author.username}`} className="hover:underline">
                    Written by {author.display_name}
                  </Link>
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {author.follower_count.toLocaleString()} followers
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="primary">Follow</Button>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              {author.bio || 'Software engineer and writer.'}
            </p>
            <Link
              to={`/@${author.username}`}
              className="inline-block text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline">
              
              More from {author.display_name} →
            </Link>
          </div>
        </div>
      </div>
    </div>);

}