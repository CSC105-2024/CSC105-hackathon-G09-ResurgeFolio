import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HeaderAnnoy } from '../components/HeaderAnnoy';
import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { FeaturedResumes } from '../components/FeaturedResumes';
import { Footer } from '../components/Footer';
import { fetchCurrentUser } from '../api/auth.api';

const Homepage = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Smooth scroll to section if URL has hash
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  // Fetch user info on mount
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
    <div className="bg-[rgba(239,239,239,1)] border flex flex-col items-center border-black border-solid min-h-screen">
      <HeaderAnnoy user={user} setUser={setUser}/>
      <main className="w-full flex flex-col items-center">
        <Hero user={user} setUser={setUser} />
        <HowItWorks />
        <FeaturedResumes />
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
