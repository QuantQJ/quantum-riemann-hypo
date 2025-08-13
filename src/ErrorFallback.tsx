import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
interface ErrorFallbackProps {

interface ErrorFallbackProps {
  return (
      <div className="max-w-md w-
 

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="mt-2">
            Something went wrong. Please try refreshing the page.
            <div className="mt-4">

                Try again
              </Button>
            </div>

        </Alert>

    </div>

}