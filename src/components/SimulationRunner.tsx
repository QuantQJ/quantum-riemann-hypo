import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, Play, FileText } from '@phosphor-

  xMax: number;
  tFinal: number;


  estimatedZero
  convergenceError
}
export function
  const [progress, set
 

interface SimulationResults {
  estimatedZeros: number[];
  spectralCorrelation: number;
  convergenceError: number;
  detectedZeros: number;
}

export function SimulationRunner() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<SimulationResults | null>(null);
  const [params] = useState<SimulationParams>({
    xMax: 1000,
    nPoints: 2048,
    tFinal: 4.0,
    beta: 0.2,
      const primeApp
    }

      const phase = Math.random() * 2 * Math.PI;
    });
    // Normalize
    
    const estimatedZeros: number[] = []
    const maxTimeSteps = Math.
    // Time evolution with fe
      if (t % 100 === 0) {
    
      // Adaptive gain control
      
      const newPsi = psi.map((p, i) => {
        const feedback = alpha * Math.sin(gamma * Math.log(x[i] + 1));
        return {
       
    
      // Normalize
      psi = newPsi.map(p => ({ real: p.real/newNor
      // Peak detection every 50 steps
        const intensity = psi.map(p => p.real*p.real + p.imag*p.imag);
       
    
            
            const exists = estimatedZeros.some(z => Math.abs(z - gamma) < 0.1);
              estimatedZeros.push(gamma);
    
      }
      timeSteps++;
    
    
    
    const knownZeros = [
      32.935061588, 37.586
      59.347044003, 60.831778525, 65.112544048
    ];
    //
    if (finalZeros.length >= k
      let sumXY = 0, sumX = 0, sumY = 0, sumX2 = 0, sumY2 = 0;
      
        sumX += finalZeros[i];
        sumX2 += finalZeros[i] * finalZe
      }
      const denom = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 -
        
    }
    return {
      spectralCorrelation: Math.abs(correlation
      dete
  }, [par
  cons
    setProgress(0)
    try {
      setResults(simulationResults);
    } 
    } finally {
      setProgress(100);
  };
  const 
    
    const csvContent = results.estimatedZeros
      .join('\n');
    // Create and download file
    const ur
    link.href = url;
    document.body.appendChild(link);
    document.body.removeCh
    
  };
  const han
# Run thi
import 
from s

    "
    
def analyze_zeros(estimated_file="estimated_zer
    estimated = np.loadtxt(estimated_file
    
    
    
    pearson_r, pearson_p
    
    print(f"Spearman correlation: ρ = {spearman_r:.6f} (p = {
    # 2. Deviation analysis
    mean_dev = np.mean(deviations)
    
    pr
    
    
    avg_spacing = np.mea
    
    def gue_wigner(s):
    
    gu
    
    
    fig, ((ax1, ax2), (ax3, ax
    # Zero comparison
    ax1.plot(estimated[:n_compare], 'ro-', labe
    ax1.set_ylabel('γ')
    ax1
    
    ax2.plot(deviations, 'g-', alpha=0.8)
    ax2.set_ylabel('|γ_e
    ax2.grid(True, alpha=0.3)
    # S
     
    
    ax3.set_
    ax3.set_title('Spacing Distri
    ax3.grid(True, alpha=0.3)
    # Number variance (if enough zeros)
        def number_variance(zeros, L_v
      
               

                variances.append(np.var(int
        
        sigma2 = nu
    
        r
        ax4.loglog(L_values, sigma2, 'b-', label='Simulation'
        ax4.set_xlabel('Interval len
        ax4.set_title('Number Variance')
        ax4.grid(True
    plt.tight_layout()
    plt.show()
    return {
        'spearman_corre
     
    

    print("\\nAnalysis complete! Ch

    
    link.href = url;
    document.body.appendChild(link);
    document.body.removeChild(
    
  };
  return (
      <Card>
          <CardTitle className="flex items
            Quantum Riemann Zero Simulation
          <CardDescr
          </CardDescription>
        <CardContent className="spac
            <div>
              <div className="text-m
            <div>
    
            <div>
    

              <div className="text-muted-for
            <div>
              <div className="text-muted-foreg

          {isRunni
              <div 
                <span>{progress.toFixed(1)}%</span>
              <Progress value={

          <div className=
              onClick={handleRunSimulation} 
              className="flex items-center gap
              <Play className="h-4 w-4" />

        </CardContent>

        <Card>
            <CardTitle>Simulation 
    
          </CardHeader>
    
                <div className="font-medium">Detec
    
              </div>
                <div className="font-medium">Spectral Correlation</div>
                  ρ = {results.spectralCorrelation.toFixed(4)}
    
                <div className="font-medium">Convergence Error</div>
                  {(results.convergenceError * 100).toFixed(2)}%
    

              <FileText className="h-4 w-4" />
                Export your estima
              </AlertDescription

              <Button onClick={handleExportZ
                Export Zeros CSV
    
                Export Analysis Script
            </div>
    
              <ol className="list-decimal list-insid
                <li>Download the analyze_zero
                <li>Install required packages: <code cla
    
            </div>
        </Card>
    </div>
}


















    # Deviation plot
    ax2.plot(deviations, 'g-', alpha=0.8)
    ax2.set_xlabel('Zero index')
    ax2.set_ylabel('|γ_est - γ_true|')
    ax2.set_title('Absolute Deviations')
    ax2.grid(True, alpha=0.3)
    
    # Spacing histogram
    ax3.hist(unfolded_spacings, bins=30, density=True, alpha=0.7, 
             label='Simulation', color='blue')
    s_range = np.linspace(0, 4, 100)
    ax3.plot(s_range, gue_wigner(s_range), 'r-', linewidth=2, 
             label='GUE Wigner')
    ax3.set_xlabel('Unfolded spacing s')
    ax3.set_ylabel('P(s)')
    ax3.set_title('Spacing Distribution')
    ax3.legend()
    ax3.grid(True, alpha=0.3)
    
    # Number variance (if enough zeros)
    if len(estimated) > 50:
        def number_variance(zeros, L_values):
            """Compute number variance Σ²(L)"""
            variances = []
            for L in L_values:
                intervals = []
                for i in range(len(zeros) - int(L)):
                    count = np.sum((zeros >= zeros[i]) & (zeros < zeros[i] + L))
                    intervals.append(count)
                variances.append(np.var(intervals))
            return np.array(variances)
        
        L_values = np.logspace(0, 2, 50)
        sigma2 = number_variance(estimated, L_values)
        
        # RH prediction: Σ²(L) ≈ (1/π²)[ln(2πL) + γ_E + 1]
        gamma_e = 0.5772156649
        rh_prediction = (1/np.pi**2) * (np.log(2*np.pi*L_values) + gamma_e + 1)
        
        ax4.loglog(L_values, sigma2, 'b-', label='Simulation')
        ax4.loglog(L_values, rh_prediction, 'r--', label='RH prediction')
        ax4.set_xlabel('Interval length L')
        ax4.set_ylabel('Number variance Σ²(L)')
        ax4.set_title('Number Variance')
        ax4.legend()
        ax4.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.savefig('riemann_zeros_analysis.png', dpi=300, bbox_inches='tight')
    plt.show()
    
    return {
        'pearson_correlation': pearson_r,
        'spearman_correlation': spearman_r,
        'mean_deviation': mean_dev,
        'max_deviation': max_dev,
        'ks_pvalue': ks_pvalue
    }

if __name__ == "__main__":
    results = analyze_zeros()
    print("\\nAnalysis complete! Check riemann_zeros_analysis.png for plots.")
`;

    const blob = new Blob([scriptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'analyze_zeros.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Analysis script exported to analyze_zeros.py');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Quantum Riemann Zero Simulation
          </CardTitle>
          <CardDescription>
            Run the feedback Hamiltonian simulation to generate estimated Riemann zeros
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div>
              <div className="font-medium">X Max</div>
              <div className="text-muted-foreground">{params.xMax}</div>
            </div>
            <div>
              <div className="font-medium">Grid Points</div>
              <div className="text-muted-foreground">{params.nPoints}</div>
            </div>
            <div>
              <div className="font-medium">T Final</div>
              <div className="text-muted-foreground">{params.tFinal}</div>
            </div>
            <div>
              <div className="font-medium">Beta</div>
              <div className="text-muted-foreground">{params.beta}</div>
            </div>
            <div>
              <div className="font-medium">Target Zeros</div>
              <div className="text-muted-foreground">{params.targetZeros}</div>
            </div>
          </div>

          {isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Running simulation...</span>
                <span>{progress.toFixed(1)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              onClick={handleRunSimulation} 
              disabled={isRunning}
              className="flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              {isRunning ? 'Running...' : 'Run Simulation'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Simulation Results</CardTitle>
            <CardDescription>
              Export the estimated zeros and analysis scripts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <div className="font-medium">Detected Zeros</div>
                <div className="text-2xl font-bold text-accent">
                  {results.detectedZeros}
                </div>
              </div>
              <div>
                <div className="font-medium">Spectral Correlation</div>
                <div className="text-2xl font-bold text-accent">
                  ρ = {results.spectralCorrelation.toFixed(4)}
                </div>
              </div>
              <div>
                <div className="font-medium">Convergence Error</div>
                <div className="text-2xl font-bold text-accent">
                  {(results.convergenceError * 100).toFixed(2)}%
                </div>
              </div>
            </div>

            <Alert>
              <FileText className="h-4 w-4" />
              <AlertDescription>
                Export your estimated zeros to CSV format for comparison with Odlyzko's high-precision data.
                The analysis script will automatically compute correlations, deviations, and GUE statistics.
              </AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Button onClick={handleExportZeros} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Zeros CSV
              </Button>
              <Button onClick={handleExportAnalysisScript} variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Export Analysis Script
              </Button>
            </div>

            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>Next steps:</strong></p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Download the estimated_zeros.csv file</li>
                <li>Download the analyze_zeros.py script</li>
                <li>Upload both files to your Python environment</li>
                <li>Install required packages: <code className="bg-muted px-1 rounded">pip install numpy pandas scipy matplotlib</code></li>
                <li>Run: <code className="bg-muted px-1 rounded">python analyze_zeros.py</code></li>
                <li>Send the CSV file for comparison with Odlyzko's data</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}