import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import FilterButtons from './FilterButtons';
import SearchBar from './SearchBar';
import TagFilter from './TagFilter';
import ViewToggle from './ViewToggle';

const MobileMenu = ({
  workshops,
  activeFilter,
  onFilterChange,
  statusCounts,
  searchTerm,
  onSearchChange,
  selectedTags,
  onTagsChange,
  currentView,
  onViewChange,
  filteredWorkshops
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
      >
        <span className="sr-only">Open menu</span>
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={closeMenu} />
      )}

      {/* Mobile Menu Panel */}
      <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Filters & Options</h2>
          <button
            onClick={closeMenu}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 space-y-6 overflow-y-auto">
          {/* Search */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Search</h3>
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              placeholder="Search workshops..."
            />
          </div>

          {/* View Toggle */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">View</h3>
            <ViewToggle
              currentView={currentView}
              onViewChange={onViewChange}
            />
          </div>

          {/* Status Filters */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Status</h3>
            <div className="space-y-2">
              <FilterButtons
                activeFilter={activeFilter}
                onFilterChange={onFilterChange}
                counts={statusCounts}
              />
            </div>
          </div>

          {/* Tag Filters */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Topics</h3>
            <TagFilter
              workshops={workshops}
              selectedTags={selectedTags}
              onTagsChange={onTagsChange}
            />
          </div>

          {/* Results Count */}
          <div className="pt-4 border-t">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{filteredWorkshops.length}</span> workshops found
            </div>
          </div>

          {/* Apply Button */}
          <div className="pt-4">
            <button
              onClick={closeMenu}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;