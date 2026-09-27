import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  id: String,
  questionText: String,
  options: [String],
  correctAnswerIndex: Number,
  misconceptionMap: {
    // Index mapping to specific misconception explanation
    type: Map,
    of: String
  },
  explanation: String,
  followUpQuestion: {
    questionText: String,
    options: [String],
    correctAnswerIndex: Number,
    explanation: String
  }
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lessonId: { type: String },
  topic: { type: String, required: true },
  subject: { type: String, required: true },
  grade: { type: String, required: true },
  type: { type: String, enum: ['diagnostic', 'lesson_quiz', 'review_challenge', 'daily_challenge'], default: 'lesson_quiz' },
  questions: [questionSchema]
}, { timestamps: true });

export default mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);
