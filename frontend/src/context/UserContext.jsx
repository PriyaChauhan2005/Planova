import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import { getUserData } from '../services/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user } = useUser();
  const [streak, setStreak] = useState(0);

  const fetchUserStats = async () => {
    if (user) {
      try {
        const res = await getUserData(user.id);
        setStreak(res.data?.streak || 0);
      } catch (err) { console.error(err); }
    }
  };

  useEffect(() => { fetchUserStats(); }, [user]);

  return (
    <UserContext.Provider value={{ streak, fetchUserStats }}>
      {children}
    </UserContext.Provider>
  );
};

export const usePlanovaUser = () => useContext(UserContext);