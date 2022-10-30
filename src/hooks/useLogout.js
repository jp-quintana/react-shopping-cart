import { useState } from 'react';

import { signOut } from 'firebase/auth';

import { auth, db } from '../firebase/config';

import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';

export const useLogout = () => {
  const logout = async () => {
    await signOut(auth);
  };
  return { logout };
};
