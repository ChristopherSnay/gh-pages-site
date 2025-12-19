import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import AdminPostList from './components/local-only/AdminPostList';
import PostForm from './components/local-only/PostForm';
import DynamicPostsPage from './pages/DynamicPostsPage';
import AdminPage from './pages/local-only/AdminPage';
import PostPage from './pages/PostPage';
import PostsPage from './pages/PostsPage';
import RestrictedLocalOnly from './providers/RestrictedLocalOnly';

const isDev = import.meta.env.MODE === 'development';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <PostsPage />
        },
        {
          path: 'post/:id',
          element: <PostPage />
        },
        {
          path: ':postType',
          element: <DynamicPostsPage />
        },
        {
          path: 'admin',
          element: (
            <RestrictedLocalOnly>
              <AdminPage />
            </RestrictedLocalOnly>
          ),
          children: [
            {
              index: true,
              element: <AdminPostList />
            },
            {
              path: 'post',
              element: <PostForm />
            },
            {
              path: 'post/:id',
              element: <PostForm />
            }
          ]
        }
      ]
    }
  ],
  {
    basename: isDev ? undefined : '/gh-pages-site/'
  }
);
