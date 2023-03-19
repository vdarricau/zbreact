import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { User, useUser } from './useUser';

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = getItem('user');
    if (user) {
      addUser(JSON.parse(user));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (user: User) => {
    addUser(user);
  };

  const logout = () => {
    removeUser();
  };

  return { user, isAuthenticated, login, logout };
};