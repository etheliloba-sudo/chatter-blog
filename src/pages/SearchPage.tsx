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
        <h1 className="text-3xl font-serif font-bold text-[var(--color-text-primary)]">
          Your Stats
        </h1>
        <select className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-brand-500">
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>This year</option>
          <option>All time</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)]">
            <BarChart3 className="h-4 w-4" /> Total Views
          </div>
          <div className="flex items-baseline gap-3">
            <div className="text-3xl font-bold text-[var(--color-text-primary)]">
              10.5k
            </div>
            <div className="text-sm font-medium text-green-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +12%
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)]">
            <Users className="h-4 w-4" /> Followers
          </div>
          <div className="flex items-baseline gap-3">
            <div className="text-3xl font-bold text-[var(--color-text-primary)]">
              1,240
            </div>
            <div className="text-sm font-medium text-green-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +45
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)]">
            <Heart className="h-4 w-4" /> Total Likes
          </div>
          <div className="flex items-baseline gap-3">
            <div className="text-3xl font-bold text-[var(--color-text-primary)]">
              1,706
            </div>
            <div className="text-sm font-medium text-green-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +8%
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)]">
            <FileText className="h-4 w-4" /> Published Posts
          </div>
          <div className="flex items-baseline gap-3">
            <div className="text-3xl font-bold text-[var(--color-text-primary)]">
              12
            </div>
            <div className="text-sm font-medium text-[var(--color-text-secondary)]">
              2 this month
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <h3 className="mb-6 font-bold text-[var(--color-text-primary)]">
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
      <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="border-b border-[var(--color-border)] p-6">
          <h3 className="font-bold text-[var(--color-text-primary)]">
            Top Performing Posts
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--color-bg)] text-xs uppercase text-[var(--color-text-secondary)]">
              <tr>
                <th className="px-6 py-3 font-medium">Post</th>
                <th className="px-6 py-3 font-medium text-right">Views</th>
                <th className="px-6 py-3 font-medium text-right">Reads</th>
                <th className="px-6 py-3 font-medium text-right">Likes</th>
                <th className="px-6 py-3 font-medium text-right">Comments</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {topPosts.map((post) =>
              <tr
                key={post.id}
                className="transition-colors hover:bg-[var(--color-bg)]">
                
                  <td className="max-w-xs truncate px-6 py-4 font-medium text-[var(--color-text-primary)]">
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