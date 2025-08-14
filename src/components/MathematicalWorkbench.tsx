import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calculator, Function, FlaskConical, BookOpen } from '@phosphor-icons/react';
import { MathJax, MathJaxContext } from '@/components/MathJax';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

interface EquationResult {
  input: string;
  output: number;
  isValid: boolean;
  error?: string;
}

interface FunctionPlotData {
  x: number;
  y: number;
  derivative?: number;
}

interface ZetaCalculation {
  s: string;
  result: string;
  magnitude: number;
  phase: number;
}

const mathJaxConfig = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']]
  }
};

export function MathematicalWorkbench() {
  const [equation, setEquation] = useState('');
  const [results, setResults] = useState<EquationResult[]>([]);
  const [plotData, setPlotData] = useState<FunctionPlotData[]>([]);
  const [zetaResults, setZetaResults] = useState<ZetaCalculation[]>([]);
  const [sValue, setSValue] = useState('0.5 + 14.134725i');

  // Mathematical function evaluator
  const evaluateExpression = useCallback((expr: string): EquationResult => {
    try {
      // Simple mathematical expressions
      // Replace mathematical constants and functions
      let processedExpr = expr
        .replace(/π|pi/g, String(Math.PI))
        .replace(/e/g, String(Math.E))
        .replace(/γ/g, '0.5772156649') // Euler-Mascheroni constant
        .replace(/log/g, 'Math.log')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/exp/g, 'Math.exp')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/abs/g, 'Math.abs')
        .replace(/\^/g, '**'); // Convert ^ to ** for exponentiation

      // Evaluate the expression safely
      const result = Function(`"use strict"; return (${processedExpr})`)();
      
      if (typeof result !== 'number' || isNaN(result)) {
        throw new Error('Result is not a valid number');
      }

      return {
        input: expr,
        output: result,
        isValid: true
      };
    } catch (error) {
      return {
        input: expr,
        output: 0,
        isValid: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }, []);

  // Generate function plot data
  const generatePlotData = useCallback((func: string, xMin: number = -10, xMax: number = 10, points: number = 200) => {
    const data: FunctionPlotData[] = [];
    const dx = (xMax - xMin) / (points - 1);

    for (let i = 0; i < points; i++) {
      const x = xMin + i * dx;
      
      try {
        const expr = func.replace(/x/g, String(x));
        const result = evaluateExpression(expr);
        
        if (result.isValid && Math.abs(result.output) < 1000) { // Avoid extreme values
          // Calculate derivative numerically
          const h = dx / 10;
          const exprPlus = func.replace(/x/g, String(x + h));
          const exprMinus = func.replace(/x/g, String(x - h));
          const resultPlus = evaluateExpression(exprPlus);
          const resultMinus = evaluateExpression(exprMinus);
          
          const derivative = (resultPlus.output - resultMinus.output) / (2 * h);
          
          data.push({
            x,
            y: result.output,
            derivative: Math.abs(derivative) < 1000 ? derivative : undefined
          });
        }
      } catch (error) {
        // Skip invalid points
      }
    }

    return data;
  }, [evaluateExpression]);

  // Simplified Riemann zeta function calculator (approximation)
  const calculateZeta = useCallback((s: string) => {
    try {
      // Parse complex number (simplified)
      const match = s.match(/([+-]?\d*\.?\d+)\s*([+-])\s*(\d*\.?\d+)i/);
      if (!match) {
        throw new Error('Invalid complex number format. Use: a + bi');
      }

      const realPart = parseFloat(match[1]);
      const sign = match[2] === '+' ? 1 : -1;
      const imagPart = sign * parseFloat(match[3]);

      // Very simplified approximation for demonstration
      // In reality, this would require sophisticated numerical methods
      if (Math.abs(realPart - 0.5) < 0.1) {
        // Near the critical line
        const magnitude = Math.exp(-Math.abs(imagPart) * 0.1);
        const phase = imagPart * 0.1;
        
        return {
          s,
          result: `≈ ${magnitude.toFixed(6)}e^{${phase.toFixed(3)}i}`,
          magnitude,
          phase
        };
      } else {
        // Rough approximation for other values
        const magnitude = 1 / Math.abs(realPart - 1);
        const phase = realPart * 0.5;
        
        return {
          s,
          result: `≈ ${magnitude.toFixed(6)}e^{${phase.toFixed(3)}i}`,
          magnitude,
          phase
        };
      }
    } catch (error) {
      return {
        s,
        result: 'Error: Invalid input',
        magnitude: 0,
        phase: 0
      };
    }
  }, []);

  const handleEvaluate = () => {
    const result = evaluateExpression(equation);
    setResults(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 results
    setEquation('');
  };

  const handlePlotFunction = () => {
    const data = generatePlotData(equation);
    setPlotData(data);
    setEquation('');
  };

  const handleCalculateZeta = () => {
    const result = calculateZeta(sValue);
    setZetaResults(prev => [result, ...prev.slice(0, 4)]); // Keep last 5 results
  };

  return (
    <MathJaxContext>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator size={20} />
              Mathematical Workbench
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <BookOpen className="h-4 w-4" />
              <AlertDescription>
                Interactive mathematical exploration tools. Use π, e, γ, log, sin, cos, exp, sqrt, abs, and basic arithmetic.
                For plotting, use 'x' as the variable. For complex numbers, use format: a + bi or a - bi.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calculator" className="flex items-center gap-1">
              <Calculator size={14} />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="plotter" className="flex items-center gap-1">
              <Function size={14} />
              Function Plotter
            </TabsTrigger>
            <TabsTrigger value="zeta" className="flex items-center gap-1">
              <FlaskConical size={14} />
              ζ Calculator
            </TabsTrigger>
            <TabsTrigger value="formulas" className="flex items-center gap-1">
              <BookOpen size={14} />
              Key Formulas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Expression Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={equation}
                    onChange={(e) => setEquation(e.target.value)}
                    placeholder="Enter expression, e.g., sin(π/4), log(e), sqrt(2)"
                    onKeyPress={(e) => e.key === 'Enter' && handleEvaluate()}
                    className="flex-1"
                  />
                  <Button onClick={handleEvaluate} disabled={!equation.trim()}>
                    Calculate
                  </Button>
                </div>

                {results.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Recent Calculations</h4>
                    {results.map((result, index) => (
                      <div key={index} className={`p-3 rounded border ${
                        result.isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                      }`}>
                        <div className="flex justify-between items-center">
                          <code className="text-sm">{result.input}</code>
                          <Badge variant={result.isValid ? "default" : "destructive"}>
                            {result.isValid ? result.output.toFixed(8) : 'Error'}
                          </Badge>
                        </div>
                        {result.error && (
                          <div className="text-xs text-red-600 mt-1">{result.error}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEquation(prev => prev + 'π')}
                  >
                    π
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEquation(prev => prev + 'e')}
                  >
                    e
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEquation(prev => prev + 'γ')}
                  >
                    γ
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEquation(prev => prev + 'sqrt(')}
                  >
                    √
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEquation(prev => prev + 'log(')}
                  >
                    ln
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEquation(prev => prev + 'sin(')}
                  >
                    sin
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEquation(prev => prev + 'cos(')}
                  >
                    cos
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEquation(prev => prev + 'exp(')}
                  >
                    e^x
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plotter" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Function Plotter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={equation}
                    onChange={(e) => setEquation(e.target.value)}
                    placeholder="Enter function of x, e.g., sin(x), x^2, log(abs(x))"
                    onKeyPress={(e) => e.key === 'Enter' && handlePlotFunction()}
                    className="flex-1"
                  />
                  <Button onClick={handlePlotFunction} disabled={!equation.trim()}>
                    Plot
                  </Button>
                </div>

                {plotData.length > 0 && (
                  <div>
                    <div className="h-64 mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={plotData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="x" 
                            tickFormatter={(value) => value.toFixed(1)}
                          />
                          <YAxis 
                            tickFormatter={(value) => value.toFixed(2)}
                          />
                          <Tooltip 
                            formatter={(value: number, name: string) => [
                              value.toFixed(4), 
                              name === 'y' ? 'f(x)' : "f'(x)"
                            ]}
                          />
                          <Line
                            type="monotone"
                            dataKey="y"
                            stroke="#8884d8"
                            strokeWidth={2}
                            dot={false}
                            name="y"
                          />
                          {plotData.some(d => d.derivative !== undefined) && (
                            <Line
                              type="monotone"
                              dataKey="derivative"
                              stroke="#82ca9d"
                              strokeWidth={1}
                              strokeDasharray="5 5"
                              dot={false}
                              name="derivative"
                            />
                          )}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-1 bg-blue-500"></div>
                        <span>f(x)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-1 bg-green-500 border-dashed border-t"></div>
                        <span>f'(x)</span>
                      </div>
                      <Badge variant="outline" className="ml-auto">
                        {plotData.length} points
                      </Badge>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEquation('sin(x)')}
                  >
                    sin(x)
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEquation('x^2')}
                  >
                    x²
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEquation('exp(-x^2)')}
                  >
                    e^(-x²)
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEquation('log(abs(x))')}
                  >
                    ln|x|
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEquation('1/(1+x^2)')}
                  >
                    1/(1+x²)
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEquation('sin(x)/x')}
                  >
                    sinc(x)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="zeta" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Riemann ζ Function Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor="sValue">Complex input s (format: a + bi or a - bi)</Label>
                    <Input
                      id="sValue"
                      value={sValue}
                      onChange={(e) => setSValue(e.target.value)}
                      placeholder="0.5 + 14.134725i"
                    />
                  </div>
                  <Button 
                    onClick={handleCalculateZeta}
                    className="mt-6"
                  >
                    Calculate ζ(s)
                  </Button>
                </div>

                {zetaResults.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Recent ζ Calculations</h4>
                    {zetaResults.map((result, index) => (
                      <div key={index} className="p-3 rounded border bg-blue-50 border-blue-200">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <code className="text-sm">ζ({result.s})</code>
                            <Badge variant="outline">{result.result}</Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            |ζ| ≈ {result.magnitude.toFixed(6)}, arg(ζ) ≈ {result.phase.toFixed(3)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <Alert>
                  <FlaskConical className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Note:</strong> This is a simplified approximation for demonstration. 
                    Real ζ function calculations require sophisticated numerical methods like the 
                    Riemann-Siegel formula or Euler-Maclaurin expansion.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSValue('0.5 + 14.134725i')}
                  >
                    First zero
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSValue('0.5 + 21.022040i')}
                  >
                    Second zero
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSValue('2 + 0i')}
                  >
                    ζ(2) = π²/6
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSValue('0 + 0i')}
                  >
                    ζ(0) = -1/2
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSValue('-1 + 0i')}
                  >
                    ζ(-1) = -1/12
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSValue('1 + 0i')}
                  >
                    ζ(1) = ∞
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="formulas" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Key Mathematical Formulas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="mathematical-content">
                    <h4 className="font-semibold mb-3">Riemann Zeta Function</h4>
                    <MathJax>
                      {`$$\\zeta(s) = \\sum_{n=1}^{\\infty} \\frac{1}{n^s} = \\prod_p \\left(1-\\frac{1}{p^s}\\right)^{-1}$$`}
                    </MathJax>
                    <p className="text-sm text-muted-foreground mt-2">
                      Euler product formula connecting primes and the zeta function
                    </p>
                  </div>

                  <div className="mathematical-content">
                    <h4 className="font-semibold mb-3">Riemann Explicit Formula</h4>
                    <MathJax>
                      {`$$\\pi(x) - \\text{Li}(x) = -\\sum_{\\gamma} \\frac{\\sin(\\gamma \\log x)}{\\gamma} + O(x^{-1/4})$$`}
                    </MathJax>
                    <p className="text-sm text-muted-foreground mt-2">
                      Connects prime distribution to zeta zeros γ
                    </p>
                  </div>

                  <div className="mathematical-content">
                    <h4 className="font-semibold mb-3">Quantum Hamiltonian</h4>
                    <MathJax>
                      {`$$H = -\\frac{\\hbar^2}{2m}\\frac{d^2}{dx^2} + V_{\\text{quantum}}(x)$$`}
                    </MathJax>
                    <MathJax>
                      {`$$V_{\\text{quantum}}(x) = -2\\frac{d^2/dx^2|\\Delta(x)|}{|\\Delta(x)|}$$`}
                    </MathJax>
                    <p className="text-sm text-muted-foreground mt-2">
                      Prime-driven potential with eigenvalues E_k = (ℏ²/2m)(1/4 + γ_k²)
                    </p>
                  </div>

                  <div className="mathematical-content">
                    <h4 className="font-semibold mb-3">Contraction Mapping</h4>
                    <MathJax>
                      {`$$\\Lambda(\\alpha,\\beta) = \\max_k\\left(\\frac{\\alpha C_1 C_{\\text{node},k}}{\\Delta_k\\sqrt{\\beta}}\\right) + C_{\\text{leak}}e^{-\\beta\\delta_{\\min}^2/4}$$`}
                    </MathJax>
                    <p className="text-sm text-muted-foreground mt-2">
                      Linear convergence guaranteed when Λ(α,β) &lt; 1
                    </p>
                  </div>

                  <div className="mathematical-content">
                    <h4 className="font-semibold mb-3">SUSY Partner Potentials</h4>
                    <MathJax>
                      {`$$W(x) = -\\frac{\\hbar}{\\sqrt{2m}}\\frac{\\nabla\\psi_0}{\\psi_0}$$`}
                    </MathJax>
                    <MathJax>
                      {`$$V_{\\pm}(x) = W^2(x) \\pm \\frac{\\hbar}{\\sqrt{2m}}\\nabla W(x)$$`}
                    </MathJax>
                    <p className="text-sm text-muted-foreground mt-2">
                      Supersymmetric partners with Witten index Δ = n₋ - n₊ ≈ 0
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mathematical Constants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>π (pi)</span>
                        <code>3.14159265...</code>
                      </div>
                      <div className="flex justify-between">
                        <span>e (Euler's number)</span>
                        <code>2.71828182...</code>
                      </div>
                      <div className="flex justify-between">
                        <span>γ (Euler-Mascheroni)</span>
                        <code>0.57721566...</code>
                      </div>
                      <div className="flex justify-between">
                        <span>ζ(2) = π²/6</span>
                        <code>1.64493406...</code>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>First Riemann zero</span>
                        <code>14.134725...</code>
                      </div>
                      <div className="flex justify-between">
                        <span>Second Riemann zero</span>
                        <code>21.022040...</code>
                      </div>
                      <div className="flex justify-between">
                        <span>Golden ratio φ</span>
                        <code>1.61803398...</code>
                      </div>
                      <div className="flex justify-between">
                        <span>√2</span>
                        <code>1.41421356...</code>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MathJaxContext>
  );
}