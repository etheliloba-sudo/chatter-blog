import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Link as LinkIcon,
    Calendar
} from 'lucide-react';
import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { PostCard } from '../components/post/PostCard';
import { useAuth } from '../context/AuthContext';
import type { Post, Profile } from '../types';
import { getProfileByUsername, getPublishedPostsByAuthor } from '../lib/content';


export function ProfilePage() {
    const { username } = useParams();
    const { profile: currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');
    const [isFollowing, setIsFollowing] = useState(false);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!username) {
            return;
        }

        const load = async () => {
            setLoading(true);
            setError(null);

            try {
                const profileData = await getProfileByUsername(username);

                if (!profileData) {
                    setProfile(null);
                    setPosts([]);
                    return;
                }

                setProfile(profileData);
                setPosts(await getPublishedPostsByAuthor(profileData.id));
            } catch {
                setError('Unable to load this profile right now.');
            } finally {
                setLoading(false);
            }
        };

        void load();
    }, [username]);

    const isOwnProfile = currentUser?.id === profile?.id;

    if (loading) {
        return (
            <div className="mx-auto max-w-4xl rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center text-[var(--color-text-secondary)]">
                Loading profile...
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto max-w-4xl rounded-xl border border-red-300 bg-red-50 p-6 text-center text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300">
                {error}
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="mx-auto max-w-4xl rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center">
                <h1 className="font-serif text-3xl font-bold text-[var(--color-text-primary)]">Profile not found</h1>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">This user does not exist or has not finished setting up their profile.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-12">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <Avatar
                        src={profile?.avatar_url || ''}
                        fallback={profile?.display_name}
                        size="xl"
                        className="h-24 w-24 md:h-32 md:w-32" />


                    <div className="flex-1 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {profile?.display_name}
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400">
                                    @{profile?.username}
                                </p>
                            </div>

                            {isOwnProfile ?
                                <Link to="/settings">
                                    <Button variant="outline">Edit Profile</Button>
                                </Link> :

                                <Button
                                    variant={isFollowing ? 'outline' : 'primary'}
                                    onClick={() => setIsFollowing(!isFollowing)}>

                                    {isFollowing ? 'Following' : 'Follow'}
                                </Button>
                            }
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 max-w-2xl text-lg">
                            {profile?.bio}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                            {profile?.website_url &&
                                <a
                                    href={profile.website_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-1 hover:text-brand-600">

                                    <LinkIcon className="h-4 w-4" />{' '}
                                    {new URL(profile.website_url).hostname}
                                </a>
                            }
                            <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" /> Joined{' '}
                                {new Date(profile?.created_at || '').toLocaleDateString(
                                    'en-US',
                                    {
                                        month: 'long',
                                        year: 'numeric'
                                    }
                                )}
                            </span>
                        </div>

                        <div className="flex gap-6 pt-2">
                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-gray-900 dark:text-white">
                                    {profile?.post_count}
                                </span>
                                <span className="text-sm text-gray-500">Posts</span>
                            </div>
                            <div className="flex flex-col cursor-pointer hover:opacity-80">
                                <span className="text-xl font-bold text-gray-900 dark:text-white">
                                    {profile?.follower_count}
                                </span>
                                <span className="text-sm text-gray-500">Followers</span>
                            </div>
                            <div className="flex flex-col cursor-pointer hover:opacity-80">
                                <span className="text-xl font-bold text-gray-900 dark:text-white">
                                    {profile?.following_count}
                                </span>
                                <span className="text-sm text-gray-500">Following</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-800 mb-8">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('posts')}
                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'posts' ? 'border-brand-500 text-brand-600 dark:text-brand-400' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}>

                        Posts
                    </button>
                    <button
                        onClick={() => setActiveTab('about')}
                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'about' ? 'border-brand-500 text-brand-600 dark:text-brand-400' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}>

                        About
                    </button>
                </nav>
            </div>
            {activeTab === 'posts' ?
                <div className="space-y-6">
                    {posts.map((post) =>
                        <PostCard key={post.id} post={post} showAuthor={false} />
                    )}

                    {posts.length === 0 && (
                        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center text-[var(--color-text-secondary)]">
                            No published stories yet.
                        </div>
                    )}
                </div> :

                <div className="prose dark:prose-invert max-w-none">
                    <h3>About {profile?.display_name}</h3>
                    <p>{profile?.bio}</p>

                    <h4>Connect</h4>
                    <div className="flex gap-4 not-prose">
                        {profile?.twitter_url &&
                            <a
                                href={profile.twitter_url}
                                className="text-gray-500 hover:text-brand-600">

                                <TwitterLogoIcon className="h-6 w-6" />
                            </a>
                        }
                        {profile?.github_url &&
                            <a
                                href={profile.github_url}
                                className="text-gray-500 hover:text-brand-600">

                                <GitHubLogoIcon className="h-6 w-6" />
                            </a>
                        }
                    </div>
                </div>
            }
        </div>);

}