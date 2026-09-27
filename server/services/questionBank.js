// Rich Multi-Domain & Multi-Tier STEM Question Bank
// Generates personalized 10-question quizzes tailored to interest and education level

export const QUESTION_BANK = {
  'Computer Science & AI': {
    'Beginner': [
      {
        id: 'cs-b1',
        questionText: '1. What is an algorithm in computer science?',
        options: [
          'A hardware component inside a computer monitor',
          'A step-by-step set of rules or instructions to solve a problem',
          'A type of wireless internet connection',
          'A physical cable used to connect power'
        ],
        correctAnswerIndex: 1,
        misconceptionMap: { '0': 'An algorithm is a software/logic concept, not a hardware part.' },
        explanation: 'An algorithm is a step-by-step computational procedure for solving a problem.'
      },
      {
        id: 'cs-b2',
        questionText: '2. Which statement best describes a Boolean variable?',
        options: [
          'A variable that can hold decimal numbers like 3.14',
          'A variable that stores text sentences',
          'A variable that can only hold one of two values: True or False',
          'A list of multiple items'
        ],
        correctAnswerIndex: 2,
        misconceptionMap: { '0': 'Decimals are floats. Booleans are strictly True or False.' },
        explanation: 'Booleans evaluate strictly to binary logic states: True or False.'
      },
      {
        id: 'cs-b3',
        questionText: '3. What is the time complexity of scanning every item in an unsorted list of size N?',
        options: ['O(1) Constant', 'O(N) Linear', 'O(N^2) Quadratic', 'O(log N) Logarithmic'],
        correctAnswerIndex: 1,
        misconceptionMap: { '0': 'Linear search checks each of the N items once.' },
        explanation: 'Scanning N unsorted items one by one takes O(N) linear time.'
      },
      {
        id: 'cs-b4',
        questionText: '4. Which symbol is used for equality comparison in Python programming?',
        options: ['=', '==', ':=', 'equals()'],
        correctAnswerIndex: 1,
        misconceptionMap: { '0': 'Single = is assignment. Double == is equality comparison.' },
        explanation: 'In Python, `==` tests equality while `=` assigns a value.'
      },
      {
        id: 'cs-b5',
        questionText: '5. What does CPU stand for in computer hardware?',
        options: ['Central Processing Unit', 'Computer Power Utility', 'Central Program Unit', 'Core Processing User'],
        correctAnswerIndex: 0,
        explanation: 'CPU stands for Central Processing Unit, the primary micro-processor of a computer.'
      },
      {
        id: 'cs-b6',
        questionText: '6. Which data structure operates on First-In, First-Out (FIFO) ordering?',
        options: ['Stack', 'Queue', 'Tree', 'Graph'],
        correctAnswerIndex: 1,
        misconceptionMap: { '0': 'Stacks use Last-In, First-Out (LIFO). Queues use FIFO.' },
        explanation: 'A Queue processes items in First-In, First-Out (FIFO) sequence.'
      },
      {
        id: 'cs-b7',
        questionText: '7. What is a loop in programming?',
        options: [
          'A bug that crashes the computer',
          'A code structure that repeats a block of instructions while a condition is true',
          'A style of font used in code editors',
          'A network router component'
        ],
        correctAnswerIndex: 1,
        explanation: 'Loops (like `for` and `while`) execute instructions repeatedly based on a condition.'
      },
      {
        id: 'cs-b8',
        questionText: '8. Binary code used by computers is composed of which two digits?',
        options: ['0 and 1', '1 and 2', '0 and 10', 'A and B'],
        correctAnswerIndex: 0,
        explanation: 'Computers use binary states represented as 0 (off) and 1 (on).'
      },
      {
        id: 'cs-b9',
        questionText: '9. What is a function parameter?',
        options: [
          'The size of the computer screen',
          'An input variable passed into a function to customize its output',
          'The battery level of a laptop',
          'The file extension of a script'
        ],
        correctAnswerIndex: 1,
        explanation: 'Function parameters accept values passed into a function when called.'
      },
      {
        id: 'cs-b10',
        questionText: '10. What does HTML stand for in web technology?',
        options: [
          'HyperText Markup Language',
          'High Tech Machine Learning',
          'Hyper Transfer Mode Logic',
          'Home Tool Management Link'
        ],
        correctAnswerIndex: 0,
        explanation: 'HTML stands for HyperText Markup Language, the standard formatting language for web pages.'
      }
    ],

    'Intermediate': [
      {
        id: 'cs-i1',
        questionText: '1. What is the time complexity (Big O) of Binary Search on a pre-sorted array of size N?',
        options: ['O(N)', 'O(log N)', 'O(N^2)', 'O(1)'],
        correctAnswerIndex: 1,
        misconceptionMap: { '0': 'O(N) is Linear Search. Binary Search operates in O(log N) logarithmic time.' },
        explanation: 'Binary Search halves the search space at each step, achieving O(log N) complexity.'
      },
      {
        id: 'cs-i2',
        questionText: '2. In Artificial Neural Networks, which algorithm adjusts network weights using error gradients?',
        options: ['Binary Search', 'Backpropagation and Gradient Descent', 'Linear Interpolation', 'Hashing'],
        correctAnswerIndex: 1,
        explanation: 'Backpropagation calculates error gradients backwards through layers, while Gradient Descent updates weights to reduce loss.'
      },
      {
        id: 'cs-i3',
        questionText: '3. Which data structure uses Key-Value pairs to achieve O(1) average lookup time?',
        options: ['Linked List', 'Hash Table / Dictionary', 'Binary Tree', 'Queue'],
        correctAnswerIndex: 1,
        explanation: 'Hash tables map keys to values using hash functions for O(1) constant time retrieval.'
      },
      {
        id: 'cs-i4',
        questionText: '4. What activation function outputs values between 0 and 1, ideal for binary probability classification?',
        options: ['ReLU', 'Sigmoid', 'Linear', 'Step Function'],
        correctAnswerIndex: 1,
        explanation: 'The Sigmoid function maps any real-valued number into a [0, 1] probability range.'
      },
      {
        id: 'cs-i5',
        questionText: '5. What is recursion in programming?',
        options: [
          'A loop that never terminates',
          'A function calling itself with a base case to terminate',
          'Converting Python code to JavaScript',
          'Compressing an image file'
        ],
        correctAnswerIndex: 1,
        explanation: 'Recursion occurs when a function solves a problem by calling smaller instances of itself until reaching a base case.'
      },
      {
        id: 'cs-i6',
        questionText: '6. In Machine Learning, what does "overfitting" mean?',
        options: [
          'A model performs poorly on training data',
          'A model learns training noise so deeply that it fails to generalize to new test data',
          'A model trains too quickly in 1 second',
          'A dataset has too few columns'
        ],
        correctAnswerIndex: 1,
        explanation: 'Overfitting happens when a model memorizes training data including noise rather than true general patterns.'
      },
      {
        id: 'cs-i7',
        questionText: '7. Which sorting algorithm has an average time complexity of O(N log N)?',
        options: ['Bubble Sort', 'Merge Sort', 'Selection Sort', 'Insertion Sort'],
        correctAnswerIndex: 1,
        explanation: 'Merge Sort uses a divide-and-conquer strategy operating in O(N log N) time.'
      },
      {
        id: 'cs-i8',
        questionText: '8. What is an API in modern software architecture?',
        options: [
          'Automated Programming Interface',
          'Application Programming Interface',
          'Advanced Python Integration',
          'Array Processor Index'
        ],
        correctAnswerIndex: 1,
        explanation: 'An API defines protocol specifications allowing different software applications to communicate.'
      },
      {
        id: 'cs-i9',
        questionText: '9. In AI models, what does LLM stand for?',
        options: ['Linear Logic Matrix', 'Large Language Model', 'Linked Learning Module', 'Local Logic Machine'],
        correctAnswerIndex: 1,
        explanation: 'LLM stands for Large Language Model, deep learning models trained on vast text corpora.'
      },
      {
        id: 'cs-i10',
        questionText: '10. What is a Git repository pull request (PR)?',
        options: [
          'Deleting code permanently',
          'A proposal to review and merge code changes from one branch into another',
          'Downloading a software installer',
          'A database backup query'
        ],
        correctAnswerIndex: 1,
        explanation: 'Pull requests allow developers to request code reviews before merging branch commits.'
      }
    ],

    'Advanced': [
      {
        id: 'cs-a1',
        questionText: '1. What is the worst-case time complexity of QuickSort when choosing a poor pivot?',
        options: ['O(N log N)', 'O(N^2)', 'O(N)', 'O(2^N)'],
        correctAnswerIndex: 1,
        misconceptionMap: { '0': 'Average is O(N log N), but worst-case with poor pivots is O(N^2).' },
        explanation: 'QuickSort degenerates to O(N^2) if the pivot selected consistently splits array into 0 and N-1 elements.'
      },
      {
        id: 'cs-a2',
        questionText: '2. Which optimization algorithm uses adaptive learning rates for each parameter based on first and second moments of gradients?',
        options: ['SGD', 'Adam Optimizer', 'RMSprop', 'Adagrad'],
        correctAnswerIndex: 1,
        explanation: 'Adam (Adaptive Moment Estimation) computes individual adaptive learning rates using momentum and RMSprop principles.'
      },
      {
        id: 'cs-a3',
        questionText: '3. What primary architecture advantage do Convolutional Neural Networks (CNNs) offer for image processing?',
        options: [
          'LIFO stack processing',
          'Spatial weight sharing and translation invariance',
          'Zero memory footprint',
          'No need for training data'
        ],
        correctAnswerIndex: 1,
        explanation: 'Convolutions apply shared parameter filters across spatial dimensions, providing translation invariance.'
      },
      {
        id: 'cs-a4',
        questionText: '4. In Transformer architectures (e.g. GPT, BERT), what mechanism allows token representations to dynamically attend to all other sequence positions?',
        options: ['Recurrent Feedback', 'Self-Attention Mechanism', 'Max Pooling', 'Convolutional Sliding'],
        correctAnswerIndex: 1,
        explanation: 'Self-attention calculates pairwise Query-Key-Value dot products across all sequence positions.'
      },
      {
        id: 'cs-a5',
        questionText: '5. Which graph algorithm finds the shortest path between nodes in a weighted graph with non-negative edge weights?',
        options: ['Breadth-First Search', 'Dijkstra\'s Algorithm', 'Kruskal\'s Algorithm', 'Depth-First Search'],
        correctAnswerIndex: 1,
        explanation: 'Dijkstra\'s algorithm maintains a priority queue of minimum distance estimates for non-negative graphs.'
      },
      {
        id: 'cs-a6',
        questionText: '6. In database ACID properties, what does "Atomicity" guarantee?',
        options: [
          'Transactions run instantly',
          'All operations within a transaction execute completely or none of them do',
          'Data is stored in atomic particles',
          'No passwords are required'
        ],
        correctAnswerIndex: 1,
        explanation: 'Atomicity ensures all-or-nothing execution: if any part fails, the entire transaction rolls back.'
      },
      {
        id: 'cs-a7',
        questionText: '7. What algorithm prevents deadlocks in operating system resource allocation?',
        options: ['Banker\'s Algorithm', 'Page Replacement', 'Round Robin', 'Elevator Algorithm'],
        correctAnswerIndex: 0,
        explanation: 'Dijkstra\'s Banker\'s Algorithm tests for safety by simulating allocation of maximum declared resources.'
      },
      {
        id: 'cs-a8',
        questionText: '8. What is Dynamic Programming in computer science?',
        options: [
          'Writing code that compiles dynamically at runtime',
          'Solving complex optimization problems by breaking them into overlapping subproblems and memoizing results',
          'Building reactive UI web pages',
          'Using dynamic type variables in Python'
        ],
        correctAnswerIndex: 1,
        explanation: 'Dynamic Programming avoids redundant work by storing solutions to overlapping subproblems.'
      },
      {
        id: 'cs-a9',
        questionText: '9. What hardware architecture makes GPUs significantly faster than CPUs for deep learning matrix multiplication?',
        options: [
          'Higher single-thread clock speed',
          'Massively parallel architecture with thousands of concurrent arithmetic cores',
          'Larger hard disk cache',
          'Support for wireless bluetooth'
        ],
        correctAnswerIndex: 1,
        explanation: 'GPUs feature thousands of simple ALUs designed for high-throughput parallel matrix operations.'
      },
      {
        id: 'cs-a10',
        questionText: '10. What is the P vs NP problem in theoretical computer science?',
        options: [
          'Whether Python is faster than NP-Hard languages',
          'Whether every problem whose solution can be verified in polynomial time can also be solved in polynomial time',
          'Whether neural networks can replace CPUs',
          'Whether parallel computers double speed'
        ],
        correctAnswerIndex: 1,
        explanation: 'P vs NP asks if polynomial-time verification (NP) implies polynomial-time solvability (P).'
      }
    ]
  },

  'Mathematics': {
    'Beginner': [
      {
        id: 'm-b1',
        questionText: '1. Solve for x in the two-step linear equation: 3x - 4 = 14',
        options: ['x = 4', 'x = 6', 'x = 18', 'x = 3.3'],
        correctAnswerIndex: 1,
        misconceptionMap: { '2': 'Add 4 to 14 to get 18, then divide by 3 coefficient.' },
        explanation: 'Add 4 to both sides: 3x = 18. Divide by 3: x = 6.'
      },
      {
        id: 'm-b2',
        questionText: '2. If a solar battery generates 150 Watt-hours of energy in 3 hours, what is its unit rate of energy per hour?',
        options: ['450 Wh/h', '50 Wh/h', '30 Wh/h', '100 Wh/h'],
        correctAnswerIndex: 1,
        explanation: 'Unit rate = total energy ÷ total time = 150 ÷ 3 = 50 Wh/h.'
      },
      {
        id: 'm-b3',
        questionText: '3. What is 15% of 80?',
        options: ['8', '12', '15', '20'],
        correctAnswerIndex: 1,
        explanation: '15% of 80 = 0.15 × 80 = 12.'
      },
      {
        id: 'm-b4',
        questionText: '4. What is the perimeter of a rectangle with length 8 meters and width 5 meters?',
        options: ['13 meters', '26 meters', '40 meters', '30 meters'],
        correctAnswerIndex: 1,
        explanation: 'Perimeter = 2 × (length + width) = 2 × (8 + 5) = 26 meters.'
      },
      {
        id: 'm-b5',
        questionText: '5. Simplify the ratio 12:18 to its simplest whole number form.',
        options: ['6:9', '2:3', '3:4', '1:2'],
        correctAnswerIndex: 1,
        explanation: 'Divide both terms by the greatest common divisor (6): 12÷6 = 2, 18÷6 = 3. Ratio is 2:3.'
      },
      {
        id: 'm-b6',
        questionText: '6. Solve for y: 2y + 5 = 19',
        options: ['y = 5', 'y = 7', 'y = 9', 'y = 12'],
        correctAnswerIndex: 1,
        explanation: 'Subtract 5 from both sides: 2y = 14. Divide by 2: y = 7.'
      },
      {
        id: 'm-b7',
        questionText: '7. What is the square root of 144?',
        options: ['10', '12', '14', '16'],
        correctAnswerIndex: 1,
        explanation: '12 × 12 = 144, so √144 = 12.'
      },
      {
        id: 'm-b8',
        questionText: '8. What is the slope (m) of the linear equation y = 4x + 3?',
        options: ['3', '4', '7', '1'],
        correctAnswerIndex: 1,
        explanation: 'In slope-intercept form y = mx + b, the coefficient of x (4) is the slope.'
      },
      {
        id: 'm-b9',
        questionText: '9. If a triangle has two interior angles measuring 50° and 60°, what is the third angle?',
        options: ['60°', '70°', '80°', '90°'],
        correctAnswerIndex: 1,
        explanation: 'Sum of interior angles of a triangle is 180°. Third angle = 180° - (50° + 60°) = 70°.'
      },
      {
        id: 'm-b10',
        questionText: '10. What is the median of the dataset [3, 7, 9, 12, 15]?',
        options: ['7', '9', '9.2', '12'],
        correctAnswerIndex: 1,
        explanation: 'In an ordered dataset of 5 numbers, the middle value (3rd item) is 9.'
      }
    ],

    'Intermediate': [
      {
        id: 'm-i1',
        questionText: '1. What is the derivative f\'(x) of the function f(x) = 3x^2 + 5x - 7?',
        options: ['f\'(x) = 6x + 5', 'f\'(x) = 3x + 5', 'f\'(x) = 6x^2', 'f\'(x) = 6x - 7'],
        correctAnswerIndex: 0,
        explanation: 'Using power rule d/dx[x^n] = n*x^(n-1): d/dx[3x^2] = 6x, d/dx[5x] = 5, d/dx[-7] = 0. Result: 6x + 5.'
      },
      {
        id: 'm-i2',
        questionText: '2. Solve the quadratic equation x^2 - 5x + 6 = 0 for x.',
        options: ['x = 1 and x = 6', 'x = 2 and x = 3', 'x = -2 and x = -3', 'x = 0 and x = 5'],
        correctAnswerIndex: 1,
        explanation: 'Factoring: (x - 2)(x - 3) = 0 gives roots x = 2 and x = 3.'
      },
      {
        id: 'm-i3',
        questionText: '3. What is the exact trigonometric value of sin(30°)?',
        options: ['0', '0.5 (1/2)', '√3/2', '1'],
        correctAnswerIndex: 1,
        explanation: 'sin(30°) = 1/2 = 0.5.'
      },
      {
        id: 'm-i4',
        questionText: '4. Evaluate log10(1000).',
        options: ['2', '3', '10', '100'],
        correctAnswerIndex: 1,
        explanation: '10^3 = 1000, so log10(1000) = 3.'
      },
      {
        id: 'm-i5',
        questionText: '5. What is the Euclidean distance between points (0,0) and (6,8) in 2D Cartesian coordinates?',
        options: ['10', '14', '48', '100'],
        correctAnswerIndex: 0,
        explanation: 'Distance = √(6^2 + 8^2) = √(36 + 64) = √100 = 10.'
      },
      {
        id: 'm-i6',
        questionText: '6. What is the area of a circle with radius r = 7 cm (using π ≈ 22/7)?',
        options: ['44 cm²', '154 cm²', '308 cm²', '49 cm²'],
        correctAnswerIndex: 1,
        explanation: 'Area = π × r² = (22/7) × 49 = 22 × 7 = 154 cm².'
      },
      {
        id: 'm-i7',
        questionText: '7. Evaluate 5! (5 factorial).',
        options: ['20', '60', '120', '720'],
        correctAnswerIndex: 2,
        explanation: '5! = 5 × 4 × 3 × 2 × 1 = 120.'
      },
      {
        id: 'm-i8',
        questionText: '8. What is the limit of (sin x) / x as x approaches 0?',
        options: ['0', '1', '∞', 'Undefined'],
        correctAnswerIndex: 1,
        explanation: 'Using L\'Hopital\'s rule or Taylor series: lim(x->0) (sin x)/x = 1.'
      },
      {
        id: 'm-i9',
        questionText: '9. Find the sum of an arithmetic progression with first term a=2, common difference d=3, and n=10 terms.',
        options: ['155', '140', '135', '165'],
        correctAnswerIndex: 0,
        explanation: 'Sum S_n = (n/2)[2a + (n-1)d] = 5 × [4 + 9×3] = 5 × 31 = 155.'
      },
      {
        id: 'm-i10',
        questionText: '10. What is the product of matrix A = [[1, 2], [3, 4]] and identity matrix I = [[1, 0], [0, 1]]?',
        options: ['[[1, 2], [3, 4]]', '[[0, 0], [0, 0]]', '[[2, 4], [6, 8]]', '[[1, 0], [0, 1]]'],
        correctAnswerIndex: 0,
        explanation: 'Multiplying any matrix by the identity matrix leaves the original matrix unchanged.'
      }
    ],

    'Advanced': [
      {
        id: 'm-a1',
        questionText: '1. What is the indefinite integral ∫ (1 / x) dx?',
        options: ['-1 / x^2 + C', 'ln|x| + C', 'e^x + C', 'x + C'],
        correctAnswerIndex: 1,
        explanation: 'The antiderivative of 1/x is the natural logarithm ln|x| + C.'
      },
      {
        id: 'm-a2',
        questionText: '2. What are the eigenvalues of the diagonal matrix M = [[2, 0], [0, 5]]?',
        options: ['λ = 0 and λ = 10', 'λ = 2 and λ = 5', 'λ = 7 and λ = -3', 'λ = 1 and λ = 1'],
        correctAnswerIndex: 1,
        explanation: 'For any diagonal matrix, the eigenvalues are simply the entries along the main diagonal (2 and 5).'
      },
      {
        id: 'm-a3',
        questionText: '3. What theorem asserts that every non-constant single-variable polynomial with complex coefficients has at least one complex root?',
        options: [
          'Fundamental Theorem of Calculus',
          'Fundamental Theorem of Algebra',
          'Pythagorean Theorem',
          'Central Limit Theorem'
        ],
        correctAnswerIndex: 1,
        explanation: 'The Fundamental Theorem of Algebra states that C is algebraically closed.'
      },
      {
        id: 'm-a4',
        questionText: '4. What is the Laplace Transform L{ e^(at) }?',
        options: ['1 / (s - a)', '1 / (s + a)', 'a / s^2', 's / (s^2 + a^2)'],
        correctAnswerIndex: 0,
        explanation: 'L{e^(at)} = ∫[0 to ∞] e^(-st) e^(at) dt = 1 / (s - a) for s > a.'
      },
      {
        id: 'm-a5',
        questionText: '5. What is the gradient vector ∇f of the multivariable function f(x, y) = x^2 * y?',
        options: ['[2xy, x^2]', '[x^2, 2xy]', '[2x, y]', '[2xy, 2xy]'],
        correctAnswerIndex: 0,
        explanation: '∂f/∂x = 2xy, ∂f/∂y = x^2. Thus gradient vector ∇f = [2xy, x^2].'
      },
      {
        id: 'm-a6',
        questionText: '6. In probability theory, which discrete probability distribution models the number of independent events occurring in a fixed interval of time?',
        options: ['Normal Distribution', 'Poisson Distribution', 'Uniform Distribution', 'Binomial Distribution'],
        correctAnswerIndex: 1,
        explanation: 'The Poisson distribution models event counts occurring with a constant average rate λ.'
      },
      {
        id: 'm-a7',
        questionText: '7. What is Bayes\' Theorem formula for conditional probability P(A|B)?',
        options: [
          'P(A|B) = [P(B|A) × P(A)] / P(B)',
          'P(A|B) = P(A) + P(B)',
          'P(A|B) = P(A) × P(B)',
          'P(A|B) = P(B) / P(A)'
        ],
        correctAnswerIndex: 0,
        explanation: 'Bayes\' Theorem: P(A|B) = [P(B|A) * P(A)] / P(B).'
      },
      {
        id: 'm-a8',
        questionText: '8. What is the Taylor series expansion for e^x centered at x = 0?',
        options: [
          '1 + x + x^2/2! + x^3/3! + ...',
          'x - x^3/3! + x^5/5! - ...',
          '1 - x^2/2! + x^4/4! - ...',
          'x + x^2 + x^3 + ...'
        ],
        correctAnswerIndex: 0,
        explanation: 'e^x = ∑ [x^n / n!] = 1 + x + x^2/2! + x^3/3! + ...'
      },
      {
        id: 'm-a9',
        questionText: '9. What is Euler\'s formula relating complex exponentiation to trigonometric functions?',
        options: [
          'e^(ix) = cos(x) + i sin(x)',
          'e^(ix) = sin(x) + i cos(x)',
          'e^(x) = cos(ix)',
          'e^(ix) = cos^2(x) + sin^2(x)'
        ],
        correctAnswerIndex: 0,
        explanation: 'Euler\'s formula states e^(ix) = cos(x) + i sin(x).'
      },
      {
        id: 'm-a10',
        questionText: '10. What is the rank of a 3x3 matrix where all three rows are identical non-zero vectors?',
        options: ['0', '1', '2', '3'],
        correctAnswerIndex: 1,
        explanation: 'Since all rows are linearly dependent multiples of one vector, the dimension of the row space (rank) is 1.'
      }
    ]
  },

  'Physics': {
    'Beginner': [
      {
        id: 'p-b1',
        questionText: '1. What is Newton\'s First Law of Motion also known as?',
        options: ['Law of Inertia', 'Law of Universal Gravitation', 'Law of Conservation of Momentum', 'Ohm\'s Law'],
        correctAnswerIndex: 0,
        explanation: 'Newton\'s First Law states an object remains at rest or in uniform motion unless acted upon by a net force (Inertia).'
      },
      {
        id: 'p-b2',
        questionText: '2. What is the formula for calculating average speed?',
        options: ['Speed = Distance ÷ Time', 'Speed = Distance × Time', 'Speed = Force ÷ Acceleration', 'Speed = Mass × Velocity'],
        correctAnswerIndex: 0,
        explanation: 'Speed is scalar distance divided by elapsed time.'
      },
      {
        id: 'p-b3',
        questionText: '3. What energy transformation occurs when a compressed spring is released?',
        options: [
          'Elastic Potential Energy transforms into Kinetic Energy',
          'Thermal Energy transforms into Nuclear Energy',
          'Chemical Energy transforms into Light Energy',
          'Electrical Energy transforms into Gravitational Energy'
        ],
        correctAnswerIndex: 0,
        explanation: 'Stored elastic potential energy converts into motion (kinetic energy).'
      },
      {
        id: 'p-b4',
        questionText: '4. What unit is electrical resistance measured in?',
        options: ['Volts', 'Amperes', 'Ohms (Ω)', 'Watts'],
        correctAnswerIndex: 2,
        explanation: 'Resistance is measured in Ohms (symbol Ω).'
      },
      {
        id: 'p-b5',
        questionText: '5. According to Newton\'s Second Law (F = m × a), if net force doubles while mass remains constant, acceleration does what?',
        options: ['Stays the same', 'Doubles', 'Decreases by half', 'Quadruples'],
        correctAnswerIndex: 1,
        explanation: 'Acceleration is directly proportional to net force: doubling force doubles acceleration.'
      },
      {
        id: 'p-b6',
        questionText: '6. What type of wave is a sound wave traveling through air?',
        options: ['Transverse Wave', 'Longitudinal Wave', 'Electromagnetic Wave', 'Surface Water Wave'],
        correctAnswerIndex: 1,
        explanation: 'Sound waves are longitudinal pressure waves creating compressions and rarefactions.'
      },
      {
        id: 'p-b7',
        questionText: '7. What instrument measures electric current flowing in a circuit branch?',
        options: ['Voltmeter', 'Ammeter', 'Thermometer', 'Barometer'],
        correctAnswerIndex: 1,
        explanation: 'An ammeter is connected in series to measure electric current in Amperes.'
      },
      {
        id: 'p-b8',
        questionText: '8. What is the approximate acceleration due to gravity (g) near Earth\'s surface?',
        options: ['5 m/s²', '9.8 m/s²', '15 m/s²', '25 m/s²'],
        correctAnswerIndex: 1,
        explanation: 'Earth\'s gravitational acceleration near sea level is approximately 9.8 m/s².'
      },
      {
        id: 'p-b9',
        questionText: '9. What primary nuclear reaction powers the Sun\'s core?',
        options: ['Nuclear Fission', 'Nuclear Fusion', 'Chemical Combustion', 'Radioactive Alpha Decay'],
        correctAnswerIndex: 1,
        explanation: 'Hydrogen nuclei fuse into helium at extreme solar core temperatures and pressures.'
      },
      {
        id: 'p-b10',
        questionText: '10. How much Work is done when a 10 Newton force moves an object 5 meters in the direction of force?',
        options: ['2 Joules', '15 Joules', '50 Joules', '100 Joules'],
        correctAnswerIndex: 2,
        explanation: 'Work = Force × Distance = 10 N × 5 m = 50 Joules.'
      }
    ],

    'Intermediate': [
      {
        id: 'p-i1',
        questionText: '1. According to Ohm\'s Law (V = I × R), if a circuit component has 12 Volts across it and resistance of 4 Ohms, what is the current?',
        options: ['3 Amperes', '48 Amperes', '16 Amperes', '0.33 Amperes'],
        correctAnswerIndex: 0,
        explanation: 'Current I = V ÷ R = 12 V ÷ 4 Ω = 3 Amperes.'
      },
      {
        id: 'p-i2',
        questionText: '2. What is the Kinetic Energy formula for a moving object of mass m and velocity v?',
        options: ['KE = m × v', 'KE = 1/2 × m × v^2', 'KE = m × g × h', 'KE = 1/2 × m^2 × v'],
        correctAnswerIndex: 1,
        explanation: 'Kinetic Energy KE = 1/2 m v².'
      },
      {
        id: 'p-i3',
        questionText: '3. What optical phenomenon causes a drinking straw to appear bent in a glass of water?',
        options: ['Reflection', 'Refraction', 'Diffraction', 'Polarization'],
        correctAnswerIndex: 1,
        explanation: 'Light rays bend (refract) at the interface between air and denser water due to wave speed change.'
      },
      {
        id: 'p-i4',
        questionText: '4. What is the linear momentum formula for an object?',
        options: ['p = m × v', 'p = F × t', 'p = 1/2 m v^2', 'p = m × a'],
        correctAnswerIndex: 0,
        explanation: 'Momentum p is the product of mass m and velocity v (p = mv).'
      },
      {
        id: 'p-i5',
        questionText: '5. Three resistors with values 2Ω, 4Ω, and 6Ω are connected in series. What is total equivalent resistance?',
        options: ['1.09 Ω', '6 Ω', '12 Ω', '24 Ω'],
        correctAnswerIndex: 2,
        explanation: 'In series, total resistance R_total = R1 + R2 + R3 = 2 + 4 + 6 = 12 Ω.'
      },
      {
        id: 'p-i6',
        questionText: '6. What is Snell\'s Law formula describing light refraction across medium boundaries?',
        options: [
          'n1 × sin(θ1) = n2 × sin(θ2)',
          'V1 × I1 = V2 × I2',
          'F1 × d1 = F2 × d2',
          'sin(θ1) + sin(θ2) = n'
        ],
        correctAnswerIndex: 0,
        explanation: 'Snell\'s law relates refractive indices n and angles θ: n1 sin(θ1) = n2 sin(θ2).'
      },
      {
        id: 'p-i7',
        questionText: '7. What is the frequency of a wave traveling at 300 m/s with a wavelength of 3 meters?',
        options: ['100 Hz', '900 Hz', '300 Hz', '0.01 Hz'],
        correctAnswerIndex: 0,
        explanation: 'Frequency f = wave speed ÷ wavelength = 300 m/s ÷ 3 m = 100 Hz.'
      },
      {
        id: 'p-i8',
        questionText: '8. What is the First Law of Thermodynamics?',
        options: [
          'Heat flows spontaneously from cold to hot',
          'Energy cannot be created or destroyed, only transformed from one form to another',
          'Absolute zero can be reached in finite steps',
          'Entropy of an isolated system decreases'
        ],
        correctAnswerIndex: 1,
        explanation: 'The 1st Law states energy conservation ΔU = Q - W.'
      },
      {
        id: 'p-i9',
        questionText: '9. Which color of light in the visible spectrum has the shortest wavelength and highest frequency?',
        options: ['Red', 'Yellow', 'Green', 'Violet/Blue'],
        correctAnswerIndex: 3,
        explanation: 'Violet light has the shortest wavelength (~400 nm) and highest photon energy in visible light.'
      },
      {
        id: 'p-i10',
        questionText: '10. What is the acceleration of a 5 kg object acted upon by a net force of 20 Newtons?',
        options: ['2 m/s²', '4 m/s²', '100 m/s²', '15 m/s²'],
        correctAnswerIndex: 1,
        explanation: 'a = F ÷ m = 20 N ÷ 5 kg = 4 m/s².'
      }
    ],

    'Advanced': [
      {
        id: 'p-a1',
        questionText: '1. What equation represents Einstein\'s mass-energy equivalence principle?',
        options: ['E = m c^2', 'F = m a', 'E = h f', 'p = h / λ'],
        correctAnswerIndex: 0,
        explanation: 'E = mc² describes how mass converts into equivalent energy.'
      },
      {
        id: 'p-a2',
        questionText: '2. What fundamental set of 4 differential equations unifies electricity, magnetism, and light?',
        options: ['Maxwell\'s Equations', 'Schrödinger Equations', 'Navier-Stokes Equations', 'Euler Equations'],
        correctAnswerIndex: 0,
        explanation: 'Maxwell\'s equations formulate electrodynamics and predict electromagnetic waves.'
      },
      {
        id: 'p-a3',
        questionText: '3. What quantum principle asserts that position (x) and momentum (p) cannot be simultaneously measured with arbitrary precision?',
        options: [
          'Pauli Exclusion Principle',
          'Heisenberg Uncertainty Principle',
          'De Broglie Hypothesis',
          'Bohr Postulate'
        ],
        correctAnswerIndex: 1,
        explanation: 'Heisenberg Uncertainty Principle: Δx Δp ≥ ħ/2.'
      },
      {
        id: 'p-a4',
        questionText: '4. What fluid dynamics principle states that an increase in fluid speed occurs simultaneously with a decrease in static pressure?',
        options: ['Pascal\'s Principle', 'Bernoulli\'s Principle', 'Archimedes\' Principle', 'Hooke\'s Law'],
        correctAnswerIndex: 1,
        explanation: 'Bernoulli\'s principle models conservation of energy along streamline fluid flow.'
      },
      {
        id: 'p-a5',
        questionText: '5. What quantum effect involves emission of electrons from a metal surface when light above a threshold frequency shines on it?',
        options: ['Compton Effect', 'Photoelectric Effect', 'Pair Production', 'Cherenkov Radiation'],
        correctAnswerIndex: 1,
        explanation: 'Einstein explained the photoelectric effect by quantizing light into discrete photons (E = hf).'
      },
      {
        id: 'p-a6',
        questionText: '6. In Special Relativity, what is the Lorentz gamma factor formula?',
        options: [
          'γ = 1 / √(1 - v^2 / c^2)',
          'γ = 1 - v / c',
          'γ = √(1 + v^2 / c^2)',
          'γ = c / v'
        ],
        correctAnswerIndex: 0,
        explanation: 'Lorentz factor γ = 1 / √(1 - v²/c²).'
      },
      {
        id: 'p-a7',
        questionText: '7. What gauge boson particle mediates the electromagnetic force between charged particles?',
        options: ['Gluon', 'Photon', 'W Boson', 'Graviton'],
        correctAnswerIndex: 1,
        explanation: 'Photons are massless gauge bosons mediating electrodynamics.'
      },
      {
        id: 'p-a8',
        questionText: '8. What phenomenon causes a pitch frequency shift in sound or light when a wave source moves relative to an observer?',
        options: ['Doppler Effect', 'Raman Scattering', 'Zeeman Effect', 'Stark Effect'],
        correctAnswerIndex: 0,
        explanation: 'The Doppler effect shifts observed frequency higher as source approaches and lower as it recedes.'
      },
      {
        id: 'p-a9',
        questionText: '9. What is the maximum theoretical efficiency of a heat engine operating between hot reservoir T_h and cold reservoir T_c?',
        options: ['Carnot Efficiency η = 1 - (T_c / T_h)', 'η = 100%', 'η = T_h / T_c', 'η = (T_h - T_c) / T_c'],
        correctAnswerIndex: 0,
        explanation: 'Carnot efficiency η_max = 1 - T_c/T_h (with absolute temperatures in Kelvin).'
      },
      {
        id: 'p-a10',
        questionText: '10. What is the Fermi Energy level in solid state physics?',
        options: [
          'The energy required to ionize an atom',
          'The highest occupied quantum state of electrons at absolute zero temperature (0 K)',
          'The energy of solar radiation',
          'The binding energy of atomic nuclei'
        ],
        correctAnswerIndex: 1,
        explanation: 'Fermi energy is the chemical potential of non-interacting fermions at absolute zero.'
      }
    ]
  },

  'Biology': {
    'Beginner': [
      {
        id: 'b-b1',
        questionText: '1. What are the main chemical outputs (products) of plant photosynthesis?',
        options: [
          'Carbon dioxide and water',
          'Glucose (sugar) and oxygen gas',
          'Nitrogen and solar radiation',
          'Chlorophyll and soil minerals'
        ],
        correctAnswerIndex: 1,
        misconceptionMap: { '0': 'Carbon dioxide and water are consumed reactants, not products.' },
        explanation: 'Photosynthesis converts CO2 and H2O into Glucose and Oxygen using solar energy.'
      },
      {
        id: 'b-b2',
        questionText: '2. Which organelle is famously known as the "powerhouse of the cell" for generating ATP energy?',
        options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Vacuole'],
        correctAnswerIndex: 1,
        explanation: 'Mitochondria produce cellular ATP energy via cellular respiration.'
      },
      {
        id: 'b-b3',
        questionText: '3. What green cellular pigment inside chloroplasts absorbs sunlight?',
        options: ['Hemoglobin', 'Chlorophyll', 'Melanin', 'Carotene'],
        correctAnswerIndex: 1,
        explanation: 'Chlorophyll absorbs red and blue light wavelengths while reflecting green light.'
      },
      {
        id: 'b-b4',
        questionText: '4. Microscopic pores on leaf surfaces that open and close for gas exchange are called:',
        options: ['Stomata', 'Xylem', 'Phloem', 'Chloroplasts'],
        correctAnswerIndex: 0,
        explanation: 'Stomata dot leaf surfaces, regulated by guard cells to control CO2, O2, and water vapor.'
      },
      {
        id: 'b-b5',
        questionText: '5. In ecological energy pyramids, approximately what percentage of biomass energy passes to the next trophic level?',
        options: ['100%', '50%', '10%', '1%'],
        correctAnswerIndex: 2,
        explanation: 'The 10% Energy Rule states ~10% of biomass energy moves up to each successive trophic level.'
      },
      {
        id: 'b-b6',
        questionText: '6. What double-helix molecule stores genetic instructions in living organisms?',
        options: ['DNA', 'ATP', 'Glucose', 'Hemoglobin'],
        correctAnswerIndex: 0,
        explanation: 'Deoxyribonucleic Acid (DNA) encodes hereditary genetic instructions.'
      },
      {
        id: 'b-b7',
        questionText: '7. What process do somatic body cells use to divide into two identical daughter cells for growth?',
        options: ['Mitosis', 'Meiosis', 'Fertilization', 'Osmosis'],
        correctAnswerIndex: 0,
        explanation: 'Mitosis duplicates chromosomes to yield 2 genetically identical diploid daughter cells.'
      },
      {
        id: 'b-b8',
        questionText: '8. What muscle organ pumps blood through the human circulatory system?',
        options: ['Lungs', 'Heart', 'Liver', 'Kidney'],
        correctAnswerIndex: 1,
        explanation: 'The heart is a muscular 4-chambered pump circulating oxygenated and deoxygenated blood.'
      },
      {
        id: 'b-b9',
        questionText: '9. What term describes an organism that produces its own organic food from sunlight?',
        options: ['Autotroph / Producer', 'Heterotroph / Consumer', 'Decomposer', 'Parasite'],
        correctAnswerIndex: 0,
        explanation: 'Autotrophs (producers) synthesize organic molecules via photosynthesis.'
      },
      {
        id: 'b-b10',
        questionText: '10. Fungi and bacteria perform what critical ecosystem function by breaking down dead matter?',
        options: ['Photosynthesis', 'Decomposition', 'Pollination', 'Transpiration'],
        correctAnswerIndex: 1,
        explanation: 'Decomposers recycle vital nitrogen, phosphorus, and organic carbon back into soil.'
      }
    ],

    'Intermediate': [
      {
        id: 'b-i1',
        questionText: '1. What nitrogenous base pairs with Adenine (A) in RNA molecules during gene transcription?',
        options: ['Thymine (T)', 'Uracil (U)', 'Cytosine (C)', 'Guanine (G)'],
        correctAnswerIndex: 1,
        misconceptionMap: { '0': 'Thymine pairs in DNA. RNA replaces Thymine with Uracil (U).' },
        explanation: 'In RNA synthesis, Uracil (U) pairs with Adenine (A).'
      },
      {
        id: 'b-i2',
        questionText: '2. What is the CRISPR-Cas9 system used for in modern biotechnology?',
        options: [
          'Measuring soil temperature',
          'Precise targeted gene editing and genomic sequence alteration',
          'Filtering clean drinking water',
          'Speeding up seed germination'
        ],
        correctAnswerIndex: 1,
        explanation: 'CRISPR-Cas9 uses guide RNA to direct endonuclease Cas9 to cut target DNA for gene editing.'
      },
      {
        id: 'b-i3',
        questionText: '3. Where inside cellular cytoplasm does mRNA translation into amino acid polypeptide chains occur?',
        options: ['Nucleus', 'Ribosomes', 'Vacuole', 'Golgi Apparatus'],
        correctAnswerIndex: 1,
        explanation: 'Ribosomes decode mRNA codons to assemble specific amino acid sequences into proteins.'
      },
      {
        id: 'b-i4',
        questionText: '4. What enzyme unwinds and unzips the double-stranded DNA helix during replication?',
        options: ['DNA Helicase', 'DNA Polymerase', 'RNA Polymerase', 'Ligase'],
        correctAnswerIndex: 0,
        explanation: 'DNA Helicase breaks hydrogen bonds between nitrogen bases to open replication forks.'
      },
      {
        id: 'b-i5',
        questionText: '5. In Mendelian genetics, what is the expected phenotypic ratio in a monohybrid cross between two heterozygous parents (Aa × Aa)?',
        options: ['1:1', '3:1', '9:3:3:1', '1:2:1'],
        correctAnswerIndex: 1,
        explanation: 'Aa × Aa yields 3 dominant phenotype offspring for every 1 recessive phenotype (3:1 ratio).'
      },
      {
        id: 'b-i6',
        questionText: '6. What molecule serves as the primary high-energy currency for cellular work?',
        options: ['ATP (Adenosine Triphosphate)', 'Glucose', 'NADH', 'Pyruvate'],
        correctAnswerIndex: 0,
        explanation: 'ATP hydrolyzes phosphate bonds to release immediate energy for cellular processes.'
      },
      {
        id: 'b-i7',
        questionText: '7. Which stage of cellular respiration generates the largest yield of ATP molecules per glucose?',
        options: ['Glycolysis', 'Krebs Cycle', 'Electron Transport Chain & Oxidative Phosphorylation', 'Fermentation'],
        correctAnswerIndex: 2,
        explanation: 'Oxidative Phosphorylation across the inner mitochondrial membrane generates ~30-32 ATPs.'
      },
      {
        id: 'b-i8',
        questionText: '8. What symbiotic relationship benefits one organism while harming the host organism?',
        options: ['Mutualism', 'Commensalism', 'Parasitism', 'Neutralism'],
        correctAnswerIndex: 2,
        explanation: 'Parasitism (+/-) benefits the parasite while depriving or harming the host.'
      },
      {
        id: 'b-i9',
        questionText: '9. What structural composition gives cell membranes selective permeability?',
        options: ['Solid cellulose wall', 'Phospholipid Bilayer with embedded proteins', 'Starch matrix', 'Chitin layer'],
        correctAnswerIndex: 1,
        explanation: 'Amphipathic phospholipids create a fluid hydrophobic core with transport protein channels.'
      },
      {
        id: 'b-i10',
        questionText: '10. What pancreatic hormone lowers blood glucose concentration by stimulating cellular glucose uptake?',
        options: ['Glucagon', 'Insulin', 'Adrenaline', 'Cortisol'],
        correctAnswerIndex: 1,
        explanation: 'Insulin signals liver and muscle cells to absorb glucose and store it as glycogen.'
      }
    ],

    'Advanced': [
      {
        id: 'b-a1',
        questionText: '1. What enzyme synthesizes complementary DNA (cDNA) from a single-stranded RNA template in retroviruses?',
        options: ['Reverse Transcriptase', 'RNA Polymerase II', 'DNA Ligase', 'Restriction Endonuclease'],
        correctAnswerIndex: 0,
        explanation: 'Reverse Transcriptase transcribes viral RNA back into cDNA during retroviral infection.'
      },
      {
        id: 'b-a2',
        questionText: '2. What is the essential cellular function of the p53 tumor suppressor protein?',
        options: [
          'Accelerating cell division rate',
          'Sensing DNA damage to trigger cell cycle arrest or apoptosis',
          'Synthesizing cell wall cellulose',
          'Pumping sodium ions across membranes'
        ],
        correctAnswerIndex: 1,
        explanation: 'p53 acts as "guardian of the genome", inducing G1 arrest for repair or triggering apoptosis if unrepairable.'
      },
      {
        id: 'b-a3',
        questionText: '3. Which epigenetic modification relaxes chromatin structure (euchromatin) to enhance gene transcription?',
        options: ['DNA Methylation', 'Histone Acetylation', 'Histone Deacetylation', 'RNA Interference'],
        correctAnswerIndex: 1,
        explanation: 'Histone Acetyltransferases (HATs) neutralize positive lysine charges on histones, loosening DNA binding.'
      },
      {
        id: 'b-a4',
        questionText: '4. In photosynthesis, what key enzyme fixes atmospheric CO2 into 3-PGA during the Calvin Cycle?',
        options: ['RuBisCO', 'ATP Synthase', 'Pep Carboxylase', 'Amylase'],
        correctAnswerIndex: 0,
        explanation: 'RuBisCO (Ribulose-1,5-bisphosphate carboxylase-oxygenase) catalyzes CO2 fixation in chloroplast stroma.'
      },
      {
        id: 'b-a5',
        questionText: '5. What structural domain motif is commonly found in eukaryotic transcription factors for binding DNA major grooves?',
        options: ['Zinc Finger', 'Beta Barrel', 'Alpha Helical Bundle', 'Triple Helix'],
        correctAnswerIndex: 0,
        explanation: 'Zinc finger motifs coordinate zinc ions to stabilize finger loops fitting into DNA major grooves.'
      },
      {
        id: 'b-a6',
        questionText: '6. What evolutionary theory explains the origin of mitochondria and chloroplasts in eukaryotic cells?',
        options: ['Endosymbiotic Theory', 'Lamarckian Adaptation', 'Neutral Theory of Evolution', 'Pangenes'],
        correctAnswerIndex: 0,
        explanation: 'Endosymbiotic theory posits mitochondria evolved from engulfed aerobic alpha-proteobacteria.'
      },
      {
        id: 'b-a7',
        questionText: '7. What intracellular second messenger is generated by Adenylate Cyclase upon G-protein coupled receptor activation?',
        options: ['Cyclic AMP (cAMP)', 'Inositol Trisphosphate (IP3)', 'Diacylglycerol (DAG)', 'Calcium ions'],
        correctAnswerIndex: 0,
        explanation: 'Adenylate Cyclase converts ATP into cyclic AMP (cAMP).'
      },
      {
        id: 'b-a8',
        questionText: '8. What specific differentiated immune B cell type secretes high volumes of antigen-specific antibodies?',
        options: ['Plasma Cells', 'Cytotoxic T Cells', 'Natural Killer Cells', 'Macrophage'],
        correctAnswerIndex: 0,
        explanation: 'Activated B lymphocytes differentiate into plasma cells that secrete thousands of antibodies per second.'
      },
      {
        id: 'b-a9',
        questionText: '9. What are the 3 repeated temperature steps in a standard PCR (Polymerase Chain Reaction) cycle?',
        options: [
          'Denaturation (~95°C), Annealing (~55°C), Extension (~72°C)',
          'Freezing (-20°C), Boiling (100°C), Cooling (25°C)',
          'Fixation, Staining, Washing',
          'Digestion, Ligation, Transformation'
        ],
        correctAnswerIndex: 0,
        explanation: 'PCR cycles melt DNA at 95°C, anneal primers at ~55°C, and extend with Taq polymerase at 72°C.'
      },
      {
        id: 'b-a10',
        questionText: '10. During pre-mRNA splicing, what components of the primary transcript are excised and discarded?',
        options: ['Introns', 'Exons', 'Promoters', 'Poly-A Tails'],
        correctAnswerIndex: 0,
        explanation: 'Spliceosomes excise non-coding Introns and ligate coding Exons together into mature mRNA.'
      }
    ]
  },

  'Chemistry': {
    'Beginner': [
      {
        id: 'c-b1',
        questionText: '1. When balancing the chemical equation: __ H₂ + O₂ ➔ 2 H₂O, what coefficient balances hydrogen?',
        options: ['1', '2', '3', '4'],
        correctAnswerIndex: 1,
        misconceptionMap: { '0': '1 H2 gives only 2 hydrogens, but 2 H2O contains 4 hydrogen atoms.' },
        explanation: '2 H2 + O2 ➔ 2 H2O gives 4 hydrogen and 2 oxygen atoms on both sides.'
      },
      {
        id: 'c-b2',
        questionText: '2. What central dense core of an atom contains protons and neutrons?',
        options: ['Nucleus', 'Electron Cloud', 'Orbital', 'Shell'],
        correctAnswerIndex: 0,
        explanation: 'The atomic nucleus houses positive protons and uncharged neutrons.'
      },
      {
        id: 'c-b3',
        questionText: '3. What subatomic particle carries a negative electrical charge?',
        options: ['Proton', 'Neutron', 'Electron', 'Photon'],
        correctAnswerIndex: 2,
        explanation: 'Electrons carry a -1 elementary charge and orbit the nucleus.'
      },
      {
        id: 'c-b4',
        questionText: '4. What is the pH value of pure neutral water at 25°C?',
        options: ['0', '7', '14', '1'],
        correctAnswerIndex: 1,
        explanation: 'A neutral solution has equal H+ and OH- concentrations with pH = 7.'
      },
      {
        id: 'c-b5',
        questionText: '5. What type of chemical bond forms when non-metal atoms share pairs of valence electrons?',
        options: ['Ionic Bond', 'Covalent Bond', 'Metallic Bond', 'Hydrogen Bond'],
        correctAnswerIndex: 1,
        explanation: 'Covalent bonding involves shared electron pairs between non-metal atoms.'
      },
      {
        id: 'c-b6',
        questionText: '6. What element has atomic number 1 on the Periodic Table?',
        options: ['Helium', 'Hydrogen', 'Carbon', 'Oxygen'],
        correctAnswerIndex: 1,
        explanation: 'Hydrogen (H) has 1 proton and atomic number 1.'
      },
      {
        id: 'c-b7',
        questionText: '7. What law states that mass cannot be created or destroyed during a chemical reaction?',
        options: [
          'Law of Conservation of Mass',
          'Law of Universal Gravitation',
          'Boyle\'s Law',
          'Ohm\'s Law'
        ],
        correctAnswerIndex: 0,
        explanation: 'Total mass of reactants equals total mass of products in chemical reactions.'
      },
      {
        id: 'c-b8',
        questionText: '8. Which state of matter has a fixed volume but takes the shape of its container?',
        options: ['Solid', 'Liquid', 'Gas', 'Plasma'],
        correctAnswerIndex: 1,
        explanation: 'Liquids have definite volume but indefinite shape.'
      },
      {
        id: 'c-b9',
        questionText: '9. What element essential for respiration has chemical symbol O and atomic number 8?',
        options: ['Gold', 'Oxygen', 'Osmium', 'Organic'],
        correctAnswerIndex: 1,
        explanation: 'Oxygen (O) constitutes ~21% of Earth\'s atmosphere.'
      },
      {
        id: 'c-b10',
        questionText: '10. What is the chemical formula for common table salt?',
        options: ['H2O', 'NaCl', 'CO2', 'NaHCO3'],
        correctAnswerIndex: 1,
        explanation: 'Table salt is Sodium Chloride (NaCl).'
      }
    ],

    'Intermediate': [
      {
        id: 'c-i1',
        questionText: '1. What is Avogadro\'s constant representing the number of particles in 1 mole of a substance?',
        options: ['3.00 × 10^8', '6.022 × 10^23', '9.81', '1.602 × 10^-19'],
        correctAnswerIndex: 1,
        explanation: 'Avogadro\'s number N_A = 6.022 × 10^23 particles/mole.'
      },
      {
        id: 'c-i2',
        questionText: '2. What chemical bond forms between a metal and non-metal via complete electron transfer?',
        options: ['Covalent Bond', 'Ionic Bond', 'Metallic Bond', 'Non-polar Bond'],
        correctAnswerIndex: 1,
        explanation: 'Ionic bonds form through electrostatic attraction between positive cations and negative anions.'
      },
      {
        id: 'c-i3',
        questionText: '3. What Ideal Gas Law equation relates pressure (P), volume (V), moles (n), and temperature (T)?',
        options: ['PV = nRT', 'P1 V1 = P2 V2', 'V1/T1 = V2/T2', 'E = mc^2'],
        correctAnswerIndex: 0,
        explanation: 'The Ideal Gas Law is PV = nRT (where R is the universal gas constant).'
      },
      {
        id: 'c-i4',
        questionText: '4. According to Le Chatelier\'s principle, what happens to an exothermic equilibrium reaction if temperature is increased?',
        options: [
          'Shift toward products (right)',
          'Shift toward reactants (left)',
          'No shift occurs',
          'Reaction stops completely'
        ],
        correctAnswerIndex: 1,
        explanation: 'Increasing temp adds heat to exothermic reactions, shifting equilibrium left toward reactants.'
      },
      {
        id: 'c-i5',
        questionText: '5. Which element has the highest electronegativity value (4.0) on the Pauling scale?',
        options: ['Oxygen', 'Fluorine', 'Chlorine', 'Francium'],
        correctAnswerIndex: 1,
        explanation: 'Fluorine (F) has the strongest pull on shared bonding electrons.'
      },
      {
        id: 'c-i6',
        questionText: '6. What are isotopes of a chemical element?',
        options: [
          'Atoms with different numbers of protons',
          'Atoms of the same element with identical protons but different numbers of neutrons',
          'Molecules with different chemical bonds',
          'Elements with different charges'
        ],
        correctAnswerIndex: 1,
        explanation: 'Isotopes share atomic number (protons) but vary in mass number (neutrons).'
      },
      {
        id: 'c-i7',
        questionText: '7. What is the usual oxidation state of Oxygen in most oxides?',
        options: ['+1', '-1', '-2', '0'],
        correctAnswerIndex: 2,
        explanation: 'Oxygen typically gains 2 electrons, adopting a -2 oxidation state.'
      },
      {
        id: 'c-i8',
        questionText: '8. How does adding a catalyst increase chemical reaction rate?',
        options: [
          'By increasing total energy of reactants',
          'By lowering activation energy (E_a) via an alternative reaction pathway',
          'By increasing pressure',
          'By consuming reactants'
        ],
        correctAnswerIndex: 1,
        explanation: 'Catalysts lower activation energy barrier without being consumed.'
      },
      {
        id: 'c-i9',
        questionText: '9. What is molarity (M) defined as?',
        options: [
          'Grams of solute per mole',
          'Moles of solute per Liter of solution',
          'Moles of solute per kilogram of solvent',
          'Volume of solute per volume of water'
        ],
        correctAnswerIndex: 1,
        explanation: 'Molarity M = moles of solute / Liters of solution.'
      },
      {
        id: 'c-i10',
        questionText: '10. What chemical formula represents sulfuric acid?',
        options: ['HCl', 'HNO3', 'H2SO4', 'CH3COOH'],
        correctAnswerIndex: 2,
        explanation: 'Sulfuric acid is H2SO4.'
      }
    ],

    'Advanced': [
      {
        id: 'c-a1',
        questionText: '1. What equation calculates non-standard cell potential E_cell as a function of reaction quotient Q?',
        options: [
          'Nernst Equation: E = E° - (RT / nF) ln(Q)',
          'Arrhenius Equation: k = A e^(-Ea / RT)',
          'Gibbs Free Energy: ΔG = ΔH - T ΔS',
          'Beer-Lambert Law: A = ε b c'
        ],
        correctAnswerIndex: 0,
        explanation: 'The Nernst equation relates cell potential to standard potential and ion concentrations.'
      },
      {
        id: 'c-a2',
        questionText: '2. In organic reaction mechanisms, what stereochemical outcome characterizes an SN2 nucleophilic substitution?',
        options: [
          'Complete racemization',
          'Walden inversion of stereochemical configuration',
          'Retention of configuration',
          'Ring expansion'
        ],
        correctAnswerIndex: 1,
        explanation: 'Backside nucleophilic attack in SN2 causes inversion of configuration at chiral centers.'
      },
      {
        id: 'c-a3',
        questionText: '3. Which quantum number specifies the 3D spatial shape of an atomic orbital (s=0, p=1, d=2, f=3)?',
        options: [
          'Principal Quantum Number (n)',
          'Azimuthal / Angular Momentum Quantum Number (l)',
          'Magnetic Quantum Number (m_l)',
          'Spin Quantum Number (m_s)'
        ],
        correctAnswerIndex: 1,
        explanation: 'The azimuthal quantum number l dictates orbital angular momentum and 3D subshell geometry.'
      },
      {
        id: 'c-a4',
        questionText: '4. What thermodynamic condition indicates a spontaneous process at constant temperature and pressure?',
        options: ['ΔG < 0 (Negative Gibbs Free Energy change)', 'ΔG > 0', 'ΔH > 0', 'ΔS = 0'],
        correctAnswerIndex: 0,
        explanation: 'Spontaneous reactions lower free energy, requiring negative ΔG.'
      },
      {
        id: 'c-a5',
        questionText: '5. What type of stereoisomers are non-superimposable mirror images of each other?',
        options: ['Diastereomers', 'Enantiomers', 'Conformers', 'Constitutional Isomers'],
        correctAnswerIndex: 1,
        explanation: 'Enantiomers are chiral molecules that are non-superimposable mirror images.'
      },
      {
        id: 'c-a6',
        questionText: '6. What is the Henderson-Hasselbalch equation for buffer solutions?',
        options: [
          'pH = pKa + log([A-] / [HA])',
          'pH = -log([H+])',
          'pKa = pH × [HA]',
          'pH = pKb - log([B])'
        ],
        correctAnswerIndex: 0,
        explanation: 'Henderson-Hasselbalch equation relates pH to acid pKa and conjugate base/acid ratio.'
      },
      {
        id: 'c-a7',
        questionText: '7. What electron hybridization and molecular geometry does methane (CH4) adopt?',
        options: ['sp Linear', 'sp2 Trigonal Planar', 'sp3 Tetrahedral', 'sp3d Octahedral'],
        correctAnswerIndex: 2,
        explanation: 'Carbon in CH4 forms 4 equivalent sp3 hybrid orbitals pointing toward tetrahedral vertices (109.5°).'
      },
      {
        id: 'c-a8',
        questionText: '8. What spectroscopic technique measures nuclear spin transitions in a magnetic field to determine carbon skeletons?',
        options: ['FTIR Spectroscopy', 'Carbon-13 Nuclear Magnetic Resonance (13C-NMR)', 'Mass Spectrometry', 'UV-Vis'],
        correctAnswerIndex: 1,
        explanation: '13C-NMR identifies unique carbon environments in organic molecules.'
      },
      {
        id: 'c-a9',
        questionText: '9. What does the Second Law of Thermodynamics state regarding entropy (S) of an isolated system?',
        options: [
          'Entropy decreases over time',
          'Total entropy of an isolated system always increases or remains constant during spontaneous processes',
          'Entropy is zero at room temp',
          'Entropy equals enthalpy'
        ],
        correctAnswerIndex: 1,
        explanation: 'The 2nd Law states ΔS_universe ≥ 0 for spontaneous processes.'
      },
      {
        id: 'c-a10',
        questionText: '10. What is the molecular geometry of sulfur hexafluoride (SF6)?',
        options: ['Tetrahedral', 'Trigonal Bipyramidal', 'Octahedral', 'Square Planar'],
        correctAnswerIndex: 2,
        explanation: 'SF6 has 6 bonding pairs around central S, adopting sp3d2 Octahedral geometry.'
      }
    ]
  }
};

/**
 * Helper to fetch or generate a randomized 10-question quiz customized to user profile
 */
export const generateCustomQuiz = ({
  subject = 'Computer Science & AI',
  educationLevel = 'High School',
  subLevel = 'Intermediate',
  isRetake = false,
  seed = Date.now()
}) => {
  // Normalize subject
  let domainKey = 'Computer Science & AI';
  const subLower = (subject || '').toLowerCase();
  if (subLower.includes('math')) domainKey = 'Mathematics';
  else if (subLower.includes('phys')) domainKey = 'Physics';
  else if (subLower.includes('bio')) domainKey = 'Biology';
  else if (subLower.includes('chem')) domainKey = 'Chemistry';

  // Normalize level
  let levelKey = 'Intermediate';
  const eduLower = (educationLevel || subLevel || '').toLowerCase();
  if (eduLower.includes('middle') || eduLower.includes('beginner') || eduLower.includes('6') || eduLower.includes('7') || eduLower.includes('8')) {
    levelKey = 'Beginner';
  } else if (eduLower.includes('college') || eduLower.includes('advanced') || eduLower.includes('adult') || eduLower.includes('university')) {
    levelKey = 'Advanced';
  }

  // Get raw pool
  const subjectPool = QUESTION_BANK[domainKey] || QUESTION_BANK['Computer Science & AI'];
  let questions = subjectPool[levelKey] || subjectPool['Intermediate'] || [];

  // Deep clone questions
  let clonedQuestions = JSON.parse(JSON.stringify(questions));

  // If retake or random seed, shuffle questions and shuffle options
  if (isRetake || seed) {
    // Simple deterministic pseudo shuffle based on seed
    const pseudoRandom = (index) => {
      const x = Math.sin(seed + index) * 10000;
      return x - Math.floor(x);
    };

    clonedQuestions = clonedQuestions.sort((a, b) => pseudoRandom(a.id.length) - 0.5);

    // Also re-index question text line numbers
    clonedQuestions = clonedQuestions.map((q, idx) => {
      const cleanText = q.questionText.replace(/^\d+\.\s*/, '');
      return {
        ...q,
        id: `${q.id}-retake-${seed}-${idx}`,
        questionText: `${idx + 1}. ${cleanText}`
      };
    });
  }

  // Ensure exactly 10 questions
  while (clonedQuestions.length < 10) {
    const fallbackQ = clonedQuestions[clonedQuestions.length % clonedQuestions.length];
    clonedQuestions.push({
      ...fallbackQ,
      id: `${fallbackQ.id}-pad-${clonedQuestions.length}`,
      questionText: `${clonedQuestions.length + 1}. ${fallbackQ.questionText.replace(/^\d+\.\s*/, '')}`
    });
  }

  return {
    _id: `quiz-custom-${domainKey.toLowerCase().replace(/[^a-z]/g, '')}-${levelKey.toLowerCase()}-${seed}`,
    title: `${domainKey} Adaptive Assessment (${levelKey})`,
    subject: domainKey,
    topic: `${domainKey} ${levelKey} Practice`,
    grade: `${levelKey} Tier (${educationLevel})`,
    type: 'custom_diagnostic',
    questions: clonedQuestions.slice(0, 10)
  };
};
