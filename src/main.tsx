import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import App from './App.tsx'
import "./index.css";

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md mx-auto p-6 bg-card border rounded-lg">
        <h2 className="text-lg font-semibold text-destructive mb-2">Something went wrong</h2>
        <p className="text-muted-foreground mb-4">
          An error occurred while loading the application.
        </p>
        <details className="text-sm">
          <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
            Error details
          </summary>
          <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
            {error.message}
          </pre>
        </details>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Reload page
        </button>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
  </ErrorBoundary>
)