import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Save,
  Image as ImageIcon,
  Settings,
  CheckCircle2,
  AlertCircle } from
'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { generateSlug, calculateReadingTime } from '../lib/utils';
export function EditorPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const isEditing = !!postId;
  const [title, setTitle] = useState(isEditing ? 'Existing Post Title' : '');
  const [content, setContent] = useState(isEditing ? 'Existing content...' : '');
  const [slug, setSlug] = useState(isEditing ? 'existing-post-title' : '');
  const [saveStatus, setSaveStatus] = useState<
    'idle' | 'saving' | 'saved' | 'unsaved'>(
    'idle');

  useEffect(() => {
    if (!isEditing && title) {
      setSlug(generateSlug(title));
    }
  }, [title, isEditing]);
  useEffect(() => {
    if (title || content) {
      setSaveStatus('unsaved');
      const timer = setTimeout(() => {
        setSaveStatus('saving');
        setTimeout(() => setSaveStatus('saved'), 800);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [title, content]);
  const handlePublish = () => {
    alert('Post published!');
    navigate('/@demouser');
  };
  return (
    <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {saveStatus === 'saving' &&
              <span className="flex items-center gap-1">
                  <Save className="h-4 w-4 animate-pulse" /> Saving...
                </span>
              }
              {saveStatus === 'saved' &&
              <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-4 w-4" /> Saved
                </span>
              }
              {saveStatus === 'unsaved' &&
              <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                  <AlertCircle className="h-4 w-4" /> Unsaved changes
                </span>
              }
              {saveStatus === 'idle' && 'Draft'}
            </span>
            <span className="text-sm text-gray-400">·</span>
            <span className="text-sm text-gray-500">
              ~{calculateReadingTime(content)} min read
            </span>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Button variant="outline" size="sm" onClick={() => {}}>
              Save Draft
            </Button>
            <Button size="sm" onClick={handlePublish}>
              Publish
            </Button>
          </div>
        </div>

        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent text-4xl font-serif font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700 focus:outline-none" />
        

        <div className="min-h-[500px] border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden flex flex-col bg-white dark:bg-surface-card-dark">
          <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-2 flex gap-2">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              B
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              I
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              Link
            </Button>
            <div className="w-px bg-gray-300 dark:bg-gray-700 mx-1" />
            <Button variant="ghost" size="sm" className="h-8 px-2">
              H2
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              Quote
            </Button>
          </div>
          <textarea
            placeholder="Write your story here... (Markdown supported)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 w-full p-4 bg-transparent resize-none focus:outline-none text-gray-800 dark:text-gray-200 font-mono text-sm leading-relaxed" />
          
        </div>
      </div>

      <div className="w-full lg:w-80 space-y-6">
        <div className="hidden lg:flex flex-col gap-3">
          <Button onClick={handlePublish} className="w-full">
            Publish
          </Button>
          <Button variant="outline" className="w-full">
            Save Draft
          </Button>
        </div>

        <div className="bg-white dark:bg-surface-card-dark border border-gray-100 dark:border-gray-800 rounded-xl p-5 space-y-6">
          <div className="flex items-center gap-2 font-medium border-b border-gray-100 dark:border-gray-800 pb-3">
            <Settings className="h-4 w-4" /> Post Settings
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Cover Image</label>
            <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Click or drag to upload
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Input
              label="URL Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="font-mono text-sm" />
            
            <p className="text-xs text-gray-500">
              chatter.app/@username/{slug || '...'}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tags (up to 5)</label>
            <Input placeholder="Search tags..." />
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-2 py-1 text-xs text-brand-800 dark:bg-brand-900/40 dark:text-brand-300">
                React <button className="hover:text-brand-900">×</button>
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Excerpt</label>
            <textarea
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:border-gray-700 dark:bg-surface-dark dark:text-gray-100 resize-none h-24"
              placeholder="Brief summary for previews..." />
            
          </div>
        </div>
      </div>
    </div>);

}