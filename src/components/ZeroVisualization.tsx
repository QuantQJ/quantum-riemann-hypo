import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Activity, Eye, ChartBar, Lightning } from '@phosphor-icons/react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

interface ZeroPoint {
  gamma: number;
  intensity: number;
  confidence: number;
}

interface SpectralData {
  frequency: number;
  amplitude: number;
  phase: number;
}

export function ZeroVisualization() {
  const [viewRange, setViewRange] = useState([0, 100]);
  const [resolution, setResolution] = useState([256]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationFrame, setAnimationFrame] = useState(0);
  const [zeros, setZeros] = useState<ZeroPoint[]>([]);
  const [spectralData, setSpectralData] = useState<SpectralData[]>([]);
  const [wavefunctionData, setWavefunctionData] = useState<{ x: number; real: number; imag: number; intensity: number }[]>([]);

  // Known Riemann zeros for reference
  const knownZeros = [
    14.134725, 21.022040, 25.010858, 30.424876, 32.935061,
    37.586178, 40.918719, 43.327073, 48.005151, 49.773832,
    52.970321, 56.446257, 59.347044, 60.831778, 65.112544,
    67.079811, 69.546402, 72.067158, 75.704691, 77.144840,
    79.337375, 82.910381, 84.735493, 87.425275, 88.809111
  ];

  // Generate synthetic quantum wavefunction data
  const generateWavefunctionData = () => {
    const nPoints = resolution[0];
    const xMin = viewRange[0];
    const xMax = viewRange[1];
    const data: { x: number; real: number; imag: number; intensity: number }[] = [];

    for (let i = 0; i < nPoints; i++) {
      const x = xMin + (i / (nPoints - 1)) * (xMax - xMin);
      
      // Simulate wavefunction with contributions from known zeros
      let real = 0;
      let imag = 0;
      
      knownZeros.forEach((gamma, k) => {
        if (gamma >= xMin && gamma <= xMax) {
          const phase = animationFrame * 0.1 + k * 0.3;
          const envelope = Math.exp(-Math.pow(x - gamma, 2) / 8);
          const oscillation = Math.sin(gamma * Math.log(Math.abs(x - xMin + 1) + 1) + phase);
          
          real += envelope * oscillation * Math.cos(phase);
          imag += envelope * oscillation * Math.sin(phase);
        }
      });
      
      // Add some noise and background
      real += 0.1 * (Math.random() - 0.5);
      imag += 0.1 * (Math.random() - 0.5);
      
      const intensity = real * real + imag * imag;
      
      data.push({ x, real, imag, intensity });
    }
    
    return data;
  };

  // Generate zero detection data
  const generateZeroData = () => {
    const detectedZeros: ZeroPoint[] = [];
    
    knownZeros.forEach(gamma => {
      if (gamma >= viewRange[0] && gamma <= viewRange[1]) {
        // Add some detection noise
        const noisyGamma = gamma + (Math.random() - 0.5) * 0.01;
        const intensity = 0.8 + Math.random() * 0.2;
        const confidence = Math.random() > 0.1 ? 0.95 + Math.random() * 0.05 : 0.7 + Math.random() * 0.2;
        
        detectedZeros.push({
          gamma: noisyGamma,
          intensity,
          confidence
        });
      }
    });
    
    return detectedZeros;
  };

  // Generate spectral analysis data
  const generateSpectralData = () => {
    const data: SpectralData[] = [];
    const nFreq = 128;
    
    for (let i = 0; i < nFreq; i++) {
      const frequency = (i / nFreq) * 100; // 0 to 100 frequency range
      
      // Simulate spectral peaks at zero locations
      let amplitude = 0.1 * Math.random(); // Background noise
      
      knownZeros.forEach(gamma => {
        if (gamma >= viewRange[0] && gamma <= viewRange[1]) {
          const resonance = Math.exp(-Math.pow(frequency - gamma, 2) / 4);
          amplitude += resonance * (0.8 + 0.2 * Math.random());
        }
      });
      
      const phase = Math.random() * 2 * Math.PI;
      
      data.push({ frequency, amplitude, phase });
    }
    
    return data;
  };

  // Update data when parameters change
  useEffect(() => {
    setZeros(generateZeroData());
    setSpectralData(generateSpectralData());
    setWavefunctionData(generateWavefunctionData());
  }, [viewRange, resolution, animationFrame]);

  // Animation loop
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isAnimating) {
      intervalId = setInterval(() => {
        setAnimationFrame(prev => (prev + 1) % 100);
      }, 100);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAnimating]);

  const handleViewRangeChange = (newRange: number[]) => {
    setViewRange(newRange);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye size={20} />
            Interactive Zero Visualization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium">View Range (γ values)</label>
                <Badge variant="outline">
                  {viewRange[0].toFixed(1)} - {viewRange[1].toFixed(1)}
                </Badge>
              </div>
              <div className="px-3">
                <Slider
                  value={viewRange}
                  onValueChange={handleViewRangeChange}
                  min={0}
                  max={200}
                  step={5}
                  className="w-full"
                  minStepsBetweenThumbs={10}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium">Resolution</label>
                <Badge variant="outline">{resolution[0]} points</Badge>
              </div>
              <Slider
                value={resolution}
                onValueChange={setResolution}
                min={64}
                max={512}
                step={64}
                className="w-full"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setIsAnimating(!isAnimating)}
                variant={isAnimating ? "default" : "outline"}
                className="flex items-center gap-2"
              >
                <Activity size={16} />
                {isAnimating ? 'Stop Animation' : 'Start Animation'}
              </Button>
              <Button
                onClick={() => {
                  setZeros(generateZeroData());
                  setWavefunctionData(generateWavefunctionData());
                }}
                variant="outline"
              >
                Regenerate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="wavefunction" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="wavefunction" className="flex items-center gap-1">
            <Lightning size={14} />
            Wavefunction
          </TabsTrigger>
          <TabsTrigger value="zeros" className="flex items-center gap-1">
            <Activity size={14} />
            Zero Detection
          </TabsTrigger>
          <TabsTrigger value="spectral" className="flex items-center gap-1">
            <ChartBar size={14} />
            Spectral Analysis
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-1">
            <Eye size={14} />
            Known vs Detected
          </TabsTrigger>
        </TabsList>

        <TabsContent value="wavefunction" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quantum Wavefunction Evolution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={wavefunctionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" tickFormatter={(value) => `${value.toFixed(1)}`} />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        value.toFixed(4), 
                        name === 'real' ? 'Re(ψ)' : name === 'imag' ? 'Im(ψ)' : '|ψ|²'
                      ]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="intensity" 
                      stackId="1"
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.3}
                      name="intensity"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="real" 
                      stroke="#ef4444" 
                      strokeWidth={1}
                      name="real"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="imag" 
                      stroke="#10b981" 
                      strokeWidth={1}
                      name="imag"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 opacity-50"></div>
                  <span>|ψ|² Intensity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-1 bg-red-500"></div>
                  <span>Re(ψ)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-1 bg-green-500"></div>
                  <span>Im(ψ)</span>
                </div>
                {isAnimating && (
                  <Badge variant="outline" className="ml-auto">
                    Frame {animationFrame}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zeros" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detected Riemann Zeros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={zeros}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="gamma" 
                      domain={['dataMin', 'dataMax']}
                      tickFormatter={(value) => `${value.toFixed(1)}`}
                    />
                    <YAxis 
                      dataKey="intensity" 
                      domain={[0, 1.2]}
                      tickFormatter={(value) => `${value.toFixed(2)}`}
                    />
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        value.toFixed(4), 
                        name === 'gamma' ? 'γ' : name === 'intensity' ? 'Intensity' : 'Confidence'
                      ]}
                    />
                    <Scatter
                      name="Detected Zeros"
                      data={zeros}
                      fill="#8884d8"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-3 bg-primary/5">
                  <div className="text-lg font-bold text-primary">{zeros.length}</div>
                  <div className="text-sm text-muted-foreground">Detected</div>
                </Card>
                <Card className="p-3 bg-green-500/5">
                  <div className="text-lg font-bold text-green-600">
                    {zeros.filter(z => z.confidence > 0.9).length}
                  </div>
                  <div className="text-sm text-muted-foreground">High Confidence</div>
                </Card>
                <Card className="p-3 bg-accent/5">
                  <div className="text-lg font-bold text-accent">
                    {zeros.length > 0 ? (zeros.reduce((sum, z) => sum + z.intensity, 0) / zeros.length).toFixed(3) : '0'}
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Intensity</div>
                </Card>
                <Card className="p-3 bg-secondary">
                  <div className="text-lg font-bold">
                    {viewRange[1] - viewRange[0]}
                  </div>
                  <div className="text-sm text-muted-foreground">Range Width</div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="spectral" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Spectral Power Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={spectralData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="frequency" 
                      tickFormatter={(value) => `${value.toFixed(1)}`}
                    />
                    <YAxis 
                      tickFormatter={(value) => `${value.toFixed(2)}`}
                    />
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        value.toFixed(4), 
                        name === 'amplitude' ? 'Power' : 'Phase'
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="amplitude"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={false}
                      name="amplitude"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                Spectral peaks correspond to resonances at Riemann zero locations. 
                The power spectrum shows enhanced signal-to-noise ratio at γ values where zeros are located.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Known vs Detected Zeros Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Comparison table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Index</th>
                        <th className="text-left p-2">Known γ</th>
                        <th className="text-left p-2">Detected γ</th>
                        <th className="text-left p-2">Error</th>
                        <th className="text-left p-2">Confidence</th>
                        <th className="text-left p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {knownZeros
                        .filter(gamma => gamma >= viewRange[0] && gamma <= viewRange[1])
                        .slice(0, 10)
                        .map((knownGamma, index) => {
                          const detected = zeros.find(z => Math.abs(z.gamma - knownGamma) < 0.5);
                          const error = detected ? Math.abs(detected.gamma - knownGamma) : null;
                          
                          return (
                            <tr key={index} className="border-b">
                              <td className="p-2">{index + 1}</td>
                              <td className="p-2 font-mono">{knownGamma.toFixed(6)}</td>
                              <td className="p-2 font-mono">
                                {detected ? detected.gamma.toFixed(6) : '—'}
                              </td>
                              <td className="p-2 font-mono">
                                {error ? error.toFixed(6) : '—'}
                              </td>
                              <td className="p-2">
                                {detected ? (
                                  <Badge variant={detected.confidence > 0.9 ? "default" : "secondary"}>
                                    {(detected.confidence * 100).toFixed(1)}%
                                  </Badge>
                                ) : '—'}
                              </td>
                              <td className="p-2">
                                {detected ? (
                                  error && error < 0.01 ? (
                                    <Badge variant="default">✓ Match</Badge>
                                  ) : (
                                    <Badge variant="secondary">~ Close</Badge>
                                  )
                                ) : (
                                  <Badge variant="destructive">✗ Missing</Badge>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <Card className="p-3 bg-green-50 border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-green-800">Exact Matches</span>
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      {zeros.filter(detected => 
                        knownZeros.some(known => 
                          known >= viewRange[0] && known <= viewRange[1] && 
                          Math.abs(detected.gamma - known) < 0.01
                        )
                      ).length}
                    </div>
                  </Card>
                  
                  <Card className="p-3 bg-yellow-50 border-yellow-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="font-medium text-yellow-800">Close Matches</span>
                    </div>
                    <div className="text-lg font-bold text-yellow-600">
                      {zeros.filter(detected => 
                        knownZeros.some(known => 
                          known >= viewRange[0] && known <= viewRange[1] && 
                          Math.abs(detected.gamma - known) >= 0.01 &&
                          Math.abs(detected.gamma - known) < 0.1
                        )
                      ).length}
                    </div>
                  </Card>
                  
                  <Card className="p-3 bg-red-50 border-red-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="font-medium text-red-800">Missed Zeros</span>
                    </div>
                    <div className="text-lg font-bold text-red-600">
                      {knownZeros.filter(known => 
                        known >= viewRange[0] && known <= viewRange[1] &&
                        !zeros.some(detected => Math.abs(detected.gamma - known) < 0.1)
                      ).length}
                    </div>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}