import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "@phosphor-icons/r
import { AlertTriangle } from "@phosphor-icons/react";

  resetErrorBoundary: () => vo
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
          
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Something went wrong. Please try refreshing the page.
          </AlertDescription>
      </div>
  );



















