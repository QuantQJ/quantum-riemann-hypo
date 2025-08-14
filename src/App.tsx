import { useState } from "react";
import { useKV } from "@github/spark/hooks";
import { Navigation } from "@/components/Navigation";
import { OverviewSection } from "@/components/OverviewSection";
import { TheorySection } from "@/components/TheorySection";
import { ParametersSection } from "@/components/ParametersSection";
import { SusySection } from "@/components/SusySection";
import { VerificationSection } from "@/components/VerificationSection";
import { ZeroVisualization } from "@/components/ZeroVisualization";
import { MathematicalWorkbench } from "@/components/MathematicalWorkbench";
import { AboutSection } from "@/components/AboutSection";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [activeSection, setActiveSection] = useKV("active-section", "overview");

  const renderSection = () => {
    switch (activeSection) {
      case "theory":
        return <TheorySection />;
      case "parameters":
        return <ParametersSection />;
      case "susy":
        return <SusySection />;
      case "verification":
        return <VerificationSection />;
      case "visualization":
        return <ZeroVisualization />;
      case "workbench":
        return <MathematicalWorkbench />;
      case "about":
        return <AboutSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="main-grid">
          <div className="navigation-column">
            <div className="navigation-container">
              <Navigation 
                activeSection={activeSection} 
                onSectionChange={setActiveSection} 
              />
            </div>
          </div>
          <div className="content-column">
            <div className="content-container">
              <div className="section-transition">
                {renderSection()}
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