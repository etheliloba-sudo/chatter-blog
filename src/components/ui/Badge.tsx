import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'purple' | 'outline';
}
export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    purple:
    'bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-300',
    outline:
    'border border-gray-200 text-gray-800 dark:border-gray-700 dark:text-gray-200'
  };
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors hover:bg-opacity-80 cursor-default',
        variants[variant],
        className
      )}
      {...props} />);


}