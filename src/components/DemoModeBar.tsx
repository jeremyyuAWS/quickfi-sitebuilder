import React from 'react';
import { AlertCircle, Info, X } from 'lucide-react';

interface DemoModeBarProps {
  onExit: () => void;
}

const DemoModeBar: React.FC<DemoModeBarProps> = ({ onExit }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white py-3 px-4 flex items-center justify-between z-50">
      <div className="flex items-center">
        <AlertCircle size={18} className="mr-2" />
        <span className="font-medium">Demo Mode Active</span>
        <span className="mx-2 text-blue-200">|</span>
        <span className="text-sm text-blue-100">
          You're viewing a demonstration of the QuickFi Dealer Microsite Builder with pre-loaded data.
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-blue-100 hover:text-white flex items-center text-sm">
          <Info size={14} className="mr-1" />
          More Info
        </button>
        <button 
          onClick={onExit}
          className="bg-white text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-50 flex items-center"
        >
          <X size={14} className="mr-1" />
          Exit Demo
        </button>
      </div>
    </div>
  );
};

export default DemoModeBar;