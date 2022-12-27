import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { useAuthContext } from 'hooks/useAuthContext';

const ProtectedRoutes = ({ needAuth }) => {
  const { isVerified } = useAuthContext();
  const { pathname, state } = useLocation();

  // TODO: SI EL USUARIO HACE LOGOUT TIENE QUE TERMINAR EN HOME Y NO EN LOGIN

  switch (needAuth) {
    case true:
      if (isVerified) {
        return <Outlet />;
      }

      if (!isVerified) {
        return <Navigate to="/cuenta/login" state={pathname} />;
      }

      break;
    case false:
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

      break;
    default:
      return <Navigate to="/" />;
  }
};

export default ProtectedRoutes;
