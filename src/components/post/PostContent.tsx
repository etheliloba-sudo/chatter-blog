import React from 'react';
import { renderMarkdown } from '../../lib/utils';
interface PostContentProps {
  content: string;
}
export function PostContent({ content }: PostContentProps) {
  const htmlContent = renderMarkdown(content);
  return (
    <div
      className="prose prose-lg dark:prose-invert max-w-none font-serif prose-a:text-brand-600 dark:prose-a:text-brand-400 hover:prose-a:text-brand-700 prose-img:rounded-xl prose-headings:font-sans"
      dangerouslySetInnerHTML={{
        __html: htmlContent
      }} />);


}