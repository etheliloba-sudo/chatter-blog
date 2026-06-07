import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { ProfilePage } from './pages/ProfilePage';
import { EditorPage } from './pages/EditorPage';
import { SearchPage } from './pages/SearchPage';
import { DashboardPage } from './pages/DashboardPage';
import { PostPage } from './pages/PostPage';
import { TagsPage } from './pages/TagsPage';
import { TagDetailPage } from './pages/TagDetailPage';
import { ProfileStoriesPage } from './pages/ProfileStoriesPage';
import { StatsPage } from './pages/StatsPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/tags" element={<TagsPage />} />
              <Route path="/tag/:tag" element={<TagDetailPage />} />

              <Route path="/@:username" element={<ProfilePage />} />
              <Route path="/:username" element={<ProfilePage />} />
              <Route
                path="/@:username/stories"
                element={<ProfileStoriesPage />}
              />
              <Route
                path="/:username/stories"
                element={<ProfileStoriesPage />}
              />
              <Route path="/@:username/:slug" element={<PostPage />} />
              <Route path="/:username/:slug" element={<PostPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/stats" element={<StatsPage />} />
                <Route path="/bookmarks" element={<BookmarksPage />} />
                <Route path="/write" element={<EditorPage />} />
                <Route path="/edit/:postId" element={<EditorPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}