import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ArticlePage from '../components/ArticlePage/ArticlePage';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import PrivateRoute from './PrivateRoute';
import ProfilePage from '../pages/ProfilePage';
import CreateArticle from '../components/CreateArticlePage/CreateArticlePage';
import EditProfilePage from '../pages/EditProfilePage';
import EditArticlePage from '../components/EditArticlePage/EditArticlePage';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/articles" element={<HomePage />} />
      <Route path="/articles/:slug" element={<ArticlePage />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route
        path="/articles/:slug/edit"
        element={
          <PrivateRoute>
            <EditArticlePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/new-article"
        element={
          <PrivateRoute>
            <CreateArticle />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <EditProfilePage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
