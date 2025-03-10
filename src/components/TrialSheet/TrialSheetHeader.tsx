import React from 'react';
import { ChevronLeft, Timer, Calendar, Clock } from 'lucide-react';

interface TrialSheetHeaderProps {
  onClose: () => void;
}

export function TrialSheetHeader({ onClose }: TrialSheetHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      {/* Top Section */}
      <div className="px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Left: Back Button and Title */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 font-medium">ES</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Trial Sheet</h1>
                <p className="text-sm text-gray-500">Example Student</p>
              </div>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 text-[#2B4C7E]" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Session Time</span>
                <span className="text-sm font-medium text-gray-900">45:00</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#2B4C7E]" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Date</span>
                <span className="text-sm font-medium text-gray-900">Feb 22, 2025</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#2B4C7E]" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Time</span>
                <span className="text-sm font-medium text-gray-900">10:30 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}