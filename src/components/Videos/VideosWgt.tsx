import React from 'react';
import { 
  ChevronLeft, Search, Plus, Play, Calendar, Clock, 
  MoreVertical, Upload 
} from 'lucide-react';

interface VideosWgtProps {
  onClose: () => void;
}

export function VideosWgt({ onClose }: VideosWgtProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">Videos</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-[#2B4C7E] hover:bg-gray-100 rounded-lg flex items-center gap-2 transition-colors">
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </button>
            <button className="px-4 py-2 bg-[#2B4C7E] text-white rounded-lg flex items-center gap-2
                           hover:bg-[#2B4C7E]/90 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Record Video</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search videos..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg
                         focus:ring-2 focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all">
                <div className="relative aspect-video bg-gray-900 group cursor-pointer">
                  <img
                    src={`https://picsum.photos/seed/${index}/800/450`}
                    alt={`Session Recording ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 
                               flex items-center justify-center transition-opacity">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">Session Recording {index + 1}</h3>
                      <p className="text-sm text-gray-500">Behavior Assessment</p>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                      <MoreVertical className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Feb 22, 2025</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>10:30 AM</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}