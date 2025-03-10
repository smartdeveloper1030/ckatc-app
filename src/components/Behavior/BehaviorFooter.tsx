import React from 'react';
import { CheckSquare, LineChart, Timer, FileWarning as Running, Ruler, Zap } from 'lucide-react';

interface BehaviorFooterProps {
  activeAction: string | null;
  onActionChange: (actionId: string) => void;
}

export function BehaviorFooter({ activeAction, onActionChange }: BehaviorFooterProps) {
  const actions = [
    { id: 'abc', icon: CheckSquare, label: 'ABC', color: 'text-purple-600', bgColor: 'bg-purple-100', activeColor: 'bg-purple-200' },
    { id: 'frequency', icon: LineChart, label: 'Frequency', color: 'text-blue-600', bgColor: 'bg-blue-100', activeColor: 'bg-blue-200' },
    { id: 'duration', icon: Timer, label: 'Duration', color: 'text-green-600', bgColor: 'bg-green-100', activeColor: 'bg-green-200' },
    { id: 'rate', icon: Running, label: 'Rate', color: 'text-orange-600', bgColor: 'bg-orange-100', activeColor: 'bg-orange-200' },
    { id: 'interval', icon: Ruler, label: 'Interval', color: 'text-indigo-600', bgColor: 'bg-indigo-100', activeColor: 'bg-indigo-200' },
    { id: 'momentary', icon: Zap, label: 'Momentary', color: 'text-yellow-600', bgColor: 'bg-yellow-100', activeColor: 'bg-yellow-200' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-6 gap-2">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => onActionChange(action.id)}
              className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200
                ${activeAction === action.id 
                  ? `${action.activeColor} scale-95 shadow-inner` 
                  : `${action.bgColor} hover:scale-105 hover:shadow-md`}
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${action.color.split('-')[1]}-400`}
              aria-pressed={activeAction === action.id}
            >
              <action.icon className={`h-5 w-5 ${action.color} mb-1 transition-transform duration-200
                ${activeAction === action.id ? 'scale-90' : ''}`} />
              <span className={`text-xs font-medium ${action.color} transition-all duration-200
                ${activeAction === action.id ? 'font-semibold' : ''}`}>
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}