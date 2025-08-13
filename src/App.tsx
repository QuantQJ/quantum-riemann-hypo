import { useState } from "react";
import { useKV } from "@github/spark/hooks";
import { Navigation } from "@/components/Navigation";
import { OverviewSection } from "@/components/OverviewSection";
import { TheorySection } from "@/components/TheorySection";
import { ParametersSection } from "@/components/ParametersSection";
import { SusySection } from "@/components/SusySection";
import { VerificationSection } from "@/components/VerificationSection";

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
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Navigation 
                activeSection={activeSection} 
                onSectionChange={setActiveSection} 
              />
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="section-transition">
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;