import Spline from '@splinetool/react-spline';
import React from 'react';

interface SplineLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const SplineLoader: React.FC<SplineLoaderProps> = ({
  size = 'md',
  color = 'text-blue-600',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`md:scale-75 sm:scale-150 `}>
      
      <Spline
            scene="/spline/loadingThinking.splinecode"
            className=""
          />
      
    </div>
  );
};

export default SplineLoader; 