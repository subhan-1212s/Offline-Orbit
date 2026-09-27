import express from 'express';
import { 
  generateLessonRecommendation, 
  generateExplainAnotherWay, 
  generateExtraPracticeQuestion, 
  generateStudyPlan, 
  generateTeacherContentDraft, 
  generateProgressSummary,
  generateTutorChatResponse,
  generateConceptBreakdown,
  generateCustomQuiz,
  generateFlashcards
} from '../services/aiService.js';
import { initialSeedData } from '../seed/seedData.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// POST /api/ai/recommend
router.post('/recommend', protect, async (req, res) => {
  try {
    const { progress } = req.body;
    const recommendation = await generateLessonRecommendation({
      user: req.user,
      progress,
      lessons: initialSeedData.lessons
    });
    res.json(recommendation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/ai/explain
router.post('/explain', async (req, res) => {
  try {
    const { sectionTitle, content, mode } = req.body;
    const result = await generateExplainAnotherWay({ sectionTitle, content, mode });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/ai/tutor-chat (Interactive AI Study Coach Chat)
router.post('/tutor-chat', async (req, res) => {
  try {
    const { userMessage, conversationHistory, currentLessonContext } = req.body;
    const result = await generateTutorChatResponse({ userMessage, conversationHistory, currentLessonContext });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/ai/concept-playground
router.post('/concept-playground', async (req, res) => {
  try {
    const { topic, query } = req.body;
    const result = await generateConceptBreakdown({ topic, query });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/ai/custom-quiz
router.post('/custom-quiz', async (req, res) => {
  try {
    const { topic, difficulty, questionCount } = req.body;
    const result = await generateCustomQuiz({ topic, difficulty, questionCount });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/ai/flashcards
router.post('/flashcards', async (req, res) => {
  try {
    const { topic } = req.body;
    const result = await generateFlashcards({ topic });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/ai/extra-practice
router.post('/extra-practice', async (req, res) => {
  try {
    const { lessonTitle, content } = req.body;
    const result = await generateExtraPracticeQuestion({ lessonTitle, content });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/ai/study-coach
router.post('/study-coach', protect, async (req, res) => {
  try {
    const { goal, availableMinutes } = req.body;
    const result = await generateStudyPlan({ goal, availableMinutes });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/ai/teacher-assistant
router.post('/teacher-assistant', protect, async (req, res) => {
  try {
    const { topic, targetGrade, contentType } = req.body;
    const result = await generateTeacherContentDraft({ topic, targetGrade, contentType });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/ai/summary
router.post('/summary', protect, async (req, res) => {
  try {
    const { type, name, progress } = req.body;
    const result = await generateProgressSummary({ type, name, progress });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
