import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { FaWhatsapp } from "react-icons/fa6";
import { 
  XMarkIcon, 
  ClockIcon, 
  CalendarDaysIcon, 
  UserGroupIcon, 
  PlayIcon,
  CheckCircleIcon,
  VideoCameraIcon,
  MapPinIcon,
  WifiIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

const WorkshopModal = ({ workshop, isOpen, onClose, onRegister, isRegistered }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !workshop) return null;

  const {
    title,
    subtitle,
    description,
    date,
    duration,
    mode,
    trainer,
    capacity,
    status,
    tags,
    zoomLink,
    youtubeLink,
    whatsappGroup,
    agenda
  } = workshop;

  const formatDate = (date) => {
    return format(new Date(date), 'EEEE, MMMM dd, yyyy');
  };

  const formatTime = (date) => {
    return format(new Date(date), 'h:mm a');
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  const getModeIcon = () => {
    switch (mode.toLowerCase()) {
      case 'online':
        return <VideoCameraIcon className="h-5 w-5" />;
      case 'offline':
        return <MapPinIcon className="h-5 w-5" />;
      case 'hybrid':
        return <WifiIcon className="h-5 w-5" />;
      default:
        return <VideoCameraIcon className="h-5 w-5" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'live':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            Live Now
          </div>
        );
      case 'upcoming':
        return (
          <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            Upcoming
          </div>
        );
      case 'completed':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
            <CheckCircleIcon className="h-4 w-4" />
            Completed
          </div>
        );
      default:
        return null;
    }
  };

  const generateCalendarURL = () => {
    const startDate = new Date(date);
    const endDate = new Date(startDate.getTime() + duration * 60000);
    
    const formatDateForCalendar = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: `${formatDateForCalendar(startDate)}/${formatDateForCalendar(endDate)}`,
      details: description,
      location: mode === 'online' ? 'Online' : 'TBD'
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const handleAddToCalendar = () => {
    window.open(generateCalendarURL(), '_blank');
  };

  const handleJoinWhatsApp = () => {
    window.open(whatsappGroup, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: subtitle,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const getActionButtons = () => {
    if (status === 'live') {
      return (
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => window.open(zoomLink || youtubeLink, '_blank')}
            className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium flex-1 justify-center text-sm sm:text-base"
          >
            <PlayIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            Join Live Session
          </button>
          <button
            onClick={handleJoinWhatsApp}
            className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-sm sm:text-base w-full sm:w-auto justify-center"
          >
            <FaWhatsapp className="h-4 w-4 sm:h-5 sm:w-5" />
            WhatsApp Group
          </button>
        </div>
      );
    }
    
    if (status === 'upcoming') {
      return (
        <div className="space-y-3">
          {/* Primary Action Button */}
          <div className="flex gap-3">
            {isRegistered ? (
              <button
                disabled
                className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-green-100 text-green-800 rounded-lg cursor-not-allowed font-medium flex-1 justify-center text-sm sm:text-base"
              >
                <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                Registered
              </button>
            ) : capacity.filled >= capacity.total ? (
              <button
                disabled
                className="px-4 sm:px-6 py-3 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed font-medium flex-1 text-sm sm:text-base"
              >
                Workshop Full
              </button>
            ) : (
              <button
                onClick={onRegister}
                className="px-4 sm:px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex-1 text-sm sm:text-base"
              >
                Register Now
              </button>
            )}
          </div>
          
          {/* Secondary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCalendar}
              className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              Add to Calendar
            </button>
            
            <button
              onClick={handleJoinWhatsApp}
              className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <FaWhatsapp className="h-4 w-4 sm:h-5 sm:w-5" />
              WhatsApp Group
            </button>
          </div>
        </div>
      );
    }
    
    if (status === 'completed') {
      return (
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => window.open(youtubeLink, '_blank')}
            className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium flex-1 justify-center text-sm sm:text-base"
          >
            <PlayIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            Watch Recording
          </button>
          <button
            onClick={handleJoinWhatsApp}
            className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-sm sm:text-base w-full sm:w-auto justify-center"
          >
            <ChatBubbleLeftRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            WhatsApp Group
          </button>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-4 sm:p-6 border-b border-gray-200">
          <div className="flex-1 pr-2">
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 pr-2">{title}</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
              >
                <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
              </button>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-3">{subtitle}</p>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {getStatusBadge()}
              <button
                onClick={handleShare}
                className="flex items-center gap-1 px-2 py-1 text-gray-500 hover:text-gray-700 transition-colors text-sm"
              >
                <ShareIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          <div className="p-4 sm:p-6">
            {/* Workshop Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Workshop Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">{formatDate(date)}</div>
                      <div className="text-sm text-gray-500">at {formatTime(date)}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <ClockIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">{formatDuration(duration)}</div>
                      <div className="text-sm text-gray-500">Duration</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {getModeIcon()}
                    <div>
                      <div className="font-medium text-gray-900">{mode}</div>
                      <div className="text-sm text-gray-500">Mode</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <UserGroupIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">
                        {capacity.filled}/{capacity.total} seats filled
                      </div>
                      <div className="text-sm text-gray-500">Capacity</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trainer Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Trainer</h3>
                <div className="flex items-start gap-4">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900 text-lg">{trainer.name}</div>
                    <p className="text-gray-600 text-sm mt-1">{trainer.bio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Topics Covered</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Agenda */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Agenda</h3>
              <div className="space-y-2">
                {agenda.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Capacity Progress */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Enrollment Status</h3>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-300 ${
                    capacity.filled >= capacity.total 
                      ? 'bg-red-500' 
                      : capacity.filled / capacity.total > 0.7 
                        ? 'bg-orange-500' 
                        : 'bg-green-500'
                  }`}
                  style={{ width: `${(capacity.filled / capacity.total) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>{capacity.filled} enrolled</span>
                <span>{capacity.total - capacity.filled} spots remaining</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50 flex-shrink-0">
          {getActionButtons()}
        </div>
      </div>
    </div>
  );
};

export default WorkshopModal;