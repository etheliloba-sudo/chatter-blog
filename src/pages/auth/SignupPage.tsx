import { Link } from 'react-router-dom';
import { AuthForm } from '../../components/auth/AuthForm';
import { OAuthButtons } from '../../components/auth/OAuthButtons';


export function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-[var(--color-surface)] p-8 shadow-sm border border-[var(--color-border)]">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-[var(--color-text-primary)]">
            Join Chatter
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Join thousands of writers on Chatter
          </p>
        </div>

        <AuthForm mode="signup" />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--color-border)]" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-[var(--color-surface)] px-2 text-[var(--color-text-secondary)]">
              or continue with
            </span>
          </div>
        </div>

        <OAuthButtons />

        <div className="text-center text-sm">
          <span className="text-[var(--color-text-secondary)]">
            Already have an account?{' '}
          </span>
          <Link
            to="/login"
            className="font-medium text-primary hover:underline">
            
            Sign in
          </Link>
        </div>
      </div>
    </div>);

}