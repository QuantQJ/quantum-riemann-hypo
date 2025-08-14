import { ChevronRight, Calculator, BarChart, CheckCircle, BookOpen, Eye, Function, FlaskConical, Info } from "@phosphor-icons/react";
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
    description: "Abstract & framework"
  },
  {
    id: "theory",
    title: "Theoretical Framework", 
    icon: Calculator,
    description: "Math foundations"
  },
  {
    id: "parameters",
    title: "Parameter Analysis",
    icon: BarChart, 
    description: "Optimization results"
  },
  {
    id: "susy",
    title: "SUSY Integration",
    icon: FlaskConical,
    description: "SUSY QM analysis"
  },
  {
    id: "verification",
    title: "Results Verification",
    icon: CheckCircle,
    description: "Validation metrics"
  },
  {
    id: "visualization",
    title: "Interactive Visualization",
    icon: Eye,
    description: "Zero detection plots"
  },
  {
    id: "workbench",
    title: "Mathematical Workbench",
    icon: Function,
    description: "Interactive calculations"
  },
  {
    id: "about",
    title: "User Guide & Help",
    icon: Info,
    description: "Documentation & resources"
  }
];

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  return (
    <Card className="p-4 w-full">
      <h2 className="text-lg font-semibold mb-3 text-primary">Navigation</h2>
      <nav className="space-y-1.5">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <Button
              key={section.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start text-left h-auto p-2.5 hover-lift transition-all duration-200 navigation-button ${
                isActive ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-secondary/50"
              }`}
              onClick={() => onSectionChange(section.id)}
            >
              <div className="flex items-start gap-2.5 w-full">
                <Icon size={18} className="flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm leading-tight">{section.title}</div>
                  <div className={`text-xs leading-tight mt-0.5 description ${
                    isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}>
                    {section.description}
                  </div>
                </div>
                {isActive && <ChevronRight size={14} className="flex-shrink-0 mt-1" />}
              </div>
            </Button>
          );
        })}
      </nav>
    </Card>
  );
}