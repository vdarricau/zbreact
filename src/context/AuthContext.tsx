// Inspired from https://dev.to/dayvster/use-react-context-for-auth-288g

import { createContext } from 'react';
import { User } from '../hooks/useUser';

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});