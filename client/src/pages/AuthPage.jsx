import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  GraduationCap, BookOpen, KeyRound, Mail, ArrowRight, 
  ShieldCheck, CheckCircle2, Eye, EyeOff, Sparkles, UserCheck, Lock, ChevronRight 
} from 'lucide-react';

export const AuthPage = ({ onAuthSuccess }) => {
  const { updateUserProfile } = useAuth();
  
  const [activeMode, setActiveMode] = useState('learner-login'); // 'learner-login' | 'educator-login' | 'register-learner' | 'register-educator' | 'forgot-password'
  
  // Login & Registration Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  
  // Categorization States: Learner Categories (School Student, College Student, Self Learner)
  const [learnerCategory, setLearnerCategory] = useState('School Student');
  const [subLevel, setSubLevel] = useState('High School');
  const [interestDomain, setInterestDomain] = useState('Computer Science');

  // Categorization States: Educator Categories (School Teacher, College Professor, Independent Tutor / Other)
  const [educatorCategory, setEducatorCategory] = useState('School Teacher'); // 'School Teacher' | 'College Professor' | 'Independent Tutor / Other'
  const [institutionName, setInstitutionName] = useState('');
  const [subjectTaught, setSubjectTaught] = useState('Computer Science & Coding');
  const [gradeTaught, setGradeTaught] = useState('High School (Grades 9-10)');
  const [specialization, setSpecialization] = useState('Software Engineering & AI Training');

  // Forgot Password state
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resetStep, setResetStep] = useState(1); // 1: Email, 2: Code & New Password

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const recordUserInAdminRoster = (userData) => {
    try {
      const stored = JSON.parse(localStorage.getItem('orbit_admin_users') || '[]');
      const cleanEmail = (userData.email || '').toLowerCase();
      const existingIdx = stored.findIndex(u => (u.email || '').toLowerCase() === cleanEmail);
      const cleanRole = userData.role === 'teacher' ? 'educator' : userData.role === 'student' ? 'student' : (userData.role || 'student');
      
      const entry = {
        id: userData._id || userData.id || `usr-${Date.now()}`,
        name: userData.name || cleanEmail.split('@')[0],
        email: userData.email,
        role: cleanRole,
        grade: userData.grade || userData.learnerCategory || userData.educatorCategory || 'Active Member',
        streak: userData.streakDays || 1,
        points: userData.points || 480,
        status: 'Active Now',
        lastLogin: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        analytics: {
          masteryScore: 84,
          quizzesAttempted: 12,
          accuracyRate: 90,
          studyTimeHours: 10.5,
          topics: [
            { name: 'Computer Science & AI', score: 90, status: 'Mastered' },
            { name: 'Photosynthesis & Plant Energy', score: 85, status: 'Mastered' },
            { name: 'Newtonian Physics & Vectors', score: 78, status: 'Proficient' }
          ],
          misconceptions: [],
          recentAttempts: [
            { quiz: 'Diagnostic Concept Check', score: 9, total: 10, date: 'Today' }
          ]
        }
      };

      if (existingIdx >= 0) {
        stored[existingIdx] = { 
          ...stored[existingIdx], 
          ...entry, 
          analytics: stored[existingIdx].analytics || entry.analytics 
        };
      } else {
        stored.unshift(entry);
      }
      localStorage.setItem('orbit_admin_users', JSON.stringify(stored));
    } catch (e) {}
  };

  // Submit Email & Password -> Direct Sign In
  const handleLoginSubmitPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const isAdmin = activeMode === 'admin-login' || email.toLowerCase().includes('admin');
    const role = isAdmin ? 'admin' : (activeMode === 'educator-login' || activeMode === 'register-educator') ? 'educator' : 'learner';
    
    try {
      const res = await api.login({ email, password, role });
      const authenticatedUser = {
        ...res.user,
        role: isAdmin ? 'admin' : (res.user?.role || role)
      };
      localStorage.setItem('orbit_token', res.token);
      localStorage.setItem('orbit_user', JSON.stringify(authenticatedUser));
      updateUserProfile(authenticatedUser);
      recordUserInAdminRoster(authenticatedUser);
      onAuthSuccess(authenticatedUser);
    } catch (err) {
      setMessage(err.message || 'Login failed. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };


  // Handle Learner Account Registration -> Direct Sign In
  const handleLearnerRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await api.register({
        name,
        email,
        password,
        role: 'learner',
        learnerCategory,
        subLevel,
        interestDomain
      });
      localStorage.setItem('orbit_token', res.token);
      localStorage.setItem('orbit_user', JSON.stringify(res.user));
      updateUserProfile(res.user);
      recordUserInAdminRoster(res.user);
      onAuthSuccess(res.user);
    } catch (err) {
      setMessage(err.message || 'Learner registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Educator Account Registration -> Direct Sign In
  const handleEducatorRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await api.register({
        name,
        email,
        password,
        role: 'educator',
        educatorCategory,
        institutionName: institutionName || (
          educatorCategory === 'School Teacher' ? 'School' :
          educatorCategory === 'College Professor' ? 'University' : 'Independent Academy'
        ),
        subjectTaught: educatorCategory === 'Independent Tutor / Other' ? specialization : subjectTaught,
        gradeTaught: educatorCategory === 'School Teacher' ? gradeTaught : 'N/A',
        specialization: educatorCategory === 'Independent Tutor / Other' ? specialization : subjectTaught
      });

      localStorage.setItem('orbit_token', res.token);
      localStorage.setItem('orbit_user', JSON.stringify(res.user));
      updateUserProfile(res.user);
      recordUserInAdminRoster(res.user);
      onAuthSuccess(res.user);
    } catch (err) {
      setMessage(err.message || 'Educator registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password Step 1: Send Code
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await api.forgotPassword({ email });
      setMessage(res.message || `Password reset 6-digit code sent to ${email}!`);
      setResetStep(2);
    } catch (err) {
      setMessage(err.message || 'Failed to send reset code.');
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password Step 2: Verify Code & Update Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await api.resetPassword({ email, resetCode, newPassword });
      setMessage('✅ Password reset successful! You can now sign in with your new password.');
      setTimeout(() => {
        setActiveMode('learner-login');
        setResetStep(1);
        setMessage('');
      }, 2000);
    } catch (err) {
      setMessage(err.message || 'Password reset failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center max-w-md mx-auto px-4 py-8">
      
      {/* Centered Authentication Form Card */}
      <div className="w-full bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-xl">
          
          {/* Header Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-[#1E2229] tracking-tight">
              {activeMode === 'learner-login' && 'Learner Sign In'}
              {activeMode === 'educator-login' && 'Educator Portal Sign In'}
              {activeMode === 'admin-login' && 'Super Admin Console Sign In'}
              {activeMode === 'register-learner' && 'Create Learner Account'}
              {activeMode === 'register-educator' && 'Create Educator Account'}
              {activeMode === 'forgot-password' && 'Reset Your Password'}
            </h2>
            <p className="text-xs text-[#5A606C] mt-1">
              {activeMode === 'register-learner' && 'Select your learner path to personalize your AI STEM curriculum'}
              {activeMode === 'register-educator' && 'Set up your educator profile to manage school, college, or independent tutoring'}
              {activeMode === 'admin-login' && 'Authorized system administrators and telemetry supervisors only'}
              {(activeMode === 'learner-login' || activeMode === 'educator-login') && 'Enter your credentials to access your personalized learning orbit'}
              {activeMode === 'forgot-password' && 'Verify your email code to reset your account password'}
            </p>
          </div>

          {/* Mode Selector Tabs (Learner vs Educator vs Admin) */}
          {activeMode !== 'forgot-password' && (
            <div className="grid grid-cols-3 gap-1 bg-[#FAF9F6] p-1 rounded-2xl border border-[#E2E8F0] mb-6 text-xs font-bold">
              <button
                type="button"
                onClick={() => { 
                  setActiveMode(activeMode === 'register-educator' ? 'register-learner' : 'learner-login'); 
                  setMessage(''); 
                }}
                className={`py-2.5 rounded-xl transition-all ${
                  activeMode === 'learner-login' || activeMode === 'register-learner' ? 'bg-white text-[#F95738] shadow-sm' : 'text-[#5A606C]'
                }`}
              >
                Learner Portal
              </button>

              <button
                type="button"
                onClick={() => { 
                  setActiveMode(activeMode === 'register-learner' ? 'register-educator' : 'educator-login'); 
                  setMessage(''); 
                }}
                className={`py-2.5 rounded-xl transition-all ${
                  activeMode === 'educator-login' || activeMode === 'register-educator' ? 'bg-white text-[#4F46E5] shadow-sm' : 'text-[#5A606C]'
                }`}
              >
                Educator Portal
              </button>

              <button
                type="button"
                onClick={() => { 
                  setActiveMode('admin-login'); 
                  setMessage(''); 
                }}
                className={`py-2.5 rounded-xl transition-all ${
                  activeMode === 'admin-login' ? 'bg-white text-[#0D9488] shadow-sm' : 'text-[#5A606C]'
                }`}
              >
                Admin Portal
              </button>
            </div>
          )}

          {message && (
            <div className="p-3.5 mb-5 rounded-xl bg-[#FFF0ED] border border-[#F95738]/30 text-xs font-semibold text-[#1E2229] leading-relaxed">
              {message}
            </div>
          )}

          {/* Form 1: Learner / Educator / Admin Login Flow */}
          {(activeMode === 'learner-login' || activeMode === 'educator-login' || activeMode === 'admin-login') && (
            <form onSubmit={handleLoginSubmitPassword} className="space-y-4">
              {activeMode === 'admin-login' && (
                <div className="p-3 rounded-2xl bg-[#ECFDF5] border border-[#10B981]/30 flex items-center gap-2.5 text-xs text-[#065F46] font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>Super Admin Console • Authorized Personnel Only</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#1E2229] mb-1">
                  {activeMode === 'admin-login' ? 'Super Admin Email' : 'Email Address'}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder={activeMode === 'admin-login' ? 'admin@offline-orbit.edu' : 'mohamedsubhan155@gmail.com'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-[#F95738]"
                  />
                  <Mail className="w-4 h-4 text-[#94A3B8] absolute right-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-[#1E2229]">
                    {activeMode === 'admin-login' ? 'Master Password' : 'Password'}
                  </label>
                  {activeMode !== 'admin-login' && (
                    <button
                      type="button"
                      onClick={() => { setActiveMode('forgot-password'); setResetStep(1); setMessage(''); }}
                      className="text-[11px] font-bold text-[#F95738] hover:underline"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-[#F95738] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-[#94A3B8] hover:text-[#1E2229] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full btn-coral text-xs py-3.5 shadow-md hover:scale-[1.01] transition-all justify-center ${
                  activeMode === 'educator-login' ? 'bg-[#4F46E5] hover:bg-[#4338CA]' : 
                  activeMode === 'admin-login' ? 'bg-[#0D9488] hover:bg-[#0B7A70]' : ''
                }`}
              >
                <span>{loading ? 'Signing In...' : activeMode === 'admin-login' ? 'Enter Super Admin Console' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {activeMode === 'admin-login' ? (
                <div className="pt-3 text-center">
                  <p className="text-[11px] text-[#64748B] font-medium">
                    🔒 Protected Administrative Console. Enter root credentials to authenticate.
                  </p>
                </div>
              ) : (
                <div className="pt-3 border-t border-[#E2E8F0] text-center text-xs">
                  <span className="text-[#5A606C]">Don't have an account? </span>
                  <button
                    type="button"
                    onClick={() => { 
                      setActiveMode(activeMode === 'educator-login' ? 'register-educator' : 'register-learner'); 
                      setMessage(''); 
                    }}
                    className="font-bold text-[#F95738] hover:underline"
                  >
                    Create Account
                  </button>
                </div>
              )}
            </form>
          )}

          {/* Form 2: Learner Registration */}
          {activeMode === 'register-learner' && (
            <form onSubmit={handleLearnerRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1E2229] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Mohamed Subhan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-[#F95738]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E2229] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="mohamedsubhan155@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-[#F95738]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E2229] mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-[#F95738] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-[#94A3B8] hover:text-[#1E2229]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Learner Category Options (School Student, College Student, Self Learner) */}
              <div>
                <label className="block text-xs font-bold text-[#1E2229] mb-1.5">Learner Category</label>
                <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      setLearnerCategory('School Student');
                      setSubLevel('High School');
                      setInterestDomain('Computer Science');
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      learnerCategory === 'School Student'
                        ? 'bg-[#FFF0ED] text-[#F95738] border-[#F95738] shadow-xs'
                        : 'bg-[#FAF9F6] text-[#5A606C] border-[#E2E8F0] hover:bg-white'
                    }`}
                  >
                    <span className="text-base">🎓</span>
                    <span className="text-[11px] leading-tight">School Student</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLearnerCategory('College Student');
                      setSubLevel('Undergraduate');
                      setInterestDomain('Computer Science & Engineering');
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      learnerCategory === 'College Student'
                        ? 'bg-[#FFF0ED] text-[#F95738] border-[#F95738] shadow-xs'
                        : 'bg-[#FAF9F6] text-[#5A606C] border-[#E2E8F0] hover:bg-white'
                    }`}
                  >
                    <span className="text-base">🏛️</span>
                    <span className="text-[11px] leading-tight">College Student</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLearnerCategory('Self Learner');
                      setSubLevel('Self Paced');
                      setInterestDomain('Computer Science & Software Development');
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      learnerCategory === 'Self Learner'
                        ? 'bg-[#FFF0ED] text-[#F95738] border-[#F95738] shadow-xs'
                        : 'bg-[#FAF9F6] text-[#5A606C] border-[#E2E8F0] hover:bg-white'
                    }`}
                  >
                    <span className="text-base">💡</span>
                    <span className="text-[11px] leading-tight">Self Learner</span>
                  </button>
                </div>
              </div>

              {/* Conditional Secondary Questions based on Learner Category */}
              {learnerCategory === 'School Student' && (
                <div className="space-y-3 p-3.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-2xl">
                  <div>
                    <label className="block text-xs font-bold text-[#1E2229] mb-1">School Level</label>
                    <select
                      value={subLevel}
                      onChange={(e) => setSubLevel(e.target.value)}
                      className="w-full bg-white border border-[#E2E8F0] rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#F95738]"
                    >
                      <option value="Primary School">Primary School</option>
                      <option value="Middle School">Middle School</option>
                      <option value="High School">High School</option>
                      <option value="Higher Secondary">Higher Secondary</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E2229] mb-1">Primary Focus Area</label>
                    <select
                      value={interestDomain}
                      onChange={(e) => setInterestDomain(e.target.value)}
                      className="w-full bg-white border border-[#E2E8F0] rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#F95738]"
                    >
                      <option value="Computer Science">Computer Science & Coding</option>
                      <option value="Mathematics">Mathematics & Algebra</option>
                      <option value="Physical Sciences">Physics & Physical Sciences</option>
                      <option value="Ecology & Life Sciences">Ecology & Biology</option>
                    </select>
                  </div>
                </div>
              )}

              {learnerCategory === 'College Student' && (
                <div className="p-3.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-2xl">
                  <label className="block text-xs font-bold text-[#1E2229] mb-1">Department / Major</label>
                  <select
                    value={interestDomain}
                    onChange={(e) => setInterestDomain(e.target.value)}
                    className="w-full bg-white border border-[#E2E8F0] rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#F95738]"
                  >
                    <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
                    <option value="Information Technology">Information Technology (IT)</option>
                    <option value="Mathematics & Data Science">Mathematics & Data Science</option>
                    <option value="Physics & Electronics">Physics & Electronics</option>
                    <option value="Biological Sciences & Biotechnology">Biological Sciences & Biotechnology</option>
                  </select>
                </div>
              )}

              {learnerCategory === 'Self Learner' && (
                <div className="p-3.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-2xl">
                  <label className="block text-xs font-bold text-[#1E2229] mb-1">Domain Interest</label>
                  <select
                    value={interestDomain}
                    onChange={(e) => setInterestDomain(e.target.value)}
                    className="w-full bg-white border border-[#E2E8F0] rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#F95738]"
                  >
                    <option value="Computer Science & Software Development">Computer Science & Software Development</option>
                    <option value="Data Science & Artificial Intelligence">Data Science & Artificial Intelligence</option>
                    <option value="Mathematics & Logic">Mathematics & Logic</option>
                    <option value="Science & Life Systems">Science & Life Systems</option>
                  </select>
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full btn-coral text-xs py-3.5 shadow-md justify-center">
                <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-3 border-t border-[#E2E8F0] text-center text-xs">
                <span className="text-[#5A606C]">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => { setActiveMode('learner-login'); setMessage(''); }}
                  className="font-bold text-[#F95738] hover:underline"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}

          {/* Form 3: Educator Registration with Teacher-Specific Questions */}
          {activeMode === 'register-educator' && (
            <form onSubmit={handleEducatorRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1E2229] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Prof. Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-[#4F46E5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E2229] mb-1">Work Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="sarah.jenkins@orbit.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-[#4F46E5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E2229] mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-[#4F46E5] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-[#94A3B8] hover:text-[#1E2229]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Educator Category Selection (School Teacher, College Professor, Independent Tutor / Other) */}
              <div>
                <label className="block text-xs font-bold text-[#1E2229] mb-1.5">Educator Role / Category</label>
                <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      setEducatorCategory('School Teacher');
                      setSubjectTaught('Computer Science & Coding');
                      setGradeTaught('High School (Grades 9-10)');
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      educatorCategory === 'School Teacher'
                        ? 'bg-[#EEF2FF] text-[#4F46E5] border-[#4F46E5] shadow-xs'
                        : 'bg-[#FAF9F6] text-[#5A606C] border-[#E2E8F0] hover:bg-white'
                    }`}
                  >
                    <span className="text-base">🏫</span>
                    <span className="text-[11px] leading-tight">School Teacher</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEducatorCategory('College Professor');
                      setSubjectTaught('Computer Science & Engineering (CSE)');
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      educatorCategory === 'College Professor'
                        ? 'bg-[#EEF2FF] text-[#4F46E5] border-[#4F46E5] shadow-xs'
                        : 'bg-[#FAF9F6] text-[#5A606C] border-[#E2E8F0] hover:bg-white'
                    }`}
                  >
                    <span className="text-base">🏛️</span>
                    <span className="text-[11px] leading-tight">College Professor</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEducatorCategory('Independent Tutor / Other');
                      setSpecialization('Software Engineering & AI Training');
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      educatorCategory === 'Independent Tutor / Other'
                        ? 'bg-[#EEF2FF] text-[#4F46E5] border-[#4F46E5] shadow-xs'
                        : 'bg-[#FAF9F6] text-[#5A606C] border-[#E2E8F0] hover:bg-white'
                    }`}
                  >
                    <span className="text-base">💡</span>
                    <span className="text-[11px] leading-tight">Independent / Other</span>
                  </button>
                </div>
              </div>

              {/* Conditional Educator Questions */}
              {educatorCategory === 'School Teacher' && (
                <div className="space-y-3 p-3.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-2xl">
                  <div>
                    <label className="block text-xs font-bold text-[#1E2229] mb-1">Which School do you teach at?</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. St. Xavier High School / Oakridge International"
                      value={institutionName}
                      onChange={(e) => setInstitutionName(e.target.value)}
                      className="w-full bg-white border border-[#E2E8F0] rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#4F46E5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E2229] mb-1">Which Subject do you teach?</label>
                    <select
                      value={subjectTaught}
                      onChange={(e) => setSubjectTaught(e.target.value)}
                      className="w-full bg-white border border-[#E2E8F0] rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#4F46E5]"
                    >
                      <option value="Computer Science & Coding">Computer Science & Coding</option>
                      <option value="Mathematics & Algebra">Mathematics & Algebra</option>
                      <option value="Physics & Physical Sciences">Physics & Physical Sciences</option>
                      <option value="Chemistry & Life Sciences">Chemistry & Life Sciences</option>
                      <option value="Social Sciences & Humanities">Social Sciences & Humanities</option>
                      <option value="General STEM & Robotics">General STEM & Robotics</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E2229] mb-1">Grade Level Taught</label>
                    <select
                      value={gradeTaught}
                      onChange={(e) => setGradeTaught(e.target.value)}
                      className="w-full bg-white border border-[#E2E8F0] rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#4F46E5]"
                    >
                      <option value="Primary School (Grades 1-5)">Primary School (Grades 1-5)</option>
                      <option value="Middle School (Grades 6-8)">Middle School (Grades 6-8)</option>
                      <option value="High School (Grades 9-10)">High School (Grades 9-10)</option>
                      <option value="Higher Secondary (Grades 11-12)">Higher Secondary (Grades 11-12)</option>
                    </select>
                  </div>
                </div>
              )}

              {educatorCategory === 'College Professor' && (
                <div className="space-y-3 p-3.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-2xl">
                  <div>
                    <label className="block text-xs font-bold text-[#1E2229] mb-1">Which College / University?</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. IIT Madras / Stanford University"
                      value={institutionName}
                      onChange={(e) => setInstitutionName(e.target.value)}
                      className="w-full bg-white border border-[#E2E8F0] rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#4F46E5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E2229] mb-1">Department / Field of Study</label>
                    <select
                      value={subjectTaught}
                      onChange={(e) => setSubjectTaught(e.target.value)}
                      className="w-full bg-white border border-[#E2E8F0] rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#4F46E5]"
                    >
                      <option value="Computer Science & Engineering (CSE)">Computer Science & Engineering (CSE)</option>
                      <option value="Information Technology (IT)">Information Technology (IT)</option>
                      <option value="Mathematics & Data Science">Mathematics & Data Science</option>
                      <option value="Physics & Electronics">Physics & Electronics</option>
                      <option value="Biotechnology & Life Sciences">Biotechnology & Life Sciences</option>
                      <option value="Mechanical & Electrical Engineering">Mechanical & Electrical Engineering</option>
                    </select>
                  </div>
                </div>
              )}

              {educatorCategory === 'Independent Tutor / Other' && (
                <div className="space-y-3 p-3.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-2xl">
                  <div>
                    <label className="block text-xs font-bold text-[#1E2229] mb-1">What is your Specialization / Domain?</label>
                    <select
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      className="w-full bg-white border border-[#E2E8F0] rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#4F46E5]"
                    >
                      <option value="Software Engineering & AI Training">Software Engineering & AI Training</option>
                      <option value="Private STEM & Math Tutoring">Private STEM & Math Tutoring</option>
                      <option value="Competitive Exam Coaching (JEE / SAT / NEET)">Competitive Exam Coaching (JEE / SAT / NEET)</option>
                      <option value="Corporate Mentorship & Upskilling">Corporate Mentorship & Upskilling</option>
                      <option value="Data Science & Machine Learning">Data Science & Machine Learning</option>
                      <option value="Robotics & Hardware Systems">Robotics & Hardware Systems</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E2229] mb-1">Academy / Organization Name (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Independent STEM Academy / Private Practice"
                      value={institutionName}
                      onChange={(e) => setInstitutionName(e.target.value)}
                      className="w-full bg-white border border-[#E2E8F0] rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full text-xs py-3.5 rounded-xl font-extrabold text-white shadow-md justify-center bg-[#4F46E5] hover:bg-[#4338CA] flex items-center gap-2 transition-all hover:scale-[1.01]"
              >
                <span>{loading ? 'Creating Educator Account...' : 'Create Educator Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-3 border-t border-[#E2E8F0] text-center text-xs">
                <span className="text-[#5A606C]">Already have an educator account? </span>
                <button
                  type="button"
                  onClick={() => { setActiveMode('educator-login'); setMessage(''); }}
                  className="font-bold text-[#4F46E5] hover:underline"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}

          {/* Form 4: Forgot Password Flow */}
          {activeMode === 'forgot-password' && (
            <div>
              {resetStep === 1 ? (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <p className="text-xs text-[#5A606C] leading-relaxed">
                    Enter your registered email address below to reset your password.
                  </p>
                  <div>
                    <label className="block text-xs font-bold text-[#1E2229] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl p-3 text-xs font-semibold focus:outline-none"
                    />
                  </div>
                  <button type="submit" disabled={loading} className="w-full btn-coral text-xs py-3.5 shadow-md justify-center">
                    <span>{loading ? 'Processing...' : 'Reset Password'}</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1E2229] mb-1">6-Digit Verification Code</label>
                    <input
                      type="text"
                      required
                      placeholder="123456"
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl p-3 text-xs font-bold text-center tracking-widest text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E2229] mb-1">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl p-3 text-xs font-semibold focus:outline-none pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3.5 top-3.5 text-[#94A3B8] hover:text-[#1E2229]"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" disabled={loading} className="w-full btn-coral text-xs py-3.5 shadow-md justify-center bg-[#0D9488]">
                    <span>{loading ? 'Updating Password...' : 'Reset Password'}</span>
                  </button>
                </form>
              )}

              <div className="pt-3 mt-4 border-t border-[#E2E8F0] text-center text-xs">
                <button
                  type="button"
                  onClick={() => { setActiveMode('learner-login'); setLoginStep(1); setMessage(''); }}
                  className="font-bold text-[#5A606C] hover:underline"
                >
                  ← Back to Sign In
                </button>
              </div>
            </div>
          )}

        </div>

    </div>
  );
};

