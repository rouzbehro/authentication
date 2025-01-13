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
      className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${
        isSelected ? 'border-green-500 bg-gray-100 shadow-md' : 'border-gray-300 bg-white'
      }`}
      onClick={() => onChange(id)}
    >
      <div className="text-2xl mb-2">{icon}</div>
      <span className="text-sm font-medium text-center">{label}</span>
    </div>
  );
};

export default ChoiceCard;
