import { Outlet, Navigate } from 'react-router-dom';

import { useAuthContext } from 'hooks/useAuthContext';

const ProtectedRoutes = ({ needAuth }) => {
  const { user } = useAuthContext();

  switch (needAuth) {
    case true:
      if (user) {
        return <Outlet />;
      }

      if (!user) {
        return <Navigate to="/" />;
      }

      break;
    case false:
      if (!user) {
        return <Outlet />;
      }

      if (user) {
        return <Navigate to="/" />;
      }

      break;
    default:
      return <Navigate to="/" />;
  }
};

export default ProtectedRoutes;
