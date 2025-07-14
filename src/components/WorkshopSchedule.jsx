import React, { useState, useEffect } from "react";
import {
  CalendarDaysIcon,
  FunnelIcon,
  HomeIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { workshopApi } from "../services/workshopApi";
import WorkshopCard from "./WorkshopCard";
import WorkshopModal from "./WorkshopModal";
import FilterButtons from "./FilterButtons";
import LoadingSpinner from "./LoadingSpinner";
import SearchBar from "./SearchBar";
import CalendarView from "./CalendarView";
import TagFilter from "./TagFilter";
import ViewToggle from "./ViewToggle";
import { ToastManager } from "./Toast";
import WorkshopStats from "./WorkshopStats";
import MobileMenu from "./MobileMenu";
import NotificationSystem from "./NotificationSystem";
import LiveWorkshopTracker from "./LiveWorkshopTracker";
import AnalyticsDashboard from "./AnalyticsDashboard";
import Navigation from "./Navigation";

const WorkshopSchedule = () => {
  const [workshops, setWorkshops] = useState([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registeredWorkshops, setRegisteredWorkshops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentView, setCurrentView] = useState("grid");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [userId] = useState(1); // Mock user ID

  useEffect(() => {
    fetchWorkshops();
    fetchUserWorkshops();
  }, []);

  useEffect(() => {
    filterWorkshops();
  }, [workshops, activeFilter, searchTerm, selectedTags, selectedDate]);

  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      const response = await workshopApi.getWorkshops();
      if (response.success) {
        setWorkshops(response.data);
      } else {
        setError("Failed to fetch workshops");
      }
    } catch (err) {
      setError("Error loading workshops");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserWorkshops = async () => {
    try {
      const response = await workshopApi.getUserWorkshops(userId);
      if (response.success) {
        setRegisteredWorkshops(response.data.map((w) => w.id));
      }
    } catch (err) {
      console.error("Error fetching user workshops:", err);
    }
  };

  const filterWorkshops = () => {
    let filtered = workshops;

    // Filter by status
    if (activeFilter === "upcoming") {
      filtered = workshops.filter((w) => w.status === "upcoming");
    } else if (activeFilter === "live") {
      filtered = workshops.filter((w) => w.status === "live");
    } else if (activeFilter === "completed") {
      filtered = workshops.filter((w) => w.status === "completed");
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (workshop) =>
          workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          workshop.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          workshop.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          workshop.trainer.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          workshop.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((workshop) =>
        selectedTags.every((tag) => workshop.tags.includes(tag))
      );
    }

    // Filter by selected date (for calendar view)
    if (selectedDate) {
      filtered = filtered.filter((workshop) => {
        const workshopDate = new Date(workshop.date);
        return workshopDate.toDateString() === selectedDate.toDateString();
      });
    }

    setFilteredWorkshops(filtered);
  };

  const handleWorkshopClick = (workshop) => {
    setSelectedWorkshop(workshop);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWorkshop(null);
  };

  const handleRegister = async (workshopId) => {
    try {
      const response = await workshopApi.registerForWorkshop(
        workshopId,
        userId
      );
      if (response.success) {
        setRegisteredWorkshops((prev) => [...prev, workshopId]);
        // Update the workshop capacity in the local state
        setWorkshops((prev) =>
          prev.map((w) =>
            w.id === workshopId
              ? {
                  ...w,
                  capacity: { ...w.capacity, filled: w.capacity.filled + 1 },
                }
              : w
          )
        );
        window.showToast &&
          window.showToast("Successfully registered for workshop!", "success");
      } else {
        window.showToast &&
          window.showToast(response.error || "Registration failed", "error");
      }
    } catch (err) {
      window.showToast &&
        window.showToast("Error registering for workshop", "error");
    }
  };

  const handleWorkshopUpdate = (updatedWorkshop) => {
    setWorkshops((prev) =>
      prev.map((w) => (w.id === updatedWorkshop.id ? updatedWorkshop : w))
    );
  };

  const getStatusCounts = () => {
    return {
      all: workshops.length,
      upcoming: workshops.filter((w) => w.status === "upcoming").length,
      live: workshops.filter((w) => w.status === "live").length,
      completed: workshops.filter((w) => w.status === "completed").length,
    };
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ Error</div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchWorkshops}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-between mb-6">
              <Navigation />

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowAnalytics(!showAnalytics)}
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all font-medium shadow-md"
                >
                  {showAnalytics ? "Hide Analytics" : "Show Analytics"}
                </button>

                <NotificationSystem userId={userId} />
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Workshop Schedule
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Discover and join our upcoming workshops, bootcamps, and training
              sessions
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {statusCounts.upcoming}
                </div>
                <div className="text-sm text-gray-500">Upcoming</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {statusCounts.live}
                </div>
                <div className="text-sm text-gray-500">Live Now</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {statusCounts.completed}
                </div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      {showAnalytics && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <AnalyticsDashboard workshops={workshops} />
        </div>
      )}

      {/* Statistics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <WorkshopStats workshops={workshops} />
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4 mb-8">
          {/* Desktop Controls */}
          <div className="hidden lg:block">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                <FilterButtons
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                  counts={statusCounts}
                />

                <div className="w-full sm:w-auto">
                  <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    placeholder="Search workshops, trainers, or topics..."
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <ViewToggle
                  currentView={currentView}
                  onViewChange={setCurrentView}
                />

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CalendarDaysIcon className="h-4 w-4" />
                  <span>Showing {filteredWorkshops.length} workshops</span>
                </div>
              </div>
            </div>

            {/* Secondary Filters */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mt-4">
              <TagFilter
                workshops={workshops}
                selectedTags={selectedTags}
                onTagsChange={setSelectedTags}
              />

              {selectedDate && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>
                    Filtered by date: {selectedDate.toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CalendarDaysIcon className="h-4 w-4" />
                <span>{filteredWorkshops.length} workshops</span>
              </div>

              <div className="flex items-center gap-4">
                <ViewToggle
                  currentView={currentView}
                  onViewChange={setCurrentView}
                />

                <MobileMenu
                  workshops={workshops}
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                  statusCounts={statusCounts}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  selectedTags={selectedTags}
                  onTagsChange={setSelectedTags}
                  currentView={currentView}
                  onViewChange={setCurrentView}
                  filteredWorkshops={filteredWorkshops}
                />
              </div>
            </div>

            {/* Mobile Active Filters Display */}
            {(searchTerm || selectedTags.length > 0 || selectedDate) && (
              <div className="mt-4 space-y-2">
                {searchTerm && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Search: "{searchTerm}"</span>
                    <button
                      onClick={() => setSearchTerm("")}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Clear
                    </button>
                  </div>
                )}

                {selectedTags.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Tags: {selectedTags.join(", ")}</span>
                    <button
                      onClick={() => setSelectedTags([])}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Clear
                    </button>
                  </div>
                )}

                {selectedDate && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Date: {selectedDate.toLocaleDateString()}</span>
                    <button
                      onClick={() => setSelectedDate(null)}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Workshop Display */}
        {currentView === "calendar" ? (
          <CalendarView
            workshops={filteredWorkshops}
            onWorkshopClick={handleWorkshopClick}
            onDateSelect={setSelectedDate}
          />
        ) : (
          <>
            {filteredWorkshops.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📅</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No workshops found
                </h3>
                <p className="text-gray-500">
                  {activeFilter === "all"
                    ? "There are no workshops available at the moment."
                    : `There are no ${activeFilter} workshops.`}
                </p>
                {(searchTerm || selectedTags.length > 0 || selectedDate) && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-400">
                      Try adjusting your filters:
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm("")}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
                        >
                          Clear search
                        </button>
                      )}
                      {selectedTags.length > 0 && (
                        <button
                          onClick={() => setSelectedTags([])}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
                        >
                          Clear tags
                        </button>
                      )}
                      {selectedDate && (
                        <button
                          onClick={() => setSelectedDate(null)}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
                        >
                          Clear date
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkshops.map((workshop) => (
                  <WorkshopCard
                    key={workshop.id}
                    workshop={workshop}
                    onClick={() => handleWorkshopClick(workshop)}
                    onRegister={() => handleRegister(workshop.id)}
                    isRegistered={registeredWorkshops.includes(workshop.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Workshop Modal */}
      {selectedWorkshop && (
        <WorkshopModal
          workshop={selectedWorkshop}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onRegister={() => handleRegister(selectedWorkshop.id)}
          isRegistered={registeredWorkshops.includes(selectedWorkshop.id)}
        />
      )}

      {/* Toast Manager */}
      <ToastManager />

      {/* Live Workshop Tracker */}
      <LiveWorkshopTracker
        workshops={workshops}
        onWorkshopUpdate={handleWorkshopUpdate}
      />
    </div>
  );
};

export default WorkshopSchedule;
