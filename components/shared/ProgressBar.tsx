interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

export default function ProgressBar({ step, totalSteps }: ProgressBarProps) {
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="relative h-2 w-full rounded-full bg-gray-200">
        <div className="absolute h-2 rounded-full bg-blue-500" style={{ width: `${progressPercentage}%` }}></div>
      </div>
      <div className="mt-2 flex justify-between text-sm text-gray-600">
        {Array.from({ length: totalSteps }, (_, i) => (
          <span key={i} className={`${step === i + 1 ? 'text-blue-500 font-medium' : step > i + 1 ? 'text-green-500' : ''}`}>
            Step {i + 1}
          </span>
        ))}
      </div>
    </div>
  );
}
