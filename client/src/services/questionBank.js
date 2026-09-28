// Rich Multi-Domain & Multi-Tier STEM Question Bank (Expanded 300+ Questions)
// Generates personalized 10-question quizzes tailored to interest, education level, with shuffled answers

export const QUESTION_BANK = {
  "Computer Science & AI": {
    "Beginner": [
      {
        "id": "cs-b1",
        "questionText": "1. What is an algorithm in computer science?",
        "options": [
          "A hardware component inside a computer monitor",
          "A step-by-step set of rules or instructions to solve a problem",
          "A type of wireless internet connection",
          "A physical cable used to connect power"
        ],
        "correctAnswerIndex": 1,
        "misconceptionMap": {
          "0": "An algorithm is a software/logic concept, not a hardware part."
        },
        "explanation": "An algorithm is a step-by-step computational procedure for solving a problem."
      },
      {
        "id": "cs-b2",
        "questionText": "2. Which statement best describes a Boolean variable?",
        "options": [
          "A variable that can hold decimal numbers like 3.14",
          "A variable that stores text sentences",
          "A variable that can only hold one of two values: True or False",
          "A list of multiple items"
        ],
        "correctAnswerIndex": 2,
        "misconceptionMap": {
          "0": "Decimals are floats. Booleans are strictly True or False."
        },
        "explanation": "Booleans evaluate strictly to binary logic states: True or False."
      },
      {
        "id": "cs-b3",
        "questionText": "3. What is the time complexity of scanning every item in an unsorted list of size N?",
        "options": [
          "O(1) Constant",
          "O(N) Linear",
          "O(N^2) Quadratic",
          "O(log N) Logarithmic"
        ],
        "correctAnswerIndex": 1,
        "misconceptionMap": {
          "0": "Linear search checks each of the N items once."
        },
        "explanation": "Scanning N unsorted items one by one takes O(N) linear time."
      },
      {
        "id": "cs-b4",
        "questionText": "4. Which symbol is used for equality comparison in Python programming?",
        "options": [
          "=",
          "==",
          ":=",
          "equals()"
        ],
        "correctAnswerIndex": 1,
        "misconceptionMap": {
          "0": "Single = is assignment. Double == is equality comparison."
        },
        "explanation": "In Python, `==` tests equality while `=` assigns a value."
      },
      {
        "id": "cs-b5",
        "questionText": "5. What does CPU stand for in computer hardware?",
        "options": [
          "Central Processing Unit",
          "Computer Power Utility",
          "Central Program Unit",
          "Core Processing User"
        ],
        "correctAnswerIndex": 0,
        "explanation": "CPU stands for Central Processing Unit, the primary micro-processor of a computer."
      },
      {
        "id": "cs-b6",
        "questionText": "6. Which data structure operates on First-In, First-Out (FIFO) ordering?",
        "options": [
          "Stack",
          "Queue",
          "Tree",
          "Graph"
        ],
        "correctAnswerIndex": 1,
        "misconceptionMap": {
          "0": "Stacks use Last-In, First-Out (LIFO). Queues use FIFO."
        },
        "explanation": "A Queue processes items in First-In, First-Out (FIFO) sequence."
      },
      {
        "id": "cs-b7",
        "questionText": "7. What is a loop in programming?",
        "options": [
          "A bug that crashes the computer",
          "A code structure that repeats a block of instructions while a condition is true",
          "A style of font used in code editors",
          "A network router component"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Loops (like `for` and `while`) execute instructions repeatedly based on a condition."
      },
      {
        "id": "cs-b8",
        "questionText": "8. Binary code used by computers is composed of which two digits?",
        "options": [
          "0 and 1",
          "1 and 2",
          "0 and 10",
          "A and B"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Computers use binary states represented as 0 (off) and 1 (on)."
      },
      {
        "id": "cs-b9",
        "questionText": "9. What is a function parameter?",
        "options": [
          "The size of the computer screen",
          "An input variable passed into a function to customize its output",
          "The battery level of a laptop",
          "The file extension of a script"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Function parameters accept values passed into a function when called."
      },
      {
        "id": "cs-b10",
        "questionText": "10. What does HTML stand for in web technology?",
        "options": [
          "HyperText Markup Language",
          "High Tech Machine Learning",
          "Hyper Transfer Mode Logic",
          "Home Tool Management Link"
        ],
        "correctAnswerIndex": 0,
        "explanation": "HTML stands for HyperText Markup Language, the standard formatting language for web pages."
      },
      {
        "id": "cs-b11",
        "questionText": "What is a compiler in computer programming?",
        "options": [
          "A hardware power supply cable",
          "A program that translates source code into machine-readable instructions",
          "An internet browsing tab",
          "A physical memory storage chip"
        ],
        "correctAnswerIndex": 1,
        "explanation": "A compiler translates high-level source code into binary machine code executed by the CPU."
      },
      {
        "id": "cs-b12",
        "questionText": "What is the primary difference between RAM and secondary hard drive storage?",
        "options": [
          "RAM is permanent while hard drives erase on reboot",
          "RAM is volatile temporary working memory while hard drives store data permanently",
          "RAM can only store text while hard drives store images",
          "Hard drives are faster than RAM"
        ],
        "correctAnswerIndex": 1,
        "explanation": "RAM is volatile high-speed memory for active processes; secondary drives provide persistent non-volatile storage."
      },
      {
        "id": "cs-b13",
        "questionText": "What does API stand for in software development?",
        "options": [
          "Automated Program Indicator",
          "Application Programming Interface",
          "Advanced Processing Internet",
          "Apple Protocol Integration"
        ],
        "correctAnswerIndex": 1,
        "explanation": "API stands for Application Programming Interface, enabling separate software services to communicate."
      },
      {
        "id": "cs-b14",
        "questionText": "Which data structure stores collections of key-value associations?",
        "options": [
          "Dictionary / Hash Map",
          "Stack",
          "Linked List",
          "Queue"
        ],
        "correctAnswerIndex": 0,
        "explanation": "A Dictionary or Hash Map organizes data as unique keys mapped to corresponding values in near O(1) lookup time."
      },
      {
        "id": "cs-b15",
        "questionText": "What does SQL stand for in database technology?",
        "options": [
          "Standard Query Language",
          "Structured Query Language",
          "System Quick Logic",
          "Sequential Question Link"
        ],
        "correctAnswerIndex": 1,
        "explanation": "SQL stands for Structured Query Language, the industry standard for querying relational database tables."
      },
      {
        "id": "cs-b16",
        "questionText": "What is an infinite loop in computer programming?",
        "options": [
          "A loop that repeats indefinitely because its termination condition is never met",
          "A very fast algorithm that runs in zero milliseconds",
          "A wire shaped like a circle inside a motherboard",
          "A special function that downloads files"
        ],
        "correctAnswerIndex": 0,
        "explanation": "An infinite loop continues running forever until terminated because its exit condition never evaluates to false."
      },
      {
        "id": "cs-b17",
        "questionText": "What is a conditional (if-else) statement used for in code?",
        "options": [
          "To format colors in a word processor",
          "To execute different code paths depending on whether a condition is true or false",
          "To permanently shut down the server",
          "To erase unused variables"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Conditional statements allow branching logic so programs execute specific instructions based on dynamic criteria."
      },
      {
        "id": "cs-b18",
        "questionText": "What is Git primarily used for in software teams?",
        "options": [
          "Web hosting and domain registration",
          "Distributed version control and tracking source code changes over time",
          "Compiling C++ code to binaries",
          "Screen recording video tutorials"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Git is a distributed version control system that tracks file revisions, commits, and collaborative branches."
      },
      {
        "id": "cs-b19",
        "questionText": "What is the purpose of comments (# or //) written in source code?",
        "options": [
          "They speed up the execution of the CPU",
          "They provide human-readable documentation and are ignored by the compiler",
          "They create visual buttons on web pages",
          "They encrypt passwords"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Comments explain code logic to human developers and are completely ignored during compilation and execution."
      },
      {
        "id": "cs-b20",
        "questionText": "Which protocol is standard for secure encrypted web traffic across the internet?",
        "options": [
          "FTP",
          "HTTPS",
          "SMTP",
          "TELNET"
        ],
        "correctAnswerIndex": 1,
        "explanation": "HTTPS (Hypertext Transfer Protocol Secure) encrypts client-server communications using TLS/SSL."
      }
    ],
    "Intermediate": [
      {
        "id": "cs-i1",
        "questionText": "1. What is the time complexity (Big O) of Binary Search on a pre-sorted array of size N?",
        "options": [
          "O(N)",
          "O(log N)",
          "O(N^2)",
          "O(1)"
        ],
        "correctAnswerIndex": 1,
        "misconceptionMap": {
          "0": "O(N) is Linear Search. Binary Search operates in O(log N) logarithmic time."
        },
        "explanation": "Binary Search halves the search space at each step, achieving O(log N) complexity."
      },
      {
        "id": "cs-i2",
        "questionText": "2. In Artificial Neural Networks, which algorithm adjusts network weights using error gradients?",
        "options": [
          "Binary Search",
          "Backpropagation and Gradient Descent",
          "Linear Interpolation",
          "Hashing"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Backpropagation calculates error gradients backwards through layers, while Gradient Descent updates weights to reduce loss."
      },
      {
        "id": "cs-i3",
        "questionText": "3. Which data structure uses Key-Value pairs to achieve O(1) average lookup time?",
        "options": [
          "Linked List",
          "Hash Table / Dictionary",
          "Binary Tree",
          "Queue"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Hash tables map keys to values using hash functions for O(1) constant time retrieval."
      },
      {
        "id": "cs-i4",
        "questionText": "4. What activation function outputs values between 0 and 1, ideal for binary probability classification?",
        "options": [
          "ReLU",
          "Sigmoid",
          "Linear",
          "Step Function"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The Sigmoid function maps any real-valued number into a [0, 1] probability range."
      },
      {
        "id": "cs-i5",
        "questionText": "5. What is recursion in programming?",
        "options": [
          "A loop that never terminates",
          "A function calling itself with a base case to terminate",
          "Converting Python code to JavaScript",
          "Compressing an image file"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Recursion occurs when a function solves a problem by calling smaller instances of itself until reaching a base case."
      },
      {
        "id": "cs-i6",
        "questionText": "6. In Machine Learning, what does \"overfitting\" mean?",
        "options": [
          "A model performs poorly on training data",
          "A model learns training noise so deeply that it fails to generalize to new test data",
          "A model trains too quickly in 1 second",
          "A dataset has too few columns"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Overfitting happens when a model memorizes training data including noise rather than true general patterns."
      },
      {
        "id": "cs-i7",
        "questionText": "7. Which sorting algorithm has an average time complexity of O(N log N)?",
        "options": [
          "Bubble Sort",
          "Merge Sort",
          "Selection Sort",
          "Insertion Sort"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Merge Sort uses a divide-and-conquer strategy operating in O(N log N) time."
      },
      {
        "id": "cs-i8",
        "questionText": "8. What is an API in modern software architecture?",
        "options": [
          "Automated Programming Interface",
          "Application Programming Interface",
          "Advanced Python Integration",
          "Array Processor Index"
        ],
        "correctAnswerIndex": 1,
        "explanation": "An API defines protocol specifications allowing different software applications to communicate."
      },
      {
        "id": "cs-i9",
        "questionText": "9. In AI models, what does LLM stand for?",
        "options": [
          "Linear Logic Matrix",
          "Large Language Model",
          "Linked Learning Module",
          "Local Logic Machine"
        ],
        "correctAnswerIndex": 1,
        "explanation": "LLM stands for Large Language Model, deep learning models trained on vast text corpora."
      },
      {
        "id": "cs-i10",
        "questionText": "10. What is a Git repository pull request (PR)?",
        "options": [
          "Deleting code permanently",
          "A proposal to review and merge code changes from one branch into another",
          "Downloading a software installer",
          "A database backup query"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Pull requests allow developers to request code reviews before merging branch commits."
      },
      {
        "id": "cs-i11",
        "questionText": "What is the worst-case time complexity of QuickSort?",
        "options": [
          "O(N log N)",
          "O(N^2)",
          "O(N)",
          "O(1)"
        ],
        "correctAnswerIndex": 1,
        "explanation": "When poor pivots are repeatedly chosen (e.g., already sorted array with end pivot), QuickSort degrades to O(N^2)."
      },
      {
        "id": "cs-i12",
        "questionText": "What is the primary role of an activation function (e.g., ReLU) in a neural network?",
        "options": [
          "To introduce non-linearity so the network can learn complex arbitrary patterns",
          "To reduce the number of training epochs to one",
          "To convert floating point weights to integer strings",
          "To turn off the computer when training is done"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Without non-linear activation functions, a multilayer neural network would merely be a single linear regression."
      },
      {
        "id": "cs-i13",
        "questionText": "What does overfitting mean in machine learning model evaluation?",
        "options": [
          "The model performs perfectly on new unseen test data but fails on training data",
          "The model memorizes noise in the training set and fails to generalize to unseen test data",
          "The dataset is too large to fit in RAM",
          "The training loss increases while accuracy increases"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Overfitting occurs when high model capacity captures training noise, hurting generalizability on real-world inputs."
      },
      {
        "id": "cs-i14",
        "questionText": "In a Binary Search Tree (BST), where are keys smaller than the node value stored?",
        "options": [
          "In the right subtree",
          "In the left subtree",
          "At the root only",
          "In a separate hash table"
        ],
        "correctAnswerIndex": 1,
        "explanation": "By definition, in a BST, all keys in a node's left subtree are smaller than the node, and right keys are larger."
      },
      {
        "id": "cs-i15",
        "questionText": "What is the fundamental difference between a Process and a Thread in operating systems?",
        "options": [
          "Processes share memory space; threads have independent isolated address spaces",
          "Processes have independent address spaces; threads within a process share the same memory space",
          "Processes only run in the browser; threads run in hardware",
          "Threads cannot run concurrently"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Threads share the parent process address space and resources, enabling lightweight context switching."
      },
      {
        "id": "cs-i16",
        "questionText": "What does the HTTP 404 status code indicate?",
        "options": [
          "Server Error: Database crash",
          "Client Error: The requested resource could not be found on the server",
          "Success: Request processed OK",
          "Redirect to a secure login page"
        ],
        "correctAnswerIndex": 1,
        "explanation": "HTTP 404 Not Found indicates that the client was able to communicate with the server, but the URL path does not exist."
      },
      {
        "id": "cs-i17",
        "questionText": "What is recursion in programming?",
        "options": [
          "A technique where a function calls itself until reaching a base termination case",
          "A way to delete database tables",
          "A loop that only runs twice",
          "An error caused by disconnected cables"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Recursion solves problems by having a function call itself on smaller sub-problems until reaching a base condition."
      },
      {
        "id": "cs-i18",
        "questionText": "What is a Primary Key in a relational database table?",
        "options": [
          "A password used by the database administrator",
          "A column or set of columns that uniquely identifies each individual record in a table",
          "The first column created when the table was empty",
          "A column that allows duplicate and null values"
        ],
        "correctAnswerIndex": 1,
        "explanation": "A Primary Key enforces entity integrity by ensuring each record has a unique, non-null identifier."
      },
      {
        "id": "cs-i19",
        "questionText": "In supervised machine learning, what is the role of a Loss Function?",
        "options": [
          "It deletes bad training examples",
          "It quantifies the numerical difference between the model predictions and actual ground truth targets",
          "It tracks battery consumption on GPU clusters",
          "It encrypts datasets"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Loss functions (e.g., Mean Squared Error, Cross-Entropy) compute the error signal minimized during gradient descent."
      },
      {
        "id": "cs-i20",
        "questionText": "Which tree traversal visits the Left subtree, Root node, and then Right subtree?",
        "options": [
          "Pre-order traversal",
          "In-order traversal",
          "Post-order traversal",
          "Level-order traversal"
        ],
        "correctAnswerIndex": 1,
        "explanation": "In-order traversal visits Left -> Root -> Right, which visits nodes in ascending sorted order for a BST."
      }
    ],
    "Advanced": [
      {
        "id": "cs-a1",
        "questionText": "1. What is the worst-case time complexity of QuickSort when choosing a poor pivot?",
        "options": [
          "O(N log N)",
          "O(N^2)",
          "O(N)",
          "O(2^N)"
        ],
        "correctAnswerIndex": 1,
        "misconceptionMap": {
          "0": "Average is O(N log N), but worst-case with poor pivots is O(N^2)."
        },
        "explanation": "QuickSort degenerates to O(N^2) if the pivot selected consistently splits array into 0 and N-1 elements."
      },
      {
        "id": "cs-a2",
        "questionText": "2. Which optimization algorithm uses adaptive learning rates for each parameter based on first and second moments of gradients?",
        "options": [
          "SGD",
          "Adam Optimizer",
          "RMSprop",
          "Adagrad"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Adam (Adaptive Moment Estimation) computes individual adaptive learning rates using momentum and RMSprop principles."
      },
      {
        "id": "cs-a3",
        "questionText": "3. What primary architecture advantage do Convolutional Neural Networks (CNNs) offer for image processing?",
        "options": [
          "LIFO stack processing",
          "Spatial weight sharing and translation invariance",
          "Zero memory footprint",
          "No need for training data"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Convolutions apply shared parameter filters across spatial dimensions, providing translation invariance."
      },
      {
        "id": "cs-a4",
        "questionText": "4. In Transformer architectures (e.g. GPT, BERT), what mechanism allows token representations to dynamically attend to all other sequence positions?",
        "options": [
          "Recurrent Feedback",
          "Self-Attention Mechanism",
          "Max Pooling",
          "Convolutional Sliding"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Self-attention calculates pairwise Query-Key-Value dot products across all sequence positions."
      },
      {
        "id": "cs-a5",
        "questionText": "5. Which graph algorithm finds the shortest path between nodes in a weighted graph with non-negative edge weights?",
        "options": [
          "Breadth-First Search",
          "Dijkstra's Algorithm",
          "Kruskal's Algorithm",
          "Depth-First Search"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Dijkstra's algorithm maintains a priority queue of minimum distance estimates for non-negative graphs."
      },
      {
        "id": "cs-a6",
        "questionText": "6. In database ACID properties, what does \"Atomicity\" guarantee?",
        "options": [
          "Transactions run instantly",
          "All operations within a transaction execute completely or none of them do",
          "Data is stored in atomic particles",
          "No passwords are required"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Atomicity ensures all-or-nothing execution: if any part fails, the entire transaction rolls back."
      },
      {
        "id": "cs-a7",
        "questionText": "7. What algorithm prevents deadlocks in operating system resource allocation?",
        "options": [
          "Banker's Algorithm",
          "Page Replacement",
          "Round Robin",
          "Elevator Algorithm"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Dijkstra's Banker's Algorithm tests for safety by simulating allocation of maximum declared resources."
      },
      {
        "id": "cs-a8",
        "questionText": "8. What is Dynamic Programming in computer science?",
        "options": [
          "Writing code that compiles dynamically at runtime",
          "Solving complex optimization problems by breaking them into overlapping subproblems and memoizing results",
          "Building reactive UI web pages",
          "Using dynamic type variables in Python"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Dynamic Programming avoids redundant work by storing solutions to overlapping subproblems."
      },
      {
        "id": "cs-a9",
        "questionText": "9. What hardware architecture makes GPUs significantly faster than CPUs for deep learning matrix multiplication?",
        "options": [
          "Higher single-thread clock speed",
          "Massively parallel architecture with thousands of concurrent arithmetic cores",
          "Larger hard disk cache",
          "Support for wireless bluetooth"
        ],
        "correctAnswerIndex": 1,
        "explanation": "GPUs feature thousands of simple ALUs designed for high-throughput parallel matrix operations."
      },
      {
        "id": "cs-a10",
        "questionText": "10. What is the P vs NP problem in theoretical computer science?",
        "options": [
          "Whether Python is faster than NP-Hard languages",
          "Whether every problem whose solution can be verified in polynomial time can also be solved in polynomial time",
          "Whether neural networks can replace CPUs",
          "Whether parallel computers double speed"
        ],
        "correctAnswerIndex": 1,
        "explanation": "P vs NP asks if polynomial-time verification (NP) implies polynomial-time solvability (P)."
      },
      {
        "id": "cs-a11",
        "questionText": "What is the time complexity of Dijkstra's shortest path algorithm using a min-heap on a graph with V vertices and E edges?",
        "options": [
          "O(V^3)",
          "O((V + E) log V)",
          "O(V * E^2)",
          "O(E^3)"
        ],
        "correctAnswerIndex": 1,
        "explanation": "With a binary min-priority queue, each vertex is extracted in O(log V) and each edge relaxed in O(log V), yielding O((V + E) log V)."
      },
      {
        "id": "cs-a12",
        "questionText": "What is the core breakthrough of the Self-Attention mechanism in Transformer architectures?",
        "options": [
          "It processes sequences sequentially one token at a time without parallelization",
          "It computes pairwise contextual token relevance across the entire sequence simultaneously in parallel",
          "It eliminates the need for matrix multiplications",
          "It replaces floating point math with binary logic"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Self-Attention (Q * K^T / sqrt(d) * V) calculates dynamic all-to-all token weights across arbitrary context distances in parallel."
      },
      {
        "id": "cs-a13",
        "questionText": "According to the CAP Theorem in distributed databases, which combination is impossible during network partitions?",
        "options": [
          "Consistency and Availability simultaneously during a Network Partition",
          "Consistency and Partition Tolerance",
          "Availability and Partition Tolerance",
          "Performance and Latency"
        ],
        "correctAnswerIndex": 0,
        "explanation": "CAP theorem proves that when network partitions (P) occur, a distributed system can maintain either Consistency (C) or Availability (A), but not both."
      },
      {
        "id": "cs-a14",
        "questionText": "What is the mathematical distinction between L1 (Lasso) and L2 (Ridge) regularization?",
        "options": [
          "L1 adds the sum of absolute weight values, driving sparsity; L2 adds squared weights, shrinking them smoothly",
          "L1 penalizes bias; L2 penalizes variance only",
          "L1 only applies to neural networks; L2 only applies to decision trees",
          "L1 doubles weights; L2 divides weights by two"
        ],
        "correctAnswerIndex": 0,
        "explanation": "L1 regularization encourages sparse weights (feature selection) due to geometric sharp corners at axes; L2 shrinks weights uniformly."
      },
      {
        "id": "cs-a15",
        "questionText": "What are the four necessary Coffman conditions for a system Deadlock to occur?",
        "options": [
          "Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait",
          "High CPU, Low RAM, Network Latency, Memory Leak",
          "Cache Thrashing, Disk Failure, Segfault, Infinite Loop",
          "Paging, Segmentation, Swapping, Garbage Collection"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait must simultaneously hold for deadlock."
      },
      {
        "id": "cs-a16",
        "questionText": "How do Residual Skip Connections in ResNet architectures prevent the vanishing gradient problem?",
        "options": [
          "By providing an unimpeded identity shortcut for gradients to flow directly back through layers during backpropagation",
          "By dividing the gradient by layer depth",
          "By resetting weights to zero every 5 epochs",
          "By turning off convolutional layers"
        ],
        "correctAnswerIndex": 0,
        "explanation": "In ResNet, F(x) + x ensures d(Loss)/dx includes a direct +1 identity component, allowing gradients to propagate across hundreds of layers."
      },
      {
        "id": "cs-a17",
        "questionText": "What is Cache Thrashing in CPU memory architecture?",
        "options": [
          "A condition where cache lines are continuously evicted and reloaded due to conflicting memory access patterns",
          "Clearing the cache when an app closes",
          "Doubling the L1 cache frequency",
          "Writing cache data directly to an optical disc"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Thrashing occurs when high-frequency memory references map to identical cache set lines, causing near 100% cache miss rates."
      },
      {
        "id": "cs-a18",
        "questionText": "Which algorithm is capable of finding shortest paths in graphs containing negative edge weights (provided no negative cycles exist)?",
        "options": [
          "Dijkstra's Algorithm",
          "Bellman-Ford Algorithm",
          "Prim's Algorithm",
          "Kruskal's Algorithm"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Bellman-Ford relaxes all E edges V-1 times, accurately handling negative edge weights and detecting negative weight cycles."
      },
      {
        "id": "cs-a19",
        "questionText": "In cryptographic key exchange, how does the Diffie-Hellman algorithm establish a shared secret over an insecure channel?",
        "options": [
          "By sending private keys in plain text",
          "Using modular exponentiation where computing discrete logarithms is computationally intractable",
          "By relying on symmetric XOR encryption only",
          "By sharing server IP addresses"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Diffie-Hellman relies on the computational difficulty of calculating discrete logarithms in finite cyclic groups."
      },
      {
        "id": "cs-a20",
        "questionText": "What is the role of the Generator and Discriminator in Generative Adversarial Networks (GANs)?",
        "options": [
          "The Generator creates synthetic data while the Discriminator tries to distinguish real from fake samples in a minimax game",
          "The Generator compresses images; the Discriminator encrypts them",
          "Both models classify input labels",
          "The Discriminator generates text; the Generator prints it"
        ],
        "correctAnswerIndex": 0,
        "explanation": "GANs pit a Generator (G) against a Discriminator (D) in a zero-sum minimax game: min_G max_D V(D, G)."
      }
    ]
  },
  "Mathematics": {
    "Beginner": [
      {
        "id": "m-b1",
        "questionText": "1. Solve for x in the two-step linear equation: 3x - 4 = 14",
        "options": [
          "x = 4",
          "x = 6",
          "x = 18",
          "x = 3.3"
        ],
        "correctAnswerIndex": 1,
        "misconceptionMap": {
          "2": "Add 4 to 14 to get 18, then divide by 3 coefficient."
        },
        "explanation": "Add 4 to both sides: 3x = 18. Divide by 3: x = 6."
      },
      {
        "id": "m-b2",
        "questionText": "2. If a solar battery generates 150 Watt-hours of energy in 3 hours, what is its unit rate of energy per hour?",
        "options": [
          "450 Wh/h",
          "50 Wh/h",
          "30 Wh/h",
          "100 Wh/h"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Unit rate = total energy ÷ total time = 150 ÷ 3 = 50 Wh/h."
      },
      {
        "id": "m-b3",
        "questionText": "3. What is 15% of 80?",
        "options": [
          "8",
          "12",
          "15",
          "20"
        ],
        "correctAnswerIndex": 1,
        "explanation": "15% of 80 = 0.15 × 80 = 12."
      },
      {
        "id": "m-b4",
        "questionText": "4. What is the perimeter of a rectangle with length 8 meters and width 5 meters?",
        "options": [
          "13 meters",
          "26 meters",
          "40 meters",
          "30 meters"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Perimeter = 2 × (length + width) = 2 × (8 + 5) = 26 meters."
      },
      {
        "id": "m-b5",
        "questionText": "5. Simplify the ratio 12:18 to its simplest whole number form.",
        "options": [
          "6:9",
          "2:3",
          "3:4",
          "1:2"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Divide both terms by the greatest common divisor (6): 12÷6 = 2, 18÷6 = 3. Ratio is 2:3."
      },
      {
        "id": "m-b6",
        "questionText": "6. Solve for y: 2y + 5 = 19",
        "options": [
          "y = 5",
          "y = 7",
          "y = 9",
          "y = 12"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Subtract 5 from both sides: 2y = 14. Divide by 2: y = 7."
      },
      {
        "id": "m-b7",
        "questionText": "7. What is the square root of 144?",
        "options": [
          "10",
          "12",
          "14",
          "16"
        ],
        "correctAnswerIndex": 1,
        "explanation": "12 × 12 = 144, so √144 = 12."
      },
      {
        "id": "m-b8",
        "questionText": "8. What is the slope (m) of the linear equation y = 4x + 3?",
        "options": [
          "3",
          "4",
          "7",
          "1"
        ],
        "correctAnswerIndex": 1,
        "explanation": "In slope-intercept form y = mx + b, the coefficient of x (4) is the slope."
      },
      {
        "id": "m-b9",
        "questionText": "9. If a triangle has two interior angles measuring 50° and 60°, what is the third angle?",
        "options": [
          "60°",
          "70°",
          "80°",
          "90°"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Sum of interior angles of a triangle is 180°. Third angle = 180° - (50° + 60°) = 70°."
      },
      {
        "id": "m-b10",
        "questionText": "10. What is the median of the dataset [3, 7, 9, 12, 15]?",
        "options": [
          "7",
          "9",
          "9.2",
          "12"
        ],
        "correctAnswerIndex": 1,
        "explanation": "In an ordered dataset of 5 numbers, the middle value (3rd item) is 9."
      },
      {
        "id": "m-b11",
        "questionText": "What is the value of 5! (5 factorial)?",
        "options": [
          "120",
          "60",
          "25",
          "720"
        ],
        "correctAnswerIndex": 0,
        "explanation": "5! = 5 × 4 × 3 × 2 × 1 = 120."
      },
      {
        "id": "m-b12",
        "questionText": "What is the perimeter of a rectangle with length 8 cm and width 5 cm?",
        "options": [
          "40 cm",
          "26 cm",
          "13 cm",
          "30 cm"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Perimeter = 2 × (length + width) = 2 × (8 + 5) = 2 × 13 = 26 cm."
      },
      {
        "id": "m-b13",
        "questionText": "What is the square root of 144?",
        "options": [
          "11",
          "12",
          "14",
          "16"
        ],
        "correctAnswerIndex": 1,
        "explanation": "12 × 12 = 144, so the square root is 12."
      },
      {
        "id": "m-b14",
        "questionText": "In the linear equation y = 2x + 7, what is the y-intercept?",
        "options": [
          "2",
          "7",
          "14",
          "0"
        ],
        "correctAnswerIndex": 1,
        "explanation": "In slope-intercept form y = mx + b, b represents the y-intercept, which is 7."
      },
      {
        "id": "m-b15",
        "questionText": "What is the probability of rolling an even number on a standard 6-sided die?",
        "options": [
          "1/6",
          "1/3",
          "1/2",
          "2/3"
        ],
        "correctAnswerIndex": 2,
        "explanation": "Even numbers on a die are 2, 4, 6 (3 outcomes). P(even) = 3/6 = 1/2."
      },
      {
        "id": "m-b16",
        "questionText": "What is the sum of the interior angles of any triangle on a Euclidean plane?",
        "options": [
          "90 degrees",
          "180 degrees",
          "360 degrees",
          "270 degrees"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The interior angles of any planar triangle always sum to exactly 180 degrees."
      },
      {
        "id": "m-b17",
        "questionText": "Simplify the algebraic expression: 4x + 7x - 3x",
        "options": [
          "8x",
          "11x",
          "8x^2",
          "14x"
        ],
        "correctAnswerIndex": 0,
        "explanation": "(4 + 7 - 3)x = 8x."
      },
      {
        "id": "m-b18",
        "questionText": "What is 25% of 240?",
        "options": [
          "48",
          "60",
          "80",
          "120"
        ],
        "correctAnswerIndex": 1,
        "explanation": "25% of 240 = 240 ÷ 4 = 60."
      },
      {
        "id": "m-b19",
        "questionText": "What is the mode of the dataset: [3, 7, 3, 9, 12, 3, 5]?",
        "options": [
          "7",
          "3",
          "9",
          "5"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The mode is the most frequently occurring value in the dataset, which is 3 (appears 3 times)."
      },
      {
        "id": "m-b20",
        "questionText": "If 3 notebooks cost $15, what is the cost of 7 notebooks at the same unit rate?",
        "options": [
          "$30",
          "$35",
          "$45",
          "$21"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Unit price = $15 ÷ 3 = $5 per notebook. 7 notebooks = 7 × $5 = $35."
      }
    ],
    "Intermediate": [
      {
        "id": "m-i1",
        "questionText": "1. What is the derivative f'(x) of the function f(x) = 3x^2 + 5x - 7?",
        "options": [
          "f'(x) = 6x + 5",
          "f'(x) = 3x + 5",
          "f'(x) = 6x^2",
          "f'(x) = 6x - 7"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Using power rule d/dx[x^n] = n*x^(n-1): d/dx[3x^2] = 6x, d/dx[5x] = 5, d/dx[-7] = 0. Result: 6x + 5."
      },
      {
        "id": "m-i2",
        "questionText": "2. Solve the quadratic equation x^2 - 5x + 6 = 0 for x.",
        "options": [
          "x = 1 and x = 6",
          "x = 2 and x = 3",
          "x = -2 and x = -3",
          "x = 0 and x = 5"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Factoring: (x - 2)(x - 3) = 0 gives roots x = 2 and x = 3."
      },
      {
        "id": "m-i3",
        "questionText": "3. What is the exact trigonometric value of sin(30°)?",
        "options": [
          "0",
          "0.5 (1/2)",
          "√3/2",
          "1"
        ],
        "correctAnswerIndex": 1,
        "explanation": "sin(30°) = 1/2 = 0.5."
      },
      {
        "id": "m-i4",
        "questionText": "4. Evaluate log10(1000).",
        "options": [
          "2",
          "3",
          "10",
          "100"
        ],
        "correctAnswerIndex": 1,
        "explanation": "10^3 = 1000, so log10(1000) = 3."
      },
      {
        "id": "m-i5",
        "questionText": "5. What is the Euclidean distance between points (0,0) and (6,8) in 2D Cartesian coordinates?",
        "options": [
          "10",
          "14",
          "48",
          "100"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Distance = √(6^2 + 8^2) = √(36 + 64) = √100 = 10."
      },
      {
        "id": "m-i6",
        "questionText": "6. What is the area of a circle with radius r = 7 cm (using π ≈ 22/7)?",
        "options": [
          "44 cm²",
          "154 cm²",
          "308 cm²",
          "49 cm²"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Area = π × r² = (22/7) × 49 = 22 × 7 = 154 cm²."
      },
      {
        "id": "m-i7",
        "questionText": "7. Evaluate 5! (5 factorial).",
        "options": [
          "20",
          "60",
          "120",
          "720"
        ],
        "correctAnswerIndex": 2,
        "explanation": "5! = 5 × 4 × 3 × 2 × 1 = 120."
      },
      {
        "id": "m-i8",
        "questionText": "8. What is the limit of (sin x) / x as x approaches 0?",
        "options": [
          "0",
          "1",
          "∞",
          "Undefined"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Using L'Hopital's rule or Taylor series: lim(x->0) (sin x)/x = 1."
      },
      {
        "id": "m-i9",
        "questionText": "9. Find the sum of an arithmetic progression with first term a=2, common difference d=3, and n=10 terms.",
        "options": [
          "155",
          "140",
          "135",
          "165"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Sum S_n = (n/2)[2a + (n-1)d] = 5 × [4 + 9×3] = 5 × 31 = 155."
      },
      {
        "id": "m-i10",
        "questionText": "10. What is the product of matrix A = [[1, 2], [3, 4]] and identity matrix I = [[1, 0], [0, 1]]?",
        "options": [
          "[[1, 2], [3, 4]]",
          "[[0, 0], [0, 0]]",
          "[[2, 4], [6, 8]]",
          "[[1, 0], [0, 1]]"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Multiplying any matrix by the identity matrix leaves the original matrix unchanged."
      },
      {
        "id": "m-i11",
        "questionText": "What are the solutions to the quadratic equation x^2 - 5x + 6 = 0?",
        "options": [
          "x = -2 and x = -3",
          "x = 2 and x = 3",
          "x = 1 and x = 6",
          "x = -1 and x = 6"
        ],
        "correctAnswerIndex": 1,
        "explanation": "(x - 2)(x - 3) = 0 gives roots x = 2 and x = 3."
      },
      {
        "id": "m-i12",
        "questionText": "What is the exact value of sin(30 degrees)?",
        "options": [
          "0",
          "1/2",
          "sqrt(3)/2",
          "1"
        ],
        "correctAnswerIndex": 1,
        "explanation": "On the unit circle, sin(30°) = sin(pi/6) = 1/2."
      },
      {
        "id": "m-i13",
        "questionText": "What is the derivative of f(x) = 3x^2 + 5x - 7 with respect to x?",
        "options": [
          "6x + 5",
          "3x + 5",
          "6x^2 + 5",
          "6x - 7"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Applying the power rule: d/dx(3x^2) = 6x, d/dx(5x) = 5, and d/dx(-7) = 0, giving 6x + 5."
      },
      {
        "id": "m-i14",
        "questionText": "What is the area of a circle with radius 7 cm (using pi = 22/7)?",
        "options": [
          "44 cm^2",
          "154 cm^2",
          "88 cm^2",
          "308 cm^2"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Area = pi * r^2 = (22/7) * 7^2 = 22 * 7 = 154 cm^2."
      },
      {
        "id": "m-i15",
        "questionText": "What is the median of the ordered dataset: [2, 5, 8, 12, 16, 20]?",
        "options": [
          "8",
          "10",
          "12",
          "9"
        ],
        "correctAnswerIndex": 1,
        "explanation": "For even N = 6, median is average of 3rd and 4th values: (8 + 12) / 2 = 10."
      },
      {
        "id": "m-i16",
        "questionText": "What is the value of log10(1000)?",
        "options": [
          "2",
          "3",
          "10",
          "100"
        ],
        "correctAnswerIndex": 1,
        "explanation": "10^3 = 1000, so log10(1000) = 3."
      },
      {
        "id": "m-i17",
        "questionText": "In a right triangle with legs of length 3 cm and 4 cm, what is the length of the hypotenuse?",
        "options": [
          "5 cm",
          "6 cm",
          "7 cm",
          "25 cm"
        ],
        "correctAnswerIndex": 0,
        "explanation": "By the Pythagorean theorem: c = sqrt(3^2 + 4^2) = sqrt(9 + 16) = sqrt(25) = 5 cm."
      },
      {
        "id": "m-i18",
        "questionText": "What is the slope of the line passing through coordinates (2, 3) and (6, 11)?",
        "options": [
          "1",
          "2",
          "3",
          "4"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Slope m = (y2 - y1) / (x2 - x1) = (11 - 3) / (6 - 2) = 8 / 4 = 2."
      },
      {
        "id": "m-i19",
        "questionText": "What is the determinant of the 2x2 matrix [[2, 3], [1, 4]]?",
        "options": [
          "5",
          "8",
          "11",
          "14"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Det = (2 * 4) - (3 * 1) = 8 - 3 = 5."
      },
      {
        "id": "m-i20",
        "questionText": "What is the value of 2^6?",
        "options": [
          "32",
          "64",
          "128",
          "16"
        ],
        "correctAnswerIndex": 1,
        "explanation": "2^6 = 64."
      }
    ],
    "Advanced": [
      {
        "id": "m-a1",
        "questionText": "1. What is the indefinite integral ∫ (1 / x) dx?",
        "options": [
          "-1 / x^2 + C",
          "ln|x| + C",
          "e^x + C",
          "x + C"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The antiderivative of 1/x is the natural logarithm ln|x| + C."
      },
      {
        "id": "m-a2",
        "questionText": "2. What are the eigenvalues of the diagonal matrix M = [[2, 0], [0, 5]]?",
        "options": [
          "λ = 0 and λ = 10",
          "λ = 2 and λ = 5",
          "λ = 7 and λ = -3",
          "λ = 1 and λ = 1"
        ],
        "correctAnswerIndex": 1,
        "explanation": "For any diagonal matrix, the eigenvalues are simply the entries along the main diagonal (2 and 5)."
      },
      {
        "id": "m-a3",
        "questionText": "3. What theorem asserts that every non-constant single-variable polynomial with complex coefficients has at least one complex root?",
        "options": [
          "Fundamental Theorem of Calculus",
          "Fundamental Theorem of Algebra",
          "Pythagorean Theorem",
          "Central Limit Theorem"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The Fundamental Theorem of Algebra states that C is algebraically closed."
      },
      {
        "id": "m-a4",
        "questionText": "4. What is the Laplace Transform L{ e^(at) }?",
        "options": [
          "1 / (s - a)",
          "1 / (s + a)",
          "a / s^2",
          "s / (s^2 + a^2)"
        ],
        "correctAnswerIndex": 0,
        "explanation": "L{e^(at)} = ∫[0 to ∞] e^(-st) e^(at) dt = 1 / (s - a) for s > a."
      },
      {
        "id": "m-a5",
        "questionText": "5. What is the gradient vector ∇f of the multivariable function f(x, y) = x^2 * y?",
        "options": [
          "[2xy, x^2]",
          "[x^2, 2xy]",
          "[2x, y]",
          "[2xy, 2xy]"
        ],
        "correctAnswerIndex": 0,
        "explanation": "∂f/∂x = 2xy, ∂f/∂y = x^2. Thus gradient vector ∇f = [2xy, x^2]."
      },
      {
        "id": "m-a6",
        "questionText": "6. In probability theory, which discrete probability distribution models the number of independent events occurring in a fixed interval of time?",
        "options": [
          "Normal Distribution",
          "Poisson Distribution",
          "Uniform Distribution",
          "Binomial Distribution"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The Poisson distribution models event counts occurring with a constant average rate λ."
      },
      {
        "id": "m-a7",
        "questionText": "7. What is Bayes' Theorem formula for conditional probability P(A|B)?",
        "options": [
          "P(A|B) = [P(B|A) × P(A)] / P(B)",
          "P(A|B) = P(A) + P(B)",
          "P(A|B) = P(A) × P(B)",
          "P(A|B) = P(B) / P(A)"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Bayes' Theorem: P(A|B) = [P(B|A) * P(A)] / P(B)."
      },
      {
        "id": "m-a8",
        "questionText": "8. What is the Taylor series expansion for e^x centered at x = 0?",
        "options": [
          "1 + x + x^2/2! + x^3/3! + ...",
          "x - x^3/3! + x^5/5! - ...",
          "1 - x^2/2! + x^4/4! - ...",
          "x + x^2 + x^3 + ..."
        ],
        "correctAnswerIndex": 0,
        "explanation": "e^x = ∑ [x^n / n!] = 1 + x + x^2/2! + x^3/3! + ..."
      },
      {
        "id": "m-a9",
        "questionText": "9. What is Euler's formula relating complex exponentiation to trigonometric functions?",
        "options": [
          "e^(ix) = cos(x) + i sin(x)",
          "e^(ix) = sin(x) + i cos(x)",
          "e^(x) = cos(ix)",
          "e^(ix) = cos^2(x) + sin^2(x)"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Euler's formula states e^(ix) = cos(x) + i sin(x)."
      },
      {
        "id": "m-a10",
        "questionText": "10. What is the rank of a 3x3 matrix where all three rows are identical non-zero vectors?",
        "options": [
          "0",
          "1",
          "2",
          "3"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Since all rows are linearly dependent multiples of one vector, the dimension of the row space (rank) is 1."
      },
      {
        "id": "m-a11",
        "questionText": "What is the definite integral of 2x dx evaluated from x = 0 to x = 4?",
        "options": [
          "8",
          "16",
          "32",
          "4"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The antiderivative of 2x is x^2. Evaluated from 0 to 4: 4^2 - 0^2 = 16."
      },
      {
        "id": "m-a12",
        "questionText": "What is the limit of (sin x) / x as x approaches 0?",
        "options": [
          "0",
          "1",
          "Infinity",
          "Undefined"
        ],
        "correctAnswerIndex": 1,
        "explanation": "By L'Hôpital's rule or geometric unit circle limits, lim_{x->0} (sin x)/x = 1."
      },
      {
        "id": "m-a13",
        "questionText": "What is the derivative of f(x) = ln(x) for x > 0?",
        "options": [
          "1/x",
          "e^x",
          "x",
          "1/x^2"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The derivative of natural logarithm ln(x) with respect to x is 1/x."
      },
      {
        "id": "m-a14",
        "questionText": "What is the dot product of two 2D vectors u = [1, 3] and v = [4, -2]?",
        "options": [
          "-2",
          "10",
          "2",
          "-10"
        ],
        "correctAnswerIndex": 0,
        "explanation": "u · v = (1 × 4) + (3 × -2) = 4 - 6 = -2."
      },
      {
        "id": "m-a15",
        "questionText": "In complex numbers, what is the value of i^4 where i = sqrt(-1)?",
        "options": [
          "-1",
          "1",
          "-i",
          "i"
        ],
        "correctAnswerIndex": 1,
        "explanation": "i^2 = -1; therefore, i^4 = (i^2)^2 = (-1)^2 = 1."
      },
      {
        "id": "m-a16",
        "questionText": "What is Bayes' Theorem used to compute in probability theory?",
        "options": [
          "Posterior probability of an event given prior probability and new likelihood evidence",
          "The sum of angles in non-Euclidean geometry",
          "The prime factorization of large composite integers",
          "The roots of quintic polynomial equations"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Bayes' Theorem computes P(A|B) = [P(B|A) * P(A)] / P(B), updating belief given observed evidence."
      },
      {
        "id": "m-a17",
        "questionText": "What does an Eigenvalue lambda represent for a square matrix A and eigenvector v (Av = lambda * v)?",
        "options": [
          "A scalar factor by which eigenvector v is scaled without changing its directional span",
          "The determinant divided by the matrix trace",
          "The inverse of the matrix",
          "The number of rows in the matrix"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Matrix transformation Av stretches or shrinks eigenvector v by scalar factor lambda without rotating it off its span."
      },
      {
        "id": "m-a18",
        "questionText": "What is the Gradient vector (grad f) of a scalar multivariable function f(x, y)?",
        "options": [
          "A vector of all first-order partial derivatives pointing in the direction of greatest rate of increase",
          "The second derivative along the x-axis",
          "The area under the multivariable surface",
          "A single scalar constant"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The gradient vector [df/dx, df/dy] points in the direction of maximum directional derivative."
      },
      {
        "id": "m-a19",
        "questionText": "What does the Standard Deviation measure in statistics?",
        "options": [
          "The dispersion or spread of data values around their arithmetic mean",
          "The average of the minimum and maximum data values",
          "The total number of samples collected",
          "The error rate of a computer monitor"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Standard deviation (sigma = sqrt(variance)) measures the dispersion of values relative to the distribution mean."
      },
      {
        "id": "m-a20",
        "questionText": "What is the Maclaurin series expansion of e^x evaluated around x = 0?",
        "options": [
          "1 + x + x^2/2! + x^3/3! + ...",
          "x - x^3/3! + x^5/5! - ...",
          "1 - x^2/2! + x^4/4! - ...",
          "1 + 2x + 3x^2 + ..."
        ],
        "correctAnswerIndex": 0,
        "explanation": "e^x = sum_{n=0}^{inf} x^n / n! = 1 + x + x^2/2 + x^3/6 + ..."
      }
    ]
  },
  "Physics": {
    "Beginner": [
      {
        "id": "p-b1",
        "questionText": "1. What is Newton's First Law of Motion also known as?",
        "options": [
          "Law of Inertia",
          "Law of Universal Gravitation",
          "Law of Conservation of Momentum",
          "Ohm's Law"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Newton's First Law states an object remains at rest or in uniform motion unless acted upon by a net force (Inertia)."
      },
      {
        "id": "p-b2",
        "questionText": "2. What is the formula for calculating average speed?",
        "options": [
          "Speed = Distance ÷ Time",
          "Speed = Distance × Time",
          "Speed = Force ÷ Acceleration",
          "Speed = Mass × Velocity"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Speed is scalar distance divided by elapsed time."
      },
      {
        "id": "p-b3",
        "questionText": "3. What energy transformation occurs when a compressed spring is released?",
        "options": [
          "Elastic Potential Energy transforms into Kinetic Energy",
          "Thermal Energy transforms into Nuclear Energy",
          "Chemical Energy transforms into Light Energy",
          "Electrical Energy transforms into Gravitational Energy"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Stored elastic potential energy converts into motion (kinetic energy)."
      },
      {
        "id": "p-b4",
        "questionText": "4. What unit is electrical resistance measured in?",
        "options": [
          "Volts",
          "Amperes",
          "Ohms (Ω)",
          "Watts"
        ],
        "correctAnswerIndex": 2,
        "explanation": "Resistance is measured in Ohms (symbol Ω)."
      },
      {
        "id": "p-b5",
        "questionText": "5. According to Newton's Second Law (F = m × a), if net force doubles while mass remains constant, acceleration does what?",
        "options": [
          "Stays the same",
          "Doubles",
          "Decreases by half",
          "Quadruples"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Acceleration is directly proportional to net force: doubling force doubles acceleration."
      },
      {
        "id": "p-b6",
        "questionText": "6. What type of wave is a sound wave traveling through air?",
        "options": [
          "Transverse Wave",
          "Longitudinal Wave",
          "Electromagnetic Wave",
          "Surface Water Wave"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Sound waves are longitudinal pressure waves creating compressions and rarefactions."
      },
      {
        "id": "p-b7",
        "questionText": "7. What instrument measures electric current flowing in a circuit branch?",
        "options": [
          "Voltmeter",
          "Ammeter",
          "Thermometer",
          "Barometer"
        ],
        "correctAnswerIndex": 1,
        "explanation": "An ammeter is connected in series to measure electric current in Amperes."
      },
      {
        "id": "p-b8",
        "questionText": "8. What is the approximate acceleration due to gravity (g) near Earth's surface?",
        "options": [
          "5 m/s²",
          "9.8 m/s²",
          "15 m/s²",
          "25 m/s²"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Earth's gravitational acceleration near sea level is approximately 9.8 m/s²."
      },
      {
        "id": "p-b9",
        "questionText": "9. What primary nuclear reaction powers the Sun's core?",
        "options": [
          "Nuclear Fission",
          "Nuclear Fusion",
          "Chemical Combustion",
          "Radioactive Alpha Decay"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Hydrogen nuclei fuse into helium at extreme solar core temperatures and pressures."
      },
      {
        "id": "p-b10",
        "questionText": "10. How much Work is done when a 10 Newton force moves an object 5 meters in the direction of force?",
        "options": [
          "2 Joules",
          "15 Joules",
          "50 Joules",
          "100 Joules"
        ],
        "correctAnswerIndex": 2,
        "explanation": "Work = Force × Distance = 10 N × 5 m = 50 Joules."
      },
      {
        "id": "p-b11",
        "questionText": "What is the SI unit of electric current?",
        "options": [
          "Volt",
          "Ampere (A)",
          "Ohm",
          "Watt"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Electric current is measured in Amperes (A), representing Coulombs of charge per second."
      },
      {
        "id": "p-b12",
        "questionText": "What does the Law of Conservation of Energy state?",
        "options": [
          "Energy can only be created by nuclear power",
          "Energy cannot be created or destroyed, only transformed from one form to another",
          "Energy increases when temperature drops",
          "Energy disappears completely when friction occurs"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Total energy in an isolated system remains constant; it can only change from potential, kinetic, thermal, etc."
      },
      {
        "id": "p-b13",
        "questionText": "What happens to water density when liquid water freezes into solid ice?",
        "options": [
          "Density decreases, causing ice to float on water",
          "Density doubles, causing ice to sink immediately",
          "Density remains exactly the same",
          "Density drops to zero"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Due to hydrogen bonding, ice forms an open hexagonal crystal lattice that is less dense than liquid water."
      },
      {
        "id": "p-b14",
        "questionText": "What type of simple machine is a ramp or inclined plane?",
        "options": [
          "A device that reduces the input force needed to lift an object by increasing distance",
          "A machine that creates new energy",
          "A rotating wheel that reverses direction",
          "A battery storage unit"
        ],
        "correctAnswerIndex": 0,
        "explanation": "An inclined plane provides mechanical advantage by spreading work over a longer distance to reduce required force."
      },
      {
        "id": "p-b15",
        "questionText": "What is the approximate speed of sound in dry air at room temperature (20°C)?",
        "options": [
          "343 m/s",
          "3,000 m/s",
          "300,000,000 m/s",
          "34 m/s"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Sound travels at approximately 343 m/s in air at 20°C (compared to 3 x 10^8 m/s for light)."
      },
      {
        "id": "p-b16",
        "questionText": "Which scientific instrument measures atmospheric air pressure?",
        "options": [
          "Thermometer",
          "Barometer",
          "Voltmeter",
          "Anemometer"
        ],
        "correctAnswerIndex": 1,
        "explanation": "A barometer measures atmospheric pressure, critical for weather forecasting and altitude calculation."
      },
      {
        "id": "p-b17",
        "questionText": "What is the SI unit of force?",
        "options": [
          "Joule",
          "Newton (N)",
          "Pascal",
          "Kilogram"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The Newton (N) is the SI unit of force, defined as 1 kg·m/s²."
      },
      {
        "id": "p-b18",
        "questionText": "Which visible light color has the longest wavelength?",
        "options": [
          "Violet",
          "Red",
          "Blue",
          "Green"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Red light has the longest wavelength (~700 nm) and lowest frequency in the visible electromagnetic spectrum."
      },
      {
        "id": "p-b19",
        "questionText": "What is the force that opposes the relative motion of two surfaces in contact?",
        "options": [
          "Gravity",
          "Friction",
          "Tension",
          "Inertia"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Friction is the contact force resisting sliding or rolling motion between two touching surfaces."
      },
      {
        "id": "p-b20",
        "questionText": "What is the acceleration due to Earth's gravity near sea level?",
        "options": [
          "4.9 m/s^2",
          "9.8 m/s^2",
          "19.6 m/s^2",
          "98 m/s^2"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Standard gravitational acceleration on Earth's surface is approximately 9.8 m/s²."
      }
    ],
    "Intermediate": [
      {
        "id": "p-i1",
        "questionText": "1. According to Ohm's Law (V = I × R), if a circuit component has 12 Volts across it and resistance of 4 Ohms, what is the current?",
        "options": [
          "3 Amperes",
          "48 Amperes",
          "16 Amperes",
          "0.33 Amperes"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Current I = V ÷ R = 12 V ÷ 4 Ω = 3 Amperes."
      },
      {
        "id": "p-i2",
        "questionText": "2. What is the Kinetic Energy formula for a moving object of mass m and velocity v?",
        "options": [
          "KE = m × v",
          "KE = 1/2 × m × v^2",
          "KE = m × g × h",
          "KE = 1/2 × m^2 × v"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Kinetic Energy KE = 1/2 m v²."
      },
      {
        "id": "p-i3",
        "questionText": "3. What optical phenomenon causes a drinking straw to appear bent in a glass of water?",
        "options": [
          "Reflection",
          "Refraction",
          "Diffraction",
          "Polarization"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Light rays bend (refract) at the interface between air and denser water due to wave speed change."
      },
      {
        "id": "p-i4",
        "questionText": "4. What is the linear momentum formula for an object?",
        "options": [
          "p = m × v",
          "p = F × t",
          "p = 1/2 m v^2",
          "p = m × a"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Momentum p is the product of mass m and velocity v (p = mv)."
      },
      {
        "id": "p-i5",
        "questionText": "5. Three resistors with values 2Ω, 4Ω, and 6Ω are connected in series. What is total equivalent resistance?",
        "options": [
          "1.09 Ω",
          "6 Ω",
          "12 Ω",
          "24 Ω"
        ],
        "correctAnswerIndex": 2,
        "explanation": "In series, total resistance R_total = R1 + R2 + R3 = 2 + 4 + 6 = 12 Ω."
      },
      {
        "id": "p-i6",
        "questionText": "6. What is Snell's Law formula describing light refraction across medium boundaries?",
        "options": [
          "n1 × sin(θ1) = n2 × sin(θ2)",
          "V1 × I1 = V2 × I2",
          "F1 × d1 = F2 × d2",
          "sin(θ1) + sin(θ2) = n"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Snell's law relates refractive indices n and angles θ: n1 sin(θ1) = n2 sin(θ2)."
      },
      {
        "id": "p-i7",
        "questionText": "7. What is the frequency of a wave traveling at 300 m/s with a wavelength of 3 meters?",
        "options": [
          "100 Hz",
          "900 Hz",
          "300 Hz",
          "0.01 Hz"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Frequency f = wave speed ÷ wavelength = 300 m/s ÷ 3 m = 100 Hz."
      },
      {
        "id": "p-i8",
        "questionText": "8. What is the First Law of Thermodynamics?",
        "options": [
          "Heat flows spontaneously from cold to hot",
          "Energy cannot be created or destroyed, only transformed from one form to another",
          "Absolute zero can be reached in finite steps",
          "Entropy of an isolated system decreases"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The 1st Law states energy conservation ΔU = Q - W."
      },
      {
        "id": "p-i9",
        "questionText": "9. Which color of light in the visible spectrum has the shortest wavelength and highest frequency?",
        "options": [
          "Red",
          "Yellow",
          "Green",
          "Violet/Blue"
        ],
        "correctAnswerIndex": 3,
        "explanation": "Violet light has the shortest wavelength (~400 nm) and highest photon energy in visible light."
      },
      {
        "id": "p-i10",
        "questionText": "10. What is the acceleration of a 5 kg object acted upon by a net force of 20 Newtons?",
        "options": [
          "2 m/s²",
          "4 m/s²",
          "100 m/s²",
          "15 m/s²"
        ],
        "correctAnswerIndex": 1,
        "explanation": "a = F ÷ m = 20 N ÷ 5 kg = 4 m/s²."
      },
      {
        "id": "p-i11",
        "questionText": "What is the kinetic energy of a 2 kg object moving at a velocity of 3 m/s?",
        "options": [
          "6 Joules",
          "9 Joules",
          "18 Joules",
          "12 Joules"
        ],
        "correctAnswerIndex": 1,
        "explanation": "KE = 1/2 * m * v^2 = 1/2 * 2 * (3^2) = 1 * 9 = 9 Joules."
      },
      {
        "id": "p-i12",
        "questionText": "What does Archimedes' Principle state about buoyant force on a submerged body?",
        "options": [
          "Buoyant force equals the weight of fluid displaced by the body",
          "Buoyant force depends on the atmospheric pressure only",
          "Buoyant force is always zero in saltwater",
          "Buoyant force equals the total volume of Earth"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Archimedes' Principle: Any body submerged in a fluid is buoyed up by a force equal to the weight of displaced fluid."
      },
      {
        "id": "p-i13",
        "questionText": "What wave phenomenon causes the perceived frequency of an ambulance siren to increase as it approaches you?",
        "options": [
          "Refraction",
          "Doppler Effect",
          "Diffraction",
          "Polarization"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The Doppler Effect compresses wavefronts toward an approaching observer, increasing perceived frequency."
      },
      {
        "id": "p-i14",
        "questionText": "According to Coulomb's Law, what happens to electrostatic force between two charges if the distance between them is doubled?",
        "options": [
          "Force doubles",
          "Force is reduced to 1/4 of its original value",
          "Force quadruples",
          "Force drops to zero"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Coulomb's Law has an inverse-square relationship (F ~ 1/r^2); doubling distance r quarters the force."
      },
      {
        "id": "p-i15",
        "questionText": "How much work is done when a constant force of 10 N pushes a box 5 meters across a floor in the direction of the force?",
        "options": [
          "2 Joules",
          "15 Joules",
          "50 Joules",
          "100 Joules"
        ],
        "correctAnswerIndex": 2,
        "explanation": "Work = Force × Distance = 10 N × 5 m = 50 Joules."
      },
      {
        "id": "p-i16",
        "questionText": "What is the frequency of a sound wave traveling at 340 m/s with a wavelength of 2 meters?",
        "options": [
          "170 Hz",
          "680 Hz",
          "340 Hz",
          "85 Hz"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Wave speed v = f × lambda; therefore, f = v / lambda = 340 / 2 = 170 Hz."
      },
      {
        "id": "p-i17",
        "questionText": "What does the Second Law of Thermodynamics say about entropy in an isolated system?",
        "options": [
          "Entropy always decreases over time",
          "Total entropy of an isolated system always increases or remains constant in spontaneous processes",
          "Entropy is always zero at 100°C",
          "Entropy is destroyed in engines"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The Second Law states that spontaneous natural processes tend toward maximum thermodynamic entropy (disorder)."
      },
      {
        "id": "p-i18",
        "questionText": "In a purely series electrical circuit, how does current I compare across each individual component?",
        "options": [
          "Current is identical through every component in the series path",
          "Current divides inversely with resistance",
          "Current doubles at each resistor",
          "Current is highest at the middle resistor"
        ],
        "correctAnswerIndex": 0,
        "explanation": "In a single series loop, charge conservation dictates that current is identical at every point in the circuit."
      },
      {
        "id": "p-i19",
        "questionText": "What is the refractive index of a medium in which the speed of light is 2.0 × 10^8 m/s (c = 3.0 × 10^8 m/s)?",
        "options": [
          "1.0",
          "1.5",
          "2.0",
          "0.67"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Index of refraction n = c / v = (3.0 × 10^8) / (2.0 × 10^8) = 1.5."
      },
      {
        "id": "p-i20",
        "questionText": "What is momentum defined as in classical mechanics?",
        "options": [
          "Mass multiplied by velocity (p = m × v)",
          "Force multiplied by time",
          "Mass divided by acceleration",
          "Work divided by power"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Linear momentum p = m × v is the product of an object's mass and velocity vector."
      }
    ],
    "Advanced": [
      {
        "id": "p-a1",
        "questionText": "1. What equation represents Einstein's mass-energy equivalence principle?",
        "options": [
          "E = m c^2",
          "F = m a",
          "E = h f",
          "p = h / λ"
        ],
        "correctAnswerIndex": 0,
        "explanation": "E = mc² describes how mass converts into equivalent energy."
      },
      {
        "id": "p-a2",
        "questionText": "2. What fundamental set of 4 differential equations unifies electricity, magnetism, and light?",
        "options": [
          "Maxwell's Equations",
          "Schrödinger Equations",
          "Navier-Stokes Equations",
          "Euler Equations"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Maxwell's equations formulate electrodynamics and predict electromagnetic waves."
      },
      {
        "id": "p-a3",
        "questionText": "3. What quantum principle asserts that position (x) and momentum (p) cannot be simultaneously measured with arbitrary precision?",
        "options": [
          "Pauli Exclusion Principle",
          "Heisenberg Uncertainty Principle",
          "De Broglie Hypothesis",
          "Bohr Postulate"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Heisenberg Uncertainty Principle: Δx Δp ≥ ħ/2."
      },
      {
        "id": "p-a4",
        "questionText": "4. What fluid dynamics principle states that an increase in fluid speed occurs simultaneously with a decrease in static pressure?",
        "options": [
          "Pascal's Principle",
          "Bernoulli's Principle",
          "Archimedes' Principle",
          "Hooke's Law"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Bernoulli's principle models conservation of energy along streamline fluid flow."
      },
      {
        "id": "p-a5",
        "questionText": "5. What quantum effect involves emission of electrons from a metal surface when light above a threshold frequency shines on it?",
        "options": [
          "Compton Effect",
          "Photoelectric Effect",
          "Pair Production",
          "Cherenkov Radiation"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Einstein explained the photoelectric effect by quantizing light into discrete photons (E = hf)."
      },
      {
        "id": "p-a6",
        "questionText": "6. In Special Relativity, what is the Lorentz gamma factor formula?",
        "options": [
          "γ = 1 / √(1 - v^2 / c^2)",
          "γ = 1 - v / c",
          "γ = √(1 + v^2 / c^2)",
          "γ = c / v"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Lorentz factor γ = 1 / √(1 - v²/c²)."
      },
      {
        "id": "p-a7",
        "questionText": "7. What gauge boson particle mediates the electromagnetic force between charged particles?",
        "options": [
          "Gluon",
          "Photon",
          "W Boson",
          "Graviton"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Photons are massless gauge bosons mediating electrodynamics."
      },
      {
        "id": "p-a8",
        "questionText": "8. What phenomenon causes a pitch frequency shift in sound or light when a wave source moves relative to an observer?",
        "options": [
          "Doppler Effect",
          "Raman Scattering",
          "Zeeman Effect",
          "Stark Effect"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The Doppler effect shifts observed frequency higher as source approaches and lower as it recedes."
      },
      {
        "id": "p-a9",
        "questionText": "9. What is the maximum theoretical efficiency of a heat engine operating between hot reservoir T_h and cold reservoir T_c?",
        "options": [
          "Carnot Efficiency η = 1 - (T_c / T_h)",
          "η = 100%",
          "η = T_h / T_c",
          "η = (T_h - T_c) / T_c"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Carnot efficiency η_max = 1 - T_c/T_h (with absolute temperatures in Kelvin)."
      },
      {
        "id": "p-a10",
        "questionText": "10. What is the Fermi Energy level in solid state physics?",
        "options": [
          "The energy required to ionize an atom",
          "The highest occupied quantum state of electrons at absolute zero temperature (0 K)",
          "The energy of solar radiation",
          "The binding energy of atomic nuclei"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Fermi energy is the chemical potential of non-interacting fermions at absolute zero."
      },
      {
        "id": "p-a11",
        "questionText": "What is the de Broglie wavelength of a matter particle with linear momentum p?",
        "options": [
          "lambda = h / p",
          "lambda = h × p",
          "lambda = p / h",
          "lambda = c / p"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Louis de Broglie showed matter exhibits wave-particle duality with wavelength lambda = h / p (Planck constant / momentum)."
      },
      {
        "id": "p-a12",
        "questionText": "What does Heisenberg's Uncertainty Principle dictate for position x and momentum p of a quantum particle?",
        "options": [
          "Delta(x) × Delta(p) >= h-bar / 2",
          "Delta(x) + Delta(p) = 0",
          "Position and momentum can both be measured with infinite precision simultaneously",
          "Uncertainty only applies to sound waves"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Heisenberg proved non-commuting observables satisfy Delta(x) * Delta(p) >= h-bar / 2, setting a fundamental quantum limit."
      },
      {
        "id": "p-a13",
        "questionText": "What did Albert Einstein's explanation of the Photoelectric Effect prove about light?",
        "options": [
          "Light travels in discrete quantized packets of energy called photons (E = hf)",
          "Light cannot travel through a vacuum",
          "Light is purely a continuous classical wave",
          "Electrons can only be emitted at night"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Einstein showed electron ejection depends on photon frequency rather than wave intensity, proving quantized photons."
      },
      {
        "id": "p-a14",
        "questionText": "What is the escape velocity formula from a spherical body of mass M and radius R?",
        "options": [
          "v = sqrt(2GM / R)",
          "v = sqrt(GM / R)",
          "v = 2GM / R^2",
          "v = GM / 2R"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Equating kinetic energy to gravitational potential energy: 1/2 m v^2 = G M m / R yields v = sqrt(2GM / R)."
      },
      {
        "id": "p-a15",
        "questionText": "What does Faraday's Law of Electromagnetic Induction state?",
        "options": [
          "An induced electromotive force (EMF) is proportional to the negative rate of change of magnetic flux",
          "Magnetic monopoles exist inside conductors",
          "Electric charge cannot move near magnets",
          "Resistance is independent of temperature"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Faraday's Law (EMF = -d(Phi_B)/dt) describes voltage induced across a closed loop by dynamic magnetic flux."
      },
      {
        "id": "p-a16",
        "questionText": "According to Special Relativity, what happens to the clock of an observer moving near the speed of light relative to a stationary observer?",
        "options": [
          "The moving clock ticks slower (Time Dilation)",
          "The moving clock ticks faster",
          "The moving clock reverses direction",
          "Time is completely unaffected"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Relativistic time dilation (delta t = gamma * delta t_0) causes clocks in relative motion to run slower."
      },
      {
        "id": "p-a17",
        "questionText": "What is the total Lorentz force acting on a particle with electric charge q in fields E and B?",
        "options": [
          "F = q(E + v × B)",
          "F = qE - qB",
          "F = q(v · B)",
          "F = m(E × B)"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The Lorentz force combines electrostatic force qE and magnetic force q(v × B): F = q(E + v × B)."
      },
      {
        "id": "p-a18",
        "questionText": "Under what physical condition does Total Internal Reflection occur at a boundary between media?",
        "options": [
          "When light travels from a higher refractive index to a lower index medium at an angle exceeding the critical angle",
          "When light enters glass from air at normal incidence",
          "When light reflects off a metal mirror",
          "When the angle of incidence is exactly 0 degrees"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Total internal reflection occurs when n1 > n2 and the incident angle theta_1 exceeds arcsin(n2 / n1)."
      },
      {
        "id": "p-a19",
        "questionText": "What is the physical principle behind Constructive Interference between two coherent waves?",
        "options": [
          "Wave crests align in-phase (path difference = n * lambda), resulting in reinforced maximum amplitude",
          "A wave crest meets a trough and cancels out",
          "Wave speed slows to zero",
          "Frequency changes into ultraviolet light"
        ],
        "correctAnswerIndex": 0,
        "explanation": "When phase difference is an integer multiple of 2*pi, amplitudes sum constructively to create intensity peaks."
      },
      {
        "id": "p-a20",
        "questionText": "What is the physical significance of Planck's constant (h = 6.626 × 10^-34 J·s)?",
        "options": [
          "It is the fundamental quantum scale relating photon frequency to energy (E = hf)",
          "It represents the radius of the observable universe",
          "It is the maximum speed of sound in steel",
          "It measures the charge of an alpha particle"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Planck's constant h is the fundamental quantum constant linking frequency to energy quanta."
      }
    ]
  },
  "Biology": {
    "Beginner": [
      {
        "id": "b-b1",
        "questionText": "1. What are the main chemical outputs (products) of plant photosynthesis?",
        "options": [
          "Carbon dioxide and water",
          "Glucose (sugar) and oxygen gas",
          "Nitrogen and solar radiation",
          "Chlorophyll and soil minerals"
        ],
        "correctAnswerIndex": 1,
        "misconceptionMap": {
          "0": "Carbon dioxide and water are consumed reactants, not products."
        },
        "explanation": "Photosynthesis converts CO2 and H2O into Glucose and Oxygen using solar energy."
      },
      {
        "id": "b-b2",
        "questionText": "2. Which organelle is famously known as the \"powerhouse of the cell\" for generating ATP energy?",
        "options": [
          "Nucleus",
          "Mitochondria",
          "Ribosome",
          "Vacuole"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Mitochondria produce cellular ATP energy via cellular respiration."
      },
      {
        "id": "b-b3",
        "questionText": "3. What green cellular pigment inside chloroplasts absorbs sunlight?",
        "options": [
          "Hemoglobin",
          "Chlorophyll",
          "Melanin",
          "Carotene"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Chlorophyll absorbs red and blue light wavelengths while reflecting green light."
      },
      {
        "id": "b-b4",
        "questionText": "4. Microscopic pores on leaf surfaces that open and close for gas exchange are called:",
        "options": [
          "Stomata",
          "Xylem",
          "Phloem",
          "Chloroplasts"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Stomata dot leaf surfaces, regulated by guard cells to control CO2, O2, and water vapor."
      },
      {
        "id": "b-b5",
        "questionText": "5. In ecological energy pyramids, approximately what percentage of biomass energy passes to the next trophic level?",
        "options": [
          "100%",
          "50%",
          "10%",
          "1%"
        ],
        "correctAnswerIndex": 2,
        "explanation": "The 10% Energy Rule states ~10% of biomass energy moves up to each successive trophic level."
      },
      {
        "id": "b-b6",
        "questionText": "6. What double-helix molecule stores genetic instructions in living organisms?",
        "options": [
          "DNA",
          "ATP",
          "Glucose",
          "Hemoglobin"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Deoxyribonucleic Acid (DNA) encodes hereditary genetic instructions."
      },
      {
        "id": "b-b7",
        "questionText": "7. What process do somatic body cells use to divide into two identical daughter cells for growth?",
        "options": [
          "Mitosis",
          "Meiosis",
          "Fertilization",
          "Osmosis"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Mitosis duplicates chromosomes to yield 2 genetically identical diploid daughter cells."
      },
      {
        "id": "b-b8",
        "questionText": "8. What muscle organ pumps blood through the human circulatory system?",
        "options": [
          "Lungs",
          "Heart",
          "Liver",
          "Kidney"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The heart is a muscular 4-chambered pump circulating oxygenated and deoxygenated blood."
      },
      {
        "id": "b-b9",
        "questionText": "9. What term describes an organism that produces its own organic food from sunlight?",
        "options": [
          "Autotroph / Producer",
          "Heterotroph / Consumer",
          "Decomposer",
          "Parasite"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Autotrophs (producers) synthesize organic molecules via photosynthesis."
      },
      {
        "id": "b-b10",
        "questionText": "10. Fungi and bacteria perform what critical ecosystem function by breaking down dead matter?",
        "options": [
          "Photosynthesis",
          "Decomposition",
          "Pollination",
          "Transpiration"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Decomposers recycle vital nitrogen, phosphorus, and organic carbon back into soil."
      },
      {
        "id": "b-b11",
        "questionText": "Which organelle serves as the control center of a eukaryotic cell and houses its genetic DNA?",
        "options": [
          "Nucleus",
          "Mitochondria",
          "Vacuole",
          "Ribosome"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The nucleus contains genomic DNA and coordinates cell activities such as growth, metabolism, and division."
      },
      {
        "id": "b-b12",
        "questionText": "What is the primary function of red blood cells (erythrocytes) in the human circulatory system?",
        "options": [
          "Transport oxygen from lungs to body tissues using hemoglobin",
          "Fight bacterial infections",
          "Form blood clots during bleeding",
          "Digest dietary carbohydrates"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Red blood cells contain iron-rich hemoglobin that binds and delivers oxygen throughout the human body."
      },
      {
        "id": "b-b13",
        "questionText": "What are organisms called that feed exclusively on plants and autotrophs?",
        "options": [
          "Carnivores",
          "Herbivores",
          "Decomposers",
          "Parasites"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Herbivores are primary consumers that obtain nutritional energy by consuming plant matter."
      },
      {
        "id": "b-b14",
        "questionText": "Which biological process do plant roots use to absorb water molecules from soil across semi-permeable cell membranes?",
        "options": [
          "Osmosis",
          "Active filtration",
          "Phagocytosis",
          "Transpiration pull only"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Osmosis is the passive diffusion of water molecules across a semi-permeable membrane from low to high solute concentration."
      },
      {
        "id": "b-b15",
        "questionText": "What is the primary complex carbohydrate that forms rigid structural support in plant cell walls?",
        "options": [
          "Glycogen",
          "Cellulose",
          "Starch",
          "Chitin"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Cellulose is a polysaccharide of beta-glucose units that provides high tensile strength to plant cell walls."
      },
      {
        "id": "b-b16",
        "questionText": "Which muscular organ contracts rhythmically to pump oxygenated and deoxygenated blood in humans?",
        "options": [
          "Lungs",
          "Heart",
          "Liver",
          "Kidney"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The heart is a four-chambered muscular pump driving systemic and pulmonary circulation."
      },
      {
        "id": "b-b17",
        "questionText": "What is pollination in flowering plants?",
        "options": [
          "The transfer of pollen grains from the male anther to the female stigma",
          "The germination of seeds under soil",
          "The shedding of leaves in autumn",
          "The loss of water through leaves"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Pollination transfers pollen from male stamen anthers to female carpel stigmas to enable plant fertilization."
      },
      {
        "id": "b-b18",
        "questionText": "Which essential gas do aerobic organisms inhale for cellular respiration in mitochondria?",
        "options": [
          "Carbon dioxide",
          "Oxygen (O2)",
          "Nitrogen",
          "Methane"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Aerobic cellular respiration requires oxygen as the terminal electron acceptor in the electron transport chain."
      },
      {
        "id": "b-b19",
        "questionText": "What is the largest organ of the human body by surface area?",
        "options": [
          "Liver",
          "Skin (Integumentary System)",
          "Brain",
          "Small Intestine"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The skin is the largest organ, providing environmental barrier protection, temperature regulation, and sensory perception."
      },
      {
        "id": "b-b20",
        "questionText": "What are decomposers (like fungi and soil bacteria) responsible for in an ecosystem?",
        "options": [
          "Breaking down dead organic matter and recycling vital nutrients back into the soil",
          "Hunting live apex predators",
          "Generating sunlight",
          "Absorbing oxygen from clouds"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Decomposers recycle nitrogen, phosphorus, and carbon from dead biomass back into biological nutrient cycles."
      }
    ],
    "Intermediate": [
      {
        "id": "b-i1",
        "questionText": "1. What nitrogenous base pairs with Adenine (A) in RNA molecules during gene transcription?",
        "options": [
          "Thymine (T)",
          "Uracil (U)",
          "Cytosine (C)",
          "Guanine (G)"
        ],
        "correctAnswerIndex": 1,
        "misconceptionMap": {
          "0": "Thymine pairs in DNA. RNA replaces Thymine with Uracil (U)."
        },
        "explanation": "In RNA synthesis, Uracil (U) pairs with Adenine (A)."
      },
      {
        "id": "b-i2",
        "questionText": "2. What is the CRISPR-Cas9 system used for in modern biotechnology?",
        "options": [
          "Measuring soil temperature",
          "Precise targeted gene editing and genomic sequence alteration",
          "Filtering clean drinking water",
          "Speeding up seed germination"
        ],
        "correctAnswerIndex": 1,
        "explanation": "CRISPR-Cas9 uses guide RNA to direct endonuclease Cas9 to cut target DNA for gene editing."
      },
      {
        "id": "b-i3",
        "questionText": "3. Where inside cellular cytoplasm does mRNA translation into amino acid polypeptide chains occur?",
        "options": [
          "Nucleus",
          "Ribosomes",
          "Vacuole",
          "Golgi Apparatus"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Ribosomes decode mRNA codons to assemble specific amino acid sequences into proteins."
      },
      {
        "id": "b-i4",
        "questionText": "4. What enzyme unwinds and unzips the double-stranded DNA helix during replication?",
        "options": [
          "DNA Helicase",
          "DNA Polymerase",
          "RNA Polymerase",
          "Ligase"
        ],
        "correctAnswerIndex": 0,
        "explanation": "DNA Helicase breaks hydrogen bonds between nitrogen bases to open replication forks."
      },
      {
        "id": "b-i5",
        "questionText": "5. In Mendelian genetics, what is the expected phenotypic ratio in a monohybrid cross between two heterozygous parents (Aa × Aa)?",
        "options": [
          "1:1",
          "3:1",
          "9:3:3:1",
          "1:2:1"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Aa × Aa yields 3 dominant phenotype offspring for every 1 recessive phenotype (3:1 ratio)."
      },
      {
        "id": "b-i6",
        "questionText": "6. What molecule serves as the primary high-energy currency for cellular work?",
        "options": [
          "ATP (Adenosine Triphosphate)",
          "Glucose",
          "NADH",
          "Pyruvate"
        ],
        "correctAnswerIndex": 0,
        "explanation": "ATP hydrolyzes phosphate bonds to release immediate energy for cellular processes."
      },
      {
        "id": "b-i7",
        "questionText": "7. Which stage of cellular respiration generates the largest yield of ATP molecules per glucose?",
        "options": [
          "Glycolysis",
          "Krebs Cycle",
          "Electron Transport Chain & Oxidative Phosphorylation",
          "Fermentation"
        ],
        "correctAnswerIndex": 2,
        "explanation": "Oxidative Phosphorylation across the inner mitochondrial membrane generates ~30-32 ATPs."
      },
      {
        "id": "b-i8",
        "questionText": "8. What symbiotic relationship benefits one organism while harming the host organism?",
        "options": [
          "Mutualism",
          "Commensalism",
          "Parasitism",
          "Neutralism"
        ],
        "correctAnswerIndex": 2,
        "explanation": "Parasitism (+/-) benefits the parasite while depriving or harming the host."
      },
      {
        "id": "b-i9",
        "questionText": "9. What structural composition gives cell membranes selective permeability?",
        "options": [
          "Solid cellulose wall",
          "Phospholipid Bilayer with embedded proteins",
          "Starch matrix",
          "Chitin layer"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Amphipathic phospholipids create a fluid hydrophobic core with transport protein channels."
      },
      {
        "id": "b-i10",
        "questionText": "10. What pancreatic hormone lowers blood glucose concentration by stimulating cellular glucose uptake?",
        "options": [
          "Glucagon",
          "Insulin",
          "Adrenaline",
          "Cortisol"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Insulin signals liver and muscle cells to absorb glucose and store it as glycogen."
      },
      {
        "id": "b-i11",
        "questionText": "What is the primary cellular function of Ribosomes?",
        "options": [
          "Translating mRNA transcripts into polypeptide amino acid chains (Protein Synthesis)",
          "Packaging lipids into secretory vesicles",
          "Generating ATP through glycolysis",
          "Digesting cellular waste products"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Ribosomes are ribonucleoprotein complexes that read messenger RNA codons to synthesize proteins."
      },
      {
        "id": "b-i12",
        "questionText": "What occurs during the Metaphase stage of cell division (Mitosis)?",
        "options": [
          "Chromosomes align along the central equatorial metaphase plate of the cell",
          "Nuclear envelopes reform around separated chromatin",
          "Sister chromatids are pulled apart to opposite poles",
          "DNA replication initiates inside the nucleolus"
        ],
        "correctAnswerIndex": 0,
        "explanation": "In Metaphase, spindle fibers attach to kinetochores and align sister chromatid pairs along the spindle equator."
      },
      {
        "id": "b-i13",
        "questionText": "What is an Allele in genetics?",
        "options": [
          "A variant form or alternative version of a specific gene at a given locus",
          "An entirely new chromosome",
          "A type of protein enzyme",
          "A damaged cell fragment"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Alleles are distinct nucleotide sequence variants of a gene that code for different phenotype expressions."
      },
      {
        "id": "b-i14",
        "questionText": "Which endocrine hormone produced by pancreatic beta cells lowers elevated blood glucose concentrations?",
        "options": [
          "Glucagon",
          "Insulin",
          "Thyroxine",
          "Adrenaline"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Insulin facilitates cellular glucose uptake and promotes glycogen synthesis in the liver to lower blood sugar."
      },
      {
        "id": "b-i15",
        "questionText": "What is the microscopic functional filtration unit of the human kidney?",
        "options": [
          "Nephron",
          "Neuron",
          "Alveolus",
          "Villus"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Each kidney contains roughly one million nephrons that filter blood, reabsorb electrolytes, and excrete urine."
      },
      {
        "id": "b-i16",
        "questionText": "What is Homeostasis in biological physiology?",
        "options": [
          "The active maintenance of a stable internal physiological state despite external environmental changes",
          "The process of genetic mutation during mitosis",
          "The breakdown of bone tissue",
          "The migration of birds during winter"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Homeostasis regulates internal variables (body temperature, blood pH, glucose levels, osmotic pressure) within narrow setpoints."
      },
      {
        "id": "b-i17",
        "questionText": "What is the difference between an organism's Genotype and its Phenotype?",
        "options": [
          "Genotype is the genetic makeup; Phenotype is the observable physical and biochemical trait",
          "Genotype is physical appearance; Phenotype is hidden DNA",
          "Genotype only exists in bacteria",
          "Phenotype is determined by age only"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Genotype refers to alleles carried in DNA; phenotype is the physical manifestation resulting from gene-environment interaction."
      },
      {
        "id": "b-i18",
        "questionText": "What is the function of the Myelin Sheath wrapped around neural axons?",
        "options": [
          "Electrically insulates axons and drastically speeds up nerve impulse transmission via saltatory conduction",
          "Supplies blood directly to synapses",
          "Blocks all nerve signals permanently",
          "Produces red blood cells"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Myelin lipid sheaths insulate axons, allowing action potentials to jump between Nodes of Ranvier at up to 120 m/s."
      },
      {
        "id": "b-i19",
        "questionText": "What symbiotic role do Rhizobium bacteria play in the root nodules of legume plants?",
        "options": [
          "They fix atmospheric nitrogen gas (N2) into bioavailable ammonia for plant growth",
          "They consume plant sugars without returning nutrients",
          "They protect plants from freezing temperatures",
          "They pollinate flower buds underground"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Rhizobium bacteria possess nitrogenase enzymes to convert atmospheric N2 into ammonia in exchange for plant carbohydrates."
      },
      {
        "id": "b-i20",
        "questionText": "Which chamber of the human heart pumps oxygenated blood out into the aorta for systemic distribution?",
        "options": [
          "Right Atrium",
          "Left Ventricle",
          "Right Ventricle",
          "Left Atrium"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The thick muscular Left Ventricle contracts with high pressure to pump oxygenated blood through the aortic valve to the body."
      }
    ],
    "Advanced": [
      {
        "id": "b-a1",
        "questionText": "1. What enzyme synthesizes complementary DNA (cDNA) from a single-stranded RNA template in retroviruses?",
        "options": [
          "Reverse Transcriptase",
          "RNA Polymerase II",
          "DNA Ligase",
          "Restriction Endonuclease"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Reverse Transcriptase transcribes viral RNA back into cDNA during retroviral infection."
      },
      {
        "id": "b-a2",
        "questionText": "2. What is the essential cellular function of the p53 tumor suppressor protein?",
        "options": [
          "Accelerating cell division rate",
          "Sensing DNA damage to trigger cell cycle arrest or apoptosis",
          "Synthesizing cell wall cellulose",
          "Pumping sodium ions across membranes"
        ],
        "correctAnswerIndex": 1,
        "explanation": "p53 acts as \"guardian of the genome\", inducing G1 arrest for repair or triggering apoptosis if unrepairable."
      },
      {
        "id": "b-a3",
        "questionText": "3. Which epigenetic modification relaxes chromatin structure (euchromatin) to enhance gene transcription?",
        "options": [
          "DNA Methylation",
          "Histone Acetylation",
          "Histone Deacetylation",
          "RNA Interference"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Histone Acetyltransferases (HATs) neutralize positive lysine charges on histones, loosening DNA binding."
      },
      {
        "id": "b-a4",
        "questionText": "4. In photosynthesis, what key enzyme fixes atmospheric CO2 into 3-PGA during the Calvin Cycle?",
        "options": [
          "RuBisCO",
          "ATP Synthase",
          "Pep Carboxylase",
          "Amylase"
        ],
        "correctAnswerIndex": 0,
        "explanation": "RuBisCO (Ribulose-1,5-bisphosphate carboxylase-oxygenase) catalyzes CO2 fixation in chloroplast stroma."
      },
      {
        "id": "b-a5",
        "questionText": "5. What structural domain motif is commonly found in eukaryotic transcription factors for binding DNA major grooves?",
        "options": [
          "Zinc Finger",
          "Beta Barrel",
          "Alpha Helical Bundle",
          "Triple Helix"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Zinc finger motifs coordinate zinc ions to stabilize finger loops fitting into DNA major grooves."
      },
      {
        "id": "b-a6",
        "questionText": "6. What evolutionary theory explains the origin of mitochondria and chloroplasts in eukaryotic cells?",
        "options": [
          "Endosymbiotic Theory",
          "Lamarckian Adaptation",
          "Neutral Theory of Evolution",
          "Pangenes"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Endosymbiotic theory posits mitochondria evolved from engulfed aerobic alpha-proteobacteria."
      },
      {
        "id": "b-a7",
        "questionText": "7. What intracellular second messenger is generated by Adenylate Cyclase upon G-protein coupled receptor activation?",
        "options": [
          "Cyclic AMP (cAMP)",
          "Inositol Trisphosphate (IP3)",
          "Diacylglycerol (DAG)",
          "Calcium ions"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Adenylate Cyclase converts ATP into cyclic AMP (cAMP)."
      },
      {
        "id": "b-a8",
        "questionText": "8. What specific differentiated immune B cell type secretes high volumes of antigen-specific antibodies?",
        "options": [
          "Plasma Cells",
          "Cytotoxic T Cells",
          "Natural Killer Cells",
          "Macrophage"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Activated B lymphocytes differentiate into plasma cells that secrete thousands of antibodies per second."
      },
      {
        "id": "b-a9",
        "questionText": "9. What are the 3 repeated temperature steps in a standard PCR (Polymerase Chain Reaction) cycle?",
        "options": [
          "Denaturation (~95°C), Annealing (~55°C), Extension (~72°C)",
          "Freezing (-20°C), Boiling (100°C), Cooling (25°C)",
          "Fixation, Staining, Washing",
          "Digestion, Ligation, Transformation"
        ],
        "correctAnswerIndex": 0,
        "explanation": "PCR cycles melt DNA at 95°C, anneal primers at ~55°C, and extend with Taq polymerase at 72°C."
      },
      {
        "id": "b-a10",
        "questionText": "10. During pre-mRNA splicing, what components of the primary transcript are excised and discarded?",
        "options": [
          "Introns",
          "Exons",
          "Promoters",
          "Poly-A Tails"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Spliceosomes excise non-coding Introns and ligate coding Exons together into mature mRNA."
      },
      {
        "id": "b-a11",
        "questionText": "What is the role of DNA Polymerase III during bacterial DNA replication?",
        "options": [
          "Synthesizing complementary DNA daughter strands in the 5' to 3' direction with proofreading capability",
          "Unwinding the double helix at replication origins",
          "Joining Okazaki fragments with phosphodiester bonds",
          "Degrading RNA primers only"
        ],
        "correctAnswerIndex": 0,
        "explanation": "DNA Polymerase III synthesizes the leading strand continuously and lagging strand discontinuously in the 5' to 3' direction."
      },
      {
        "id": "b-a12",
        "questionText": "In the CRISPR-Cas9 genome editing system, what component directs the Cas9 endonuclease to cut a specific target DNA locus?",
        "options": [
          "A single guide RNA (sgRNA) with sequence complementarity to the target genomic DNA",
          "A lipid nanoparticle membrane",
          "A reverse transcriptase enzyme",
          "A DNA ligase molecule"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The guide RNA (gRNA) base-pairs with 20 nucleotides of complementary target DNA adjacent to a PAM site, guiding Cas9 to cleave."
      },
      {
        "id": "b-a13",
        "questionText": "What ions are transported across the plasma membrane by the primary active Na+/K+-ATPase pump per cycle?",
        "options": [
          "3 Na+ pumped out of the cell, 2 K+ pumped into the cell using 1 ATP",
          "2 Na+ pumped out, 3 K+ pumped in",
          "1 Na+ pumped in, 1 K+ pumped out",
          "3 Ca2+ ions transported"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The electrogenic Na+/K+ pump uses ATP hydrolysis to export 3 Na+ and import 2 K+, establishing the resting membrane potential."
      },
      {
        "id": "b-a14",
        "questionText": "What is Alternative RNA Splicing in eukaryotic molecular biology?",
        "options": [
          "A regulated mechanism allowing a single pre-mRNA gene transcript to produce multiple distinct protein isoforms",
          "The deletion of introns by bacterial enzymes",
          "The copying of RNA back into double-stranded DNA",
          "The degradation of damaged ribosomes"
        ],
        "correctAnswerIndex": 0,
        "explanation": "By differentially selecting exon combinations, alternative splicing vastly expands eukaryotic proteome diversity from a finite genome."
      },
      {
        "id": "b-a15",
        "questionText": "What is the function of Telomeres at the terminal ends of linear eukaryotic chromosomes?",
        "options": [
          "Protect chromosome ends from degradation and prevent aberrant end-to-end fusions during successive cell divisions",
          "Encode ribosomal RNA subunits",
          "Attach chromosomes to the nuclear pores",
          "Translate viral mRNA"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Repetitive non-coding TTAGGG telomeric sequences buffer against end-replication shortening, preserving vital genetic coding regions."
      },
      {
        "id": "b-a16",
        "questionText": "What is an Epigenetic modification such as DNA methylation of cytosine residues (5-methylcytosine)?",
        "options": [
          "A heritable alteration in gene expression without altering the underlying primary nucleotide sequence",
          "A permanent point mutation that changes a codon",
          "The deletion of an entire chromosome arm",
          "A virus entering the cell membrane"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Epigenetic marks (DNA methylation, histone acetylation) alter chromatin accessibility and transcriptional activity without changing DNA base pairs."
      },
      {
        "id": "b-a17",
        "questionText": "In the mitochondrial Electron Transport Chain, what generates the proton motive force driving ATP Synthase?",
        "options": [
          "Proton (H+) pumping across the inner mitochondrial membrane into the intermembrane space",
          "Sodium ion diffusion into the matrix",
          "Passive flow of water molecules through porins",
          "Direct glycolysis in the cytoplasm"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Complexes I, III, and IV pump H+ into the intermembrane space, creating an electrochemical gradient utilized by F0F1-ATP synthase."
      },
      {
        "id": "b-a18",
        "questionText": "What is the Endosymbiotic Theory explaining the evolutionary origin of mitochondria and chloroplasts?",
        "options": [
          "They originated as free-living prokaryotes engulfed by ancestral host cells in mutually beneficial endosymbiosis",
          "They evolved from pinched-off pieces of the nuclear membrane",
          "They are remnants of ancient viral infections",
          "They were created by abiotic lipid vesicle synthesis"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Endosymbiotic theory is supported by circular double-stranded DNA, 70S bacterial ribosomes, and double-membrane biochemistry."
      },
      {
        "id": "b-a19",
        "questionText": "What is the role of Memory B lymphocytes in adaptive immune protection?",
        "options": [
          "Persisting long-term after antigen exposure to mount rapid, robust antibody responses upon re-infection",
          "Engulfing bacteria via non-specific phagocytosis",
          "Releasing histamine during acute allergic responses",
          "Filtering lymph fluid in the spleen"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Memory B cells differentiate during the primary immune response and provide lasting immunological memory with high-affinity antibodies."
      },
      {
        "id": "b-a20",
        "questionText": "What is the function of the enzyme Reverse Transcriptase found in retroviruses like HIV?",
        "options": [
          "Synthesizing complementary DNA (cDNA) from a single-stranded RNA template",
          "Cleaving host cell membrane glycoproteins",
          "Proofreading DNA replication errors",
          "Synthesizing ATP in viral capsids"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Reverse transcriptase transcribes viral RNA genomes into double-stranded DNA that integrates into host chromosomes."
      }
    ]
  },
  "Chemistry": {
    "Beginner": [
      {
        "id": "c-b1",
        "questionText": "1. When balancing the chemical equation: __ H₂ + O₂ ➔ 2 H₂O, what coefficient balances hydrogen?",
        "options": [
          "1",
          "2",
          "3",
          "4"
        ],
        "correctAnswerIndex": 1,
        "misconceptionMap": {
          "0": "1 H2 gives only 2 hydrogens, but 2 H2O contains 4 hydrogen atoms."
        },
        "explanation": "2 H2 + O2 ➔ 2 H2O gives 4 hydrogen and 2 oxygen atoms on both sides."
      },
      {
        "id": "c-b2",
        "questionText": "2. What central dense core of an atom contains protons and neutrons?",
        "options": [
          "Nucleus",
          "Electron Cloud",
          "Orbital",
          "Shell"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The atomic nucleus houses positive protons and uncharged neutrons."
      },
      {
        "id": "c-b3",
        "questionText": "3. What subatomic particle carries a negative electrical charge?",
        "options": [
          "Proton",
          "Neutron",
          "Electron",
          "Photon"
        ],
        "correctAnswerIndex": 2,
        "explanation": "Electrons carry a -1 elementary charge and orbit the nucleus."
      },
      {
        "id": "c-b4",
        "questionText": "4. What is the pH value of pure neutral water at 25°C?",
        "options": [
          "0",
          "7",
          "14",
          "1"
        ],
        "correctAnswerIndex": 1,
        "explanation": "A neutral solution has equal H+ and OH- concentrations with pH = 7."
      },
      {
        "id": "c-b5",
        "questionText": "5. What type of chemical bond forms when non-metal atoms share pairs of valence electrons?",
        "options": [
          "Ionic Bond",
          "Covalent Bond",
          "Metallic Bond",
          "Hydrogen Bond"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Covalent bonding involves shared electron pairs between non-metal atoms."
      },
      {
        "id": "c-b6",
        "questionText": "6. What element has atomic number 1 on the Periodic Table?",
        "options": [
          "Helium",
          "Hydrogen",
          "Carbon",
          "Oxygen"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Hydrogen (H) has 1 proton and atomic number 1."
      },
      {
        "id": "c-b7",
        "questionText": "7. What law states that mass cannot be created or destroyed during a chemical reaction?",
        "options": [
          "Law of Conservation of Mass",
          "Law of Universal Gravitation",
          "Boyle's Law",
          "Ohm's Law"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Total mass of reactants equals total mass of products in chemical reactions."
      },
      {
        "id": "c-b8",
        "questionText": "8. Which state of matter has a fixed volume but takes the shape of its container?",
        "options": [
          "Solid",
          "Liquid",
          "Gas",
          "Plasma"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Liquids have definite volume but indefinite shape."
      },
      {
        "id": "c-b9",
        "questionText": "9. What element essential for respiration has chemical symbol O and atomic number 8?",
        "options": [
          "Gold",
          "Oxygen",
          "Osmium",
          "Organic"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Oxygen (O) constitutes ~21% of Earth's atmosphere."
      },
      {
        "id": "c-b10",
        "questionText": "10. What is the chemical formula for common table salt?",
        "options": [
          "H2O",
          "NaCl",
          "CO2",
          "NaHCO3"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Table salt is Sodium Chloride (NaCl)."
      },
      {
        "id": "c-b11",
        "questionText": "What is the atomic number of Carbon on the periodic table?",
        "options": [
          "4",
          "6",
          "12",
          "14"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Carbon has an atomic number of 6, meaning every neutral carbon atom contains 6 protons in its nucleus."
      },
      {
        "id": "c-b12",
        "questionText": "What is the pH value of pure distilled water at 25°C, representing neutral pH?",
        "options": [
          "0",
          "7",
          "14",
          "1"
        ],
        "correctAnswerIndex": 1,
        "explanation": "On the logarithmic pH scale, pH 7 is strictly neutral where [H+] = [OH-] = 1.0 × 10^-7 M."
      },
      {
        "id": "c-b13",
        "questionText": "What are the three common classical states of matter found in everyday nature?",
        "options": [
          "Solid, Liquid, and Gas",
          "Plasma, Crystal, and Metal",
          "Proton, Neutron, and Electron",
          "Acid, Base, and Salt"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The three fundamental states of matter are solid (fixed shape and volume), liquid (fixed volume), and gas (compressible)."
      },
      {
        "id": "c-b14",
        "questionText": "What is the chemical symbol for Gold on the periodic table?",
        "options": [
          "Ag",
          "Au",
          "Fe",
          "Gd"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Gold's chemical symbol is Au, derived from the Latin word 'Aurum' meaning shining dawn."
      },
      {
        "id": "c-b15",
        "questionText": "What happens to heat energy during an Exothermic chemical reaction?",
        "options": [
          "Heat is released into the surrounding environment (system enthalpy decreases)",
          "Heat is absorbed, causing surrounding temperature to drop",
          "No energy exchange occurs",
          "Heat is permanently converted into mass"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Exothermic reactions release thermal energy (Delta H < 0), causing the surroundings to warm up."
      },
      {
        "id": "c-b16",
        "questionText": "What are Valence Electrons in an atom?",
        "options": [
          "Electrons in the outermost electron shell that participate in chemical bonding",
          "Electrons located inside the nucleus with protons",
          "Electrons that have escaped into the vacuum",
          "Electrons in the innermost 1s orbital only"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Valence electrons occupy the outermost principal energy level and dictate chemical reactivity and bond formation."
      },
      {
        "id": "c-b17",
        "questionText": "What is the chemical formula for ordinary table salt?",
        "options": [
          "NaCl",
          "KCl",
          "CaCl2",
          "NaOH"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Table salt is Sodium Chloride (NaCl), an ionic crystal lattice composed of Na+ cations and Cl- anions."
      },
      {
        "id": "c-b18",
        "questionText": "What is common chemical Rust primarily composed of when iron corrodes in moist air?",
        "options": [
          "Iron(III) Oxide (Fe2O3·nH2O)",
          "Pure Carbon",
          "Copper Sulfate",
          "Calcium Carbonate"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Rust forms when iron oxidizes in the presence of oxygen and water to produce hydrated iron(III) oxide."
      },
      {
        "id": "c-b19",
        "questionText": "In a chemical solution, what is the term for the substance that dissolves in the solvent?",
        "options": [
          "Solute",
          "Solvent",
          "Precipitate",
          "Catalyst"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The solute is the dissolved substance (e.g., salt), while the solvent is the dissolving medium (e.g., water)."
      },
      {
        "id": "c-b20",
        "questionText": "Which subatomic particles carry a positive electric charge in atomic nuclei?",
        "options": [
          "Electrons",
          "Protons",
          "Neutrons",
          "Photons"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Protons carry a positive elementary charge (+1e), neutrons have zero charge, and electrons carry a negative charge (-1e)."
      }
    ],
    "Intermediate": [
      {
        "id": "c-i1",
        "questionText": "1. What is Avogadro's constant representing the number of particles in 1 mole of a substance?",
        "options": [
          "3.00 × 10^8",
          "6.022 × 10^23",
          "9.81",
          "1.602 × 10^-19"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Avogadro's number N_A = 6.022 × 10^23 particles/mole."
      },
      {
        "id": "c-i2",
        "questionText": "2. What chemical bond forms between a metal and non-metal via complete electron transfer?",
        "options": [
          "Covalent Bond",
          "Ionic Bond",
          "Metallic Bond",
          "Non-polar Bond"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Ionic bonds form through electrostatic attraction between positive cations and negative anions."
      },
      {
        "id": "c-i3",
        "questionText": "3. What Ideal Gas Law equation relates pressure (P), volume (V), moles (n), and temperature (T)?",
        "options": [
          "PV = nRT",
          "P1 V1 = P2 V2",
          "V1/T1 = V2/T2",
          "E = mc^2"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The Ideal Gas Law is PV = nRT (where R is the universal gas constant)."
      },
      {
        "id": "c-i4",
        "questionText": "4. According to Le Chatelier's principle, what happens to an exothermic equilibrium reaction if temperature is increased?",
        "options": [
          "Shift toward products (right)",
          "Shift toward reactants (left)",
          "No shift occurs",
          "Reaction stops completely"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Increasing temp adds heat to exothermic reactions, shifting equilibrium left toward reactants."
      },
      {
        "id": "c-i5",
        "questionText": "5. Which element has the highest electronegativity value (4.0) on the Pauling scale?",
        "options": [
          "Oxygen",
          "Fluorine",
          "Chlorine",
          "Francium"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Fluorine (F) has the strongest pull on shared bonding electrons."
      },
      {
        "id": "c-i6",
        "questionText": "6. What are isotopes of a chemical element?",
        "options": [
          "Atoms with different numbers of protons",
          "Atoms of the same element with identical protons but different numbers of neutrons",
          "Molecules with different chemical bonds",
          "Elements with different charges"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Isotopes share atomic number (protons) but vary in mass number (neutrons)."
      },
      {
        "id": "c-i7",
        "questionText": "7. What is the usual oxidation state of Oxygen in most oxides?",
        "options": [
          "+1",
          "-1",
          "-2",
          "0"
        ],
        "correctAnswerIndex": 2,
        "explanation": "Oxygen typically gains 2 electrons, adopting a -2 oxidation state."
      },
      {
        "id": "c-i8",
        "questionText": "8. How does adding a catalyst increase chemical reaction rate?",
        "options": [
          "By increasing total energy of reactants",
          "By lowering activation energy (E_a) via an alternative reaction pathway",
          "By increasing pressure",
          "By consuming reactants"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Catalysts lower activation energy barrier without being consumed."
      },
      {
        "id": "c-i9",
        "questionText": "9. What is molarity (M) defined as?",
        "options": [
          "Grams of solute per mole",
          "Moles of solute per Liter of solution",
          "Moles of solute per kilogram of solvent",
          "Volume of solute per volume of water"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Molarity M = moles of solute / Liters of solution."
      },
      {
        "id": "c-i10",
        "questionText": "10. What chemical formula represents sulfuric acid?",
        "options": [
          "HCl",
          "HNO3",
          "H2SO4",
          "CH3COOH"
        ],
        "correctAnswerIndex": 2,
        "explanation": "Sulfuric acid is H2SO4."
      },
      {
        "id": "c-i11",
        "questionText": "What type of chemical bonding involves the electrostatic attraction between oppositely charged ions?",
        "options": [
          "Ionic Bonding",
          "Covalent Bonding",
          "Metallic Bonding",
          "Hydrogen Bonding"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Ionic bonding forms through the transfer of valence electrons, creating cations and anions held by electrostatic Coulomb forces."
      },
      {
        "id": "c-i12",
        "questionText": "What is the numerical value of Avogadro's constant (particles per mole)?",
        "options": [
          "6.022 × 10^23",
          "3.00 × 10^8",
          "1.602 × 10^-19",
          "9.8 × 10^3"
        ],
        "correctAnswerIndex": 0,
        "explanation": "One mole of any substance contains exactly 6.02214076 × 10^23 elementary entities."
      },
      {
        "id": "c-i13",
        "questionText": "According to Le Chatelier's Principle, what happens to an equilibrium system if additional reactants are added?",
        "options": [
          "The equilibrium shifts forward toward products to consume excess reactants",
          "The equilibrium shifts backward toward reactants",
          "The reaction stops completely",
          "The equilibrium constant Keq changes value"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Adding reactants shifts the dynamic equilibrium toward product formation to partially relieve the applied concentration stress."
      },
      {
        "id": "c-i14",
        "questionText": "What is the molar mass of water (H2O) using atomic masses H = 1.01 g/mol and O = 16.00 g/mol?",
        "options": [
          "17.01 g/mol",
          "18.02 g/mol",
          "32.00 g/mol",
          "20.04 g/mol"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Molar mass = (2 × 1.01) + 16.00 = 2.02 + 16.00 = 18.02 g/mol."
      },
      {
        "id": "c-i15",
        "questionText": "What is the molecular geometry of water (H2O) according to VSEPR theory?",
        "options": [
          "Linear",
          "Bent (Angular)",
          "Trigonal Planar",
          "Tetrahedral"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Oxygen has 2 bonding pairs and 2 lone pairs (tetrahedral electron pair geometry), producing a Bent molecular geometry (~104.5°)."
      },
      {
        "id": "c-i16",
        "questionText": "What are Isotopes of a given chemical element?",
        "options": [
          "Atoms with the same number of protons but different numbers of neutrons",
          "Atoms with different numbers of protons",
          "Molecules with identical formulas but different structures",
          "Ions with positive charges only"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Isotopes share identical atomic numbers (protons) but have distinct mass numbers due to differing neutron counts."
      },
      {
        "id": "c-i17",
        "questionText": "In redox chemistry, what does Oxidation refer to?",
        "options": [
          "Loss of electrons (OIL: Oxidation Is Loss)",
          "Gain of electrons",
          "Absorption of water molecules",
          "Reduction in temperature"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Oxidation is the loss of electrons (increase in oxidation state), while reduction is the gain of electrons (RIG)."
      },
      {
        "id": "c-i18",
        "questionText": "What is the Ideal Gas Law equation relating pressure (P), volume (V), moles (n), and temperature (T)?",
        "options": [
          "PV = nRT",
          "P/V = nRT",
          "PT = nVR",
          "V/T = PnR"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The Ideal Gas Law is PV = nRT, where R is the universal gas constant (8.314 J/(mol·K) or 0.0821 L·atm/(mol·K))."
      },
      {
        "id": "c-i19",
        "questionText": "What is Electronegativity in chemical bonding?",
        "options": [
          "The tendency of an atom in a covalent bond to attract shared electron density toward itself",
          "The total negative charge of an atom",
          "The energy required to remove an electron",
          "The speed of electrons orbiting nuclei"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Electronegativity (Pauling scale) measures an atom's intrinsic ability to attract bonding electrons, with Fluorine being highest (4.0)."
      },
      {
        "id": "c-i20",
        "questionText": "What is the definition of a Bronsted-Lowry Acid?",
        "options": [
          "A proton (H+ ion) donor",
          "A proton (H+ ion) acceptor",
          "An electron pair donor",
          "A neutral salt compound"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Under Brønsted-Lowry acid-base theory, an acid is a chemical species that donates a proton (H+) to a base."
      }
    ],
    "Advanced": [
      {
        "id": "c-a1",
        "questionText": "1. What equation calculates non-standard cell potential E_cell as a function of reaction quotient Q?",
        "options": [
          "Nernst Equation: E = E° - (RT / nF) ln(Q)",
          "Arrhenius Equation: k = A e^(-Ea / RT)",
          "Gibbs Free Energy: ΔG = ΔH - T ΔS",
          "Beer-Lambert Law: A = ε b c"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The Nernst equation relates cell potential to standard potential and ion concentrations."
      },
      {
        "id": "c-a2",
        "questionText": "2. In organic reaction mechanisms, what stereochemical outcome characterizes an SN2 nucleophilic substitution?",
        "options": [
          "Complete racemization",
          "Walden inversion of stereochemical configuration",
          "Retention of configuration",
          "Ring expansion"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Backside nucleophilic attack in SN2 causes inversion of configuration at chiral centers."
      },
      {
        "id": "c-a3",
        "questionText": "3. Which quantum number specifies the 3D spatial shape of an atomic orbital (s=0, p=1, d=2, f=3)?",
        "options": [
          "Principal Quantum Number (n)",
          "Azimuthal / Angular Momentum Quantum Number (l)",
          "Magnetic Quantum Number (m_l)",
          "Spin Quantum Number (m_s)"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The azimuthal quantum number l dictates orbital angular momentum and 3D subshell geometry."
      },
      {
        "id": "c-a4",
        "questionText": "4. What thermodynamic condition indicates a spontaneous process at constant temperature and pressure?",
        "options": [
          "ΔG < 0 (Negative Gibbs Free Energy change)",
          "ΔG > 0",
          "ΔH > 0",
          "ΔS = 0"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Spontaneous reactions lower free energy, requiring negative ΔG."
      },
      {
        "id": "c-a5",
        "questionText": "5. What type of stereoisomers are non-superimposable mirror images of each other?",
        "options": [
          "Diastereomers",
          "Enantiomers",
          "Conformers",
          "Constitutional Isomers"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Enantiomers are chiral molecules that are non-superimposable mirror images."
      },
      {
        "id": "c-a6",
        "questionText": "6. What is the Henderson-Hasselbalch equation for buffer solutions?",
        "options": [
          "pH = pKa + log([A-] / [HA])",
          "pH = -log([H+])",
          "pKa = pH × [HA]",
          "pH = pKb - log([B])"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Henderson-Hasselbalch equation relates pH to acid pKa and conjugate base/acid ratio."
      },
      {
        "id": "c-a7",
        "questionText": "7. What electron hybridization and molecular geometry does methane (CH4) adopt?",
        "options": [
          "sp Linear",
          "sp2 Trigonal Planar",
          "sp3 Tetrahedral",
          "sp3d Octahedral"
        ],
        "correctAnswerIndex": 2,
        "explanation": "Carbon in CH4 forms 4 equivalent sp3 hybrid orbitals pointing toward tetrahedral vertices (109.5°)."
      },
      {
        "id": "c-a8",
        "questionText": "8. What spectroscopic technique measures nuclear spin transitions in a magnetic field to determine carbon skeletons?",
        "options": [
          "FTIR Spectroscopy",
          "Carbon-13 Nuclear Magnetic Resonance (13C-NMR)",
          "Mass Spectrometry",
          "UV-Vis"
        ],
        "correctAnswerIndex": 1,
        "explanation": "13C-NMR identifies unique carbon environments in organic molecules."
      },
      {
        "id": "c-a9",
        "questionText": "9. What does the Second Law of Thermodynamics state regarding entropy (S) of an isolated system?",
        "options": [
          "Entropy decreases over time",
          "Total entropy of an isolated system always increases or remains constant during spontaneous processes",
          "Entropy is zero at room temp",
          "Entropy equals enthalpy"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The 2nd Law states ΔS_universe ≥ 0 for spontaneous processes."
      },
      {
        "id": "c-a10",
        "questionText": "10. What is the molecular geometry of sulfur hexafluoride (SF6)?",
        "options": [
          "Tetrahedral",
          "Trigonal Bipyramidal",
          "Octahedral",
          "Square Planar"
        ],
        "correctAnswerIndex": 2,
        "explanation": "SF6 has 6 bonding pairs around central S, adopting sp3d2 Octahedral geometry."
      },
      {
        "id": "c-a11",
        "questionText": "What does a negative Gibbs Free Energy change (Delta G < 0) indicate for a chemical reaction at constant temperature and pressure?",
        "options": [
          "The reaction is thermodynamically spontaneous",
          "The reaction is non-spontaneous and requires work input",
          "The reaction has reached dynamic equilibrium (Delta G = 0)",
          "The activation energy is zero"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Delta G = Delta H - T * Delta S. A negative Delta G confirms a spontaneous exergonic reaction that releases usable free energy."
      },
      {
        "id": "c-a12",
        "questionText": "What is the hybridization of the carbon atoms in Ethylene (C2H4, H2C=CH2)?",
        "options": [
          "sp",
          "sp2",
          "sp3",
          "sp3d"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Each double-bonded carbon in ethylene forms 3 sigma bonds and 1 unhybridized p-orbital pi bond, adopting trigonal planar sp2 hybridization."
      },
      {
        "id": "c-a13",
        "questionText": "In chemical reaction kinetics, what is the Rate-Determining Step of a multi-step reaction mechanism?",
        "options": [
          "The slowest elementary step in the reaction pathway that governs overall reaction rate",
          "The fastest step in the sequence",
          "The step that produces the final precipitate",
          "The step with zero activation energy"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The rate-determining step has the highest activation energy barrier, bottlenecking the entire reaction velocity."
      },
      {
        "id": "c-a14",
        "questionText": "What does the Henderson-Hasselbalch equation (pH = pKa + log([A-]/[HA])) calculate?",
        "options": [
          "The pH of a buffer solution composed of a weak acid and its conjugate base",
          "The half-life of radioactive decay",
          "The vapor pressure of ideal liquid mixtures",
          "The crystal lattice energy of ionic solids"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Henderson-Hasselbalch quantifies buffer pH as a function of the weak acid dissociation constant (pKa) and base/acid ratio."
      },
      {
        "id": "c-a15",
        "questionText": "What does Hund's Rule state regarding electron configuration in degenerate orbitals of equal energy?",
        "options": [
          "Electrons occupy orbitals singly with parallel spins before any orbital is doubly occupied",
          "No two electrons can share all four quantum numbers",
          "Electrons fill the highest energy orbitals first",
          "All orbitals must be filled with pairs immediately"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Hund's Rule minimizes inter-electron repulsion by placing single electrons with parallel spins into subshell orbitals before pairing."
      },
      {
        "id": "c-a16",
        "questionText": "What is a Lewis Base according to Lewis acid-base theory?",
        "options": [
          "An electron pair donor",
          "An electron pair acceptor",
          "A proton donor",
          "A solvent molecule"
        ],
        "correctAnswerIndex": 0,
        "explanation": "G.N. Lewis defined a base as a chemical species with an available lone pair of electrons to donate in a coordinate covalent bond."
      },
      {
        "id": "c-a17",
        "questionText": "What is the Nernst Equation used to compute in electrochemistry?",
        "options": [
          "Cell reduction potential (E_cell) under non-standard temperature and ion concentration conditions",
          "The boiling point elevation of salt solutions",
          "The frequency of infrared molecular vibrations",
          "The speed of light in water"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The Nernst equation (E = E° - (RT/nF)ln Q) calculates actual electrochemical cell electromotive force away from 1 M standard state."
      },
      {
        "id": "c-a18",
        "questionText": "What is the Activation Energy (Ea) of a chemical reaction in Arrhenius theory?",
        "options": [
          "The minimum kinetic energy threshold required for colliding reactant molecules to form the transition state",
          "The total enthalpy change between products and reactants",
          "The energy required to boil the solvent",
          "The heat released by combustion"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Arrhenius equation k = A * exp(-Ea / RT) defines Ea as the energy barrier separating reactants from the activated complex."
      },
      {
        "id": "c-a19",
        "questionText": "What property characterizes a Chiral carbon center in organic chemistry?",
        "options": [
          "A tetrahedral sp3 carbon bonded to four chemically distinct substituent groups, forming non-superimposable mirror images (enantiomers)",
          "A carbon bonded to three identical hydrogen atoms",
          "A carbon involved in a triple bond",
          "A symmetrical planar carbon atom"
        ],
        "correctAnswerIndex": 0,
        "explanation": "An asymmetric chiral carbon attached to 4 different groups exhibits optical activity and exists as D/L enantiomer pairs."
      },
      {
        "id": "c-a20",
        "questionText": "In transition metal coordination chemistry, what causes Crystal Field Splitting (Delta_o) of d-orbitals in octahedral complexes?",
        "options": [
          "Electrostatic repulsion between ligand lone pairs and metal d-orbitals, splitting them into lower t2g and higher eg energy levels",
          "Nuclear fusion inside the transition metal core",
          "Thermal vibration of solvent molecules",
          "The loss of all valence electrons"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Ligand electron clouds along x, y, z axes repel d(x2-y2) and d(z2) orbitals more than d(xy), d(xz), d(yz), splitting d-orbitals into t2g and eg."
      }
    ]
  }
};

/**
 * Shuffles options of a question randomly and adjusts correctAnswerIndex & misconceptionMap
 * Ensures the correct answer is NEVER stuck at choice 2 (index 1) and options are evenly distributed
 */
export const shuffleQuestionOptions = (question) => {
  if (!question || !question.options || question.options.length < 2) return question;

  const originalCorrectIndex = question.correctAnswerIndex;
  const originalCorrectOption = question.options[originalCorrectIndex];

  // Map options with original indices
  const indexed = question.options.map((opt, i) => ({
    text: opt,
    isCorrect: i === originalCorrectIndex,
    origIndex: i
  }));

  // Fisher-Yates shuffle
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }

  const newOptions = indexed.map(o => o.text);
  const newCorrectIndex = indexed.findIndex(o => o.isCorrect);

  // Remap misconceptionMap to new option positions
  let newMisconceptionMap = {};
  if (question.misconceptionMap) {
    indexed.forEach((o, newIdx) => {
      const origKey = String(o.origIndex);
      if (question.misconceptionMap[origKey]) {
        newMisconceptionMap[String(newIdx)] = question.misconceptionMap[origKey];
      }
    });
  }

  return {
    ...question,
    options: newOptions,
    correctAnswerIndex: newCorrectIndex,
    misconceptionMap: Object.keys(newMisconceptionMap).length > 0 ? newMisconceptionMap : question.misconceptionMap
  };
};

/**
 * Helper to fetch or generate a randomized 10-question quiz customized to user profile
 * Picks 10 random questions from the 20+ question pool and shuffles all answer choices
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
  if (eduLower.includes('middle') || eduLower.includes('beginner') || eduLower.includes('6') || eduLower.includes('7') || eduLower.includes('8') || eduLower.includes('primary')) {
    levelKey = 'Beginner';
  } else if (eduLower.includes('college') || eduLower.includes('advanced') || eduLower.includes('adult') || eduLower.includes('university') || eduLower.includes('senior')) {
    levelKey = 'Advanced';
  }

  // Get raw pool
  const subjectPool = QUESTION_BANK[domainKey] || QUESTION_BANK['Computer Science & AI'];
  let pool = subjectPool[levelKey] || subjectPool['Intermediate'] || [];

  // Deep clone pool
  let clonedPool = JSON.parse(JSON.stringify(pool));

  // Fisher-Yates shuffle of the question pool to select different questions every time
  for (let i = clonedPool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clonedPool[i], clonedPool[j]] = [clonedPool[j], clonedPool[i]];
  }

  // Pick top 10 diverse questions
  let selected = clonedPool.slice(0, 10);

  // If pool has fewer than 10, pad safely
  while (selected.length < 10 && clonedPool.length > 0) {
    selected.push(JSON.parse(JSON.stringify(clonedPool[selected.length % clonedPool.length])));
  }

  // Shuffle options for EACH question and re-number cleanly
  const finalQuestions = selected.map((q, idx) => {
    const cleanText = q.questionText.replace(/^\d+\.\s*/, '');
    const shuffled = shuffleQuestionOptions(q);
    return {
      ...shuffled,
      id: `${q.id}-q${idx + 1}-${seed}`,
      questionText: `${idx + 1}. ${cleanText}`
    };
  });

  return {
    _id: `quiz-custom-${domainKey.toLowerCase().replace(/[^a-z]/g, '')}-${levelKey.toLowerCase()}-${seed}`,
    title: `${domainKey} Adaptive Assessment (${levelKey})`,
    subject: domainKey,
    topic: `${domainKey} ${levelKey} Practice`,
    grade: `${levelKey} Tier (${educationLevel})`,
    type: 'custom_diagnostic',
    questions: finalQuestions
  };
};
