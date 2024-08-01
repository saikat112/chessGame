'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  username: string;
  email: string;
  avatar?: string; // Optional: If you want to include an avatar URL
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void; // Update setUser type to accept null
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
