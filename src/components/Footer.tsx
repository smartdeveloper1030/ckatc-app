import React, { useState } from 'react';

export function Footer() {
  const [behaviors, setBehaviors] = useState([
    {
      id: 1,
      name: 'Aggression Towards Oth...',
      count: 0,
      color: 'violet'
    },
    {
      id: 2,
      name: 'biting',
      count: 0,
      color: 'violet'
    }
  ]);

  const handleIncrement = (id: number) => {
    setBehaviors(prevBehaviors =>
      prevBehaviors.map(behavior =>
        behavior.id === id
          ? { ...behavior, count: behavior.count + 1 }
          : behavior
      )
    );
  };

  return (
    <div className="bg-white border-t border-gray-200 py-3 px-6">
      <div className="flex items-center gap-4">
        {behaviors.map((behavior) => (
          <button
            key={behavior.id}
            onClick={() => handleIncrement(behavior.id)}
            className="group flex items-center gap-3 bg-violet-100 rounded-full pl-3 pr-4 py-1.5 
                     hover:bg-violet-200 transition-colors duration-200"
          >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center 
                          shadow-sm group-hover:shadow">
              <span className="text-violet-700 font-semibold text-sm">
                {behavior.count}
              </span>
            </div>
            <span className="text-sm font-medium text-violet-700">
              {behavior.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}