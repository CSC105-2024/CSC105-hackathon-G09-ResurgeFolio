
import React from 'react';
import { NotificationCard } from './NotificationCard';

export const NotificationGrid = ({
  notifications = [],
  className = ''
}) => {
  // Default notifications if none provided
  const defaultNotifications = [
    {
      id: '1',
      status: 'rejected',
      position: 'UX/UI Designer',
      company: 'Google',
      date: '2025-05-15',
      backgroundImage: 'https://cdn.builder.io/api/v1/image/assets/f44bb98f767d43ab8d3aa46adfd6d87f/de5a1cd411fffbb66f1d400a12d7942b56db7091?placeholderIfAbsent=true'
    },
    {
      id: '2',
      status: 'rejected',
      position: 'UX/UI Designer',
      company: 'Google',
      date: '2025-05-15',
      backgroundImage: 'https://cdn.builder.io/api/v1/image/assets/f44bb98f767d43ab8d3aa46adfd6d87f/de5a1cd411fffbb66f1d400a12d7942b56db7091?placeholderIfAbsent=true'
    },
    {
      id: '3',
      status: 'rejected',
      position: 'UX/UI Designer',
      company: 'Google',
      date: '2025-05-15',
      backgroundImage: 'https://cdn.builder.io/api/v1/image/assets/f44bb98f767d43ab8d3aa46adfd6d87f/de5a1cd411fffbb66f1d400a12d7942b56db7091?placeholderIfAbsent=true'
    }
  ];

  const displayNotifications = notifications.length > 0 ? notifications : defaultNotifications;

  return (
    <section className={`w-full max-w-[1330px] mr-[27px] mt-[115px] max-md:max-w-full max-md:mr-2.5 max-md:mt-10 ${className}`}>
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[67%] max-md:w-full max-md:ml-0">
          <div className="grow max-md:max-w-full max-md:mt-10">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              {displayNotifications.slice(0, 2).map((notification, index) => (
                <div
                  key={notification.id}
                  className={`w-6/12 max-md:w-full ${index > 0 ? 'ml-5 max-md:ml-0' : ''}`}
                >
                  <NotificationCard
                    status={notification.status}
                    position={notification.position}
                    company={notification.company}
                    date={notification.date}
                    backgroundImage={notification.backgroundImage}
                    className="max-md:mt-[31px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {displayNotifications.length > 2 && (
          <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
            <NotificationCard
              status={displayNotifications[2].status}
              position={displayNotifications[2].position}
              company={displayNotifications[2].company}
              date={displayNotifications[2].date}
              backgroundImage={displayNotifications[2].backgroundImage}
              className="max-md:mt-10"
            />
          </div>
        )}
      </div>
    </section>
  );
};
