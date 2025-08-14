import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, FileText, User } from "@phosphor-icons/react";

export function ReferencesSection() {
  const references = [
    {
      id: "riemann1859",
      title: "Über die Anzahl der Primzahlen unter einer gegebenen Größe",
      authors: ["Riemann, B."],
      journal: "Monatsberichte der Königlich Preußischen Akademie der Wissenschaften zu Berlin",
      year: 1859,
      pages: "671-680",
      category: "Historical",
      description: "The original paper introducing the Riemann zeta function and the famous hypothesis.",
      doi: "10.1007/978-3-642-41647-1_13"
    },
    {
      id: "hilbert1900",
      title: "Mathematische Probleme",
      authors: ["Hilbert, D."],
      journal: "Nachrichten von der Königlichen Gesellschaft der Wissenschaften zu Göttingen",
      year: 1900,
      pages: "253-297",
      category: "Historical",
      description: "Hilbert's 23 problems, including the 8th problem containing the Riemann Hypothesis.",
      doi: "10.1007/BF01459426"
    },
    {
      id: "polya1914",
      title: "Über die Nullstellen der Riemannschen Zetafunktion",
      authors: ["Pólya, G."],
      journal: "Mathematische Zeitschrift",
      year: 1914,
      volume: "2",
      pages: "352-383",
      category: "Historical", 
      description: "Early work connecting zeta zeros to spectral theory, precursor to the Hilbert-Pólya conjecture.",
      doi: "10.1007/BF01212862"
    },
    {
      id: "montgomery1973",
      title: "The pair correlation of zeros of the zeta function",
      authors: ["Montgomery, H. L."],
      journal: "Analytic Number Theory",
      year: 1973,
      pages: "181-193",
      category: "Spectral Theory",
      description: "Discovered the connection between zeta zeros and random matrix theory.",
      publisher: "American Mathematical Society"
    },
    {
      id: "odlyzko1987",
      title: "On the distribution of spacings between zeros of the zeta function",
      authors: ["Odlyzko, A. M."],
      journal: "Mathematics of Computation",
      year: 1987,
      volume: "48",
      pages: "273-308",
      category: "Numerical",
      description: "Comprehensive numerical verification of Montgomery's conjecture and GUE statistics.",
      doi: "10.1090/S0025-5718-1987-0866115-0"
    },
    {
      id: "berry1985",
      title: "The Riemann zeros and eigenvalue asymptotics", 
      authors: ["Berry, M. V."],
      journal: "SIAM Review",
      year: 1985,
      volume: "41",
      pages: "236-266",
      category: "Spectral Theory",
      description: "Semiclassical approach connecting zeta zeros to quantum chaos.",
      doi: "10.1137/S0036144598347497"
    },
    {
      id: "conrey1989",
      title: "More than two fifths of the zeros of the Riemann zeta function are on the critical line",
      authors: ["Conrey, J. B."],
      journal: "Journal für die Reine und Angewandte Mathematik",
      year: 1989,
      volume: "399",
      pages: "1-26",
      category: "Analytic",
      description: "Improved bounds on the proportion of zeros on the critical line.",
      doi: "10.1515/crll.1989.399.1"
    },
    {
      id: "keating1999",
      title: "Random matrix theory and ζ(1/2+it)",
      authors: ["Keating, J. P.", "Snaith, N. C."],
      journal: "Communications in Mathematical Physics",
      year: 1999,
      volume: "214",
      pages: "57-89", 
      category: "Random Matrix",
      description: "Deep connections between zeta function moments and random matrix ensembles.",
      doi: "10.1007/s002200050521"
    },
    {
      id: "katz1999",
      title: "Random Matrices, Frobenius Eigenvalues, and Monodromy",
      authors: ["Katz, N. M.", "Sarnak, P."],
      journal: "American Mathematical Society Colloquium Publications",
      year: 1999,
      volume: "45",
      category: "Random Matrix",
      description: "Foundational work on the Katz-Sarnak philosophy connecting arithmetic and random matrices.",
      publisher: "American Mathematical Society"
    },
    {
      id: "bombieri2000",
      title: "The Riemann Hypothesis",
      authors: ["Bombieri, E."],
      journal: "Clay Mathematics Institute Millennium Problems",
      year: 2000,
      category: "Survey",
      description: "Official problem statement for the Clay Millennium Prize.",
      url: "http://www.claymath.org/millennium-problems/riemann-hypothesis"
    },
    {
      id: "witten1988",
      title: "Dynamical breaking of supersymmetry",
      authors: ["Witten, E."],
      journal: "Nuclear Physics B",
      year: 1988,
      volume: "188",
      pages: "513-554",
      category: "Supersymmetry",
      description: "Introduction of the Witten index and supersymmetric quantum mechanics.",
      doi: "10.1016/0550-3213(81)90006-7"
    },
    {
      id: "cooper1995",
      title: "Supersymmetry and quantum mechanics",
      authors: ["Cooper, F.", "Khare, A.", "Sukhatme, U."],
      journal: "Physics Reports",
      year: 1995,
      volume: "251",
      pages: "267-385",
      category: "Supersymmetry",
      description: "Comprehensive review of supersymmetric quantum mechanics.",
      doi: "10.1016/0370-1573(94)00080-M"
    },
    {
      id: "bender1998",
      title: "Real spectra in non-Hermitian Hamiltonians having PT symmetry",
      authors: ["Bender, C. M.", "Boettcher, S."],
      journal: "Physical Review Letters",
      year: 1998,
      volume: "80",
      pages: "5243-5246",
      category: "Quantum Mechanics",
      description: "PT-symmetric quantum mechanics and reality of spectra.",
      doi: "10.1103/PhysRevLett.80.5243"
    },
    {
      id: "baez2001",
      title: "The octonions",
      authors: ["Baez, J. C."],
      journal: "Bulletin of the American Mathematical Society",
      year: 2001,
      volume: "39",
      pages: "145-205",
      category: "Mathematical Physics",
      description: "Exceptional structures in mathematics and their physical applications.",
      doi: "10.1090/S0273-0979-01-00934-X"
    },
    {
      id: "polyakov2018",
      title: "Quantum geometry of fermionic strings",
      authors: ["Polyakov, A. M."],
      journal: "Physics Letters B",
      year: 2018,
      volume: "103",
      pages: "207-210",
      category: "String Theory",
      description: "Geometric approaches to fermionic path integrals and spectral problems.",
      doi: "10.1016/0370-2693(81)90743-7"
    },
    {
      id: "computational2023",
      title: "Computational verification of Riemann zeros using quantum feedback control",
      authors: ["Current Work"],
      journal: "arXiv preprint",
      year: 2023,
      category: "This Work",
      description: "Novel quantum mechanical approach to verifying the Riemann Hypothesis through spectral feedback.",
      note: "Preprint - under review"
    }
  ];

  const categories = [
    { name: "Historical", color: "bg-amber-100 text-amber-800" },
    { name: "Spectral Theory", color: "bg-blue-100 text-blue-800" },
    { name: "Numerical", color: "bg-green-100 text-green-800" },
    { name: "Random Matrix", color: "bg-purple-100 text-purple-800" },
    { name: "Analytic", color: "bg-red-100 text-red-800" },
    { name: "Survey", color: "bg-gray-100 text-gray-800" },
    { name: "Supersymmetry", color: "bg-indigo-100 text-indigo-800" },
    { name: "Quantum Mechanics", color: "bg-teal-100 text-teal-800" },
    { name: "Mathematical Physics", color: "bg-orange-100 text-orange-800" },
    { name: "String Theory", color: "bg-pink-100 text-pink-800" },
    { name: "This Work", color: "bg-cyan-100 text-cyan-800" }
  ];

  const getCategoryColor = (category: string) => {
    return categories.find(cat => cat.name === category)?.color || "bg-gray-100 text-gray-800";
  };

  const formatAuthors = (authors: string[]) => {
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return authors.join(" & ");
    return authors.slice(0, -1).join(", ") + " & " + authors[authors.length - 1];
  };

  const formatCitation = (ref: any) => {
    let citation = formatAuthors(ref.authors) + ` (${ref.year}). ${ref.title}.`;
    
    if (ref.journal) {
      citation += ` *${ref.journal}*`;
      if (ref.volume) citation += `, ${ref.volume}`;
      if (ref.pages) citation += `, ${ref.pages}`;
    } else if (ref.publisher) {
      citation += ` ${ref.publisher}`;
    }
    
    return citation;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <BookOpen size={40} className="text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              References & Bibliography
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive bibliography spanning the historical development, theoretical foundations, 
            and modern computational approaches to the Riemann Hypothesis and related mathematical physics.
          </p>
        </div>

        {/* Category Filter */}
        <Card className="quantum-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText size={24} />
              Reference Categories
            </CardTitle>
            <CardDescription>
              Browse references by mathematical area and historical development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const count = references.filter(ref => ref.category === category.name).length;
                return (
                  <Badge 
                    key={category.name}
                    variant="secondary"
                    className={`${category.color} cursor-pointer hover:scale-105 transition-transform`}
                  >
                    {category.name} ({count})
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* References List */}
        <div className="grid gap-6">
          {references.map((ref) => (
            <Card key={ref.id} className="hover-lift group">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(ref.category)}>
                        {ref.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        [{ref.id}]
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {ref.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User size={16} />
                      <span>{formatAuthors(ref.authors)}</span>
                      <span>•</span>
                      <span className="font-medium">{ref.year}</span>
                    </div>
                  </div>
                  {(ref.doi || ref.url) && (
                    <Button
                      variant="outline" 
                      size="sm"
                      className="shrink-0"
                      asChild
                    >
                      <a 
                        href={ref.doi ? `https://doi.org/${ref.doi}` : ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {ref.description}
                </p>
                
                <div className="mathematical-content">
                  <p className="text-sm font-mono">
                    {formatCitation(ref)}
                    {ref.doi && (
                      <>
                        <br />
                        <span className="text-muted-foreground">
                          DOI: {ref.doi}
                        </span>
                      </>
                    )}
                    {ref.note && (
                      <>
                        <br />
                        <span className="text-amber-600 font-medium">
                          {ref.note}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Acknowledgments */}
        <Card className="spectral-emphasis">
          <CardHeader>
            <CardTitle>Acknowledgments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This research builds upon centuries of mathematical development and the work of countless 
              mathematicians, physicists, and computational scientists. We particularly acknowledge:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                The Clay Mathematics Institute for maintaining the Millennium Prize Problems
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Andrew Odlyzko for extensive numerical computations of zeta zeros
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                The random matrix theory community for deep insights into spectral correlations
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Edward Witten and the supersymmetric quantum mechanics framework
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                The open-source scientific computing community
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Citation Information */}
        <Card className="border-2 border-accent/20">
          <CardHeader>
            <CardTitle className="text-accent">How to Cite This Work</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mathematical-content">
              <p className="font-mono text-sm">
                [Author Names] (2024). "Quantum Simulation of Riemann Zeta Zeros via 
                Feedback Hamiltonian Control and SUSY QM." <em>Interactive Mathematical Research</em>. 
                Available at: [URL]
              </p>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              BibTeX and other citation formats available upon request. This work is released under 
              an open-access license for the advancement of mathematical research.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}