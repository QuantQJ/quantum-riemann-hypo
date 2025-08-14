import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

  iteration: number;
  contractionFactor: number;
  overlapping: number;

interface RigorousConstants
  CLeak: number;
  spectralGaps: numb
  eta0: number; // Initial o

  const [alpha, setAlp
  const [isAnalyzing, setIs
 

  const constants: RigorousCo
    CLeak: 4,
    spectralGaps
    eta0: 0.1 // mi

  const computeContraction
    const stiffnessTerms = constants.spectra
 

    const leakageTerm = constants.CLeak
    return maxStiffness + leakageTerm;

  const validateParameterBounds = (alphaVal: number, bet
    
    const betaLowerBound = (4 / (constants.deltaMin ** 2)) * Math.log(2 * constant
    // Upper bound for α for each mode

    const alphaUpperBound = Math.min(...alphaUpperBounds);
    return {
      alphaSatisfied: alphaVal <= alphaUpperBound,
      alphaUpperBound,
    };

  const simulateConvergence = (alphaVal: number, betaVal: number): ConvergenceData[] => {
    const isContractive = lambda < 1;
    

      // Theoretical bound: ||e^(n
      
      if (isContractive) {
      } else {
      }
      
      

      data.push({
        errorNorm: Math.max(currentError, 1e-8),

        theoreticalBound: Math.max(the


    return data;

    setIsAnalyzing(true)
    
      setContractionFactor(lambda);
      
    
    }, 1500);

  useEffect(() => {
      
      }


  useEffect(() => {
  }, []);
  const bounds = vali
  return (
      <div className="space-y-6">
      
    

        {/* Parameter Controls */}
          <CardHeader>
              <Calculator size={20} />
            </CardTitle>
    
              <div>
                  Amplitude (α): {alpha.to
    
                  min="0.05"
                  step="0.01"
                  onChange={(e) => setAlpha(parseFloat(e.
      
              <div>
                  Width (β
                <input
              
                  step="0.5"
       

            </div>
            {contractionFactor !== null && (
      
                  <MathJax>
                  </MathJax>

                 
                     
                      </p>
                    <div>
                      <p className="
                      </p>
                  </div>
         

                      <span className={`ml-2 ${isCont
     

              </
    

        <Card>
            <CardTitle>Th
    
              <Alert>
                <AlertDescription>
                </AlertDescription>

      
                    {bounds.betaSatisfied ? 
                      <AlertTri
                    <h4 clas
             
    

                  </div>

                  <div className="fl
                      <Ch
                    }
       
            
                    <p className={bou
                    


                <di
                    <CheckCir
         

                  Based on rigorous bounds: {bounds.co

          
                  <B
              </div>
          </CardContent>

        {convergenceData.length > 0 && (
            <CardHeader>
              
              

                <Alert>
              
                </Aler
                <ResponsiveContainer width="100%" height={4
                    <CartesianGrid str
                    <YAxis scale="log" domai
                      fo
                       
                    />
                    <Line
                   
                      strokeWidth={2}
                      name="Actual Error ||e^(n)||∞
                    <Lin
                      
                      strokeWi
                      dot={{
                    />
                </ResponsiveC
                <div className=
                    <div className="text-lg font-bold text-accent">
                    </div>
                  
                    
                   
                  </Card>
                    <div className="text-lg fo
                        
                      
                    <div class
                </div>
            </CardContent>
        )}
        {/* Mode Overlap Analy
          <CardHeader>
          </CardHeader>
            <div c
                <h4 
            </div>

                  <p><strong>PL Constant:</s
                    Non-vanishing overlap ensures gr
                </div>

                <Card class
                  <p className="text-sm text-blue-700">
                    when ⟨uₖ
                </
                  <h4 className="font-medium text-green-800 mb-
                    Each 
                  </p>
              </div>
          </CardContent>

        <Card className="b
            <CardTitle cla
          <CardContent>
              <div className="flex items-start gap-3">
                <div>
                </div>
              <div classNa
                <div>
                </div>

                <div>
                </div>
              <div className="flex items
                <div>
                </div>
              <div className="flex items-start gap-3">
                <div>
                </div>
            </div>
            <div class
              <div c
              
                <Badge v
        </Card>

                <Badge variant={bounds.cont
              
            </div>
        </Card>
    </MathJaxContext>
}



















































































































































































































































    </MathJaxContext>

}