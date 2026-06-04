import React, { useEffect, useState, createContext, useContext } from 'react';
import { User, Profile } from '../types';
import { mockProfiles } from '../lib/mockdata';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: {children: React.ReactNode;}) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      const savedUserId = localStorage.getItem('chatter-auth-user');
      if (savedUserId && mockProfiles[savedUserId]) {
        setUser({
          id: savedUserId,
          email: `${mockProfiles[savedUserId].username}@example.com`
        });
        setProfile(mockProfiles[savedUserId]);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);
  const signIn = async () => {
    setLoading(true);
    setTimeout(() => {
      setUser({
        id: 'user-1',
        email: 'alice@example.com'
      });
      setProfile(mockProfiles['user-1']);
      localStorage.setItem('chatter-auth-user', 'user-1');
      setLoading(false);
    }, 800);
  };
  const signOut = async () => {
    setLoading(true);
    setTimeout(() => {
      setUser(null);
      setProfile(null);
      localStorage.removeItem('chatter-auth-user');
      setLoading(false);
    }, 500);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn,
        signOut
      }}>
      
      {children}
    </AuthContext.Provider>);

}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}