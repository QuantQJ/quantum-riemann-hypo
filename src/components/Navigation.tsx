import { ChevronRight, Calculator, BarChart, CheckCircle, BookOpen, Eye, Function, FlaskConical, Info, Share, FileText } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sectionGroups = {
  theory: {
    title: "Theory",
    badge: "Math",
    sections: [
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
        description: "Mathematical foundations"
      },
      {
        id: "susy",
        title: "SUSY Integration",
        icon: FlaskConical,
        description: "Supersymmetric analysis"
      }
    ]
  },
  analysis: {
    title: "Analysis",
    badge: "Data",
    sections: [
      {
        id: "parameters",
        title: "Parameter Analysis",
        icon: BarChart, 
        description: "Optimization & bounds"
      },
      {
        id: "verification",
        title: "Results Verification",
        icon: CheckCircle,
        description: "Statistical validation"
      },
      {
        id: "visualization",
        title: "Interactive Plots",
        icon: Eye,
        description: "Zero detection graphs"
      }
    ]
  },
  tools: {
    title: "Tools",
    badge: "Interactive",
    sections: [
      {
        id: "workbench",
        title: "Mathematical Tools",
        icon: Function,
        description: "Calculator & utilities"
      },
      {
        id: "references",
        title: "References",
        icon: FileText,
        description: "Bibliography & citations"
      },
      {
        id: "share",
        title: "Share & Export",
        icon: Share,
        description: "Collaboration tools"
      },
      {
        id: "about",
        title: "Guide & About",
        icon: Info,
        description: "Help & documentation"
      }
    ]
  }
};

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const currentGroup = Object.entries(sectionGroups).find(([_, group]) => 
    group.sections.some(section => section.id === activeSection)
  )?.[0] || 'theory';

  const renderSectionGroup = (sections: any[]) => (
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
  );

  return (
    <Card className="p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-primary">Navigation</h2>
        <Badge variant="outline" className="text-xs">
          {sectionGroups[currentGroup as keyof typeof sectionGroups]?.badge}
        </Badge>
      </div>
      
      <Tabs value={currentGroup} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="theory" className="text-xs">Theory</TabsTrigger>
          <TabsTrigger value="analysis" className="text-xs">Analysis</TabsTrigger>
          <TabsTrigger value="tools" className="text-xs">Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="theory" className="mt-0">
          {renderSectionGroup(sectionGroups.theory.sections)}
        </TabsContent>

        <TabsContent value="analysis" className="mt-0">
          {renderSectionGroup(sectionGroups.analysis.sections)}
        </TabsContent>

        <TabsContent value="tools" className="mt-0">
          {renderSectionGroup(sectionGroups.tools.sections)}
        </TabsContent>
      </Tabs>
    </Card>
  );
}