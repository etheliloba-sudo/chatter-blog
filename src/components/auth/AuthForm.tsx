import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


interface AuthFormProps {
  mode: 'login' | 'signup';
}
export function AuthForm({ mode }: AuthFormProps) {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock login/signup
    await signIn();
    setLoading(false);
    navigate('/');
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
          className="h-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-[var(--color-text-primary)] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="••••••••" />
        
      </div>

      <Button type="submit" className="mt-2 w-full" isLoading={loading}>
        {mode === 'login' ? 'Sign In' : 'Create Account'}
      </Button>
    </form>);

}