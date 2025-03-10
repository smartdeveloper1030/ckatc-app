import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, StopCircle, Clock } from 'lucide-react';

interface TimerHistory {
  time: string;
  duration: string;
}

export function DurationView() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [history, setHistory] = useState<TimerHistory[]>([]);
  const timerRef = useRef<number>();

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setElapsedTime(prev => prev + 1);
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

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleStop = () => {
    if (elapsedTime > 0) {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setHistory(prev => [{
        time: timeString,
        duration: formatTime(elapsedTime)
      }, ...prev]);
    }
    
    setIsRunning(false);
    setElapsedTime(0);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Duration Data Collection</h2>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Timer Section */}
          <div className="bg-green-50 rounded-lg p-8 text-center">
            <div className="text-6xl font-bold text-green-600 mb-4 font-mono">
              {formatTime(elapsedTime)}
            </div>
            <div className="flex justify-center gap-4">
              <button 
                onClick={handleStartPause}
                className={`px-6 py-3 rounded-lg text-white font-medium transition-colors flex items-center gap-2
                  ${isRunning 
                    ? 'bg-yellow-500 hover:bg-yellow-600' 
                    : 'bg-green-600 hover:bg-green-700'}`}
              >
                {isRunning ? (
                  <>
                    <Pause className="h-5 w-5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    <span>Start</span>
                  </>
                )}
              </button>
              <button 
                onClick={handleStop}
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium
                       hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <StopCircle className="h-5 w-5" />
                <span>Stop</span>
              </button>
            </div>
          </div>

          {/* History Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Duration History</h3>
            <div className="space-y-3">
              {history.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                  No duration records yet
                </div>
              ) : (
                history.map((record, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">{record.time}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{record.duration}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}