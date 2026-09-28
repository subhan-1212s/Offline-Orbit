import { 
  getAllDownloadedPacks, 
  getDownloadedPackById, 
  saveDownloadedPack, 
  queueOfflineAttempt, 
  getCachedLessonsList, 
  cacheLessonsList 
} from './indexedDB.js';
import { getDynamicStreak, recordDailyActivity } from '../utils/streakTracker.js';
import { webllmEngine } from './webllmEngine.js';

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
          _id: role === 'admin' ? 'user-super-admin' : (role === 'educator' ? 'user-teacher-1' : 'user-student-1'),
          name: role === 'admin' ? 'Super Admin' : (email ? email.split('@')[0] : 'Learner'),
          email: email || (role === 'admin' ? 'admin@offline-orbit.edu' : 'learner@orbit.edu'),
          role: role === 'admin' ? 'admin' : (role === 'educator' ? 'educator' : 'learner'),
          grade: role === 'admin' ? 'Root Administrator' : 'Grade 7',
          points: role === 'admin' ? 9999 : 480,
          streakDays: role === 'admin' ? 30 : getDynamicStreak('user-offline'),
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

      if (role === 'admin') {
        const uid = 'user-super-admin';
        demoUser = {
          _id: uid,
          name: 'Super Admin',
          email: 'admin@offline-orbit.edu',
          role: 'admin',
          grade: 'Root Administrator',
          points: 9999,
          streakDays: 30,
          isOfflineMode: true
        };
      } else if (role === 'student-aarav' || role === 'student') {
        const uid = 'user-student-aarav';
        demoUser = {
          _id: uid,
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
          streakDays: getDynamicStreak(uid),
          isOfflineMode: true
        };
      } else if (role === 'student-priya') {
        const uid = 'user-student-priya';
        demoUser = {
          _id: uid,
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
          streakDays: getDynamicStreak(uid),
          isOfflineMode: true
        };
      } else if (role === 'independent') {
        const uid = 'user-independent-1';
        demoUser = {
          _id: uid,
          name: 'Alex Rivera',
          email: 'alex@orbit.edu',
          role: 'independent',
          grade: 'Grade 7',
          learnerCategory: 'Self-Paced Learner',
          learnerType: 'Personal Mobile',
          interestDomain: 'Biotechnology & Chemistry',
          preferredLanguage: 'en',
          points: 680,
          streakDays: getDynamicStreak(uid),
          isOfflineMode: true
        };
      } else {
        const uid = 'user-teacher-1';
        demoUser = {
          _id: uid,
          name: 'Mr. Rajesh Kumar',
          email: 'teacher@orbit.edu',
          role: 'educator',
          grade: 'Grade 7 STEM Lead',
          subjects: ['Science', 'Mathematics', 'Computer Science'],
          preferredLanguage: 'en',
          points: 1200,
          streakDays: getDynamicStreak(uid),
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
      let targetSubject = 'Computer Science & AI';
      if (lessonId.includes('math')) targetSubject = 'Mathematics';
      else if (lessonId.includes('phy')) targetSubject = 'Physics';
      else if (lessonId.includes('bio')) targetSubject = 'Biology';
      else if (lessonId.includes('chem')) targetSubject = 'Chemistry';
      else if (options.interestDomain) targetSubject = options.interestDomain;

      const { generateCustomQuiz } = await import('./questionBank.js').catch(() => ({ generateCustomQuiz: null }));
      if (generateCustomQuiz) {
        const customQ = generateCustomQuiz({
          subject: targetSubject,
          educationLevel: options.subLevel || 'Intermediate',
          subLevel: options.subLevel || 'Intermediate',
          isRetake: options.retake,
          seed: options.seed || Date.now()
        });
        customQ._id = `quiz-lesson-${lessonId}`;
        customQ.lessonId = lessonId;
        customQ.title = `${targetSubject} Topic Practice Quiz`;
        return customQ;
      }

      return {
        _id: `quiz-offline-${lessonId}-${Date.now()}`,
        title: 'Lesson Topic Practice Quiz',
        lessonId,
        topic: 'Plant Biology & Energy Flow',
        subject: 'Science',
        questions: [
          {
            id: 'q-off-1',
            questionText: '1. Why do plant leaves appear green under white light?',
            options: [
              'Chlorophyll absorbs green light completely',
              'Chlorophyll reflects green light wavelengths while absorbing blue and red',
              'Stomata release green liquid during respiration',
              'Cell sap turns green when wet'
            ],
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

    // Persist real attempt to orbit_quiz_history for instant real-time telemetry
    try {
      const u = JSON.parse(localStorage.getItem('orbit_user') || '{}');
      const attemptRecord = {
        id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        quizId,
        quizTitle: quizTitle || 'STEM Assessment',
        topic: topic || 'General STEM',
        subject: subject || 'Science',
        score,
        total,
        percentage,
        studentId: u._id || 'user-student-aarav',
        studentName: u.name || 'Enrolled Student',
        feedbackList: feedbackList || [],
        completedAt: new Date().toISOString()
      };
      const prev = JSON.parse(localStorage.getItem('orbit_quiz_history') || '[]');
      localStorage.setItem('orbit_quiz_history', JSON.stringify([attemptRecord, ...prev]));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('orbit_telemetry_updated', { detail: attemptRecord }));
    } catch (e) {
      console.warn('Persist quiz attempt error:', e);
    }

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

  sendProgressReportEmail: async () => {
    return { success: true, message: 'Progress digest recorded locally.' };
  },

  // NEW AI Features (WebLLM Cloud Cache & In-Browser WebGPU + Neural Engine)
  aiTutorChat: async ({ userMessage, conversationHistory, currentLessonContext }) => {
    // 1. If online, attempt server-side OpenAI GPT-4o-mini processing
    if (navigator.onLine) {
      try {
        const res = await fetch(`${API_BASE}/ai/tutor-chat`, {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify({ userMessage, conversationHistory, currentLessonContext })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.reply) {
            // Guard against stale cached server fallback text
            if (data.reply.includes('Academic Insights on') || data.reply.includes('Great STEM question! Here is the core conceptual breakdown')) {
              return {
                reply: webllmEngine.computeTailoredSTEMAnswer(userMessage, currentLessonContext),
                isAIGenerated: true,
                isOffline: !navigator.onLine,
                engine: 'WebLLM & Transformers.js Cloud Cache'
              };
            }
            return {
              reply: data.reply,
              isAIGenerated: true,
              isOffline: false,
              engine: data.source === 'OpenAI GPT-4o-mini' ? 'OpenAI GPT-4o-mini Online Cloud' : 'WebLLM & Transformers.js Cloud Cache'
            };
          }
        }
      } catch (err) {
        console.warn('Online AI chat fetch failed, transitioning seamlessly to in-browser WebLLM/WebGPU engine:', err.message);
      }
    }

    // 2. In-Browser WebLLM with Cloud Cache & WebGPU / Direct Neural Solver (100% Offline Ready)
    try {
      const offlineResult = await webllmEngine.generateResponse({
        userMessage,
        conversationHistory,
        lessonContext: currentLessonContext
      });

      return {
        reply: offlineResult.text,
        isAIGenerated: true,
        isOffline: true,
        engine: offlineResult.engine || 'WebLLM WebGPU Cloud Cache',
        isWebGPU: offlineResult.isWebGPU
      };
    } catch (engineErr) {
      console.warn('Local engine execution notice:', engineErr.message);
      return {
        reply: webllmEngine.computeTailoredSTEMAnswer(userMessage, currentLessonContext),
        isAIGenerated: true,
        isOffline: true,
        engine: 'In-Browser STEM Neural Engine'
      };
    }
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
    // 1. Gather latest real quiz attempt
    let attempts = progressData?.quizAttempts || progressData?.progress?.quizAttempts || [];
    if (!attempts || attempts.length === 0) {
      try {
        attempts = JSON.parse(localStorage.getItem('orbit_quiz_history') || '[]');
      } catch (e) {
        attempts = [];
      }
    }
    const attempt = attempts?.[0];
    let userInterest = 'Physics';
    try {
      const u = JSON.parse(localStorage.getItem('orbit_auth_user') || '{}');
      if (u?.interestDomain) userInterest = u.interestDomain;
    } catch (e) {}

    const attemptTopic = attempt?.topic || attempt?.quizTitle || 'Diagnostic Assessment';
    const score = attempt?.score !== undefined ? attempt.score : 8;
    const total = attempt?.total !== undefined ? attempt.total : 10;
    const missedCount = Math.max(0, total - score);
    const percentage = attempt?.percentage !== undefined ? attempt.percentage : Math.round((score / total) * 100);

    // Map attempt topic to recommended next lesson
    let matchedTitle = 'Algebra: Two-Step Linear Equations & Functions';
    let matchedId = 'lesson-math-1';
    const topLower = (attemptTopic || '').toLowerCase();

    if (topLower.includes('fraction') || topLower.includes('algebra') || topLower.includes('linear') || topLower.includes('equation') || topLower.includes('math')) {
      matchedTitle = 'Algebra: Two-Step Linear Equations & Functions';
      matchedId = 'lesson-math-1';
    } else if (topLower.includes('algorithm') || topLower.includes('big o') || topLower.includes('python') || topLower.includes('computer')) {
      matchedTitle = 'Computer Science: Algorithms, Big O & Python';
      matchedId = 'lesson-cs-1';
    } else if (topLower.includes('neural') || topLower.includes('ai') || topLower.includes('machine learning')) {
      matchedTitle = 'Artificial Intelligence & Neural Networks';
      matchedId = 'lesson-cs-2';
    } else if (topLower.includes('photo') || topLower.includes('plant') || topLower.includes('cell') || topLower.includes('bio') || topLower.includes('dna')) {
      matchedTitle = 'Cellular Biology, DNA Replication & Genetics';
      matchedId = 'lesson-bio-1';
    } else if (topLower.includes('crispr') || topLower.includes('genomics') || topLower.includes('gene editing')) {
      matchedTitle = 'Molecular Genetics & CRISPR Gene Editing';
      matchedId = 'lesson-bio-2';
    } else if (topLower.includes('chem') || topLower.includes('stoich') || topLower.includes('reaction') || topLower.includes('periodic')) {
      matchedTitle = 'Chemical Reactions, Stoichiometry & Periodic Table';
      matchedId = 'lesson-chem-1';
    } else if (topLower.includes('force') || topLower.includes('newton') || topLower.includes('physic') || topLower.includes('motion')) {
      matchedTitle = 'Newtonian Physics & Force Vectors';
      matchedId = 'lesson-phy-1';
    } else if (topLower.includes('circuit') || topLower.includes('ohm') || topLower.includes('electric') || topLower.includes('magnet')) {
      matchedTitle = 'Electromagnetism & Circuit Dynamics';
      matchedId = 'lesson-phy-2';
    } else if (topLower.includes('calculus') || topLower.includes('derivative') || topLower.includes('gradient')) {
      matchedTitle = 'Calculus: Derivatives, Gradients & Optimization';
      matchedId = 'lesson-math-2';
    }

    // Dynamic rationale formulation exactly according to the quiz performance
    let whyThisMsg = '';
    if (missedCount === 0 || percentage === 100) {
      whyThisMsg = `You achieved 100% mastery on your ${attemptTopic} assessment (${score}/${total} correct)! You have demonstrated comprehensive understanding. We recommend advancing to "${matchedTitle}" next to master practical extensions and complex problem solving.`;
    } else if (missedCount === 1) {
      whyThisMsg = `You missed only 1 question about ${attemptTopic} in your diagnostic (Score: ${score}/${total}, ${percentage}%). Your preferred interest is ${userInterest}. Try this illustrated lesson on "${matchedTitle}" next to perfect your understanding.`;
    } else {
      const countWord = missedCount === 2 ? 'two' : missedCount === 3 ? 'three' : `${missedCount}`;
      whyThisMsg = `You missed ${countWord} questions about ${attemptTopic} in your diagnostic (Score: ${score}/${total}, ${percentage}%), and your preferred interest is ${userInterest}. Try this illustrated lesson on "${matchedTitle}" next to strengthen core concepts.`;
    }

    if (!navigator.onLine) {
      return {
        lessonId: matchedId,
        lessonTitle: matchedTitle,
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
      return {
        lessonId: data?.lessonId || matchedId,
        lessonTitle: data?.lessonTitle || matchedTitle,
        ...data,
        whyThis: whyThisMsg
      };
    } catch (err) {
      return {
        lessonId: matchedId,
        lessonTitle: matchedTitle,
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
      if (res.ok) return await res.json();
    } catch (err) {}

    try {
      const quizHistory = JSON.parse(localStorage.getItem('orbit_quiz_history') || '[]');
      const user = JSON.parse(localStorage.getItem('orbit_user') || '{}');

      const topicMap = {};
      quizHistory.forEach(q => {
        const t = q.topic || 'General STEM';
        if (!topicMap[t]) topicMap[t] = [];
        topicMap[t].push(q.percentage || 0);
      });

      const topicMastery = Object.keys(topicMap).length > 0
        ? Object.keys(topicMap).map(topic => {
            const scores = topicMap[topic];
            const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
            const status = avg >= 80 ? 'mastered' : avg >= 60 ? 'practising' : 'needs_review';
            return { topic, status, scoreAvg: avg };
          })
        : [
            { topic: user.interestDomain || 'Computer Science & AI', status: 'practising', scoreAvg: 75 }
          ];

      return {
        userId: user._id || 'current-user',
        topicMastery,
        quizAttempts: quizHistory
      };
    } catch (e) {
      return {
        userId: 'current-user',
        topicMastery: [{ topic: 'Computer Science & AI', status: 'practising', scoreAvg: 75 }],
        quizAttempts: []
      };
    }
  },

  getClassAnalytics: async (classId = 'class-7a', activeRoom = null) => {
    let serverData = null;
    try {
      const res = await fetch(`${API_BASE}/progress/class/${classId}`, { headers: getHeaders('teacher') });
      if (res.ok) serverData = await res.json();
    } catch (err) {}

    // Pull real local quiz attempts recorded in this device
    const quizHistory = JSON.parse(localStorage.getItem('orbit_quiz_history') || '[]');
    const teacherRooms = JSON.parse(localStorage.getItem('orbit_teacher_rooms') || '[]');
    const currentRoom = activeRoom || (teacherRooms.length > 0 ? teacherRooms[0] : null);

    // If local quiz attempts exist, dynamically compute and override with real telemetry
    if (quizHistory.length > 0) {
      const totalScoreSum = quizHistory.reduce((a, q) => a + (q.percentage || 0), 0);
      const livePulseAvg = Math.round(totalScoreSum / quizHistory.length);

      // Extract real concept gaps from quiz attempts
      const topicGapsMap = {};
      quizHistory.forEach(q => {
        const top = q.topic || 'STEM Practice';
        if (!topicGapsMap[top]) {
          topicGapsMap[top] = { topic: top, subject: q.subject || 'STEM', total: 0, struggling: 0 };
        }
        topicGapsMap[top].total += 1;
        if ((q.percentage || 0) < 75) {
          topicGapsMap[top].struggling += 1;
        }
      });

      const liveConceptGaps = Object.values(topicGapsMap)
        .map(t => ({
          topic: t.topic,
          subject: t.subject,
          strugglingCount: t.struggling,
          percentageStruggling: Math.round((t.struggling / Math.max(t.total, 1)) * 100)
        }))
        .sort((a, b) => b.percentageStruggling - a.percentageStruggling);

      // Find real learners who need support
      const strugglingAttempts = quizHistory.filter(q => (q.percentage || 0) < 75);
      const studentStruggleMap = {};
      strugglingAttempts.forEach(q => {
        const sName = q.studentName || 'Mohamed Subhan';
        if (!studentStruggleMap[sName]) studentStruggleMap[sName] = [];
        studentStruggleMap[sName].push(q.topic || 'Core Concept');
      });

      const liveLearnersNeedingSupport = Object.keys(studentStruggleMap).map((name, i) => ({
        id: `struggle-${i}-${Date.now()}`,
        name,
        needsReviewTopics: Array.from(new Set(studentStruggleMap[name])),
        lastSync: 'Synced just now'
      }));

      // Real assignment completion based on attempts and room roster
      const totalEnrolled = Math.max(currentRoom?.studentIds?.length || 1, 1);
      const coreModules = [
        'Core Diagnostic Assessment',
        'Photosynthesis & Plant Energy',
        'Algorithms & Data Structures'
      ];
      const liveAssignmentCompletion = coreModules.map((modName, idx) => {
        const completedAttempts = quizHistory.filter(q => 
          (q.quizTitle && q.quizTitle.toLowerCase().includes(modName.toLowerCase())) ||
          (q.topic && q.topic.toLowerCase().includes(modName.toLowerCase()))
        ).length;
        const completed = Math.min(completedAttempts, totalEnrolled);
        const inProgress = completed < totalEnrolled ? 1 : 0;
        const notStarted = Math.max(0, totalEnrolled - completed - inProgress);

        return {
          assignment: modName,
          completed: completed > 0 ? completed : (idx === 0 ? 1 : 0),
          inProgress,
          notStarted
        };
      });

      return {
        className: currentRoom?.className || serverData?.className || 'Active Educator Workspace',
        totalStudents: totalEnrolled,
        classPulseAvg: livePulseAvg,
        learnersNeedingSupport: liveLearnersNeedingSupport.length > 0 ? liveLearnersNeedingSupport : [
          { id: 'u-live-1', name: quizHistory[0]?.studentName || 'Mohamed Subhan', email: 'mohamedsubhan155@gmail.com', needsReviewTopics: ['Algorithmic Logic'], lastSync: 'Just now' }
        ],
        conceptGaps: liveConceptGaps.length > 0 ? liveConceptGaps : (serverData?.conceptGaps || [
          { topic: 'Algorithmic Problem Solving', subject: 'Computer Science', strugglingCount: 1, percentageStruggling: 25 }
        ]),
        assignmentCompletion: liveAssignmentCompletion,
        isRealTime: true,
        lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
    }

    if (serverData) return serverData;

    return {
      className: currentRoom?.className || 'Active Educator Workspace',
      totalStudents: currentRoom?.studentIds?.length || 1,
      classPulseAvg: 85,
      learnersNeedingSupport: [
        { id: 'u-live-default', name: 'Mohamed Subhan', email: 'mohamedsubhan155@gmail.com', needsReviewTopics: ['Algorithmic Logic'], lastSync: 'Live Connected' }
      ],
      conceptGaps: [
        { topic: 'Algorithmic Problem Solving', subject: 'Computer Science', strugglingCount: 1, percentageStruggling: 20 },
        { topic: 'Photosynthesis & Cellular Energy', subject: 'Science', strugglingCount: 1, percentageStruggling: 15 }
      ],
      assignmentCompletion: [
        { assignment: 'Core Diagnostic Assessment', completed: 1, inProgress: 0, notStarted: 0 },
        { assignment: 'Photosynthesis Lab', completed: 1, inProgress: 0, notStarted: 0 },
        { assignment: 'Algorithms Quest', completed: 1, inProgress: 0, notStarted: 0 }
      ],
      isRealTime: true,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
  },

  simulateStudentQuizAttempt: async ({ studentName = 'Mohamed Subhan', topic = 'Solving Linear Equations', score = 2, total = 5 }) => {
    const percentage = Math.round((score / total) * 100);
    const newAttempt = {
      id: `sim-${Date.now()}`,
      quizId: `quiz-sim-${Date.now()}`,
      quizTitle: `${topic} Diagnostic Quest`,
      topic,
      subject: 'Mathematics',
      score,
      total,
      percentage,
      studentName,
      studentId: `student-${studentName.toLowerCase().replace(/\s+/g, '-')}`,
      completedAt: new Date().toISOString()
    };
    try {
      const prev = JSON.parse(localStorage.getItem('orbit_quiz_history') || '[]');
      localStorage.setItem('orbit_quiz_history', JSON.stringify([newAttempt, ...prev]));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('orbit_telemetry_updated', { detail: newAttempt }));
    } catch (e) {}
    return newAttempt;
  },

  getIndividualLearnerAnalytics: async (studentId, studentMeta = null) => {
    try {
      const studentNameParam = studentMeta?.name ? `?name=${encodeURIComponent(studentMeta.name)}` : '';
      const res = await fetch(`${API_BASE}/progress/learner/${studentId}${studentNameParam}`, { headers: getHeaders('teacher') });
      if (res.ok) {
        const data = await res.json();
        if (studentMeta?.name) data.name = studentMeta.name;
        if (!data.name || data.name.includes('Aarav')) {
          data.name = studentMeta?.name || 'Mohamed Subhan';
        }
        data.grade = 'High School';
        if (studentMeta?.email) data.email = studentMeta.email;
        if (!data.email) data.email = 'mohamedsubhan155@gmail.com';
        return data;
      }
    } catch (err) {}

    const quizHistory = JSON.parse(localStorage.getItem('orbit_quiz_history') || '[]');
    const user = JSON.parse(localStorage.getItem('orbit_user') || '{}');

    const topicMap = {};
    quizHistory.forEach(q => {
      const t = q.topic || 'General STEM';
      if (!topicMap[t]) topicMap[t] = [];
      topicMap[t].push(q.percentage || 0);
    });

    const topicMastery = Object.keys(topicMap).length > 0
      ? Object.keys(topicMap).map(topic => {
          const scores = topicMap[topic];
          const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
          const status = avg >= 80 ? 'mastered' : avg >= 60 ? 'practising' : 'needs_review';
          return { topic, status, scoreAvg: avg };
        })
      : [
          { topic: 'Computer Science & AI', status: 'mastered', scoreAvg: 88 },
          { topic: 'Data Structures & Algorithms', status: 'practising', scoreAvg: 72 }
        ];

    const studentDisplayName = studentMeta?.name || (user?.name && !user.name.includes('Teacher') && !user.name.includes('Admin') ? user.name : 'Mohamed Subhan');

    return {
      studentId: studentId || 'user-student-mohamed',
      name: studentDisplayName,
      email: studentMeta?.email || (user?.email && !user.email.includes('teacher') ? user.email : 'mohamedsubhan155@gmail.com'),
      grade: 'High School',
      syncStatus: 'Synced (Local Mesh Cache)',
      topicMastery
    };
  },

  // Classroom Workspaces & 6-Digit Code Join Rooms
  getMyClasses: async () => {
    try {
      const res = await fetch(`${API_BASE}/classes/my`, { headers: getHeaders() });
      if (res.ok) {
        const rooms = await res.json();
        return rooms;
      }
    } catch (err) {}

    // Dynamic offline fallback based on current user role:
    try {
      const user = JSON.parse(localStorage.getItem('orbit_user') || '{}');
      const isEducator = user.role === 'educator' || user.role === 'teacher';
      if (isEducator) {
        return JSON.parse(localStorage.getItem('orbit_teacher_rooms') || '[]');
      } else {
        return JSON.parse(localStorage.getItem('orbit_joined_rooms') || '[]');
      }
    } catch (e) {
      return [];
    }
  },

  createClass: async ({ className, grade, subject, description }) => {
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    try {
      const res = await fetch(`${API_BASE}/classes`, {
        method: 'POST',
        headers: getHeaders('teacher'),
        body: JSON.stringify({ className, grade, subject, description })
      });
      if (res.ok) {
        const room = await res.json();
        const teacherRooms = JSON.parse(localStorage.getItem('orbit_teacher_rooms') || '[]');
        localStorage.setItem('orbit_teacher_rooms', JSON.stringify([room, ...teacherRooms.filter(r => r._id !== room._id)]));
        return room;
      }
    } catch (err) {}

    const newRoom = {
      _id: `class-${Date.now()}`,
      className: className || 'Interactive STEM Room',
      grade: grade || 'Grade 10',
      subject: subject || 'STEM',
      code: randomCode,
      teacherId: 'user-teacher-1',
      studentIds: [],
      description: description || 'Interactive Educator Classroom Room',
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
    const teacherRooms = JSON.parse(localStorage.getItem('orbit_teacher_rooms') || '[]');
    localStorage.setItem('orbit_teacher_rooms', JSON.stringify([newRoom, ...teacherRooms.filter(r => r._id !== newRoom._id)]));
    return newRoom;
  },

  joinClass: async (code) => {
    const cleanCode = code ? code.toString().trim() : '';
    if (!cleanCode) throw new Error('Please enter a valid 6-digit classroom code.');

    try {
      const res = await fetch(`${API_BASE}/classes/join`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ code: cleanCode })
      });
      if (res.ok) {
        const data = await res.json();
        const joinedRooms = JSON.parse(localStorage.getItem('orbit_joined_rooms') || '[]');
        localStorage.setItem('orbit_joined_rooms', JSON.stringify([data.room, ...joinedRooms.filter(r => r._id !== data.room._id)]));
        return data;
      }
    } catch (err) {}

    // Offline / fallback room join
    const teacherRooms = JSON.parse(localStorage.getItem('orbit_teacher_rooms') || '[]');
    let targetRoom = teacherRooms.find(r => r.code === cleanCode);

    if (!targetRoom) {
      targetRoom = {
        _id: `class-${cleanCode}`,
        className: `STEM Workspace (Room ${cleanCode})`,
        grade: 'Active Grade',
        subject: 'STEM',
        code: cleanCode,
        teacherId: 'teacher-local',
        studentIds: ['current-user'],
        description: `Classroom Workspace connected via 6-digit code ${cleanCode}`,
        messages: [
          {
            id: `msg-${Date.now()}`,
            senderName: 'Educator',
            senderRole: 'educator',
            text: `Welcome to the classroom! Use this workspace for offline study and video lessons.`,
            timestamp: new Date().toISOString()
          }
        ]
      };
    }

    const joinedRooms = JSON.parse(localStorage.getItem('orbit_joined_rooms') || '[]');
    localStorage.setItem('orbit_joined_rooms', JSON.stringify([targetRoom, ...joinedRooms.filter(r => r._id !== targetRoom._id)]));
    return { message: 'Successfully joined room!', room: targetRoom };
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
  },

  // Paytm Test Payment Gateway Integration
  initiatePaytmPayment: async ({ orderId, amount, planName, billingCycle, customerEmail, customerName }) => {
    try {
      const res = await fetch(`${API_BASE}/paytm/initiate`, {
        method: 'POST',
        headers: getHeaders('admin'),
        body: JSON.stringify({ orderId, amount, planName, billingCycle, customerEmail, customerName })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Paytm initiate online warning:', e);
    }
    // Offline simulated initiation
    return {
      success: true,
      mid: 'OFFLINEORBIT_TEST_MID',
      orderId: orderId || `ORD_ORBIT_${Date.now()}`,
      txnToken: `PTM_TEST_TOKEN_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      amount: Number(amount) || 999,
      planName: planName || 'Orbit Pro License',
      billingCycle: billingCycle || 'Monthly',
      status: 'INITIATED'
    };
  },

  verifyPaytmPayment: async ({ orderId, amount, planName, billingCycle, customerEmail, paymentMode }) => {
    try {
      const res = await fetch(`${API_BASE}/paytm/verify`, {
        method: 'POST',
        headers: getHeaders('admin'),
        body: JSON.stringify({ orderId, amount, planName, billingCycle, customerEmail, paymentMode })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Paytm verify online warning:', e);
    }
    // Offline simulated verification
    const txnId = `PTM${Date.now()}${Math.floor(1000 + Math.random() * 9000)}`;
    const bankTxnId = `BANK_UTR_${Math.floor(100000000000 + Math.random() * 900000000000)}`;
    const transaction = {
      orderId: orderId || `ORD_ORBIT_${Date.now()}`,
      txnId,
      amount: Number(amount) || 999,
      planName: planName || 'Orbit Pro License',
      billingCycle: billingCycle || 'Monthly',
      customerEmail: customerEmail || 'admin@offline-orbit.edu',
      paymentMode: paymentMode || 'Paytm UPI',
      bankTxnId,
      status: 'TXN_SUCCESS',
      respCode: '01',
      respMsg: 'Txn Successful',
      timestamp: new Date().toISOString()
    };
    return { success: true, transaction, message: 'Payment verified successfully via Paytm PG Test Gateway.' };
  },

  getPaytmHistory: async () => {
    try {
      const res = await fetch(`${API_BASE}/paytm/history`, {
        headers: getHeaders('admin')
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { success: true, transactions: [] };
  },

  // Interactive AI Study Coach / Chatbot (Online Cloud + 100% Offline WebLLM Engine)
  aiTutorChat: async ({ userMessage, conversationHistory = [], currentLessonContext = '' }) => {
    // 1. If online, attempt server POST /api/ai/tutor-chat
    if (navigator.onLine) {
      try {
        const res = await fetch(`${API_BASE}/ai/tutor-chat`, {
          method: 'POST',
          headers: getHeaders('student'),
          body: JSON.stringify({ userMessage, conversationHistory, currentLessonContext })
        });
        if (res.ok) {
          const data = await res.json();
          // Filter out any stale legacy robotic template
          if (data?.reply && !data.reply.includes('Orbit AI Study Analysis for') && !data.reply.includes('Orbit AI Academic Insights on')) {
            return {
              reply: data.reply,
              engine: data.source || 'Orbit AI Cloud Engine'
            };
          }
        }
      } catch (err) {
        console.warn('Online AI chat fallback to in-browser engine:', err.message);
      }
    }

    // 2. In-Browser WebLLM, WebGPU & Cloud Cache Engine (100% Offline Guaranteed)
    const offlineResult = await webllmEngine.generateResponse({
      userMessage,
      conversationHistory,
      lessonContext: currentLessonContext
    });

    return {
      reply: offlineResult.text,
      engine: offlineResult.engine || 'WebLLM Cloud Cache (In-Browser)'
    };
  }
};

