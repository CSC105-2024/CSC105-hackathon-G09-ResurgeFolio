
import React, { useState } from 'react';
import { HeaderAnnoy } from '../components/HeaderAnnoy';
import { ContentGuideline } from '../components/ContentGuideline';
import { PortGrid } from '../components/PortGrid';

export const ReviewHR = () => {
  const [portfolios] = useState([
    {
      id: '1',
      status: 'pending',
      position: 'UX/UI Designer',
      company: 'Google',
      date: '2025-05-15'
    },
    {
      id: '2',
      status: 'pending',
      position: 'UX/UI Designer',
      company: 'Google',
      date: '2025-05-15'
    },
    {
      id: '3',
      status: 'pending',
      position: 'UX/UI Designer',
      company: 'Google',
      date: '2025-05-15'
    },
    {
      id: '4',
      status: 'pending',
      position: 'UX/UI Designer',
      company: 'Google',
      date: '2025-05-15'
    },
    {
      id: '5',
      status: 'pending',
      position: 'UX/UI Designer',
      company: 'Google',
      date: '2025-05-15'
    },
    {
      id: '6',
      status: 'pending',
      position: 'UX/UI Designer',
      company: 'Google',
      date: '2025-05-15'
    }
  ]);

  const handleViewDetails = (id) => {
    console.log('View details for portfolio:', id);
    // Implement view details functionality
  };

  const handleAddReview = (id) => {
    console.log('Add review for portfolio:', id);
    // Implement add review functionality
  };

  return (
    <div className="bg-[rgba(239,239,239,1)] overflow-hidden pb-[415px] rounded-[32px] max-md:pb-[100px]">
      <HeaderAnnoy />
      
      <main className="flex w-full flex-col mt-[53px] px-20 max-md:max-w-full max-md:mt-10 max-md:px-5">
        <h1 className="text-black text-5xl font-bold self-center max-md:max-w-full max-md:text-[40px]">
          Portfolio <span className="text-[rgba(143,30,249,1)]">Review Case</span>
        </h1>
        
        <ContentGuideline />
        
        <PortGrid
          portfolios={portfolios}
          onViewDetails={handleViewDetails}
          onAddReview={handleAddReview}
        />
      </main>
    </div>
  );
};

export default ReviewHR;
