import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

const TagFilter = ({ workshops, selectedTags, onTagsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    // Extract all unique tags from workshops
    const tags = workshops.reduce((acc, workshop) => {
      workshop.tags.forEach(tag => {
        if (!acc.find(t => t.name === tag)) {
          acc.push({
            name: tag,
            count: workshops.filter(w => w.tags.includes(tag)).length
          });
        }
      });
      return acc;
    }, []);

    // Sort tags by count (most popular first)
    tags.sort((a, b) => b.count - a.count);
    setAllTags(tags);
  }, [workshops]);

  const handleTagToggle = (tagName) => {
    const newSelectedTags = selectedTags.includes(tagName)
      ? selectedTags.filter(tag => tag !== tagName)
      : [...selectedTags, tagName];
    
    onTagsChange(newSelectedTags);
  };

  const handleClearAll = () => {
    onTagsChange([]);
  };

  const getTagColors = (tagName) => {
    const colors = {
      'React': 'bg-blue-100 text-blue-800 border-blue-300',
      'JavaScript': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'TypeScript': 'bg-blue-100 text-blue-800 border-blue-300',
      'Node.js': 'bg-green-100 text-green-800 border-green-300',
      'Python': 'bg-green-100 text-green-800 border-green-300',
      'Design': 'bg-purple-100 text-purple-800 border-purple-300',
      'UI': 'bg-pink-100 text-pink-800 border-pink-300',
      'UX': 'bg-pink-100 text-pink-800 border-pink-300',
      'DevOps': 'bg-gray-100 text-gray-800 border-gray-300',
      'Cloud': 'bg-cyan-100 text-cyan-800 border-cyan-300',
      'Backend': 'bg-indigo-100 text-indigo-800 border-indigo-300',
      'Frontend': 'bg-blue-100 text-blue-800 border-blue-300',
      'Data Science': 'bg-orange-100 text-orange-800 border-orange-300',
      'ML': 'bg-red-100 text-red-800 border-red-300',
      'Analytics': 'bg-purple-100 text-purple-800 border-purple-300',
      'API': 'bg-teal-100 text-teal-800 border-teal-300',
      'Database': 'bg-green-100 text-green-800 border-green-300',
      'Docker': 'bg-blue-100 text-blue-800 border-blue-300',
      'Kubernetes': 'bg-purple-100 text-purple-800 border-purple-300',
      'AWS': 'bg-orange-100 text-orange-800 border-orange-300',
      'Creative': 'bg-pink-100 text-pink-800 border-pink-300',
      'Beginner': 'bg-green-100 text-green-800 border-green-300',
      'Advanced': 'bg-red-100 text-red-800 border-red-300',
      'Programming': 'bg-indigo-100 text-indigo-800 border-indigo-300'
    };
    return colors[tagName] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="relative">
      {/* Selected Tags Display */}
      {selectedTags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {selectedTags.map(tag => (
            <span
              key={tag}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getTagColors(tag)}`}
            >
              {tag}
              <button
                onClick={() => handleTagToggle(tag)}
                className="ml-1 hover:bg-black hover:bg-opacity-10 rounded-full p-0.5 transition-colors"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </span>
          ))}
          <button
            onClick={handleClearAll}
            className="text-xs text-gray-500 hover:text-gray-700 underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Tag Selector */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          <span>Filter by Topics</span>
          {selectedTags.length > 0 && (
            <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
              {selectedTags.length}
            </span>
          )}
          <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            <div className="p-3 border-b border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Filter by Topics</h4>
              <p className="text-sm text-gray-600">
                Select topics to filter workshops. Click multiple tags to combine filters.
              </p>
            </div>
            
            <div className="p-3 space-y-2">
              {allTags.map(tag => (
                <label
                  key={tag.name}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag.name)}
                    onChange={() => handleTagToggle(tag.name)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className={`flex-1 px-2 py-1 rounded-full text-xs font-medium border ${getTagColors(tag.name)}`}>
                    {tag.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {tag.count} workshop{tag.count !== 1 ? 's' : ''}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default TagFilter;