import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "@phosphor-icons/react";



  return (
      <div className="max-w-md w-
 

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Something went wrong. Please try refreshing the page.
          </AlertDescription>
          <detai
        
        <div className="mt-4 space-y-2">
          <Button onClick={resetErrorBoundary} className="w-full">
        )}
          </Button>
  );
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4">









