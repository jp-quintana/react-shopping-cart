import { createContext } from 'react';

const AuthContext = createContext({
  user: null,
  name: null,
  lastName: null,
  cartId: null,
  ordersId: null,
  authIsReady: false,
});

export default AuthContext;
