
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TimelineStepProps {
  stepNumber: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
  onClick?: () => void;
  children: ReactNode;
}

const TimelineStep = ({
  stepNumber,
  title,
  isActive,
  isCompleted,
  onClick,
  children,
}: TimelineStepProps) => {
  return (
    <div className="flex gap-4 py-4">
      {/* Step indicator */}
      <div className="flex flex-col items-center">
        <button
          onClick={onClick}
          className={cn(
            "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2",
            isCompleted
              ? "border-green-500 bg-green-500 text-white"
              : isActive
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-gray-300 bg-white text-gray-500"
          )}
        >
          {stepNumber}
        </button>
        <div className="h-full w-0.5 -mt-2 bg-gray-200" />
      </div>
      
      {/* Content */}
      <div className="flex-1">
        <h3 className={cn(
          "font-medium mb-2",
          isActive ? "text-blue-500" : isCompleted ? "text-green-500" : "text-gray-700"
        )}>
          {title}
        </h3>
        <div className={cn(
          "bg-white border rounded-lg p-4 shadow-sm",
          isActive ? "border-blue-200" : "border-gray-200"
        )}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default TimelineStep;
