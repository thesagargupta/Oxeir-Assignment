import React from 'react';
import { 
  AcademicCapIcon, 
  ClockIcon, 
  UserGroupIcon, 
  CalendarDaysIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const WorkshopStats = ({ workshops }) => {
  const calculateStats = () => {
    const totalWorkshops = workshops.length;
    const upcomingWorkshops = workshops.filter(w => w.status === 'upcoming').length;
    const liveWorkshops = workshops.filter(w => w.status === 'live').length;
    const completedWorkshops = workshops.filter(w => w.status === 'completed').length;
    
    const totalCapacity = workshops.reduce((sum, w) => sum + w.capacity.total, 0);
    const totalEnrolled = workshops.reduce((sum, w) => sum + w.capacity.filled, 0);
    const enrollmentRate = totalCapacity > 0 ? (totalEnrolled / totalCapacity) * 100 : 0;
    
    const totalDuration = workshops.reduce((sum, w) => sum + w.duration, 0);
    const averageDuration = totalWorkshops > 0 ? totalDuration / totalWorkshops : 0;
    
    const onlineWorkshops = workshops.filter(w => w.mode === 'Online').length;
    const offlineWorkshops = workshops.filter(w => w.mode === 'Offline').length;
    const hybridWorkshops = workshops.filter(w => w.mode === 'Hybrid').length;
    
    return {
      totalWorkshops,
      upcomingWorkshops,
      liveWorkshops,
      completedWorkshops,
      totalCapacity,
      totalEnrolled,
      enrollmentRate,
      averageDuration,
      onlineWorkshops,
      offlineWorkshops,
      hybridWorkshops
    };
  };

  const stats = calculateStats();

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'blue' }) => {
    const colorClasses = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      red: 'bg-red-50 text-red-700 border-red-200',
      yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      gray: 'bg-gray-50 text-gray-700 border-gray-200'
    };

    return (
      <div className={`p-4 rounded-lg border ${colorClasses[color]}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          <Icon className="h-8 w-8 text-gray-400" />
        </div>
      </div>
    );
  };

  const ModeChart = () => (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <ChartBarIcon className="h-5 w-5" />
        Workshop Modes
      </h4>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Online</span>
          <div className="flex items-center gap-2">
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${stats.totalWorkshops ? (stats.onlineWorkshops / stats.totalWorkshops) * 100 : 0}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-900">{stats.onlineWorkshops}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Offline</span>
          <div className="flex items-center gap-2">
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${stats.totalWorkshops ? (stats.offlineWorkshops / stats.totalWorkshops) * 100 : 0}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-900">{stats.offlineWorkshops}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Hybrid</span>
          <div className="flex items-center gap-2">
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${stats.totalWorkshops ? (stats.hybridWorkshops / stats.totalWorkshops) * 100 : 0}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-900">{stats.hybridWorkshops}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <ArrowTrendingUpIcon className="h-5 w-5" />
        Workshop Statistics
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={AcademicCapIcon}
          title="Total Workshops"
          value={stats.totalWorkshops}
          color="blue"
        />
        
        <StatCard
          icon={CalendarDaysIcon}
          title="Upcoming"
          value={stats.upcomingWorkshops}
          color="green"
        />
        
        <StatCard
          icon={UserGroupIcon}
          title="Total Enrolled"
          value={stats.totalEnrolled}
          subtitle={`${stats.enrollmentRate.toFixed(1)}% enrollment rate`}
          color="purple"
        />
        
        <StatCard
          icon={ClockIcon}
          title="Avg Duration"
          value={formatDuration(stats.averageDuration)}
          subtitle={`${formatDuration(stats.totalDuration)} total`}
          color="yellow"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ModeChart />
        
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3">Status Overview</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Live Now</span>
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                {stats.liveWorkshops}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Upcoming</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {stats.upcomingWorkshops}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Completed</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                {stats.completedWorkshops}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopStats;