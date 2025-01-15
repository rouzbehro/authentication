import { cn } from '@/lib/utils';
import React from 'react';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  theme?: 'primary' | 'secondary';
  fit?: 'default' | 'stretch';
}

const Loading: React.FC<LoadingProps> = ({ size = 'medium', theme = 'primary', fit = 'default' }) => {
  // Map size to specific dimensions
  const sizeClasses = {
    small: 'h-4 w-4 border-t-2',
    medium: 'h-6 w-6 border-t-4',
    large: 'h-8 w-8 border-t-4',
  };

  // Map theme to Tailwind color classes
  const themeClasses = {
    primary: 'border-primary bg-green-400',
    secondary: 'border-green-300 bg-green-500',
  };

  // Wrapper classes for variants
  const wrapperClasses = {
    default: 'flex items-center justify-center',
    stretch: 'absolute inset-0 flex items-center justify-center',
  };

  return (
    <div className={cn(wrapperClasses[fit])}>
      <div className={cn('animate-spin duration-700 rounded-full border-solid', sizeClasses[size], themeClasses[theme])}></div>
    </div>
  );
};

export default Loading;
