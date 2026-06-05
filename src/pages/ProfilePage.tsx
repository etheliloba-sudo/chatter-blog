import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    MapPin,
    Link as LinkIcon,
    Calendar
} from 'lucide-react';
import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { PostCard } from '../components/post/PostCard';
import { useAuth } from '../context/AuthContext';
// import { Post } from '../types';
import { mockProfiles, mockPosts } from '../data/mockdata'


export function ProfilePage() {
    const { username } = useParams();
    const { profile: currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');
    const [isFollowing, setIsFollowing] = useState(false);
    const isOwnProfile = currentUser?.username === username;
    const profile = isOwnProfile ?
        currentUser :
        {
            id: '2',
            username: username || 'user',
            display_name: 'Alex Developer',
            avatar_url: `https://i.pravatar.cc/150?u=${username}`,
            bio: 'Software engineer and writer. Passionate about web technologies, UI design, and building great user experiences.',
            website_url: 'https://example.com',
            twitter_url: 'https://twitter.com',
            github_url: 'https://github.com',
            linkedin_url: null,
            follower_count: 1240,
            following_count: 85,
            post_count: 12,
            created_at: '2025-01-01T00:00:00Z'
        };
    const posts = mockPosts.map((p) => ({
        ...p,
        author: profile
    }));
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