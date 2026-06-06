import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';


export function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await resetPassword(email);
      setSubmitted(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to send reset email';
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-[var(--color-surface)] p-8 shadow-sm border border-[var(--color-border)]">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-[var(--color-text-primary)]">
            Reset Password
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            {submitted ?
            'Check your email for a reset link.' :
            'Enter your email to reset your password.'}
          </p>
        </div>

        {!submitted ?
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            <Button type="submit" className="mt-2 w-full" isLoading={loading}>
              Send Reset Link
            </Button>

            {error && (
              <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300">
                {error}
              </p>
            )}
          </form> :

        <div className="text-center">
            <Link to="/login">
              <Button variant="secondary" className="w-full">
                Return to Sign In
              </Button>
            </Link>
          </div>
        }
      </div>
    </div>);

}