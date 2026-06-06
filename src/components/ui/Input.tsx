import React, { forwardRef, useId } from 'react';
import { cn } from '../../lib/utils';
export interface InputProps extends
  React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, id, ...props }, ref) => {
    const inputId = id || useId();
    return (
      <div className="w-full space-y-1.5">
        {label &&
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          
            {label}
          </label>
        }
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:border-gray-700 dark:bg-surface-card-dark dark:text-gray-100 dark:placeholder:text-gray-500',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props} />
        
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>);

  }
);
Input.displayName = 'Input';