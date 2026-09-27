import express from 'express';
import { sendStudentProgressReport } from '../services/emailService.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// POST /api/email/send-report
router.post('/send-report', protect, async (req, res) => {
  try {
    const { recipientEmail, studentName, summaryText, topicMastery } = req.body;

    if (!recipientEmail) {
      return res.status(400).json({ message: 'Recipient email address is required.' });
    }

    const result = await sendStudentProgressReport({
      studentName: studentName || 'Maya Lin',
      recipientEmail,
      summaryText: summaryText || 'Maya has achieved Mastery in Photosynthesis and is actively practising Ratios & Proportional Reasoning.',
      topicMastery: topicMastery || [
        { topic: 'Plant Biology & Energy Flow', status: 'mastered', scoreAvg: 92 },
        { topic: 'Ratios & Unit Rates', status: 'practising', scoreAvg: 74 },
        { topic: 'Linear Equations', status: 'needs_review', scoreAvg: 58 }
      ]
    });

    if (result.success) {
      res.json({
        success: true,
        message: `Progress report sent successfully to ${recipientEmail} via Brevo Email API!`,
        details: result
      });
    } else {
      res.status(500).json({
        success: false,
        message: `Failed to send email: ${result.error}`,
        details: result
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
