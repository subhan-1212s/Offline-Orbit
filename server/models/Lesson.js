import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  id: String,
  title: String,
  content: String,
  audioUrl: String,
  videoPlaceholderUrl: String,
  keyTakeaways: [String],
  explanations: {
    simpler: String,
    stepByStep: String,
    workedExample: String,
    realWorld: String
  }
});

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  grade: { type: String, required: true },
  summary: { type: String, required: true },
  sizeKB: { type: Number, default: 450 },
  estimatedMinutes: { type: Number, default: 15 },
  orderIndex: { type: Number, default: 1 },
  sections: [sectionSchema],
  languageTranslations: {
    es: {
      title: String,
      summary: String,
      sections: [{ title: String, content: String, keyTakeaways: [String] }]
    },
    hi: {
      title: String,
      summary: String,
      sections: [{ title: String, content: String, keyTakeaways: [String] }]
    },
    fr: {
      title: String,
      summary: String,
      sections: [{ title: String, content: String, keyTakeaways: [String] }]
    }
  },
  isAIGenerated: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Lesson || mongoose.model('Lesson', lessonSchema);
