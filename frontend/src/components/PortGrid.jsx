import React from 'react';
import { PortCard } from './PortCard';

export const PortGrid = ({
  portfolios,
  onViewDetails,
  onAddReview,
  className = ''
}) => {
  const renderRow = (startIndex) => (
    <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
      {portfolios.slice(startIndex, startIndex + 3).map((portfolio, index) => (
        <div
          key={portfolio.id}
          className={`w-[33%] ${index > 0 ? 'ml-5' : ''} max-md:w-full max-md:ml-0`}
        >
          <PortCard
            status={portfolio.status}
            position={portfolio.position}
            company={portfolio.company}
            date={portfolio.date}
            onViewDetails={() => onViewDetails(portfolio.id)}
            onAddReview={() => onAddReview(portfolio.id)}
            className="max-md:mt-[33px]"
          />
        </div>
      ))}
    </div>
  );

  return (
    <section className={className}>
      <div className="mt-[90px] max-md:max-w-full max-md:mt-10">
        {renderRow(0)}
      </div>
      {portfolios.length > 3 && (
        <div className="mt-[57px] max-md:max-w-full max-md:mt-10">
          {renderRow(3)}
        </div>
      )}
    </section>
  );
};
