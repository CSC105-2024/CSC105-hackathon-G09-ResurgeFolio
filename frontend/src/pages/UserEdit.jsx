import React, { useEffect, useState } from 'react';
import { HeaderAnnoy } from '../components/HeaderAnnoy';
import { UserProfileForm } from '../components/UserProfileForm';
import { Footer } from '../components/Footer';
import { fetchCurrentUser } from '../api/auth.api';
const UserEdit = () => {
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
    <div className="bg-[rgba(239,239,239,1)] flex flex-col overflow-hidden items-center rounded-[32px] min-h-screen">
      <HeaderAnnoy user={user} setUser={setUser}/>
      <UserProfileForm />
      <Footer />
    </div>
  );
};

export default UserEdit;
