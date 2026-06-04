import { Profile, Post, Tag } from '../types';

export const mockTags: Tag[] = [
{
  id: '1',
  name: 'Technology',
  slug: 'technology',
  description: 'All things tech',
  post_count: 120
},
{
  id: '2',
  name: 'Programming',
  slug: 'programming',
  description: 'Code and software development',
  post_count: 95
},
{
  id: '3',
  name: 'JavaScript',
  slug: 'javascript',
  description: 'The language of the web',
  post_count: 85
},
{
  id: '4',
  name: 'TypeScript',
  slug: 'typescript',
  description: 'Typed JavaScript',
  post_count: 70
},
{
  id: '5',
  name: 'React',
  slug: 'react',
  description: 'React UI library',
  post_count: 85
},
{
  id: '6',
  name: 'Python',
  slug: 'python',
  description: 'Python programming',
  post_count: 60
},
{
  id: '7',
  name: 'Design',
  slug: 'design',
  description: 'UI/UX Design',
  post_count: 64
},
{
  id: '8',
  name: 'UX/UI',
  slug: 'ux-ui',
  description: 'User Experience and Interface',
  post_count: 50
},
{
  id: '9',
  name: 'Productivity',
  slug: 'productivity',
  description: 'Getting things done',
  post_count: 45
},
{
  id: '10',
  name: 'Career',
  slug: 'career',
  description: 'Professional growth',
  post_count: 40
},
{
  id: '11',
  name: 'Writing',
  slug: 'writing',
  description: 'The art of writing',
  post_count: 35
},
{
  id: '12',
  name: 'Science',
  slug: 'science',
  description: 'Scientific discoveries',
  post_count: 30
},
{
  id: '13',
  name: 'Health',
  slug: 'health',
  description: 'Wellness and health',
  post_count: 25
},
{
  id: '14',
  name: 'Finance',
  slug: 'finance',
  description: 'Money and markets',
  post_count: 20
},
{
  id: '15',
  name: 'Startup',
  slug: 'startup',
  description: 'Building companies',
  post_count: 55
},
{
  id: '16',
  name: 'Machine Learning',
  slug: 'machine-learning',
  description: 'AI and ML',
  post_count: 65
},
{
  id: '17',
  name: 'DevOps',
  slug: 'devops',
  description: 'Infrastructure and operations',
  post_count: 40
},
{
  id: '18',
  name: 'Web Development',
  slug: 'web-development',
  description: 'Building for the web',
  post_count: 110
},
{
  id: '19',
  name: 'Open Source',
  slug: 'open-source',
  description: 'FOSS community',
  post_count: 30
},
{
  id: '20',
  name: 'Tutorial',
  slug: 'tutorial',
  description: 'How-to guides',
  post_count: 75
},
{
  id: '21',
  name: 'Opinion',
  slug: 'opinion',
  description: 'Personal perspectives',
  post_count: 20
},
{
  id: '22',
  name: 'News',
  slug: 'news',
  description: 'Current events',
  post_count: 15
},
{
  id: '23',
  name: 'Books',
  slug: 'books',
  description: 'Literature and reading',
  post_count: 25
},
{
  id: '24',
  name: 'Photography',
  slug: 'photography',
  description: 'Capturing light',
  post_count: 10
},
{
  id: '25',
  name: 'Travel',
  slug: 'travel',
  description: 'Exploring the world',
  post_count: 15
},
{
  id: '26',
  name: 'Food',
  slug: 'food',
  description: 'Culinary arts',
  post_count: 10
},
{
  id: '27',
  name: 'Gaming',
  slug: 'gaming',
  description: 'Video games',
  post_count: 30
},
{
  id: '28',
  name: 'Music',
  slug: 'music',
  description: 'Auditory art',
  post_count: 20
},
{
  id: '29',
  name: 'Art',
  slug: 'art',
  description: 'Visual arts',
  post_count: 15
},
{
  id: '30',
  name: 'Philosophy',
  slug: 'philosophy',
  description: 'Deep thoughts',
  post_count: 10
}];


export const mockProfiles: Record<string, Profile> = {
  'user-1': {
    id: 'user-1',
    username: 'alice_writer',
    display_name: 'Alice Johnson',
    avatar_url:
    'https://ui-avatars.com/api/?background=7c3aed&color=fff&name=Alice+Johnson',
    bio: 'Software engineer and technical writer. I love explaining complex topics simply.',
    website_url: 'https://alice.dev',
    twitter_url: 'https://twitter.com/alice',
    github_url: 'https://github.com/alice',
    linkedin_url: null,
    follower_count: 1205,
    following_count: 45,
    post_count: 12,
    created_at: new Date().toISOString()
  },
  'user-2': {
    id: 'user-2',
    username: 'bob_designs',
    display_name: 'Bob Smith',
    avatar_url:
    'https://ui-avatars.com/api/?background=0ea5e9&color=fff&name=Bob+Smith',
    bio: 'Product designer focusing on accessibility and inclusive design.',
    website_url: null,
    twitter_url: null,
    github_url: null,
    linkedin_url: null,
    follower_count: 890,
    following_count: 120,
    post_count: 8,
    created_at: new Date().toISOString()
  },
  'user-3': {
    id: 'user-3',
    username: 'charlie_code',
    display_name: 'Charlie Davis',
    avatar_url:
    'https://ui-avatars.com/api/?background=10b981&color=fff&name=Charlie+Davis',
    bio: 'Full-stack developer. Open source enthusiast.',
    website_url: 'https://charlie.io',
    twitter_url: 'https://twitter.com/charlie',
    github_url: 'https://github.com/charlie',
    linkedin_url: 'https://linkedin.com/in/charlie',
    follower_count: 450,
    following_count: 300,
    post_count: 5,
    created_at: new Date().toISOString()
  },
  'user-4': {
    id: 'user-4',
    username: 'diana_writes',
    display_name: 'Diana Prince',
    avatar_url:
    'https://ui-avatars.com/api/?background=f59e0b&color=fff&name=Diana+Prince',
    bio: 'Freelance writer and editor. Exploring the intersection of tech and culture.',
    website_url: null,
    twitter_url: 'https://twitter.com/diana',
    github_url: null,
    linkedin_url: null,
    follower_count: 2100,
    following_count: 50,
    post_count: 20,
    created_at: new Date().toISOString()
  },
  'user-5': {
    id: 'user-5',
    username: 'evan_ml',
    display_name: 'Evan Wright',
    avatar_url:
    'https://ui-avatars.com/api/?background=ef4444&color=fff&name=Evan+Wright',
    bio: 'Machine learning researcher. Trying to make AI understandable.',
    website_url: 'https://evanwright.ai',
    twitter_url: null,
    github_url: 'https://github.com/evanwright',
    linkedin_url: null,
    follower_count: 3200,
    following_count: 10,
    post_count: 15,
    created_at: new Date().toISOString()
  },
  'user-6': {
    id: 'user-6',
    username: 'fiona_startup',
    display_name: 'Fiona Gallagher',
    avatar_url:
    'https://ui-avatars.com/api/?background=8b5cf6&color=fff&name=Fiona+Gallagher',
    bio: 'Founder & CEO. Sharing lessons learned from building startups.',
    website_url: null,
    twitter_url: 'https://twitter.com/fiona',
    github_url: null,
    linkedin_url: 'https://linkedin.com/in/fiona',
    follower_count: 5400,
    following_count: 200,
    post_count: 25,
    created_at: new Date().toISOString()
  }
};

const sampleMarkdown1 = `
# The Future of React Server Components

React Server Components (RSC) represent a fundamental shift in how we build React applications. By moving some components to the server, we can significantly reduce the amount of JavaScript sent to the client.

## Why RSC?

Traditional Single Page Applications (SPAs) often suffer from large bundle sizes. RSC addresses this by allowing you to render components on the server, sending only the resulting HTML to the client.

### Key Benefits

*   **Zero Bundle Size:** Server components don't add to the client-side JavaScript bundle.
*   **Direct Backend Access:** You can securely access databases and file systems directly from your components.
*   **Automatic Code Splitting:** Client components are automatically code-split.

> "React Server Components are the biggest change to React since Hooks." - Some Developer

Here is a simple example of a Server Component fetching data:

\`\`\`tsx
import db from './database';

export default async function UserProfile({ id }) {
  const user = await db.users.find(id);
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  );
}
\`\`\`

As you can see, it's incredibly straightforward. The future is bright!
`;

const sampleMarkdown2 = `
# Designing for Accessibility First

Accessibility (a11y) should never be an afterthought. It's a fundamental aspect of good design.

## The Importance of Contrast

One of the most common accessibility issues is poor color contrast. Ensure your text is readable against its background.

1.  Use tools like the WebAIM Contrast Checker.
2.  Aim for a contrast ratio of at least 4.5:1 for normal text.
3.  Don't rely solely on color to convey information.

**Remember:** Good design is inclusive design.
`;

export const mockPosts: Post[] = [
{
  id: 'post-1',
  author_id: 'user-1',
  title: 'The Future of React Server Components',
  slug: 'future-of-react-server-components',
  excerpt:
  'An in-depth look at how React Server Components are changing the way we build web applications.',
  content: sampleMarkdown1,
  cover_image_url:
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop',
  status: 'published',
  reading_time_minutes: 6,
  view_count: 1250,
  like_count: 342,
  comment_count: 28,
  bookmark_count: 56,
  published_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  author: mockProfiles['user-1'],
  tags: [mockTags[0], mockTags[4]]
},
{
  id: 'post-2',
  author_id: 'user-2',
  title: 'Designing for Accessibility First',
  slug: 'designing-for-accessibility-first',
  excerpt:
  'Why accessibility should be the first step in your design process, not an afterthought.',
  content: sampleMarkdown2,
  cover_image_url:
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
  status: 'published',
  reading_time_minutes: 4,
  view_count: 890,
  like_count: 215,
  comment_count: 12,
  bookmark_count: 34,
  published_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  updated_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  author: mockProfiles['user-2'],
  tags: [mockTags[6], mockTags[7]]
},
{
  id: 'post-3',
  author_id: 'user-3',
  title: 'Getting Started with TypeScript',
  slug: 'getting-started-with-typescript',
  excerpt:
  'A beginner-friendly guide to adding static typing to your JavaScript projects.',
  content:
  '# Getting Started with TypeScript\n\nTypeScript is a superset of JavaScript that adds static typing. It helps catch errors early and improves developer experience.',
  cover_image_url:
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1000&auto=format&fit=crop',
  status: 'published',
  reading_time_minutes: 5,
  view_count: 500,
  like_count: 120,
  comment_count: 5,
  bookmark_count: 10,
  published_at: new Date(Date.now() - 86400000 * 10).toISOString(),
  created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
  updated_at: new Date(Date.now() - 86400000 * 10).toISOString(),
  author: mockProfiles['user-3'],
  tags: [mockTags[1], mockTags[3]]
},
{
  id: 'post-4',
  author_id: 'user-4',
  title: 'The Art of Technical Writing',
  slug: 'the-art-of-technical-writing',
  excerpt:
  'Tips and tricks for writing clear, concise, and engaging technical documentation.',
  content:
  '# The Art of Technical Writing\n\nWriting good documentation is just as important as writing good code.',
  cover_image_url:
  'https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=1000&auto=format&fit=crop',
  status: 'published',
  reading_time_minutes: 7,
  view_count: 1500,
  like_count: 400,
  comment_count: 45,
  bookmark_count: 80,
  published_at: new Date(Date.now() - 86400000 * 15).toISOString(),
  created_at: new Date(Date.now() - 86400000 * 15).toISOString(),
  updated_at: new Date(Date.now() - 86400000 * 15).toISOString(),
  author: mockProfiles['user-4'],
  tags: [mockTags[10], mockTags[9]]
},
{
  id: 'post-5',
  author_id: 'user-5',
  title: 'Demystifying Machine Learning',
  slug: 'demystifying-machine-learning',
  excerpt:
  'Breaking down complex ML concepts into understandable pieces for beginners.',
  content:
  "# Demystifying Machine Learning\n\nMachine learning doesn't have to be magic. Let's break it down.",
  cover_image_url:
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1000&auto=format&fit=crop',
  status: 'published',
  reading_time_minutes: 8,
  view_count: 2000,
  like_count: 550,
  comment_count: 60,
  bookmark_count: 120,
  published_at: new Date(Date.now() - 86400000 * 20).toISOString(),
  created_at: new Date(Date.now() - 86400000 * 20).toISOString(),
  updated_at: new Date(Date.now() - 86400000 * 20).toISOString(),
  author: mockProfiles['user-5'],
  tags: [mockTags[15], mockTags[5]]
},
{
  id: 'post-6',
  author_id: 'user-6',
  title: 'Lessons from Building a Startup',
  slug: 'lessons-from-building-a-startup',
  excerpt: 'What I learned from taking a company from zero to one.',
  content:
  '# Lessons from Building a Startup\n\nBuilding a startup is hard. Here are some things I wish I knew.',
  cover_image_url:
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop',
  status: 'published',
  reading_time_minutes: 10,
  view_count: 3000,
  like_count: 800,
  comment_count: 100,
  bookmark_count: 200,
  published_at: new Date(Date.now() - 86400000 * 25).toISOString(),
  created_at: new Date(Date.now() - 86400000 * 25).toISOString(),
  updated_at: new Date(Date.now() - 86400000 * 25).toISOString(),
  author: mockProfiles['user-6'],
  tags: [mockTags[14], mockTags[9]]
},
// Drafts for user-1
{
  id: 'post-7',
  author_id: 'user-1',
  title: 'My Draft Post',
  slug: 'my-draft-post',
  excerpt: '',
  content: 'This is a draft.',
  cover_image_url: null,
  status: 'draft',
  reading_time_minutes: 1,
  view_count: 0,
  like_count: 0,
  comment_count: 0,
  bookmark_count: 0,
  published_at: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  author: mockProfiles['user-1'],
  tags: []
},
{
  id: 'post-8',
  author_id: 'user-1',
  title: 'Another Draft',
  slug: 'another-draft',
  excerpt: '',
  content: 'Still working on this one.',
  cover_image_url: null,
  status: 'draft',
  reading_time_minutes: 1,
  view_count: 0,
  like_count: 0,
  comment_count: 0,
  bookmark_count: 0,
  published_at: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  author: mockProfiles['user-1'],
  tags: []
},
{
  id: 'post-9',
  author_id: 'user-1',
  title: 'Old Archived Post',
  slug: 'old-archived-post',
  excerpt: 'This post is no longer relevant.',
  content: 'Archived content.',
  cover_image_url: null,
  status: 'archived',
  reading_time_minutes: 2,
  view_count: 100,
  like_count: 10,
  comment_count: 2,
  bookmark_count: 5,
  published_at: new Date(Date.now() - 86400000 * 100).toISOString(),
  created_at: new Date(Date.now() - 86400000 * 100).toISOString(),
  updated_at: new Date(Date.now() - 86400000 * 100).toISOString(),
  author: mockProfiles['user-1'],
  tags: [mockTags[0]]
}];