import React, { useState } from 'react';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Heart, MessageCircle, MoreHorizontal } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Comment {
  id: string;
  author: {
    username: string;
    display_name: string;
    avatar_url: string | null;
  };
  content: string;
  created_at: string;
  like_count: number;
  replies?: Comment[];
}

const MOCK_COMMENTS: Comment[] = [
{
  id: 'c1',
  author: {
    username: 'johndoe',
    display_name: 'John Doe',
    avatar_url: 'https://i.pravatar.cc/150?u=johndoe'
  },
  content:
  'This is an incredibly insightful post! I completely agree with your points on the future of frontend development. The shift towards more robust tooling is undeniable.',
  created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  like_count: 12,
  replies: [
  {
    id: 'c1-1',
    author: {
      username: 'sarahcodes',
      display_name: 'Sarah Jenkins',
      avatar_url: 'https://i.pravatar.cc/150?u=sarah'
    },
    content: 'Exactly! The ecosystem is maturing so fast.',
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    like_count: 3
  }]

},
{
  id: 'c2',
  author: {
    username: 'devguy',
    display_name: 'Dev Guy',
    avatar_url: 'https://i.pravatar.cc/150?u=devguy'
  },
  content:
  'I think WebAssembly will take longer to become mainstream for UI development, but the potential is definitely there.',
  created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  like_count: 5
}];

function CommentItem({
  comment,
  depth = 0



}: {comment: Comment;depth?: number;}) {
  const [liked, setLiked] = useState(false);
  
  return (
    <div className={`flex gap-4 ${depth > 0 ? 'mt-6' : 'mt-8'}`}>
      <Avatar
        src={comment.author.avatar_url || ''}
        fallback={comment.author.display_name}
        size="sm"
        className="shrink-0 mt-1" />
      
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-gray-900 dark:text-white">
              {comment.author.display_name}
            </span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">
              {new Date(comment.created_at).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {comment.content}
        </p>
        <div className="flex items-center gap-4 pt-1">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1.5 text-xs font-medium ${liked ? 'text-red-500' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'}`}>
            
            <Heart className={`h-3.5 w-3.5 ${liked ? 'fill-current' : ''}`} />
            {comment.like_count + (liked ? 1 : 0)}
          </button>
          <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
            <MessageCircle className="h-3.5 w-3.5" />
            Reply
          </button>
        </div>

        {comment.replies && comment.replies.length > 0 &&
        <div className="border-l-2 border-gray-100 dark:border-gray-800 pl-4 mt-4">
            {comment.replies.map((reply) =>
          <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
          )}
          </div>
        }
      </div>
    </div>);

}
export function CommentList() {
  const { user, profile } = useAuth();
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !profile) return;
    const comment: Comment = {
      id: `c${Date.now()}`,
      author: {
        username: profile.username,
        display_name: profile.display_name,
        avatar_url: profile.avatar_url
      },
      content: newComment,
      created_at: new Date().toISOString(),
      like_count: 0
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };
  return (
    <div
      className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
      id="comments">
      
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Responses (
        {comments.length +
        comments.reduce((acc, c) => acc + (c.replies?.length || 0), 0)}
        )
      </h3>

      {user ?
      <form
        onSubmit={handleSubmit}
        className="mb-10 bg-white dark:bg-surface-card-dark border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm">
        
          <div className="flex gap-4">
            <Avatar
            src={profile?.avatar_url || ''}
            fallback={profile?.display_name}
            size="sm" />
          
            <div className="flex-1 space-y-3">
              <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What are your thoughts?"
              className="w-full bg-transparent resize-none outline-none text-gray-900 dark:text-white placeholder-gray-500 min-h-[80px]" />
            
              <div className="flex justify-end">
                <Button type="submit" size="sm" disabled={!newComment.trim()}>
                  Respond
                </Button>
              </div>
            </div>
          </div>
        </form> :

      <div className="mb-10 p-6 bg-gray-50 dark:bg-surface-card-dark rounded-xl text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Sign in to join the conversation.
          </p>
          <Button variant="outline">Sign In</Button>
        </div>
      }

      <div className="space-y-2">
        {comments.map((comment) =>
        <CommentItem key={comment.id} comment={comment} />
        )}
      </div>
    </div>);

}