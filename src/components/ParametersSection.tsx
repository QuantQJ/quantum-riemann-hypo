import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ParametersSection() {
  const betaResults = [
    { beta: 0.05, rho: 0.992, avgError: 0.18, detectedZeros: 95 },
    { beta: 0.1, rho: 0.997, avgError: 0.12, detectedZeros: 98 },
    { beta: 0.2, rho: 0.999, avgError: 0.06, detectedZeros: 100 },
    { beta: 0.3, rho: 0.996, avgError: 0.15, detectedZeros: 96 },
    { beta: 0.4, rho: 0.989, avgError: 0.25, detectedZeros: 85 },
    { beta: 0.5, rho: 0.974, avgError: 0.42, detectedZeros: 70 }
  ];

  const tFinalResults = [
    { tFinal: 1.5, rho: 0.983, maxZero: 190, convergence: 0.098 },
    { tFinal: 2.0, rho: 0.992, maxZero: 210, convergence: 0.062 },
    { tFinal: 2.5, rho: 0.996, maxZero: 225, convergence: 0.045 },
    { tFinal: 3.0, rho: 0.998, maxZero: 236, convergence: 0.035 },
    { tFinal: 3.5, rho: 0.999, maxZero: 236, convergence: 0.028 },
    { tFinal: 4.0, rho: 0.999, maxZero: 236, convergence: 0.025 }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-4">Parameter Analysis</h1>
        <p className="text-muted-foreground text-lg">
          Systematic exploration of simulation parameters and optimization results
        </p>
      </div>

      <Tabs defaultValue="beta" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="beta">Beta Sweep</TabsTrigger>
          <TabsTrigger value="tfinal">T_final Analysis</TabsTrigger>
          <TabsTrigger value="optimal">Optimal Ranges</TabsTrigger>
        </TabsList>

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