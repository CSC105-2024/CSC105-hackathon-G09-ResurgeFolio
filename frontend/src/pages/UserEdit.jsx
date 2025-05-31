
import React from 'react';
import { HeaderAnnoy } from '../components/HeaderAnnoy';
import { UserProfileForm } from '../components/UserProfileForm';
import { Footer } from '../components/Footer';

const UserEdit = () => {
  return (
    <div className="bg-[rgba(239,239,239,1)] flex flex-col overflow-hidden items-center rounded-[32px] min-h-screen">
      <HeaderAnnoy />
      <UserProfileForm />
      <Footer />
    </div>
  );
};

export default UserEdit;
