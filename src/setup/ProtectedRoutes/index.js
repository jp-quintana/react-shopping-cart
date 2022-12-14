import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { useAuthContext } from 'hooks/useAuthContext';

const ProtectedRoutes = ({ needAuth }) => {
  const { isVerified } = useAuthContext();
  const { pathname } = useLocation();

  switch (needAuth) {
    case true:
      if (isVerified) {
        return <Outlet />;
      }

      if (!isVerified) {
        return <Navigate to="/cuenta/login" state={{ state: pathname }} />;
      }

      break;
    case false:
      if (!isVerified) {
        return <Outlet />;
      }

      if (isVerified) {
        return <Navigate to="/" />;
      }

      break;
    default:
      return <Navigate to="/" />;
  }
};

export default ProtectedRoutes;
