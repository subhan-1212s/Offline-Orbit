import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { PaytmGatewayModal } from '../components/PaytmGatewayModal';
import { 
  ShieldCheck, Users, BookOpen, HardDrive, RefreshCw, 
  CheckCircle2, Search, ArrowRight, Eye, Server, Activity, Database, 
  Trash2, UserPlus, Filter, Award, Zap, AlertCircle, CreditCard,
  TrendingUp, BarChart2, Check, Clock, ExternalLink, Download, FileText,
  Smartphone, Wallet, Building, CheckCircle, X, AlertTriangle
} from 'lucide-react';

export const AdminManagementPage = () => {
  const { user } = useAuth();
  const [platformStats, setPlatformStats] = useState({
    userCount: 4,
    classCount: 2,
    totalAttempts: 28,
    status: 'live_telemetry'
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'analytics' | 'billing' | 'classes' | 'system'
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Dynamic User Roster
  const [usersList, setUsersList] = useState(() => {
    try {
      const stored = localStorage.getItem('orbit_admin_users');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return [
      { 
        id: 'usr-1', 
        name: 'Aarav Sharma', 
        email: 'aarav@orbit.edu', 
        role: 'student', 
        grade: 'Grade 7 STEM', 
        streak: 5, 
        points: 520, 
        status: 'Active Now',
        lastLogin: 'Today, 11:20 PM',
        analytics: {
          masteryScore: 84,
          quizzesAttempted: 14,
          accuracyRate: 88,
          studyTimeHours: 12.5,
          topics: [
            { name: 'Computer Science & AI', score: 92, status: 'Mastered' },
            { name: 'Photosynthesis & Plant Energy', score: 85, status: 'Mastered' },
            { name: 'Newtonian Physics & Vectors', score: 76, status: 'Proficient' },
            { name: 'Chemical Reactions & Stoichiometry', score: 64, status: 'Needs Review' }
          ],
          misconceptions: [
            'Confuses O(n) linear search vs O(log n) binary search in unsorted lists',
            'Guard cell osmotic pressure vs transpiration stomata regulation'
          ],
          recentAttempts: [
            { quiz: 'Photosynthesis Diagnostic', score: 9, total: 10, date: '28 Sep 2026' },
            { quiz: 'Algorithms & Big O Benchmark', score: 10, total: 10, date: '27 Sep 2026' },
            { quiz: 'Newtonian Mechanics Quiz', score: 7, total: 10, date: '25 Sep 2026' }
          ]
        }
      },
      { 
        id: 'usr-2', 
        name: 'Priya Patel', 
        email: 'priya@orbit.edu', 
        role: 'student', 
        grade: 'Grade 8 High School', 
        streak: 7, 
        points: 640, 
        status: 'Active Today',
        lastLogin: 'Today, 09:45 PM',
        analytics: {
          masteryScore: 91,
          quizzesAttempted: 18,
          accuracyRate: 94,
          studyTimeHours: 16.2,
          topics: [
            { name: 'Computer Science & AI', score: 96, status: 'Mastered' },
            { name: 'Photosynthesis & Plant Energy', score: 90, status: 'Mastered' },
            { name: 'Newtonian Physics & Vectors', score: 88, status: 'Mastered' },
            { name: 'Chemical Reactions & Stoichiometry', score: 82, status: 'Proficient' }
          ],
          misconceptions: [
            'Endothermic enthalpy vs activation energy equilibrium in chemical reactions'
          ],
          recentAttempts: [
            { quiz: 'Chemical Stoichiometry Test', score: 8, total: 10, date: '28 Sep 2026' },
            { quiz: 'Cellular Energy & ATP Quiz', score: 10, total: 10, date: '26 Sep 2026' }
          ]
        }
      },
      { 
        id: 'usr-3', 
        name: 'Mr. Rajesh Kumar', 
        email: 'teacher@orbit.edu', 
        role: 'educator', 
        grade: 'Grade 7 STEM Lead Teacher', 
        streak: 12, 
        points: 1200, 
        status: 'Active Now',
        lastLogin: 'Today, 11:32 PM',
        analytics: {
          masteryScore: 98,
          quizzesAttempted: 35,
          accuracyRate: 99,
          studyTimeHours: 42.0,
          topics: [
            { name: 'Curriculum Management', score: 100, status: 'Mastered' },
            { name: 'Diagnostic Assessments Gen', score: 98, status: 'Mastered' },
            { name: 'Student Telemetry Auditing', score: 95, status: 'Mastered' }
          ],
          misconceptions: [],
          recentAttempts: [
            { quiz: 'Grade 10 STEM Diagnostic Creator', score: 10, total: 10, date: '28 Sep 2026' }
          ]
        }
      },
      { 
        id: 'usr-4', 
        name: 'Dr. Ananya Sengupta', 
        email: 'ananya.stem@orbit.edu', 
        role: 'educator', 
        grade: 'College Physics Professor', 
        streak: 9, 
        points: 980, 
        status: 'Active Yesterday',
        lastLogin: 'Yesterday, 04:15 PM',
        analytics: {
          masteryScore: 97,
          quizzesAttempted: 24,
          accuracyRate: 98,
          studyTimeHours: 31.5,
          topics: [
            { name: 'Newtonian Dynamics', score: 100, status: 'Mastered' },
            { name: 'Wave Optics & Thermodynamics', score: 96, status: 'Mastered' }
          ],
          misconceptions: [],
          recentAttempts: [
            { quiz: 'Thermodynamics Advanced Exam', score: 10, total: 10, date: '27 Sep 2026' }
          ]
        }
      },
      { 
        id: 'usr-5', 
        name: 'Super Admin', 
        email: 'admin@offline-orbit.edu', 
        role: 'admin', 
        grade: 'Root System Supervisor', 
        streak: 30, 
        points: 9999, 
        status: 'Verified Session',
        lastLogin: 'Just Now',
        analytics: {
          masteryScore: 100,
          quizzesAttempted: 50,
          accuracyRate: 100,
          studyTimeHours: 85.0,
          topics: [
            { name: 'System Security & Telemetry', score: 100, status: 'Mastered' },
            { name: 'Platform Database & Sync', score: 100, status: 'Mastered' }
          ],
          misconceptions: [],
          recentAttempts: []
        }
      }
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

  // Modals & Interactivity State
  const [userToDelete, setUserToDelete] = useState(null);
  const [selectedUserForAnalytics, setSelectedUserForAnalytics] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState('');

  // Paytm Subscription & Billing State
  const [billingCycle, setBillingCycle] = useState('Yearly'); // 'Monthly' | 'Yearly'
  const [paytmModalOpen, setPaytmModalOpen] = useState(false);
  const [selectedPlanForPaytm, setSelectedPlanForPaytm] = useState(null);

  // Active Subscription Plan in storage
  const [activeSubscription, setActiveSubscription] = useState(() => {
    try {
      const stored = localStorage.getItem('orbit_active_subscription');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return {
      name: 'Orbit Campus & School Institutional License',
      billingCycle: 'Yearly',
      amount: 8999,
      status: 'Active (Paytm Verified)',
      renewsOn: '28 September 2027',
      seatsAllocated: 500,
      seatsUsed: 4
    };
  });

  // Paytm Billing History
  const [paytmHistory, setPaytmHistory] = useState(() => {
    try {
      const stored = localStorage.getItem('orbit_paytm_txns');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return [
      {
        orderId: 'ORD_ORBIT_INIT_8912',
        txnId: 'PTM2026092077123910',
        amount: 8999,
        planName: 'Orbit Campus & School Institutional License',
        billingCycle: 'Yearly',
        paymentMode: 'Paytm UPI (admin@paytm)',
        bankTxnId: '427189043211',
        status: 'TXN_SUCCESS',
        date: '20 Sep 2026, 10:15 AM'
      }
    ];
  });

  useEffect(() => {
    loadLiveTelemetry();
  }, []);

  const loadLiveTelemetry = async () => {
    setLoading(true);
    try {
      const stats = await api.getPlatformStats();
      if (stats) setPlatformStats(stats);
      
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

  // Remove User Handler
  const handleConfirmRemoveUser = () => {
    if (!userToDelete) return;

    if (userToDelete.role === 'admin' || userToDelete.email === 'admin@offline-orbit.edu') {
      alert('Cannot delete the root Super Administrator account.');
      setUserToDelete(null);
      return;
    }

    const updated = usersList.filter(u => u.id !== userToDelete.id);
    setUsersList(updated);
    try {
      localStorage.setItem('orbit_admin_users', JSON.stringify(updated));
    } catch (e) {}

    showNotification(`User "${userToDelete.name}" (${userToDelete.email}) was permanently removed from the website.`);
    setUserToDelete(null);
  };

  // Role Promotion / Toggle
  const handlePromoteRole = (userId, newRole) => {
    const updated = usersList.map(u => u.id === userId ? { ...u, role: newRole } : u);
    setUsersList(updated);
    try {
      localStorage.setItem('orbit_admin_users', JSON.stringify(updated));
    } catch (e) {}
    showNotification(`User role updated to ${newRole} successfully.`);
  };

  // Handle Paytm Payment Success Callback
  const handlePaytmPaymentSuccess = (txn) => {
    const updatedHistory = [
      {
        orderId: txn.orderId,
        txnId: txn.txnId,
        amount: txn.amount,
        planName: txn.planName,
        billingCycle: txn.billingCycle,
        paymentMode: txn.paymentMode,
        bankTxnId: txn.bankTxnId,
        status: 'TXN_SUCCESS',
        date: new Date(txn.timestamp).toLocaleString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      },
      ...paytmHistory
    ];

    setPaytmHistory(updatedHistory);
    try {
      localStorage.setItem('orbit_paytm_txns', JSON.stringify(updatedHistory));
    } catch (e) {}

    const expiryDate = new Date();
    if (txn.billingCycle === 'Yearly') {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    } else {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    }

    const newSub = {
      name: txn.planName,
      billingCycle: txn.billingCycle,
      amount: txn.amount,
      status: 'Active (Paytm Verified)',
      renewsOn: expiryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      seatsAllocated: txn.planName.includes('Enterprise') ? 5000 : txn.planName.includes('Campus') ? 500 : 50,
      seatsUsed: usersList.length
    };

    setActiveSubscription(newSub);
    try {
      localStorage.setItem('orbit_active_subscription', JSON.stringify(newSub));
    } catch (e) {}

    showNotification(`🎉 Paytm Payment Successful! Platform upgraded to ${txn.planName} (${txn.billingCycle}).`);
  };

  // User Counts Breakdown
  const totalUsersCount = usersList.length;
  const learnerCount = usersList.filter(u => u.role === 'student' || u.role === 'learner').length;
  const educatorCount = usersList.filter(u => u.role === 'educator' || u.role === 'teacher').length;
  const adminCount = usersList.filter(u => u.role === 'admin').length;

  const filteredUsers = usersList.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || 
                        (roleFilter === 'student' && (u.role === 'student' || u.role === 'learner')) ||
                        (roleFilter === 'educator' && (u.role === 'educator' || u.role === 'teacher')) ||
                        (roleFilter === 'admin' && u.role === 'admin');
    return matchesSearch && matchesRole;
  });

  // Website Subscription Plans
  const SUBSCRIPTION_PLANS = [
    {
      id: 'plan-pro',
      name: 'Orbit Pro Learner & Educator Pass',
      tagline: 'Ideal for independent educators, tutoring centers & self-directed learners',
      monthlyPrice: 299,
      yearlyPrice: 2499,
      seats: 'Up to 25 Active Learners',
      features: [
        'Full 2-Minute Masterclass Video Narration Library',
        'AI Concept Playground & Diagnostic Quiz Generator',
        '100% Offline SD Card & IndexedDB Video Sync',
        'Brevo Email Notifications & Progress Badges'
      ],
      badge: 'Popular for Tutors'
    },
    {
      id: 'plan-academic',
      name: 'Orbit Campus & School Institutional License',
      tagline: 'Standard license for K-12 schools, high schools & colleges',
      monthlyPrice: 999,
      yearlyPrice: 8999,
      seats: 'Up to 500 Active Learners & 20 Educators',
      features: [
        'All Orbit Pro Features Included',
        'Multi-Educator Workspaces & 6-Digit Join Codes',
        'Real-Time Student Misconception Heatmaps & Telemetry',
        'Admin Role Governance, User Removal & Audit Logs',
        'Priority Low-Bandwidth Edge Packet Generator'
      ],
      badge: 'Most Popular / Recommended',
      isPopular: true
    },
    {
      id: 'plan-enterprise',
      name: 'Enterprise District & Multi-Campus License',
      tagline: 'Comprehensive solution for school chains, universities & state educational districts',
      monthlyPrice: 2499,
      yearlyPrice: 22999,
      seats: 'Unlimited Learners, Educators & Admins',
      features: [
        'All Institutional Features with Zero Seat Limits',
        'Custom Offline Hardware Appliance Appliance Preloading',
        'Automated Brevo Institutional Telemetry Reports',
        'Dedicated 24/7 Academic Engineering Support & SLA',
        'White-Label Institution Portal Branding'
      ],
      badge: 'District Scale'
    }
  ];

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
          <p className="text-xs text-[#94A3B8] max-w-2xl leading-relaxed">
            Live telemetry supervision, user roster management (learners & educators), in-depth student analytics audit, user deletion controls, and Paytm platform subscription billing.
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
        <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#10B981]/30 text-xs font-bold text-[#065F46] flex items-center gap-2 shadow-sm animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Real-Time Platform Counters (Total Users, Learners, Educators, Subscription) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Total Users */}
        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-[#5A606C]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Active Users</span>
            <Users className="w-4 h-4 text-[#1E2229]" />
          </div>
          <div className="text-3xl font-black text-[#1E2229]">{totalUsersCount}</div>
          <p className="text-[11px] text-[#0D9488] font-bold">● {totalUsersCount} Registered on Platform</p>
        </div>

        {/* Learners (Students) */}
        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-[#5A606C]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Learners (Students)</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#F95738]" />
          </div>
          <div className="text-3xl font-black text-[#F95738]">{learnerCount}</div>
          <p className="text-[11px] text-[#5A606C]">Active STEM Students</p>
        </div>

        {/* Educators (Teachers) */}
        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-[#5A606C]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Educators (Teachers)</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]" />
          </div>
          <div className="text-3xl font-black text-[#4F46E5]">{educatorCount}</div>
          <p className="text-[11px] text-[#5A606C]">Classroom Instructors</p>
        </div>

        {/* Active Subscription Status */}
        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-[#5A606C]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Platform License</span>
            <CreditCard className="w-4 h-4 text-[#00BAF2]" />
          </div>
          <div className="text-sm font-black text-[#002970] truncate">
            {activeSubscription.name.split(' ')[0]} {activeSubscription.name.split(' ')[1]}
          </div>
          <p className="text-[11px] text-[#21C17A] font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Paytm Verified ({activeSubscription.billingCycle})
          </p>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E2DA] pb-2 text-xs font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'users' ? 'bg-[#1E2229] text-white shadow-sm' : 'bg-white text-[#5A606C] hover:bg-[#FAF9F6]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Roster & Deletion ({usersList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'analytics' ? 'bg-[#1E2229] text-white shadow-sm' : 'bg-white text-[#5A606C] hover:bg-[#FAF9F6]'
          }`}
        >
          <BarChart2 className="w-4 h-4 text-[#F95738]" />
          <span>Detailed User Analytics & Mastery</span>
        </button>

        <button
          onClick={() => setActiveTab('billing')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'billing' ? 'bg-[#002970] text-white shadow-sm' : 'bg-white text-[#002970] hover:bg-[#F0FBFF] border border-[#00BAF2]/30'
          }`}
        >
          <CreditCard className="w-4 h-4 text-[#00BAF2]" />
          <span>Paytm Subscriptions & Billing (Monthly/Yearly)</span>
        </button>

        <button
          onClick={() => setActiveTab('classes')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'classes' ? 'bg-[#1E2229] text-white shadow-sm' : 'bg-white text-[#5A606C] hover:bg-[#FAF9F6]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Educator Rooms ({roomsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('system')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'system' ? 'bg-[#1E2229] text-white shadow-sm' : 'bg-white text-[#5A606C] hover:bg-[#FAF9F6]'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Diagnostics</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: User Management (Remove User & Role Filtering) */}
      {/* ========================================================================= */}
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
              <span className="text-xs font-bold text-[#5A606C]">Filter By Role:</span>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-[#FAF9F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs font-bold text-[#1E2229] focus:outline-none"
              >
                <option value="all">All Roles ({totalUsersCount})</option>
                <option value="student">Learners / Students ({learnerCount})</option>
                <option value="educator">Educators / Teachers ({educatorCount})</option>
                <option value="admin">Administrators ({adminCount})</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F6] text-[#5A606C] uppercase font-bold text-[10px] tracking-wider border-b border-[#E5E2DA]">
                <tr>
                  <th className="py-3 px-4">User Details</th>
                  <th className="py-3 px-4">Platform Role</th>
                  <th className="py-3 px-4">Grade / Category</th>
                  <th className="py-3 px-4">Activity & Streak</th>
                  <th className="py-3 px-4">Mastery</th>
                  <th className="py-3 px-4 text-right">Actions</th>
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
                        (u.role === 'educator' || u.role === 'teacher') ? 'bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/30' :
                        'bg-[#F95738]/10 text-[#F95738] border border-[#F95738]/30'
                      }`}>
                        {u.role === 'student' ? 'Learner' : u.role}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-[#5A606C] font-semibold">{u.grade}</td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#1E2229] flex items-center gap-1">
                        <Zap className="w-3 h-3 text-[#FFC107] fill-[#FFC107]" />
                        <span>{u.streak} Days</span>
                      </div>
                      <div className="text-[10px] text-[#0D9488] font-semibold">{u.status}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-[#E5E2DA] h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-[#0D9488] h-full rounded-full" 
                            style={{ width: `${u.analytics?.masteryScore || 75}%` }}
                          />
                        </div>
                        <span className="font-bold text-[#1E2229]">{u.analytics?.masteryScore || 75}%</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Inspect Analytics Button */}
                        <button
                          onClick={() => setSelectedUserForAnalytics(u)}
                          className="px-2.5 py-1.5 rounded-lg border border-[#E5E2DA] bg-white hover:bg-[#FAF9F6] text-[#1E2229] font-bold text-[11px] flex items-center gap-1 shadow-2xs"
                          title="View In-Depth Learning Analytics"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#4F46E5]" />
                          <span>Analytics</span>
                        </button>

                        {/* Promote / Switch Role */}
                        {u.role !== 'admin' && (
                          <button
                            onClick={() => handlePromoteRole(u.id, (u.role === 'student' || u.role === 'learner') ? 'educator' : 'student')}
                            className="px-2 py-1.5 rounded-lg border border-[#E5E2DA] bg-white hover:bg-[#EEF2FF] text-[#4F46E5] font-bold text-[11px]"
                            title="Toggle between Learner and Educator"
                          >
                            {(u.role === 'student' || u.role === 'learner') ? 'Make Educator' : 'Make Learner'}
                          </button>
                        )}

                        {/* Remove User Button */}
                        {u.role !== 'admin' ? (
                          <button
                            onClick={() => setUserToDelete(u)}
                            className="p-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                            title="Remove User from Website"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <span className="text-[10px] font-bold text-[#89909E] px-2 py-1 bg-[#FAF9F6] rounded">
                            Protected
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: In-Depth User Analytics Overview */}
      {/* ========================================================================= */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-xl font-extrabold text-[#1E2229]">Detailed Learner & Educator Analytics</h3>
              <p className="text-xs text-[#5A606C] mt-0.5">
                Audit individual learner mastery scores, topic proficiencies, misconception alerts, and time spent.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {usersList.filter(u => u.role !== 'admin').map((u) => (
                <div key={u.id} className="p-5 rounded-2xl border border-[#E5E2DA] bg-[#FAF9F6] space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                        u.role === 'educator' ? 'bg-[#4F46E5]/10 text-[#4F46E5]' : 'bg-[#F95738]/10 text-[#F95738]'
                      }`}>
                        {u.role === 'student' ? 'Learner' : u.role}
                      </span>
                      <span className="text-[11px] font-bold text-[#0D9488]">{u.status}</span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-[#1E2229] text-base">{u.name}</h4>
                      <p className="text-xs text-[#89909E]">{u.email} • {u.grade}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-xl border border-[#E5E2DA] text-center text-xs">
                      <div>
                        <span className="text-[10px] text-[#89909E] uppercase block">Mastery</span>
                        <span className="font-black text-[#0D9488] text-sm">{u.analytics?.masteryScore || 80}%</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#89909E] uppercase block">Quizzes</span>
                        <span className="font-black text-[#1E2229] text-sm">{u.analytics?.quizzesAttempted || 12}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#89909E] uppercase block">Accuracy</span>
                        <span className="font-black text-[#4F46E5] text-sm">{u.analytics?.accuracyRate || 90}%</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedUserForAnalytics(u)}
                    className="w-full py-2.5 px-3 rounded-xl bg-white border border-[#E5E2DA] hover:bg-[#F3F1EC] text-xs font-bold text-[#1E2229] flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span>View Complete Analytics Profile</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: Paytm Payment Options (Monthly or Yearly) & Live Gateway */}
      {/* ========================================================================= */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          
          {/* Active Platform Plan Overview Banner */}
          <div className="bg-gradient-to-br from-[#002970] via-[#003B99] to-[#002970] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#00BAF2]/30 flex flex-wrap items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-[#21C17A] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  Paytm Verified Active License
                </span>
                <span className="bg-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-full">
                  Official Institution Plan
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black">{activeSubscription.name}</h2>
              <p className="text-xs text-white/80 max-w-xl">
                Authorized academic license with offline SD syncing, multi-educator rooms, and AI diagnostic engines. Renews on: <strong>{activeSubscription.renewsOn}</strong>.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs border border-white/20 p-4 rounded-2xl text-right">
              <span className="text-[10px] text-white/70 block uppercase font-bold">Seats In Use</span>
              <div className="text-2xl font-black text-white">{usersList.length} / {activeSubscription.seatsAllocated}</div>
              <span className="text-[11px] text-[#00BAF2] font-bold block mt-1">Paytm Payment Gateway Active</span>
            </div>
          </div>

          {/* Billing Cycle Frequency Toggle (Monthly vs Yearly) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-[#E5E2DA] rounded-2xl p-4 shadow-sm">
            <div>
              <h3 className="font-extrabold text-sm text-[#1E2229]">Select Platform Subscription & Billing Frequency</h3>
              <p className="text-xs text-[#5A606C]">Switch between monthly and yearly billing options with Paytm test gateway.</p>
            </div>

            <div className="flex items-center gap-2 bg-[#FAF9F6] p-1.5 rounded-2xl border border-[#E5E2DA]">
              <button
                type="button"
                onClick={() => setBillingCycle('Monthly')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                  billingCycle === 'Monthly' 
                    ? 'bg-[#002970] text-white shadow-sm' 
                    : 'text-[#5A606C] hover:text-[#1E2229]'
                }`}
              >
                Monthly Billing
              </button>

              <button
                type="button"
                onClick={() => setBillingCycle('Yearly')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  billingCycle === 'Yearly' 
                    ? 'bg-[#00BAF2] text-white shadow-sm font-extrabold' 
                    : 'text-[#5A606C] hover:text-[#1E2229]'
                }`}
              >
                <span>Yearly Billing</span>
                <span className="bg-[#21C17A] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase">
                  Save 25%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Tiers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUBSCRIPTION_PLANS.map((plan) => {
              const price = billingCycle === 'Yearly' ? plan.yearlyPrice : plan.monthlyPrice;
              return (
                <div 
                  key={plan.id}
                  className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all bg-white border shadow-sm relative ${
                    plan.isPopular 
                      ? 'border-[#00BAF2] ring-2 ring-[#00BAF2]/30 shadow-lg' 
                      : 'border-[#E5E2DA]'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#002970] text-[#00BAF2] text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-sm tracking-wider border border-[#00BAF2]/40">
                      {plan.badge}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-black text-[#1E2229]">{plan.name}</h4>
                      <p className="text-xs text-[#5A606C] mt-1 leading-snug">{plan.tagline}</p>
                    </div>

                    <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-[#E5E2DA]">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-[#002970]">₹{price}</span>
                        <span className="text-xs text-[#5A606C] font-bold">/ {billingCycle === 'Yearly' ? 'year' : 'month'}</span>
                      </div>
                      <span className="text-[11px] font-bold text-[#0D9488] block mt-1">
                        {plan.seats}
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-xs text-[#1E2229] pt-2">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#21C17A] shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPlanForPaytm(plan);
                        setPaytmModalOpen(true);
                      }}
                      className="w-full py-3.5 px-4 rounded-2xl font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 bg-[#00BAF2] hover:bg-[#009ED0] text-white hover:scale-[1.01]"
                    >
                      <span className="font-bold tracking-tight">Paytm</span>
                      <span>Pay ₹{price} ({billingCycle})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="text-[10px] text-center text-[#89909E] block mt-2">
                      Simulated Paytm Test API Handshake & Instant Digital Invoice
                    </span>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Paytm Transaction History Card */}
          <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-[#1E2229] flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#00BAF2]" />
                  <span>Paytm Payment Receipts & Billing History</span>
                </h3>
                <p className="text-xs text-[#5A606C]">Verified Paytm gateway transaction logs for this institution.</p>
              </div>
              <span className="text-xs font-bold text-[#0D9488]">● {paytmHistory.length} Transactions</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF9F6] text-[#5A606C] uppercase font-bold text-[10px] tracking-wider border-b border-[#E5E2DA]">
                  <tr>
                    <th className="py-3 px-4">Paytm Txn ID</th>
                    <th className="py-3 px-4">Subscription Plan</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Instrument</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E2DA]">
                  {paytmHistory.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF9F6]">
                      <td className="py-3 px-4 font-mono font-bold text-[#002970]">{item.txnId}</td>
                      <td className="py-3 px-4 font-bold text-[#1E2229]">{item.planName}</td>
                      <td className="py-3 px-4 font-black text-[#1E2229]">₹{item.amount}.00</td>
                      <td className="py-3 px-4 text-[#5A606C]">{item.paymentMode}</td>
                      <td className="py-3 px-4 text-[#5A606C]">{item.date}</td>
                      <td className="py-3 px-4">
                        <span className="bg-[#ECFDF5] text-[#21C17A] border border-[#21C17A]/30 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 w-max">
                          <Check className="w-3 h-3" /> Paid (Success)
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: Educator Workspaces / Rooms */}
      {/* ========================================================================= */}
      {activeTab === 'classes' && (
        <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-[#1E2229]">
                Configured Educator Workspaces & Join Codes
              </h3>
              <p className="text-xs text-[#5A606C]">Live collaborative rooms configured by educators.</p>
            </div>
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

      {/* ========================================================================= */}
      {/* TAB 5: Diagnostics */}
      {/* ========================================================================= */}
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
              <span className="font-bold text-[#1E2229] block">Paytm PG Gateway Status</span>
              <p className="text-[#5A606C]">Test merchant key & simulated checksum verified.</p>
              <div className="text-[11px] font-mono text-[#00BAF2] bg-white p-2 rounded border border-[#E5E2DA]">
                • Merchant ID: OFFLINEORBIT_TEST<br />
                • Environment: Sandbox<br />
                • UPI / Wallet / NetBanking: Ready
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: Confirm Remove User Modal */}
      {/* ========================================================================= */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E5E2DA] space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-red-600">
              <div className="p-3 bg-red-100 rounded-2xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#1E2229]">Confirm Remove User</h3>
                <span className="text-xs text-red-600 font-semibold">Irreversible Action</span>
              </div>
            </div>

            <p className="text-xs text-[#5A606C] leading-relaxed">
              Are you sure you want to remove <strong>{userToDelete.name}</strong> (<span className="text-[#1E2229]">{userToDelete.email}</span>)?
              <br /><br />
              This will permanently delete their account profile, assessment records, learning streak, and remove them from all enrolled classroom workspaces.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setUserToDelete(null)}
                className="py-2.5 px-4 rounded-xl border border-[#E5E2DA] text-xs font-bold text-[#5A606C] hover:bg-[#FAF9F6]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmRemoveUser}
                className="py-2.5 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove User</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: User In-Depth Analytics Modal */}
      {/* ========================================================================= */}
      {selectedUserForAnalytics && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E5E2DA] space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E5E2DA] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#EEFDFB] border border-[#0D9488]/30 flex items-center justify-center text-lg font-black text-[#0D9488]">
                  {selectedUserForAnalytics.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-[#1E2229]">{selectedUserForAnalytics.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-[#5A606C]">
                    <span>{selectedUserForAnalytics.email}</span>
                    <span>•</span>
                    <span className="font-bold text-[#4F46E5]">{selectedUserForAnalytics.grade}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedUserForAnalytics(null)}
                className="p-2 text-[#89909E] hover:text-[#1E2229] rounded-xl hover:bg-[#FAF9F6]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-[#EEFDFB] border border-[#0D9488]/30 p-3 rounded-2xl">
                <span className="text-[10px] font-bold text-[#0D9488] uppercase block">Overall Mastery</span>
                <span className="text-2xl font-black text-[#0D9488]">
                  {selectedUserForAnalytics.analytics?.masteryScore || 85}%
                </span>
              </div>

              <div className="bg-[#FAF9F6] border border-[#E5E2DA] p-3 rounded-2xl">
                <span className="text-[10px] font-bold text-[#5A606C] uppercase block">Quizzes Taken</span>
                <span className="text-2xl font-black text-[#1E2229]">
                  {selectedUserForAnalytics.analytics?.quizzesAttempted || 12}
                </span>
              </div>

              <div className="bg-[#EEF2FF] border border-[#4F46E5]/30 p-3 rounded-2xl">
                <span className="text-[10px] font-bold text-[#4F46E5] uppercase block">First-Pass Accuracy</span>
                <span className="text-2xl font-black text-[#4F46E5]">
                  {selectedUserForAnalytics.analytics?.accuracyRate || 90}%
                </span>
              </div>

              <div className="bg-[#FFFBEB] border border-[#FDE68A] p-3 rounded-2xl">
                <span className="text-[10px] font-bold text-[#B45309] uppercase block">Daily Streak</span>
                <span className="text-2xl font-black text-[#B45309]">
                  {selectedUserForAnalytics.streak} Days
                </span>
              </div>
            </div>

            {/* Topic Mastery Bars */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-[#1E2229] uppercase tracking-wider flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-[#0D9488]" />
                <span>Curriculum Topic Breakdown</span>
              </h4>

              <div className="space-y-2.5">
                {(selectedUserForAnalytics.analytics?.topics || [
                  { name: 'Computer Science & AI', score: 92, status: 'Mastered' },
                  { name: 'Photosynthesis & Plant Energy', score: 85, status: 'Mastered' },
                  { name: 'Newtonian Physics & Vectors', score: 76, status: 'Proficient' }
                ]).map((top, idx) => (
                  <div key={idx} className="bg-[#FAF9F6] p-3 rounded-xl border border-[#E5E2DA] space-y-1 text-xs">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-[#1E2229]">{top.name}</span>
                      <span className="text-[#0D9488]">{top.score}% ({top.status})</span>
                    </div>
                    <div className="w-full bg-[#E5E2DA] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0D9488] h-full rounded-full transition-all" style={{ width: `${top.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Misconceptions & Diagnostics */}
            {selectedUserForAnalytics.analytics?.misconceptions?.length > 0 && (
              <div className="bg-[#FFF0ED] border border-[#F95738]/30 rounded-2xl p-4 space-y-2">
                <span className="text-xs font-bold text-[#F95738] flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>Misconceptions Flagged by Diagnostic Engine</span>
                </span>
                <ul className="text-xs text-[#1E2229] space-y-1 list-disc list-inside">
                  {selectedUserForAnalytics.analytics.misconceptions.map((m, mIdx) => (
                    <li key={mIdx}>{m}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recent Assessments */}
            {selectedUserForAnalytics.analytics?.recentAttempts?.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#1E2229] block">Recent Quiz Submissions</span>
                <div className="space-y-1.5">
                  {selectedUserForAnalytics.analytics.recentAttempts.map((att, aIdx) => (
                    <div key={aIdx} className="p-2.5 rounded-xl border border-[#E5E2DA] bg-[#FAF9F6] flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#1E2229]">{att.quiz}</span>
                        <p className="text-[11px] text-[#89909E]">{att.date}</p>
                      </div>
                      <span className="font-black text-[#0D9488] bg-[#EEFDFB] px-2.5 py-1 rounded-lg">
                        {att.score} / {att.total}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedUserForAnalytics(null)}
                className="btn-coral text-xs py-2 px-5 bg-[#1E2229] hover:bg-[#333A48]"
              >
                Close Analytics View
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: Paytm Payment Gateway & Success Message Modal */}
      {/* ========================================================================= */}
      {paytmModalOpen && selectedPlanForPaytm && (
        <PaytmGatewayModal
          isOpen={paytmModalOpen}
          onClose={() => setPaytmModalOpen(false)}
          plan={selectedPlanForPaytm}
          billingCycle={billingCycle}
          onPaymentSuccess={handlePaytmPaymentSuccess}
        />
      )}

    </div>
  );
};

export default AdminManagementPage;
