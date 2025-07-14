import React from 'react';

const FilterButtons = ({ activeFilter, onFilterChange, counts }) => {
  const filters = [
    { id: 'all', label: 'All Workshops', count: counts.all },
    { id: 'upcoming', label: 'Upcoming', count: counts.upcoming },
    { id: 'live', label: 'Live Now', count: counts.live },
    { id: 'completed', label: 'Completed', count: counts.completed }
  ];

  const getButtonClass = (filterId) => {
    const baseClass = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2";
    
    if (filterId === activeFilter) {
      switch (filterId) {
        case 'live':
          return `${baseClass} bg-red-500 text-white shadow-md`;
        case 'upcoming':
          return `${baseClass} bg-blue-500 text-white shadow-md`;
        case 'completed':
          return `${baseClass} bg-gray-500 text-white shadow-md`;
        default:
          return `${baseClass} bg-gray-900 text-white shadow-md`;
      }
    }
    
    return `${baseClass} bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400`;
  };

  const getCountBadge = (count, filterId) => {
    if (count === 0) return null;
    
    const baseClass = "px-2 py-1 rounded-full text-xs font-medium";
    
    if (filterId === activeFilter) {
      return (
        <span className={`${baseClass} bg-white bg-opacity-30 text-white`}>
          {count}
        </span>
      );
    }
    
    switch (filterId) {
      case 'live':
        return (
          <span className={`${baseClass} bg-red-100 text-red-800`}>
            {count}
          </span>
        );
      case 'upcoming':
        return (
          <span className={`${baseClass} bg-blue-100 text-blue-800`}>
            {count}
          </span>
        );
      case 'completed':
        return (
          <span className={`${baseClass} bg-gray-100 text-gray-800`}>
            {count}
          </span>
        );
      default:
        return (
          <span className={`${baseClass} bg-gray-100 text-gray-800`}>
            {count}
          </span>
        );
    }
  };

  const getLiveIndicator = (filterId) => {
    if (filterId === 'live' && counts.live > 0) {
      return (
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={getButtonClass(filter.id)}
        >
          {getLiveIndicator(filter.id)}
          <span>{filter.label}</span>
          {getCountBadge(filter.count, filter.id)}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;