import React from 'react';
import { Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export function MomentaryView() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semib old text-gray-900 mb-6">Momentary Time Sampling</h2>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Timer Section */}
          <div className="bg-yellow-50 rounded-lg p-8 text-center">
            <div className="text-6xl font-bold text-yellow-600 mb-4">00:30</div>
            <div className="text-sm text-yellow-600 mb-4">Next Sample In</div>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium
                             hover:bg-green-700 transition-colors flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>Engaged</span>
              </button>
              <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium
                             hover:bg-red-700 transition-colors flex items-center gap-2">
                <XCircle className="h-5 w-5" />
                <span>Not Engaged</span>
              </button>
            </div>
          </div>

          {/* Sample Grid */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample Summary</h3>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-500">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Session Time</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">00:00:00</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Engagement Rate</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">0%</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Samples Left</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">12</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}