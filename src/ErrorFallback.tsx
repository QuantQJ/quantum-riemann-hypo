import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "@phosphor-icons/r
interface ErrorFallbackProps {

interface ErrorFallbackProps {
  return (
      <div className="max-w-md w-
 

        </Alert>
  return (
            Refresh page
        </div>
        {process.env.NODE_ENV === 'development' && (
            <summary className="cursor-pointer"
              {error.message
          </details>
      </div>
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

}