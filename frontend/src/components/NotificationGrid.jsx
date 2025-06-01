import React, {useState,useEffect} from 'react';
import { NotificationCard } from './NotificationCard';
import { getPortNotification,getPendingResume } from '../api/post.api';

export const NotificationGrid = ({ user, onViewDetails, notifications, setNotifications }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const bgImg = 'banner.png';

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const res = await getPortNotification();
        const backendData = res.data || [];

        if (backendData.length === 0) {
          // No data from backend, set empty array
          setNotifications([]);
        } else {
          const mapped = backendData.map((item) => ({
            id: item.id,
            status: item.status.toLowerCase(), // e.g. 'APPROVED' → 'approved'
            position: item.jobPosition,
            company: item.company,
            date: item.createdAt.slice(0, 10), // get YYYY-MM-DD
            title: item.title || item.jobPosition,
            url: item.url || '#',
            shortDesc: item.shortDesc || `Application for ${item.jobPosition} at ${item.company}`,
            backgroundImage: '/banner.png'
          }));

          setNotifications(mapped);
        }
      } catch (err) {
        console.error('Error loading notifications:', err);
        setError('Failed to load notifications');
        setNotifications([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [setNotifications]);

  // Show loading state
  if (loading) {
    return (
      <section className="w-full max-w-[1330px] mr-[27px] mt-[115px] max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-500 text-xl">Loading notifications...</div>
        </div>
      </section>
    );
  }

  // Show empty state when no notifications
  if (notifications.length === 0 && !error) {
    return (
      <section className="w-full max-w-[1330px] mr-[27px] mt-[115px] max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[30px] shadow-sm">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Notifications Yet</h3>
          <p className="text-gray-500 text-lg text-center max-w-md">
            You gotta submit a portfolio first to receive notifications about your applications.
          </p>
          <button className="mt-6 bg-[rgba(54,122,255,1)] text-white px-8 py-3 rounded-[30px] hover:bg-blue-600 transition-colors duration-200">
            Submit Portfolio
          </button>
        </div>
      </section>
    );
  }

  // Show notifications when data exists
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

      {error && (
        <div className="text-red-500 mt-4 text-center bg-red-50 p-4 rounded-lg">
          ⚠️ {error}
        </div>
      )}
    </section>
  );
};