import React, { useState, useEffect, useRef } from 'react';
import { Play, Square } from 'lucide-react';

interface BehaviorItem {
  id: string;
  title: string;
  description: string;
  checked: boolean;
}

export function IntervalView() {
  const [intervalNumber, setIntervalNumber] = useState(0);
  const [observeMinutes, setObserveMinutes] = useState(2);
  const [observeSeconds, setObserveSeconds] = useState(0);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [behaviors, setBehaviors] = useState<BehaviorItem[]>([
    {
      id: 'fidgeting',
      title: 'Fidgeting',
      description: 'fidgeting with fingers, or with objects, and pacing.',
      checked: false
    },
    {
      id: 'screaming',
      title: 'Screaming',
      description: 'Loud vocals',
      checked: false
    }
  ]);

  const timerRef = useRef<number>();

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        // Update observe timer (counting down)
        setObserveSeconds(prevSeconds => {
          if (prevSeconds === 0) {
            if (observeMinutes === 0) {
              // Timer reached 0, stop the interval
              setIsRunning(false);
              setIsStopped(true);
              clearInterval(timerRef.current);
              return 0;
            }
            setObserveMinutes(prevMinutes => prevMinutes - 1);
            return 59;
          }
          return prevSeconds - 1;
        });

        // Update elapsed timer (counting up)
        setElapsedSeconds(prevSeconds => {
          if (prevSeconds === 59) {
            setElapsedMinutes(prevMinutes => prevMinutes + 1);
            return 0;
          }
          return prevSeconds + 1;
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
  }, [isRunning, observeMinutes]);

  const handleStart = () => {
    setIsRunning(true);
    setIsStopped(false);
    setIntervalNumber(prev => prev + 1);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsStopped(true);
  };

  const handleCancel = () => {
    setIsRunning(false);
    setIsStopped(false);
    setIntervalNumber(0);
    setObserveMinutes(2);
    setObserveSeconds(0);
    setElapsedMinutes(0);
    setElapsedSeconds(0);
    setBehaviors(prev => prev.map(behavior => ({ ...behavior, checked: false })));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving interval data...');
    handleCancel(); // Reset everything after saving
  };

  const handleBehaviorToggle = (id: string) => {
    setBehaviors(prev =>
      prev.map(behavior =>
        behavior.id === id
          ? { ...behavior, checked: !behavior.checked }
          : behavior
      )
    );
  };

  const formatTime = (minutes: number, seconds: number) => {
    return `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Record Partial Interval Data</h2>
        
        <div className="space-y-6">
          {/* Timer Display Grid */}
          <div className="grid grid-cols-3 gap-8">
            {/* Interval Number */}
            <div>
              <div className="text-center mb-2 text-gray-600">Interval #</div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="text-4xl font-bold text-gray-900 text-center">
                  {intervalNumber.toString().padStart(2, '0')}
                </div>
              </div>
            </div>

            {/* Observe Timer */}
            <div>
              <div className="text-center mb-2 text-gray-600">Observe</div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-baseline justify-center gap-2">
                  <div className="text-4xl font-bold text-gray-900">
                    {formatTime(observeMinutes, observeSeconds)}
                  </div>
                </div>
                <div className="flex justify-center gap-8 mt-1">
                  <span className="text-sm text-gray-500">minutes</span>
                  <span className="text-sm text-gray-500">seconds</span>
                </div>
              </div>
            </div>

            {/* Elapsed Timer */}
            <div>
              <div className="text-center mb-2 text-gray-600">Elapsed</div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-baseline justify-center gap-2">
                  <div className="text-4xl font-bold text-gray-900">
                    {formatTime(elapsedMinutes, elapsedSeconds)}
                  </div>
                </div>
                <div className="flex justify-center gap-8 mt-1">
                  <span className="text-sm text-gray-500">minutes</span>
                  <span className="text-sm text-gray-500">seconds</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            {!isRunning && !isStopped && (
              <button
                onClick={handleStart}
                className="px-12 py-2.5 bg-green-500 text-white rounded-lg font-medium
                       hover:bg-green-600 transition-colors"
              >
                Start
              </button>
            )}
            
            {isRunning && (
              <>
                <button
                  onClick={handleStop}
                  className="px-12 py-2.5 bg-red-500 text-white rounded-lg font-medium
                         hover:bg-red-600 transition-colors"
                >
                  Stop
                </button>
                <button
                  onClick={handleCancel}
                  className="px-12 py-2.5 bg-gray-500 text-white rounded-lg font-medium
                         hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </>
            )}

            {isStopped && (
              <button
                onClick={handleSave}
                className="px-12 py-2.5 bg-[#FF9F43] text-white rounded-lg font-medium
                       hover:bg-[#FF9F43]/90 transition-colors"
              >
                Save
              </button>
            )}
          </div>

          {/* Behaviors List */}
          <div className="space-y-4 mt-8">
            {behaviors.map((behavior) => (
              <div key={behavior.id} 
                   className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{behavior.title}</h3>
                    <p className="text-gray-600 mt-1">{behavior.description}</p>
                  </div>
                  <button
                    onClick={() => handleBehaviorToggle(behavior.id)}
                    className={`w-6 h-6 border rounded transition-colors
                      ${behavior.checked 
                        ? 'bg-[#2B4C7E] border-[#2B4C7E]' 
                        : 'border-gray-300 hover:border-[#2B4C7E]'}`}
                  >
                    {behavior.checked && (
                      <Square className="h-4 w-4 text-white m-0.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}