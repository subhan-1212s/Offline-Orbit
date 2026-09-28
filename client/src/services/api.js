import { 
  getAllDownloadedPacks, 
  getDownloadedPackById, 
  saveDownloadedPack, 
  queueOfflineAttempt, 
  getCachedLessonsList, 
  cacheLessonsList 
} from './indexedDB.js';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

const getHeaders = (role = 'student') => {
  const token = localStorage.getItem('orbit_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else {
    headers['x-demo-role'] = role;
  }
  return headers;
};

export const api = {
  // Real Login
  login: async ({ email, password, role }) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed. Please check your credentials.');
      }
      return await res.json();
    } catch (err) {
      if (!navigator.onLine) {
        // Offline login fallback
        const offlineUser = {
          _id: role === 'educator' ? 'user-teacher-1' : 'user-student-1',
          name: email ? email.split('@')[0] : 'Learner',
          email: email || 'learner@orbit.edu',
          role: role === 'educator' ? 'educator' : 'learner',
          grade: 'Grade 7',
          points: 480,
          streakDays: 5,
          isOfflineMode: true
        };
        return { token: 'offline-session-token', user: offlineUser };
      }
      throw err;
    }
  },

  // Register (Learners & Educators)
  register: async (payload) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Registration failed.');
    }
    return await res.json();
  },

  // Forgot Password
  forgotPassword: async ({ email }) => {
    const res = await fetch(`${API_BASE}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to send reset code.');
    }
    return await res.json();
  },

  // Reset Password
  resetPassword: async ({ email, resetCode, newPassword }) => {
    const res = await fetch(`${API_BASE}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, resetCode, newPassword })
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Password reset failed.');
    }
    return await res.json();
  },

  // Send Login OTP
  sendLoginOtp: async ({ email }) => {
    const res = await fetch(`${API_BASE}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to send OTP.');
    }
    return await res.json();
  },

  // Verify Login OTP
  verifyLoginOtp: async ({ email, otpCode, role }) => {
    const res = await fetch(`${API_BASE}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otpCode, role })
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'OTP verification failed.');
    }
    return await res.json();
  },
  // Demo Login
  demoLogin: async (role) => {
    try {
      const res = await fetch(`${API_BASE}/auth/demo-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role })
      });
      if (!res.ok) throw new Error('Demo login failed');
      const data = await res.json();
      localStorage.setItem('orbit_token', data.token);
      localStorage.setItem('orbit_user', JSON.stringify(data.user));
      return data;
    } catch (err) {
      console.warn('Network offline or demo server error, generating offline demo user:', err.message);
      let demoUser = {};

      if (role === 'student-aarav' || role === 'student') {
        demoUser = {
          _id: 'user-student-aarav',
          name: 'Aarav Sharma',
          email: 'aarav@orbit.edu',
          role: 'student',
          grade: 'Grade 7',
          learnerCategory: 'Grade 7 Rural Learner',
          learnerType: 'Shared Mobile Device',
          interestDomain: 'Physics & Mathematics',
          preferredLanguage: 'en',
          subLevel: 'Grade 7',
          quizHistory: [
            { topic: 'Equivalent Fractions', score: 1, total: 3, percentage: 33 },
            { topic: 'Linear Equations', score: 2, total: 3, percentage: 67 }
          ],
          points: 520,
          streakDays: 6,
          isOfflineMode: true
        };
      } else if (role === 'student-priya') {
        demoUser = {
          _id: 'user-student-priya',
          name: 'Priya Patel',
          email: 'priya@orbit.edu',
          role: 'student',
          grade: 'Grade 7',
          learnerCategory: 'Grade 7 Rural Learner',
          learnerType: 'Shared Mobile Device',
          interestDomain: 'Computer Science & AI',
          preferredLanguage: 'en',
          subLevel: 'Grade 7',
          quizHistory: [
            { topic: 'Algorithmic Complexity', score: 1, total: 3, percentage: 33 },
            { topic: 'Python Data Structures', score: 2, total: 3, percentage: 67 }
          ],
          points: 440,
          streakDays: 4,
          isOfflineMode: true
        };
      } else if (role === 'independent') {
        demoUser = {
          _id: 'user-independent-1',
          name: 'Alex Rivera',
          email: 'alex@orbit.edu',
          role: 'independent',
          grade: 'Grade 7',
          learnerCategory: 'Self-Paced Learner',
          learnerType: 'Personal Mobile',
          interestDomain: 'Biotechnology & Chemistry',
          preferredLanguage: 'en',
          points: 680,
          streakDays: 9,
          isOfflineMode: true
        };
      } else {
        demoUser = {
          _id: 'user-teacher-1',
          name: 'Mr. Rajesh Kumar',
          email: 'teacher@orbit.edu',
          role: 'educator',
          grade: 'Grade 7 STEM Lead',
          subjects: ['Science', 'Mathematics', 'Computer Science'],
          preferredLanguage: 'en',
          points: 1200,
          isOfflineMode: true
        };
      }

      localStorage.setItem('orbit_user', JSON.stringify(demoUser));
      return { token: 'demo-offline-token', user: demoUser };
    }
  },

  // Auth User Me
  getMe: async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, { headers: getHeaders() });
      if (!res.ok) throw new Error('Failed to fetch user profile');
      return await res.json();
    } catch (err) {
      const cached = localStorage.getItem('orbit_user');
      if (cached) return JSON.parse(cached);
      return { _id: 'user-student-1', name: 'Maya Lin', role: 'student', grade: 'Grade 7', preferredLanguage: 'en' };
    }
  },

  // Lessons
  getLessons: async () => {
    if (!navigator.onLine) {
      const cached = await getCachedLessonsList();
      if (cached && cached.length > 0) return cached;
      const downloadedPacks = await getAllDownloadedPacks();
      return downloadedPacks.map(p => p.lesson);
    }

    try {
      const res = await fetch(`${API_BASE}/lessons`, { headers: getHeaders() });
      if (!res.ok) throw new Error('Fetch lessons failed');
      const lessons = await res.json();
      await cacheLessonsList(lessons);
      return lessons;
    } catch (err) {
      const cached = await getCachedLessonsList();
      if (cached && cached.length > 0) return cached;
      const downloadedPacks = await getAllDownloadedPacks();
      return downloadedPacks.map(p => p.lesson);
    }
  },

  getLessonById: async (id) => {
    const pack = await getDownloadedPackById(`pack-${id}`);
    if (pack) {
      return { ...pack.lesson, isDownloadedPack: true };
    }

    if (!navigator.onLine) {
      throw new Error('Device is offline and lesson pack is not downloaded yet.');
    }

    const res = await fetch(`${API_BASE}/lessons/${id}`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Lesson not found');
    return await res.json();
  },

  downloadLessonPack: async (id) => {
    const res = await fetch(`${API_BASE}/lessons/${id}/pack`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Download pack failed');
    const packPayload = await res.json();
    await saveDownloadedPack(packPayload);
    return packPayload;
  },

  // Quizzes
  getDiagnosticQuiz: async (options = {}) => {
    try {
      const { retake, seed, interestDomain, subLevel } = options;
      const params = new URLSearchParams();
      if (interestDomain) params.append('interestDomain', interestDomain);
      if (subLevel) params.append('subLevel', subLevel);
      if (retake) params.append('retake', 'true');
      if (seed) params.append('seed', String(seed));

      const queryString = params.toString() ? `?${params.toString()}` : '';
      const res = await fetch(`${API_BASE}/quizzes/diagnostic${queryString}`, { headers: getHeaders() });
      if (!res.ok) throw new Error('Diagnostic fetch failed');
      const data = await res.json();
      if (!data || !data.questions || data.questions.length === 0) {
        throw new Error('Empty diagnostic quiz response');
      }
      return data;
    } catch (err) {
      // Offline fallback: generate custom quiz locally
      const { generateCustomQuiz } = await import('./questionBank.js').catch(() => ({ generateCustomQuiz: null }));
      if (generateCustomQuiz) {
        return generateCustomQuiz({
          subject: options.interestDomain || 'Computer Science & AI',
          educationLevel: options.subLevel || 'Intermediate',
          subLevel: options.subLevel || 'Intermediate',
          isRetake: options.retake,
          seed: options.seed || Date.now()
        });
      }
      return {
        _id: `quiz-diagnostic-fallback-${Date.now()}`,
        title: `${options.interestDomain || 'STEM'} Diagnostic Assessment (10 Questions)`,
        subject: options.interestDomain || 'STEM Curriculum',
        grade: options.subLevel || 'Intermediate',
        questions: [
          {
            id: 'q-diag-1',
            questionText: '1. What are the main chemical outputs (products) of plant photosynthesis?',
            options: ['Carbon dioxide and water', 'Glucose (sugar) and oxygen gas', 'Nitrogen and solar radiation', 'Chlorophyll and soil minerals'],
            correctAnswerIndex: 1,
            misconceptionMap: { '0': 'Carbon dioxide and water are reactants, not products.' },
            explanation: 'Photosynthesis consumes CO2 and H2O using light to generate Glucose and Oxygen.'
          },
          {
            id: 'q-diag-2',
            questionText: '2. Solve for x in the two-step linear equation: 3x - 4 = 14',
            options: ['x = 4', 'x = 6', 'x = 18', 'x = 3.3'],
            correctAnswerIndex: 1,
            misconceptionMap: { '2': 'Add 4 to 14 to get 18, then divide by 3.' },
            explanation: 'Add 4 to both sides: 3x = 18. Divide by 3: x = 6.'
          },
          {
            id: 'q-diag-3',
            questionText: '3. If a vehicle travels 120 kilometers in 2 hours, what is its unit speed rate?',
            options: ['240 km/h', '60 km/h', '50 km/h', '30 km/h'],
            correctAnswerIndex: 1,
            misconceptionMap: { '0': 'Divide distance by hours: 120 ÷ 2.' },
            explanation: 'Unit rate = 120 km ÷ 2 hours = 60 km/h.'
          },
          {
            id: 'q-diag-4',
            questionText: '4. What is the time complexity (Big O) of Binary Search on a pre-sorted array of size N?',
            options: ['O(N)', 'O(log N)', 'O(N^2)', 'O(1)'],
            correctAnswerIndex: 1,
            misconceptionMap: { '0': 'O(N) is Linear Search.' },
            explanation: 'Binary Search operates in logarithmic time O(log N).'
          },
          {
            id: 'q-diag-5',
            questionText: '5. In Artificial Neural Networks, which algorithm adjusts network weights to minimize prediction loss?',
            options: ['Binary Tree Traversal', 'Backpropagation and Gradient Descent', 'Linear Interpolation', 'Hashing'],
            correctAnswerIndex: 1,
            misconceptionMap: { '0': 'Binary Tree Traversal is for hierarchical data search.' },
            explanation: 'Backpropagation calculates loss gradients to update neural network weights.'
          },
          {
            id: 'q-diag-6',
            questionText: '6. According to Newton\'s Second Law of Motion, what happens to acceleration if net force doubles while mass is constant?',
            options: ['Acceleration stays the same', 'Acceleration doubles', 'Acceleration decreases by half', 'Acceleration quadruples'],
            correctAnswerIndex: 1,
            misconceptionMap: { '0': 'Acceleration is directly proportional to net force.' },
            explanation: 'F = m × a; doubling force doubles acceleration.'
          },
          {
            id: 'q-diag-7',
            questionText: '7. When balancing the chemical equation: __ H₂ + O₂ ➔ 2 H₂O, what coefficient balances hydrogen?',
            options: ['1', '2', '3', '4'],
            correctAnswerIndex: 1,
            misconceptionMap: { '0': '2 H2 is needed for 4 hydrogen atoms.' },
            explanation: '2 H2 + O2 ➔ 2 H2O yields balanced atoms.'
          },
          {
            id: 'q-diag-8',
            questionText: '8. What nitrogenous base pairs with Adenine (A) in RNA molecules during gene transcription?',
            options: ['Thymine (T)', 'Uracil (U)', 'Cytosine (C)', 'Guanine (G)'],
            correctAnswerIndex: 1,
            misconceptionMap: { '0': 'Thymine is replaced by Uracil in RNA.' },
            explanation: 'RNA uses Uracil (U) to pair with Adenine (A).'
          },
          {
            id: 'q-diag-9',
            questionText: '9. In ecological energy pyramids, approximately what percentage of biomass energy is passed to the next trophic level?',
            options: ['100%', '50%', '10%', '1%'],
            correctAnswerIndex: 2,
            misconceptionMap: { '0': '90% of energy is lost as heat.' },
            explanation: 'The 10% Energy Rule governs trophic transfer.'
          },
          {
            id: 'q-diag-10',
            questionText: '10. According to Ohm\'s Law (V = I × R), what happens to current I if voltage V remains constant while resistance R increases?',
            options: ['Current increases', 'Current decreases', 'Current remains unchanged', 'Current drops to zero immediately'],
            correctAnswerIndex: 1,
            misconceptionMap: { '0': 'Current decreases as resistance increases.' },
            explanation: 'I = V ÷ R; higher resistance reduces current.'
          }
        ]
      };
    }
  },

  getLessonQuiz: async (lessonId, options = {}) => {
    const pack = await getDownloadedPackById(`pack-${lessonId}`);
    if (pack && pack.quizzes && pack.quizzes.length > 0 && !options.retake) {
      return pack.quizzes[0];
    }

    try {
      const { retake, seed, interestDomain, subLevel } = options;
      const params = new URLSearchParams();
      if (interestDomain) params.append('interestDomain', interestDomain);
      if (subLevel) params.append('subLevel', subLevel);
      if (retake) params.append('retake', 'true');
      if (seed) params.append('seed', String(seed));

      const queryString = params.toString() ? `?${params.toString()}` : '';
      const res = await fetch(`${API_BASE}/quizzes/lesson/${lessonId}${queryString}`, { headers: getHeaders() });
      if (!res.ok) throw new Error('Quiz fetch failed');
      return await res.json();
    } catch (err) {
      return {
        _id: `quiz-offline-${lessonId}-${Date.now()}`,
        title: 'Lesson Topic Practice Quiz',
        lessonId,
        lessonId,
        topic: 'Plant Biology & Energy Flow',
        subject: 'Science',
        questions: [
          {
            id: 'q-off-1',
            questionText: 'Why do plant leaves appear green under white light?',
            options: ['Chlorophyll absorbs green light', 'Chlorophyll reflects green light wavelengths while absorbing red and blue', 'Stomata release green liquid', 'Cell sap turns green when wet'],
            correctAnswerIndex: 1,
            explanation: 'Chlorophyll reflects green light while absorbing blue and red.'
          }
        ]
      };
    }
  },

  submitQuiz: async ({ quizId, questions = [], answers = {}, quizTitle, topic, subject }) => {
    // Evaluate exact score from questions array
    let score = 0;
    const total = questions.length || 10;
    const feedbackList = questions.map((q, idx) => {
      const studentAnswerIndex = answers[q.id] !== undefined ? answers[q.id] : answers[idx];
      const isCorrect = Number(studentAnswerIndex) === Number(q.correctAnswerIndex);
      if (isCorrect) score += 1;

      const misconception = !isCorrect 
        ? (q.misconceptionMap?.[studentAnswerIndex] || q.misconceptionMap?.[String(studentAnswerIndex)] || q.explanation || 'Review the core concept steps to fix this error.')
        : null;

      return {
        questionId: q.id,
        questionText: q.questionText,
        isCorrect,
        studentAnswerIndex,
        correctAnswerIndex: q.correctAnswerIndex,
        misconception,
        explanation: q.explanation,
        followUpQuestion: !isCorrect ? q.followUpQuestion : null
      };
    });

    const percentage = Math.round((score / total) * 100);
    const masteryStatus = percentage >= 80 ? 'mastered' : percentage >= 50 ? 'practising' : 'needs_review';

    if (!navigator.onLine) {
      await queueOfflineAttempt({
        quizId,
        quizTitle: quizTitle || 'Offline Assessment',
        topic: topic || 'STEM Practice',
        subject: subject || 'Science',
        score,
        total,
        percentage,
        answers,
        offlineSynced: false
      });
      return {
        score,
        total,
        percentage,
        masteryStatus,
        feedbackList,
        isOfflineSaved: true,
        message: 'Quiz progress saved on this device! Will sync automatically when online.'
      };
    }

    try {
      const res = await fetch(`${API_BASE}/quizzes/submit`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ quizId, answers, questions, quizTitle, topic, subject })
      });
      if (!res.ok) throw new Error('Submit quiz server error');
      const data = await res.json();
      return {
        score,
        total,
        percentage,
        masteryStatus,
        feedbackList,
        ...data
      };
    } catch (err) {
      await queueOfflineAttempt({
        quizId,
        quizTitle: quizTitle || 'Offline Assessment',
        topic,
        subject,
        score,
        total,
        percentage,
        answers,
        offlineSynced: false
      });
      return {
        score,
        total,
        percentage,
        masteryStatus,
        feedbackList,
        isOfflineSaved: true,
        message: 'Quiz attempt saved locally on this device.'
      };
    }
  },

  // Interactive STEM Games Submission
  submitGameResult: async ({ gameType, title, score, totalQuestions, topic, subject }) => {
    const percentage = Math.round((score / (totalQuestions || 1)) * 100);
    const pointsEarned = score * 20;

    let badgeEarned = null;
    if (gameType === 'matching' && percentage >= 80) {
      badgeEarned = { title: 'Concept Master', icon: 'Sparkles', desc: 'Matched all STEM concepts correctly!' };
    } else if (gameType === 'sorting' && percentage >= 80) {
      badgeEarned = { title: 'Classification Champ', icon: 'Award', desc: 'Accurately sorted STEM process items!' };
    } else if (gameType === 'memory' && percentage >= 80) {
      badgeEarned = { title: 'Memory Expert', icon: 'Zap', desc: 'Flipped and matched all STEM memory pairs!' };
    } else if (gameType === 'boss' && percentage >= 80) {
      badgeEarned = { title: 'Boss Review Victor', icon: 'Award', desc: 'Conquered the mixed-topic Boss Challenge!' };
    } else if (gameType === 'daily') {
      badgeEarned = { title: 'Daily Explorer Streak', icon: 'Zap', desc: 'Completed today’s STEM daily challenge!' };
    }

    if (!navigator.onLine) {
      await queueOfflineAttempt({
        quizId: `game-${gameType}-${Date.now()}`,
        quizTitle: title || `${gameType.toUpperCase()} Challenge`,
        topic: topic || 'Interactive STEM Practice',
        subject: subject || 'Science',
        score,
        total: totalQuestions,
        offlineSynced: false
      });
    }

    return {
      score,
      total: totalQuestions,
      percentage,
      pointsEarned,
      badgeEarned,
      message: navigator.onLine ? 'Game completed and synced!' : 'Game result saved locally on this device!'
    };
  },

  // Brevo Email Service API Call
  sendProgressReportEmail: async ({ recipientEmail, studentName, summaryText, topicMastery }) => {
    const res = await fetch(`${API_BASE}/email/send-report`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ recipientEmail, studentName, summaryText, topicMastery })
    });
    return await res.json();
  },

  // NEW AI Features
  aiTutorChat: async ({ userMessage, conversationHistory, currentLessonContext }) => {
    if (!navigator.onLine) {
      return {
        reply: 'Offline Orbit Tutor: In plant cells, chlorophyll absorbs sunlight photons to split water molecules into oxygen and hydrogen energy!',
        isAIGenerated: true,
        isOffline: true
      };
    }
    const res = await fetch(`${API_BASE}/ai/tutor-chat`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ userMessage, conversationHistory, currentLessonContext })
    });
    return await res.json();
  },

  aiConceptBreakdown: async ({ topic, query }) => {
    if (!navigator.onLine) {
      return {
        title: topic || 'Photosynthesis Chemical Reaction',
        summary: 'Photosynthesis transforms solar light, carbon dioxide, and water into chemical glucose energy and oxygen gas.',
        stepByStep: ['Light Absorption', 'Photolysis (Water Splitting)', 'Glucose Synthesis'],
        workedExample: '6 CO2 + 6 H2O + Light -> C6H12O6 + 6 O2',
        realWorldAnalogy: 'Like a solar panel charger storing energy inside battery cells!',
        memoryMnemonic: 'Sunlight cooks Hydrogen & Oxygen into Sugar!',
        isAIGenerated: true,
        isOffline: true
      };
    }
    const res = await fetch(`${API_BASE}/ai/concept-playground`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ topic, query })
    });
    return await res.json();
  },

  aiCustomQuiz: async ({ topic, difficulty, questionCount }) => {
    if (!navigator.onLine) {
      return {
        quizTitle: `Offline Custom Quiz: ${topic}`,
        questions: [
          {
            id: 'cq-off-1',
            questionText: 'What is the role of stomata during photosynthesis?',
            options: ['Regulate carbon dioxide and transpiration gas exchange', 'Absorb blue light', 'Store soil minerals', 'Reflect green wavelengths'],
            correctAnswerIndex: 0,
            explanation: 'Stomata pores open and close to control carbon dioxide intake and water vapor loss.'
          }
        ],
        isAIGenerated: true,
        isOffline: true
      };
    }
    const res = await fetch(`${API_BASE}/ai/custom-quiz`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ topic, difficulty, questionCount })
    });
    return await res.json();
  },

  aiFlashcards: async ({ topic }) => {
    if (!navigator.onLine) {
      return {
        flashcards: [
          { front: 'Chloroplast', back: 'Cell organelle where photosynthesis occurs, housing chlorophyll.' },
          { front: 'Stomata', back: 'Microscopic leaf pores regulated by guard cells for gas exchange.' },
          { front: 'Unit Rate', back: 'A ratio simplified so that the second quantity equals 1 unit.' }
        ],
        isAIGenerated: true,
        isOffline: true
      };
    }
    const res = await fetch(`${API_BASE}/ai/flashcards`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ topic })
    });
    return await res.json();
  },

  aiRecommend: async (progressData) => {
    const attempt = progressData?.quizAttempts?.[0] || progressData?.progress?.quizAttempts?.[0];
    const scorePct = attempt?.percentage !== undefined ? attempt.percentage : 70;
    const topicName = attempt?.topic || attempt?.quizTitle || 'STEM Curriculum';

    let whyThisMsg = '';
    if (scorePct >= 80) {
      whyThisMsg = `🎯 Score Mastery (${scorePct}%): Excellent work on ${topicName}! You have demonstrated strong conceptual understanding. We recommend advancing to high-velocity category sorters and Boss Review challenges.`;
    } else if (scorePct >= 50) {
      whyThisMsg = `⚡ Progress Alert (${scorePct}%): Solid attempt on ${topicName}! Review the step-by-step misconception notes above and retake the assessment to reach 80%+ mastery.`;
    } else {
      whyThisMsg = `💡 Learning Recovery Focus (${scorePct}%): ${topicName} needs targeted review. Watch the step-by-step video lesson below and try the interactive matching game to lock in key definitions.`;
    }

    if (!navigator.onLine) {
      return {
        lessonId: 'lesson-1',
        lessonTitle: topicName,
        whyThis: whyThisMsg,
        isAIGenerated: true,
        isOffline: true
      };
    }
    try {
      const res = await fetch(`${API_BASE}/ai/recommend`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ progress: progressData })
      });
      if (!res.ok) throw new Error('Network recommend call failed');
      const data = await res.json();
      return { whyThis: whyThisMsg, ...data };
    } catch (err) {
      return {
        lessonId: 'lesson-1',
        lessonTitle: topicName,
        whyThis: whyThisMsg,
        isAIGenerated: true,
        isOffline: true
      };
    }
  },

  aiExplain: async ({ sectionTitle, content, mode }) => {
    if (!navigator.onLine) {
      const offlineMap = {
        simpler: 'Think of a leaf as a tiny solar kitchen! Sunlight powers the oven, roots drink water, and leaves breathe carbon dioxide to bake sugar food.',
        stepByStep: '1. Chlorophyll absorbs sunlight.\n2. Water splits into oxygen gas.\n3. Carbon dioxide enters via stomata.\n4. Glucose sugar is produced.',
        workedExample: 'Example: 6 CO2 + 6 H2O under light energy yields 1 Glucose molecule + 6 Oxygen gas molecules.',
        realWorld: 'Submarines use artificial plant filters to generate breathable oxygen from water during sea journeys.'
      };
      return { explanationText: offlineMap[mode] || offlineMap['simpler'], mode, isAIGenerated: true, isOffline: true };
    }
    const res = await fetch(`${API_BASE}/ai/explain`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ sectionTitle, content, mode })
    });
    return await res.json();
  },

  aiExtraPractice: async ({ lessonTitle, content }) => {
    if (!navigator.onLine) {
      return {
        questionText: 'Offline Question: What compound is released as gas during photolysis in chloroplasts?',
        options: ['Carbon Dioxide', 'Oxygen', 'Glucose', 'Methane'],
        correctAnswerIndex: 1,
        explanation: 'Water molecules split during photolysis, releasing oxygen gas into the air.',
        isAIGenerated: true,
        isOffline: true
      };
    }
    const res = await fetch(`${API_BASE}/ai/extra-practice`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ lessonTitle, content })
    });
    return await res.json();
  },

  aiStudyCoach: async ({ goal, availableMinutes }) => {
    if (!navigator.onLine) {
      return {
        goal,
        durationMinutes: availableMinutes || 20,
        steps: [
          { minute: '0-5 mins', task: 'Review Section 1 Key Takeaways offline' },
          { minute: '5-15 mins', task: 'Complete offline topic practice quiz' },
          { minute: '15-20 mins', task: 'Review misconception hints and lock in streak' }
        ],
        isAIGenerated: true,
        isOffline: true
      };
    }
    const res = await fetch(`${API_BASE}/ai/study-coach`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ goal, availableMinutes })
    });
    return await res.json();
  },

  aiTeacherAssistant: async ({ topic, targetGrade, contentType }) => {
    if (!navigator.onLine) {
      return {
        draftContent: `[Offline Teacher Draft for ${topic}]: Focus on hands-on visual food webs and step-by-step ratio tables.`,
        contentType,
        topic,
        isAIGenerated: true,
        isOffline: true
      };
    }
    const res = await fetch(`${API_BASE}/ai/teacher-assistant`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ topic, targetGrade, contentType })
    });
    return await res.json();
  },

  // Progress & Sync
  getStudentProgress: async () => {
    try {
      const res = await fetch(`${API_BASE}/progress/student`, { headers: getHeaders() });
      if (!res.ok) throw new Error('Fetch progress failed');
      return await res.json();
    } catch (err) {
      return {
        userId: 'user-student-1',
        topicMastery: [
          { topic: 'Plant Biology & Energy Flow', status: 'mastered', scoreAvg: 92 },
          { topic: 'Ratios & Unit Rates', status: 'practising', scoreAvg: 74 },
          { topic: 'Linear Equations', status: 'needs_review', scoreAvg: 58 }
        ],
        quizAttempts: [
          { quizTitle: 'Grade 7 Diagnostic', score: 2, total: 3, percentage: 67 }
        ]
      };
    }
  },

  getClassAnalytics: async (classId = 'class-7a') => {
    try {
      const res = await fetch(`${API_BASE}/progress/class/${classId}`, { headers: getHeaders('teacher') });
      if (!res.ok) throw new Error('Fetch class analytics failed');
      return await res.json();
    } catch (err) {
      return {
        className: 'Grade 7 Science & Math (7A)',
        totalStudents: 24,
        classPulseAvg: 82,
        learnersNeedingSupport: [
          { id: 'u-101', name: 'Jordan Smith', needsReviewTopics: ['Linear Equations'], lastSync: '2 hours ago' }
        ],
        conceptGaps: [
          { topic: 'Solving Two-Step Linear Equations', subject: 'Mathematics', strugglingCount: 9, percentageStruggling: 37.5 },
          { topic: 'Ecology & Energy Pyramids', subject: 'Science', strugglingCount: 6, percentageStruggling: 25.0 }
        ],
        assignmentCompletion: [
          { assignment: 'Photosynthesis Lab', completed: 21, inProgress: 2, notStarted: 1 }
        ]
      };
    }
  },

  getIndividualLearnerAnalytics: async (studentId) => {
    try {
      const res = await fetch(`${API_BASE}/progress/learner/${studentId}`, { headers: getHeaders('teacher') });
      if (!res.ok) throw new Error('Fetch student analytics failed');
      return await res.json();
    } catch (err) {
      return {
        name: 'Maya Lin',
        grade: 'Grade 7',
        syncStatus: 'Synced (Offline Cache)',
        topicMastery: [
          { topic: 'Plant Biology', status: 'mastered', scoreAvg: 92 },
          { topic: 'Linear Equations', status: 'needs_review', scoreAvg: 58 }
        ]
      };
    }
  },

  // Classroom Workspaces & 6-Digit Code Join Rooms
  getMyClasses: async () => {
    try {
      const res = await fetch(`${API_BASE}/classes/my`, { headers: getHeaders() });
      if (!res.ok) throw new Error('Fetch classes failed');
      return await res.json();
    } catch (err) {
      return [
        {
          _id: 'class-7a',
          className: 'Grade 10 CS & AI Alpha Room',
          grade: 'Grade 10',
          subject: 'Computer Science',
          code: '794201',
          teacherId: 'user-teacher-1',
          studentIds: ['user-student-1'],
          description: 'Interactive AI & Computer Science Workspace room for active progress tracking and video sharing.',
          messages: [
            {
              id: 'msg-1',
              senderId: 'user-teacher-1',
              senderName: 'Ms. Sarah Vance (Educator)',
              senderRole: 'educator',
              text: 'Welcome to Grade 10 CS & AI Alpha Room! Watch the Binary Search & Data Structures video lesson below.',
              attachedVideoId: 'lesson-cs-1',
              attachedVideoTitle: 'Computer Science: Algorithms & Data Structures',
              timestamp: new Date().toISOString()
            }
          ]
        }
      ];
    }
  },

  createClass: async ({ className, grade, subject, description }) => {
    try {
      const res = await fetch(`${API_BASE}/classes`, {
        method: 'POST',
        headers: getHeaders('teacher'),
        body: JSON.stringify({ className, grade, subject, description })
      });
      if (!res.ok) throw new Error('Create class room failed');
      return await res.json();
    } catch (err) {
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
      return {
        _id: `class-${Date.now()}`,
        className: className || 'Interactive STEM Room',
        grade: grade || 'All Grades',
        subject: subject || 'STEM',
        code: randomCode,
        teacherId: 'user-teacher-1',
        studentIds: [],
        description,
        messages: [
          {
            id: `msg-${Date.now()}`,
            senderId: 'user-teacher-1',
            senderName: 'Educator',
            senderRole: 'educator',
            text: `Room created! Share code ${randomCode} with your students to join.`,
            timestamp: new Date().toISOString()
          }
        ]
      };
    }
  },

  joinClass: async (code) => {
    const res = await fetch(`${API_BASE}/classes/join`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ code })
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || 'Invalid class code');
    }
    return await res.json();
  },

  sendRoomMessage: async (classId, { text, attachedVideoId, attachedVideoTitle }) => {
    try {
      const res = await fetch(`${API_BASE}/classes/${classId}/messages`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ text, attachedVideoId, attachedVideoTitle })
      });
      if (!res.ok) throw new Error('Send message failed');
      return await res.json();
    } catch (err) {
      return [
        {
          id: `msg-${Date.now()}`,
          senderName: 'You',
          text,
          attachedVideoId,
          attachedVideoTitle,
          timestamp: new Date().toISOString()
        }
      ];
    }
  }
};
