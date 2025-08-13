import { ChevronRight, Calculator, BarChart, CheckCircle, BookOpen } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  {
    id: "overview",
    title: "Research Overview",
    icon: BookOpen,
    description: "Abstract and theoretical framework"
  },
  {
    id: "theory",
    title: "Theoretical Framework", 
    icon: Calculator,
    description: "Mathematical foundations and equations"
  },
  {
    id: "parameters",
    title: "Parameter Analysis",
    icon: BarChart, 
    description: "Beta sweep and optimization results"
  },
  {
    id: "susy",
    title: "SUSY Integration",
    icon: Calculator,
    description: "Supersymmetric quantum mechanics analysis"
  },
  {
    id: "verification",
    title: "Results Verification",
    icon: CheckCircle,
    description: "Comprehensive validation metrics"
  }
];

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-primary">Navigation</h2>
      <nav className="space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <Button
              key={section.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start text-left h-auto p-3 hover-lift ${
                isActive ? "bg-primary text-primary-foreground" : ""
              }`}
              onClick={() => onSectionChange(section.id)}
            >
              <div className="flex items-center gap-3 w-full">
                <Icon size={20} />
                <div className="flex-1">
                  <div className="font-medium">{section.title}</div>
                  <div className={`text-sm ${
                    isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}>
                    {section.description}
                  </div>
                </div>
                {isActive && <ChevronRight size={16} />}
              </div>
            </Button>
          );
        })}
      </nav>
    </Card>
  );
}