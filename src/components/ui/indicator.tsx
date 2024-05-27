import React, { useState } from 'react';

interface OnlineIndicatorProps {
  isFetching: boolean;
}

const OnlineIndicator: React.FC<OnlineIndicatorProps> = ({ isFetching }: OnlineIndicatorProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='absolute top-0 left-0'>

    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={`w-3 h-3 rounded-full ${isFetching ? 'bg-green-500 animate-ping' : 'bg-gray-100'}`}></div>
      {isHovered && (
          <div className="relative bg-white border border-gray-200 p-2 rounded shadow-md flex flex-row">
          <p className='text-xs font-normal'>Data Update setiap = <a className='font-bold text-green-500'> 5 Detik </a></p>
        </div>
      )}
    </div>
      </div>
  );
};

export default OnlineIndicator;
