import React, {useState,useEffect} from 'react';
import { NotificationCard } from './NotificationCard';
import { getPortNotification,getPendingResume } from '../api/post.api';

export const NotificationGrid = ({ user, onViewDetails, notifications, setNotifications }) => {
  const [error, setError] = useState(null);
  const bgImg = 'https://cdn.builder.io/api/v1/image/assets/f44bb98f767d43ab8d3aa46adfd6d87f/de5a1cd411fffbb66f1d400a12d7942b56db7091?placeholderIfAbsent=true';
  const defaultNotifications = [
    {
      id: '1',
      status: 'rejected',
      position: 'UX/UI Designer',
      company: 'Google',
      date: '2025-05-15',
      title: 'UX/UI Designer Application',
      url: '#',
      shortDesc: 'Application for UX/UI Designer position at Google',
      backgroundImage: 'https://cdn.builder.io/api/v1/image/assets/f44bb98f767d43ab8d3aa46adfd6d87f/de5a1cd411fffbb66f1d400a12d7942b56db7091?placeholderIfAbsent=true'
    }
  ];

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await getPortNotification();
        const backendData = res.data || [];

        const mapped = backendData.map((item, index) => ({
          id: item.id,
          status: item.status.toLowerCase(), // e.g. 'APPROVED' → 'approved'
          position: item.jobPosition,
          company: item.company,
          date: item.createdAt.slice(0, 10), // get YYYY-MM-DD
          title: item.title || item.jobPosition,
          url: item.url || '#',
          shortDesc: item.shortDesc || `Application for ${item.jobPosition} at ${item.company}`,
          backgroundImage: defaultNotifications[index % defaultNotifications.length].backgroundImage // reuse backgroundImage
        }));

        setNotifications(mapped);
      } catch (err) {
        console.error('Error loading notifications:', err);
        setError('Failed to load notifications');
      }
    };

    fetchNotifications();
  }, [setNotifications]);

  const displayNotifications = notifications.length > 0 ? notifications : defaultNotifications;

  return (
    <section className={`w-full max-w-[1330px] mr-[27px] mt-[115px] max-md:max-w-full max-md:mr-2.5 max-md:mt-10`}>
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
                    onViewDetails={() => onViewDetails(notification)}
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
              onViewDetails={() => onViewDetails(displayNotifications[2])}
            />
          </div>
        )}
      </div>

      {error && (
        <div className="text-red-500 mt-4">⚠️ {error}</div>
      )}
    </section>
  );
};