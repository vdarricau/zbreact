import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { User, useUser } from './useUser';

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem('user');
    
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []);

  const login = (user: User) => {
    addUser(user);
  };

  const logout = () => {
    removeUser();
  };

  const isAuthenticated = () => {
    return user !== null;
  }

  return { user, isAuthenticated, login, logout };
};