import React from 'react';
import { ChevronLeft, Search, Plus, Calendar, Clock, Tag, MoreVertical } from 'lucide-react';

interface NotesWgtProps {
  onClose: () => void;
}

export function NotesWgt({ onClose }: NotesWgtProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900">Notes</h2>
        </div>
      </div>
      
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-200 bg-white">
          <div className="p-4">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search notes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg
                         focus:ring-2 focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <button className="w-full px-4 py-2 bg-[#2B4C7E] text-white rounded-lg flex items-center justify-center gap-2
                           hover:bg-[#2B4C7E]/90 transition-colors">
              <Plus className="h-5 w-5" />
              <span>New Note</span>
            </button>
          </div>
          
          <div className="divide-y divide-gray-200">
            {Array.from({ length: 5 }).map((_, index) => (
              <button key={index} className="w-full p-4 text-left hover:bg-gray-50 transition-colors">
                <h3 className="font-medium text-gray-900 mb-1">Session Note {index + 1}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                  Student showed improvement in communication skills during today's session...
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Feb 22, 2025</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>10:30 AM</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-50">
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Session Note 1</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Feb 22, 2025</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>10:30 AM</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="h-4 w-4" />
                        <span>Session Notes</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreVertical className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <textarea
                  className="w-full h-[calc(100vh-400px)] p-4 border border-gray-200 rounded-lg
                           focus:ring-2 focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E]"
                  placeholder="Enter your note here..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}