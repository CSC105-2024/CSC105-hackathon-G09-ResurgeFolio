
import React from 'react';
import { HeaderAnnoy } from '../components/HeaderAnnoy';
import { NotificationGrid } from '../components/NotificationGrid';
import { fetchCurrentUser } from '../api/auth.api';
import { useState,useEffect } from 'react';
const Notification = () => {
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
    <div className="bg-[rgba(239,239,239,1)] flex flex-col overflow-hidden items-stretch pb-[441px] rounded-[32px] max-md:pb-[100px] min-h-screen">
      {/* Header */}
      <HeaderAnnoy user={user} setUser={setUser}/>
      
      {/* Main Content */}
      <main className="flex flex-col items-center">
        {/* Page Title */}
        <h1 className="text-black text-5xl font-bold self-center mt-[33px] max-md:text-[40px]">
          Notification
        </h1>
        
        {/* Notifications Grid */}
        <NotificationGrid />
      </main>
    </div>
  );
};

export default Notification;
