import React from 'react';

interface ChoiceCardProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onChange: (id: string) => void;
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({ id, label, icon, isSelected, onChange }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all min-h-36 ${
        isSelected ? 'outline outline-2 outline-green-500 bg-green-50' : 'outline outline-gray-300 outline-1'
      }`}
      onClick={() => onChange(id)}
    >
      <div className="text-2xl mb-2">{icon}</div>
      <span className="text-sm font-medium text-center">{label}</span>
    </div>
  );
};

export default ChoiceCard;
