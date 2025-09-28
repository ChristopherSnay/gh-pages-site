import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/local-only/AdminPage';
import PostPage from './pages/PostPage';
import PostsPage from './pages/PostsPage';
import RestrictedLocalOnly from './providers/RestrictedLocalOnly';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: 'admin',
          element: (
            <RestrictedLocalOnly>
              <AdminPage />
            </RestrictedLocalOnly>
          )
        },
        {
          index: true,
          element: <PostsPage />
        },
        {
          path: 'contact',
          element: <ContactPage />
        },
        {
          path: 'post/:id',
          element: <PostPage />
        }
      ]
    }
  ],
  {
    basename: '/gh-pages-site'
  }
);
