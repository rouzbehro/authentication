import React from 'react';

interface Option {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  features?: string[]; // Optional list of features
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
          className={`flex flex-col p-4 rounded-lg cursor-pointer ${
            selectedValue === option.value ? 'outline outline-2 outline-green-500 bg-green-50' : 'outline outline-gray-300 outline-1'
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
            <div className="text-2xl bg-gray-100 border border-gray-200 p-3 rounded-md">{option.icon}</div>
            <div>
              <div className="text-lg font-semibold">{option.label}</div>
              <div className="text-sm text-gray-500">{option.description}</div>
            </div>
          </div>
          {option.features && (
            <ul className="space-y-1 pl-16 text-sm text-gray-600  mt-3">
              {option.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-4 h-4 flex items-center justify-center bg-green-500 text-white rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </label>
      ))}
    </div>
  );
};

export default OptionCard;
