import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Separator = ({ children }: Props) => {
  if (!children) return <></>;

  return (
    <div className="relative mt-4">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">{children}</span>
      </div>
    </div>
  );
};

export default Separator;
