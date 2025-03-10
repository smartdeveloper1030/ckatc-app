import React, { useState } from 'react';
import { Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { ABCView } from './content/ABCView';
import { FrequencyView } from './content/FrequencyView';
import { DurationView } from './content/DurationView';
import { RateView } from './content/RateView';
import { IntervalView } from './content/IntervalView';
import { MomentaryView } from './content/MomentaryView';

interface BehaviorContentProps {
  formData: {
    date: string;
    time: string;
    durationMin: string;
    durationSec: string;
    severity: string;
    response: string;
    groupSize: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    date: string;
    time: string;
    durationMin: string;
    durationSec: string;
    severity: string;
    response: string;
    groupSize: string;
  }>>;
  activeAction: string | null;
}

export function BehaviorContent({ formData, setFormData, activeAction }: BehaviorContentProps) {
  const renderContent = () => {
    switch (activeAction) {
      case 'abc':
        return <ABCView formData={formData} setFormData={setFormData} />;
      case 'frequency':
        return <FrequencyView />;
      case 'duration':
        return <DurationView />;
      case 'rate':
        return <RateView />;
      case 'interval':
        return <IntervalView />;
      case 'momentary':
        return <MomentaryView />;
      default:
        return <ABCView formData={formData} setFormData={setFormData} />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pt-[73px] pb-[64px]">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {renderContent()}
      </div>
    </div>
  );
}