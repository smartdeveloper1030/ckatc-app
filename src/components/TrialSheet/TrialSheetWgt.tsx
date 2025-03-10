import React from 'react';
import { TrialSheetHeader } from './TrialSheetHeader';
import { TrialSheetContent } from './TrialSheetContent';

interface TrialSheetWgtProps {
  onClose: () => void;
}

export function TrialSheetWgt({ onClose }: TrialSheetWgtProps) {
  return (
    <div className="flex flex-col h-screen">
      <TrialSheetHeader onClose={onClose} />
      <TrialSheetContent />
    </div>
  );
}