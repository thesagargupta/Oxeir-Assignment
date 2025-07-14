import React, { useState, useEffect } from 'react';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  XCircleIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  AcademicCapIcon 
} from '@heroicons/react/24/outline';

const AttendanceTracker = ({ userId = 1 }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, attended, missed, upcoming

  useEffect(() => {
    fetchAttendanceData();
  }, [userId]);

  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      setAttendanceData([
        {
          id: 1,
          workshopId: 1,
          workshopTitle: "React Fundamentals Bootcamp",
          workshopDate: new Date('2024-01-15'),
          duration: 180,
          trainer: "Sarah Johnson",
          status: "attended",
          attendedDuration: 180,
          joinedAt: new Date('2024-01-15T10:00:00'),
          leftAt: new Date('2024-01-15T13:00:00'),
          certificateEarned: true
        },
        {
          id: 2,
          workshopId: 2,
          workshopTitle: "Advanced Python for Data Science",
          workshopDate: new Date('2024-01-18'),
          duration: 240,
          trainer: "Dr. Michael Chen",
          status: "partial",
          attendedDuration: 120,
          joinedAt: new Date('2024-01-18T11:00:00'),
          leftAt: new Date('2024-01-18T13:00:00'),
          certificateEarned: false
        },
        {
          id: 3,
          workshopId: 3,
          workshopTitle: "UI/UX Design Fundamentals",
          workshopDate: new Date('2024-01-10'),
          duration: 150,
          trainer: "Emma Rodriguez",
          status: "missed",
          attendedDuration: 0,
          joinedAt: null,
          leftAt: null,
          certificateEarned: false
        },
        {
          id: 4,
          workshopId: 4,
          workshopTitle: "Node.js Backend Development",
          workshopDate: new Date('2024-01-25'),
          duration: 200,
          trainer: "James Wilson",
          status: "upcoming",
          attendedDuration: 0,
          joinedAt: null,
          leftAt: null,
          certificateEarned: false
        }
      ]);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'attended':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'partial':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'missed':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'upcoming':
        return <CalendarDaysIcon className="h-5 w-5 text-blue-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      attended: 'bg-green-100 text-green-800',
      partial: 'bg-yellow-100 text-yellow-800',
      missed: 'bg-red-100 text-red-800',
      upcoming: 'bg-blue-100 text-blue-800'
    };
    
    return `px-2 py-1 text-xs font-medium rounded-full ${badges[status]}`;
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  const calculateAttendanceRate = () => {
    const completedWorkshops = attendanceData.filter(w => 
      w.status === 'attended' || w.status === 'partial' || w.status === 'missed'
    );
    const attendedWorkshops = completedWorkshops.filter(w => w.status === 'attended');
    
    if (completedWorkshops.length === 0) return 0;
    return (attendedWorkshops.length / completedWorkshops.length) * 100;
  };

  const getFilteredData = () => {
    if (filter === 'all') return attendanceData;
    return attendanceData.filter(item => item.status === filter);
  };

  const filteredData = getFilteredData();
  const attendanceRate = calculateAttendanceRate();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
          <UserGroupIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          Attendance Log
        </h2>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="text-sm text-gray-600">
            Attendance Rate: <span className="font-semibold text-green-600">{attendanceRate.toFixed(1)}%</span>
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-full sm:w-auto"
          >
            <option value="all">All Workshops</option>
            <option value="attended">Attended</option>
            <option value="partial">Partial</option>
            <option value="missed">Missed</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Attended</span>
          </div>
          <div className="text-2xl font-bold text-green-900 mt-1">
            {attendanceData.filter(w => w.status === 'attended').length}
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">Partial</span>
          </div>
          <div className="text-2xl font-bold text-yellow-900 mt-1">
            {attendanceData.filter(w => w.status === 'partial').length}
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <XCircleIcon className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium text-red-800">Missed</span>
          </div>
          <div className="text-2xl font-bold text-red-900 mt-1">
            {attendanceData.filter(w => w.status === 'missed').length}
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <AcademicCapIcon className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Certificates</span>
          </div>
          <div className="text-2xl font-bold text-blue-900 mt-1">
            {attendanceData.filter(w => w.certificateEarned).length}
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="space-y-4">
        {filteredData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <UserGroupIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No attendance records found for the selected filter.</p>
          </div>
        ) : (
          filteredData.map((record) => (
            <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {getStatusIcon(record.status)}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{record.workshopTitle}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">
                      {record.workshopDate.toLocaleDateString()} • {record.trainer}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                  <div className="text-right">
                    <div className="text-xs sm:text-sm text-gray-600">Duration</div>
                    <div className="font-medium text-sm sm:text-base">
                      {record.attendedDuration > 0 
                        ? `${formatDuration(record.attendedDuration)} / ${formatDuration(record.duration)}`
                        : formatDuration(record.duration)
                      }
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={getStatusBadge(record.status)}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                    
                    {record.certificateEarned && (
                      <div className="flex items-center gap-1 text-green-600">
                        <AcademicCapIcon className="h-4 w-4" />
                        <span className="text-xs hidden sm:inline">Certificate</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Attendance Details */}
              {record.status === 'attended' || record.status === 'partial' ? (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-0">
                    <span>
                      Joined: {record.joinedAt?.toLocaleTimeString()}
                    </span>
                    <span>
                      Left: {record.leftAt?.toLocaleTimeString()}
                    </span>
                    <span>
                      Attendance: {((record.attendedDuration / record.duration) * 100).toFixed(1)}%
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        record.status === 'attended' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${(record.attendedDuration / record.duration) * 100}%` }}
                    />
                  </div>
                </div>
              ) : record.status === 'missed' ? (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="text-xs sm:text-sm text-red-600">
                    Workshop was missed. Contact support if you believe this is an error.
                  </div>
                </div>
              ) : (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="text-xs sm:text-sm text-blue-600">
                    Workshop scheduled for {record.workshopDate.toLocaleDateString()} at{' '}
                    {record.workshopDate.toLocaleTimeString()}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AttendanceTracker;