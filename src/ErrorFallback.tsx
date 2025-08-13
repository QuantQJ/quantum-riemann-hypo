import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "@phosphor-icons/r
interface ErrorFallbackProps {

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

          </AlertDescription>
        
          <Button onClick={resetErrorBoundary} className="w-full">
          </Button>
            variant="outline" 
            className="w-full"
            Refresh page
        </div>
        {process.env.NODE_ENV === 'development' && (
            <summary classNam
              {e
        
      </div>
  );













            <summary className="cursor-pointer">Error details</summary>
            <pre className="mt-2 whitespace-pre-wrap break-words">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}