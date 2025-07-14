import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  UserIcon, 
  ChartBarIcon, 
  CalendarDaysIcon,
  AcademicCapIcon 
} from '@heroicons/react/24/outline';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/dashboard', label: 'Dashboard', icon: UserIcon },
  ];

  return (
    <nav className="flex items-center gap-2 sm:gap-4">
      {navItems.map(({ path, label, icon: Icon }) => (
        <Link 
          key={path}
          to={path}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
            location.pathname === path 
              ? 'bg-white bg-opacity-30 text-black' 
              : 'text-black hover:bg-white hover:bg-opacity-20'
          }`}
        >
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline text-sm sm:text-base">{label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;