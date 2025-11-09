import React, { memo } from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600"></div>
    </div>
  );
};

export default memo(LoadingSpinner);