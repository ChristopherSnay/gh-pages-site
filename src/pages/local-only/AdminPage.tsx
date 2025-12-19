import { Breadcrumbs, Link } from '@mui/material';
import { Outlet } from 'react-router';
import AdminControls from '../../components/local-only/AdminControls';

export default function AdminPage() {
  return (
    <div className="container mt-4">
      <Breadcrumbs>
        {location.pathname
          .split('/')
          .filter((part) => part)
          .map((part, index, arr) => {
            const path = '/' + arr.slice(0, index + 1).join('/');
            return (
              <Link key={path} href={path} underline="hover" color="inherit">
                {part}
              </Link>
            );
          })}
      </Breadcrumbs>

      <section className="d-flex flex-column mt-4 justify-content-end">
        {location.pathname === '/admin' && <AdminControls />}
        <Outlet />
      </section>
    </div>
  );
}
