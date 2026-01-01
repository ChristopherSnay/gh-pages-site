import { Outlet } from 'react-router';
import AdminControls from '../../components/local-only/AdminControls';

export default function AdminPage() {
  return (
    <div className="container mt-4">
      <section className="d-flex flex-column mt-4 justify-content-end">
        {location.pathname === '/admin' && <AdminControls />}
        <Outlet />
      </section>
    </div>
  );
}
