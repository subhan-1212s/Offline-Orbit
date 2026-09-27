import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  iconName: { type: String, required: true },
  category: { type: String, enum: ['streak', 'mastery', 'quiz', 'download', 'community'], default: 'mastery' },
  requirementText: { type: String, required: true }
});

export default mongoose.models.Badge || mongoose.model('Badge', badgeSchema);
