import React from 'react';

const Spinner: React.FC<{ size?: string }> = ({ size = 'md' }) => {
  const sizeClass = size === 'lg' ? 'w-16 h-16' : 'w-8 h-8';
  return (
    <div className={`spinner-border animate-spin inline-block border-4 border-t-4 border-gray-200 rounded-full ${sizeClass}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;