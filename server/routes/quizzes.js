import express from 'express';
import { isUsingMongoDB } from '../config/db.js';
import Quiz from '../models/Quiz.js';
import Progress from '../models/Progress.js';
import { initialSeedData } from '../seed/seedData.js';
import { protect } from '../middleware/auth.js';
import { generateCustomQuiz } from '../services/questionBank.js';

const router = express.Router();

// GET /api/quizzes/diagnostic
router.get('/diagnostic', async (req, res) => {
  try {
    const { interestDomain, subLevel, educationLevel, retake, seed } = req.query;
    
    // Check if user info passed via query or demo header
    const domain = interestDomain || req.headers['x-interest-domain'] || 'Computer Science & AI';
    const level = subLevel || educationLevel || req.headers['x-education-level'] || 'Intermediate';

    const customQuiz = generateCustomQuiz({
      subject: domain,
      educationLevel: level,
      subLevel: level,
      isRetake: retake === 'true' || !!seed,
      seed: seed ? parseInt(seed) : Date.now()
    });

    res.json(customQuiz);
  } catch (err) {
    console.warn('Custom quiz generation error, using fallback:', err.message);
    const fallbackQuiz = initialSeedData.quizzes.find(q => q.type === 'diagnostic') || initialSeedData.quizzes[0];
    res.json(fallbackQuiz);
  }
});

// GET /api/quizzes/lesson/:lessonId
router.get('/lesson/:lessonId', async (req, res) => {
  try {
    const { retake, seed, interestDomain, subLevel } = req.query;
    const lessonId = req.params.lessonId;

    let targetSubject = 'Computer Science & AI';
    if (lessonId.includes('math')) targetSubject = 'Mathematics';
    else if (lessonId.includes('phy')) targetSubject = 'Physics';
    else if (lessonId.includes('bio')) targetSubject = 'Biology';
    else if (lessonId.includes('chem')) targetSubject = 'Chemistry';
    else if (interestDomain) targetSubject = interestDomain;

    const customQuiz = generateCustomQuiz({
      subject: targetSubject,
      educationLevel: subLevel || 'Intermediate',
      subLevel: subLevel || 'Intermediate',
      isRetake: retake === 'true' || !!seed,
      seed: seed ? parseInt(seed) : Date.now()
    });

    customQuiz._id = `quiz-lesson-${lessonId}`;
    customQuiz.lessonId = lessonId;
    customQuiz.title = `${targetSubject} Topic Quiz (${lessonId})`;

    res.json(customQuiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/quizzes/submit
router.post('/submit', protect, async (req, res) => {
  try {
    const { quizId, answers, isOfflineSync } = req.body;
    let quiz;

    if (isUsingMongoDB) {
      quiz = await Quiz.findById(quizId);
    } else {
      quiz = initialSeedData.quizzes.find(q => q._id === quizId) || initialSeedData.quizzes[0];
    }

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let score = 0;
    const total = quiz.questions.length;
    const feedbackList = [];

    quiz.questions.forEach((q, idx) => {
      const studentAnswerIndex = answers[q.id] !== undefined ? answers[q.id] : answers[idx];
      const isCorrect = studentAnswerIndex === q.correctAnswerIndex;
      if (isCorrect) score += 1;

      const misconception = !isCorrect && q.misconceptionMap 
        ? (q.misconceptionMap[studentAnswerIndex] || q.misconceptionMap.get?.(String(studentAnswerIndex)) || 'Review the core concept steps to fix this error.')
        : null;

      feedbackList.push({
        questionId: q.id,
        isCorrect,
        studentAnswerIndex,
        correctAnswerIndex: q.correctAnswerIndex,
        misconception,
        explanation: q.explanation,
        followUpQuestion: !isCorrect ? q.followUpQuestion : null
      });
    });

    const percentage = Math.round((score / total) * 100);
    const newMasteryStatus = percentage >= 80 ? 'mastered' : percentage >= 50 ? 'practising' : 'needs_review';

    // Record attempt
    const attemptRecord = {
      quizId: quiz._id,
      quizTitle: quiz.title,
      topic: quiz.topic,
      score,
      total,
      percentage,
      completedAt: new Date(),
      offlineSynced: true,
      syncTimestamp: new Date()
    };

    if (isUsingMongoDB) {
      let progress = await Progress.findOne({ userId: req.user._id, subject: quiz.subject });
      if (!progress) {
        progress = new Progress({
          userId: req.user._id,
          subject: quiz.subject,
          topicMastery: [{ topic: quiz.topic, status: newMasteryStatus, scoreAvg: percentage, lastPracticed: new Date() }],
          quizAttempts: [attemptRecord]
        });
      } else {
        progress.quizAttempts.push(attemptRecord);
        const existingTopic = progress.topicMastery.find(t => t.topic === quiz.topic);
        if (existingTopic) {
          existingTopic.status = newMasteryStatus;
          existingTopic.scoreAvg = Math.round((existingTopic.scoreAvg + percentage) / 2);
          existingTopic.lastPracticed = new Date();
        } else {
          progress.topicMastery.push({ topic: quiz.topic, status: newMasteryStatus, scoreAvg: percentage, lastPracticed: new Date() });
        }
      }
      await progress.save();
    } else {
      // In-Memory Progress Update
      let userProg = initialSeedData.progressData.find(p => p.userId === req.user._id);
      if (!userProg) {
        userProg = {
          userId: req.user._id,
          subject: quiz.subject,
          topicMastery: [{ topic: quiz.topic, status: newMasteryStatus, scoreAvg: percentage, lastPracticed: new Date().toISOString() }],
          quizAttempts: [],
          completedLessons: [quiz.lessonId],
          downloadedPacks: []
        };
        initialSeedData.progressData.push(userProg);
      }
      userProg.quizAttempts.push(attemptRecord);
      const existingT = userProg.topicMastery.find(t => t.topic === quiz.topic);
      if (existingT) {
        existingT.status = newMasteryStatus;
        existingT.scoreAvg = Math.round((existingT.scoreAvg + percentage) / 2);
        existingT.lastPracticed = new Date().toISOString();
      } else {
        userProg.topicMastery.push({ topic: quiz.topic, status: newMasteryStatus, scoreAvg: percentage, lastPracticed: new Date().toISOString() });
      }
    }

    res.json({
      score,
      total,
      percentage,
      masteryStatus: newMasteryStatus,
      feedbackList,
      attemptRecord
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
