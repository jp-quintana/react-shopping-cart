import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { useAuthContext } from 'hooks/useAuthContext';

const ProtectedRoutes = ({ needAuth, needAdmin }) => {
  const { isVerified, isAdmin } = useAuthContext();
  const { pathname, state } = useLocation();

  // TODO: SI EL USUARIO HACE LOGOUT TIENE QUE TERMINAR EN HOME Y NO EN LOGIN

  if (needAdmin) {
    if (isAdmin) {
      return <Outlet />;
    }

    if (!isAdmin) {
      return <Navigate to="/" />;
    }
  }

  if (needAuth) {
    if (isVerified) {
      return <Outlet />;
    }

    if (!isVerified) {
      return <Navigate to="/cuenta/login" state={pathname} />;
    }
  }

  if (!needAuth) {
    if (!isVerified) {
      return <Outlet />;
    }

    if (isVerified) {
      if (state === '/checkout') {
        return <Navigate to={state} />;
      } else if (state === '/cuenta') {
        return <Navigate to={state} />;
      }
      return <Navigate to="/" />;
    }
  }

  return <Navigate to="/" />;
};

export default ProtectedRoutes;
