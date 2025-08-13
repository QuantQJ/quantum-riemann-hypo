import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "@phosphor-icons/react";


  // When encou
  if (import.meta.env.DEV) throw 
 

          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
          </AlertDescription>
        

          
        </div>
        <Button 
          className="w-full"
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>This spark has encountered a runtime error</AlertTitle>
          <AlertDescription>
            Something unexpected happened while running the application. The error details are shown below. Contact the spark author and let them know about this issue.
          </AlertDescription>
        </Alert>
        
        <div className="bg-card border rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-sm text-muted-foreground mb-2">Error Details:</h3>
          <pre className="text-xs text-destructive bg-muted/50 p-3 rounded border overflow-auto max-h-32">
            {error.message}
          </pre>
        </div>

        <Button 
          onClick={resetErrorBoundary} 
          className="w-full"
          variant="outline"

          <RefreshCw className="h-4 w-4 mr-2" />

        </Button>

    </div>

};