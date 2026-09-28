export const initialSeedData = {
  users: [
    {
      _id: 'user-student-1',
      name: 'Maya Lin',
      email: 'student@orbit.edu',
      password: '$2a$10$e7Ww0Bw8/s9Nl4C...password123hash',
      plainPassword: 'password123',
      role: 'student',
      grade: 'Middle School',
      subjects: ['Science', 'Mathematics'],
      preferredLanguage: 'en',
      goals: ['Master Core Algebra', 'Prepare for Science Olympiad'],
      classIds: ['class-7a'],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      masteredTopicsCount: 6,
      points: 480,
      streakDays: 5,
      badges: [
        { code: 'first_quiz', title: 'First Steps', icon: 'Award', earnedAt: '2026-09-20T10:00:00Z' },
        { code: 'streak_3', title: '3-Day Explorer', icon: 'Zap', earnedAt: '2026-09-22T14:30:00Z' },
        { code: 'master_photosynthesis', title: 'Plant Scientist', icon: 'Leaf', earnedAt: '2026-09-24T16:00:00Z' }
      ]
    },
    {
      _id: 'user-independent-1',
      name: 'Alex Rivera',
      email: 'learner@orbit.edu',
      password: '$2a$10$e7Ww0Bw8/s9Nl4C...password123hash',
      plainPassword: 'password123',
      role: 'independent',
      grade: 'Self-Paced / Adult Learner',
      subjects: ['Mathematics', 'Science', 'English'],
      preferredLanguage: 'en',
      goals: ['Data Literacy', 'Practical Physics & Energy'],
      classIds: [],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      masteredTopicsCount: 4,
      points: 320,
      streakDays: 3,
      badges: [
        { code: 'self_starter', title: 'Self-Directed Learner', icon: 'Compass', earnedAt: '2026-09-21T09:00:00Z' },
        { code: 'download_pro', title: 'Offline Ready', icon: 'Download', earnedAt: '2026-09-23T11:15:00Z' }
      ]
    },
    {
      _id: 'user-teacher-1',
      name: 'Ms. Sarah Vance',
      email: 'teacher@orbit.edu',
      password: '$2a$10$e7Ww0Bw8/s9Nl4C...password123hash',
      plainPassword: 'password123',
      role: 'teacher',
      grade: 'Middle School STEM Lead Teacher',
      subjects: ['Science', 'Mathematics'],
      preferredLanguage: 'en',
      goals: ['Close math concept gaps in Class 7A'],
      classIds: ['class-7a'],
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
      masteredTopicsCount: 0,
      points: 1200,
      streakDays: 12,
      badges: []
    },
    {
      _id: 'user-super-admin',
      name: 'Super Admin',
      email: 'admin@offline-orbit.edu',
      password: '$2a$10$e7Ww0Bw8/s9Nl4C...password123hash',
      plainPassword: 'password123',
      role: 'admin',
      grade: 'Root Administrator',
      subjects: ['System Security', 'Classroom Telemetry', 'User Governance'],
      preferredLanguage: 'en',
      goals: ['System Administration', 'Telemetry Monitoring'],
      classIds: [],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      masteredTopicsCount: 12,
      points: 9999,
      streakDays: 30,
      badges: []
    }
  ],

  classes: [
    {
      _id: 'class-7a',
      className: 'Middle School Science & Math (Room 7A)',
      grade: 'Middle School',
      subject: 'Science & Math',
      code: 'ORBIT-7A',
      teacherId: 'user-teacher-1',
      studentIds: ['user-student-1', 'user-student-2', 'user-student-3', 'user-student-4'],
      description: 'Interactive STEM class focusing on photosynthesis, linear equations, and ecosystem balances.',
      cooperativeGoal: {
        title: 'Class 500 Practice Questions Challenge',
        target: 500,
        current: 385
      }
    }
  ],

  lessons: [
    {
      _id: 'lesson-1',
      title: 'Photosynthesis & Cellular Energy',
      subject: 'Science',
      topic: 'Plant Biology & Energy Flow',
      grade: 'Middle School',
      summary: 'Explore how plants transform sunlight, carbon dioxide, and water into chemical energy (glucose) and oxygen, fueling ecosystems worldwide.',
      sizeKB: 420,
      estimatedMinutes: 12,
      orderIndex: 1,
      sections: [
        {
          id: 'sec-1',
          title: '1. What is Photosynthesis?',
          content: 'Photosynthesis is the fundamental biological process by which green plants, algae, and cyanobacteria convert solar radiation into stored chemical energy. Utilizing chlorophyll pigments housed inside chloroplasts, plants capture photons of sunlight to drive a chemical reaction combining carbon dioxide (CO2) from the air and water (H2O) from the soil.\n\nThe chemical equation representing this transformation is:\n6CO₂ + 6H₂O + Light Energy ➔ C₆H₁₂O₆ + 6O₂\n\nThis simple reaction sustains almost all aerobic life on Earth by replenishing atmospheric oxygen and serving as the foundational energy source for terrestrial food webs.',
          audioUrl: '/media/audio_photosynthesis_intro.mp3',
          videoPlaceholderUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
          keyTakeaways: [
            'Chlorophyll inside chloroplasts absorbs red and blue light while reflecting green.',
            'Reactants: Carbon Dioxide + Water + Sunlight.',
            'Products: Glucose (sugar) + Oxygen (gas).'
          ],
          explanations: {
            simpler: 'Think of a leaf as a tiny solar-powered kitchen! Sunlight provides the electricity, roots sip water, and leaves breathe in carbon dioxide. The plant cooks up tasty sugar to eat and breathes out fresh oxygen for us to breathe.',
            stepByStep: 'Step 1: Stomata on leaf surfaces open to absorb atmospheric CO2.\nStep 2: Xylem vessels transport water absorbed by roots up to the leaves.\nStep 3: Chlorophyll pigments absorb sunlight energy.\nStep 4: Light energy splits water molecules into oxygen gas and hydrogen ions.\nStep 5: Carbon dioxide and hydrogen combine to form glucose (sugar).',
            workedExample: 'Example Problem: If a greenhouse plant absorbs 12 moles of CO2 and 12 moles of H2O under optimal LED lighting, how many moles of glucose and oxygen will it produce?\nSolution: Using the 1:1 ratio for (6:6:1:6), 12 CO2 + 12 H2O yield 2 moles of C6H12O6 (glucose) and 12 moles of O2.',
            realWorld: 'Real-world Application: Vertical urban farming uses custom spectrum LED lights (red and blue frequencies) to accelerate photosynthesis indoors, producing 10x more crops per square meter while using 95% less water than traditional soil farming.'
          }
        },
        {
          id: 'sec-2',
          title: '2. Stomata and Gas Exchange',
          content: 'Microscopic pores called stomata dot the epidermis of leaves. Guard cells swell or shrink to regulate the opening of stomata, balancing carbon dioxide intake against water vapor loss (transpiration). During hot or dry weather, guard cells close stomata to prevent dehydration, temporarily reducing photosynthetic rate.',
          audioUrl: '/media/audio_stomata.mp3',
          videoPlaceholderUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
          keyTakeaways: [
            'Guard cells control stomatal openings.',
            'Transpiration pulls water upward from roots through capillary action.',
            'Stomata close during drought to prevent wilting.'
          ],
          explanations: {
            simpler: 'Stomata are tiny breathing doors on the underside of leaves. Guard cells act like security guards—they open the doors when it is safe to let carbon dioxide in, and lock them shut when it is too dry so the plant does not dry out.',
            stepByStep: '1. Guard cells pump potassium ions inside.\n2. Water follows by osmosis, swelling the guard cells.\n3. The swollen cells bow outward, opening the pore.\n4. Atmospheric gas exchanges freely.',
            workedExample: 'If a desert succulent closes its stomata for 14 hours during peak sunlight, how does it survive?\nAnswer: Succulents use CAM photosynthesis, storing carbon dioxide at night in organic acids and utilizing it during the day while stomata stay tightly closed!',
            realWorld: 'Anti-transpirant sprays are sprayed on orchard trees before heatwaves to help stomata reduce water evaporation during extreme droughts.'
          }
        }
      ],
      languageTranslations: {
        es: {
          title: 'Fotosíntesis y Energía Celular',
          summary: 'Explora cómo las plantas transforman la luz solar, el dióxido de carbono y el agua en energía química (glucosa) y oxígeno.',
          sections: [
            {
              title: '1. ¿Qué es la Fotosíntesis?',
              content: 'La fotosíntesis es el proceso biológico fundamental mediante el cual las plantas verdes, algas y cianobacterias convierten la radiación solar en energía química almacenada.',
              keyTakeaways: [
                'La clorofila absorbe luz roja y azul y refleja el verde.',
                'Reactivos: Dióxido de carbono + Agua + Luz solar.',
                'Productos: Glucosa + Oxígeno.'
              ]
            }
          ]
        },
        hi: {
          title: 'प्रकाश संश्लेषण और कोशिकीय ऊर्जा',
          summary: 'जानें कि पौधे सूर्य के प्रकाश, कार्बन डाइऑक्साइड और पानी को रासायनिक ऊर्जा (ग्लूकोज) और ऑक्सीजन में कैसे बदलते हैं।',
          sections: [
            {
              title: '1. प्रकाश संश्लेषण क्या है?',
              content: 'प्रकाश संश्लेषण वह प्रक्रिया है जिसके द्वारा हरे पौधे सूर्य के प्रकाश का उपयोग करके अपना भोजन (ग्लूकोज) बनाते हैं और ऑक्सीजन छोड़ते हैं।',
              keyTakeaways: [
                'क्लोरोफिल सूर्य के प्रकाश को अवशोषित करता है।',
                'कच्ची सामग्री: कार्बन डाइऑक्साइड, पानी और धूप।',
                'उत्पाद: ग्लूकोज और ऑक्सीजन।'
              ]
            }
          ]
        },
        fr: {
          title: 'La Photosynthèse et l\'Énergie Cellulaire',
          summary: 'Découvrez comment les plantes tansforment la lumière du soleil, le dioxyde de carbone et l\'eau en énergie chimique.',
          sections: [
            {
              title: '1. Qu\'est-ce que la Photosynthèse ?',
              content: 'La photosynthèse est le processus biologique fondamental par lequel les plantes vertes convertissent la lumière du soleil en énergie.',
              keyTakeaways: [
                'La chlorophylle absorbe la lumière.',
                'Réactifs: CO2 + Eau + Lumière du soleil.',
                'Produits: Glucose + Oxygène.'
              ]
            }
          ]
        }
      }
    },

    {
      _id: 'lesson-2',
      title: 'Ratios, Proportions & Unit Rates',
      subject: 'Mathematics',
      topic: 'Ratios & Proportional Reasoning',
      grade: 'Middle School',
      summary: 'Master equivalent ratios, unit rate calculations, scale factors, and real-life proportional problem solving.',
      sizeKB: 380,
      estimatedMinutes: 15,
      orderIndex: 2,
      sections: [
        {
          id: 'sec-math-1',
          title: '1. Understanding Ratios and Unit Rates',
          content: 'A ratio compares two quantities of similar or different units. For example, if a solar charger generates 40 Watt-hours of energy in 2 hours, the ratio of energy to time is 40:2.\n\nA unit rate simplifies a ratio so that the second quantity is 1 unit. Dividing 40 by 2 yields a unit rate of 20 Watt-hours per 1 hour.\n\nUnit rates allow direct comparison between different brands, speeds, pricing, and scaling formulas.',
          audioUrl: '/media/audio_ratios.mp3',
          videoPlaceholderUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
          keyTakeaways: [
            'Ratio notation: a:b, a to b, or a/b.',
            'Unit rate has a denominator of 1.',
            'Multiply or divide both terms of a ratio by the same non-zero number to create equivalent ratios.'
          ],
          explanations: {
            simpler: 'A ratio is just a recipe comparison! If a recipe calls for 2 cups of water for every 1 cup of rice, the ratio is 2 to 1. Unit rate answers: "How much do I need for just ONE item?"',
            stepByStep: '1. Identify the two quantities (e.g., $15 for 3 notebooks).\n2. Write as a fraction: 15 / 3.\n3. Divide numerator by denominator: 15 ÷ 3 = 5.\n4. Express with proper units: $5 per notebook.',
            workedExample: 'Problem: Car A travels 240 miles on 8 gallons of fuel. Car B travels 330 miles on 11 gallons. Which car is more fuel-efficient?\nSolution:\nCar A unit rate = 240 ÷ 8 = 30 miles per gallon.\nCar B unit rate = 330 ÷ 11 = 30 miles per gallon.\nBoth cars have identical fuel efficiency!',
            realWorld: 'Data Transfer Rates: Downloading a 600 MB offline lesson pack in 30 seconds gives a unit download speed of 600 ÷ 30 = 20 MB/s.'
          }
        }
      ],
      languageTranslations: {
        es: {
          title: 'Razones, Proporciones y Tasas Unitarias',
          summary: 'Domina las razones equivalentes, las tasas unitarias y la resolución de problemas proporcionales.',
          sections: [
            {
              title: '1. Comprensión de Razones y Tasas Unitarias',
              content: 'Una razón compara dos cantidades. Una tasa unitaria simplifica la razón para que la segunda cantidad sea 1.',
              keyTakeaways: ['Notación: a:b o a/b', 'La tasa unitaria tiene denominador 1.']
            }
          ]
        }
      }
    },

    {
      _id: 'lesson-3',
      title: 'Linear Equations & Problem Solving',
      subject: 'Mathematics',
      topic: 'Algebraic Expressions & Equations',
      grade: 'Middle School',
      summary: 'Learn inverse operations to solve one-step and two-step linear equations involving integers and fractions.',
      sizeKB: 390,
      estimatedMinutes: 18,
      orderIndex: 3,
      sections: [
        {
          id: 'sec-eq-1',
          title: '1. Solving Two-Step Equations',
          content: 'A two-step linear equation takes the form ax + b = c. To isolate the variable x:\n1. Undo addition or subtraction first using inverse operations.\n2. Undo multiplication or division second.\n\nExample: Solve 3x + 7 = 22\nSubtract 7 from both sides: 3x = 15\nDivide both sides by 3: x = 5.\n\nAlways verify your solution by substituting the value back into the original equation.',
          audioUrl: '/media/audio_equations.mp3',
          videoPlaceholderUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
          keyTakeaways: [
            'Maintain balance: whatever you do to one side of an equation, do to the other side.',
            'Inverse of addition is subtraction; inverse of multiplication is division.',
            'Isolate x by working backward through order of operations.'
          ],
          explanations: {
            simpler: 'Think of an equation like a balanced seesaw! If you take 7 pounds off the right side, you must take 7 pounds off the left side so it stays level.',
            stepByStep: 'Given: 4x - 5 = 19\nStep 1: Add 5 to both sides: 4x = 24\nStep 2: Divide both sides by 4: x = 6\nCheck: 4(6) - 5 = 24 - 5 = 19. Correct!',
            workedExample: 'A school bus rental costs a flat fee of $50 plus $3 per student. If the total bill is $116, how many students are going?\nEquation: 3s + 50 = 116\nSubtract 50: 3s = 66\nDivide by 3: s = 22 students.',
            realWorld: 'Solar battery level calculation: Remaining power P = 100 - 8h (where h is hours of usage). If battery drops to 36%, how many hours passed? 100 - 8h = 36 -> 8h = 64 -> h = 8 hours.'
          }
        }
      ]
    },

    {
      _id: 'lesson-4',
      title: 'Ecosystem Dynamics & Biodiversity',
      subject: 'Science',
      topic: 'Ecology & Environmental Science',
      grade: 'Middle School',
      summary: 'Investigate food webs, energy pyramids, trophic levels, and ecological resilience.',
      sizeKB: 410,
      estimatedMinutes: 14,
      orderIndex: 4,
      sections: [
        {
          id: 'sec-eco-1',
          title: '1. Food Chains and Trophic Pyramids',
          content: 'Energy enters ecosystems through producers (autotrophs) like plants. Primary consumers (herbivores) feed on plants, secondary consumers (carnivores) feed on herbivores, and decomposers recycle organic nutrients back into the soil.\n\nOnly about 10% of energy is transferred from one trophic level to the next; 90% is lost as heat through metabolic respiration.',
          audioUrl: '/media/audio_ecosystems.mp3',
          videoPlaceholderUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
          keyTakeaways: [
            'Producers convert solar energy into chemical energy.',
            'The 10% Energy Rule limits food chain length.',
            'Decomposers return vital nitrogen and phosphorus to soil.'
          ],
          explanations: {
            simpler: 'Energy flows like a relay race in nature! Plants grab energy from the sun, bugs eat plants, birds eat bugs, and hawks eat birds. But at each hand-off, 90% of the energy is used up by living and breathing.',
            stepByStep: '1. Sun shines on grass -> 10,000 Joules captured.\n2. Grasshoppers eat grass -> 1,000 Joules retained.\n3. Frogs eat grasshoppers -> 100 Joules retained.\n4. Snakes eat frogs -> 10 Joules retained.',
            workedExample: 'If a meadow produces 50,000 kJ of biomass energy in clover plants, how much energy reaches the red-tailed hawk (tertiary consumer)?\nClover (50,000) -> Rabbit (5,000) -> Snake (500) -> Hawk (50 kJ).',
            realWorld: 'Conservation biology: Protecting apex predators like wolves in Yellowstone restored riverbanks because wolves controlled deer populations, allowing saplings to grow back!'
          }
        }
      ]
    },

    {
      _id: 'lesson-cs-1',
      title: 'Computer Science: Algorithms, Data Structures & Python',
      subject: 'Computer Science',
      topic: 'Algorithms & Problem Solving',
      grade: 'All Levels',
      summary: 'Learn essential computer science principles: algorithmic thinking, computational complexity (Big O), linear vs binary search, and Python data structures.',
      sizeKB: 450,
      estimatedMinutes: 20,
      orderIndex: 5,
      sections: [
        {
          id: 'sec-cs-1',
          title: '1. Algorithmic Thinking & Complexity',
          content: 'An algorithm is a finite step-by-step sequence of instructions designed to solve a problem or perform a computation. In computer science, algorithm efficiency is evaluated using Big O notation, measuring time and space growth as input size N scales.\n\nLinear Search scans elements one by one with O(N) complexity. Binary Search divides a sorted array in half at each step with O(log N) efficiency.',
          audioUrl: '/media/audio_cs_intro.mp3',
          videoPlaceholderUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
          keyTakeaways: [
            'Algorithm: Step-by-step computational procedure.',
            'Binary Search requires a pre-sorted array and operates in O(log N) time.',
            'Data structures (Lists, Hash Maps, Trees) organize data for fast retrieval.'
          ],
          explanations: {
            simpler: 'Think of looking up a word in a dictionary! Linear search turns every page from the beginning. Binary search opens the book right in the middle, sees if the word comes before or after, and cuts the remaining pages in half every single time!',
            stepByStep: '1. Start with a sorted list of N numbers.\n2. Find the middle element.\n3. If target matches middle, return index.\n4. If target is smaller, search left half; if larger, search right half.\n5. Repeat until found or range is empty.',
            workedExample: 'Problem: How many steps does Binary Search take at most to search through 1,048,576 sorted items?\nSolution: log2(1048576) = 20 steps maximum!',
            realWorld: 'Search Engines: Google and database indices use B-Trees and Hash Tables to search billions of web pages in milliseconds.'
          }
        }
      ]
    },

    {
      _id: 'lesson-cs-2',
      title: 'Artificial Intelligence & Machine Learning Fundamentals',
      subject: 'Computer Science',
      topic: 'Artificial Intelligence & Data',
      grade: 'All Levels',
      summary: 'Explore neural networks, supervised vs unsupervised learning, model evaluation metrics, and AI prompt engineering.',
      sizeKB: 480,
      estimatedMinutes: 22,
      orderIndex: 6,
      sections: [
        {
          id: 'sec-cs-2',
          title: '1. Supervised Learning & Neural Networks',
          content: 'Machine Learning enables computers to learn patterns from data without being explicitly programmed. Supervised learning trains models using labeled dataset pairs (inputs x, ground truth y). Artificial Neural Networks consist of input layers, hidden layers with activation functions, and output predictions optimized via backpropagation and gradient descent.',
          audioUrl: '/media/audio_ai_intro.mp3',
          videoPlaceholderUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
          keyTakeaways: [
            'Supervised Learning: Trained on labeled input-output examples.',
            'Neural Networks adjust weights using Gradient Descent and Backpropagation.',
            'Evaluation metrics: Accuracy, Precision, Recall, and F1-Score.'
          ],
          explanations: {
            simpler: 'A neural network is like a team of detectives! Each detective looks at a tiny detail of a picture (like cat ears or whiskers), passes their vote down the line, and decides whether the image is a cat or a dog!',
            stepByStep: '1. Input features enter the network.\n2. Weights and biases calculate weighted sums.\n3. Activation functions (ReLU, Sigmoid) introduce non-linearity.\n4. Output error is measured via Loss Function.\n5. Backpropagation adjusts weights to reduce error.',
            workedExample: 'If a spam filter model correctly classifies 90 spam emails out of 100 total spam emails, its Recall rate is 90 / 100 = 90%.',
            realWorld: 'Autonomous Vehicles: Self-driving cars process camera video frames using Convolutional Neural Networks (CNNs) in real-time to detect pedestrians and lane boundaries.'
          }
        }
      ]
    }
  ],

  quizzes: [
    {
      _id: 'quiz-diagnostic-assessment',
      title: 'Middle School STEM Diagnostic Assessment (10 Questions)',
      subject: 'STEM Curriculum',
      topic: 'Comprehensive Diagnostic',
      grade: 'Middle School',
      type: 'diagnostic',
      questions: [
        {
          id: 'q-diag-1',
          questionText: '1. What are the main chemical outputs (products) of plant photosynthesis?',
          options: [
            'Carbon dioxide and water',
            'Glucose (sugar) and oxygen gas',
            'Nitrogen and solar radiation',
            'Chlorophyll and soil minerals'
          ],
          correctAnswerIndex: 1,
          misconceptionMap: {
            '0': 'Carbon dioxide and water are the reactants consumed by plants, not the products generated.',
            '2': 'Solar radiation is the energy input absorbed by chlorophyll.',
            '3': 'Chlorophyll is the green cellular pigment that drives the reaction.'
          },
          explanation: 'Photosynthesis converts carbon dioxide and water using sunlight into glucose sugar and oxygen gas.',
          followUpQuestion: {
            questionText: 'Which organelle inside plant cells absorbs sunlight to drive photosynthesis?',
            options: ['Mitochondria', 'Chloroplast', 'Cell Wall', 'Nucleus'],
            correctAnswerIndex: 1,
            explanation: 'Chloroplasts contain green chlorophyll pigments that absorb solar light energy.'
          }
        },
        {
          id: 'q-diag-2',
          questionText: '2. Solve for x in the two-step linear equation: 3x - 4 = 14',
          options: ['x = 4', 'x = 6', 'x = 18', 'x = 3.3'],
          correctAnswerIndex: 1,
          misconceptionMap: {
            '0': 'Check your addition: 14 + 4 = 18, then divide 18 by 3.',
            '2': 'You added 4 to 14 to get 18, but forgot to divide by the coefficient 3.',
            '3': 'Remember to add 4 to 14, not subtract 4.'
          },
          explanation: 'Add 4 to both sides: 3x = 18. Divide both sides by 3: x = 6.',
          followUpQuestion: {
            questionText: 'Now solve for y: 5y + 10 = 35',
            options: ['y = 5', 'y = 7', 'y = 9', 'y = 25'],
            correctAnswerIndex: 0,
            explanation: 'Subtract 10 from both sides: 5y = 25. Divide by 5: y = 5.'
          }
        },
        {
          id: 'q-diag-3',
          questionText: '3. If a vehicle travels 120 kilometers in 2 hours, what is its unit speed rate?',
          options: ['240 km/h', '60 km/h', '50 km/h', '30 km/h'],
          correctAnswerIndex: 1,
          misconceptionMap: {
            '0': 'You multiplied distance by time instead of dividing distance by time.',
            '2': 'Check your division math: 120 divided by 2.'
          },
          explanation: 'Unit rate = total distance divided by total time = 120 km ÷ 2 hours = 60 km/h.',
          followUpQuestion: {
            questionText: 'How far will this vehicle travel in 4 hours at the same unit rate?',
            options: ['180 km', '240 km', '300 km', '120 km'],
            correctAnswerIndex: 1,
            explanation: '60 km/h × 4 hours = 240 km.'
          }
        },
        {
          id: 'q-diag-4',
          questionText: '4. What is the time complexity (Big O) of Binary Search on a pre-sorted array of size N?',
          options: ['O(N)', 'O(log N)', 'O(N^2)', 'O(1)'],
          correctAnswerIndex: 1,
          misconceptionMap: {
            '0': 'O(N) is the time complexity of Linear Search, which scans elements one by one.',
            '2': 'O(N^2) represents nested loops like Bubble Sort.',
            '3': 'O(1) represents direct constant array index access.'
          },
          explanation: 'Binary Search halves the search space at each step, operating in logarithmic time O(log N).',
          followUpQuestion: {
            questionText: 'What prerequisite must array elements meet before applying Binary Search?',
            options: ['Must be all even numbers', 'Array elements must be sorted', 'Must contain strings only', 'Array size must be prime'],
            correctAnswerIndex: 1,
            explanation: 'Binary Search requires array elements to be in sorted order.'
          }
        },
        {
          id: 'q-diag-5',
          questionText: '5. In Artificial Neural Networks, which algorithm adjusts network weights to minimize prediction loss?',
          options: ['Binary Tree Traversal', 'Backpropagation and Gradient Descent', 'Linear Interpolation', 'Hashing'],
          correctAnswerIndex: 1,
          misconceptionMap: {
            '0': 'Binary Tree Traversal is used for searching hierarchical data structures.',
            '2': 'Linear Interpolation estimates values between known points.',
            '3': 'Hashing converts keys to fixed-size array indices.'
          },
          explanation: 'Backpropagation calculates error gradients backwards through layers, while Gradient Descent updates weights to reduce loss.',
          followUpQuestion: {
            questionText: 'Which function introduces non-linear decision boundaries inside hidden neural layers?',
            options: ['Activation Function (e.g. ReLU, Sigmoid)', 'Sorting Function', 'Print Function', 'Random Generator'],
            correctAnswerIndex: 0,
            explanation: 'Activation functions like ReLU or Sigmoid allow neural networks to learn complex non-linear patterns.'
          }
        },
        {
          id: 'q-diag-6',
          questionText: '6. According to Newton\'s Second Law of Motion, what happens to acceleration if net force doubles while mass remains constant?',
          options: ['Acceleration stays the same', 'Acceleration doubles', 'Acceleration decreases by half', 'Acceleration quadruples'],
          correctAnswerIndex: 1,
          misconceptionMap: {
            '0': 'Acceleration is directly proportional to net force (F = m × a).',
            '2': 'Acceleration increases when force increases.',
            '3': 'Force and acceleration have a linear 1:1 relationship, not quadratic.'
          },
          explanation: 'From F = m × a, if force F doubles and mass m is constant, acceleration a must also double.',
          followUpQuestion: {
            questionText: 'What is the acceleration of a 5 kg object acted upon by a net force of 20 Newtons?',
            options: ['2 m/s²', '4 m/s²', '100 m/s²', '15 m/s²'],
            correctAnswerIndex: 1,
            explanation: 'a = F ÷ m = 20 N ÷ 5 kg = 4 m/s².'
          }
        },
        {
          id: 'q-diag-7',
          questionText: '7. When balancing the chemical equation: __ H₂ + O₂ ➔ 2 H₂O, what coefficient balances hydrogen?',
          options: ['1', '2', '3', '4'],
          correctAnswerIndex: 1,
          misconceptionMap: {
            '0': '1 H2 yields only 2 hydrogen atoms, but 2 H2O contains 4 hydrogen atoms.',
            '2': '3 H2 would give 6 hydrogen atoms, which is too many.',
            '3': '4 H2 would give 8 hydrogen atoms.'
          },
          explanation: '2 H2 + O2 ➔ 2 H2O gives 4 hydrogen atoms and 2 oxygen atoms on both sides.',
          followUpQuestion: {
            questionText: 'What law states that mass cannot be created or destroyed in chemical reactions?',
            options: ['Law of Universal Gravitation', 'Law of Conservation of Mass', 'Ohm\'s Law', 'Boyle\'s Law'],
            correctAnswerIndex: 1,
            explanation: 'The Law of Conservation of Mass dictates that total mass of reactants must equal total mass of products.'
          }
        },
        {
          id: 'q-diag-8',
          questionText: '8. What nitrogenous base pairs with Adenine (A) in RNA molecules during gene transcription?',
          options: ['Thymine (T)', 'Uracil (U)', 'Cytosine (C)', 'Guanine (G)'],
          correctAnswerIndex: 1,
          misconceptionMap: {
            '0': 'Thymine pairs with Adenine in DNA, but RNA replaces Thymine with Uracil.',
            '2': 'Cytosine pairs with Guanine.',
            '3': 'Guanine pairs with Cytosine.'
          },
          explanation: 'In RNA synthesis, Uracil (U) pairs with Adenine (A) instead of Thymine (T).',
          followUpQuestion: {
            questionText: 'Where does mRNA translation into protein amino acid chains occur inside cells?',
            options: ['Nucleus', 'Ribosome', 'Vacuole', 'Cell Membrane'],
            correctAnswerIndex: 1,
            explanation: 'Ribosomes read mRNA codon sequences to assemble amino acids into proteins.'
          }
        },
        {
          id: 'q-diag-9',
          questionText: '9. In ecological energy pyramids, approximately what percentage of biomass energy is passed to the next trophic level?',
          options: ['100%', '50%', '10%', '1%'],
          correctAnswerIndex: 2,
          misconceptionMap: {
            '0': 'Energy is lost at each level due to cellular respiration and metabolic heat.',
            '1': '50% is too high; organisms use 90% of energy for metabolic survival.',
            '3': '1% represents solar energy capture by producers, not trophic transfer.'
          },
          explanation: 'The 10% Energy Rule states that approximately 10% of energy moves up to each successive trophic level.',
          followUpQuestion: {
            questionText: 'If producer plants contain 20,000 Joules of energy, how much energy reaches primary consumers (herbivores)?',
            options: ['20,000 J', '2,000 J', '200 J', '20 J'],
            correctAnswerIndex: 1,
            explanation: '10% of 20,000 J = 2,000 Joules.'
          }
        },
        {
          id: 'q-diag-10',
          questionText: '10. According to Ohm\'s Law (V = I × R), what happens to current I if voltage V remains constant while resistance R increases?',
          options: ['Current increases', 'Current decreases', 'Current remains unchanged', 'Current drops to zero immediately'],
          correctAnswerIndex: 1,
          misconceptionMap: {
            '0': 'Current decreases when resistance increases for a fixed voltage.',
            '2': 'Current changes inversely with resistance.',
            '3': 'Current decreases proportionally, not dropping to zero.'
          },
          explanation: 'From I = V ÷ R, increasing resistance R causes current I to decrease for a constant voltage V.',
          followUpQuestion: {
            questionText: 'What is the current flowing through a circuit with 12 Volts across a 4 Ohm resistor?',
            options: ['3 Amperes', '48 Amperes', '8 Amperes', '0.33 Amperes'],
            correctAnswerIndex: 0,
            explanation: 'I = V ÷ R = 12 V ÷ 4 Ω = 3 Amperes.'
          }
        }
      ]
    },

    {
      _id: 'quiz-lesson-1',
      title: 'Photosynthesis Mastery Quiz',
      lessonId: 'lesson-1',
      topic: 'Plant Biology & Energy Flow',
      subject: 'Science',
      grade: 'Middle School',
      type: 'lesson_quiz',
      questions: [
        {
          id: 'q-p1',
          questionText: 'Why do plant leaves appear green to human eyes?',
          options: [
            'Chlorophyll absorbs green light and reflects red light',
            'Chlorophyll reflects green light wavelengths while absorbing red and blue light',
            'Stomata secrete green pigment during transpiration',
            'Water inside guard cells bends sunlight into green rainbows'
          ],
          correctAnswerIndex: 1,
          misconceptionMap: {
            '0': 'The color we SEE is the color REFLECTED back to our eyes, not absorbed!',
            '2': 'Stomata are pores for gas exchange, not pigment secretors.',
            '3': 'Refraction in guard cells does not create green coloration.'
          },
          explanation: 'Chlorophyll absorbs blue and red wavelengths for energy, reflecting unused green wavelengths back to our eyes.',
          followUpQuestion: {
            questionText: 'What gas passes OUT of stomata as a waste product of photosynthesis?',
            options: ['Carbon Dioxide', 'Oxygen', 'Methane', 'Helium'],
            correctAnswerIndex: 1,
            explanation: 'Oxygen gas produced from splitting water molecules is released via stomata.'
          }
        }
      ]
    }
  ],

  progressData: [
    {
      userId: 'user-student-1',
      subject: 'Science',
      topicMastery: [
        { topic: 'Plant Biology & Energy Flow', status: 'mastered', scoreAvg: 92, lastPracticed: '2026-09-24T16:00:00Z' },
        { topic: 'Ecology & Environmental Science', status: 'practising', scoreAvg: 74, lastPracticed: '2026-09-23T11:00:00Z' },
        { topic: 'Cell Biology & Genetics', status: 'needs_review', scoreAvg: 58, lastPracticed: '2026-09-20T10:00:00Z' }
      ],
      quizAttempts: [
        { quizId: 'quiz-diagnostic-assessment', quizTitle: 'Middle School Diagnostic', topic: 'Diagnostic', score: 2, total: 3, percentage: 67, completedAt: '2026-09-20T10:00:00Z', offlineSynced: true },
        { quizId: 'quiz-lesson-1', quizTitle: 'Photosynthesis Mastery', topic: 'Plant Biology', score: 1, total: 1, percentage: 100, completedAt: '2026-09-24T16:00:00Z', offlineSynced: true }
      ],
      completedLessons: ['lesson-1', 'lesson-2'],
      downloadedPacks: ['lesson-1', 'lesson-2']
    }
  ]
};
