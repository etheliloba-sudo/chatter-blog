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
          className="block text-sm font-medium text-[var(--color-text-primary)]">
          
            {label}
          </label>
        }
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props} />
        
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>);

  }
);
Input.displayName = 'Input';