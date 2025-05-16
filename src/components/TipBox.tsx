
import { ReactNode } from "react";
import { Lightbulb } from "lucide-react";

interface TipBoxProps {
  children: ReactNode;
}

const TipBox = ({ children }: TipBoxProps) => {
  return (
    <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
      <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
      <div className="text-sm text-amber-800">
        {children}
      </div>
    </div>
  );
};

export default TipBox;
