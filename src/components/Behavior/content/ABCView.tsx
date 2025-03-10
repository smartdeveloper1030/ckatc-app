import React, { useState } from 'react';
import { Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';

interface ABCViewProps {
  formData: {
    date: string;
    time: string;
    durationMin: string;
    durationSec: string;
    severity: string;
    response: string;
    groupSize: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    date: string;
    time: string;
    durationMin: string;
    durationSec: string;
    severity: string;
    response: string;
    groupSize: string;
  }>>;
}

export function ABCView({ formData, setFormData }: ABCViewProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const severityOptions = ['Low', 'Medium', 'High'];
  const responseOptions = ['Verbal', 'Physical', 'Gestural', 'None'];
  const groupSizeOptions = ['1:1', 'Small Group', 'Large Group'];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Record ABC Data</h2>
        
        {/* Date, Time, Duration section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <div className="relative">
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none 
                         focus:ring-2 focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E]"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
            <div className="relative">
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none 
                         focus:ring-2 focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E]"
              />
              <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <select
                  value={formData.durationMin}
                  onChange={(e) => setFormData({ ...formData, durationMin: e.target.value })}
                  className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg appearance-none 
                           focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E]"
                >
                  <option value="">Min</option>
                  {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative flex-1">
                <select
                  value={formData.durationSec}
                  onChange={(e) => setFormData({ ...formData, durationSec: e.target.value })}
                  className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg appearance-none 
                           focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E]"
                >
                  <option value="">Sec</option>
                  {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Severity, Response, Group Size section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Severity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
            <div className="relative">
              <select
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg appearance-none 
                         focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E]"
              >
                <option value="">Select Severity</option>
                {severityOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Response */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Response</label>
            <div className="relative">
              <select
                value={formData.response}
                onChange={(e) => setFormData({ ...formData, response: e.target.value })}
                className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg appearance-none 
                         focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E]"
              >
                <option value="">Select response</option>
                {responseOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Group Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Group Size</label>
            <div className="relative">
              <select
                value={formData.groupSize}
                onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg appearance-none 
                         focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E]"
              >
                <option value="">Select group size</option>
                {groupSizeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Behaviors Section */}
        <div className="bg-gray-50 rounded-lg">
          <div className="px-6 py-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Behaviors</h3>
            <button className="text-[#2B4C7E] hover:text-[#2B4C7E]/80 font-medium text-sm">
              + Add Behaviors
            </button>
          </div>
          
          <div className="px-6 pb-4">
            <div className="bg-white rounded-lg border border-gray-200">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">Aggression Towards Others</span>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>
              
              {isExpanded && (
                <div className="px-4 py-3 border-t border-gray-200">
                  <div className="space-y-4">
                    {/* Antecedent */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Antecedent</label>
                      <textarea
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none 
                                 focus:ring-2 focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E]"
                        rows={3}
                        placeholder="What happened before the behavior?"
                      />
                    </div>

                    {/* Behavior */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Behavior</label>
                      <textarea
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none 
                                 focus:ring-2 focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E]"
                        rows={3}
                        placeholder="Describe the behavior in detail"
                      />
                    </div>

                    {/* Consequence */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Consequence</label>
                      <textarea
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none 
                                 focus:ring-2 focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E]"
                        rows={3}
                        placeholder="What happened after the behavior?"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}