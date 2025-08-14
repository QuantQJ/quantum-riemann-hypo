import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "@phosphor-icons/react";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  console.error('Application error:', error);
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="mt-2">
            Something went wrong. Please try refreshing the page.
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-2 text-xs">
                <summary>Error details (development)</summary>
                <pre className="mt-1 text-xs overflow-auto">
                  {error.message}
                </pre>
              </details>
            )}
            <div className="mt-4">
              <Button onClick={resetErrorBoundary} variant="outline">
                Try again
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}