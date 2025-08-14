import { AlertTriangle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-4">
        <div className="flex justify-center">
          <AlertTriangle className="w-16 h-16 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Something went wrong
        </h1>
        <p className="text-muted-foreground">
          An error occurred while rendering the quantum research interface.
        </p>
        <details className="text-left bg-card border rounded-lg p-4">
          <summary className="cursor-pointer font-medium mb-2">
            Error details
          </summary>
          <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
            {error.message}
          </pre>
        </details>
        <Button onClick={resetErrorBoundary} className="w-full">
          Try again
        </Button>
      </div>
    </div>
  );
}