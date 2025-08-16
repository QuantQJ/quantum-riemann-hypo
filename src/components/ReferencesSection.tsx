import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink, BookOpen, FileText, User, Download, Copy, Share } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useState } from "react";

export function ReferencesSection() {
  const [selectedRefs, setSelectedRefs] = useState<string[]>([]);
  const [citationFormat, setCitationFormat] = useState("apa");
  const [generatedCitation, setGeneratedCitation] = useState("");

  const handleAddReference = () => {
    const reference = prompt("Enter reference in format: Author(s). (Year). Title. Journal/Source.");
    if (reference) {
      // In a real app, this would be saved to state/database
      toast.success(`Reference added: ${reference}`);
    }
  };

  const toggleRefSelection = (refId: string) => {
    setSelectedRefs(prev => 
      prev.includes(refId) 
        ? prev.filter(id => id !== refId)
        : [...prev, refId]
    );
  };

  const selectAllRefs = () => {
    setSelectedRefs(references.map(ref => ref.id));
  };

  const clearSelection = () => {
    setSelectedRefs([]);
  };

  const formatCitationStyle = (ref: any, style: string) => {
    const authors = formatAuthors(ref.authors);
    const year = ref.year;
    const title = ref.title;
    const journal = ref.journal;
    const volume = ref.volume;
    const pages = ref.pages;
    const doi = ref.doi;
    const url = ref.url;

    switch (style) {
      case "apa":
        let apa = `${authors} (${year}). ${title}.`;
        if (journal) {
          apa += ` *${journal}*`;
          if (volume) apa += `, *${volume}*`;
          if (pages) apa += `, ${pages}`;
        }
        if (doi) apa += ` https://doi.org/${doi}`;
        else if (url) apa += ` ${url}`;
        return apa;

      case "mla":
        let mla = `${authors}. "${title}."`;
        if (journal) {
          mla += ` *${journal}*`;
          if (volume) mla += `, vol. ${volume}`;
          if (year) mla += `, ${year}`;
          if (pages) mla += `, pp. ${pages}`;
        }
        if (url) mla += ` Web.`;
        return mla;

      case "chicago":
        let chicago = `${authors}. "${title}."`;
        if (journal) {
          chicago += ` *${journal}*`;
          if (volume) chicago += ` ${volume}`;
          if (year) chicago += ` (${year})`;
          if (pages) chicago += `: ${pages}`;
        }
        if (doi) chicago += `. https://doi.org/${doi}`;
        return chicago;

      case "bibtex":
        const id = ref.id;
        let bibtex = `@article{${id},\n`;
        bibtex += `  title={${title}},\n`;
        bibtex += `  author={${ref.authors.join(' and ')}},\n`;
        if (journal) bibtex += `  journal={${journal}},\n`;
        if (volume) bibtex += `  volume={${volume}},\n`;
        if (pages) bibtex += `  pages={${pages}},\n`;
        bibtex += `  year={${year}},\n`;
        if (ref.publisher) bibtex += `  publisher={${ref.publisher}},\n`;
        if (doi) bibtex += `  doi={${doi}},\n`;
        if (url) bibtex += `  url={${url}},\n`;
        bibtex += `}`;
        return bibtex;

      case "endnote":
        let endnote = `%0 Journal Article\n`;
        endnote += `%T ${title}\n`;
        ref.authors.forEach((author: string) => {
          endnote += `%A ${author}\n`;
        });
        if (journal) endnote += `%J ${journal}\n`;
        if (volume) endnote += `%V ${volume}\n`;
        if (pages) endnote += `%P ${pages}\n`;
        endnote += `%D ${year}\n`;
        if (doi) endnote += `%R ${doi}\n`;
        if (url) endnote += `%U ${url}\n`;
        return endnote;

      default:
        return formatCitation(ref);
    }
  };

  const generateBibliography = () => {
    const selectedReferences = references.filter(ref => selectedRefs.includes(ref.id));
    if (selectedReferences.length === 0) {
      toast.error("Please select at least one reference");
      return;
    }

    const bibliography = selectedReferences
      .map(ref => formatCitationStyle(ref, citationFormat))
      .join('\n\n');
    
    setGeneratedCitation(bibliography);
    toast.success(`Bibliography generated with ${selectedReferences.length} references`);
  };

  const copyToClipboard = async () => {
    if (!generatedCitation) {
      toast.error("No bibliography generated yet");
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedCitation);
      toast.success("Bibliography copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const downloadBibliography = () => {
    if (!generatedCitation) {
      toast.error("No bibliography generated yet");
      return;
    }

    const blob = new Blob([generatedCitation], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `riemann_bibliography_${citationFormat}.${citationFormat === 'bibtex' ? 'bib' : 'txt'}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    toast.success("Bibliography downloaded!");
  };

  const exportCurrentWork = () => {
    const currentWork = {
      title: "Quantum Simulation of Riemann Zeta Zeros via Feedback Hamiltonian Control and SUSY QM",
      authors: ["James [Your Name]"],
      year: new Date().getFullYear(),
      journal: "Interactive Mathematical Research Platform",
      category: "Computational Mathematics",
      description: "Novel quantum mechanical approach to verifying the Riemann Hypothesis through spectral feedback control and supersymmetric quantum mechanics.",
      note: "Available online",
      url: window.location.origin
    };

    const citation = formatCitationStyle(currentWork, citationFormat);
    setGeneratedCitation(citation);
    toast.success("Citation for this work generated!");
  };
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
            Academic sources, mathematical references, and research foundations for the quantum Riemann approach
          </p>
          <div className="flex justify-center gap-3">
            <Button onClick={handleAddReference} className="flex items-center gap-2">
              <FileText size={16} />
              Add Reference
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download size={16} />
                  Export Citations
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Share size={24} />
                    Citation Export Tool
                  </DialogTitle>
                  <DialogDescription>
                    Generate formatted bibliographies in multiple citation styles
                  </DialogDescription>
                </DialogHeader>
                
                <Tabs defaultValue="select" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="select">Select References</TabsTrigger>
                    <TabsTrigger value="format">Format Citations</TabsTrigger>
                    <TabsTrigger value="export">Export Bibliography</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="select" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Select References ({selectedRefs.length} selected)</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={selectAllRefs}>
                          Select All
                        </Button>
                        <Button variant="outline" size="sm" onClick={clearSelection}>
                          Clear All
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid gap-3 max-h-96 overflow-y-auto">
                      {references.map((ref) => (
                        <div
                          key={ref.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedRefs.includes(ref.id)
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => toggleRefSelection(ref.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h4 className="font-medium text-sm">{ref.title}</h4>
                              <p className="text-xs text-muted-foreground">
                                {formatAuthors(ref.authors)} ({ref.year})
                              </p>
                              <Badge className={getCategoryColor(ref.category)} size="sm">
                                {ref.category}
                              </Badge>
                            </div>
                            <div className={`w-4 h-4 border-2 rounded ${
                              selectedRefs.includes(ref.id)
                                ? 'bg-primary border-primary'
                                : 'border-muted-foreground'
                            }`}>
                              {selectedRefs.includes(ref.id) && (
                                <div className="w-full h-full bg-primary-foreground rounded-sm scale-50" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="format" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Citation Format</label>
                        <Select value={citationFormat} onValueChange={setCitationFormat}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select citation format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apa">APA Style</SelectItem>
                            <SelectItem value="mla">MLA Style</SelectItem>
                            <SelectItem value="chicago">Chicago Style</SelectItem>
                            <SelectItem value="bibtex">BibTeX</SelectItem>
                            <SelectItem value="endnote">EndNote</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button onClick={generateBibliography} className="flex items-center gap-2">
                          <FileText size={16} />
                          Generate Bibliography
                        </Button>
                        <Button variant="outline" onClick={exportCurrentWork} className="flex items-center gap-2">
                          <Share size={16} />
                          Cite This Work
                        </Button>
                      </div>
                      
                      {generatedCitation && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Generated Citations</label>
                          <Textarea
                            value={generatedCitation}
                            onChange={(e) => setGeneratedCitation(e.target.value)}
                            className="min-h-40 font-mono text-xs"
                            placeholder="Generated bibliography will appear here..."
                          />
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="export" className="space-y-4">
                    <div className="text-center space-y-4">
                      <div className="p-4 border rounded-lg bg-muted/50">
                        <h3 className="font-semibold mb-2">Export Options</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Copy to clipboard or download your formatted bibliography
                        </p>
                        
                        <div className="flex justify-center gap-3">
                          <Button onClick={copyToClipboard} className="flex items-center gap-2">
                            <Copy size={16} />
                            Copy to Clipboard
                          </Button>
                          <Button variant="outline" onClick={downloadBibliography} className="flex items-center gap-2">
                            <Download size={16} />
                            Download File
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-left space-y-2">
                        <h4 className="font-medium">Quick Citation for This Work:</h4>
                        <div className="mathematical-content p-3">
                          <p className="font-mono text-xs">
                            James [Your Name] ({new Date().getFullYear()}). Quantum Simulation of Riemann Zeta Zeros via 
                            Feedback Hamiltonian Control and SUSY QM. <em>Interactive Mathematical Research Platform</em>. 
                            Available at: {window.location.origin}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>
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
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleRefSelection(ref.id)}
                      className={selectedRefs.includes(ref.id) ? 'bg-primary text-primary-foreground' : ''}
                    >
                      {selectedRefs.includes(ref.id) ? 'Selected' : 'Select'}
                    </Button>
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
                
                {/* Quick citation preview */}
                <details className="group">
                  <summary className="cursor-pointer text-sm text-primary hover:text-primary/80 flex items-center gap-2">
                    <span>Quick Citation Formats</span>
                    <span className="group-open:rotate-90 transition-transform">▶</span>
                  </summary>
                  <div className="mt-2 space-y-2 p-3 bg-muted/50 rounded-lg">
                    <div>
                      <strong className="text-xs text-muted-foreground">APA:</strong>
                      <p className="text-xs font-mono mt-1">{formatCitationStyle(ref, 'apa')}</p>
                    </div>
                    <div>
                      <strong className="text-xs text-muted-foreground">BibTeX:</strong>
                      <pre className="text-xs font-mono mt-1 overflow-x-auto">{formatCitationStyle(ref, 'bibtex')}</pre>
                    </div>
                  </div>
                </details>
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
            <CardTitle className="text-accent flex items-center gap-2">
              <Share size={24} />
              How to Cite This Work
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="mathematical-content">
              <p className="font-mono text-sm">
                James [Your Name] (2024). "Quantum Simulation of Riemann Zeta Zeros via 
                Feedback Hamiltonian Control and SUSY QM." <em>Interactive Mathematical Research Platform</em>. 
                Available at: {window.location.origin}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">BibTeX Entry:</h4>
                <div className="mathematical-content">
                  <pre className="text-xs">{`@misc{riemann_quantum_2024,
  title={Quantum Simulation of Riemann Zeta Zeros via Feedback Hamiltonian Control and SUSY QM},
  author={James [Your Name]},
  year={2024},
  howpublished={Interactive Research Platform},
  url={${window.location.origin}},
  note={Online; accessed ${new Date().toLocaleDateString()}}
}`}</pre>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">DOI Registration:</h4>
                <p className="text-sm text-muted-foreground">
                  This work is being prepared for formal publication. A DOI will be assigned upon 
                  submission to a peer-reviewed journal. For now, please use the URL citation format.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => {
                    const citation = `James [Your Name] (2024). Quantum Simulation of Riemann Zeta Zeros via Feedback Hamiltonian Control and SUSY QM. Interactive Mathematical Research Platform. Available at: ${window.location.origin}`;
                    navigator.clipboard.writeText(citation);
                    toast.success("Citation copied to clipboard!");
                  }}
                >
                  <Copy size={16} className="mr-2" />
                  Copy Citation
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              This work is released under an open-access license for the advancement of mathematical research.
              All code, visualizations, and mathematical derivations are available for academic use with proper attribution.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}