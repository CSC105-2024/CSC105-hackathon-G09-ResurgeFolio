import React from 'react';
import { NotificationCard } from './NotificationCard';

export const NotificationGrid = ({ user, onViewDetails, notifications, loading, error }) => {
  // Show loading state
  if (loading) {
    return (
      <section className="w-full max-w-[1330px] mr-[27px] mt-[115px] max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
        <div className="text-center text-xl text-gray-600">
          Loading your portfolios...
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="w-full max-w-[1330px] mr-[27px] mt-[115px] max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
        <div className="text-center text-xl text-red-500">
          ⚠️ {error}
        </div>
      </section>
    );
  }

  // Show empty state if no portfolios
  if (notifications.length === 0) {
    return (
      <section className="w-full max-w-[1330px] mr-[27px] mt-[115px] max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
        <div className="text-center text-xl text-gray-600">
          You don't have any portfolios yet. Submit your first portfolio to get started!
        </div>
      </section>
    );
  }

  return (
    <section className={`w-full max-w-[1330px] mr-[27px] mt-[115px] max-md:max-w-full max-md:mr-2.5 max-md:mt-10`}>
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[67%] max-md:w-full max-md:ml-0">
          <div className="grow max-md:max-w-full max-md:mt-10">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              {notifications.slice(0, 2).map((notification, index) => (
                <div
                  key={notification.id}
                  className={`w-6/12 max-md:w-full ${index > 0 ? 'ml-5 max-md:ml-0' : ''}`}
                >
                  <NotificationCard
                    id={notification.id}
                    status={notification.status}
                    position={notification.position}
                    company={notification.company}
                    date={notification.date}
                    backgroundImage={notification.backgroundImage}
                    className="max-md:mt-[31px]"
                    onViewDetails={() => onViewDetails(notification)}
                
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {notifications.length > 2 && (
          <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
            <NotificationCard
              id={notifications[2].id}
              status={notifications[2].status}
              position={notifications[2].position}
              company={notifications[2].company}
              date={notifications[2].date}
              backgroundImage={notifications[2].backgroundImage}
              className="max-md:mt-10"
              onViewDetails={() => onViewDetails(notifications[2])}
             
            />
          </div>
        )}
      </div>
    </section>
  );
};