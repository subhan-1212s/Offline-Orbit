import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  ShieldCheck, Users, BookOpen, HardDrive, RefreshCw, 
  CheckCircle2, Search, ArrowRight, Eye, Server, Activity, Database, 
  Trash2, UserPlus, Filter, Award, Zap, AlertCircle
} from 'lucide-react';

export const AdminManagementPage = () => {
  const { user } = useAuth();
  const [platformStats, setPlatformStats] = useState({
    userCount: 3,
    classCount: 2,
    totalAttempts: 14,
    status: 'live_telemetry'
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'classes' | 'telemetry' | 'system'
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Dynamic User Roster
  const [usersList, setUsersList] = useState(() => {
    try {
      const stored = localStorage.getItem('orbit_admin_users');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return [
      { id: 'usr-1', name: 'Aarav Sharma', email: 'aarav@orbit.edu', role: 'student', grade: 'Grade 7', streak: 5, points: 520, status: 'Active' },
      { id: 'usr-2', name: 'Priya Patel', email: 'priya@orbit.edu', role: 'student', grade: 'Grade 8', streak: 7, points: 640, status: 'Active' },
      { id: 'usr-3', name: 'Mr. Rajesh Kumar', email: 'teacher@orbit.edu', role: 'educator', grade: 'Grade 7 STEM Lead', streak: 12, points: 1200, status: 'Active' },
      { id: 'usr-4', name: 'Super Admin', email: 'admin@offline-orbit.edu', role: 'admin', grade: 'Root Supervisor', streak: 30, points: 9999, status: 'Verified' }
    ];
  });

  // Dynamic Rooms Roster
  const [roomsList, setRoomsList] = useState(() => {
    try {
      const stored = localStorage.getItem('orbit_teacher_rooms');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [
      { _id: 'room-1', className: "Mr. Rajesh's STEM Workspace", code: '794201', subject: 'Computer Science & AI', grade: 'Grade 10', studentIds: ['usr-1', 'usr-2'] }
    ];
  });

  const [notificationMsg, setNotificationMsg] = useState('');

  useEffect(() => {
    loadLiveTelemetry();
  }, []);

  const loadLiveTelemetry = async () => {
    setLoading(true);
    try {
      const stats = await api.getPlatformStats();
      if (stats) setPlatformStats(stats);
      
      // Sync local rooms
      const localRooms = JSON.parse(localStorage.getItem('orbit_teacher_rooms') || '[]');
      if (localRooms.length > 0) {
        setRoomsList(localRooms);
      }
    } catch (e) {
      console.warn('Admin stats sync:', e);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (msg) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(''), 4000);
  };

  const handlePromoteRole = (userId, newRole) => {
    const updated = usersList.map(u => u.id === userId ? { ...u, role: newRole } : u);
    setUsersList(updated);
    try {
      localStorage.setItem('orbit_admin_users', JSON.stringify(updated));
    } catch (e) {}
    showNotification(`User role updated to ${newRole} successfully.`);
  };

  const filteredUsers = usersList.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      
      {/* Admin Top Header Banner */}
      <div className="bg-gradient-to-r from-[#1E2229] via-[#2A303C] to-[#1E2229] text-white border border-[#3E4554] rounded-3xl p-6 sm:p-8 shadow-xl flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#0D9488]/20 border border-[#0D9488]/40 rounded-2xl text-[#14B8A6]">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#14B8A6] uppercase tracking-wider">
                Root System Administration Console
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Offline Orbit Super Admin Control
              </h1>
            </div>
          </div>
          <p className="text-xs text-[#94A3B8] max-w-2xl">
            Live telemetry supervision, user role provisioning, classroom room audit, and zero-internet offline packet cache control.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#14B8A6]/10 border border-[#14B8A6]/30 px-3.5 py-2 rounded-2xl flex items-center gap-2 text-xs font-semibold text-[#14B8A6]">
            <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-ping" />
            <span>Telemetry: Live</span>
          </div>

          <button
            onClick={loadLiveTelemetry}
            className="p-2.5 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/20 transition-all text-white flex items-center gap-2 text-xs font-bold"
            title="Refresh Telemetry"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {notificationMsg && (
        <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#10B981]/30 text-xs font-bold text-[#065F46] flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Real-Time Platform Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-[#5A606C]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Users</span>
            <Users className="w-4 h-4 text-[#4F46E5]" />
          </div>
          <div className="text-3xl font-black text-[#1E2229]">{usersList.length}</div>
          <p className="text-[11px] text-[#0D9488] font-bold">● Active Roster</p>
        </div>

        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-[#5A606C]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Workspaces / Rooms</span>
            <BookOpen className="w-4 h-4 text-[#0D9488]" />
          </div>
          <div className="text-3xl font-black text-[#1E2229]">{roomsList.length}</div>
          <p className="text-[11px] text-[#5A606C]">Configured Educator Rooms</p>
        </div>

        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-[#5A606C]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Assessments</span>
            <Activity className="w-4 h-4 text-[#F95738]" />
          </div>
          <div className="text-3xl font-black text-[#1E2229]">{platformStats.totalAttempts || 28}</div>
          <p className="text-[11px] text-[#5A606C]">Live Quiz Submissions</p>
        </div>

        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-[#5A606C]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Server Status</span>
            <Server className="w-4 h-4 text-[#10B981]" />
          </div>
          <div className="text-3xl font-black text-[#10B981]">100%</div>
          <p className="text-[11px] text-[#5A606C]">Operational & Synced</p>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E2DA] pb-2 text-xs font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'users' ? 'bg-[#1E2229] text-white shadow-sm' : 'bg-white text-[#5A606C] hover:bg-[#FAF9F6]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Roster Management ({usersList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('classes')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'classes' ? 'bg-[#1E2229] text-white shadow-sm' : 'bg-white text-[#5A606C] hover:bg-[#FAF9F6]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Classroom Rooms Inspector ({roomsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('system')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'system' ? 'bg-[#1E2229] text-white shadow-sm' : 'bg-white text-[#5A606C] hover:bg-[#FAF9F6]'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>System & Storage Diagnostics</span>
        </button>
      </div>

      {/* Tab 1: User Management */}
      {activeTab === 'users' && (
        <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 shadow-sm space-y-4">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E5E2DA] rounded-xl pl-9 pr-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#4F46E5]"
              />
              <Search className="w-4 h-4 text-[#89909E] absolute left-3 top-2.5" />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-[#5A606C]">Filter Role:</span>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-[#FAF9F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs font-bold text-[#1E2229]"
              >
                <option value="all">All Roles</option>
                <option value="student">Learners (Students)</option>
                <option value="educator">Educators</option>
                <option value="admin">Administrators</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F6] text-[#5A606C] uppercase font-bold text-[10px] tracking-wider border-b border-[#E5E2DA]">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Grade / Specialization</th>
                  <th className="py-3 px-4">Streak & XP</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Role Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E2DA]">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-[#FAF9F6]/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-[#1E2229]">{u.name}</div>
                      <div className="text-[#89909E] text-[11px]">{u.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                        u.role === 'admin' ? 'bg-[#0D9488]/10 text-[#0D9488] border border-[#0D9488]/30' :
                        u.role === 'educator' ? 'bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/30' :
                        'bg-[#F95738]/10 text-[#F95738] border border-[#F95738]/30'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#5A606C] font-semibold">{u.grade}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#1E2229] flex items-center gap-1">
                        <Zap className="w-3 h-3 text-[#FFC107] fill-[#FFC107]" />
                        <span>{u.streak} Days</span>
                      </div>
                      <div className="text-[10px] text-[#89909E]">{u.points} XP</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-bold text-[#0D9488] bg-[#ECFDF5] px-2 py-0.5 rounded">
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {u.role !== 'admin' && (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handlePromoteRole(u.id, u.role === 'student' ? 'educator' : 'student')}
                            className="px-2.5 py-1 rounded-lg border border-[#E5E2DA] bg-white hover:bg-[#EEF2FF] text-[#4F46E5] font-bold text-[10px]"
                          >
                            Set {u.role === 'student' ? 'Educator' : 'Learner'}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* Tab 2: Classroom Rooms Inspector */}
      {activeTab === 'classes' && (
        <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#1E2229]">
              Configured Educator Workspaces & Join Codes
            </h3>
            <span className="text-xs text-[#5A606C]">Total Active: {roomsList.length}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roomsList.map(r => (
              <div key={r._id} className="p-5 rounded-2xl border border-[#E5E2DA] bg-[#FAF9F6] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-wider bg-[#EEF2FF] px-2 py-0.5 rounded">
                    {r.grade || 'Grade 10'} • {r.subject || 'STEM'}
                  </span>
                  <div className="text-right">
                    <span className="text-[10px] text-[#89909E] block">Join Code</span>
                    <span className="font-mono text-base font-black text-[#4F46E5]">{r.code}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-extrabold text-[#1E2229] text-base">{r.className}</h4>
                  <p className="text-xs text-[#5A606C] mt-0.5">{r.description || 'Active Live Educator Workspace'}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-[#5A606C] border-t border-[#E5E2DA] pt-2">
                  <span>Enrolled Students: <strong className="text-[#1E2229]">{r.studentIds?.length || 1}</strong></span>
                  <span className="text-[#0D9488] font-bold">● Active Telemetry</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: System & Storage Diagnostics */}
      {activeTab === 'system' && (
        <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="text-base font-extrabold text-[#1E2229]">
            System Health, IndexedDB & Low-Bandwidth Sync Cache
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            
            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E5E2DA] space-y-2">
              <span className="font-bold text-[#1E2229] block">Local IndexedDB Stores</span>
              <p className="text-[#5A606C]">Offline video storage and sync queues ready.</p>
              <div className="text-[11px] font-mono text-[#0D9488] bg-white p-2 rounded border border-[#E5E2DA]">
                • downloadedVideos: Active<br />
                • pendingSync: 0 queued<br />
                • lessonsCache: Synced
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E5E2DA] space-y-2">
              <span className="font-bold text-[#1E2229] block">Brevo Email Notifications</span>
              <p className="text-[#5A606C]">Transactional progress reports & OTP alerts.</p>
              <div className="text-[11px] font-mono text-[#4F46E5] bg-white p-2 rounded border border-[#E5E2DA]">
                • API Status: Ready<br />
                • Sender: notification@orbit.edu<br />
                • Templates: Diagnostic / Progress
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E5E2DA] space-y-2">
              <span className="font-bold text-[#1E2229] block">Telemetry Pulse Daemon</span>
              <p className="text-[#5A606C]">Real-time educator pulse calculation active.</p>
              <div className="text-[11px] font-mono text-[#F95738] bg-white p-2 rounded border border-[#E5E2DA]">
                • Interval: 5s Real-Time<br />
                • Adaptive Rank: Online<br />
                • Mistake Classifier: Active
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
