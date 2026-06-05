import React, { useState } from 'react';
import { cn } from '../../lib/utils';
interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
export function Avatar({
  className,
  src,
  fallback,
  size = 'md',
  alt = '',
  ...props
}: AvatarProps) {
  const [error, setError] = useState(false);
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-16 w-16 text-xl',
    xl: 'h-20 w-20 text-2xl'
  };
  if (error || !src) {
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300 font-medium',
          sizes[size],
          className
        )}>
        
        {fallback ? fallback.substring(0, 2).toUpperCase() : '?'}
      </div>);

  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={cn('rounded-full object-cover', sizes[size], className)}
      {...props} />);


}