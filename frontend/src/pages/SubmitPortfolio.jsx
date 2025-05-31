import React, { useState, useEffect } from 'react';
import { HeaderAnnoy } from '../components/HeaderAnnoy';
import { PortfolioForm } from '../components/PortfolioForm';
import { GuidelinesCard } from '../components/GuidelinesCard';
import { fetchCurrentUser } from '../api/auth.api';

const SubmitPortfolio = () => {
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
    <div className="w-full min-h-screen bg-[#EFEFEF]">
      <HeaderAnnoy user={user} setUser={setUser} />
      <main className="flex flex-col items-center pt-[33px] pb-[100px] px-[47px] max-md:px-8 max-sm:px-4">
        <div className="text-center mb-[37px] max-sm:mb-6">
          <h1 className="text-5xl font-bold leading-normal max-md:text-[40px] max-sm:text-[32px]">
            <span className="text-black">Submit Your </span>
            <span className="text-[#0D25FF]">Portfolio</span>
          </h1>
          <p className="text-black text-2xl font-normal leading-normal mb-2 max-md:text-xl max-sm:text-lg">
            We believe every experience, success or setback, contributes to growth.
          </p>
          <p className="text-black text-2xl font-normal leading-normal max-md:text-xl max-sm:text-lg">
            Share your work with us.
          </p>
        </div>

        <div className="flex gap-10 w-full max-w-[1393px] max-md:flex-col max-md:gap-8">
          <PortfolioForm userId={user?.user?.id} />
          <GuidelinesCard />
        </div>
      </main>
    </div>
  );
};

export default SubmitPortfolio;
