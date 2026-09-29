import React from 'react';

/**
 * STEMDiagramVisual
 * Renders high-fidelity, color-coded, 100% offline vector diagrams
 * for all STEM curriculum topics (Biology, Physics, Math, CS & AI, Chemistry).
 */
export const STEMDiagramVisual = ({ topicTitle = '', slideIndex = 0, isPlaying = false }) => {
  const t = (topicTitle || '').toLowerCase();

  // 1. Biology & Life Sciences (Photosynthesis, Cells, DNA, CRISPR, Genetics)
  if (t.includes('bio') || t.includes('photo') || t.includes('plant') || t.includes('cell') || t.includes('gene') || t.includes('dna') || t.includes('crispr')) {
    if (slideIndex <= 3) {
      // Photosynthesis & Chloroplast Diagram
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full drop-shadow-md select-none">
          <defs>
            <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
          </defs>

          {/* Background card container */}
          <rect x="10" y="10" width="300" height="200" rx="16" fill="#064E3B" fillOpacity="0.4" stroke="#10B981" strokeWidth="1.5" />

          {/* Sun with Glowing Energy Rays */}
          <circle cx="45" cy="45" r="22" fill="url(#sunGrad)" />
          <g stroke="#FDE047" strokeWidth="2" strokeDasharray="3 3" opacity={isPlaying ? '1' : '0.7'}>
            <line x1="72" y1="52" x2="110" y2="80" />
            <line x1="68" y1="65" x2="95" y2="105" />
            <line x1="50" y1="72" x2="70" y2="115" />
          </g>
          <text x="45" y="49" fill="#78350F" fontSize="10" fontWeight="bold" textAnchor="middle">Sunlight</text>

          {/* Chloroplast / Leaf Silhouette */}
          <path d="M 100 135 C 100 80, 240 70, 265 135 C 240 185, 100 190, 100 135 Z" fill="url(#leafGrad)" stroke="#34D399" strokeWidth="2" />
          
          {/* Thylakoid Grana Discs inside Chloroplast */}
          <g fill="#065F46" stroke="#6EE7B7" strokeWidth="1.5">
            {/* Stack 1 */}
            <ellipse cx="145" cy="120" rx="16" ry="6" />
            <ellipse cx="145" cy="130" rx="16" ry="6" />
            <ellipse cx="145" cy="140" rx="16" ry="6" />
            {/* Stack 2 */}
            <ellipse cx="190" cy="115" rx="16" ry="6" />
            <ellipse cx="190" cy="125" rx="16" ry="6" />
            <ellipse cx="190" cy="135" rx="16" ry="6" />
            <ellipse cx="190" cy="145" rx="16" ry="6" />
            {/* Stack 3 */}
            <ellipse cx="230" cy="128" rx="14" ry="5" />
            <ellipse cx="230" cy="138" rx="14" ry="5" />
          </g>

          {/* Connecting Stroma Lamellae */}
          <line x1="160" y1="130" x2="175" y2="125" stroke="#6EE7B7" strokeWidth="2" />
          <line x1="205" y1="135" x2="216" y2="138" stroke="#6EE7B7" strokeWidth="2" />

          {/* Influx Reactants Labels */}
          <rect x="90" y="24" width="70" height="20" rx="6" fill="#1E293B" stroke="#38BDF8" strokeWidth="1" />
          <text x="125" y="38" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle">6 CO₂ + 6 H₂O</text>

          {/* Outflow Products Labels */}
          <rect x="180" y="178" width="115" height="22" rx="6" fill="#1E293B" stroke="#4ADE80" strokeWidth="1" />
          <text x="237" y="193" fill="#4ADE80" fontSize="10" fontWeight="bold" textAnchor="middle">C₆H₁₂O₆ (Sugar) + 6 O₂</text>

          {/* Label Badge */}
          <rect x="20" y="180" width="85" height="18" rx="5" fill="#047857" />
          <text x="62" y="193" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">Chloroplast</text>
        </svg>
      );
    } else {
      // DNA Double Helix & Molecular Genetics
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full drop-shadow-md select-none">
          <rect x="10" y="10" width="300" height="200" rx="16" fill="#0F172A" stroke="#0D9488" strokeWidth="1.5" />
          
          {/* DNA Strand Ribbons */}
          <path d="M 40 60 Q 90 140, 140 60 T 240 60 T 290 140" fill="none" stroke="#06B6D4" strokeWidth="3.5" />
          <path d="M 40 140 Q 90 60, 140 140 T 240 140 T 290 60" fill="none" stroke="#10B981" strokeWidth="3.5" />

          {/* Base Pair Rungs */}
          {[
            { x: 55, y1: 85, y2: 115, a: 'A', b: 'T' },
            { x: 90, y1: 100, y2: 100, a: 'C', b: 'G' },
            { x: 125, y1: 115, y2: 85, a: 'T', b: 'A' },
            { x: 160, y1: 80, y2: 120, a: 'G', b: 'C' },
            { x: 195, y1: 100, y2: 100, a: 'A', b: 'T' },
            { x: 230, y1: 120, y2: 80, a: 'C', b: 'G' },
            { x: 265, y1: 85, y2: 115, a: 'T', b: 'A' }
          ].map((pair, i) => (
            <g key={i}>
              <line x1={pair.x} y1={pair.y1} x2={pair.x} y2={pair.y2} stroke="#CBD5E1" strokeWidth="2.5" />
              <circle cx={pair.x} cy={pair.y1} r="4" fill="#38BDF8" />
              <circle cx={pair.x} cy={pair.y2} r="4" fill="#34D399" />
            </g>
          ))}

          {/* Title and Gene Annotations */}
          <rect x="25" y="22" width="130" height="20" rx="6" fill="#1E293B" stroke="#38BDF8" strokeWidth="1" />
          <text x="90" y="36" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle">DNA Replication Fork</text>

          <rect x="175" y="175" width="125" height="22" rx="6" fill="#1E293B" stroke="#F59E0B" strokeWidth="1" />
          <text x="237" y="190" fill="#FBBF24" fontSize="10" fontWeight="bold" textAnchor="middle">Base Pairs: A-T & C-G</text>
        </svg>
      );
    }
  }

  // 2. Physics & Classical Mechanics (Forces, Vectors, Circuits, Motion, Magnetism)
  if (t.includes('physic') || t.includes('newton') || t.includes('vector') || t.includes('force') || t.includes('circuit') || t.includes('motion') || t.includes('electric') || t.includes('gravity')) {
    if (slideIndex <= 5) {
      // Newton's Second Law & Incline Plane Vectors
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full drop-shadow-md select-none">
          <rect x="10" y="10" width="300" height="200" rx="16" fill="#1E1B4B" stroke="#6366F1" strokeWidth="1.5" />
          
          {/* Inclined Plane Wedge */}
          <polygon points="40,175 270,175 270,75" fill="#312E81" stroke="#818CF8" strokeWidth="2" />
          
          {/* Sliding Block */}
          <g transform="rotate(-23.5, 160, 125)">
            <rect x="135" y="105" width="50" height="35" rx="5" fill="#F97316" stroke="#FFEDD5" strokeWidth="2" />
            <text x="160" y="126" fill="#FFFFFF" fontSize="12" fontWeight="extrabold" textAnchor="middle">m</text>
          </g>

          {/* Normal Force Vector (Perpendicular to plane) */}
          <line x1="160" y1="110" x2="140" y2="60" stroke="#06B6D4" strokeWidth="3" markerEnd="url(#arrowCyan)" />
          <polygon points="140,55 135,68 145,66" fill="#06B6D4" />
          <text x="125" y="58" fill="#38BDF8" fontSize="11" fontWeight="bold">Fn</text>

          {/* Gravity Vector (Straight down) */}
          <line x1="160" y1="125" x2="160" y2="185" stroke="#A855F7" strokeWidth="3" />
          <polygon points="160,190 155,178 165,178" fill="#A855F7" />
          <text x="168" y="185" fill="#C084FC" fontSize="11" fontWeight="bold">Fg = mg</text>

          {/* Net Acceleration Vector down slope */}
          <line x1="160" y1="125" x2="80" y2="160" stroke="#EF4444" strokeWidth="3" />
          <polygon points="75,162 88,154 84,166" fill="#EF4444" />
          <text x="75" y="150" fill="#F87171" fontSize="11" fontWeight="bold">F_net = m·a</text>

          {/* Formula Callout */}
          <rect x="25" y="24" width="130" height="22" rx="6" fill="#1E293B" stroke="#F97316" strokeWidth="1" />
          <text x="90" y="39" fill="#FB923C" fontSize="11" fontWeight="bold" textAnchor="middle">ΣF = m · a</text>
        </svg>
      );
    } else {
      // Electrical Circuit & Ohm's Law
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full drop-shadow-md select-none">
          <rect x="10" y="10" width="300" height="200" rx="16" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
          
          {/* Circuit Loop Wires */}
          <rect x="50" y="50" width="220" height="120" rx="8" fill="none" stroke="#94A3B8" strokeWidth="3" />

          {/* DC Battery Symbol */}
          <rect x="44" y="90" width="12" height="40" fill="#0F172A" />
          <line x1="40" y1="100" x2="60" y2="100" stroke="#EF4444" strokeWidth="4" />
          <line x1="45" y1="115" x2="55" y2="115" stroke="#38BDF8" strokeWidth="3" />
          <text x="25" y="103" fill="#EF4444" fontSize="12" fontWeight="bold">+</text>
          <text x="25" y="120" fill="#38BDF8" fontSize="12" fontWeight="bold">-</text>

          {/* Resistor Zig-Zag */}
          <rect x="130" y="44" width="60" height="12" fill="#0F172A" />
          <path d="M 130 50 L 140 40 L 150 60 L 160 40 L 170 60 L 180 40 L 190 50" fill="none" stroke="#F59E0B" strokeWidth="3" />
          <text x="160" y="34" fill="#FBBF24" fontSize="11" fontWeight="bold" textAnchor="middle">Resistor R</text>

          {/* Light Bulb / Load */}
          <circle cx="160" cy="170" r="16" fill="#FDE047" fillOpacity="0.8" stroke="#EAB308" strokeWidth="2" />
          <line x1="152" y1="165" x2="168" y2="175" stroke="#78350F" strokeWidth="2" />
          <line x1="152" y1="175" x2="168" y2="165" stroke="#78350F" strokeWidth="2" />

          {/* Current Flow Direction Arrow */}
          <g fill="#10B981" stroke="#10B981">
            <line x1="100" y1="42" x2="120" y2="42" strokeWidth="2" />
            <polygon points="124,42 118,39 118,45" />
            <text x="110" y="32" fontSize="9" fontWeight="bold" stroke="none">I (Current)</text>
          </g>

          {/* Ohm's Law Badge */}
          <rect x="25" y="180" width="120" height="22" rx="6" fill="#1E293B" stroke="#10B981" strokeWidth="1" />
          <text x="85" y="195" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle">Ohm's Law: V = I · R</text>
        </svg>
      );
    }
  }

  // 3. Mathematics (Algebra, Linear Equations, Calculus, Coordinate Planes)
  if (t.includes('math') || t.includes('algebra') || t.includes('calculus') || t.includes('equat') || t.includes('function') || t.includes('deriv') || t.includes('ratio')) {
    if (slideIndex <= 5) {
      // Algebraic Balance Scale & Coordinate Plane
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full drop-shadow-md select-none">
          <rect x="10" y="10" width="300" height="200" rx="16" fill="#172554" stroke="#3B82F6" strokeWidth="1.5" />

          {/* 2D Cartesian Coordinate Grid */}
          <g stroke="#1E3A8A" strokeWidth="1">
            <line x1="50" y1="40" x2="50" y2="180" />
            <line x1="90" y1="40" x2="90" y2="180" />
            <line x1="130" y1="40" x2="130" y2="180" />
            <line x1="170" y1="40" x2="170" y2="180" />
            <line x1="210" y1="40" x2="210" y2="180" />
            <line x1="250" y1="40" x2="250" y2="180" />

            <line x1="30" y1="60" x2="290" y2="60" />
            <line x1="30" y1="100" x2="290" y2="100" />
            <line x1="30" y1="140" x2="290" y2="140" />
          </g>

          {/* X and Y Axes */}
          <line x1="40" y1="140" x2="280" y2="140" stroke="#93C5FD" strokeWidth="2.5" />
          <line x1="130" y1="30" x2="130" y2="190" stroke="#93C5FD" strokeWidth="2.5" />
          <text x="285" y="144" fill="#BFDBFE" fontSize="11" fontWeight="bold">x</text>
          <text x="130" y="24" fill="#BFDBFE" fontSize="11" fontWeight="bold" textAnchor="middle">y</text>

          {/* Linear Equation Line y = mx + b */}
          <line x1="60" y1="180" x2="230" y2="50" stroke="#F59E0B" strokeWidth="3.5" />
          
          {/* Y-Intercept Point (0, b) */}
          <circle cx="130" cy="125" r="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="145" y="128" fill="#FCA5A5" fontSize="10" fontWeight="bold">(0, b)</text>

          {/* Slope Triangle Rise / Run */}
          <polygon points="130,125 180,125 180,87" fill="#F59E0B" fillOpacity="0.25" stroke="#F59E0B" strokeDasharray="3 3" />
          <text x="155" y="137" fill="#FDE047" fontSize="9" fontWeight="bold" textAnchor="middle">Δx (Run)</text>
          <text x="195" y="108" fill="#FDE047" fontSize="9" fontWeight="bold">Δy (Rise)</text>

          {/* Formula Badge */}
          <rect x="25" y="24" width="95" height="22" rx="6" fill="#1E293B" stroke="#F59E0B" strokeWidth="1" />
          <text x="72" y="39" fill="#FBBF24" fontSize="11" fontWeight="bold" textAnchor="middle">y = mx + b</text>
        </svg>
      );
    } else {
      // Calculus: Tangent Line & Derivative
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full drop-shadow-md select-none">
          <rect x="10" y="10" width="300" height="200" rx="16" fill="#0B132B" stroke="#60A5FA" strokeWidth="1.5" />
          
          {/* Coordinate axes */}
          <line x1="40" y1="180" x2="280" y2="180" stroke="#64748B" strokeWidth="2" />
          <line x1="60" y1="30" x2="60" y2="190" stroke="#64748B" strokeWidth="2" />

          {/* Smooth Cubic Curve f(x) */}
          <path d="M 60 170 Q 120 170, 160 110 T 260 40" fill="none" stroke="#38BDF8" strokeWidth="3.5" />

          {/* Tangent line at (x, f(x)) */}
          <line x1="90" y1="175" x2="230" y2="55" stroke="#F43F5E" strokeWidth="2.5" strokeDasharray="4 4" />
          <circle cx="160" cy="115" r="5" fill="#F43F5E" stroke="#FFFFFF" strokeWidth="2" />
          
          <text x="175" y="118" fill="#FDA4AF" fontSize="10" fontWeight="bold">P(x, f(x))</text>
          <text x="210" y="50" fill="#FB7185" fontSize="11" fontWeight="bold">Tangent Slope dy/dx</text>

          {/* Formula Callout */}
          <rect x="170" y="170" width="130" height="24" rx="6" fill="#1E293B" stroke="#38BDF8" strokeWidth="1" />
          <text x="235" y="186" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle">f'(x) = lim Δy / Δx</text>
        </svg>
      );
    }
  }

  // 4. Computer Science & AI (Algorithms, Neural Networks, Binary Search)
  if (t.includes('comput') || t.includes('algorithm') || t.includes('ai') || t.includes('neural') || t.includes('code') || t.includes('python')) {
    if (slideIndex >= 6) {
      // Artificial Neural Network Perceptron Architecture
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full drop-shadow-md select-none">
          <rect x="10" y="10" width="300" height="200" rx="16" fill="#090D16" stroke="#4F46E5" strokeWidth="1.5" />
          
          {/* Synaptic Interconnections with Glow */}
          <g stroke="#4338CA" strokeWidth="1.5" opacity={isPlaying ? '0.9' : '0.6'}>
            {[50, 110, 170].map((y1, i) =>
              [40, 85, 135, 180].map((y2, j) => (
                <line key={`${i}-${j}`} x1="70" y1={y1} x2="160" y2={y2} />
              ))
            )}
            {[40, 85, 135, 180].map((y2, j) => (
              <line key={`out-${j}`} x1="160" y1={y2} x2="250" y2="110" stroke="#6366F1" strokeWidth="2" />
            ))}
          </g>

          {/* Layer 1: Input Neurons (x1, x2, x3) */}
          {[
            { y: 50, label: 'x₁' },
            { y: 110, label: 'x₂' },
            { y: 170, label: 'x₃' }
          ].map((n, i) => (
            <g key={i}>
              <circle cx="70" cy={n.y} r="14" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
              <text x="70" y={n.y + 4} fill="#A5B4FC" fontSize="11" fontWeight="bold" textAnchor="middle">{n.label}</text>
            </g>
          ))}

          {/* Layer 2: Hidden Representation Layer (h1, h2, h3, h4) */}
          {[40, 85, 135, 180].map((y, i) => (
            <g key={i}>
              <circle cx="160" cy={y} r="14" fill="#312E81" stroke="#818CF8" strokeWidth="2" />
              <text x="160" y={y + 4} fill="#E0E7FF" fontSize="10" fontWeight="bold" textAnchor="middle">h{i + 1}</text>
            </g>
          ))}

          {/* Layer 3: Output Decision Neuron */}
          <g>
            <circle cx="250" cy="110" r="18" fill="#4338CA" stroke="#C7D2FE" strokeWidth="2.5" />
            <text x="250" y={115} fill="#FFFFFF" fontSize="12" fontWeight="extrabold" textAnchor="middle">ŷ</text>
          </g>

          {/* Labels & Formula */}
          <text x="70" y="24" fill="#818CF8" fontSize="10" fontWeight="bold" textAnchor="middle">Inputs X</text>
          <text x="160" y="24" fill="#818CF8" fontSize="10" fontWeight="bold" textAnchor="middle">Hidden σ(Wx+b)</text>
          <text x="250" y="24" fill="#818CF8" fontSize="10" fontWeight="bold" textAnchor="middle">Output</text>

          <rect x="25" y="186" width="130" height="20" rx="5" fill="#1E1B4B" stroke="#6366F1" strokeWidth="1" />
          <text x="90" y="200" fill="#C7D2FE" fontSize="10" fontWeight="bold" textAnchor="middle">y = σ(Σ W·X + b)</text>
        </svg>
      );
    } else {
      // Binary Search Tree & Memory Blocks
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full drop-shadow-md select-none">
          <rect x="10" y="10" width="300" height="200" rx="16" fill="#0A0F1D" stroke="#0D9488" strokeWidth="1.5" />
          
          {/* Binary Search Tree Edges */}
          <line x1="160" y1="45" x2="100" y2="95" stroke="#0D9488" strokeWidth="2" />
          <line x1="160" y1="45" x2="220" y2="95" stroke="#0D9488" strokeWidth="2" />
          <line x1="100" y1="95" x2="70" y2="145" stroke="#0D9488" strokeWidth="2" />
          <line x1="100" y1="95" x2="130" y2="145" stroke="#0D9488" strokeWidth="2" />
          <line x1="220" y1="95" x2="190" y2="145" stroke="#0D9488" strokeWidth="2" />
          <line x1="220" y1="95" x2="250" y2="145" stroke="#0D9488" strokeWidth="2" />

          {/* Tree Nodes */}
          {[
            { cx: 160, cy: 45, val: '50' },
            { cx: 100, cy: 95, val: '25' },
            { cx: 220, cy: 95, val: '75' },
            { cx: 70, cy: 145, val: '10' },
            { cx: 130, cy: 145, val: '35' },
            { cx: 190, cy: 145, val: '60' },
            { cx: 250, cy: 145, val: '90' }
          ].map((node, i) => (
            <g key={i}>
              <circle cx={node.cx} cy={node.cy} r="14" fill="#134E4A" stroke="#2DD4BF" strokeWidth="2" />
              <text x={node.cx} y={node.cy + 4} fill="#CCFBF1" fontSize="10" fontWeight="bold" textAnchor="middle">{node.val}</text>
            </g>
          ))}

          {/* Search Complexity Pill */}
          <rect x="95" y="175" width="130" height="24" rx="6" fill="#115E59" stroke="#5EEAD4" strokeWidth="1" />
          <text x="160" y="191" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">Complexity: O(log n)</text>
        </svg>
      );
    }
  }

  // 5. Chemistry (Bohr Atomic Structure, Stoichiometry, Molecular Bonds)
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full drop-shadow-md select-none">
      <rect x="10" y="10" width="300" height="200" rx="16" fill="#1C1917" stroke="#EA580C" strokeWidth="1.5" />
      
      {/* Concentric Electron Orbital Rings */}
      <circle cx="160" cy="110" r="35" fill="none" stroke="#78716C" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="160" cy="110" r="60" fill="none" stroke="#78716C" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="160" cy="110" r="85" fill="none" stroke="#78716C" strokeWidth="1.5" strokeDasharray="5 5" />

      {/* Atomic Nucleus with Protons & Neutrons */}
      <g>
        <circle cx="160" cy="110" r="18" fill="#DC2626" stroke="#FEF2F2" strokeWidth="2" />
        <circle cx="156" cy="106" r="6" fill="#F87171" />
        <circle cx="164" cy="114" r="6" fill="#FCA5A5" />
        <text x="160" y="113" fill="#FFFFFF" fontSize="9" fontWeight="extrabold" textAnchor="middle">6p 6n</text>
      </g>

      {/* Orbiting Electrons */}
      {[
        { cx: 160, cy: 75 },
        { cx: 160, cy: 145 },
        { cx: 100, cy: 110 },
        { cx: 220, cy: 110 },
        { cx: 118, cy: 68 },
        { cx: 202, cy: 152 }
      ].map((e, i) => (
        <circle key={i} cx={e.cx} cy={e.cy} r="4" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1" />
      ))}

      {/* Chemical Formula / Element Badge */}
      <rect x="25" y="24" width="120" height="22" rx="6" fill="#292524" stroke="#F97316" strokeWidth="1" />
      <text x="85" y="39" fill="#FB923C" fontSize="11" fontWeight="bold" textAnchor="middle">Carbon (Atomic #6)</text>

      <rect x="175" y="178" width="120" height="22" rx="6" fill="#292524" stroke="#38BDF8" strokeWidth="1" />
      <text x="235" y="193" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle">Electron Orbitals</text>
    </svg>
  );
};
