import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HeaderAnnoy } from '../components/HeaderAnnoy';
import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { FeaturedResumes } from '../components/FeaturedResumes';
import { Footer } from '../components/Footer';

const Homepage = () => {
  const location = useLocation();

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

  return (
    <div className="bg-[rgba(239,239,239,1)] border flex flex-col items-center border-black border-solid min-h-screen">
      <HeaderAnnoy />
      <main className="w-full flex flex-col items-center">
        <Hero />
        <HowItWorks />
        <FeaturedResumes />
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;