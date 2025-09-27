import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export default function RestrictedLocalOnly({ children }: { children: ReactNode }) {
  const devModeEnabled = import.meta.env.MODE === 'development';

  if (devModeEnabled) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" replace />;
  }
}
