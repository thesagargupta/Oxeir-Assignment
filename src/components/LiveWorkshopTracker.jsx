import React, { useState, useEffect } from 'react';
import {
  PlayIcon,
  UsersIcon,
  ClockIcon,
  RadioIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const LiveWorkshopTracker = ({ workshops, onWorkshopUpdate }) => {
  const [liveWorkshops, setLiveWorkshops] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});
  const [dismissed, setDismissed] = useState(new Set());

  useEffect(() => {
    const live = workshops.filter(
      (w) => w.status === 'live' && !dismissed.has(w.id)
    );
    setLiveWorkshops(live);

    const interval = setInterval(() => {
      updateWorkshopStatus();
      updateTimeLeft();
    }, 1000);

    return () => clearInterval(interval);
  }, [workshops, dismissed]);

  const updateWorkshopStatus = () => {
    const now = new Date();

    workshops.forEach((workshop) => {
      const workshopDate = new Date(workshop.date);
      const workshopEnd = new Date(
        workshopDate.getTime() + workshop.duration * 60000
      );

      // Make live
      if (
        workshopDate <= now &&
        now <= workshopEnd &&
        workshop.status === 'upcoming'
      ) {
        workshop.status = 'live';
        onWorkshopUpdate && onWorkshopUpdate(workshop);
        window.showToast && window.showToast(`${workshop.title} is now live!`, 'info');
      }

      // Mark completed
      if (now > workshopEnd && workshop.status === 'live') {
        workshop.status = 'completed';
        onWorkshopUpdate && onWorkshopUpdate(workshop);
        window.showToast && window.showToast(`${workshop.title} has ended`, 'info');
      }
    });
  };

  const updateTimeLeft = () => {
    const now = new Date();
    const newTimeLeft = {};

    liveWorkshops.forEach((workshop) => {
      const workshopDate = new Date(workshop.date);
      const workshopEnd = new Date(
        workshopDate.getTime() + workshop.duration * 60000
      );
      const timeRemaining = workshopEnd - now;

      if (timeRemaining > 0) {
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor(
          (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        newTimeLeft[workshop.id] = { hours, minutes, seconds };
      }
    });

    setTimeLeft(newTimeLeft);
  };

  const formatTimeRemaining = (time) => {
    if (!time) return '00:00:00';
    return `${time.hours.toString().padStart(2, '0')}:${time.minutes
      .toString()
      .padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
  };

  const joinWorkshop = (workshop) => {
    const link = workshop.zoomLink || workshop.youtubeLink;
    if (link) {
      window.open(link, '_blank');
    }
  };

  const dismissWorkshop = (id) => {
    setDismissed((prev) => new Set(prev).add(id));
  };

  if (liveWorkshops.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {liveWorkshops.map((workshop) => (
        <div
          key={workshop.id}
          className="relative bg-red-500 text-white rounded-lg shadow-lg p-4 max-w-sm animate-pulse"
        >
          {/* Cross Button */}
          <button
            onClick={() => dismissWorkshop(workshop.id)}
            className="absolute top-2 right-2 p-1 text-white hover:text-gray-300"
            aria-label="Dismiss"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <RadioIcon className="h-5 w-5 animate-pulse" />
            <span className="font-semibold text-sm">LIVE NOW</span>
          </div>

          <h4 className="font-bold text-lg mb-2">{workshop.title}</h4>

          <div className="flex items-center gap-4 mb-3 text-sm">
            <div className="flex items-center gap-1">
              <UsersIcon className="h-4 w-4" />
              <span>
                {workshop.capacity.filled}/{workshop.capacity.total}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              <span>{formatTimeRemaining(timeLeft[workshop.id])}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => joinWorkshop(workshop)}
              className="flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm"
            >
              <PlayIcon className="h-4 w-4" />
              Join Now
            </button>

            <div className="flex items-center gap-1 text-sm">
              <img
                src={workshop.trainer.image}
                alt={workshop.trainer.name}
                className="w-6 h-6 rounded-full"
              />
              <span>{workshop.trainer.name}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveWorkshopTracker;
