import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ErrorBoundary } from 'react-error-boundary'

// Error Fallback Component
function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="max-w-md w-full text-center space-y-4">
        <h2 className="text-2xl font-bold text-destructive">Oops! Something went wrong</h2>
        <p className="text-muted-foreground">
          We encountered an unexpected error. Please try reloading the page.
        </p>
        <details className="text-left bg-muted p-4 rounded-lg">
          <summary className="cursor-pointer font-medium mb-2">Error Details</summary>
          <pre className="text-sm text-destructive whitespace-pre-wrap break-words">
            {error.message}
          </pre>
        </details>
        <button
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          onClick={() => window.location.reload()} 
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