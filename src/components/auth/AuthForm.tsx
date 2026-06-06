import { useState } from 'react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';


interface AuthFormProps {
  mode: 'login' | 'signup';
}
export function AuthForm({ mode }: AuthFormProps) {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'login') {
        await signIn(email, password);
      } else {
        await signUp({
          email,
          password,
          displayName,
          username
        });
      }

      const redirectPath =
        (location.state as { from?: { pathname?: string } } | null)?.from
          ?.pathname ?? '/';

      navigate(redirectPath, { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {mode === 'signup' &&
      <>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--color-text-primary)]">
              Display Name
            </label>
            <input
            type="text"
            required
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            className="h-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-[var(--color-text-primary)] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Jane Doe" />
          
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--color-text-primary)]">
              Username
            </label>
            <input
            type="text"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value.toLowerCase())}
            className="h-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-[var(--color-text-primary)] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="janedoe" />
          
          </div>
        </>
      }

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--color-text-primary)]">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-[var(--color-text-primary)] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="you@example.com" />
        
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--color-text-primary)]">
          Password
        </label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="h-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-[var(--color-text-primary)] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="••••••••" />
        
      </div>

      <Button type="submit" className="mt-2 w-full" isLoading={loading}>
        {mode === 'login' ? 'Sign In' : 'Create Account'}
      </Button>

      {error && (
        <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </p>
      )}
    </form>);

}