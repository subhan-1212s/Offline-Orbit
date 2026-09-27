import express from 'express';
import { isUsingMongoDB } from '../config/db.js';
import Progress from '../models/Progress.js';
import User from '../models/User.js';
import Class from '../models/Class.js';
import { initialSeedData } from '../seed/seedData.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET /api/progress/student
router.get('/student', protect, async (req, res) => {
  try {
    let progress;
    if (isUsingMongoDB) {
      progress = await Progress.find({ userId: req.user._id });
    } else {
      progress = initialSeedData.progressData.filter(p => p.userId === req.user._id);
    }

    if (!progress || progress.length === 0) {
      progress = [initialSeedData.progressData[0]];
    }

    // Combine topic masteries
    const allTopicMastery = progress.flatMap(p => p.topicMastery || []);
    const allQuizAttempts = progress.flatMap(p => p.quizAttempts || []);

    res.json({
      userId: req.user._id,
      topicMastery: allTopicMastery,
      quizAttempts: allQuizAttempts,
      completedLessonsCount: progress.reduce((acc, p) => acc + (p.completedLessons?.length || 0), 0)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/progress/class/:classId (For Teacher Dashboard)
router.get('/class/:classId', protect, async (req, res) => {
  try {
    // Generate class analytics demo response
    const classData = {
      classId: req.params.classId,
      className: 'Grade 7 Science & Math (7A)',
      totalStudents: 24,
      classPulseAvg: 82,
      learnersNeedingSupport: [
        { id: 'u-101', name: 'Jordan Smith', needsReviewTopics: ['Linear Equations', 'Ratios'], lastSync: '2 hours ago' },
        { id: 'u-102', name: 'Samantha Wu', needsReviewTopics: ['Cell Biology'], lastSync: 'Yesterday' }
      ],
      conceptGaps: [
        { topic: 'Solving Two-Step Linear Equations', subject: 'Mathematics', strugglingCount: 9, percentageStruggling: 37.5 },
        { topic: 'Ecology & Energy Pyramids', subject: 'Science', strugglingCount: 6, percentageStruggling: 25.0 },
        { topic: 'Ratios & Unit Rates', subject: 'Mathematics', strugglingCount: 4, percentageStruggling: 16.6 },
        { topic: 'Photosynthesis & Stomata', subject: 'Science', strugglingCount: 2, percentageStruggling: 8.3 }
      ],
      topicMasteryDistribution: {
        mastered: 58,
        practising: 28,
        needsReview: 14
      },
      assignmentCompletion: [
        { assignment: 'Photosynthesis Lab', completed: 21, inProgress: 2, notStarted: 1 },
        { assignment: 'Ratios & Unit Speed Quiz', completed: 18, inProgress: 4, notStarted: 2 },
        { assignment: 'Ecology Review Quest', completed: 12, inProgress: 8, notStarted: 4 }
      ],
      activityByDay: [
        { day: 'Mon', activeStudents: 18, totalQuestionsAnswered: 140 },
        { day: 'Tue', activeStudents: 22, totalQuestionsAnswered: 195 },
        { day: 'Wed', activeStudents: 20, totalQuestionsAnswered: 160 },
        { day: 'Thu', activeStudents: 24, totalQuestionsAnswered: 220 },
        { day: 'Fri', activeStudents: 19, totalQuestionsAnswered: 155 },
        { day: 'Sat', activeStudents: 12, totalQuestionsAnswered: 90 },
        { day: 'Sun', activeStudents: 15, totalQuestionsAnswered: 110 }
      ]
    };

    res.json(classData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/progress/learner/:studentId (For Teacher Individual Learner View)
router.get('/learner/:studentId', protect, async (req, res) => {
  try {
    const studentData = {
      studentId: req.params.studentId,
      name: req.params.studentId === 'user-student-1' ? 'Maya Lin' : 'Jordan Smith',
      grade: 'Grade 7',
      preferredLanguage: 'en',
      syncStatus: 'Synced (10 mins ago)',
      offlinePacksDownloaded: 3,
      topicMastery: [
        { topic: 'Plant Biology & Energy Flow', status: 'mastered', scoreAvg: 92, lastPracticed: '2026-09-24' },
        { topic: 'Ratios & Unit Rates', status: 'mastered', scoreAvg: 88, lastPracticed: '2026-09-23' },
        { topic: 'Linear Equations', status: 'needs_review', scoreAvg: 58, lastPracticed: '2026-09-20' },
        { topic: 'Ecology & Ecosystems', status: 'practising', scoreAvg: 72, lastPracticed: '2026-09-22' }
      ],
      quizHistory: [
        { date: '2026-09-20', title: 'Grade 7 Diagnostic', score: 67 },
        { date: '2026-09-22', title: 'Ecology Unit Practice', score: 72 },
        { date: '2026-09-23', title: 'Ratios Quiz', score: 88 },
        { date: '2026-09-24', title: 'Photosynthesis Mastery', score: 92 }
      ],
      supportNotes: [
        'Demonstrates consistent daily effort! Struggled with inverse subtraction in linear equations; recommended step-by-step worked examples.'
      ]
    };

    res.json(studentData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
