import React from 'react';
import { HeaderAnnoy } from '../components/HeaderAnnoy';
import { NotificationGrid } from '../components/NotificationGrid';
import { PortfolioDetailModal } from '../components/PortfolioDetailModel';
import { fetchCurrentUser } from '../api/auth.api';
import { getReviewByPortfolioId } from '../api/post.api';
import { useState, useEffect } from 'react';

const Notification = () => {
    const [user, setUser] = useState(null);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    const [selectedReview, setSelectedReview] = useState(null);
    const [notifications, setNotifications] = useState([]);

    const handleViewDetails = async (portfolioData) => {
      setSelectedPortfolio(portfolioData);
      
      try {
        const reviews = await getReviewByPortfolioId(portfolioData.id);
        console.log(reviews[0]?.failureDesc);
        const latestReview = reviews[0]; 
        
        setSelectedReview(latestReview || null);
      } catch (err) {
        console.error('Failed to load review:', err);
        setSelectedReview(null);
      }
    };

    const handleCloseModal = () => {
      setSelectedPortfolio(null);
      setSelectedReview(null);
    };

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
        <NotificationGrid 
          user={user} 
          onViewDetails={handleViewDetails}
          notifications={notifications}
          setNotifications={setNotifications}
        />

        {/* Modal */}
        {selectedPortfolio && (
          <PortfolioDetailModal
            portfolio={{
              id: selectedPortfolio.id,
              status: selectedPortfolio.status.toLowerCase(),
              title: selectedPortfolio.title || selectedPortfolio.position,
              url: selectedPortfolio.url || '#',
              position: selectedPortfolio.position,
              company: selectedPortfolio.company,
              description: selectedPortfolio.shortDesc || selectedPortfolio.description || 'No description available',
              failure: selectedReview?.status === 'REJECTED'
                ? selectedReview.failureDesc
                : 'No failure description provided',
            }}
            onClose={handleCloseModal}
          />
        )}
      </main>
    </div>
  );
};

export default Notification;