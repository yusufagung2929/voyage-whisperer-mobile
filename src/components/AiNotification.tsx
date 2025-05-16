
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AiNotificationProps {
  message: string;
  type?: "info" | "success" | "warning";
  onDismiss?: () => void;
  autoClose?: boolean;
}

const AiNotification = ({ 
  message, 
  type = "info", 
  onDismiss,
  autoClose = true
}: AiNotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoClose) {
      timer = setTimeout(() => {
        setIsVisible(false);
        if (onDismiss) onDismiss();
      }, 5000);
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [autoClose, onDismiss]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed top-4 left-4 right-4 z-50 p-4 rounded-lg shadow-lg border flex items-start gap-3",
      type === "info" && "bg-blue-50 border-blue-200",
      type === "success" && "bg-green-50 border-green-200",
      type === "warning" && "bg-yellow-50 border-yellow-200"
    )}>
      <div className={cn(
        "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center",
        type === "info" && "bg-blue-500",
        type === "success" && "bg-green-500",
        type === "warning" && "bg-yellow-500"
      )}>
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <div className="flex-1">
        <p className={cn(
          "font-medium",
          type === "info" && "text-blue-800",
          type === "success" && "text-green-800",
          type === "warning" && "text-yellow-800"
        )}>AI Assistant</p>
        <p className="text-gray-700">{message}</p>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="opacity-70 hover:opacity-100"
        onClick={handleDismiss}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default AiNotification;
