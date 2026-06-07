import { BarChart3, TrendingUp, Users, FileText, Heart } from 'lucide-react';
export function StatsPage() {
  const topPosts = [
  {
    id: '1',
    title: 'The Future of Frontend Development in 2026',
    views: 1205,
    reads: 850,
    likes: 342,
    comments: 28
  },
  {
    id: '2',
    title: 'Designing with Tailwind CSS: A Comprehensive Guide',
    views: 850,
    reads: 620,
    likes: 124,
    comments: 12
  },
  {
    id: '3',
    title: 'Why I Switched from VS Code to Neovim',
    views: 8500,
    reads: 5100,
    likes: 1240,
    comments: 156
  }];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
          Your Stats
        </h1>
        <select className="bg-white dark:bg-surface-card-dark border border-gray-200 dark:border-gray-800 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>This year</option>
          <option>All time</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-surface-card-dark border border-gray-200 dark:border-gray-800 p-6 rounded-xl">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-medium mb-3">
            <BarChart3 className="h-4 w-4" /> Total Views
          </div>
          <div className="flex items-baseline gap-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              10.5k
            </div>
            <div className="text-sm font-medium text-green-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +12%
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-surface-card-dark border border-gray-200 dark:border-gray-800 p-6 rounded-xl">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-medium mb-3">
            <Users className="h-4 w-4" /> Followers
          </div>
          <div className="flex items-baseline gap-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              1,240
            </div>
            <div className="text-sm font-medium text-green-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +45
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-surface-card-dark border border-gray-200 dark:border-gray-800 p-6 rounded-xl">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-medium mb-3">
            <Heart className="h-4 w-4" /> Total Likes
          </div>
          <div className="flex items-baseline gap-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              1,706
            </div>
            <div className="text-sm font-medium text-green-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +8%
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-surface-card-dark border border-gray-200 dark:border-gray-800 p-6 rounded-xl">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-medium mb-3">
            <FileText className="h-4 w-4" /> Published Posts
          </div>
          <div className="flex items-baseline gap-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              12
            </div>
            <div className="text-sm font-medium text-gray-500">
              2 this month
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-surface-card-dark border border-gray-200 dark:border-gray-800 rounded-xl p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-6">
          Views over time
        </h3>

        <div className="h-64 flex items-end justify-between gap-2 pt-4">
          {Array.from({
            length: 30
          }).map((_, i) => {
            const height = Math.max(10, Math.random() * 100);
            return (
              <div
                key={i}
                className="w-full bg-brand-100 dark:bg-brand-900/30 rounded-t-sm relative group cursor-pointer hover:bg-brand-500 dark:hover:bg-brand-500 transition-colors"
                style={{
                  height: `${height}%`
                }} />);


          })}
        </div>
      </div>
      <div className="bg-white dark:bg-surface-card-dark border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h3 className="font-bold text-gray-900 dark:text-white">
            Top Performing Posts
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 font-medium">Post</th>
                <th className="px-6 py-3 font-medium text-right">Views</th>
                <th className="px-6 py-3 font-medium text-right">Reads</th>
                <th className="px-6 py-3 font-medium text-right">Likes</th>
                <th className="px-6 py-3 font-medium text-right">Comments</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {topPosts.map((post) =>
              <tr
                key={post.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white max-w-xs truncate">
                    {post.title}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {post.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {post.reads.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {post.likes.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {post.comments.toLocaleString()}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}