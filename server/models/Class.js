import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  className: { type: String, required: true },
  grade: { type: String, required: true },
  subject: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  teacherId: { type: String, required: true },
  studentIds: [{ type: String }],
  description: { type: String, default: '' },
  cooperativeGoal: {
    title: { type: String, default: 'Class 500 Questions Target' },
    target: { type: Number, default: 500 },
    current: { type: Number, default: 340 }
  },
  messages: [
    {
      id: { type: String },
      senderId: { type: String },
      senderName: { type: String },
      senderRole: { type: String },
      text: { type: String },
      attachedVideoId: { type: String, default: null },
      attachedVideoTitle: { type: String, default: null },
      timestamp: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

export default mongoose.models.Class || mongoose.model('Class', classSchema);
