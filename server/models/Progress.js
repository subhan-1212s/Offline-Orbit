import mongoose from 'mongoose';

const quizAttemptSchema = new mongoose.Schema({
  quizId: String,
  quizTitle: String,
  topic: String,
  score: Number,
  total: Number,
  percentage: Number,
  completedAt: { type: Date, default: Date.now },
  offlineSynced: { type: Boolean, default: false },
  syncTimestamp: Date
});

const progressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  subject: { type: String, required: true },
  topicMastery: [{
    topic: String,
    status: { type: String, enum: ['mastered', 'practising', 'needs_review'], default: 'practising' },
    scoreAvg: Number,
    lastPracticed: Date
  }],
  quizAttempts: [quizAttemptSchema],
  completedLessons: [String],
  downloadedPacks: [String]
}, { timestamps: true });

export default mongoose.models.Progress || mongoose.model('Progress', progressSchema);
