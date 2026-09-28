import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['student', 'independent', 'teacher'], 
    default: 'student' 
  },
  grade: { type: String, default: 'Grade 7' },
  subjects: [{ type: String }],
  preferredLanguage: { type: String, default: 'en' },
  goals: [{ type: String }],
  classIds: [{ type: String }],
  avatar: { type: String, default: '' },
  masteredTopicsCount: { type: Number, default: 0 },
  points: { type: Number, default: 120 },
  streakDays: { type: Number, default: 1 },
  lastActive: { type: Date, default: Date.now },
  badges: [{
    code: String,
    title: String,
    icon: String,
    earnedAt: Date
  }]
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
