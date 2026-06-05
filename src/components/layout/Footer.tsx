import React from 'react';
import { Link } from 'react-router-dom';
import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-serif text-xl font-bold text-primary">
            Chatter
          </span>
          <p className="text-sm text-[var(--color-text-secondary)]">
            © {new Date().getFullYear()} Chatter Publishing. All rights
            reserved.
          </p>
        </div>

        <div className="flex gap-6 text-sm font-medium text-[var(--color-text-secondary)]">
          <Link
            to="/about"
            className="hover:text-[var(--color-text-primary)] transition-colors">
            
            About
          </Link>
          <Link
            to="/privacy"
            className="hover:text-[var(--color-text-primary)] transition-colors">
            
            Privacy
          </Link>
          <Link
            to="/terms"
            className="hover:text-[var(--color-text-primary)] transition-colors">
            
            Terms
          </Link>
        </div>

        <div className="flex gap-4 text-[var(--color-text-secondary)]">
          <a href="#" className="hover:text-primary transition-colors">
            <TwitterLogoIcon className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            <GitHubLogoIcon className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            <LinkedInLogoIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>);

}