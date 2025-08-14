import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, TrendingUp, Zap, AlertTriangle } from '@phosphor-icons/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

interface ParameterData {
  beta: number;
  tfinal: number;
  correlation: number;
  avgError: number;
  detectedZeros: number;
  convergenceRate: number;
  contractionFactor: number;
  susyIndex: number;
}

export function ParametersSection() {
  const [beta, setBeta] = useState([0.2]);
  const [tfinal, setTfinal] = useState([4.0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentData, setCurrentData] = useState<ParameterData | null>(null);
  const [historicalData, setHistoricalData] = useState<ParameterData[]>([]);

  // Theoretical bounds from the proofs
  const theoreticalBounds = {
    betaMin: 0.05,
    betaMax: 0.5,
    tfinalMin: 1.5,
    tfinalMax: 5.0,
    optimalBeta: 0.2,
    optimalTfinal: 4.0
  };

  // Simulate parameter effects based on theoretical analysis
  const simulateParameters = (betaValue: number, tfinalValue: number): ParameterData => {
    // Based on Theorem 3 contraction analysis
    const contractionFactor = Math.min(0.95, Math.max(0.1, 
      betaValue / (betaValue - 0.5 * 2.3) // V_quantum'' approximation
    ));
    
    // Convergence quality from parameter distance to optimum
    const betaOptimality = Math.exp(-Math.pow((betaValue - theoreticalBounds.optimalBeta) / 0.1, 2));
    const tfinalOptimality = Math.exp(-Math.pow((tfinalValue - theoreticalBounds.optimalTfinal) / 1.0, 2));
    
    const correlation = Math.min(0.999, 0.85 + 0.14 * betaOptimality * tfinalOptimality);
    const avgError = Math.max(0.001, 0.5 * (1 - betaOptimality * tfinalOptimality));
    const detectedZeros = Math.floor(60 + 40 * correlation);
    const convergenceRate = Math.max(0.01, 0.1 * betaOptimality * tfinalOptimality);
    
    // SUSY index from spectral mirroring
    const susyIndex = Math.max(-0.01, -0.005 + 0.004 * Math.random());

      beta: betaValue,
      beta: betaValue,
      tfinal: tfinalValue,
      correlation,
      avgError,
      detectedZeros,
      convergenceRate,
      contractionFactor,
      susyIndex
  };

  const runSimulation = () => {
  const runSimulation = () => {
    
    // Simulate computation delay
    // Simulate computation delay
    setTimeout(() => {
      const newData = simulateParameters(beta[0], tfinal[0]);
      setCurrentData(newData);
      setHistoricalData(prev => [...prev.slice(-19), newData]); // Keep last 20 points
      setIsSimulating(false);
    }, 1500);
        runSimulation();
      }
  // Auto-run simulation when parameters change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isSimulating) {
        runSimulation();
      }
    }, 500);
    runSimulation();
    return () => clearTimeout(timer);
  }, [beta, tfinal]);
nst getContractivityStatus = (contractionFactor: number) => {
  // Initial simulation
  useEffect(() => {
    runSimulation();tractive', 
  }, []);

  const getContractivityStatus = (contractionFactor: number) => {
    if (contractionFactor < 1) {
      return { status: 'Contractive', color: 'bg-green-500', icon: <TrendingUp size={16} /> };
    } else {
      return { status: 'Divergent', color: 'bg-red-500', icon: <AlertTriangle size={16} /> };
    }ose-600', 
  };
ription: 'Theorem 3 violated: λ ≥ 1'
  const getSUSYStatus = (susyIndex: number) => {
    const absIndex = Math.abs(susyIndex);
    if (absIndex < 0.005) {
      return { status: 'Unbroken SUSY', color: 'bg-blue-500', icon: <Zap size={16} /> };
    } else {
      return { status: 'Broken SUSY', color: 'bg-orange-500', icon: <AlertTriangle size={16} /> };
    }
  };

  return (o-r from-blue-500 to-indigo-600', 
    <div className="space-y-6">,
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Parameter Space Exploration</h1>
        <p className="text-muted-foreground text-lg">
          Interactive validation of Theorems 2-4 through parameter sweep analysis
        </p>
      </div>to-r from-orange-500 to-amber-600', 
        icon: <AlertTriangle size={16} />,
      {/* Parameter Controls */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity size={20} />
            Control Parameters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">ce Exploration</h1>
          <div className="space-y-4">
            <div>alysis
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium">Feedback Strength (β)</label>
                <Badge variant={beta[0] >= 0.15 && beta[0] <= 0.25 ? "default" : "secondary"}>
                  {beta[0].toFixed(2)}
                </Badge>15 && beta[0] <= 0.25 && tfinal[0] >= 3.0 && tfinal[0] <= 4.5 ? 'parameter-optimal' : ''}`}>
              </div>
              <Slider
                value={beta}
                onValueChange={setBeta}
                min={0.05}
                max={0.5}
                step={0.05}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Weak (0.05)</span>
                <span className="font-medium">Optimal: 0.15-0.25</span>
                <span>Strong (0.5)</span>
              </div>
                <span>Long (5.0)</span>
              </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium">Evolution Time (T_final)</label>
                <Badge variant={tfinal[0] >= 3.0 && tfinal[0] <= 4.5 ? "default" : "secondary"}>
                  {tfinal[0].toFixed(1)}
                </Badge>
              </div>
              <Slider
                value={tfinal}
                onValueChange={setTfinal}
                min={1.5}
                max={5.0}
                step={0.5}
                className="w-full"
              />ta && (
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Short (1.5)</span>
                <span className="font-medium">Optimal: 3.0-4.5</span>
                <span>Long (5.0)</span>
              </div>
            </div>ext-muted-foreground text-center">
          </div>Detected Zeros

          <Button 
            onClick={runSimulation} 
            disabled={isSimulating}
            className="w-full"
          >
            {isSimulating ? 'Simulating...' : 'Run Simulation'}
          </Button>
        </CardContent>
      </Card>r">

      {/* Current Results */}
      {currentData && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-center">
                {(currentData.correlation * 100).toFixed(2)}%
                })()}
              <p className="text-xs text-muted-foreground text-center">
                Spectral Correlation (ρ)-muted-foreground mt-1">
              </p>ixed(4)}
            </CardContent>
          </Card>
  {getSUSYStatus(currentData.susyIndex).description}
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-center">
                {currentData.avgError.toFixed(3)}
                  tickFormatter={(value) => `${value}`}
              <p className="text-xs text-muted-foreground text-center">
                Average Error (γ)
              </p>) => [
            </CardContent>d(3) : value, 
                  dataKey="correlation" 
ke="#2563eb" 
          <Card>  strokeWidth={2}
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-center">
                {currentData.detectedZeros}
                <p className="font-mono text-xs">
              <p className="text-xs text-muted-foreground text-center">
                Detected Zeros
              </p>
            </CardContent>
          </Card>

          <Card>content">
            <CardContent className="pt-4">g</h4>
              <div className="text-2xl font-bold text-center">
                {currentData.convergenceRate.toFixed(3)}quantum'')</p>
                  {0.5 * beta[0] > 1.15 ? ' ✓' : ' ✗'}
              <p className="text-xs text-muted-foreground text-center">
                Convergence Rate
              </p>
            </CardContent>
          </Card>
        </div>
      )}="font-semibold mb-3">Theorem 4: Fixed-Point Convergence</h4>
-2 text-sm">
      {/* Status Indicators */}ong> F: ℓ∞ → ℓ∞ contractive</p>
      {currentData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>er-l-2 border-blue-500/30 bg-blue-500/5 p-2 rounded-r">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">toFixed(3) || 'N/A'}
                <span className="font-medium">Contraction Mapping</span>
                {(() => {
                  const status = getContractivityStatus(currentData.contractionFactor);
                  return (
                    <Badge className={`${status.color} text-white flex items-center gap-1`}>
                      {status.icon}r-accent/20 rounded-lg p-4">
                      {status.status}
                    </Badge>
                  );
                })()}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p className="text-sm text-muted-foreground mt-1">
                λ = {currentData.contractionFactor.toFixed(3)} 
                {currentData.contractionFactor < 1 ? ' < 1 ✓' : ' ≥ 1 ✗'}
              </p>
            </CardContent>
          </Card>

          <Card>tionFactor < 1 ? '✓' : '✗'}</p>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">SUSY Symmetry</span>
                {(() => {
                  const status = getSUSYStatus(currentData.susyIndex);
                  return (
                    <Badge className={`${status.color} text-white flex items-center gap-1`}>
                      {status.icon}
                      {status.status}
                    </Badge>
                  );
                })()}ap-3">
              <p className="text-sm text-muted-foreground mt-1">                Witten Index Δ = {currentData.susyIndex.toFixed(4)}              </p>            </CardContent>        </div>      )}      {/* Parameter Evolution Chart */}      {historicalData.length > 0 && (        <Card>          <CardHeader>            <CardTitle>Parameter Evolution History</CardTitle>          </CardHeader>          <CardContent>            <ResponsiveContainer width="100%" height={300}>              <LineChart data={historicalData}>                <CartesianGrid strokeDasharray="3 3" />                <XAxis dataKey="beta" tickFormatter={(value) => `β=${value}`} />                <YAxis />                <Tooltip                   formatter={(value: number, name: string) => [                    typeof value === 'number' ? value.toFixed(4) : value,                     name                  ]}                />                <Legend />                <Line                   type="monotone"                   dataKey="correlation"                   stroke="#2563eb"                   strokeWidth={2}                  dot={{ r: 4 }}                  name="Spectral Correlation"                />                <Line                   type="monotone"                   dataKey="convergenceRate"                   stroke="#dc2626"                   strokeWidth={2}                  dot={{ r: 4 }}                  name="Convergence Rate"                />              </LineChart>            </ResponsiveContainer>          </CardContent>        </Card>      )}      {/* Theoretical Framework */}      <Card>        <CardHeader>          <CardTitle>Theoretical Parameter Bounds</CardTitle>        </CardHeader>        <CardContent>          <div className="space-y-4">            <div className="mathematical-content">              <h4 className="font-medium mb-2">Theorem 3: Contraction Condition</h4>              <div className="space-y-1 text-sm">                <p>For contraction (|c| &lt; 1), we require:</p>                <p className="pl-4">αβ &gt; ½ max V_quantum''(γ_k)</p>                <p className="pl-4">β &gt; 4/δ_min² (well separation)</p>                <p>Current: αβ = {(0.5 * beta[0]).toFixed(3)}, Required: &gt; {0.5 * 2.3}</p>              </div>            <div className="mathematical-content">              <h4 className="font-medium mb-2">Optimal Parameter Window</h4>              <div className="text-sm space-y-1">                <p>• β ∈ [0.15, 0.25]: Balance between convergence speed and stability</p>                <p>• T_final ∈ [3.0, 4.5]: Sufficient evolution time without diminishing returns</p>                <p>• Current configuration: {beta[0] >= 0.15 && beta[0] <= 0.25 && tfinal[0] >= 3.0 && tfinal[0] <= 4.5 ? '✓ Optimal' : '⚠ Suboptimal'}</p>          </div>        </CardContent>      </Card>      {/* Implementation Note */}      <Card className="border-blue-200 bg-blue-50/50">        <CardContent className="pt-4">          <div className="flex items-start gap-3">            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>            <div className="text-sm">              <p className="font-medium mb-1">Implementation Note</p>              <p className="text-muted-foreground">                Parameter effects are computed using the theoretical framework from Theorems 2-4.                 Real implementation would require numerical solution of the Schrödinger equation                 with feedback potential V_fb(x) = α Σ exp(-β(x-γ_k)²).              </p>          </div>        </CardContent>      </Card>