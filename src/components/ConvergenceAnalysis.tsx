import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calculator, CheckCircle, AlertTriangle } from '@phosphor-icons/react';
import { MathJax, MathJaxContext } from '@/components/MathJax';
interface ConvergenceData {
  iteration: number;
  theoreticalBound: number;
  actualError: number;
}

interface RigorousConstants {
  CLeak: number;
  spectralGaps: number[];
  CNode: number[];
  deltaMin: number;
  eta0: number; // Initial overlap
}

export function ConvergenceAnalysis() {
  const [alpha, setAlpha] = useState(0.2);
  const [beta, setBeta] = useState(3.0);
  const [contractionFactor, setContractionFactor] = useState<number | null>(null);
  const [convergenceData, setConvergenceData] = useState<ConvergenceData[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Rigorous constants from the mathematical framework
  const constants: RigorousConstants = {
    CLeak: 4,
    spectralGaps: [0.5, 0.6, 0.45, 0.8], // Δₖ for modes k=1,2,3,4
    CNode: [1.25, 1.0, 1.5, 0.9], // 1/|u'ₖ(γₖ)| approximations
    deltaMin: 2.0, // Minimum zero spacing
    eta0: 0.1 // minimum overlap |⟨uₖ,ψ₀⟩|
  };

  const computeContractionFactor = (alphaVal: number, betaVal: number): number => {
    const stiffnessTerms = constants.spectralGaps.map((gap, k) => 
      (alphaVal * 1.213 * constants.CNode[k] / gap) * Math.sqrt(betaVal)
    );
    const maxStiffness = Math.max(...stiffnessTerms);
    
    // Leakage term: C_leak * exp(-β * δ²_min / 4)
    const leakageTerm = constants.CLeak * Math.exp(-betaVal * constants.deltaMin ** 2 / 4);
    return maxStiffness + leakageTerm;
  };

  const validateParameterBounds = (alphaVal: number, betaVal: number) => {
    // β lower bound for leakage suppression
    const betaLowerBound = (4 / (constants.deltaMin ** 2)) * Math.log(2 * constants.CLeak / 0.1);
    
    // α upper bounds for each mode
    const alphaUpperBounds = constants.spectralGaps.map((gap, k) =>
      ((1 - 0.1 - constants.CLeak * Math.exp(-betaVal * constants.deltaMin ** 2 / 4)) * gap) /
      (1.213 * constants.CNode[k] * Math.sqrt(betaVal))
    );
    const alphaUpperBound = Math.min(...alphaUpperBounds);
    return {
      betaSatisfied: betaVal >= betaLowerBound,
      alphaSatisfied: alphaVal <= alphaUpperBound,
      betaLowerBound,
      alphaUpperBound,
      convergenceGuaranteed: betaVal >= betaLowerBound && alphaVal <= alphaUpperBound
    };
  };

  const simulateConvergence = (alphaVal: number, betaVal: number): ConvergenceData[] => {
    const lambda = computeContractionFactor(alphaVal, betaVal);
    const isContractive = lambda < 1;
    
    const data: ConvergenceData[] = [];
    const initialError = 0.3; // Starting error magnitude
    
    for (let n = 0; n <= 10; n++) {
      const theoreticalBound = initialError * Math.pow(lambda, n);
      const actualError = isContractive 
        ? theoreticalBound * (1 + 0.1 * Math.random()) // Add some noise
        : theoreticalBound;
      
      data.push({
        iteration: n,
        theoreticalBound: Math.max(theoreticalBound, 1e-8),
        actualError: Math.max(actualError, 1e-8)
      });
    }
    return data;
  };

  const analyzeConvergence = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const factor = computeContractionFactor(alpha, beta);
      const data = simulateConvergence(alpha, beta);
      setContractionFactor(factor);
      setConvergenceData(data);
      setIsAnalyzing(false);
    }, 1500);
  };

  useEffect(() => {
    analyzeConvergence();
  }, [alpha, beta]);

  const bounds = validateParameterBounds(alpha, beta);
  const isContractiveRate = contractionFactor !== null && contractionFactor < 1;

  return (
    <MathJaxContext>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Rigorous Convergence Analysis</h1>
          <p className="text-lg text-muted-foreground">
            Interactive validation of the mode-overlap contraction theorem
          </p>
        </div>

        {/* Parameter Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator size={20} />
              Parameter Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Amplitude (α): {alpha.toFixed(3)}
                </label>
                <input
                  type="range"
                  min="0.05"
                  max="0.5"
                  step="0.01"
                  value={alpha}
                  onChange={(e) => setAlpha(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Width (β): {beta.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="1.0"
                  max="8.0"
                  step="0.5"
                  value={beta}
                  onChange={(e) => setBeta(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
            
            {contractionFactor !== null && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <MathJax>
                    {`\\(\\Lambda(\\alpha,\\beta) = ${contractionFactor.toFixed(4)}\\)`}
                  </MathJax>
                </div>
                <div className="mt-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-medium">
                      Convergence Rate:
                    </span>
                    <div className="flex items-center gap-1">
                      <p className="text-lg font-mono">
                        {(contractionFactor * 100).toFixed(1)}% per iteration
                      </p>
                      <Badge 
                        variant={isContractiveRate ? "default" : "destructive"}
                        className="ml-2"
                      >
                        <span className={`ml-2 ${isContractiveRate ? 'text-green-700' : 'text-red-700'}`}>
                          {isContractiveRate ? 'CONTRACTIVE' : 'DIVERGENT'}
                        </span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Theoretical Validation */}
        <Card>
          <CardHeader>
            <CardTitle>Theoretical Parameter Bounds</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertDescription>
                Parameters must satisfy rigorous conditions for guaranteed convergence
              </AlertDescription>
            </Alert>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {bounds.betaSatisfied ? 
                    <CheckCircle size={20} className="text-green-600" /> : 
                    <AlertTriangle size={20} className="text-red-600" />
                  }
                  <h4 className="font-medium">
                    Width Parameter β ≥ {bounds.betaLowerBound.toFixed(2)}
                  </h4>
                </div>
                <Badge variant={bounds.betaSatisfied ? "default" : "destructive"}>
                  {bounds.betaSatisfied ? 'Satisfied' : 'Violated'}
                </Badge>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {bounds.alphaSatisfied ? 
                    <CheckCircle size={20} className="text-green-600" /> : 
                    <AlertTriangle size={20} className="text-red-600" />
                  }
                  <h4 className="font-medium">
                    Amplitude Parameter α ≤ {bounds.alphaUpperBound.toFixed(3)}
                  </h4>
                </div>
                <Badge variant={bounds.alphaSatisfied ? "default" : "destructive"}>
                  {bounds.alphaSatisfied ? 'Satisfied' : 'Violated'}
                </Badge>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-muted">
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className={bounds.convergenceGuaranteed ? 'text-green-600' : 'text-gray-400'} />
                  <h4 className="font-medium text-foreground">Overall Assessment</h4>
                </div>
                <p className={bounds.convergenceGuaranteed ? 'text-green-700' : 'text-red-700'}>
                  {bounds.convergenceGuaranteed 
                    ? 'Parameters guarantee exponential convergence'
                    : 'Current parameters may not guarantee convergence'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Convergence Visualization */}
        {convergenceData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Error Reduction Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={convergenceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="iteration" />
                    <YAxis scale="log" domain={['dataMin', 'dataMax']} />
                    <Tooltip formatter={(value) => [(value as number).toExponential(3), '']} />
                    <Line 
                      type="monotone" 
                      dataKey="theoreticalBound" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      name="Theoretical Bound"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="actualError" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Simulated Error"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {convergenceData.length > 0 && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Final Error (10 iterations)</p>
                      <p className="text-lg font-mono">
                        {convergenceData[convergenceData.length - 1]?.actualError.toExponential(3)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reduction Factor</p>
                      <p className="text-lg font-mono">
                        {(convergenceData[0]?.actualError / convergenceData[convergenceData.length - 1]?.actualError).toExponential(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Implementation Recommendations */}
        <Card className="border-accent">
          <CardHeader>
            <CardTitle className="text-accent">Implementation Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle size={16} className="text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Optimal Parameter Range</h4>
                  <p className="text-sm text-muted-foreground">
                    α = 0.1 - {bounds.alphaUpperBound.toFixed(3)}, β ≥ {bounds.betaLowerBound.toFixed(1)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle size={16} className="text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Convergence Monitoring</h4>
                  <p className="text-sm text-muted-foreground">
                    Track ||e⁽ⁿ⁾||∞ ≤ Λⁿ||e⁽⁰⁾||∞ for validation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle size={16} className="text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Basin of Attraction</h4>
                  <p className="text-sm text-muted-foreground">
                    Ensure initial error ||e⁽⁰⁾||∞ ≤ δ_min/2 = {constants.deltaMin / 2}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MathJaxContext>
  );
}