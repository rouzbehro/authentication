import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin duration-700 rounded-full h-6 w-6 border-t-4  border-primary bg-green-400 border-solid "></div>
    </div>
  );
};

export default Loading;
