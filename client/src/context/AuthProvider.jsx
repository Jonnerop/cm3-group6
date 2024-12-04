import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('user')));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || {});
  const [token, setToken] = useState(user.token || '');

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
