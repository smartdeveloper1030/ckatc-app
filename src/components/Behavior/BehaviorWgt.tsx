import React, { useState } from 'react';
import { BehaviorHeader } from './BehaviorHeader';
import { BehaviorContent } from './BehaviorContent';
import { BehaviorFooter } from './BehaviorFooter';

interface BehaviorWgtProps {
  onClose: () => void;
}

export function BehaviorWgt({ onClose }: BehaviorWgtProps) {
  const [formData, setFormData] = useState({
    date: '02/22/2025',
    time: '04:30 PM',
    durationMin: '',
    durationSec: '',
    severity: '',
    response: '',
    groupSize: ''
  });

  const [activeAction, setActiveAction] = useState<string | null>('abc');

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <BehaviorHeader onClose={onClose} />
      <BehaviorContent 
        formData={formData} 
        setFormData={setFormData} 
        activeAction={activeAction}
      />
      <BehaviorFooter 
        activeAction={activeAction} 
        onActionChange={setActiveAction} 
      />
    </div>
  );
}