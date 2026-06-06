import { Badge } from '../ui/Badge';


export function PostStatusBadge({
  status


}: {status: 'draft' | 'published' | 'archived';}) {
  if (status === 'published') {
    return (
      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
        Published
      </Badge>);

  }
  if (status === 'archived') {
    return (
      <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
        Archived
      </Badge>);

  }
  return <Badge variant="outline">Draft</Badge>;
}