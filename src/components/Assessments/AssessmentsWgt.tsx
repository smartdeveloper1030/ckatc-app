import React from 'react';
import { 
  ChevronLeft, Search, Plus, ClipboardCheck, Calendar, 
  Clock, CheckCircle2, AlertCircle 
} from 'lucide-react';

interface AssessmentsWgtProps {
  onClose: () => void;
}

export function AssessmentsWgt({ onClose }: AssessmentsWgtProps) {
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
            <h2 className="text-xl font-semibold text-gray-900">Assessments</h2>
          </div>
          <button className="px-4 py-2 bg-[#2B4C7E] text-white rounded-lg flex items-center gap-2
                         hover:bg-[#2B4C7E]/90 transition-colors">
            <Plus className="h-4 w-4" />
            <span>New Assessment</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search assessments..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg
                         focus:ring-2 focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Assessment Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { name: 'VB-MAPP', count: 12, color: 'bg-blue-100 text-blue-700' },
              { name: 'ABLLS-R', count: 8, color: 'bg-green-100 text-green-700' },
              { name: 'Custom', count: 5, color: 'bg-purple-100 text-purple-700' }
            ].map((type) => (
              <div key={type.name} 
                   className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ClipboardCheck className={`h-6 w-6 ${type.color.split(' ')[1]}`} />
                    <div>
                      <h4 className="font-medium text-gray-900">{type.name}</h4>
                      <p className="text-sm text-gray-500">{type.count} assessments</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${type.color}`}>
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Assessments */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Assessments</h3>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="divide-y divide-gray-200">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${index % 2 === 0 
                          ? 'bg-blue-100' 
                          : 'bg-green-100'}`}>
                          <ClipboardCheck className={`h-5 w-5 ${index % 2 === 0 
                            ? 'text-blue-700' 
                            : 'text-green-700'}`} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {index % 2 === 0 ? 'VB-MAPP Assessment' : 'ABLLS-R Assessment'} {index + 1}
                          </h4>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>Feb 22, 2025</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Clock className="h-3 w-3" />
                              <span>10:30 AM</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {index % 3 === 0 ? (
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle2 className="h-4 w-4" />
                            <span className="text-sm font-medium">Completed</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-yellow-600">
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">In Progress</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}