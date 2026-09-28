import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { ConceptGapsChart } from '../components/charts/ConceptGapsChart';
import { AssignmentCompletionChart } from '../components/charts/AssignmentCompletionChart';
import { 
  BookOpen, Users, AlertTriangle, Sparkles, CheckCircle2, 
  PlusCircle, RefreshCw, FileText, ArrowRight, Eye, Copy, MessageSquare, Send, Film, Key 
} from 'lucide-react';

export const TeacherDashboardPage = ({ onSelectStudent }) => {
  const { user } = useAuth();
  const [classData, setClassData] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [loading, setLoading] = useState(true);

  // New Room Creation Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomGrade, setNewRoomGrade] = useState('Grade 10');
  const [newRoomSubject, setNewRoomSubject] = useState('Computer Science');
  const [creatingRoom, setCreatingRoom] = useState(false);

  // Room Chat State
  const [chatMessage, setChatMessage] = useState('');
  const [selectedVideoAttach, setSelectedVideoAttach] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // AI Assistant Draft State
  const [draftTopic, setDraftTopic] = useState('Photosynthesis');
  const [draftType, setDraftType] = useState('quiz');
  const [draftResult, setDraftResult] = useState(null);
  const [draftLoading, setDraftLoading] = useState(false);
  const [assignedMessage, setAssignedMessage] = useState('');

  useEffect(() => {
    loadClassData();
    loadMyRooms();
  }, []);

  const loadClassData = async () => {
    setLoading(true);
    try {
      const data = await api.getClassAnalytics('class-7a');
      setClassData(data);
    } catch (err) {
      console.warn('Class analytics error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMyRooms = async () => {
    try {
      const myRooms = await api.getMyClasses();
      setRooms(myRooms || []);
      if (myRooms && myRooms.length > 0 && !activeRoomId) {
        setActiveRoomId(myRooms[0]._id);
      }
    } catch (err) {
      console.warn('Load rooms error:', err);
    }
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    setCreatingRoom(true);
    try {
      const room = await api.createClass({
        className: newRoomName || 'New STEM Workspace Room',
        grade: newRoomGrade,
        subject: newRoomSubject,
        description: 'Interactive Educator Workspace & Real-Time Classroom'
      });
      await loadMyRooms();
      setActiveRoomId(room._id);
      setShowCreateModal(false);
      setNewRoomName('');
    } catch (err) {
      console.error('Create room err:', err);
    } finally {
      setCreatingRoom(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatMessage.trim() && !selectedVideoAttach) return;
    try {
      let videoTitle = null;
      if (selectedVideoAttach === 'lesson-cs-1') videoTitle = 'Computer Science: Algorithms & Data Structures';
      else if (selectedVideoAttach === 'lesson-1') videoTitle = 'Photosynthesis & Cellular Energy';

      const updatedMessages = await api.sendRoomMessage(activeRoomId || 'class-7a', {
        text: chatMessage,
        attachedVideoId: selectedVideoAttach || null,
        attachedVideoTitle: videoTitle
      });

      setChatMessage('');
      setSelectedVideoAttach('');
      
      // Update local room messages
      setRooms(prev => prev.map(r => r._id === activeRoomId ? { ...r, messages: updatedMessages } : r));
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerateAIDraft = async () => {
    setDraftLoading(true);
    setAssignedMessage('');
    try {
      const res = await api.aiTeacherAssistant({
        topic: draftTopic,
        targetGrade: 'Grade 7',
        contentType: draftType
      });
      setDraftResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setDraftLoading(false);
    }
  };

  const activeRoom = rooms.find(r => r._id === activeRoomId) || rooms[0] || {
    _id: 'class-7a',
    className: 'Grade 10 CS & AI Alpha Room',
    code: '794201',
    messages: []
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(activeRoom.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <RefreshCw className="w-8 h-8 text-[#4F46E5] animate-spin mx-auto mb-3" />
        <p className="text-xs font-bold text-[#5A606C]">Loading Educator Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      
      {/* Teacher Dashboard Header */}
      <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#4F46E5]" />
            <h2 className="text-2xl font-extrabold text-[#1E2229]">
              Welcome, {user?.name || 'Educator'}!
            </h2>
          </div>
          <p className="text-xs text-[#5A606C] mt-1">
            <span className="font-bold text-[#4F46E5]">{user?.educatorCategory || 'Educator'}</span> • {user?.institutionName || 'Offline Orbit Academy'} ({user?.subjectTaught || user?.specialization || 'STEM'})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-coral text-xs py-2.5 px-4 shadow-sm bg-[#4F46E5] hover:bg-[#4338CA]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Classroom Room</span>
          </button>
        </div>
      </div>

      {/* Classroom Workspaces / Groups / Rooms Bar */}
      <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-[#E5E2DA] pb-3">
          <div>
            <h3 className="text-lg font-extrabold text-[#1E2229] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#4F46E5]" /> Educator Classroom Workspaces & Rooms
            </h3>
            <p className="text-xs text-[#5A606C]">Share 6-digit room code with students to track progress and chat in real time.</p>
          </div>
        </div>

        {/* Room Switcher Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {rooms.map(room => (
            <button
              key={room._id}
              onClick={() => setActiveRoomId(room._id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeRoomId === room._id
                  ? 'bg-[#EEF2FF] text-[#4F46E5] border border-[#4F46E5]/40 shadow-xs'
                  : 'bg-[#FAF9F6] text-[#5A606C] border border-[#E5E2DA] hover:bg-[#F3F1EC]'
              }`}
            >
              <span>🏫 {room.className}</span>
              <span className="font-mono bg-white px-2 py-0.5 rounded text-[10px] border">Code: {room.code}</span>
            </button>
          ))}
        </div>

        {/* Active Room Header & 6-Digit Join Code Box */}
        {activeRoom && (
          <div className="bg-[#FAF9F6] border border-[#E5E2DA] rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-extrabold text-[#4F46E5] uppercase tracking-wider">Active Workspace Room</span>
              <h4 className="text-xl font-extrabold text-[#1E2229] mt-0.5">{activeRoom.className}</h4>
              <p className="text-xs text-[#5A606C] mt-1">{activeRoom.description || 'Classroom Room'}</p>
            </div>

            {/* 6-Digit Code Badge Card */}
            <div className="bg-white border-2 border-[#4F46E5]/30 rounded-2xl p-3 px-5 text-center shadow-md flex items-center gap-4">
              <div>
                <span className="text-[10px] font-extrabold text-[#89909E] uppercase tracking-wider block">Student 6-Digit Join Code</span>
                <span className="font-mono text-2xl font-extrabold text-[#4F46E5] tracking-widest">{activeRoom.code}</span>
              </div>

              <button
                onClick={copyCodeToClipboard}
                className="p-2 rounded-xl bg-[#EEF2FF] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white transition-colors text-xs font-bold flex items-center gap-1"
                title="Copy Code"
              >
                <Copy className="w-4 h-4" />
                <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Real-Time Classroom Room Chat with Video Attachment Sharing */}
        <div className="bg-[#FAF9F6] border border-[#E5E2DA] rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 border-b border-[#E5E2DA] pb-2">
            <MessageSquare className="w-4 h-4 text-[#4F46E5]" />
            <h4 className="font-bold text-xs text-[#1E2229] uppercase tracking-wider">
              Real-Time Classroom Chat & Video Sharing ({activeRoom?.className})
            </h4>
          </div>

          {/* Messages Feed */}
          <div className="h-48 overflow-y-auto space-y-3 p-3 bg-white border border-[#E5E2DA] rounded-xl text-xs">
            {(activeRoom.messages || []).map((msg) => (
              <div 
                key={msg.id || Math.random()} 
                className={`p-3 rounded-2xl max-w-[85%] ${
                  msg.senderRole === 'educator' 
                    ? 'bg-[#EEF2FF] text-[#1E2229] border border-[#4F46E5]/20 ml-auto' 
                    : 'bg-[#FAF9F6] text-[#1E2229] border border-[#E5E2DA]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-bold text-[#4F46E5] mb-1">
                  <span>{msg.senderName}</span>
                  <span className="text-[#89909E] font-normal">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                <p className="leading-relaxed">{msg.text}</p>

                {/* Shared Video Attachment Badge */}
                {msg.attachedVideoId && (
                  <div className="mt-2 p-2 rounded-xl bg-white border border-[#4F46E5]/40 flex items-center justify-between gap-2 text-xs font-bold text-[#4F46E5]">
                    <div className="flex items-center gap-1.5">
                      <Film className="w-4 h-4 text-[#F95738]" />
                      <span>{msg.attachedVideoTitle || 'Shared STEM Video Lesson'}</span>
                    </div>
                    <span className="text-[10px] bg-[#F95738] text-white px-2 py-0.5 rounded-full">Attached Video</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Chat Post Input Form */}
          <form onSubmit={handleSendMessage} className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type real-time message to classroom..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 bg-white border border-[#E5E2DA] rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#4F46E5]"
              />

              <select
                value={selectedVideoAttach}
                onChange={(e) => setSelectedVideoAttach(e.target.value)}
                className="bg-white border border-[#E5E2DA] rounded-xl p-2.5 text-xs font-semibold text-[#5A606C]"
              >
                <option value="">Attach Video Lesson...</option>
                <option value="lesson-cs-1">🎬 Computer Science: Algorithms & Data Structures</option>
                <option value="lesson-1">🌿 Photosynthesis & Plant Energy</option>
              </select>

              <button
                type="submit"
                className="p-2.5 bg-[#4F46E5] text-white rounded-xl hover:bg-[#4338CA] transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Top Metrics Cards */}
      {/* Top Metrics Cards - Real-time Room & Student Values */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-[#89909E] uppercase tracking-wider">Class Mastery Pulse</span>
          <div className="text-3xl font-extrabold text-[#0D9488] mt-1">{classData?.classPulseAvg || 82}%</div>
          <p className="text-[11px] text-[#5A606C] mt-1">Average across active modules</p>
        </div>

        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-[#89909E] uppercase tracking-wider">Learners Needing Support</span>
          <div className="text-3xl font-extrabold text-[#D97706] mt-1">{classData?.learnersNeedingSupport?.length || 1}</div>
          <p className="text-[11px] text-[#5A606C] mt-1">Private supportive reviews</p>
        </div>

        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-[#89909E] uppercase tracking-wider">Students Enrolled</span>
          <div className="text-3xl font-extrabold text-[#4F46E5] mt-1">{activeRoom?.studentIds?.length || 1}</div>
          <p className="text-[11px] text-[#5A606C] mt-1">Room {activeRoom?.code || '794201'} active roster</p>
        </div>

        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-[#89909E] uppercase tracking-wider">Active Classroom Rooms</span>
          <div className="text-3xl font-extrabold text-[#F95738] mt-1">{rooms.length || 1}</div>
          <p className="text-[11px] text-[#5A606C] mt-1">Live workspaces configured</p>
        </div>

      </div>

      {/* Main Grid: Concept Gaps + Assignment Progress */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Concept Gaps Ranked Chart */}
        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-extrabold text-[#1E2229]">Class Concept Gaps</h3>
              <p className="text-xs text-[#5A606C]">Ranked topics where learners struggle most.</p>
            </div>
            <AlertTriangle className="w-5 h-5 text-[#F95738]" />
          </div>
          <ConceptGapsChart data={classData?.conceptGaps} />
        </div>

        {/* Assignment Completion Chart */}
        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-extrabold text-[#1E2229]">Assignment Completion</h3>
              <p className="text-xs text-[#5A606C]">Status breakdown across current modules.</p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-[#0D9488]" />
          </div>
          <AssignmentCompletionChart data={classData?.assignmentCompletion} />
        </div>

      </div>

      {/* Learners Needing Support (Private, Non-Shaming) */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-extrabold text-[#1E2229] mb-1">Learners Recommended for Targeted Support</h3>
        <p className="text-xs text-[#5A606C] mb-4">
          Private, supportive insights to guide one-on-one assistance without public rankings or shame.
        </p>

        <div className="space-y-3">
          {(classData?.learnersNeedingSupport || []).map((student) => (
            <div 
              key={student.id} 
              onClick={() => onSelectStudent(student.id)}
              className="p-4 rounded-xl border border-[#E5E2DA] bg-[#FAF9F6] hover:bg-white hover:border-[#D4CF0] cursor-pointer flex flex-wrap items-center justify-between gap-3 transition-all"
            >
              <div>
                <h4 className="font-bold text-[#1E2229] text-sm">{student.name}</h4>
                <p className="text-xs text-[#5A606C] mt-0.5">
                  Concept Gaps: <span className="font-semibold text-[#F95738]">{student.needsReviewTopics?.join(', ')}</span>
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-[#89909E]">{student.lastSync}</span>
                <button className="btn-outline text-xs py-1 px-3 bg-white">
                  <Eye className="w-3.5 h-3.5 text-[#4F46E5]" />
                  <span>Inspect Student Analytics</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Classroom Room Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E2DA] pb-3">
              <h3 className="font-extrabold text-lg text-[#1E2229]">Create Classroom Workspace Room</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-[#89909E] hover:text-[#1E2229]">✕</button>
            </div>

            <form onSubmit={handleCreateRoom} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#1E2229] mb-1">Room / Workspace Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grade 10 CS & AI Alpha"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-[#E5E2DA] rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#4F46E5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#1E2229] mb-1">Grade Level</label>
                  <select
                    value={newRoomGrade}
                    onChange={(e) => setNewRoomGrade(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#E5E2DA] rounded-xl p-2.5 text-xs font-semibold focus:outline-none"
                  >
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11-12">Grade 11-12</option>
                    <option value="Undergraduate">Undergraduate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E2229] mb-1">Subject</label>
                  <select
                    value={newRoomSubject}
                    onChange={(e) => setNewRoomSubject(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#E5E2DA] rounded-xl p-2.5 text-xs font-semibold focus:outline-none"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Biology">Biology</option>
                    <option value="Chemistry">Chemistry</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={creatingRoom}
                className="w-full btn-coral text-xs py-3 bg-[#4F46E5] hover:bg-[#4338CA] shadow-md justify-center mt-2"
              >
                <span>{creatingRoom ? 'Generating 6-Digit Code...' : 'Create Room & Generate 6-Digit Code'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
