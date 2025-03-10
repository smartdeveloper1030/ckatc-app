import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Save,
  Clock,
  Calendar,
  BarChart2,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  CalendarRange,
  Activity,
  LineChart,
  PieChart
} from 'lucide-react';

interface ReportWgtProps {
  onClose: () => void;
  studentName: string;
}

export function ReportWgt({ onClose, studentName }: ReportWgtProps) {
  const [graphFormat, setGraphFormat] = useState<'bar' | 'line' | 'pie'>('line');
  const [timeRange, setTimeRange] = useState('3M');

  const timeRanges = ['1W', '1M', '3M', '6M', '1Y', 'ALL'];

  const progressData = [
    { label: "Overall Progress", value: "78%", change: "+12%" },
    { label: "Monthly Progress", value: "85%", change: "+8%" },
    { label: "Weekly Progress", value: "92%", change: "+15%" },
    { label: "Daily Progress", value: "88%", change: "+5%" }
  ];

  const dateRangeReports = [
    {
      title: "Behavioral Incidents",
      ranges: [
        { label: "Daily", current: 3, previous: 5, trend: "down", change: 40 },
        { label: "Weekly", current: 15, previous: 22, trend: "down", change: 32 },
        { label: "Monthly", current: 68, previous: 75, trend: "down", change: 9 }
      ]
    },
    {
      title: "Skill Acquisition",
      ranges: [
        { label: "Daily", current: 8, previous: 6, trend: "up", change: 33 },
        { label: "Weekly", current: 45, previous: 38, trend: "up", change: 18 },
        { label: "Monthly", current: 180, previous: 165, trend: "up", change: 9 }
      ]
    }
  ];

  const percentageRanges = [
    { label: "Mastered (90-100%)", value: 35, color: "text-green-600" },
    { label: "Emerging (70-89%)", value: 45, color: "text-blue-600" },
    { label: "Developing (50-69%)", value: 15, color: "text-yellow-600" },
    { label: "Beginning (0-49%)", value: 5, color: "text-red-600" }
  ];

  const masteredTargets = [
    { date: "Feb 22", count: 12 },
    { date: "Feb 23", count: 15 },
    { date: "Feb 24", count: 18 },
    { date: "Feb 25", count: 22 },
    { date: "Feb 26", count: 25 }
  ];

  const trialCounts = {
    daily: [
      { date: "Mon", count: 45 },
      { date: "Tue", count: 52 },
      { date: "Wed", count: 48 },
      { date: "Thu", count: 56 },
      { date: "Fri", count: 50 }
    ],
    weekly: [
      { week: "Week 1", count: 245 },
      { week: "Week 2", count: 268 },
      { week: "Week 3", count: 251 },
      { week: "Week 4", count: 272 }
    ]
  };

  const renderGraph = (type: 'bar' | 'line' | 'pie', data: any[], height: string = 'h-64') => {
    switch (type) {
      case 'bar':
        return (
          <div className={`${height} flex items-end justify-between relative`}>
            <div className="flex-1 flex items-end justify-between pl-8">
              {data.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-12 bg-[#2B4C7E] rounded-t transition-all duration-300"
                    style={{ 
                      height: `${typeof item.value === 'number' ? (item.value / Math.max(...data.map(d => d.value))) * 100 : 50}%`,
                      opacity: 0.7 + (index * 0.1)
                    }}
                  />
                  <span className="text-xs text-gray-500 mt-2">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'line':
        return (
          <div className={`${height} relative`}>
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d={`M 0,${100 - (data[0]?.value || 0)} ${data.map((item, i) => 
                  `L ${(i / (data.length - 1)) * 100},${100 - (item.value || 0)}`).join(' ')}`}
                fill="none"
                stroke="#2B4C7E"
                strokeWidth="2"
              />
              {data.map((item, i) => (
                <circle
                  key={i}
                  cx={`${(i / (data.length - 1)) * 100}`}
                  cy={`${100 - (item.value || 0)}`}
                  r="2"
                  fill="#2B4C7E"
                />
              ))}
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-8">
              {data.map((item, i) => (
                <span key={i} className="text-xs text-gray-500">{item.label}</span>
              ))}
            </div>
          </div>
        );

      case 'pie':
        const total = data.reduce((sum, item) => sum + (item.value || 0), 0);
        let currentAngle = 0;

        return (
          <div className={`${height} flex items-center justify-center`}>
            <svg className="w-64 h-64" viewBox="0 0 100 100">
              {data.map((item, i) => {
                const percentage = ((item.value || 0) / total) * 100;
                const angle = (percentage / 100) * 360;
                const x1 = 50 + 40 * Math.cos((currentAngle * Math.PI) / 180);
                const y1 = 50 + 40 * Math.sin((currentAngle * Math.PI) / 180);
                const x2 = 50 + 40 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
                const y2 = 50 + 40 * Math.sin(((currentAngle + angle) * Math.PI) / 180);
                
                const path = `M 50 50 L ${x1} ${y1} A 40 40 0 ${angle > 180 ? 1 : 0} 1 ${x2} ${y2} Z`;
                currentAngle += angle;

                return (
                  <path
                    key={i}
                    d={path}
                    fill={`rgba(43, 76, 126, ${0.4 + (i * 0.2)})`}
                  />
                );
              })}
            </svg>
          </div>
        );

      default:
        return null;
    }
  };

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
              <h2 className="text-xl font-semibold text-gray-900">Analytics Report</h2>
              <p className="text-sm text-gray-500">{studentName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors
                    ${timeRange === range 
                      ? 'bg-[#2B4C7E] text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  {range}
                </button>
              ))}
            </div>
            <button className="px-4 py-2 bg-[#2B4C7E] text-white rounded-lg flex items-center gap-2
                           hover:bg-[#2B4C7E]/90 transition-colors">
              <Save className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Progress Percentages */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {progressData.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-sm text-gray-600">{item.label}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-gray-900">{item.value}</span>
                  <span className="text-sm font-medium text-green-600">{item.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Date Range Reports */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dateRangeReports.map((report, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{report.title}</h3>
                <div className="space-y-4">
                  {report.ranges.map((range, rangeIndex) => (
                    <div key={rangeIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          {range.label === 'Daily' && <Clock className="h-4 w-4 text-gray-600" />}
                          {range.label === 'Weekly' && <Calendar className="h-4 w-4 text-gray-600" />}
                          {range.label === 'Monthly' && <CalendarRange className="h-4 w-4 text-gray-600" />}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-900">{range.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-900">{range.current}</span>
                            <span className="text-sm text-gray-500">vs {range.previous}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1 ${
                        range.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {range.trend === 'up' ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                        <span className="text-sm font-medium">{range.change}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Percentage Ranges */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Progress Distribution</h3>
            <div className="space-y-6">
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden flex">
                {percentageRanges.map((range, index) => (
                  <div
                    key={index}
                    className={`h-full transition-all duration-500 ${
                      index === 0 ? 'bg-green-500' :
                      index === 1 ? 'bg-blue-500' :
                      index === 2 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${range.value}%` }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {percentageRanges.map((range, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                    <div className={`p-2 rounded-lg bg-white`}>
                      <Activity className={`h-5 w-5 ${range.color}`} />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">{range.value}%</span>
                      </div>
                      <p className="text-sm text-gray-600">{range.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mastered Targets by Date Range */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Mastered Targets Trend</h3>
            {renderGraph(graphFormat, masteredTargets.map(t => ({ label: t.date, value: t.count })))}
          </div>

          {/* Trial Counts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Daily Trial Counts */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Daily Trial Counts</h3>
              {renderGraph(graphFormat, trialCounts.daily.map(t => ({ label: t.date, value: t.count })))}
            </div>

            {/* Weekly Trial Counts */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Trial Counts</h3>
              {renderGraph(graphFormat, trialCounts.weekly.map(t => ({ label: t.week, value: t.count })))}
            </div>
          </div>

          {/* Data Visualization */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Data Visualization</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setGraphFormat('bar')}
                  className={`p-2 rounded-lg transition-colors ${
                    graphFormat === 'bar' 
                      ? 'bg-[#2B4C7E] text-white' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <BarChart2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setGraphFormat('line')}
                  className={`p-2 rounded-lg transition-colors ${
                    graphFormat === 'line' 
                      ? 'bg-[#2B4C7E] text-white' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <LineChart className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setGraphFormat('pie')}
                  className={`p-2 rounded-lg transition-colors ${
                    graphFormat === 'pie' 
                      ? 'bg-[#2B4C7E] text-white' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <PieChart className="h-5 w-5" />
                </button>
              </div>
            </div>
            {renderGraph(graphFormat, [
              { label: 'Target 1', value: 75 },
              { label: 'Target 2', value: 85 },
              { label: 'Target 3', value: 60 },
              { label: 'Target 4', value: 90 },
              { label: 'Target 5', value: 70 }
            ], 'h-96')}
          </div>
        </div>
      </div>
    </div>
  );
}