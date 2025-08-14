import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BookOpen, Code, Download, ExternalLink, Github, Users, Lightbulb } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { MathJax, MathJaxContext } from '@/components/MathJax';

const mathJaxConfig = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']]
  }
};

export function AboutSection() {
  return (
    <MathJaxContext>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">User Guide & Documentation</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Complete reference for exploring the quantum approach to the Riemann Hypothesis
          </p>
        </div>

        <Tabs defaultValue="guide" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="guide" className="flex items-center gap-1">
              <BookOpen size={14} />
              User Guide
            </TabsTrigger>
            <TabsTrigger value="implementation" className="flex items-center gap-1">
              <Code size={14} />
              Implementation
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-1">
              <Download size={14} />
              Resources
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-1">
              <Users size={14} />
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guide" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb size={20} />
                  Getting Started
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <BookOpen className="h-4 w-4" />
                  <AlertDescription>
                    This application demonstrates a novel quantum mechanical approach to the Riemann Hypothesis.
                    Navigate through the sections to explore the theory, implementation, and results.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-accent mb-3">Navigation Overview</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-0.5">Overview</Badge>
                        <div className="text-sm">
                          <p className="font-medium">Research Summary</p>
                          <p className="text-muted-foreground">
                            Main results, key findings, and the spectral tautology framework
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-0.5">Theory</Badge>
                        <div className="text-sm">
                          <p className="font-medium">Mathematical Framework</p>
                          <p className="text-muted-foreground">
                            Complete proofs of Theorems 2-4: spectral reduction, contraction mapping, and convergence
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-0.5">Parameters</Badge>
                        <div className="text-sm">
                          <p className="font-medium">Interactive Parameter Explorer</p>
                          <p className="text-muted-foreground">
                            Adjust α, β, T_final values and see real-time contraction factor calculations
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-0.5">SUSY</Badge>
                        <div className="text-sm">
                          <p className="font-medium">Supersymmetric Analysis</p>
                          <p className="text-muted-foreground">
                            Witten index calculations, partner potentials, and spectral mirroring
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-0.5">Verification</Badge>
                        <div className="text-sm">
                          <p className="font-medium">Results Validation</p>
                          <p className="text-muted-foreground">
                            Statistical tests, falsifiability criteria, and control experiments
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-0.5">Visualization</Badge>
                        <div className="text-sm">
                          <p className="font-medium">Interactive Plots</p>
                          <p className="text-muted-foreground">
                            Real-time wavefunction evolution, zero detection, and spectral analysis
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-0.5">Workbench</Badge>
                        <div className="text-sm">
                          <p className="font-medium">Mathematical Tools</p>
                          <p className="text-muted-foreground">
                            Calculator, function plotter, ζ function evaluator, and formula reference
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Concepts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="mathematical-content">
                  <h4 className="font-semibold mb-3">The Spectral Tautology</h4>
                  <p className="text-sm mb-3">
                    The core insight is that Riemann zeros can be encoded as eigenvalues of a quantum Hamiltonian:
                  </p>
                  <MathJax>
                    {`$$E_k = \\frac{\\hbar^2}{2m}\\left(\\frac{1}{4} + \\gamma_k^2\\right) = \\frac{\\hbar^2}{2m}\\|(1/2, \\gamma_k)\\|^2$$`}
                  </MathJax>
                  <p className="text-sm mt-2 text-muted-foreground">
                    This creates a self-referential loop: zeros define the spectrum that locates them.
                  </p>
                </div>

                <div className="mathematical-content">
                  <h4 className="font-semibold mb-3">Prime-Driven Dynamics</h4>
                  <p className="text-sm mb-3">
                    The quantum potential is constructed from prime counting data:
                  </p>
                  <MathJax>
                    {`$$V_{\\text{quantum}}(x) = -2\\frac{d^2/dx^2|\\Delta(x)|}{|\\Delta(x)|}$$`}
                  </MathJax>
                  <p className="text-sm mt-2 text-muted-foreground">
                    where Δ(x) = π(x) - Li(x) implicitly contains zero information via the explicit formula.
                  </p>
                </div>

                <div className="mathematical-content">
                  <h4 className="font-semibold mb-3">Feedback Control</h4>
                  <p className="text-sm mb-3">
                    Iterative refinement using Gaussian feedback potentials:
                  </p>
                  <MathJax>
                    {`$$V_{\\text{feedback}}^{(n)}(x) = \\alpha \\sum_k \\exp(-\\beta(x-\\gamma_k^{(n-1)})^2)$$`}
                  </MathJax>
                  <p className="text-sm mt-2 text-muted-foreground">
                    Convergence guaranteed when Λ(α,β) &lt; 1 with explicit parameter bounds.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interactive Features Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-blue-700">Parameter Controls</h4>
                    <p className="text-sm text-muted-foreground">
                      Use sliders to adjust α (amplitude), β (width), and T_final (evolution time). 
                      Watch the contraction factor Λ(α,β) update in real-time. Green indicates convergence (Λ &lt; 1).
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium text-green-700">Visualization Tools</h4>
                    <p className="text-sm text-muted-foreground">
                      Interactive plots showing wavefunction evolution, zero detection confidence, and spectral analysis. 
                      Use animation controls to see dynamics. Adjust view range to focus on specific γ regions.
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-medium text-purple-700">Mathematical Workbench</h4>
                    <p className="text-sm text-muted-foreground">
                      Built-in calculator with support for π, e, γ, and mathematical functions. 
                      Function plotter for exploring relationships. Simplified ζ function evaluator for complex inputs.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-medium text-orange-700">Simulation Runner</h4>
                    <p className="text-sm text-muted-foreground">
                      Run full quantum simulations and export results as CSV. 
                      Generate Python analysis scripts for detailed statistical validation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="implementation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code size={20} />
                  Technical Implementation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-accent mb-3">Core Algorithm</h3>
                    <div className="mathematical-content text-sm space-y-2">
                      <p><strong>1. Initialization:</strong> ψ₀(x) ∝ Δ(x) = π(x) - Li(x)</p>
                      <p><strong>2. Quantum Evolution:</strong> ψₙ = exp(-iHₙt/ℏ)ψ₀</p>
                      <p><strong>3. Zero Extraction:</strong> γₖ⁽ⁿ⁾ from spectral peaks/nodes</p>
                      <p><strong>4. Feedback Update:</strong> Hₙ₊₁ = H₀ + V_fb(γₖ⁽ⁿ⁾)</p>
                      <p><strong>5. Convergence Check:</strong> ||γ⁽ⁿ⁾ - γ⁽ⁿ⁻¹⁾|| &lt; tol</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-accent mb-3">Numerical Methods</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2"></div>
                        <div>
                          <strong>Time Evolution:</strong> Crank-Nicolson scheme for unitary evolution
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2"></div>
                        <div>
                          <strong>Grid:</strong> Logarithmic spacing optimized for prime distribution
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2"></div>
                        <div>
                          <strong>Peak Detection:</strong> Adaptive thresholding with confidence scoring
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2"></div>
                        <div>
                          <strong>Error Control:</strong> Relative tolerance 10⁻⁶, absolute tolerance 10⁻⁸
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-accent mb-3">Parameter Optimization</h3>
                    <div className="mathematical-content text-sm">
                      <p className="mb-2">Optimal parameter selection follows rigorous bounds:</p>
                      <MathJax>
                        {`$$\\beta \\geq \\frac{4}{\\delta_{\\min}^2}\\log\\frac{2C_{\\text{leak}}}{\\varepsilon}$$`}
                      </MathJax>
                      <MathJax>
                        {`$$\\alpha \\leq \\min_k \\frac{(1-\\varepsilon)\\Delta_k}{C_1 C_{\\text{node},k}\\sqrt{\\beta}}$$`}
                      </MathJax>
                      <p className="text-muted-foreground mt-2">
                        These ensure contraction factor Λ(α,β) &lt; 1 for guaranteed convergence.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Code Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Frontend Components</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• <strong>Navigation:</strong> Section switching with persistent state</li>
                      <li>• <strong>Parameter Controls:</strong> Interactive sliders with real-time validation</li>
                      <li>• <strong>Visualization:</strong> Recharts-based plotting with animation support</li>
                      <li>• <strong>Mathematical Display:</strong> Custom MathJax integration</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Computational Core</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• <strong>Simulation Engine:</strong> JavaScript quantum evolution solver</li>
                      <li>• <strong>Parameter Analysis:</strong> Rigorous bounds computation</li>
                      <li>• <strong>Statistical Validation:</strong> GUE test implementations</li>
                      <li>• <strong>Export Tools:</strong> CSV and Python script generation</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">UI Framework</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• <strong>React + TypeScript:</strong> Type-safe component architecture</li>
                      <li>• <strong>Tailwind CSS:</strong> Utility-first styling with custom theme</li>
                      <li>• <strong>Shadcn/ui:</strong> Consistent, accessible component library</li>
                      <li>• <strong>Phosphor Icons:</strong> Scientific iconography</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download size={20} />
                  Research Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="border rounded p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">Complete Research Paper</h4>
                      <Button size="sm" variant="outline">
                        <ExternalLink size={14} className="mr-1" />
                        View PDF
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      "Quantum Simulation of Riemann Zeta Zeros via Feedback Hamiltonian Control and SUSY QM"
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">42 pages</Badge>
                      <Badge variant="outline">3 theorems</Badge>
                      <Badge variant="outline">Mathematical proofs</Badge>
                    </div>
                  </div>

                  <div className="border rounded p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">Python Implementation</h4>
                      <Button size="sm" variant="outline">
                        <Github size={14} className="mr-1" />
                        GitHub
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Full computational implementation with Jupyter notebooks and analysis tools
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">NumPy/SciPy</Badge>
                      <Badge variant="outline">Matplotlib</Badge>
                      <Badge variant="outline">Jupyter</Badge>
                    </div>
                  </div>

                  <div className="border rounded p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">Odlyzko Zero Tables</h4>
                      <Button size="sm" variant="outline">
                        <Download size={14} className="mr-1" />
                        Download
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      High-precision reference data for the first 10,000 Riemann zeta zeros
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">CSV format</Badge>
                      <Badge variant="outline">15 digits</Badge>
                      <Badge variant="outline">10K zeros</Badge>
                    </div>
                  </div>

                  <div className="border rounded p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">Validation Scripts</h4>
                      <Button size="sm" variant="outline">
                        <Download size={14} className="mr-1" />
                        Get Scripts
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Statistical analysis tools for correlation, GUE testing, and error computation
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">Python</Badge>
                      <Badge variant="outline">Statistical tests</Badge>
                      <Badge variant="outline">Visualization</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mathematical References</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Key Papers</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Edwards, H. M. (1974). "Riemann's Zeta Function" - Classical theory foundation</li>
                      <li>• Montgomery, H. L. (1973). "The pair correlation of zeros of the zeta function" - GUE connection</li>
                      <li>• Keating & Snaith (2000). "Random matrix theory and ζ(1/2+it)" - Modern RMT approach</li>
                      <li>• Berry & Keating (1999). "The Riemann zeros and eigenvalue asymptotics" - Spectral interpretation</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Mathematical Background</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Quantum mechanics: Kato perturbation theory, spectral analysis</li>
                      <li>• Number theory: Prime number theorem, explicit formulas</li>
                      <li>• Random matrix theory: Gaussian ensembles, universality</li>
                      <li>• Supersymmetric quantum mechanics: Witten index, partner Hamiltonians</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <Card className="quantum-gradient">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                    JS
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">Hello, my name is James</CardTitle>
                    <p className="text-muted-foreground">
                      Researcher in Quantum Mathematics and Number Theory
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-base leading-relaxed">
                  I've been working on some fascinating thoughts about the connection between quantum mechanics 
                  and the Riemann Hypothesis. This research represents years of exploration into how quantum 
                  systems might naturally encode the deepest mysteries of prime numbers.
                </p>
                <p className="text-base leading-relaxed">
                  What started as curiosity about spectral theory has evolved into a comprehensive framework 
                  that bridges abstract mathematics with physical quantum systems. The idea that the Riemann 
                  zeros might emerge as natural resonances in quantum Hamiltonians has profound implications 
                  for both number theory and quantum physics.
                </p>
                <div className="mt-6 p-4 bg-muted/30 rounded-lg border-l-4 border-accent">
                  <p className="text-sm italic text-muted-foreground">
                    "The most beautiful thing we can experience is the mysterious. It is the source of all true art and science." 
                    <span className="font-medium">— Albert Einstein</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users size={20} />
                  Research Background
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-accent mb-3">Research Motivation</h3>
                    <p className="text-sm leading-relaxed">
                      The Riemann Hypothesis stands as one of mathematics' greatest unsolved problems. 
                      This research explores a novel quantum mechanical approach, treating zeta zeros as 
                      eigenvalues of a specially constructed Hamiltonian. The "spectral tautology" framework 
                      creates a self-referential loop where zeros define the spectrum that locates them.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-accent mb-3">Key Innovations</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                        <div>
                          <strong>Prime-Driven Potential:</strong> First quantum system directly constructed from prime data
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                        <div>
                          <strong>Rigorous Convergence Theory:</strong> Complete mathematical framework with explicit bounds
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                        <div>
                          <strong>SUSY Protection:</strong> First application of supersymmetric QM to number theory
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                        <div>
                          <strong>Falsifiability Framework:</strong> Clear failure modes and statistical controls
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-accent mb-3">Research Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium text-blue-700 mb-1">Mathematical Physics</h4>
                        <p className="text-sm text-muted-foreground">
                          New connections between quantum mechanics and number theory, 
                          validating aspects of the Hilbert-Pólya conjecture.
                        </p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-medium text-green-700 mb-1">Computational Methods</h4>
                        <p className="text-sm text-muted-foreground">
                          Novel algorithms for high-precision zero computation with 
                          provable convergence guarantees.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technical Acknowledgments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Built With</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">React 18</Badge>
                      <Badge variant="outline">TypeScript</Badge>
                      <Badge variant="outline">Tailwind CSS</Badge>
                      <Badge variant="outline">Shadcn/ui</Badge>
                      <Badge variant="outline">Recharts</Badge>
                      <Badge variant="outline">Phosphor Icons</Badge>
                      <Badge variant="outline">Vite</Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Mathematical Libraries</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Custom MathJax integration for LaTeX rendering</li>
                      <li>• JavaScript numerical methods for quantum evolution</li>
                      <li>• Statistical analysis tools for GUE validation</li>
                      <li>• High-precision arithmetic for zero calculations</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Data Sources</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Odlyzko's high-precision zeta zero tables</li>
                      <li>• Prime number data from computational number theory</li>
                      <li>• GUE statistical reference distributions</li>
                      <li>• Mathematical constants and special function values</li>
                    </ul>
                  </div>

                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground text-center">
                      This application serves as an interactive companion to the research paper 
                      "Quantum Simulation of Riemann Zeta Zeros via Feedback Hamiltonian Control and SUSY QM"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MathJaxContext>
  );
}