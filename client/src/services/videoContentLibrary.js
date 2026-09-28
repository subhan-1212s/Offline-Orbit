// High-Yield 2-Minute STEM Educational Content & English Narration Engine
// Provides 12-slide comprehensive curriculum data and synchronized English audio narration for all STEM modules

export const STEM_TOPIC_SLIDES = {
  computer_science: [
    {
      sec: 0,
      title: '1. Algorithmic Principles & Big O',
      headline: 'Computational Thinking & Complexity Analysis',
      narration: 'Welcome to Computer Science. Algorithms are step-by-step procedures for solving problems. Big O notation measures time and memory scalability as input sizes grow towards infinity.',
      formula: 'O(1) < O(log n) < O(n) < O(n log n) < O(n²)',
      icon: '💻'
    },
    {
      sec: 10,
      title: '2. Search Algorithms',
      headline: 'Linear vs Binary Search In Sorted Arrays',
      narration: 'Linear search scans elements one by one in O(n) time. Binary search repeatedly divides sorted arrays in half, finding target values in logarithmic O(log n) time.',
      formula: 'Binary Search: mid = (low + high) // 2',
      icon: '🔍'
    },
    {
      sec: 20,
      title: '3. Data Structures: Arrays & Linked Lists',
      headline: 'Contiguous Blocks vs Node Pointer Chains',
      narration: 'Arrays store elements in contiguous memory for instant O(1) index access. Linked lists chain nodes with pointers, enabling rapid insertions without memory reallocation.',
      formula: 'Array Access: O(1) • List Insertion: O(1)',
      icon: '🧱'
    },
    {
      sec: 30,
      title: '4. Stacks, Queues & Hash Maps',
      headline: 'LIFO, FIFO, and Key-Value Hash Buckets',
      narration: 'Stacks operate Last In, First Out for function call frames. Queues operate First In, First Out for task scheduling. Hash maps provide expected O(1) lookup using hash functions.',
      formula: 'Hash Function: index = hash(key) % capacity',
      icon: '🗄️'
    },
    {
      sec: 40,
      title: '5. Recursion & Divide-and-Conquer',
      headline: 'Self-Referential Functions & Base Conditions',
      narration: 'Recursion solves complex problems by breaking them into smaller identical sub-problems. Every recursive routine requires a base case to prevent stack overflow errors.',
      formula: 'T(n) = 2T(n/2) + O(n) ➔ Merge Sort O(n log n)',
      icon: '🔄'
    },
    {
      sec: 50,
      title: '6. Graph Theory & Traversal',
      headline: 'Vertices, Edges, Breadth-First & Depth-First',
      narration: 'Graphs model networks using vertices and edges. Breadth-first search traverses level by level with a queue, while depth-first search explores paths deeply using recursion or a stack.',
      formula: 'Breadth-First (BFS) & Depth-First (DFS): O(V + E)',
      icon: '🕸️'
    },
    {
      sec: 60,
      title: '7. Artificial Intelligence & Perceptrons',
      headline: 'The Artificial Neuron & Activation Functions',
      narration: 'Artificial intelligence uses neural networks inspired by biological neurons. An artificial perceptron computes a weighted sum of inputs and applies a non-linear activation function.',
      formula: 'Output y = σ(W · X + b) where σ is ReLU or Sigmoid',
      icon: '🤖'
    },
    {
      sec: 70,
      title: '8. Deep Neural Architectures',
      headline: 'Multilayer Perceptrons & Hidden Representations',
      narration: 'Deep learning stacks multiple hidden layers between inputs and outputs, allowing the network to automatically learn hierarchical feature representations from raw data.',
      formula: 'Forward Pass: a[l] = g(W[l] · a[l-1] + b[l])',
      icon: '🧠'
    },
    {
      sec: 80,
      title: '9. Backpropagation & Optimization',
      headline: 'Gradient Descent & The Calculus Chain Rule',
      narration: 'Neural networks learn by calculating prediction error loss. Backpropagation applies the calculus chain rule to compute gradients, adjusting weights via stochastic gradient descent.',
      formula: 'Weight Update: W := W - α · (∂Loss / ∂W)',
      icon: '⚡'
    },
    {
      sec: 90,
      title: '10. Python Implementation & Vectors',
      headline: 'NumPy Vectorized Matrix Multiplications',
      narration: 'High-performance AI programs leverage vectorized matrix multiplications in Python with libraries like NumPy and PyTorch, accelerating linear algebra operations across multi-core processors.',
      formula: 'Vectorization: np.dot(Weights, Inputs) in O(n) CPU/GPU',
      icon: '🐍'
    },
    {
      sec: 100,
      title: '11. Model Inference & Ethics',
      headline: 'Deploying Low-Bandwidth Edge Intelligence',
      narration: 'Trained models can be quantized for edge deployment on mobile phones and low-power devices, enabling offline intelligence without relying on cloud server connectivity.',
      formula: 'Model Quantization: FP32 ➔ INT8 (4x Memory Reduction)',
      icon: '📱'
    },
    {
      sec: 110,
      title: '12. Masterclass Summary',
      headline: 'Computer Science & AI Foundations Mastered',
      narration: 'Congratulations! You have completed the two-minute masterclass on Computer Science and Neural Networks. Proceed to the practice quiz to validate your algorithmic mastery.',
      formula: '100% Video Complete • Ready for Practice Quiz',
      icon: '🎓'
    }
  ],

  mathematics: [
    {
      sec: 0,
      title: '1. Algebraic Foundations',
      headline: 'Variables, Constants & Inverse Operations',
      narration: 'Welcome to the Mathematics Masterclass. Algebra uses variables to represent unknown quantities, balancing both sides of equations using inverse arithmetic operations.',
      formula: 'ax + b = c ➔ x = (c - b) / a (for a ≠ 0)',
      icon: '📐'
    },
    {
      sec: 10,
      title: '2. Linear Equations & Slope',
      headline: 'The Rate of Change on the Cartesian Plane',
      narration: 'Linear equations graph straight lines. The slope m represents the rate of vertical rise over horizontal run, while the y-intercept b marks where the line crosses the vertical axis.',
      formula: 'Slope-Intercept Form: y = mx + b where m = Δy / Δx',
      icon: '📈'
    },
    {
      sec: 20,
      title: '3. Systems of Linear Equations',
      headline: 'Substitution, Elimination & Intersections',
      narration: 'A system of two linear equations finds the point of intersection between two straight lines. You can solve systems using algebraic substitution or linear combination elimination.',
      formula: 'Unique Solution at Intersection Point (x*, y*)',
      icon: '✖️'
    },
    {
      sec: 30,
      title: '4. Quadratic Functions & Parabolas',
      headline: 'Second-Degree Polynomials & Symmetry',
      narration: 'Quadratic functions produce symmetrical parabolas. The vertex marks the minimum or maximum, and the discriminant b squared minus 4ac reveals how many real roots exist.',
      formula: 'Roots Formula: x = (-b ± √(b² - 4ac)) / (2a)',
      icon: '🎯'
    },
    {
      sec: 40,
      title: '5. Functions & Transformations',
      headline: 'Domain, Range & Graph Shifting Rules',
      narration: 'A mathematical function maps every input in its domain to exactly one output in its range. Adding constants shifts graphs vertically, while altering inputs translates them horizontally.',
      formula: 'Transformation: g(x) = a · f(b(x - h)) + k',
      icon: '🔄'
    },
    {
      sec: 50,
      title: '6. Exponential & Logarithmic Growth',
      headline: 'Compound Compounding & Inverse Logarithms',
      narration: 'Exponential functions describe phenomena where growth rate is proportional to value, such as population growth. Logarithms are the mathematical inverses of exponential powers.',
      formula: 'log_b(x) = y  ⟺  b^y = x (where b > 0, b ≠ 1)',
      icon: '🚀'
    },
    {
      sec: 60,
      title: '7. Introduction to Calculus',
      headline: 'Limits and The Infinitesimal Approach',
      narration: 'Calculus studies continuous change. The limit analyzes what output value a function approaches as its input gets infinitely close to a specific point without necessarily reaching it.',
      formula: 'Limit Definition: lim[x ➔ c] f(x) = L',
      icon: '♾️'
    },
    {
      sec: 70,
      title: '8. The Derivative: Instantaneous Rate',
      headline: 'Tangent Line Slopes & Rate of Change',
      narration: 'The derivative represents the instantaneous rate of change and the slope of the tangent line. It is mathematically defined as the limit of difference quotients as delta x goes to zero.',
      formula: "f'(x) = lim[h ➔ 0] (f(x + h) - f(x)) / h",
      icon: '⚡'
    },
    {
      sec: 80,
      title: '9. Differentiation Rules',
      headline: 'Power Rule, Product Rule & Chain Rule',
      narration: 'Standard differentiation shortcuts accelerate calculus calculations: the power rule brings down exponents, the product rule differentiates pairs, and the chain rule differentiates composite functions.',
      formula: 'd/dx [x^n] = n · x^(n - 1) • Chain: d/dx [f(g(x))] = f\'(g(x))g\'(x)',
      icon: '⚙️'
    },
    {
      sec: 90,
      title: '10. Optimization & Critical Points',
      headline: 'Finding Maxima, Minima & Saddle Points',
      narration: 'Setting the derivative to zero locates critical points where functions attain local maxima or minima. The second derivative test indicates whether the curve is concave up or down.',
      formula: "Critical Point: f'(x) = 0 • Local Min if f''(x) > 0",
      icon: '🏔️'
    },
    {
      sec: 100,
      title: '11. Integration: Area Under Curves',
      headline: 'The Fundamental Theorem of Calculus',
      narration: 'Integration accumulates continuous quantities, calculating the exact area underneath curved graphs. The Fundamental Theorem links differentiation and integration as exact inverse operations.',
      formula: '∫[a to b] f(x) dx = F(b) - F(a) where F\'(x) = f(x)',
      icon: '📊'
    },
    {
      sec: 110,
      title: '12. Masterclass Summary',
      headline: 'Mathematics & Calculus Mastery Achieved',
      narration: 'Outstanding work! You have finished the two-minute masterclass covering linear algebra, functions, derivatives, and integration. Now take the quiz to test your numerical skills.',
      formula: '100% Video Complete • Ready for Practice Quiz',
      icon: '🎓'
    }
  ],

  physics: [
    {
      sec: 0,
      title: "1. Classical Mechanics: Newton's Laws",
      headline: 'Inertia, Force, Mass & Acceleration',
      narration: "Welcome to Physics. Newton's First Law establishes that objects in motion stay in motion unless acted on by net external forces. Force equals mass times acceleration.",
      formula: 'Newton II: ΣF = m · a (Force in Newtons, Mass in kg)',
      icon: '🍎'
    },
    {
      sec: 10,
      title: '2. Action and Reaction',
      headline: "Newton's Third Law & Vector Forces",
      narration: 'Every action force generates an equal and opposite reaction force acting on different bodies simultaneously. Force vectors combine by vector addition of components.',
      formula: 'F_A on B = - F_B on A • Resultant: F_net = √(Fx² + Fy²)',
      icon: '⚖️'
    },
    {
      sec: 20,
      title: '3. Kinematics in One & Two Dimensions',
      headline: 'Displacement, Velocity & Uniform Acceleration',
      narration: 'Kinematic equations model motion with constant acceleration. Projectiles follow parabolic trajectories, combining constant horizontal velocity with vertical gravitational acceleration.',
      formula: 'Kinematics: v² = u² + 2as • s = ut + ½at²',
      icon: '🏹'
    },
    {
      sec: 30,
      title: '4. Gravitation & Friction Dynamics',
      headline: 'Universal Gravitation & Normal Friction',
      narration: 'Gravity attracts all masses with force inversely proportional to the square of their distance. Friction opposes sliding motion, proportional to the normal contact force.',
      formula: 'F_gravity = G(m₁m₂)/r² • Friction: f = μ · N',
      icon: '🌍'
    },
    {
      sec: 40,
      title: '5. Work, Energy & Power',
      headline: 'Mechanical Work & Scalar Energy Transfer',
      narration: 'Work is force exerted across a parallel displacement distance. Power measures the rate at which work is performed or energy is converted per second, measured in Watts.',
      formula: 'Work: W = F · d · cos(θ) • Power: P = W / Δt (Watts)',
      icon: '⚡'
    },
    {
      sec: 50,
      title: '6. Conservation of Energy',
      headline: 'Kinetic & Potential Energy Transformations',
      narration: 'Energy cannot be created or destroyed, only transformed between states. Gravitational potential energy converts entirely into kinetic motion energy in conservative mechanical systems.',
      formula: 'E_total = Kinetic (½mv²) + Potential (mgh) = Constant',
      icon: '🎢'
    },
    {
      sec: 60,
      title: '7. Momentum & Collisions',
      headline: 'Conservation of Linear Momentum (p = mv)',
      narration: 'In any closed physical system with no external forces, total momentum is conserved before and after collisions. Elastic collisions conserve kinetic energy, while inelastic collisions do not.',
      formula: 'Conservation: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂',
      icon: '🎱'
    },
    {
      sec: 70,
      title: '8. Thermodynamics & Heat Transfer',
      headline: 'Thermal Energy, Conduction & Entropy',
      narration: 'Heat flows spontaneously from warmer regions to cooler regions through conduction, convection, and radiation. The Second Law of Thermodynamics dictates that entropy always increases.',
      formula: 'Heat Transfer: Q = m · c · ΔT • ΔS_universe ≥ 0',
      icon: '🔥'
    },
    {
      sec: 80,
      title: '9. Electrostatics & Coulomb Force',
      headline: 'Electric Charge, Fields & Potential',
      narration: 'Like electric charges repel and opposite charges attract according to Coulomb\'s Inverse Square Law. Electric potential difference, or voltage, measures energy per unit charge.',
      formula: "Coulomb's Law: F = k(|q₁q₂|) / r² where k ≈ 8.99×10⁹ N·m²/C²",
      icon: '⚡'
    },
    {
      sec: 90,
      title: "10. Electric Circuits & Ohm's Law",
      headline: 'Voltage, Current, Resistance & Kirchhoff Rules',
      narration: "Ohm's Law relates electric current to voltage and resistance. Kirchhoff's Current Law preserves charge at junction nodes, while Kirchhoff's Voltage Law balances potentials in loops.",
      formula: "Ohm's Law: V = I · R • Power: P = V · I = I²R",
      icon: '💡'
    },
    {
      sec: 100,
      title: '11. Electromagnetism & Induction',
      headline: "Faraday's Law & Magnetic Flux",
      narration: 'Moving electric charges produce magnetic fields. Faraday\'s Law proves that changing magnetic flux induces an electromotive force, which powers modern electric generators and transformers.',
      formula: "Faraday: Induced EMF ε = - dΦ_B / dt (Volts)",
      icon: '🧲'
    },
    {
      sec: 110,
      title: '12. Masterclass Summary',
      headline: 'Classical & Electromagnetic Physics Mastered',
      narration: 'Spectacular achievement! You have mastered key physics laws spanning mechanics, conservation principles, and electromagnetism. Test your understanding on the topic quiz now.',
      formula: '100% Video Complete • Ready for Practice Quiz',
      icon: '🎓'
    }
  ],

  biology: [
    {
      sec: 0,
      title: '1. Cell Biology & Organization',
      headline: 'The Fundamental Unit of Biological Life',
      narration: 'Welcome to Biology. The cell is the basic structural and functional unit of all living organisms. Prokaryotes lack membrane-bound nuclei, whereas eukaryotic cells house specialized organelles.',
      formula: 'Cell Theory: All cells arise from pre-existing cells',
      icon: '🔬'
    },
    {
      sec: 10,
      title: '2. Membrane Transport & Osmosis',
      headline: 'Phospholipid Bilayers & Selective Permeability',
      narration: 'Cellular membranes consist of a fluid mosaic phospholipid bilayer. Passive diffusion and osmosis move substances down concentration gradients, while active transport consumes ATP.',
      formula: 'Active Transport: [Low] ➔ [High] requires ATP energy',
      icon: '🫧'
    },
    {
      sec: 20,
      title: '3. Mitochondria & Cellular Respiration',
      headline: 'ATP Generation via Aerobic Catabolism',
      narration: 'Mitochondria produce ATP by breaking down glucose with oxygen through glycolysis, the Krebs cycle, and oxidative phosphorylation, releasing carbon dioxide and water as byproducts.',
      formula: 'C₆H₁₂O₆ + 6 O₂ ➔ 6 CO₂ + 6 H₂O + ~36 ATP',
      icon: '🔋'
    },
    {
      sec: 30,
      title: '4. Plant Photosynthesis',
      headline: 'Solar Energy Conversion in Chloroplasts',
      narration: 'Plants capture sunlight using green chlorophyll pigments inside chloroplasts. Light reactions split water to release oxygen, while the Calvin cycle fixes carbon dioxide into sugar.',
      formula: '6 CO₂ + 6 H₂O + Light Energy ➔ C₆H₁₂O₆ + 6 O₂',
      icon: '🌿'
    },
    {
      sec: 40,
      title: '5. DNA Structure & Base Pairing',
      headline: 'The Double Helix & Genetic Information',
      narration: 'DNA stores genetic hereditary instructions. Two antiparallel sugar-phosphate strands form a double helix connected by complementary base pairs: Adenine pairs with Thymine, Cytosine with Guanine.',
      formula: "Chargaff's Rules: [A] = [T] and [C] = [G]",
      icon: '🧬'
    },
    {
      sec: 50,
      title: '6. Protein Synthesis: Central Dogma',
      headline: 'Transcription to RNA & Ribosome Translation',
      narration: 'The Central Dogma states that genetic information flows from DNA to messenger RNA through transcription in the nucleus, then to proteins through translation by ribosomes in the cytoplasm.',
      formula: 'DNA Transcription ➔ mRNA Translation ➔ Polypeptide Chain',
      icon: '🧵'
    },
    {
      sec: 60,
      title: '7. Mitosis & The Cell Cycle',
      headline: 'Asexual Cellular Division & Chromosome Segregation',
      narration: 'Mitosis divides replicated chromosomes equally into two genetically identical daughter cells through prophase, metaphase, anaphase, and telophase, enabling growth and tissue repair.',
      formula: 'One Diploid Cell (2n) ➔ Two Identical Diploids (2n)',
      icon: '➗'
    },
    {
      sec: 70,
      title: '8. Meiosis & Genetic Recombination',
      headline: 'Gamete Formation & Independent Assortment',
      narration: 'Meiosis produces four genetically diverse haploid gametes through two rounds of nuclear division. Crossing over and independent assortment generate vast genetic variation.',
      formula: 'One Diploid (2n) ➔ Four Unique Haploids (1n)',
      icon: '🎲'
    },
    {
      sec: 80,
      title: '9. Mendelian Inheritance Genetics',
      headline: 'Dominant & Recessive Allele Segregation',
      narration: 'Gregor Mendel discovered that traits are inherited as discrete alleles. Punnett squares predict phenotypic ratios among offspring based on homozygous or heterozygous parental genotypes.',
      formula: 'Monohybrid Cross (Aa × Aa) ➔ 3:1 Phenotype Ratio',
      icon: '🌱'
    },
    {
      sec: 90,
      title: '10. Genomics & CRISPR-Cas9',
      headline: 'Precision Molecular Gene Editing Mechanisms',
      narration: 'CRISPR Cas9 uses synthetic guide RNA to identify specific target DNA sequences, inducing targeted double-strand breaks that enable precise gene deletion or therapeutic insertion.',
      formula: 'Cas9 Endonuclease + sgRNA Guide ➔ Targeted Cleavage',
      icon: '✂️'
    },
    {
      sec: 100,
      title: '11. Evolution & Natural Selection',
      headline: 'Differential Reproductive Fitness & Adaptation',
      narration: 'Evolution occurs through natural selection acting on genetic variation within populations over generations. Organisms with advantageous adaptations exhibit higher reproductive fitness.',
      formula: 'Mutation + Selection + Genetic Drift ➔ Speciation',
      icon: '🌍'
    },
    {
      sec: 110,
      title: '12. Masterclass Summary',
      headline: 'Cellular & Molecular Biology Mastery',
      narration: 'Wonderful job! You have completed the two-minute biology masterclass spanning cellular biochemistry, genetics, and biotechnology. Proceed to the practice quiz to verify your score.',
      formula: '100% Video Complete • Ready for Practice Quiz',
      icon: '🎓'
    }
  ],

  chemistry: [
    {
      sec: 0,
      title: '1. Atomic Structure & Subatomic Particles',
      headline: 'Protons, Neutrons & Electron Orbitals',
      narration: 'Welcome to Chemistry. Matter is composed of atoms containing dense positively charged nuclei surrounded by electron probability clouds. Protons define the atomic number and elemental identity.',
      formula: 'Mass Number A = Protons (Z) + Neutrons (N)',
      icon: '⚛️'
    },
    {
      sec: 10,
      title: '2. The Periodic Table & Trends',
      headline: 'Electronegativity, Ionization & Atomic Radii',
      narration: 'Elements are arranged by increasing atomic number in groups with similar valence electron configurations. Electronegativity increases across periods and decreases down groups.',
      formula: 'Electronegativity Peak: Fluorine (F = 3.98 Pauling Scale)',
      icon: '📋'
    },
    {
      sec: 20,
      title: '3. Chemical Bonding: Ionic & Covalent',
      headline: 'Electron Sharing, Transfer & Octet Stability',
      narration: 'Atoms bond to achieve stable outer octet electron shells. Ionic bonds transfer valence electrons between metals and nonmetals, while covalent bonds share electron pairs.',
      formula: 'Ionic: Na⁺ + Cl⁻ ➔ NaCl • Covalent: H· + ·H ➔ H:H',
      icon: '🔗'
    },
    {
      sec: 30,
      title: '4. The Mole & Avogadro Constant',
      headline: 'Connecting Atomic Masses to Macroscopic Grams',
      narration: 'The mole is the chemist counting unit. One mole contains exactly 6.022 times 10 to the 23rd particles, bridging atomic mass units directly into measurable laboratory grams.',
      formula: 'n = mass (g) / Molar Mass (g/mol) • N_A = 6.022×10²³ mol⁻¹',
      icon: '⚖️'
    },
    {
      sec: 40,
      title: '5. Balancing Chemical Reactions',
      headline: 'Conservation of Mass Across Reactions',
      narration: 'Chemical reactions cannot create or destroy matter. Balancing equations requires adjusting stoichiometric coefficients so equal numbers of every atom exist on reactant and product sides.',
      formula: 'Balanced: N₂ + 3 H₂ ➔ 2 NH₃ (Haber-Bosch Synthesis)',
      icon: '⚖️'
    },
    {
      sec: 50,
      title: '6. Stoichiometry & Limiting Reactants',
      headline: 'Theoretical Yield & Percentage Recovery',
      narration: 'Stoichiometry uses balanced molar ratios to predict exact quantities produced. The limiting reactant is completely consumed first, restricting the maximum theoretical yield of products.',
      formula: 'Percent Yield = (Actual Yield / Theoretical Yield) × 100%',
      icon: '🧪'
    },
    {
      sec: 60,
      title: '7. Thermodynamics & Enthalpy (ΔH)',
      headline: 'Exothermic Release vs Endothermic Absorption',
      narration: 'Chemical bond breaking absorbs energy, while bond formation releases heat. Exothermic reactions have negative enthalpy and release heat to surroundings; endothermic reactions absorb heat.',
      formula: 'Enthalpy: ΔH_reaction = Σ ΔH_bonds broken - Σ ΔH_bonds formed',
      icon: '🔥'
    },
    {
      sec: 70,
      title: '8. Reaction Kinetics & Catalysts',
      headline: 'Activation Energy & Collision Theory',
      narration: 'For reactions to occur, molecules must collide with sufficient kinetic activation energy and correct geometric orientation. Catalysts accelerate reactions by lowering activation barriers.',
      formula: 'Arrhenius Equation: k = A · e^(-E_a / (R · T))',
      icon: '⏱️'
    },
    {
      sec: 80,
      title: '9. Chemical Equilibrium (K_eq)',
      headline: "Dynamic Balance & Le Chatelier's Principle",
      narration: 'Reversible chemical reactions reach dynamic equilibrium when forward and reverse rates become equal. If an external stress is applied, equilibrium shifts to counteract the perturbation.',
      formula: "Equilibrium Constant: K_c = [Products]^p / [Reactants]^r",
      icon: '🔄'
    },
    {
      sec: 90,
      title: '10. Acids, Bases & The pH Scale',
      headline: 'Hydrogen Ion Activity & Neutralization',
      narration: 'Acids donate hydrogen protons, while bases accept protons. The pH scale measures hydrogen ion concentration logarithmically from zero to fourteen, with seven representing neutral water.',
      formula: 'pH = -log₁₀[H⁺] • Neutralization: Acid + Base ➔ Salt + H₂O',
      icon: '💧'
    },
    {
      sec: 100,
      title: '11. The Ideal Gas Law',
      headline: 'Pressure, Volume, Temperature & Moles',
      narration: 'Gas behavior is described by the Ideal Gas Law combining Boyle, Charles, and Avogadro principles. Pressure multiplied by volume equals moles times the ideal gas constant times temperature in Kelvin.',
      formula: 'PV = nRT where R = 0.0821 L·atm/(mol·K) or 8.314 J/(mol·K)',
      icon: '🎈'
    },
    {
      sec: 110,
      title: '12. Masterclass Summary',
      headline: 'Chemical Principles & Stoichiometry Mastered',
      narration: 'Fantastic achievement! You have completed the two-minute masterclass on atomic theory, chemical bonding, and reaction stoichiometry. Take the practice quiz to solidify your understanding.',
      formula: '100% Video Complete • Ready for Practice Quiz',
      icon: '🎓'
    }
  ]
};

// Intelligent Topic Slide Matcher
export const getTopicSlides = (topicTitle = '') => {
  const t = (topicTitle || '').toLowerCase();
  
  if (t.includes('comput') || t.includes('algorithm') || t.includes('neural') || t.includes('ai') || t.includes('code') || t.includes('python')) {
    return STEM_TOPIC_SLIDES.computer_science;
  }
  if (t.includes('math') || t.includes('algebra') || t.includes('calculus') || t.includes('equat') || t.includes('function') || t.includes('deriv')) {
    return STEM_TOPIC_SLIDES.mathematics;
  }
  if (t.includes('physic') || t.includes('newton') || t.includes('vector') || t.includes('mechanic') || t.includes('circuit') || t.includes('electric') || t.includes('force')) {
    return STEM_TOPIC_SLIDES.physics;
  }
  if (t.includes('chem') || t.includes('stoich') || t.includes('reaction') || t.includes('periodic') || t.includes('atom') || t.includes('acid')) {
    return STEM_TOPIC_SLIDES.chemistry;
  }
  if (t.includes('bio') || t.includes('cell') || t.includes('genom') || t.includes('gene') || t.includes('crispr') || t.includes('dna')) {
    return STEM_TOPIC_SLIDES.biology;
  }
  
  // Default to Biology / Photosynthesis
  return STEM_TOPIC_SLIDES.biology;
};

// Central High-Fidelity English Audio Narration Engine
class EnglishSpeechNarrationEngine {
  constructor() {
    this.currentUtterance = null;
    this.cachedVoice = null;
    this.isMuted = false;
    this.playbackSpeed = 1;

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      window.speechSynthesis.onvoiceschanged = () => this.initVoices();
    }
  }

  initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    // Prioritize natural English voices
    const preferred = voices.find(v => 
      v.lang.startsWith('en') && (
        v.name.includes('Natural') || 
        v.name.includes('Google US English') || 
        v.name.includes('Samantha') || 
        v.name.includes('Daniel') || 
        v.name.includes('David')
      )
    ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

    this.cachedVoice = preferred;
  }

  speak(text, { speed = 1, isMuted = false, onStart, onEnd } = {}) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isMuted || !text) {
      this.cancel();
      return;
    }

    try {
      this.cancel();
      window.speechSynthesis.resume();

      if (!this.cachedVoice) {
        this.initVoices();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      if (this.cachedVoice) {
        utterance.voice = this.cachedVoice;
      }
      utterance.lang = 'en-US';
      utterance.rate = Math.max(0.6, Math.min(1.8, (speed || this.playbackSpeed) * 0.95));
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        if (onStart) onStart();
        if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
        this.heartbeatTimer = setInterval(() => {
          if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
            window.speechSynthesis.resume();
          } else {
            clearInterval(this.heartbeatTimer);
          }
        }, 10000);
      };

      utterance.onend = () => {
        if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
        console.warn('Speech narration notice:', e);
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis narration error:', err);
    }
  }

  cancel() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
  }
}

export const speechNarrationEngine = new EnglishSpeechNarrationEngine();

// Harmonious Ambient Learning Chime Synthesizer (Web Audio API)
// Provides clean studio acoustic chords during video playback
export class StudioAmbientAudioChime {
  constructor() {
    this.audioCtx = null;
    this.gainNode = null;
    this.isPlaying = false;
  }

  start() {
    if (typeof window === 'undefined') return;
    try {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        this.audioCtx = new AudioContext();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
      this.gainNode.connect(this.audioCtx.destination);

      // Warm background chords (216 Hz fundamental & 324 Hz harmonic fifth)
      this.osc1 = this.audioCtx.createOscillator();
      this.osc2 = this.audioCtx.createOscillator();
      this.osc1.type = 'triangle';
      this.osc1.frequency.setValueAtTime(216, this.audioCtx.currentTime);
      this.osc2.type = 'sine';
      this.osc2.frequency.setValueAtTime(324, this.audioCtx.currentTime);

      this.osc1.connect(this.gainNode);
      this.osc2.connect(this.gainNode);
      this.osc1.start();
      this.osc2.start();
      this.isPlaying = true;
    } catch (e) {
      console.warn('Ambient chime error:', e);
    }
  }

  stop() {
    try {
      if (this.osc1) {
        this.osc1.stop();
        this.osc1.disconnect();
      }
      if (this.osc2) {
        this.osc2.stop();
        this.osc2.disconnect();
      }
      this.isPlaying = false;
    } catch (e) {}
  }
}
