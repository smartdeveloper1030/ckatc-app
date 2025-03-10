import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

interface BehaviorItem {
  id: string;
  title: string;
  description?: string;
  count: number;
}

export function FrequencyView() {
  const [behaviors, setBehaviors] = useState<BehaviorItem[]>([
    {
      id: 'aggression',
      title: 'Aggression Towards Others',
      description: 'Hitting, kicking, spitting, pinching, and scratching.',
      count: 0
    },
    {
      id: 'biting',
      title: 'biting',
      count: 0
    }
  ]);

  const handleCount = (id: string, increment: boolean) => {
    setBehaviors(prev => 
      prev.map(behavior => 
        behavior.id === id 
          ? { ...behavior, count: increment ? behavior.count + 1 : Math.max(0, behavior.count - 1) }
          : behavior
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Record Frequency Data</h2>
        
        <div className="space-y-4">
          {behaviors.map((behavior) => (
            <div key={behavior.id} 
                 className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{behavior.title}</h3>
                  {behavior.description && (
                    <p className="text-gray-600 mt-1">{behavior.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleCount(behavior.id, false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="h-6 w-6 text-gray-600" />
                  </button>
                  <span className="text-3xl font-semibold text-gray-900 w-12 text-center">
                    {behavior.count}
                  </span>
                  <button
                    onClick={() => handleCount(behavior.id, true)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-6 w-6 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}