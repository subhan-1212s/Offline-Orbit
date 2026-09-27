import express from 'express';
import { isUsingMongoDB } from '../config/db.js';
import Lesson from '../models/Lesson.js';
import Quiz from '../models/Quiz.js';
import { initialSeedData } from '../seed/seedData.js';

const router = express.Router();

// GET /api/lessons
router.get('/', async (req, res) => {
  try {
    const { subject, grade } = req.query;
    let lessons;

    if (isUsingMongoDB) {
      const filter = {};
      if (subject) filter.subject = subject;
      if (grade) filter.grade = grade;
      lessons = await Lesson.find(filter).sort({ orderIndex: 1 });
    } else {
      lessons = initialSeedData.lessons.filter(l => {
        if (subject && l.subject !== subject) return false;
        if (grade && l.grade !== grade) return false;
        return true;
      });
    }

    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/lessons/:id
router.get('/:id', async (req, res) => {
  try {
    let lesson;
    if (isUsingMongoDB) {
      lesson = await Lesson.findById(req.params.id);
    } else {
      lesson = initialSeedData.lessons.find(l => l._id === req.params.id);
    }

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/lessons/:id/pack (Complete offline pack bundle download)
router.get('/:id/pack', async (req, res) => {
  try {
    let lesson, quizzes;

    if (isUsingMongoDB) {
      lesson = await Lesson.findById(req.params.id);
      quizzes = await Quiz.find({ lessonId: req.params.id });
    } else {
      lesson = initialSeedData.lessons.find(l => l._id === req.params.id);
      quizzes = initialSeedData.quizzes.filter(q => q.lessonId === req.params.id || q._id === 'quiz-diagnostic-g7');
    }

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson pack not found' });
    }

    const packPayload = {
      packId: `pack-${lesson._id}`,
      downloadedAt: new Date().toISOString(),
      sizeKB: lesson.sizeKB || 420,
      lesson,
      quizzes,
      metadata: {
        version: '1.0',
        compatibleOffline: true,
        offlineStatus: 'Downloaded'
      }
    };

    res.json(packPayload);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
