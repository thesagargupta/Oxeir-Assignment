import React, { useState, useEffect } from 'react';
import { 
  UserIcon, 
  AcademicCapIcon, 
  CalendarDaysIcon, 
  ChartBarIcon,
  BellIcon,
  CogIcon,
  BookOpenIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import AttendanceTracker from './AttendanceTracker';
import NotificationSystem from './NotificationSystem';
import Navigation from './Navigation';

const UserDashboard = ({ userId = 1 }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userProfile, setUserProfile] = useState(null);
  const [registeredWorkshops, setRegisteredWorkshops] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Mock user data - in real app, these would be API calls
      setUserProfile({
        id: userId,
        name: "Sagar Gupta",
        email: "Sagarkshn8@gmail.com",
        avatar: "https://images.unsplash.com/photo-1752508970404-fd12ae09b74e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        joinedDate: new Date('2024-01-01'),
        totalWorkshops: 15,
        completedWorkshops: 12,
        certificatesEarned: 8,
        currentStreak: 5,
        totalHours: 48
      });

      setRegisteredWorkshops([
        {
          id: 1,
          title: "React Fundamentals Bootcamp",
          date: new Date('2024-01-25'),
          status: "upcoming",
          trainer: "Sarah Johnson"
        },
        {
          id: 2,
          title: "Advanced Python for Data Science",
          date: new Date('2024-01-18'),
          status: "live",
          trainer: "Dr. Michael Chen"
        },
        {
          id: 3,
          title: "UI/UX Design Fundamentals",
          date: new Date('2024-01-10'),
          status: "completed",
          trainer: "Emma Rodriguez"
        }
      ]);

      setAchievements([
        {
          id: 1,
          title: "Early Bird",
          description: "Registered for 5 workshops in advance",
          icon: "🐦",
          earnedDate: new Date('2024-01-15'),
          category: "engagement"
        },
        {
          id: 2,
          title: "Perfect Attendance",
          description: "Attended 10 workshops without missing any",
          icon: "✨",
          earnedDate: new Date('2024-01-20'),
          category: "attendance"
        },
        {
          id: 3,
          title: "Knowledge Seeker",
          description: "Completed workshops from 3 different categories",
          icon: "📚",
          earnedDate: new Date('2024-01-12'),
          category: "diversity"
        }
      ]);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base whitespace-nowrap ${
        isActive 
          ? 'bg-blue-500 text-white' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">{label.split(' ')[0]}</span>
    </button>
  );

  const StatCard = ({ title, value, subtitle, icon: Icon, color = 'blue' }) => {
    const colorClasses = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600'
    };

    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{title}</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {subtitle && <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">{subtitle}</p>}
          </div>
          <div className={`p-2 sm:p-3 rounded-full ${colorClasses[color]} flex-shrink-0`}>
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        </div>
      </div>
    );
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* User Stats */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Workshops"
          value={userProfile.totalWorkshops}
          subtitle="Registered"
          icon={BookOpenIcon}
          color="blue"
        />
        <StatCard
          title="Completed"
          value={userProfile.completedWorkshops}
          subtitle="Workshops finished"
          icon={AcademicCapIcon}
          color="green"
        />
        <StatCard
          title="Certificates"
          value={userProfile.certificatesEarned}
          subtitle="Earned"
          icon={TrophyIcon}
          color="purple"
        />
        <StatCard
          title="Learning Hours"
          value={userProfile.totalHours}
          subtitle="Total time"
          icon={ChartBarIcon}
          color="orange"
        />
      </div>

      {/* Recent Workshops */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Workshops</h3>
        <div className="space-y-3">
          {registeredWorkshops.map((workshop) => (
            <div key={workshop.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">{workshop.title}</h4>
                <p className="text-sm text-gray-600 truncate">{workshop.trainer}</p>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-3">
                <span className="text-sm text-gray-500">
                  {workshop.date.toLocaleDateString()}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                  workshop.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                  workshop.status === 'live' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {workshop.status.charAt(0).toUpperCase() + workshop.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl sm:text-4xl mb-2">{achievement.icon}</div>
              <h4 className="font-medium text-gray-900 text-sm sm:text-base">{achievement.title}</h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{achievement.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                Earned on {achievement.earnedDate.toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProfileTab = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-20 h-20 rounded-full flex-shrink-0"
          />
          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-semibold text-gray-900">{userProfile.name}</h4>
            <p className="text-sm sm:text-base text-gray-600">{userProfile.email}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Member since {userProfile.joinedDate.toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={userProfile.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={userProfile.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              readOnly
            />
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors w-full sm:w-auto text-sm sm:text-base">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-blue-600 h-16 sm:h-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="animate-pulse space-y-6">
            <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/2 sm:w-1/4"></div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 sm:h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Navigation />
            <div className="flex items-center gap-4">
              <NotificationSystem userId={userId} />
              <button className="p-2 text-black hover:bg-white hover:bg-opacity-20 rounded-full">
                <CogIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>
          </div>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Welcome back, {userProfile.name}!</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 min-w-max">
            <TabButton
              id="overview"
              label="Overview"
              icon={ChartBarIcon}
              isActive={activeTab === 'overview'}
              onClick={setActiveTab}
            />
            <TabButton
              id="attendance"
              label="Attendance"
              icon={CalendarDaysIcon}
              isActive={activeTab === 'attendance'}
              onClick={setActiveTab}
            />
            <TabButton
              id="profile"
              label="Profile"
              icon={UserIcon}
              isActive={activeTab === 'profile'}
              onClick={setActiveTab}
            />
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'attendance' && <AttendanceTracker userId={userId} />}
          {activeTab === 'profile' && <ProfileTab />}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;