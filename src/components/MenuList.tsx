import { ChevronDown } from 'lucide-react';
import { useTarget } from '../context/TargetContext';

export const MenuList = () => {
  const { selectedTarget, setSelectedTarget, sections, expandedPrograms, setExpandedSections } = useTarget();
  const toggleProgramItem = (index: number) => {
    setExpandedSections(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };
  const handleItemClick = (item: typeof selectedTarget) => {
    setSelectedTarget(item);
  };
  const getStatusColor = (status: 'not-started' | 'in-progress' | 'mastered') => {
    switch (status) {
      case 'mastered':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-yellow-500';
      case 'not-started':
        return 'bg-gray-300';
    }
  };
  const getStatusRing = (status: 'not-started' | 'in-progress' | 'mastered') => {
    switch (status) {
      case 'mastered':
        return 'ring-green-500';
      case 'in-progress':
        return 'ring-yellow-500';
      case 'not-started':
        return 'ring-gray-300';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {sections.map((section, index) => (
        <div 
          key={index} 
          className={`border-b border-gray-200 last:border-b-0 transition-colors duration-300
            ${expandedPrograms.includes(index) ? 'bg-gray-50/50' : 'bg-white'}`}
        >
          <button 
            className="w-full flex items-center justify-between p-4 hover:bg-gray-100 
                     transition-all duration-300 group"
            onClick={() => {
              toggleProgramItem(index);
              console.log({section, index});
            }}
          >
            <span className={`text-sm font-medium text-left pr-4 transition-all duration-300
              ${expandedPrograms.includes(index) ? 'text-[#2B4C7E]' : 'text-gray-600'}`}>
              {section.title}
            </span>
            <div className={`transform transition-all duration-300 
              ${expandedPrograms.includes(index) ? 'rotate-180' : 'rotate-0'}`}>
              <ChevronDown className={`h-5 w-5 transition-colors duration-300
                ${expandedPrograms.includes(index) ? 'text-[#2B4C7E]' : 'text-gray-400'}`} />
            </div>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out
            ${expandedPrograms.includes(index) ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="px-4 pb-4 space-y-3">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="w-full text-left"
                >
                  <div className={`rounded-lg p-3 transition-colors duration-200
                    ${selectedTarget?.id === item.id 
                      ? 'bg-[#2B4C7E]/10 border-[#2B4C7E]' 
                      : 'bg-white border-transparent'
                    } border`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full transition-colors duration-200 ring-2 ring-offset-2
                          ${getStatusColor(item.status)} ${getStatusRing(item.status)}`} />
                        <span className={`text-sm transition-colors duration-200
                          ${selectedTarget?.id === item.id 
                            ? 'text-[#2B4C7E] font-medium' 
                            : 'text-gray-700'
                          } pr-2`}>
                          {item.title}
                        </span>
                      </div>
                      <span className={`text-sm transition-colors duration-200
                        ${selectedTarget?.id === item.id
                          ? 'text-[#2B4C7E]'
                          : 'text-gray-500'
                        }`}>
                        {item.progress}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-colors duration-200
                          ${selectedTarget?.id === item.id 
                            ? 'bg-[#2B4C7E]' 
                            : 'bg-[#2B4C7E]/60'}`}
                        style={{ width: `${(item.completed / item.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}