import {useState, React} from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, Sparkles, ChevronDown } from 'lucide-react';
import { PostCard } from '../components/post/PostCard';
import { mockPosts, mockTags } from '../data/mockdata';


export function HomePage() {

  const [isActive, setIsActive] = useState();

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <div className="flex-1 space-y-8">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
          <h1 className="text-2xl font-bold font-serif">Your Feed</h1>
          <div className="flex gap-4 text-sm">
            <button className="flex items-center gap-1 font-medium text-brand-600 dark:text-brand-400 border-b-2 border-brand-600 dark:border-brand-400 pb-4 -mb-[17px]">
              <ChevronDown className="h-4 w-4" /> For You
            </button>
            <button className="flex items-center gap-1 font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 pb-4 -mb-[17px]">
              <Clock className="h-4 w-4" /> Following
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {mockPosts.map((post) =>
          <PostCard key={post.id} post={post} />
          )}
        </div>
      </div>

      <div className="w-full lg:w-80 space-y-8">
        <div className="bg-brand-50 dark:bg-brand-900/20 rounded-xl p-6 border border-brand-100 dark:border-brand-900/50">
          <h3 className="font-serif font-bold text-lg mb-2 text-brand-900 dark:text-brand-100">
            Write on Chatter
          </h3>
          <p className="text-sm text-brand-700 dark:text-brand-300 mb-4">
            Share your knowledge, connect with developers, and build your
            audience.
          </p>
          <Link
            to="/write"
            className="inline-block bg-brand-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-700 transition-colors">
            
            Start Writing
          </Link>
        </div>

        <div>
          <h3 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-4">
            <TrendingUp className="h-5 w-5 text-brand-500" /> Trending Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {mockTags.map((tag) =>
            <Link
              key={tag.id}
              to={`/tag/${tag.slug}`}
              className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-1.5 rounded-full text-sm transition-colors">
              
                {tag.name}
              </Link>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">
            Who to follow
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) =>
            <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                  src={`https://i.pravatar.cc/150?u=${i}`}
                  alt=""
                  className="w-10 h-10 rounded-full" />
                
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">User {i}</span>
                    <span className="text-xs text-gray-500">
                      Software Engineer
                    </span>
                  </div>
                </div>
                <button className="text-sm border border-gray-300 dark:border-gray-700 rounded-full px-3 py-1 hover:bg-gray-50 dark:hover:bg-gray-800">
                  Follow
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}