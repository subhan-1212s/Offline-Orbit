import mongoose from 'mongoose';

const passwordResetSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, trim: true, index: true },
  code: { type: String, required: true, trim: true },
  expiresAt: { type: Date, required: true }
}, { timestamps: true });

// TTL index to automatically purge expired verification codes
passwordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.PasswordReset || mongoose.model('PasswordReset', passwordResetSchema);
