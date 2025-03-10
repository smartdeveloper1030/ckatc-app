import React from 'react';
import { ChevronLeft, Calendar, Clock, Save, Plus } from 'lucide-react';

interface SoapNotesWgtProps {
  onClose: () => void;
}

export function SoapNotesWgt({ onClose }: SoapNotesWgtProps) {
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
            <div>
              <h2 className="text-xl font-semibold text-gray-900">SOAP Notes</h2>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Feb 22, 2025</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>10:30 AM</span>
                </div>
              </div>
            </div>
          </div>
          <button className="px-4 py-2 bg-[#2B4C7E] text-white rounded-lg flex items-center gap-2
                         hover:bg-[#2B4C7E]/90 transition-colors">
            <Save className="h-4 w-4" />
            <span>Save Note</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Subjective Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Subjective</h3>
            <textarea
              placeholder="Enter subjective observations..."
              className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:ring-2 
                       focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E] transition-colors"
            />
          </div>

          {/* Objective Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Objective</h3>
            <textarea
              placeholder="Enter objective data and measurements..."
              className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:ring-2 
                       focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E] transition-colors"
            />
          </div>

          {/* Assessment Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment</h3>
            <textarea
              placeholder="Enter your assessment..."
              className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:ring-2 
                       focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E] transition-colors"
            />
          </div>

          {/* Plan Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan</h3>
            <textarea
              placeholder="Enter treatment plan and recommendations..."
              className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:ring-2 
                       focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E] transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}