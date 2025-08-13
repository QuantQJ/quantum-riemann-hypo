import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, RefreshCw } from "@phosp
import { AlertTriangle, RefreshCw } from "@phosphor-icons/react";


  // When encou
    console.error("Error caught b


export const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  // When encountering errors in development, we want to see them clearly
  if (import.meta.env.DEV) {
    console.error("Error caught by boundary:", error);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full space-y-6">
          onClick={resetErrorBoundary
          <AlertTriangle className="h-4 w-4" />
        >
          <AlertDescription>
            {import.meta.env.DEV ? error.message : "An unexpected error occurred. Please try again."}
          </AlertDescription>
  );
        
        <Button 
          onClick={resetErrorBoundary}
          variant="outline"
          className="w-full"

          <RefreshCw className="h-4 w-4 mr-2" />

        </Button>

    </div>

};