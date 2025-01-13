import React from 'react';

interface Option {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

interface OptionCardProps {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ options, selectedValue, onChange }) => {
  return (
    <div className="space-y-4">
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center p-4 border rounded-lg cursor-pointer ${
            selectedValue === option.value ? 'border-green-500 bg-green-50' : 'border-gray-300'
          }`}
        >
          <input
            type="radio"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className="hidden"
          />
          <div className="flex items-center gap-4">
            <div className="text-2xl bg-gray-100 p-3 rounded-md">{option.icon}</div>
            <div>
              <div className="text-lg font-semibold">{option.label}</div>
              <div className="text-sm text-gray-500">{option.description}</div>
            </div>
          </div>
        </label>
      ))}
    </div>
  );
};

export default OptionCard;
