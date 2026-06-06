import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function SettingsPage() {
	return (
		<section className="mx-auto max-w-3xl space-y-6">
			<header className="space-y-2">
				<h1 className="font-serif text-3xl font-bold text-[var(--color-text-primary)]">
					Account Settings
				</h1>
				<p className="text-sm text-[var(--color-text-secondary)]">
					Profile editing and account preferences are being finalized.
				</p>
			</header>

			<div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
				<p className="mb-4 text-sm text-[var(--color-text-secondary)]">
					You can already explore and publish content. Profile editing will be
					available in the next pass.
				</p>
				<div className="flex gap-3">
					<Link to="/dashboard">
						<Button variant="outline">Back to Dashboard</Button>
					</Link>
					<Link to="/write">
						<Button>Write a Post</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}
