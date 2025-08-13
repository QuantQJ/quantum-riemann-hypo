import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Something went wrong. Please try refreshing the page.
          </AlertDescription>
        </Alert>
        
        <div className="mt-4 space-y-2">
          <Button onClick={resetErrorBoundary} className="w-full">
            Refresh page
          </Button>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4">
            <summary className="cursor-pointer">Error details</summary>
            <pre className="mt-2 whitespace-pre-wrap break-words text-sm">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}