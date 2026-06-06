import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(text: string): string {
  return text.
  toLowerCase().
  replace(/[^\w\s-]/g, '').
  replace(/[\s_-]+/g, '-').
  replace(/^-+|-+$/g, '');
}

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 225;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

const DOMPURIFY_CONFIG = {
  ALLOWED_TAGS: [
  'p',
  'br',
  'hr',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'strong',
  'em',
  'del',
  's',
  'sup',
  'sub',
  'code',
  'pre',
  'kbd',
  'blockquote',
  'ul',
  'ol',
  'li',
  'a',
  'img',
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'th',
  'td',
  'caption',
  'details',
  'summary',
  'span',
  'div',
  'section'],

  ALLOWED_ATTR: [
  'href',
  'src',
  'alt',
  'title',
  'class',
  'id',
  'target',
  'rel',
  'width',
  'height',
  'align',
  'valign',
  'colspan',
  'rowspan',
  'open'],

  FORBID_TAGS: [
  'script',
  'style',
  'iframe',
  'object',
  'embed',
  'form',
  'input'],

  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'style']
};

export function renderMarkdown(content: string): string {
  const rawHtml = marked.parse(content, { async: false }) as string;

  const cleanHtml = DOMPurify.sanitize(rawHtml, DOMPURIFY_CONFIG);
  const processedHtml = cleanHtml.replace(
    /<a\s+(?:[^>]*?\s+)?href=(["'])(http[s]?:\/\/[^"']+)\1([^>]*)>/gi,
    (match, _quote, url, rest) => {
      if (url.includes('chatter.app') || url.startsWith('/')) {
        return match;
      }
      const cleanRest = rest.
      replace(/\s+target=["'][^"']*["']/gi, '').
      replace(/\s+rel=["'][^"']*["']/gi, '');

      return `<a href="${url}" target="_blank" rel="noopener noreferrer"${cleanRest}>`;
    }
  );

  return processedHtml;
}