import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ParameterMathProps {
  beta: number;
  tFinal: number;
  results: {
    rho: number;
    avgError: number;
    detectedZeros: number;
    convergenceTime: number;
    computationalCost: number;
  };
}

export function ParameterMath({ beta, tFinal, results }: ParameterMathProps) {
  return (
    <Card className="p-4">
      <h4 className="font-medium mb-3">Mathematical Relationships</h4>
      
      <div className="space-y-4 text-sm">
        <div>
          <div className="font-medium text-primary mb-1">Spectral Correlation Function:</div>
          <div className="mathematical-content text-xs">
            ρ(β,T) ≈ ρ_max · [1 - exp(-T/τ)] · g(β)
            <br />
            where g(β) = exp(-|β - β_opt|²/σ²)
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-muted-foreground">Current ρ:</span>
            <Badge variant="outline" className="font-mono">
              {results.rho.toFixed(4)}
            </Badge>
          </div>
        </div>
        
        <div>
          <div className="font-medium text-accent mb-1">Convergence Time:</div>
          <div className="mathematical-content text-xs">
            τ_conv ≈ T_final · α(β) where α(β) = 0.25/max(0.1, β)
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-muted-foreground">Predicted time:</span>
            <Badge variant="outline" className="font-mono">
              {results.convergenceTime.toFixed(1)}s
            </Badge>
          </div>
        </div>
        
        <div>
          <div className="font-medium text-secondary-foreground mb-1">Detection Efficiency:</div>
          <div className="mathematical-content text-xs">
            η = min(100, 70 + 30·exp(-2(β-0.2)²)·[1-exp(-T/4)])
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-muted-foreground">Zeros detected:</span>
            <Badge variant="outline" className="font-mono">
              {results.detectedZeros}/100
            </Badge>
          </div>
        </div>
        
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="font-medium mb-2">Parameter Sensitivity Analysis:</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">∂ρ/∂β ≈</span>
              <span className="font-mono ml-1">
                {(beta > 0.2 ? -2 * (beta - 0.2) : 2 * (0.2 - beta)).toFixed(3)}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">∂ρ/∂T ≈</span>
              <span className="font-mono ml-1">
                {(Math.exp(-tFinal/1.2) * 0.83).toFixed(3)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}