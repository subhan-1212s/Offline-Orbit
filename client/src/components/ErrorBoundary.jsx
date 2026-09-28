import React from 'react';
import { AlertTriangle, RefreshCw, Trash2, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Offline Orbit caught runtime error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetAndRepair = () => {
    try {
      localStorage.removeItem('orbit_user');
      localStorage.removeItem('orbit_token');
      localStorage.removeItem('orbit_notifications');
      sessionStorage.clear();
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => caches.delete(name));
        });
      }
    } catch (e) {
      console.warn('Reset error:', e);
    }
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF9F6] text-[#1E2229] flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E2DA] rounded-3xl p-8 max-w-lg w-full shadow-2xl text-center space-y-6">
            
            <div className="w-16 h-16 bg-[#FFF0ED] text-[#F95738] rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <span className="bg-[#FFF0ED] text-[#F95738] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-[#F95738]/20">
                Application Self-Healing Protection
              </span>
              <h2 className="text-2xl font-extrabold text-[#1E2229] mt-3 tracking-tight">
                Offline Orbit Restored
              </h2>
              <p className="text-xs text-[#5A606C] mt-2 leading-relaxed">
                An unexpected view error occurred while rendering. You can easily reload or auto-repair the workspace session to continue learning without interruption.
              </p>
            </div>

            {this.state.error && (
              <div className="bg-[#FAF9F6] border border-[#E5E2DA] rounded-xl p-3 text-left font-mono text-[11px] text-[#F95738] overflow-x-auto max-h-28">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={this.handleReload}
                className="btn-coral py-3 px-5 text-xs font-bold shadow-md flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleResetAndRepair}
                className="btn-outline py-3 px-5 text-xs font-bold bg-[#FAF9F6] hover:bg-[#F3F1EC] text-[#5A606C] border-[#E5E2DA] flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4 text-[#F95738]" />
                <span>Reset Cache & Repair</span>
              </button>
            </div>

            <p className="text-[10px] text-[#89909E]">
              Offline Orbit Platform • Resilient Offline & Low-Bandwidth Architecture
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
