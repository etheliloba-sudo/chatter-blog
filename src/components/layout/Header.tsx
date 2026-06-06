import { Link } from 'react-router-dom';
import { PenSquare, LogOut } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';


export function Header() {
  const { user, profile, signOut } = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold text-primary">
              Chatter
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--color-text-secondary)]">
            <Link
              to="/"
              className="hover:text-[var(--color-text-primary)] transition-colors">
              
              Home
            </Link>
            <Link
              to="/search"
              className="hover:text-[var(--color-text-primary)] transition-colors">
              
              Explore
            </Link>
            <Link
              to="/tags"
              className="hover:text-[var(--color-text-primary)] transition-colors">
              
              Tags
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {user ?
          <>
              <Link to="/write" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="gap-2">
                  <PenSquare className="h-4 w-4" />
                  Write
                </Button>
              </Link>
              <div className="h-8 w-px bg-[var(--color-border)] mx-2 hidden sm:block" />
              <Link to={profile?.username ? `/@${profile.username}` : '/dashboard'}>
                <img
                src={profile?.avatar_url || `https://ui-avatars.com/api/?background=7c3aed&color=fff&name=${encodeURIComponent(profile?.display_name || 'User')}`}
                alt={profile?.display_name || 'User profile'}
                className="h-8 w-8 rounded-full object-cover ring-2 ring-transparent hover:ring-primary transition-all" />
              
              </Link>
              <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="hidden sm:flex px-2">
              
                <LogOut className="h-4 w-4" />
              </Button>
            </> :

          <>
              <Link to="/login" className="hidden sm:block">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          }
        </div>
      </div>
    </header>);

}


