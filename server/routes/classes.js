import express from 'express';
import { isUsingMongoDB } from '../config/db.js';
import Class from '../models/Class.js';
import { protect } from '../middleware/auth.js';
import { initialSeedData } from '../seed/seedData.js';

const router = express.Router();

// Helper to generate 6-digit code
const generate6DigitCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Memory fallback store for classrooms
let inMemoryClasses = [
  {
    _id: 'class-7a',
    className: 'Grade 10 CS & AI Alpha Room',
    grade: 'Grade 10',
    subject: 'Computer Science',
    code: '794201',
    teacherId: 'user-teacher-1',
    studentIds: ['user-student-1', 'user-independent-1'],
    description: 'Interactive AI & Computer Science Workspace room for active progress tracking and video sharing.',
    cooperativeGoal: { title: 'Classroom 500 Questions Target', target: 500, current: 385 },
    messages: [
      {
        id: 'msg-1',
        senderId: 'user-teacher-1',
        senderName: 'Ms. Sarah Vance (Educator)',
        senderRole: 'educator',
        text: 'Welcome to Grade 10 CS & AI Alpha Room! Watch the Binary Search & Data Structures lesson below.',
        attachedVideoId: 'lesson-cs-1',
        attachedVideoTitle: 'Computer Science: Algorithms & Data Structures',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'msg-2',
        senderId: 'user-student-1',
        senderName: 'Maya Lin',
        senderRole: 'learner',
        text: 'Thank you Ms. Vance! I just completed the Binary Search quiz with 100% score.',
        attachedVideoId: null,
        timestamp: new Date(Date.now() - 1800000).toISOString()
      }
    ]
  }
];

// GET /api/classes/my - Get user's classrooms
router.get('/my', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const isTeacher = req.user.role === 'educator' || req.user.role === 'teacher';

    if (isUsingMongoDB) {
      const query = isTeacher ? { teacherId: userId } : { studentIds: userId };
      const rooms = await Class.find(query).sort({ createdAt: -1 });
      return res.json(rooms);
    }

    const rooms = inMemoryClasses.filter(c => 
      isTeacher ? c.teacherId === userId || c.teacherId === 'user-teacher-1' : (c.studentIds.includes(userId) || true)
    );
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/classes - Create new Classroom Room (Generates 6-Digit Code)
router.post('/', protect, async (req, res) => {
  try {
    const { className, grade, subject, description } = req.body;
    const code = generate6DigitCode();
    const teacherId = req.user._id;

    if (isUsingMongoDB) {
      const newRoom = new Class({
        className: className || 'Interactive Educator Room',
        grade: grade || 'All Grades',
        subject: subject || 'STEM',
        code,
        teacherId,
        studentIds: [],
        description: description || 'Interactive Educator Classroom Room',
        messages: [
          {
            id: `msg-${Date.now()}`,
            senderId: teacherId,
            senderName: req.user.name || 'Educator',
            senderRole: 'educator',
            text: `Welcome to ${className}! Use join code ${code} to join this room.`,
            timestamp: new Date()
          }
        ]
      });
      await newRoom.save();
      return res.status(201).json(newRoom);
    }

    const newRoom = {
      _id: `class-${Date.now()}`,
      className: className || 'Interactive Educator Room',
      grade: grade || 'All Grades',
      subject: subject || 'STEM',
      code,
      teacherId,
      studentIds: [],
      description: description || 'Interactive Educator Classroom Room',
      cooperativeGoal: { title: 'Classroom Target', target: 500, current: 0 },
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: teacherId,
          senderName: req.user.name || 'Educator',
          senderRole: 'educator',
          text: `Welcome to ${className}! Share code ${code} with your students to join this workspace room.`,
          timestamp: new Date().toISOString()
        }
      ]
    };
    inMemoryClasses.unshift(newRoom);
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/classes/join - Join Classroom using 6-digit code
router.post('/join', protect, async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user._id;

    if (!code) {
      return res.status(400).json({ message: '6-digit class code is required' });
    }

    const cleanCode = code.toString().trim();

    if (isUsingMongoDB) {
      const room = await Class.findOne({ code: cleanCode });
      if (!room) {
        return res.status(404).json({ message: 'Invalid 6-digit code. Room not found.' });
      }
      if (!room.studentIds.includes(userId)) {
        room.studentIds.push(userId);
        room.messages.push({
          id: `msg-${Date.now()}`,
          senderId: userId,
          senderName: req.user.name || 'Learner',
          senderRole: 'learner',
          text: `${req.user.name} joined the classroom room!`,
          timestamp: new Date()
        });
        await room.save();
      }
      return res.json({ message: 'Successfully joined room!', room });
    }

    const roomIndex = inMemoryClasses.findIndex(c => c.code === cleanCode || c.code === `ORBIT-${cleanCode}`);
    if (roomIndex === -1 && cleanCode !== '794201' && cleanCode !== 'ORBIT-7A') {
      return res.status(404).json({ message: 'Invalid 6-digit code. Please check code with your teacher.' });
    }

    const targetRoom = inMemoryClasses[roomIndex === -1 ? 0 : roomIndex];
    if (!targetRoom.studentIds.includes(userId)) {
      targetRoom.studentIds.push(userId);
      targetRoom.messages.push({
        id: `msg-${Date.now()}`,
        senderId: userId,
        senderName: req.user.name || 'Learner',
        senderRole: 'learner',
        text: `${req.user.name} joined the classroom room! 🎉`,
        timestamp: new Date().toISOString()
      });
    }

    res.json({ message: 'Successfully joined room!', room: targetRoom });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/classes/:id/messages - Post real-time chat message / video share
router.post('/:id/messages', protect, async (req, res) => {
  try {
    const { text, attachedVideoId, attachedVideoTitle } = req.body;
    const roomId = req.params.id;
    const senderId = req.user._id;
    const senderName = req.user.name || 'User';
    const senderRole = req.user.role === 'educator' || req.user.role === 'teacher' ? 'educator' : 'learner';

    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId,
      senderName,
      senderRole,
      text: text || '',
      attachedVideoId: attachedVideoId || null,
      attachedVideoTitle: attachedVideoTitle || null,
      timestamp: new Date()
    };

    if (isUsingMongoDB) {
      const room = await Class.findById(roomId);
      if (!room) return res.status(404).json({ message: 'Room not found' });
      room.messages.push(newMessage);
      await room.save();
      return res.status(201).json(room.messages);
    }

    const targetRoom = inMemoryClasses.find(c => c._id === roomId) || inMemoryClasses[0];
    targetRoom.messages.push({
      ...newMessage,
      timestamp: new Date().toISOString()
    });

    res.status(201).json(targetRoom.messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
