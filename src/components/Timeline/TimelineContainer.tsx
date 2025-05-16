
import { ReactNode } from "react";

interface TimelineContainerProps {
  children: ReactNode;
}

const TimelineContainer = ({ children }: TimelineContainerProps) => {
  return (
    <div className="py-4 px-2 md:px-4">
      {children}
    </div>
  );
};

export default TimelineContainer;
