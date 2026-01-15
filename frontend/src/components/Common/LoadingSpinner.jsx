import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 w-full">
      <Loader2 className="w-10 h-10 text-planova-mint animate-spin mb-4" />
      <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;