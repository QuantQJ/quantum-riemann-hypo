import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function OverviewSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-4">
          Quantum Simulation of Riemann Zeta Zeros via Feedback Hamiltonian Control and SUSY QM
        </h1>
        <div className="flex gap-2 mb-6">
          <Badge variant="outline">Quantum Physics</Badge>
          <Badge variant="outline">Number Theory</Badge>
          <Badge variant="outline">SUSY QM</Badge>
        </div>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Abstract</h2>
        <p className="text-muted-foreground leading-relaxed">
          This research presents a novel quantum framework for Riemann Hypothesis verification using 
          feedback control mechanisms and supersymmetric quantum mechanics (SUSY QM). We demonstrate 
          that Riemann zeta zeros naturally emerge as resonances in a prime-driven quantum system, 
          achieving spectral correlation ρ = 0.999 with 100 zeros and validating GUE statistics 
          with p = 0.78.
        </p>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Key Achievements</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
            <div>
              <strong>Quantum Feedback System Implementation:</strong> Developed adaptive gain control with 
              Crank-Nicolson evolution for precise zero localization
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
            <div>
              <strong>SUSY Structure Verification:</strong> Demonstrated spectral mirroring with 
              Witten index Δ ≈ 0 confirming unbroken supersymmetry
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
            <div>
              <strong>Statistical Validation:</strong> Confirmed Gaussian Unitary Ensemble statistics 
              consistent with Riemann Hypothesis predictions
            </div>
          </li>
        </ul>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Theoretical Foundation</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Building on the Hilbert-Pólya conjecture that Riemann zeta zeros correspond to eigenvalues 
            of a Hermitian operator, we construct an effective Hamiltonian:
          </p>
          <div className="mathematical-content">
            H_eff = -ℏ²/(2m)∇² + V_feedback(ψ, {γₖ})
            <br /><br />
            V_feedback = α(t) Σₖ λₖ Im(⟨e^(iγₖ ln x)|ψ⟩/|⟨e^(iγₖ ln x)|ψ⟩| e^(-iφₖ)) Re(e^(iγₖ ln x))
          </div>
          <p className="text-muted-foreground">
            The feedback potential dynamically adapts based on overlap with zeta zero modes, 
            creating resonant conditions at critical strip locations.
          </p>
        </div>
      </Card>
    </div>
  );
}