import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Orbit, Compass, BookOpen, GraduationCap, Award, HardDrive, 
  Sparkles, MessageSquare, LogOut, Sliders, Menu, X, Bell, CheckCircle2, Zap 
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, onSignOut }) => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(() => {
    try {
      const stored = localStorage.getItem('orbit_notifications');
      if (stored) return JSON.parse(stored);
    } catch (e) {}

    const joinedRooms = JSON.parse(localStorage.getItem('orbit_joined_rooms') || '[]');
    const activeRoom = joinedRooms.length > 0 ? joinedRooms[0] : null;

    const notifs = [
      {
        id: 'welcome-1',
        title: '🪐 Welcome to Offline-Orbit',
        text: 'Personalized STEM adaptive curriculum is ready.',
        time: 'Just now',
        unread: false
      }
    ];

    if (activeRoom) {
      notifs.unshift({
        id: `room-${activeRoom.code}`,
        title: '📝 Joined Classroom Room',
        text: `Connected to ${activeRoom.className} (Code: ${activeRoom.code}).`,
        time: 'Active',
        unread: false
      });
    }

    return notifs;
  });

  // Keep notifications in sync with real actions
  useEffect(() => {
    try {
      const stored = localStorage.getItem('orbit_notifications');
      const joinedRooms = JSON.parse(localStorage.getItem('orbit_joined_rooms') || '[]');
      const activeRoom = joinedRooms.length > 0 ? joinedRooms[0] : null;

      let list = stored ? JSON.parse(stored) : [];
      if (activeRoom && !list.some(n => n.text?.includes(activeRoom.code))) {
        list.unshift({
          id: `room-${activeRoom.code}`,
          title: '📝 Joined Classroom Room',
          text: `Connected to ${activeRoom.className} (Code: ${activeRoom.code}).`,
          time: 'Active',
          unread: false
        });
      }
      if (list.length > 0) {
        setNotifications(list);
      }
    } catch (e) {}
  }, [showNotifications]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    try {
      const stored = localStorage.getItem('orbit_notifications');
      if (stored) {
        const parsed = JSON.parse(stored).map(n => ({ ...n, unread: false }));
        localStorage.setItem('orbit_notifications', JSON.stringify(parsed));
      }
    } catch (e) {}
  };

  const getNavLinks = () => {
    if (user?.role === 'educator' || user?.role === 'teacher') {
      return [
        { id: 'teacher-dashboard', label: 'Educator Portal', icon: BookOpen },
        { id: 'teacher-learner', label: 'Learner Analytics', icon: GraduationCap },
        { id: 'custom-quiz-gen', label: 'AI Quiz Creator', icon: Sparkles },
        { id: 'offline-manager', label: 'Offline Downloads', icon: HardDrive }
      ];
    }

    if (user?.role === 'independent') {
      return [
        { id: 'independent-home', label: 'Learning Goals', icon: Compass },
        { id: 'concept-playground', label: 'AI Playground', icon: Sparkles },
        { id: 'custom-quiz-gen', label: 'AI Quiz Gen', icon: Sliders },
        { id: 'quests', label: 'Quests & Badges', icon: Award },
        { id: 'offline-manager', label: 'Offline Downloads', icon: HardDrive }
      ];
    }

    // Default: Learner
    return [
      { id: 'student-home', label: 'Learner Home', icon: Orbit },
      { id: 'concept-playground', label: 'AI Playground', icon: Sparkles },
      { id: 'quests', label: 'Quests & Badges', icon: Award },
      { id: 'community-board', label: 'Community Q&A', icon: MessageSquare },
      { id: 'analytics', label: 'Growth Analytics', icon: GraduationCap },
      { id: 'offline-manager', label: 'Offline Downloads', icon: HardDrive }
    ];
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-[#E5E2DA] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        
        {/* Clean Logo Header */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => {
            setIsMobileMenuOpen(false);
            setActiveTab(user?.role === 'educator' || user?.role === 'teacher' ? 'teacher-dashboard' : 'student-home');
          }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F95738] to-[#E04728] text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
            🪐
          </div>
          <h1 className="font-extrabold text-xl tracking-tight text-[#1E2229] leading-none">
            Offline Orbit
          </h1>
        </div>

        {/* Role Navigation Tabs (Desktop view) */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#F3F1EC] p-1 rounded-xl border border-[#E5E2DA]">
          {getNavLinks().map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-white text-[#F95738] shadow-sm'
                    : 'text-[#5A606C] hover:text-[#1E2229] hover:bg-[#E5E2DA]/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 relative">
          
          {/* Notification Bell Icon */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (unreadCount > 0) markAllRead();
              }}
              className="p-2 rounded-xl text-[#5A606C] hover:text-[#1E2229] hover:bg-[#FAF9F6] transition-colors border border-[#E5E2DA] relative"
              title="Milestone Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F95738] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Drawer Popdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#E5E2DA] rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between border-b border-[#E5E2DA] pb-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-[#F95738]" />
                    <h4 className="font-extrabold text-xs text-[#1E2229] uppercase tracking-wider">Learning Notifications</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    {notifications.length > 0 && (
                      <button
                        onClick={() => setNotifications([])}
                        className="text-[10px] font-bold text-[#F95738] hover:underline"
                      >
                        Clear All
                      </button>
                    )}
                    <button onClick={() => setShowNotifications(false)} className="text-[#89909E] hover:text-[#1E2229] p-0.5 rounded">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-[#5A606C]">
                    <CheckCircle2 className="w-6 h-6 text-[#0D9488] mx-auto mb-1" />
                    <p className="font-bold">No active notifications!</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <div 
                        key={n.id}
                        className={`p-3 rounded-xl border text-xs space-y-1 transition-colors relative group ${
                          n.unread ? 'bg-[#FFF0ED] border-[#F95738]/30 font-semibold' : 'bg-[#FAF9F6] border-[#E5E2DA]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#1E2229] text-xs pr-4">{n.title}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setNotifications(prev => prev.filter(x => x.id !== n.id));
                            }}
                            className="text-[#89909E] hover:text-[#F95738] p-1 rounded transition-colors"
                            title="Delete notification"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[#5A606C] leading-snug">{n.text}</p>
                        <span className="text-[10px] text-[#89909E] block pt-1">{n.time}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sign Out Button (Desktop) */}
          <button
            onClick={onSignOut}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E5E2DA] bg-[#FAF9F6] text-[#5A606C] font-bold text-xs hover:border-[#F95738] hover:text-[#F95738] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>

          {/* User Profile Avatar */}
          <div className="hidden sm:flex items-center gap-2 pl-1 border-l border-[#E5E2DA]">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
              alt={user?.name}
              className="w-8 h-8 rounded-full border border-[#E5E2DA] object-cover"
            />
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold text-[#1E2229] leading-tight">{user?.name}</p>
              <span className="text-[10px] font-semibold text-[#89909E]">{user?.role === 'educator' || user?.role === 'teacher' ? 'Educator' : 'Learner'}</span>
            </div>
          </div>

          {/* Hamburger Menu Toggle Button (Phone View) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#1E2229] hover:bg-[#F3F1EC] transition-colors border border-[#E5E2DA]"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-[#F95738]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Hamburger Drawer Menu (Phone View) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E5E2DA] px-4 py-4 space-y-2 shadow-lg animate-fadeIn">
          <div className="text-[10px] font-extrabold text-[#89909E] uppercase tracking-wider px-2 mb-1">
            Navigation Menu
          </div>

          {getNavLinks().map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#FFF0ED] text-[#F95738] border border-[#F95738]/20 shadow-xs'
                    : 'text-[#5A606C] hover:bg-[#FAF9F6] hover:text-[#1E2229]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-[#E5E2DA] flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
                alt={user?.name}
                className="w-8 h-8 rounded-full border border-[#E5E2DA] object-cover"
              />
              <div>
                <p className="text-xs font-bold text-[#1E2229]">{user?.name}</p>
                <span className="text-[10px] font-semibold text-[#89909E]">{user?.role === 'educator' || user?.role === 'teacher' ? 'Educator' : 'Learner'}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onSignOut();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E5E2DA] bg-[#FAF9F6] text-[#F95738] font-bold text-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
