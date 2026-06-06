import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Heart, MessageCircle, MoreHorizontal } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { PostComment } from '../../types';
import { createComment, getCommentsForPost } from '../../lib/engagement';

function CommentItem({
  comment,
  depth = 0


}: {comment: PostComment;depth?: number;}) {
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
export function CommentList({ postId }: { postId: string }) {
  const { user, profile } = useAuth();
  const [comments, setComments] = useState<PostComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        setComments(await getCommentsForPost(postId));
      } catch {
        setError('Unable to load responses right now.');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !profile) return;

    setSubmitting(true);
    setError(null);

    try {
      const comment = await createComment({
        postId,
        authorId: user!.id,
        content: newComment.trim(),
        profile
      });

      setComments((current) => [comment, ...current]);
      setNewComment('');
    } catch {
      setError('Unable to publish your response right now.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
      id="comments">
      
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Responses (
        {comments.length +
        comments.reduce((acc: number, comment: PostComment) => acc + (comment.replies?.length || 0), 0)}
        )
      </h3>

      {error && (
        <div className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </div>
      )}

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
                <Button type="submit" size="sm" isLoading={submitting} disabled={!newComment.trim()}>
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
          <Link to="/login">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      }

      <div className="space-y-2">
        {loading && (
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-sm text-[var(--color-text-secondary)]">
            Loading responses...
          </div>
        )}
        {!loading && comments.map((comment) =>
        <CommentItem key={comment.id} comment={comment} />
        )}
        {!loading && comments.length === 0 && (
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-sm text-[var(--color-text-secondary)]">
            No responses yet. Start the conversation.
          </div>
        )}
      </div>
    </div>);

}