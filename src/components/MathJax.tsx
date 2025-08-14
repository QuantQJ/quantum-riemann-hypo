// Simple MathJax substitute using HTML entities and formatting
import React from 'react';

interface MathJaxProps {
  children: string;
  inline?: boolean;
}

export function MathJax({ children, inline = false }: MathJaxProps) {
  // Convert LaTeX-like strings to HTML with entities
  const processLatex = (latex: string) => {
    return latex
      // Display math delimiters
      .replace(/\$\$(.*?)\$\$/g, '<div class="math-display">$1</div>')
      .replace(/\\\[(.*?)\\\]/g, '<div class="math-display">$1</div>')
      // Inline math delimiters  
      .replace(/\$(.*?)\$/g, '<span class="math-inline">$1</span>')
      .replace(/\\\((.*?)\\\)/g, '<span class="math-inline">$1</span>')
      // Basic LaTeX commands
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '<span class="frac"><span class="num">$1</span>/<span class="den">$2</span></span>')
      .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
      .replace(/\\hbar/g, 'ℏ')
      .replace(/\\gamma/g, 'γ')
      .replace(/\\alpha/g, 'α')  
      .replace(/\\beta/g, 'β')
      .replace(/\\Delta/g, 'Δ')
      .replace(/\\lambda/g, 'λ')
      .replace(/\\pi/g, 'π')
      .replace(/\\theta/g, 'θ')
      .replace(/\\phi/g, 'φ')
      .replace(/\\psi/g, 'ψ')
      .replace(/\\chi/g, 'χ')
      .replace(/\\sigma/g, 'σ')
      .replace(/\\Sigma/g, 'Σ')
      .replace(/\\mu/g, 'μ')
      .replace(/\\eta/g, 'η')
      .replace(/\\rho/g, 'ρ')
      .replace(/\\zeta/g, 'ζ')
      .replace(/\\infty/g, '∞')
      .replace(/\\leq/g, '≤')
      .replace(/\\geq/g, '≥')
      .replace(/\\neq/g, '≠')
      .replace(/\\approx/g, '≈')
      .replace(/\\sim/g, '∼')
      .replace(/\\pm/g, '±')
      .replace(/\\cdot/g, '·')
      .replace(/\\times/g, '×')
      .replace(/\\sum/g, 'Σ')
      .replace(/\\prod/g, 'Π')
      .replace(/\\int/g, '∫')
      .replace(/\\partial/g, '∂')
      .replace(/\\nabla/g, '∇')
      .replace(/\\ell/g, 'ℓ')
      .replace(/\\mathbb\{([^}]+)\}/g, '$1') // Strip mathbb for now
      .replace(/\\mathcal\{([^}]+)\}/g, '$1') // Strip mathcal for now
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\\mathrm\{([^}]+)\}/g, '$1')
      // Subscripts and superscripts
      .replace(/_\{([^}]+)\}/g, '<sub>$1</sub>')
      .replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>')
      .replace(/_([a-zA-Z0-9])/g, '<sub>$1</sub>')
      .replace(/\^([a-zA-Z0-9])/g, '<sup>$1</sup>')
      // Remove remaining backslashes
      .replace(/\\/g, '');
  };

  const className = inline ? 'math-inline' : 'math-display';
  
  return (
    <span 
      className={className}
      dangerouslySetInnerHTML={{ __html: processLatex(children) }}
    />
  );
}

export function MathJaxContext({ children }: { children: React.ReactNode }) {
  return <div className="mathjax-context">{children}</div>;
}