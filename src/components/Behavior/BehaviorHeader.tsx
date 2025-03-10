import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface BehaviorHeaderProps {
  onClose: () => void;
}

export function BehaviorHeader({ onClose }: BehaviorHeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10">
            <button 
              onClick={onClose}
              className="p-2.5 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
              aria-label="Go back"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 font-medium">ES</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Behaviors</h1>
          </div>
        </div>
      </div>
    </div>
  );
}