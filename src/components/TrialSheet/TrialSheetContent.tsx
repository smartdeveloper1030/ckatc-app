import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertCircle, Plus, ChevronRight, Check } from 'lucide-react';

interface TrialItem {
  id: string;
  title: string;
  subtitle: string;
  progress: string;
  percentage: number;
}

interface GraphType {
  id: string;
  label: string;
}

interface AnnotationOption {
  id: string;
  label: string;
  checked: boolean;
}

interface TechnicalIndicator {
  id: string;
  label: string;
  checked: boolean;
}

export function TrialSheetContent() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('3M');
  const [activeGraphTab, setActiveGraphTab] = useState('graph-type');
  const [showGraphTypes, setShowGraphTypes] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [showTechnicalIndicators, setShowTechnicalIndicators] = useState(false);
  const [selectedGraphType, setSelectedGraphType] = useState<string>('prompt-fading');
  const [annotationOptions, setAnnotationOptions] = useState<AnnotationOption[]>([
    { id: 'condition-lines', label: 'Hide Condition Lines', checked: false },
    { id: 'notes', label: 'Hide Notes', checked: true }
  ]);
  const [technicalIndicators, setTechnicalIndicators] = useState<TechnicalIndicator[]>([
    { id: 'average', label: 'Average', checked: true },
    { id: 'moving-average', label: '5-day Moving Average', checked: false },
    { id: 'trend-line', label: 'Trend Line', checked: false },
    { id: 'standard-deviation', label: 'Standard Deviation', checked: false },
    { id: 'trial-count', label: 'Trial Count', checked: false },
    { id: 'therapist-count', label: 'Unique Therapist Count', checked: false },
    { id: 'ioa-data', label: 'Overlay IOA Data', checked: false }
  ]);

  const graphTypes: GraphType[] = [
    { id: 'prompt-fading', label: 'Response to prompt fading' },
    { id: 'prompt-distribution', label: 'Prompt % Distribution' },
    { id: 'prompt-counts', label: 'Prompt Counts' },
    { id: 'trials-by-prompts', label: 'Trials By Prompts' },
    { id: 'daily-prompt', label: 'Daily Prompt %' },
    { id: 'time-of-day', label: 'Time of Day' },
    { id: 'transitions', label: 'Transitions' }
  ];

  const trialItems: TrialItem[] = [
    {
      id: '02-M-name',
      title: '02-M Responds to hearing his own name 5 times',
      subtitle: 'PO, GY, y, VP, y, GY, GY, y, GY',
      progress: '44.44%',
      percentage: 44.44
    },
    {
      id: '02-M-play',
      title: '02-M Shows variation in play by independently interacting with 5 different items',
      subtitle: '',
      progress: '0%',
      percentage: 0
    },
    {
      id: '2-a-points',
      title: '2-a Points to a toy or object of interest_Copy',
      subtitle: 'GY, PO, PO, y, GY, GY, PO, y, GY, M, y',
      progress: '36.36%',
      percentage: 36.36
    },
    {
      id: '2-b-drop',
      title: '2-b Drop items to watch them fall, or demonstates other interests in cause-and-effect_Copy',
      subtitle: 'y, N, M, GY, PO',
      progress: '40%',
      percentage: 40
    },
    {
      id: '2-d-repeats',
      title: '2-d Repeats a play behavior that produces an auditory sound_Copy',
      subtitle: 'y, VP',
      progress: '100%',
      percentage: 100
    }
  ];

  const timeIntervals = [
    { id: '1D', label: '1D' },
    { id: '5D', label: '5D' },
    { id: '14D', label: '14D' },
    { id: 'MTD', label: 'MTD' },
    { id: '1M', label: '1M' },
    { id: '3M', label: '3M' },
    { id: '6M', label: '6M' },
    { id: 'YTD', label: 'YTD' },
    { id: '1Y', label: '1Y' },
    { id: '2Y', label: '2Y' },
    { id: '5Y', label: '5Y' },
    { id: 'MAX', label: 'MAX' }
  ];

  const graphTabs = [
    { id: 'graph-type', label: 'Graph Type' },
    { id: 'annotations', label: 'Annotations' },
    { id: 'technical-indicators', label: 'Technical Indicators' },
    { id: 'settings', label: 'Settings' }
  ];

  const handleGraphTabClick = (tabId: string) => {
    setActiveGraphTab(tabId);
    if (tabId === 'graph-type') {
      setShowGraphTypes(true);
      setShowAnnotations(false);
      setShowTechnicalIndicators(false);
    } else if (tabId === 'annotations') {
      setShowAnnotations(true);
      setShowGraphTypes(false);
      setShowTechnicalIndicators(false);
    } else if (tabId === 'technical-indicators') {
      setShowTechnicalIndicators(true);
      setShowGraphTypes(false);
      setShowAnnotations(false);
    } else {
      setShowGraphTypes(false);
      setShowAnnotations(false);
      setShowTechnicalIndicators(false);
    }
  };

  const handleGraphTypeSelect = (typeId: string) => {
    setSelectedGraphType(typeId);
    setShowGraphTypes(false);
  };

  const handleAnnotationToggle = (id: string) => {
    setAnnotationOptions(prev =>
      prev.map(option =>
        option.id === id
          ? { ...option, checked: !option.checked }
          : option
      )
    );
  };

  const handleTechnicalIndicatorToggle = (id: string) => {
    setTechnicalIndicators(prev =>
      prev.map(indicator =>
        indicator.id === id
          ? { ...indicator, checked: !indicator.checked }
          : indicator
      )
    );
  };

  const renderGraph = (item: TrialItem) => {
    if (selectedGraphType === 'prompt-distribution') {
      return (
        <div className="relative h-64 flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 400 400">
            {/* Pie Chart Segments */}
            {/* Gestural Prompt - Green */}
            <circle
              r="160"
              cx="200"
              cy="200"
              fill="transparent"
              stroke="#22C55E"
              strokeWidth="160"
              strokeDasharray={`${35.29 * 3.6} ${360 - 35.29 * 3.6}`}
              transform="rotate(-90 200 200)"
            />
            {/* No - Blue */}
            <circle
              r="160"
              cx="200"
              cy="200"
              fill="transparent"
              stroke="#3B82F6"
              strokeWidth="160"
              strokeDasharray={`${5.88 * 3.6} ${360 - 5.88 * 3.6}`}
              transform={`rotate(${35.29 * 3.6 - 90} 200 200)`}
            />
            {/* Positional Prompt - Orange */}
            <circle
              r="160"
              cx="200"
              cy="200"
              fill="transparent"
              stroke="#F97316"
              strokeWidth="160"
              strokeDasharray={`${11.76 * 3.6} ${360 - 11.76 * 3.6}`}
              transform={`rotate(${(35.29 + 5.88) * 3.6 - 90} 200 200)`}
            />
            {/* Vocal Prompt - Purple */}
            <circle
              r="160"
              cx="200"
              cy="200"
              fill="transparent"
              stroke="#A855F7"
              strokeWidth="160"
              strokeDasharray={`${5.88 * 3.6} ${360 - 5.88 * 3.6}`}
              transform={`rotate(${(35.29 + 5.88 + 11.76) * 3.6 - 90} 200 200)`}
            />
            {/* Yes - Yellow */}
            <circle
              r="160"
              cx="200"
              cy="200"
              fill="transparent"
              stroke="#EAB308"
              strokeWidth="160"
              strokeDasharray={`${35.29 * 3.6} ${360 - 35.29 * 3.6}`}
              transform={`rotate(${(35.29 + 5.88 + 11.76 + 5.88) * 3.6 - 90} 200 200)`}
            />
          </svg>

          {/* Legend */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-[#22C55E]"></div>
              <span>Gestural Prompt (35.29%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-[#3B82F6]"></div>
              <span>No (5.88%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-[#F97316]"></div>
              <span>Positional Prompt (11.76%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-[#A855F7]"></div>
              <span>Vocal Prompt (5.88%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-[#EAB308]"></div>
              <span>yes (35.29%)</span>
            </div>
          </div>
        </div>
      );
    }

    if (selectedGraphType === 'prompt-counts') {
      const promptData = [
        { label: 'Gestural Prompt', count: 6 },
        { label: 'Modeling', count: 1 },
        { label: 'No', count: 1 },
        { label: 'Positional Prompt', count: 2 },
        { label: 'refused trial', count: 0 },
        { label: 'Vocal Prompt', count: 1 },
        { label: 'yes', count: 6 }
      ];

      const maxCount = 10; // Maximum value on y-axis
      const barWidth = 40;
      const spacing = 20;
      const totalWidth = (barWidth + spacing) * promptData.length;

      return (
        <div className="h-[400px] relative">
          {/* Title */}
          <div className="text-center text-sm text-gray-600 mb-4">
            Example Student<br />
            {item.title}_Copy (Errorless Teaching) Total Number of Trials by Prompt Code
          </div>

          {/* Y-axis labels */}
          <div className="absolute left-0 top-8 bottom-8 w-12 flex flex-col justify-between text-xs text-gray-500">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="text-right w-full">
                {(maxCount - i * 2)}
              </span>
            ))}
          </div>

          {/* Graph container */}
          <div className="ml-12 h-[300px] flex items-end justify-center gap-5">
            {promptData.map((prompt, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Bar */}
                <div 
                  className="w-10 bg-green-600 rounded-t transition-all duration-300"
                  style={{ 
                    height: `${(prompt.count / maxCount) * 100}%`,
                  }}
                />
                {/* Label */}
                <div className="text-xs text-gray-600 mt-2 w-20 text-center">
                  {prompt.label}
                </div>
              </div>
            ))}
          </div>

          {/* X-axis label */}
          <div className="text-center text-sm text-gray-600 mt-8">
            Prompt Code
          </div>
        </div>
      );
    }

    // Default graph (bar chart)
    return (
      <div className="h-64 flex items-end justify-between relative">
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
          <span>100</span>
          <span>80</span>
          <span>60</span>
          <span>40</span>
          <span>20</span>
          <span>0</span>
        </div>

        <div className="absolute bottom-0 right-4 h-full flex items-end">
          <div 
            className="w-2 bg-green-500 rounded-t transition-all duration-500"
            style={{ height: `${item.percentage}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Correct Trials</span>
            </div>
            <span className="text-2xl font-semibold text-gray-900">12/15</span>
            <span className="text-sm text-gray-500 ml-2">(80%)</span>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium text-gray-700">Incorrect Trials</span>
            </div>
            <span className="text-2xl font-semibold text-gray-900">3/15</span>
            <span className="text-sm text-gray-500 ml-2">(20%)</span>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Remaining Trials</span>
            </div>
            <span className="text-2xl font-semibold text-gray-900">5</span>
          </div>
        </div>

        {/* Trial List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Current Session</h2>
            <button className="flex items-center gap-2 text-[#2B4C7E] hover:text-[#2B4C7E]/80 font-medium">
              <Plus className="h-4 w-4" />
              <span>Add Trial</span>
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {trialItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                  className="w-full px-6 py-4 hover:bg-gray-50 transition-colors text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 group-hover:text-[#2B4C7E]">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-gray-900">{item.progress}</span>
                      <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform
                        ${selectedItem === item.id ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                </button>

                {/* Graph Widget */}
                {selectedItem === item.id && (
                  <div className="px-6 pb-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      {/* Graph Control Tabs */}
                      <div className="flex gap-2 mb-4">
                        {graphTabs.map((tab) => (
                          <div key={tab.id} className="relative">
                            <button
                              onClick={() => handleGraphTabClick(tab.id)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                ${activeGraphTab === tab.id
                                  ? 'bg-[#2B4C7E] text-white'
                                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
                            >
                              {tab.label}
                            </button>

                            {/* Graph Type Selection Menu */}
                            {tab.id === 'graph-type' && showGraphTypes && (
                              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                <div className="py-2">
                                  {graphTypes.map((type) => (
                                    <button
                                      key={type.id}
                                      onClick={() => handleGraphTypeSelect(type.id)}
                                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                    >
                                      <div className={`w-5 h-5 rounded-full border transition-colors flex items-center justify-center
                                        ${selectedGraphType === type.id 
                                          ? 'border-[#2B4C7E]' 
                                          : 'border-gray-300'}`}
                                      >
                                        {selectedGraphType === type.id && (
                                          <div className="w-3 h-3 rounded-full bg-[#2B4C7E]" />
                                        )}
                                      </div>
                                      <span className="text-gray-700">{type.label}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Annotations Menu */}
                            {tab.id === 'annotations' && showAnnotations && (
                              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                <div className="py-2">
                                  {annotationOptions.map((option) => (
                                    <button
                                      key={option.id}
                                      onClick={() => handleAnnotationToggle(option.id)}
                                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                    >
                                      <div className={`w-4 h-4 border rounded transition-colors flex items-center justify-center
                                        ${option.checked 
                                          ? 'bg-[#2B4C7E] border-[#2B4C7E]' 
                                          : 'border-gray-300'}`}
                                      >
                                        {option.checked && (
                                          <Check className="h-3 w-3 text-white" />
                                        )}
                                      </div>
                                      <span>{option.label}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Technical Indicators Menu */}
                            {tab.id === 'technical-indicators' && showTechnicalIndicators && (
                              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                <div className="py-1">
                                  {technicalIndicators.map((indicator) => (
                                    <button
                                      key={indicator.id}
                                      onClick={() => handleTechnicalIndicatorToggle(indicator.id)}
                                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                    >
                                      <div className={`w-5 h-5 rounded transition-colors flex items-center justify-center
                                        ${indicator.checked 
                                          ? 'bg-[#2B4C7E] text-white' 
                                          : 'border border-gray-300'}`}
                                      >
                                        {indicator.checked && (
                                          <Check className="h-4 w-4 text-white" />
                                        )}
                                      </div>
                                      <span className="text-gray-700">{indicator.label}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Graph Title */}
                      <div className="text-sm text-gray-600 mb-4">
                        Example Student<br />
                        {item.title} (Errorless Teaching) % correct responses to prompt fading schedule
                      </div>

                      {/* Graph Area */}
                      <div className="bg-white rounded border border-gray-200 p-4 mb-4">
                        {renderGraph(item)}
                      </div>

                      {/* Time Interval Tabs */}
                      <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                        {timeIntervals.map((interval) => (
                          <button
                            key={interval.id}
                            onClick={() => setActiveTab(interval.id)}
                            className={`flex-1 py-2 text-sm font-medium transition-colors
                              ${activeTab === interval.id
                                ? 'bg-[#2B4C7E] text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                          >
                            {interval.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}