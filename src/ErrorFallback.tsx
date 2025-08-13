import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, RefreshCw } from "@phosp
import { AlertTriangle, RefreshCw } from "@phosphor-icons/react";

  resetErrorBoundary: () => vo
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  // When encountering errors in development, we want to see them clearly
  if (import.meta.env.DEV) {
    console.error("Error caught by boundary:", error);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full space-y-6">
          variant="outline"
          <RefreshCw className="h-4 w-4 mr-2" /
        </Button>
    </div>
};





















