# Quantum Riemann Research Application

## Overview

This is an interactive web application demonstrating quantum simulation of Riemann Zeta zeros via feedback Hamiltonian control and SUSY QM. The app provides theoretical foundations, parameter exploration, and mathematical verification tools for the Riemann Hypothesis research framework.

## Features

- **Interactive Theory Section**: Complete mathematical framework with LaTeX rendering
- **Parameter Exploration**: Real-time parameter adjustment with validation feedback  
- **SUSY Integration**: Supersymmetric quantum mechanics analysis tools
- **Verification Tools**: Spectral statistics validation and error analysis
- **Mathematical Workbench**: Interactive computation environment
- **Zero Visualization**: Dynamic plotting of zeta zeros and convergence

## Deployment Options

### Option 1: GitHub Pages (Recommended)

1. **Fork this repository** to your GitHub account
2. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Select "GitHub Actions" as the source
   - Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v3
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: './dist'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

3. **Push to main branch** - the site will automatically deploy
4. **Access your site** at `https://[username].github.io/[repository-name]`

### Option 2: Vercel (Easy deployment)

1. **Import project** at [vercel.com](https://vercel.com)
2. **Connect your GitHub** repository
3. **Deploy** - Vercel auto-detects Vite and builds correctly
4. **Custom domain** available on free tier

### Option 3: Netlify

1. **Drag and drop** the built `dist` folder to [netlify.com/drop](https://netlify.com/drop)
2. **Or connect GitHub** for automatic deployments
3. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Option 4: Local Development

```bash
# Clone the repository
git clone [your-repo-url]
cd quantum-riemann-research

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Sharing Your Work

### For Academic Collaboration

**Share the GitHub repository URL**:
- Colleagues can fork and contribute
- Issues and discussions enabled
- Version controlled research progress

**Live demo URL** (after deployment):
- Immediate access to interactive features
- No technical setup required for reviewers
- Mobile and tablet compatible

### For Publication Supplements

**Export static content**:
- Mathematical proofs render as static HTML
- Screenshots of parameter exploration
- Generated plots and visualizations

**Embed in papers**:
- QR codes linking to live demos
- Supplementary material hosting
- Interactive figure references

## Technical Requirements

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers supported

### Dependencies
- React 18+
- TypeScript 5+
- Tailwind CSS 3+
- Radix UI components
- Mathematical rendering libraries

## File Structure

```
src/
├── components/           # React components
│   ├── Navigation.tsx   # Main navigation
│   ├── TheorySection.tsx    # Mathematical theory
│   ├── ParametersSection.tsx # Parameter controls
│   ├── SusySection.tsx      # SUSY analysis
│   ├── VerificationSection.tsx # Validation tools
│   └── ui/              # Reusable UI components
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── App.tsx             # Main application
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Configuration

### Environment Variables
```env
# Optional: Analytics
VITE_GA_ID=your-google-analytics-id

# Optional: API endpoints for advanced features
VITE_API_BASE=https://api.yourservice.com
```

### Customization
- Theme colors in `src/index.css`
- Navigation structure in `Navigation.tsx`
- Mathematical content in respective section components

## Performance Optimization

### For Large Datasets
- Implement virtual scrolling for zero lists
- Lazy load heavy mathematical computations
- Cache computed results in localStorage

### For Mobile
- Responsive mathematical typography
- Touch-optimized parameter controls
- Progressive web app features

## Troubleshooting

### Build Errors
- Ensure Node.js 16+ is installed
- Clear `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check for TypeScript errors: `npm run type-check`

### Runtime Errors
- Check browser console for JavaScript errors
- Verify all dependencies are properly installed
- Test in different browsers

### Performance Issues
- Monitor bundle size: `npm run analyze`
- Optimize images and assets
- Enable gzip compression on server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - See LICENSE file for details

## Citation

```bibtex
@software{quantum_riemann_2024,
  title={Quantum Riemann Research: Interactive Framework for Zeta Zero Analysis},
  author={[Your Name]},
  year={2024},
  url={https://github.com/[username]/quantum-riemann-research}
}
```

## Contact

For questions about the mathematical framework or technical implementation, please open a GitHub issue or contact [your-email@domain.com].