import React, { useState, useEffect } from 'react';
import { HeaderAnnoy } from '../components/HeaderAnnoy';
import { ContentGuideline } from '../components/ContentGuideline';
import { PortGrid } from '../components/PortGrid';
import { fetchCurrentUser } from '../api/auth.api';
import { getPendingResume } from '../api/post.api';
import { PortfolioDetailModal } from '../components/PortfolioDetailModel';
import { ReviewModal } from '../components/ReviewModal';

export const ReviewHR = () => {
  const [user, setUser] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [reviewPortfolio, setReviewPortfolio] = useState(null);

  useEffect(() => {
    const getUserAndPortfolios = async () => {
      try {
        const userData = await fetchCurrentUser();
        setUser(userData);

        // Only fetch pending resumes if the user is an HR
        if (userData?.user?.role === 'HR') {
          const res = await getPendingResume();
          console.log('getPendingResume result:', res);

          // Handle different shapes of response
          const backendData = Array.isArray(res?.data)
            ? res.data
            : Array.isArray(res)
            ? res
            : [];

          const mapped = backendData.map((item) => ({
            id: item.id,
            status: item.status.toLowerCase(),
            title: item.title,
            url: item.url,
            position: item.jobPosition,
            company: item.company,
            date: item.createdAt?.slice(0, 10) || 'N/A',
            description: item.shortDesc,
            failure: item.learning,
          }));

          setPortfolios(mapped);
        }
      } catch (error) {
        console.error('Failed to fetch user or portfolios:', error);
        setError('Failed to load portfolios');
      }
    };

    getUserAndPortfolios();
  }, []);

  const handleViewDetails = (id) => {
    const selected = portfolios.find(p => p.id === id);
    setSelectedPortfolio(selected);
  };

  const handleAddReview = (id) => {
    const selected = portfolios.find(p => p.id === id);
    setReviewPortfolio(selected);
  };

  const handleReviewSubmitted = (portfolioId, status, failureDesc) => {
    // Remove the reviewed portfolio from the list since it's no longer pending
    setPortfolios(prev => prev.filter(p => p.id !== portfolioId));
    console.log(`Portfolio ${portfolioId} reviewed with status: ${status}`);
    if (failureDesc) {
      console.log(`Failure description: ${failureDesc}`);
    }
  };

  return (
    <div className="bg-[rgba(239,239,239,1)] overflow-hidden pb-[415px] rounded-[32px] max-md:pb-[100px]">
      <HeaderAnnoy user={user} setUser={setUser} />

      <main className="flex w-full flex-col mt-[53px] px-20 max-md:max-w-full max-md:mt-10 max-md:px-5">
        <h1 className="text-black text-5xl font-bold self-center max-md:max-w-full max-md:text-[40px]">
          Portfolio <span className="text-[rgba(143,30,249,1)]">Review Case</span>
        </h1>

        <ContentGuideline />

        {error ? (
          <div className="text-red-500 mt-4">⚠️ {error}</div>
        ) : (
          <PortGrid
            portfolios={portfolios}
            onViewDetails={handleViewDetails}
            onAddReview={handleAddReview}
          />
        )}
        
        {selectedPortfolio && (
          <PortfolioDetailModal
            portfolio={selectedPortfolio}
            onClose={() => setSelectedPortfolio(null)}
          />
        )}

        {reviewPortfolio && (
          <ReviewModal
            portfolio={reviewPortfolio}
            onClose={() => setReviewPortfolio(null)}
            onReviewSubmitted={handleReviewSubmitted}
          />
        )}
      </main>
    </div>
  );
};

export default ReviewHR;