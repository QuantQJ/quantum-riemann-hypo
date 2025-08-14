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
import { ReferencesSection } from "@/components/ReferencesSection";
import { AboutSection } from "@/components/AboutSection";
import { ShareSection } from "@/components/ShareSection";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [activeSection, setActiveSection] = useKV("active-section", "overview");

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "theory":
        return <TheorySection key="theory" />;
      case "parameters":
        return <ParametersSection key="parameters" />;
      case "susy":
        return <SusySection key="susy" />;
      case "verification":
        return <VerificationSection key="verification" />;
      case "visualization":
        return <ZeroVisualization key="visualization" />;
      case "workbench":
        return <MathematicalWorkbench key="workbench" />;
      case "references":
        return <ReferencesSection key="references" />;
      case "share":
        return <ShareSection key="share" />;
      case "about":
        return <AboutSection key="about" />;
      default:
        return <OverviewSection key="overview" onSectionChange={handleSectionChange} />;
    }
  };

  return (
    <div className="min-h-screen research-gradient">
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