import React from 'react';
import { Squares2X2Icon, CalendarDaysIcon } from '@heroicons/react/24/outline';

const ViewToggle = ({ currentView, onViewChange }) => {
  const views = [
    { id: 'grid', label: 'Grid View', icon: Squares2X2Icon },
    { id: 'calendar', label: 'Calendar View', icon: CalendarDaysIcon }
  ];

  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-1">
      {views.map(view => {
        const Icon = view.icon;
        const isActive = currentView === view.id;
        
        return (
          <button
            key={view.id}
            onClick={() => onViewChange(view.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
              isActive 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{view.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ViewToggle;