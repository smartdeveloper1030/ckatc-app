import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, X, Command } from 'lucide-react';

export function Search() {
  const [searchType, setSearchType] = useState('targets');
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showClearButton, setShowClearButton] = useState(false);

  useEffect(() => {
    setShowClearButton(searchValue.length > 0);
  }, [searchValue]);

  const handleClear = () => {
    setSearchValue('');
    setShowClearButton(false);
  };

  return (
    <div className="p-4 border-b border-gray-200 bg-white">
      <div className="relative group">
        <div className={`relative transition-all duration-300 ease-out
          ${isFocused ? 'scale-[1.02]' : 'scale-100'}`}>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search..."
            className={`w-full pl-10 pr-12 py-2.5 bg-gray-50 border rounded-lg
                     placeholder-gray-400 text-gray-700 transition-all duration-300
                     hover:border-[#2B4C7E]/50 hover:shadow-sm
                     ${isFocused 
                       ? 'border-[#2B4C7E] ring-2 ring-[#2B4C7E]/20 shadow-md' 
                       : 'border-gray-200'}`}
          />
          <SearchIcon 
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5
                     transition-all duration-300 ease-out
                     ${isFocused 
                       ? 'text-[#2B4C7E] scale-110' 
                       : 'text-gray-400 group-hover:text-[#2B4C7E]'}`}
          />
          {showClearButton && (
            <button
              onClick={handleClear}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2
                       hover:bg-gray-200/80 rounded-full p-1
                       transition-all duration-300 ease-out
                       ${isFocused ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          )}
          <div className={`absolute right-3 top-1/2 transform -translate-y-1/2
                        transition-all duration-300 ease-out
                        ${showClearButton || isFocused ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
            <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs text-gray-500">
              <Command className="h-3 w-3" />
              <span>K</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-6 mt-4">
        {['targets', 'programs'].map((type) => (
          <label 
            key={type}
            className="relative flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative flex items-center">
              <input
                type="radio"
                className="sr-only peer"
                name="searchType"
                value={type}
                checked={searchType === type}
                onChange={(e) => setSearchType(e.target.value)}
              />
              <div className={`w-4 h-4 border rounded-full transition-all duration-300
                ${searchType === type 
                  ? 'border-[#2B4C7E] bg-white shadow-sm scale-110' 
                  : 'border-gray-300 bg-white group-hover:border-[#2B4C7E]/50'}`}>
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                              w-2 h-2 bg-[#2B4C7E] rounded-full transition-all duration-300
                              ${searchType === type 
                                ? 'opacity-100 scale-100' 
                                : 'opacity-0 scale-0'}`} />
              </div>
            </div>
            <span className={`text-sm font-medium transition-all duration-300
              ${searchType === type 
                ? 'text-[#2B4C7E]' 
                : 'text-gray-700 group-hover:text-[#2B4C7E]'}`}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}