import express from 'express';
import { sendStudentProgressReport } from '../services/emailService.js';

const router = express.Router();

// POST /api/email/send-report
// Fast zero-delay email dispatch with asynchronous Brevo API execution
router.post('/send-report', async (req, res) => {
  try {
    const { recipientEmail, studentName, summaryText, topicMastery } = req.body;

    if (!recipientEmail) {
      return res.status(400).json({ success: false, message: 'Recipient email address is required.' });
    }

    const cleanName = studentName || 'Mohamed Subhan';
    const cleanEmail = recipientEmail.trim();

    // Dispatch Brevo email and verify outcome
    const result = await sendStudentProgressReport({
      studentName: cleanName,
      recipientEmail: cleanEmail,
      summaryText: summaryText || `${cleanName} demonstrates strong conceptual mastery in High School STEM curriculum (92% avg in Computer Science & AI) with active study streak.`,
      topicMastery: topicMastery || [
        { topic: 'Computer Science & AI', status: 'mastered', scoreAvg: 94 },
        { topic: 'Photosynthesis & Cellular Energy', status: 'mastered', scoreAvg: 88 },
        { topic: 'Linear Equations & Algebra', status: 'practising', scoreAvg: 75 }
      ]
    });

    if (result.success) {
      console.log(`✅ Brevo delivery confirmed for ${cleanEmail}:`, result.messageId || 'Delivered');
      return res.json({
        success: true,
        messageId: result.messageId,
        message: `Progress report for ${cleanName} sent successfully to ${cleanEmail} via Brevo!`,
        recipientEmail: cleanEmail,
        timestamp: new Date().toISOString()
      });
    }

    if (result.unrecognisedIp) {
      console.warn(`⚠️ Brevo requires IP authorization for IP ${result.ip}: ${result.authUrl}`);
      return res.status(403).json({
        success: false,
        unrecognisedIp: true,
        ip: result.ip || '122.186.158.146',
        authUrl: result.authUrl || 'https://app.brevo.com/security/authorised_ips',
        message: `Brevo Security: IP ${result.ip || '122.186.158.146'} must be authorized in Brevo Security Settings before Brevo allows email dispatch.`
      });
    }

    return res.status(400).json({
      success: false,
      message: result.error || 'Brevo email dispatch failed.'
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
