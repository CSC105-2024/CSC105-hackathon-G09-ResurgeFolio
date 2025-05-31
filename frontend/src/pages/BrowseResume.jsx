
import React from 'react';
import { HeaderAnnoy } from '../components/HeaderAnnoy';
import { PortfolioGrid } from '../components/PortfolioGrid';
import { fetchCurrentUser } from '../api/auth.api';
import { useState,useEffect } from 'react';
const BrowseResume = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
      const getUser = async () => {
        try {
          const userData = await fetchCurrentUser();
          setUser(userData); 
        } catch (error) {
          console.error('Failed to fetch user', error);
          setUser(null);
        }
      };
  
      getUser();
    }, []);
  return (
    <div className="bg-[rgba(239,239,239,1)] overflow-hidden pb-10 rounded-[32px] min-h-screen">
      <HeaderAnnoy user={user} setUser={setUser}/>
      <PortfolioGrid />
    </div>
  );
};

export default BrowseResume;
