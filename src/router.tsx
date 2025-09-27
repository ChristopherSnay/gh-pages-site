import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ContactPage from './pages/ContactPage';
import DevPage from './pages/local-only/DevPage';
import PostsPage from './pages/PostsPage';
import RestrictedLocalOnly from './providers/RestrictedLocalOnly';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: 'dev',
          element: (
            <RestrictedLocalOnly>
              <DevPage />
            </RestrictedLocalOnly>
          ),
        },
        {
          index: true,
          element: <PostsPage />,
        },
        {
          path: 'contact',
          element: <ContactPage />,
        },
      ],
    },
  ],
  {
    basename: '/gh-pages-site',
  }
);
