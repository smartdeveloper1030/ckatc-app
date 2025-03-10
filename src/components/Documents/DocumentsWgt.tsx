import React from 'react';
import { 
  ChevronLeft, Search, Plus, FolderOpen, FileText, Download, 
  MoreVertical, Calendar, Upload
} from 'lucide-react';

interface DocumentsWgtProps {
  onClose: () => void;
}

export function DocumentsWgt({ onClose }: DocumentsWgtProps) {
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
            <h2 className="text-xl font-semibold text-gray-900">Documents</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-[#2B4C7E] hover:bg-gray-100 rounded-lg flex items-center gap-2 transition-colors">
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </button>
            <button className="px-4 py-2 bg-[#2B4C7E] text-white rounded-lg flex items-center gap-2
                           hover:bg-[#2B4C7E]/90 transition-colors">
              <Plus className="h-4 w-4" />
              <span>New Folder</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Search and Filters */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg
                         focus:ring-2 focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Folders Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Folders</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Assessment Reports', 'Progress Notes', 'Treatment Plans'].map((folder) => (
                <div key={folder} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <FolderOpen className="h-6 w-6 text-[#2B4C7E]" />
                      <div>
                        <h4 className="font-medium text-gray-900">{folder}</h4>
                        <p className="text-sm text-gray-500">3 files</p>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                      <MoreVertical className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Files */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Files</h3>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="divide-y divide-gray-200">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-6 w-6 text-[#2B4C7E]" />
                        <div>
                          <h4 className="font-medium text-gray-900">Assessment Report {index + 1}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-500">PDF</span>
                            <span className="text-sm text-gray-500">2.4 MB</span>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>Feb 22, 2025</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                          <Download className="h-4 w-4 text-gray-500" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                          <MoreVertical className="h-4 w-4 text-gray-500" />
                        </button>
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