import React, { useState, useEffect, useRef } from 'react';
import { Timer, Minus, Plus, Play } from 'lucide-react';

interface BehaviorItem {
  id: string;
  title: string;
  description?: string;
  count: number;
}

export function RateView() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [behaviors, setBehaviors] = useState<BehaviorItem[]>([
    {
      id: 'climbing',
      title: 'Climbing',
      description: '(For furniture and large objects not intended for climbing.). Any ti...',
      count: 1
    },
    {
      id: 'crying',
      title: 'crying',
      count: 1
    }
  ]);

  const timerRef = useRef<number>();

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 0) {
            setMinutes(prevMinutes => {
              if (prevMinutes === 0) {
                setIsRunning(false);
                clearInterval(timerRef.current);
                return 0;
              }
              return prevMinutes - 1;
            });
            return 59;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const handleCount = (id: string, increment: boolean) => {
    setBehaviors(prev => 
      prev.map(behavior => 
        behavior.id === id 
          ? { ...behavior, count: increment ? behavior.count + 1 : Math.max(0, behavior.count - 1) }
          : behavior
      )
    );
  };

  const handleStart = () => {
    setIsRunning(true);
    setShowActions(true);
  };

  const handleSave = () => {
    setIsRunning(false);
    setShowActions(false);
    // Reset timer
    setMinutes(0);
    setSeconds(5);
    // Handle save functionality
    console.log('Saving rate data...');
  };

  const handleCancel = () => {
    setIsRunning(false);
    setShowActions(false);
    // Reset timer
    setMinutes(0);
    setSeconds(5);
    // Handle cancel functionality
    console.log('Canceling rate data collection...');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Record Rate Data</h2>
        
        <div className="space-y-6">
          {/* Timer Display */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 inline-block">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900 font-mono">
                    {minutes.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">minutes</div>
                </div>
                <div className="text-5xl font-bold text-gray-400">:</div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900 font-mono">
                    {seconds.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">seconds</div>
                </div>
              </div>
            </div>
          </div>

          {/* Start Button or Action Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            {!showActions ? (
              <button
                onClick={handleStart}
                className="px-8 py-2.5 bg-green-600 text-white rounded-lg font-medium
                       hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Play className="h-5 w-5" />
                <span>Start</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="px-8 py-2.5 bg-[#FF9F43] text-white rounded-lg font-medium
                         hover:bg-[#FF9F43]/90 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-8 py-2.5 bg-white text-gray-700 rounded-lg font-medium
                         border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </>
            )}
          </div>

          {/* Behaviors List */}
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
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center
                               hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="h-5 w-5 text-gray-600" />
                    </button>
                    <span className="text-2xl font-semibold text-gray-900 w-8 text-center">
                      {behavior.count}
                    </span>
                    <button
                      onClick={() => handleCount(behavior.id, true)}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center
                               hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}