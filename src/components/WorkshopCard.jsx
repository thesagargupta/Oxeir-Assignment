import React from 'react';
import { format } from 'date-fns';
import { 
  ClockIcon, 
  CalendarDaysIcon, 
  UserGroupIcon, 
  PlayIcon,
  CheckCircleIcon,
  VideoCameraIcon,
  MapPinIcon,
  WifiIcon
} from '@heroicons/react/24/outline';

const WorkshopCard = ({ workshop, onClick, onRegister, isRegistered }) => {
  const {
    title,
    subtitle,
    date,
    duration,
    mode,
    trainer,
    capacity,
    status,
    tags,
    zoomLink,
    youtubeLink
  } = workshop;

  const formatDate = (date) => {
    return format(new Date(date), 'MMM dd, yyyy');
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

  const getStatusBadge = () => {
    switch (status) {
      case 'live':
        return (
          <div className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-bl-lg rounded-tr-xl text-sm font-medium shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            Live Now
          </div>
        );
      case 'upcoming':
        return (
          <div className="px-3 py-2 bg-blue-500 text-white rounded-bl-lg rounded-tr-xl text-sm font-medium shadow-lg">
            Upcoming
          </div>
        );
      case 'completed':
        return (
          <div className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-bl-lg rounded-tr-xl text-sm font-medium shadow-lg">
            <CheckCircleIcon className="h-4 w-4" />
            Completed
          </div>
        );
      default:
        return null;
    }
  };

  const getModeIcon = () => {
    switch (mode.toLowerCase()) {
      case 'online':
        return <VideoCameraIcon className="h-4 w-4 text-purple-600" />;
      case 'offline':
        return <MapPinIcon className="h-4 w-4 text-purple-600" />;
      case 'hybrid':
        return <WifiIcon className="h-4 w-4 text-purple-600" />;
      default:
        return <VideoCameraIcon className="h-4 w-4 text-purple-600" />;
    }
  };

  const getActionButton = () => {
    if (status === 'live') {
      return (
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.open(zoomLink || youtubeLink, '_blank');
          }}
          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
        >
          <PlayIcon className="h-4 w-4" />
          Join Live Session
        </button>
      );
    }
    
    if (status === 'upcoming') {
      if (isRegistered) {
        return (
          <button
            disabled
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-lg cursor-not-allowed font-semibold border border-green-300"
          >
            <CheckCircleIcon className="h-4 w-4" />
            Successfully Registered
          </button>
        );
      }
      
      if (capacity.filled >= capacity.total) {
        return (
          <button
            disabled
            className="w-full px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-500 rounded-lg cursor-not-allowed font-semibold border border-gray-300"
          >
            Workshop Full
          </button>
        );
      }
      
      return (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRegister();
          }}
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
        >
          Register Now
        </button>
      );
    }
    
    if (status === 'completed') {
      return (
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.open(youtubeLink, '_blank');
          }}
          className="w-full px-4 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
        >
          Watch Recording
        </button>
      );
    }
    
    return null;
  };

  const getCapacityColor = () => {
    const percentage = (capacity.filled / capacity.total) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group animate-fadeIn relative overflow-hidden"
    >
      {/* Status Banner */}
      <div className="absolute top-0 right-0 z-10">
        {getStatusBadge()}
      </div>
      
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 pr-4">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
              {title}
            </h3>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">{subtitle}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-3 py-1 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border border-gray-200 rounded-full text-xs font-medium">
              +{tags.length - 3} more
            </span>
          )}
        </div>

        {/* Workshop Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="p-2 bg-blue-50 rounded-lg">
              <CalendarDaysIcon className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{formatDate(date)}</p>
              <p className="text-xs text-gray-500">{formatTime(date)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="p-2 bg-green-50 rounded-lg">
              <ClockIcon className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{formatDuration(duration)}</p>
              <p className="text-xs text-gray-500">Duration</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="p-2 bg-purple-50 rounded-lg">
              {getModeIcon()}
            </div>
            <div>
              <p className="font-medium text-gray-900">{mode}</p>
              <p className="text-xs text-gray-500">Mode</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <div className="p-2 bg-orange-50 rounded-lg">
              <UserGroupIcon className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <p className={`font-medium ${getCapacityColor()}`}>
                {capacity.filled}/{capacity.total}
              </p>
              <p className="text-xs text-gray-500">Enrolled</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trainer Info */}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <img
            src={trainer.image}
            alt={trainer.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{trainer.name}</div>
            <div className="text-sm text-gray-600">Workshop Trainer</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">4.8</span>
          </div>
        </div>
      </div>

      {/* Capacity Bar */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Enrollment Progress</span>
          <span className="text-sm text-gray-500">
            {Math.round((capacity.filled / capacity.total) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              capacity.filled >= capacity.total 
                ? 'bg-gradient-to-r from-red-500 to-red-600' 
                : capacity.filled / capacity.total > 0.7 
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600' 
                  : 'bg-gradient-to-r from-green-500 to-green-600'
            }`}
            style={{ width: `${(capacity.filled / capacity.total) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-6 pb-6">
        {getActionButton()}
      </div>
    </div>
  );
};

export default WorkshopCard;