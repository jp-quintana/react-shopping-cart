import { createContext } from 'react';

const AuthContext = createContext({
  user: null,
  cartId: null,
  authIsReady: false,
});

export default AuthContext;
