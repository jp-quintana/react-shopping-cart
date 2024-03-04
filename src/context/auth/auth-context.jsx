import { createContext } from 'react';

const AuthContext = createContext({
  user: "XsH72st3BcNtcPgSHYJgIWu2ZVi2",
  name: null,
  lastName: null,
  email: null,
  phoneNumber: null,
  addresses: [],
  isVerified: true,
  authIsReady: true,
});

export default AuthContext;
