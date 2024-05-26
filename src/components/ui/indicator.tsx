// OnlineIndicator.tsx

import React from 'react';

interface OnlineIndicatorProps {
  isFetching: boolean;
}

const OnlineIndicator: React.FC<OnlineIndicatorProps> = ({ isFetching }: OnlineIndicatorProps) => {
  return (
    <div className={`w-3 h-3 rounded-full ${isFetching ? 'bg-green-500' : 'bg-gray-100'} absolute top-0 left-0`}>
    </div>
  );
};

export default OnlineIndicator;
