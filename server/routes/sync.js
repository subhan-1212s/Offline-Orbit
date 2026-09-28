import express from 'express';
import { isUsingMongoDB } from '../config/db.js';
import Progress from '../models/Progress.js';
import { initialSeedData } from '../seed/seedData.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// POST /api/sync/queue
router.post('/queue', protect, async (req, res) => {
  try {
    const { offlineAttempts } = req.body;

    if (!offlineAttempts || !Array.isArray(offlineAttempts) || offlineAttempts.length === 0) {
      return res.json({ syncedCount: 0, message: 'No pending items to sync.' });
    }

    let syncedCount = 0;
    const syncedRecords = [];
    const userId = req.user?._id || 'user-student-1';

    for (const attempt of offlineAttempts) {
      const syncedAttempt = {
        quizId: attempt.quizId || `quiz-${Date.now()}`,
        quizTitle: attempt.quizTitle || 'Offline Quiz Attempt',
        topic: attempt.topic || 'General Topic',
        score: Number(attempt.score || 0),
        total: Number(attempt.total || 1),
        percentage: attempt.total ? Math.round((Number(attempt.score || 0) / Number(attempt.total || 1)) * 100) : 100,
        completedAt: attempt.timestamp || new Date(),
        offlineSynced: true,
        syncTimestamp: new Date()
      };

      if (isUsingMongoDB) {
        let progress = await Progress.findOne({ userId, subject: attempt.subject || 'Science' });
        if (!progress) {
          progress = new Progress({
            userId,
            subject: attempt.subject || 'Science',
            topicMastery: [{ topic: attempt.topic || 'General Topic', status: 'mastered', scoreAvg: syncedAttempt.percentage, lastPracticed: new Date() }],
            quizAttempts: [syncedAttempt]
          });
          await progress.save();
          syncedCount += 1;
          syncedRecords.push(syncedAttempt);
        } else {
          // Check for duplicate attempt by quizId & completion time
          const isDuplicate = (progress.quizAttempts || []).some(q => 
            q.quizId === syncedAttempt.quizId && 
            Math.abs(new Date(q.completedAt).getTime() - new Date(syncedAttempt.completedAt).getTime()) < 60000
          );
          if (!isDuplicate) {
            progress.quizAttempts.push(syncedAttempt);
            await progress.save();
            syncedCount += 1;
            syncedRecords.push(syncedAttempt);
          }
        }
      } else {
        let userProg = initialSeedData.progressData.find(p => p.userId === userId);
        if (!userProg) {
          userProg = {
            userId,
            subject: attempt.subject || 'Science',
            topicMastery: [{ topic: attempt.topic || 'General Topic', status: 'mastered', scoreAvg: syncedAttempt.percentage, lastPracticed: new Date().toISOString() }],
            quizAttempts: []
          };
          initialSeedData.progressData.push(userProg);
        }
        
        // Deduplicate in seed memory
        const isDuplicate = (userProg.quizAttempts || []).some(q => 
          q.quizId === syncedAttempt.quizId && 
          Math.abs(new Date(q.completedAt || q.timestamp).getTime() - new Date(syncedAttempt.completedAt).getTime()) < 60000
        );
        if (!isDuplicate) {
          userProg.quizAttempts.push(syncedAttempt);
          syncedCount += 1;
          syncedRecords.push(syncedAttempt);
        }
      }
    }

    res.json({
      syncedCount,
      message: `Successfully synchronized ${syncedCount} offline quiz attempt(s) with MongoDB backend!`,
      syncedRecords,
      syncedAt: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
