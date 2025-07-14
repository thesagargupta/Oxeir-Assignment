import React, { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  ClockIcon,
  StarIcon,
  EyeIcon,
  CurrencyDollarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { FaArrowTrendUp } from "react-icons/fa6";

const AnalyticsDashboard = ({ workshops }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('all');

  useEffect(() => {
    fetchAnalytics();
  }, [workshops, timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // Mock analytics data - replace with actual API call
      const mockAnalytics = {
        totalRevenue: 45000,
        averageAttendance: 85.5,
        completionRate: 92.3,
        totalWorkshops: 24,
        totalParticipants: 1250,
        monthlyGrowth: 12.5,
        topCategories: ['Frontend', 'Backend', 'DevOps'],
        recentActivity: {
          registrations: 156,
          completions: 134,
          cancellations: 8
        }
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  };

  const calculateMetrics = () => {
    if (!workshops.length) return null;

    const now = new Date();
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    let filteredWorkshops = workshops;
    
    if (timeRange === 'week') {
      filteredWorkshops = workshops.filter(w => new Date(w.date) >= thisWeek);
    } else if (timeRange === 'month') {
      filteredWorkshops = workshops.filter(w => new Date(w.date) >= thisMonth);
    }

    const totalRevenue = filteredWorkshops.reduce((sum, w) => sum + (w.price || 0) * w.capacity.filled, 0);
    const averageAttendance = filteredWorkshops.reduce((sum, w) => sum + (w.capacity.filled / w.capacity.total), 0) / filteredWorkshops.length;
    const completionRate = filteredWorkshops.filter(w => w.status === 'completed').length / filteredWorkshops.length;
    const topTrainer = getTopTrainer(filteredWorkshops);
    const popularCategory = getPopularCategory(filteredWorkshops);

    return {
      totalRevenue,
      averageAttendance: averageAttendance * 100,
      completionRate: completionRate * 100,
      topTrainer,
      popularCategory,
      totalWorkshops: filteredWorkshops.length,
      totalParticipants: filteredWorkshops.reduce((sum, w) => sum + w.capacity.filled, 0)
    };
  };

  const getTopTrainer = (workshops) => {
    const trainerStats = workshops.reduce((acc, w) => {
      const trainer = w.trainer.name;
      acc[trainer] = (acc[trainer] || 0) + w.capacity.filled;
      return acc;
    }, {});

    return Object.entries(trainerStats)
      .sort(([,a], [,b]) => b - a)[0];
  };

  const getPopularCategory = (workshops) => {
    const categoryStats = workshops.reduce((acc, w) => {
      acc[w.category] = (acc[w.category] || 0) + w.capacity.filled;
      return acc;
    }, {});

    return Object.entries(categoryStats)
      .sort(([,a], [,b]) => b - a)[0];
  };

  const MetricCard = ({ icon: Icon, title, value, subtitle, trend, color = 'blue' }) => {
    const colorClasses = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      orange: 'bg-orange-50 text-orange-700 border-orange-200',
      red: 'bg-red-50 text-red-700 border-red-200',
      gray: 'bg-gray-50 text-gray-700 border-gray-200'
    };

    return (
      <div className={`p-4 sm:p-6 rounded-xl border ${colorClasses[color]} relative overflow-hidden hover:shadow-lg transition-shadow duration-300`}>
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-600 truncate">{title}</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 truncate">{value}</p>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1 truncate">{subtitle}</p>
            )}
            {trend && (
              <div className={`flex items-center gap-1 mt-2 text-sm ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                <FaArrowTrendUp className={`h-4 w-4 ${trend.positive ? '' : 'rotate-180'}`} />
                <span>{trend.value}</span>
              </div>
            )}
          </div>
          <div className="p-2 sm:p-3 bg-white bg-opacity-50 rounded-full flex-shrink-0 ml-2">
            <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600" />
          </div>
        </div>
      </div>
    );
  };

  const EnrollmentChart = ({ workshops }) => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date;
    }).reverse();

    const enrollmentData = last7Days.map(date => {
      const dayWorkshops = workshops.filter(w => {
        const workshopDate = new Date(w.date);
        return workshopDate.toDateString() === date.toDateString();
      });
      
      return {
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        enrollments: dayWorkshops.reduce((sum, w) => sum + w.capacity.filled, 0)
      };
    });

    const maxEnrollments = Math.max(...enrollmentData.map(d => d.enrollments));

    return (
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrollments (Last 7 Days)</h3>
        <div className="flex items-end gap-1 sm:gap-2 h-32 sm:h-40">
          {enrollmentData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t hover:from-blue-600 hover:to-blue-500 transition-colors duration-200"
                style={{ 
                  height: `${maxEnrollments > 0 ? (data.enrollments / maxEnrollments) * 100 : 0}%`,
                  minHeight: data.enrollments > 0 ? '4px' : '0'
                }}
              />
              <div className="text-xs text-gray-600 mt-2 text-center">{data.date}</div>
              <div className="text-xs font-medium text-gray-900 text-center">{data.enrollments}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const TopWorkshops = ({ workshops }) => {
    const topWorkshops = [...workshops]
      .sort((a, b) => b.capacity.filled - a.capacity.filled)
      .slice(0, 5);

    return (
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Workshops by Enrollment</h3>
        <div className="space-y-3">
          {topWorkshops.map((workshop, index) => (
            <div key={workshop.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{workshop.title}</p>
                <p className="text-xs text-gray-500">{workshop.trainer.name}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="text-sm font-medium text-gray-900 hidden sm:block">
                  {workshop.capacity.filled}/{workshop.capacity.total}
                </div>
                <div className="w-12 sm:w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(workshop.capacity.filled / workshop.capacity.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const metrics = calculateMetrics();

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="flex items-center gap-2">
          <label htmlFor="timeRange" className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Time Range:
          </label>
          <select
            id="timeRange"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="all">All Time</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <MetricCard
          icon={ChartBarIcon}
          title="Total Workshops"
          value={metrics?.totalWorkshops || 0}
          subtitle="Active workshops"
          color="blue"
        />
        
        <MetricCard
          icon={UserGroupIcon}
          title="Total Participants"
          value={metrics?.totalParticipants || 0}
          subtitle="Enrolled learners"
          color="green"
        />
        
        <MetricCard
          icon={FaArrowTrendUp}
          title="Avg Attendance"
          value={`${(metrics?.averageAttendance || 0).toFixed(1)}%`}
          subtitle="Enrollment rate"
          color="purple"
        />
        
        <MetricCard
          icon={CheckCircleIcon}
          title="Completion Rate"
          value={`${(metrics?.completionRate || 0).toFixed(1)}%`}
          subtitle="Workshops completed"
          color="orange"
        />
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <MetricCard
          icon={CurrencyDollarIcon}
          title="Total Revenue"
          value={`$${(metrics?.totalRevenue || 0).toLocaleString()}`}
          subtitle="From paid workshops"
          color="green"
        />
        
        <MetricCard
          icon={StarIcon}
          title="Top Trainer"
          value={metrics?.topTrainer?.[0] || 'N/A'}
          subtitle={`${metrics?.topTrainer?.[1] || 0} participants`}
          color="purple"
        />
        
        <MetricCard
          icon={EyeIcon}
          title="Popular Category"
          value={metrics?.popularCategory?.[0] || 'N/A'}
          subtitle={`${metrics?.popularCategory?.[1] || 0} enrollments`}
          color="blue"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        <EnrollmentChart workshops={workshops} />
        <TopWorkshops workshops={workshops} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;