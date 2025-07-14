import React, { useState } from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isToday, addWeeks, subWeeks } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

const CalendarView = ({ workshops, onWorkshopClick, onDateSelect }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 }); // Monday
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const goToPreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const goToNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const goToToday = () => {
    setCurrentWeek(new Date());
    setSelectedDate(new Date());
  };

  const getWorkshopsForDate = (date) => {
    return workshops.filter(workshop => 
      isSameDay(new Date(workshop.date), date)
    );
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const getDayClass = (date) => {
    const baseClass = "min-h-32 p-2 border border-gray-200 cursor-pointer transition-all duration-200 hover:bg-gray-50";
    
    if (isToday(date)) {
      return `${baseClass} bg-blue-50 border-blue-300`;
    }
    
    if (selectedDate && isSameDay(date, selectedDate)) {
      return `${baseClass} bg-blue-100 border-blue-400`;
    }
    
    return baseClass;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'live':
        return 'bg-red-500 text-white';
      case 'upcoming':
        return 'bg-blue-500 text-white';
      case 'completed':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <CalendarDaysIcon className="h-5 w-5" />
            Week of {format(weekStart, 'MMM dd, yyyy')}
          </h3>
          <button
            onClick={goToToday}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Today
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousWeek}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            aria-label="Previous week"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          
          <button
            onClick={goToNextWeek}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            aria-label="Next week"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0">
        {/* Day Headers */}
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="p-4 bg-gray-100 border-r border-gray-200 last:border-r-0 text-center"
          >
            <div className="font-medium text-gray-900">
              {format(day, 'EEE')}
            </div>
            <div className={`text-2xl font-bold mt-1 ${isToday(day) ? 'text-blue-600' : 'text-gray-700'}`}>
              {format(day, 'd')}
            </div>
          </div>
        ))}

        {/* Day Cells */}
        {weekDays.map((day, index) => {
          const dayWorkshops = getWorkshopsForDate(day);
          
          return (
            <div
              key={index}
              className={getDayClass(day)}
              onClick={() => handleDateClick(day)}
            >
              <div className="space-y-2">
                {dayWorkshops.map((workshop) => (
                  <div
                    key={workshop.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onWorkshopClick(workshop);
                    }}
                    className={`p-2 rounded text-xs font-medium cursor-pointer hover:opacity-90 transition-opacity ${getStatusColor(workshop.status)}`}
                  >
                    <div className="font-semibold truncate">
                      {workshop.title}
                    </div>
                    <div className="opacity-90">
                      {format(new Date(workshop.date), 'HH:mm')}
                    </div>
                    <div className="opacity-80 truncate">
                      {workshop.trainer.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Date Info */}
      {selectedDate && (
        <div className="p-4 bg-blue-50 border-t border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">
            {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          </h4>
          <div className="text-sm text-blue-700">
            {getWorkshopsForDate(selectedDate).length === 0 ? (
              <p>No workshops scheduled for this date.</p>
            ) : (
              <p>
                {getWorkshopsForDate(selectedDate).length} workshop{getWorkshopsForDate(selectedDate).length !== 1 ? 's' : ''} scheduled
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;