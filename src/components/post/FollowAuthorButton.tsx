import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { getFollowState, toggleFollowUser } from '../../lib/engagement';

interface FollowAuthorButtonProps {
  authorId: string;
  authorName: string;
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onFollowChange?: (isFollowing: boolean) => void;
}

export function FollowAuthorButton({
  authorId,
  authorName,
  variant = 'primary',
  size = 'sm',
  onFollowChange
}: FollowAuthorButtonProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!user || user.id === authorId) {
      return;
    }

    const load = async () => {
      try {
        const following = await getFollowState(authorId, user.id);
        setIsFollowing(following);
      } catch {
        setEnabled(false);
      }
    };

    void load();
  }, [authorId, user]);

  if (user?.id === authorId) {
    return null;
  }

  const handleClick = async () => {
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    const nextValue = !isFollowing;
    setLoading(true);
    setIsFollowing(nextValue);
    onFollowChange?.(nextValue);

    try {
      await toggleFollowUser(authorId, user.id, nextValue);
    } catch {
      setIsFollowing(!nextValue);
      onFollowChange?.(!nextValue);
      setEnabled(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={isFollowing ? 'outline' : variant}
      size={size}
      isLoading={loading}
      disabled={!enabled}
      onClick={handleClick}
      aria-label={`${isFollowing ? 'Unfollow' : 'Follow'} ${authorName}`}
    >
      {enabled ? (isFollowing ? 'Following' : 'Follow') : 'Unavailable'}
    </Button>
  );
}
