import React from 'react';
import Loading from './Loading'; // Adjust the import path as necessary
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'reset' | 'submit';
  isLoading?: boolean;
  loadingText?: string;
  size?: 'small' | 'medium' | 'large';
  theme?: 'primary' | 'secondary';
}

const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  type = 'submit',
  isLoading = false,
  loadingText,
  size = 'small',
  theme = 'secondary',
  className,
  disabled,
  ...props
}) => {
  return (
    <Button
      type={type}
      className={cn(
        'w-full mt-4 flex items-center justify-center gap-2 rounded-md transition-all duration-150',
        isLoading && 'cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loading size={size} theme={theme} />}
      {isLoading && loadingText ? loadingText : children}
    </Button>
  );
};

export default CTAButton;
