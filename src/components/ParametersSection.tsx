import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "@phosphor-icons/react";
import { useKV } from "@github/spark/hooks";
import { ParameterMath } from "@/components/ParameterMath";

export function ParametersSection() {
  const [beta, setBeta] = useKV("simulation-beta", 0.2);
  const [tFinal, setTFinal] = useKV("simulation-tfinal", 4.0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResults, setSimulationResults] = useKV("simulation-results", null);

  const betaResults = [
    { beta: 0.05, rho: 0.992, avgError: 0.18, detectedZeros: 95 },
    { beta: 0.1, rho: 0.997, avgError: 0.12, detectedZeros: 98 },
    { beta: 0.2, rho: 0.999, avgError: 0.06, detectedZeros: 100 },
    { beta: 0.4, rho: 0.989, avgError: 0.25, detectedZeros: 85 },
    { beta: 0.5, rho: 0.974, avgError: 0.42, detectedZeros: 70 }
  ];

  const tFinalResults = [
  const tFinalResults = [
    { tFinal: 1.5, rho: 0.983, maxZero: 190, convergence: 0.098 },
    { tFinal: 2.0, rho: 0.992, maxZero: 210, convergence: 0.062 },
    { tFinal: 2.5, rho: 0.996, maxZero: 225, convergence: 0.045 },
    { tFinal: 3.0, rho: 0.998, maxZero: 236, convergence: 0.035 },
    { tFinal: 3.5, rho: 0.999, maxZero: 236, convergence: 0.028 },
    { tFinal: 4.0, rho: 0.999, maxZero: 236, convergence: 0.025 }
  ];
  // Interpolate simulation results based on current parameter values
  const calculateSimulationMetrics = (beta: number, tFinal: number) => {
    // Beta interpolation (beta: number, tFinal: number) => {
    const betaClosest = betaResults.reduce((prev, curr) =>
      Math.abs(curr.beta - beta) < Math.abs(prev.beta - beta) ? curr : prev
      Math.abs(curr.beta - beta) < Math.abs(prev.beta - beta) ? curr : prev
    );
    
    // T_final interpolation
    const tFinalClosest = tFinalResults.reduce((prev, curr) =>
      Math.abs(curr.tFinal - tFinal) < Math.abs(prev.tFinal - tFinal) ? curr : prev
    );

    // Weighted combination based on parameter distances
    const betaWeight = Math.max(0, 1 - Math.abs(beta - 0.2) * 5);
    const tFinalWeight = Math.max(0, 1 - Math.abs(tFinal - 4.0) * 0.5);
    
    const baseRho = betaClosest.rho * 0.6 + tFinalClosest.rho * 0.4;
    const baseError = betaClosest.avgError * 0.7 + (0.1 - tFinalClosest.convergence * 0.5) * 0.3;
    const baseZeros = Math.round(betaClosest.detectedZeros * betaWeight + tFinalClosest.maxZero * 0.001 * tFinalWeight);

    return {
      rho: Math.max(0.85, Math.min(0.9999, baseRho)),
      avgError: Math.max(0.01, Math.min(0.5, baseError)),
      detectedZeros: Math.max(60, Math.min(100, baseZeros)),
      convergenceTime: Math.max(0.01, tFinal * 0.25 / Math.max(0.1, beta)),
      computationalCost: Math.round(tFinal * 100 / beta)
    };
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    
    // Simulate calculation time
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
    
    const results = calculateSimulationMetrics(beta, tFinal);
    setSimulationResults(results);
    setIsSimulating(false);
  };

  const resetParameters = () => {
    setBeta(0.2);
    setTFinal(4.0);
    setSimulationResults(null);
  };

  const currentMetrics = simulationResults || calculateSimulationMetrics(beta, tFinal);
  return (
    <div className="space-y-8">
      <div>assName="space-y-8">
      </div>

      <Tabs defaultValue="interactive" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="interactive">Interactive Simulation</TabsTrigger>
          <TabsTrigger value="beta">Beta Sweep</TabsTrigger>
      <Tabs defaultValue="interactive" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="interactive">Interactive Simulation</TabsTrigger>

        <TabsContent value="interactive" className="space-y-6">
          <Card className="p-6">
        </TabsList>emibold mb-4">Interactive Parameter Testing</h2>
sName="text-muted-foreground mb-6">
        <TabsContent value="interactive" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Interactive Parameter Testing</h2>
            <p className="text-muted-foreground mb-6">
              Adjust beta and T_final parameters to see their real-time effects on simulation performance
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium">Beta (β) - Coupling Strength</label>
                    <Badge variant="outline" className="font-mono">{beta.toFixed(2)}</Badge>
                  </div>
                  <Slider
                    value={[beta]}
                    onValueChange={(value) => setBeta(value[0])}
                    min={0.05}
                    max={0.5}
                    step={0.01}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0.05 (Weak)</span>
                    <span>0.5 (Strong)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium">T_final - Evolution Time</label>
                    <Badge variant="outline" className="font-mono">{tFinal.toFixed(1)}</Badge>
                  </div>
                  <Slider
                    value={[tFinal]}
                    onValueChange={(value) => setTFinal(value[0])}
                    min={1.0}
                    max={6.0}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1.0 (Fast)</span>
                    <span>6.0 (Thorough)</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={runSimulation} 
                    disabled={isSimulating}
                    className="flex-1"
                  >
                    {isSimulating ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-background border-t-transparent rounded-full mr-2" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Run Simulation
                      </>
                    )}
                  </Button>
                  
                  <Button variant="outline" onClick={resetParameters}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>

              {/* Results Display */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Predicted Results</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 bg-primary/5">
                    <div className="text-sm text-muted-foreground">Spectral Correlation</div>
                    <div className="text-2xl font-bold text-primary font-mono">
                      ρ = {currentMetrics.rho.toFixed(4)}
                    </div>
                  </Card>
                  
                  <Card className="p-4 bg-accent/5">
                    <div className="text-sm text-muted-foreground">Average Error</div>
                    <div className="text-2xl font-bold text-accent font-mono">
                      {currentMetrics.avgError.toFixed(2)}%
                    </div>
                  </Card>
                  
                  <Card className="p-4 bg-secondary">
                    <div className="text-sm text-muted-foreground">Detected Zeros</div>
                    <div className="text-2xl font-bold font-mono">
                      {currentMetrics.detectedZeros}/100
                    </div>
                  </Card>
                  
                  <Card className="p-4 bg-muted">
                    <div className="text-sm text-muted-foreground">Convergence Time</div>
                    <div className="text-2xl font-bold font-mono">
                      {currentMetrics.convergenceTime.toFixed(1)}s
                    </div>
                  </Card>
                </div>

                {/* Performance Assessment */}
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Performance Assessment</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Accuracy:</span>
                      <Badge className={
                        currentMetrics.rho > 0.995 ? "bg-green-500" :
                        currentMetrics.rho > 0.99 ? "bg-yellow-500" : "bg-red-500"
                      }>
                        {currentMetrics.rho > 0.995 ? "Excellent" :
                         currentMetrics.rho > 0.99 ? "Good" : "Poor"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Computational Cost:</span>
                      <Badge variant="outline" className="font-mono">
                        {currentMetrics.computationalCost} units
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Efficiency:</span>
                      <Badge className={
                        beta >= 0.15 && beta <= 0.25 && tFinal >= 3.5 && tFinal <= 4.5 ?
                        "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"
                      }>
                        {beta >= 0.15 && beta <= 0.25 && tFinal >= 3.5 && tFinal <= 4.5 ?
                         "Optimal" : "Suboptimal"}
                      </Badge>
                    </div>
                  </div>
                </Card>

                {/* Mathematical Analysis */}
                <ParameterMath 
                  beta={beta} 
                  tFinal={tFinal} 
                  results={currentMetrics} 
                />

                {/* Recommendations */}
                <div className="p-3 bg-primary/10 rounded-lg text-sm">
                  <div className="font-medium text-primary mb-1">Recommendations:</div>
                  {beta < 0.15 && <div>• Increase β for better spectral resolution</div>}
                  {beta > 0.25 && <div>• Decrease β to improve accuracy</div>}
                  {tFinal < 3.0 && <div>• Increase T_final for better convergence</div>}
                  {tFinal > 5.0 && <div>• Reduce T_final to save computation time</div>}
                  {beta >= 0.15 && beta <= 0.25 && tFinal >= 3.5 && tFinal <= 4.5 && 
                   <div>• Parameters are in optimal range!</div>}
                </div>

                {/* Parameter Visualization */}
                <Card className="p-4">
                  <h4 className="font-medium mb-3">Parameter Space Visualization</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Beta Effect on Accuracy</span>
                        <span>{beta.toFixed(2)}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            beta >= 0.15 && beta <= 0.25 ? 'bg-accent' : 'bg-primary/60'
                          }`}
                          style={{ 
                            width: `${Math.min(100, currentMetrics.rho * 100)}%`,
                            marginLeft: `${Math.max(0, (beta - 0.05) / 0.45 * 20)}%`
                          }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>T_final Convergence</span>
                        <span>{tFinal.toFixed(1)}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            tFinal >= 3.5 && tFinal <= 4.5 ? 'bg-accent' : 'bg-primary/60'
                          }`}
                          style={{ 
                            width: `${Math.min(100, (6 - currentMetrics.convergenceTime) / 6 * 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Historical Parameter Comparison */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Current vs Optimal Parameters</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-sm text-muted-foreground mb-1">Current Settings</div>
                  <div className="font-mono text-lg">
                    β = {beta.toFixed(2)}, T = {tFinal.toFixed(1)}
                  </div>
                  <div className="text-sm mt-1">
                    ρ = {currentMetrics.rho.toFixed(4)}
                  </div>
                </Card>
                
                <Card className="p-4 text-center bg-accent/10 border-accent/30">
                  <div className="text-sm text-muted-foreground mb-1">Optimal Settings</div>
                  <div className="font-mono text-lg text-accent">
                    β = 0.20, T = 4.0
                  </div>
                  <div className="text-sm mt-1 text-accent">
                    ρ = 0.9990
                  </div>
                </Card>
                
                <Card className="p-4 text-center">
                  <div className="text-sm text-muted-foreground mb-1">Performance Gap</div>
                  <div className="font-mono text-lg">
                    Δρ = {Math.abs(currentMetrics.rho - 0.999).toFixed(4)}
                  </div>
                  <div className="text-sm mt-1">
                    {currentMetrics.rho >= 0.999 ? "✓ Optimal" : "⚠ Suboptimal"}
                  </div>
                </Card>
              </div>
            </div>

            {/* Parameter Space Heatmap */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Parameter Effectiveness Heatmap</h3>
              <Card className="p-4">
                <div className="text-sm text-muted-foreground mb-3">
                  Performance landscape: darker regions indicate better spectral correlation
                </div>
                
                <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden">
                  {/* Grid for parameter space visualization */}
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(12, 1fr)', 
                      gridTemplateRows: 'repeat(8, 1fr)' 
                    }}
                  >
                    {Array.from({ length: 96 }, (_, i) => {
                      const col = i % 12;
                      const row = Math.floor(i / 12);
                      const testBeta = 0.05 + (col / 11) * 0.45; // 0.05 to 0.5
                      const testTFinal = 1.0 + (row / 7) * 5.0; // 1.0 to 6.0
                      const testMetrics = calculateSimulationMetrics(testBeta, testTFinal);
                      const intensity = Math.max(0, (testMetrics.rho - 0.95) / 0.05); // Normalize 0.95-1.0 to 0-1
                      
                      // Highlight current position
                      const isCurrentPosition = Math.abs(testBeta - beta) < 0.04 && Math.abs(testTFinal - tFinal) < 0.6;
                      
                      return (
                        <div
                          key={i}
                          className={`transition-all duration-300 ${isCurrentPosition ? 'ring-2 ring-primary z-10' : ''}`}
                          style={{
                            backgroundColor: isCurrentPosition 
                              ? `oklch(0.7 0.15 60)` // Accent color for current position
                              : `oklch(${0.3 + intensity * 0.4} ${0.05 + intensity * 0.1} 240)`,
                            opacity: 0.8
                          }}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Axes labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground p-1">
                    <span>β = 0.05</span>
                    <span>β = 0.50</span>
                  </div>
                  <div className="absolute top-0 left-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground p-1">
                    <span>T = 6.0</span>
                    <span>T = 1.0</span>
                  </div>
                  
                  {/* Optimal region overlay */}
                  <div 
                    className="absolute border-2 border-accent border-dashed opacity-60"
                    style={{
                      left: `${(0.15 - 0.05) / 0.45 * 100}%`,
                      top: `${(6.0 - 4.5) / 5.0 * 100}%`,
                      width: `${(0.25 - 0.15) / 0.45 * 100}%`,
                      height: `${(4.5 - 3.5) / 5.0 * 100}%`
                    }}
                  />
                </div>
                
                <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded border-2 border-accent border-dashed"></div>
                    <span>Optimal Region</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-accent"></div>
                    <span>Current Position</span>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="beta" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Beta Parameter Sweep Results</h2>
            <p className="text-muted-foreground mb-6">
              Analysis of coupling strength β with T_final = 4.0 and 100 target zeros
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Beta (β)</th>
                    <th className="text-left p-3 font-medium">Correlation (ρ)</th>
                    <th className="text-left p-3 font-medium">Avg Error (%)</th>
                    <th className="text-left p-3 font-medium">Detected Zeros</th>
                    <th className="text-left p-3 font-medium">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {betaResults.map((result) => (
                    <tr key={result.beta} className="border-b">
                      <td className="p-3 font-mono">{result.beta}</td>
                      <td className="p-3 font-mono">{result.rho}</td>
                      <td className="p-3 font-mono">{result.avgError}</td>
                      <td className="p-3 font-mono">{result.detectedZeros}</td>
                      <td className="p-3">
                        {result.beta === 0.2 ? (
                          <Badge className="bg-accent text-accent-foreground">Optimal</Badge>
                        ) : result.rho > 0.995 ? (
                          <Badge variant="outline">Good</Badge>
                        ) : (
                          <Badge variant="secondary">Fair</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-accent/10 rounded-lg">
              <h3 className="font-semibold text-accent mb-2">Key Insights</h3>
              <ul className="text-sm space-y-1">
                <li>• Optimal range: β ∈ [0.15, 0.25] for best spectral resolution</li>
                <li>• Lower β: Better high-zero resolution but slower convergence</li>
                <li>• Higher β: Faster convergence but reduced spectral accuracy</li>
              </ul>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tfinal" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">T_final Evolution Analysis</h2>
            <p className="text-muted-foreground mb-6">
              Impact of simulation time on convergence with β = 0.2 and 100 target zeros
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">T_final</th>
                    <th className="text-left p-3 font-medium">Correlation (ρ)</th>
                    <th className="text-left p-3 font-medium">Max Zero</th>
                    <th className="text-left p-3 font-medium">Convergence</th>
                    <th className="text-left p-3 font-medium">Efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  {tFinalResults.map((result) => (
                    <tr key={result.tFinal} className="border-b">
                      <td className="p-3 font-mono">{result.tFinal}</td>
                      <td className="p-3 font-mono">{result.rho}</td>
                      <td className="p-3 font-mono">{result.maxZero}</td>
                      <td className="p-3 font-mono">{result.convergence}</td>
                      <td className="p-3">
                        {result.tFinal === 4.0 ? (
                          <Badge className="bg-accent text-accent-foreground">Optimal</Badge>
                        ) : result.tFinal < 3.0 ? (
                          <Badge variant="secondary">Underconverged</Badge>
                        ) : (
                          <Badge variant="outline">Diminishing Returns</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">Convergence Behavior</h3>
              <div className="mathematical-content">
                Asymptotic scaling: ρ(T) ≈ ρ_max - A·exp(-T/τ)
                <br />
                where τ ≈ 1.2 (characteristic convergence time)
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="optimal" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Optimal Parameter Ranges</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-4 bg-accent/5">
                <h3 className="font-semibold text-accent mb-3">Recommended Settings</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Beta (β):</span>
                    <span className="font-mono">0.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">T_final:</span>
                    <span className="font-mono">4.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Target Zeros:</span>
                    <span className="font-mono">100</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-primary/5">
                <h3 className="font-semibold text-primary mb-3">Expected Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Correlation (ρ):</span>
                    <span className="font-mono">0.999</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Error:</span>
                    <span className="font-mono">0.06%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Detection Rate:</span>
                    <span className="font-mono">100%</span>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-4">Scaling Relationships</h3>
              <div className="mathematical-content">
                Computational complexity: O(N²·T_final/Δt)
                <br />
                Memory requirements: O(N·N_zeros)
                <br />
                Convergence time: τ_conv ∝ 1/β (for β &lt; β_critical)
                <br /><br />
                Trade-off relation: Accuracy × Speed ≈ constant
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}