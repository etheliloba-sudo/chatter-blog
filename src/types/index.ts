export interface Profile {
    id: string;
    username: string;
    display_name: string;
    avatar_url: string | null;
    bio: string | null;
    website_url: string | null;
    twitter_url: string | null;
    github_url: string | null;
    linkedin_url: string | null;
    follower_count: number;
    following_count: number;
    post_count: number;
    created_at: string;
  }
  
  export interface Tag {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    post_count: number;
  }
  
  export interface Post {
    id: string;
    author_id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    cover_image_url: string | null;
    status: 'draft' | 'published' | 'archived';
    reading_time_minutes: number;
    view_count: number;
    like_count: number;
    comment_count: number;
    bookmark_count: number;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    author?: Profile;
    tags?: Tag[];
  }
  
  export interface User {
    id: string;
    email: string;
  }