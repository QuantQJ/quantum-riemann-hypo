import { useState } from "react";
import { useKV } from "@github/spark/hooks";
import { Navigation } from "@/components/Navigation";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [activeSection, setActiveSection] = useKV("active-section", "overview");

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="main-grid">
          <div className="navigation-column">
            <div className="navigation-container">
              <Navigation 
                activeSection={activeSection} 
                onSectionChange={handleSectionChange} 
              />
            </div>
          </div>
          <div className="content-column">
            <div className="content-container">
              <div className="section-transition">
                <div className="text-center space-y-6">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Quantum Riemann Research Platform
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Currently showing: <strong>{activeSection}</strong>
                  </p>
                  <div className="p-8 border rounded-lg bg-card">
                    <h2 className="text-2xl font-semibold mb-4">Platform Status</h2>
                    <p className="text-muted-foreground mb-4">
                      The application is running successfully! 
                      Navigation is working, and we can load more complex components gradually.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <div className="p-4 border rounded bg-green-50 dark:bg-green-900/20">
                        <h3 className="font-semibold text-green-800 dark:text-green-200">✓ Core App</h3>
                        <p className="text-sm text-green-600 dark:text-green-300">Running</p>
                      </div>
                      <div className="p-4 border rounded bg-green-50 dark:bg-green-900/20">
                        <h3 className="font-semibold text-green-800 dark:text-green-200">✓ Navigation</h3>
                        <p className="text-sm text-green-600 dark:text-green-300">Active</p>
                      </div>
                      <div className="p-4 border rounded bg-blue-50 dark:bg-blue-900/20">
                        <h3 className="font-semibold text-blue-800 dark:text-blue-200">→ Next</h3>
                        <p className="text-sm text-blue-600 dark:text-blue-300">Load sections</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;