import { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function SettingsPage() {
  const { user, profile } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) {
      return;
    }

    setDisplayName(profile.display_name ?? '');
    setBio(profile.bio ?? '');
    setWebsiteUrl(profile.website_url ?? '');
    setTwitterUrl(profile.twitter_url ?? '');
    setGithubUrl(profile.github_url ?? '');
    setLinkedinUrl(profile.linkedin_url ?? '');
  }, [profile]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const saveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!profile) {
      return;
    }

    setSaving(true);
    setError(null);
    setMessage(null);

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        display_name: displayName,
        bio: bio || null,
        website_url: websiteUrl || null,
        twitter_url: twitterUrl || null,
        github_url: githubUrl || null,
        linkedin_url: linkedinUrl || null
      })
      .eq('id', profile.id);

    if (updateError) {
      setError('Unable to save your profile right now.');
    } else {
      setMessage('Profile updated successfully.');
    }

    setSaving(false);
  };

	return (
		<section className="mx-auto max-w-3xl space-y-8">
			<header className="space-y-2">
				<h1 className="font-serif text-3xl font-bold text-[var(--color-text-primary)]">
					Account Settings
				</h1>
				<p className="text-sm text-[var(--color-text-secondary)]">
					Manage your public profile and social links.
				</p>
			</header>

			<form
				onSubmit={saveProfile}
				className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-6"
			>
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
					<div className="space-y-1.5 md:col-span-2">
						<label className="text-sm font-medium text-[var(--color-text-primary)]">Display Name</label>
						<input
							type="text"
							value={displayName}
							onChange={(event) => setDisplayName(event.target.value)}
							className="h-10 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-[var(--color-text-primary)] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
						/>
					</div>

					<div className="space-y-1.5 md:col-span-2">
						<label className="text-sm font-medium text-[var(--color-text-primary)]">Bio</label>
						<textarea
							value={bio}
							onChange={(event) => setBio(event.target.value)}
							rows={4}
							maxLength={300}
							className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text-primary)] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
						/>
						<p className="text-xs text-[var(--color-text-secondary)]">{bio.length}/300</p>
					</div>

					<div className="space-y-1.5">
						<label className="text-sm font-medium text-[var(--color-text-primary)]">Website</label>
						<input
							type="url"
							placeholder="https://your-site.com"
							value={websiteUrl}
							onChange={(event) => setWebsiteUrl(event.target.value)}
							className="h-10 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-[var(--color-text-primary)] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
						/>
					</div>

					<div className="space-y-1.5">
						<label className="text-sm font-medium text-[var(--color-text-primary)]">Twitter</label>
						<input
							type="url"
							placeholder="https://twitter.com/your-handle"
							value={twitterUrl}
							onChange={(event) => setTwitterUrl(event.target.value)}
							className="h-10 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-[var(--color-text-primary)] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
						/>
					</div>

					<div className="space-y-1.5">
						<label className="text-sm font-medium text-[var(--color-text-primary)]">GitHub</label>
						<input
							type="url"
							placeholder="https://github.com/your-handle"
							value={githubUrl}
							onChange={(event) => setGithubUrl(event.target.value)}
							className="h-10 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-[var(--color-text-primary)] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
						/>
					</div>

					<div className="space-y-1.5">
						<label className="text-sm font-medium text-[var(--color-text-primary)]">LinkedIn</label>
						<input
							type="url"
							placeholder="https://linkedin.com/in/your-handle"
							value={linkedinUrl}
							onChange={(event) => setLinkedinUrl(event.target.value)}
							className="h-10 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-[var(--color-text-primary)] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
						/>
					</div>
				</div>

				{error && (
					<p className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300">
						{error}
					</p>
				)}

				{message && (
					<p className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300">
						{message}
					</p>
				)}

				<div className="flex justify-end">
					<Button type="submit" isLoading={saving}>Save Changes</Button>
				</div>
			</form>
		</section>
	);
}
