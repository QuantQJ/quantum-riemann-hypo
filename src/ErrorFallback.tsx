import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RefreshCw } from "@phosphor-icons/react";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle size={32} className="text-destructive" />
          </div>
          <CardTitle className="text-2xl">Oops! Something went wrong</CardTitle>
          <CardDescription>
            The quantum simulation encountered an unexpected error. Don't worry, this happens in the most complex calculations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <details className="text-sm">
            <summary className="cursor-pointer font-medium text-muted-foreground hover:text-foreground">
              Technical Details
            </summary>
            <pre className="mt-2 whitespace-pre-wrap bg-muted p-3 rounded text-xs overflow-auto">
              {error.message}
            </pre>
          </details>
          <Button 
            onClick={resetErrorBoundary}
            className="w-full"
            size="lg"
          >
            <RefreshCw size={16} className="mr-2" />
            Reset Application
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}