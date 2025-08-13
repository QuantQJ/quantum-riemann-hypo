import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function TheorySection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-4">Theoretical Framework</h1>
        <p className="text-muted-foreground text-lg">
          Mathematical foundations connecting quantum dynamics to number theory
        </p>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Effective Hamiltonian Construction</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            The core innovation lies in constructing a feedback-driven quantum system where the 
            potential adapts based on overlap with conjectured zeta zero modes:
          </p>
          <div className="mathematical-content">
            H_eff = H₀ + V_feedback(t, ψ)
            <br /><br />
            H₀ = -ℏ²/(2m) d²/dx² + V₀(x)
            <br /><br />
            V_feedback = α(t) Σₖ λₖ φₖ(x, γₖ, ψ)
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Adaptive Gain Control</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            The time-dependent coupling strength ensures convergence while maintaining stability:
          </p>
          <div className="mathematical-content">
            α(t) = tanh(5(1 - t/T_final))
            <br /><br />
            • Strong coupling (α ≈ 1) for t &lt;&lt; T_final: rapid convergence
            <br />
            • Weak coupling (α ≈ 0) for t → T_final: fine-tuning phase
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Prime-Counting Initial State</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            The initial wavefunction encodes prime distribution information through the error 
            in the prime number theorem:
          </p>
          <div className="mathematical-content">
            ψ₀(x) ∝ [π(x) - Li(x)] × exp(-x²/(2σ²))
            <br /><br />
            where:
            <br />
            • π(x): prime counting function
            <br />
            • Li(x): logarithmic integral
            <br />
            • σ: Gaussian envelope width
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Numerical Implementation</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-accent">Time Evolution</h3>
            <div className="mathematical-content">
              Crank-Nicolson scheme:
              <br />
              ψⁿ⁺¹ = (1 - iΔt·H/2ℏ)⁻¹ × (1 + iΔt·H/2ℏ)ψⁿ
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-accent">Matrix Solver</h3>
            <div className="mathematical-content">
              Banded matrix structure:
              <br />
              • Tridiagonal kinetic term
              <br />
              • Sparse feedback coupling
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Convergence Criteria</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Multiple metrics ensure robust convergence to true zeta zero locations:
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <Card className="p-4 bg-secondary">
              <h4 className="font-medium text-accent">Energy Stability</h4>
              <div className="text-sm text-muted-foreground mt-1">
                |ΔE/E| &lt; 10⁻⁶
              </div>
            </Card>
            <Card className="p-4 bg-secondary">
              <h4 className="font-medium text-accent">Wavefunction Norm</h4>
              <div className="text-sm text-muted-foreground mt-1">
                |⟨ψ|ψ⟩ - 1| &lt; 10⁻⁸
              </div>
            </Card>
            <Card className="p-4 bg-secondary">
              <h4 className="font-medium text-accent">Peak Detection</h4>
              <div className="text-sm text-muted-foreground mt-1">
                SNR &gt; 20 dB
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
}