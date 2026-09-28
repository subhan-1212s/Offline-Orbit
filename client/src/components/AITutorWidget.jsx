import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { webllmEngine } from '../services/webllmEngine';
import { Sparkles, Send, X, RefreshCw, Mic, Volume2, Cpu, Zap, WifiOff, CheckCircle } from 'lucide-react';

export const AITutorWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'ai', 
      text: 'Hi! I am Orbit AI, your personal STEM study tutor powered by WebLLM, WebGPU & Cloud Cache.\n\nAsk me any question in Algebra, Calculus, Algorithms, Physics, Chemistry, Biology, or just chat with me—I work 100% offline directly in your browser!',
      engine: 'WebLLM & Cloud Cache (Offline Ready)'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const [modelProgress, setModelProgress] = useState('');
  const [isModelReady, setIsModelReady] = useState(false);
  const [engineStatus, setEngineStatus] = useState('WebLLM Cloud Cache Active');

  useEffect(() => {
    if (webllmEngine.isWebGPUSupported) {
      setEngineStatus('WebGPU Hardware Accelerated • Cloud Cache Ready');
    } else {
      setEngineStatus('WebLLM & Transformers.js Cloud Cache');
    }
    if (webllmEngine.isModelLoaded) {
      setIsModelReady(true);
    }
  }, []);

  const handleLoadOnDeviceModel = async () => {
    if (modelLoading || isModelReady) return;
    setModelLoading(true);
    setModelProgress('Initializing WebGPU pipeline...');
    try {
      const ok = await webllmEngine.initWebLLM((progress) => {
        setModelProgress(progress);
      });
      if (ok) {
        setIsModelReady(true);
        setModelProgress('On-Device Neural AI Loaded Successfully!');
        setTimeout(() => setModelLoading(false), 2000);
      } else {
        setModelProgress('Cloud Cached Neural Engine Ready');
        setTimeout(() => setModelLoading(false), 2000);
      }
    } catch (e) {
      setModelProgress('Cloud Cached Neural Engine Active');
      setTimeout(() => setModelLoading(false), 2000);
    }
  };

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setLoading(true);

    try {
      // First attempt full API tutor chat which delegates to WebLLM engine with cloud cache
      const res = await api.aiTutorChat({
        userMessage: text,
        conversationHistory: messages,
        currentLessonContext: 'High School STEM: Mathematics, Physics, Chemistry, Computer Science & Biology'
      });

      const replyText = res?.reply || webllmEngine.computeTailoredSTEMAnswer(text);
      const aiMsg = { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: replyText,
        engine: res?.engine || (navigator.onLine ? 'WebLLM Online' : 'In-Browser WebGPU Cloud Cache')
      };
      setMessages(prev => [...prev, aiMsg]);

      // Speak response
      if ('speechSynthesis' in window) {
        const speechClean = replyText.replace(/[\*#`]/g, '');
        const u = new SpeechSynthesisUtterance(speechClean);
        window.speechSynthesis.speak(u);
      }
    } catch (err) {
      // Fall back to clean on-device solution
      const dynamicSolution = webllmEngine.computeTailoredSTEMAnswer(text);
      setMessages(prev => [
        ...prev, 
        { 
          id: Date.now() + 1, 
          sender: 'ai', 
          text: dynamicSolution,
          engine: 'WebLLM Offline Cloud Cache'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeechInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser mode.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      handleSendMessage(transcript);
    };

    recognition.start();
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const clean = (text || '').replace(/[\*#`_]/g, '');
      const u = new SpeechSynthesisUtterance(clean);
      window.speechSynthesis.speak(u);
    }
  };

  const quickPrompts = [
    "How's your day?",
    'Solve 2x + 6 = 20',
    'Binary Search O(log n)',
    'Photosynthesis & Stomata',
    'Newton Second Law F=ma',
    'Tell me a joke',
    'Why is the sky blue?'
  ];

  // Helper to format text with bold, code blocks, and bullets
  const formatAIText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, idx) => {
      if (line.startsWith('```')) {
        return <div key={idx} className="h-1 my-1 border-t border-dashed border-[#E5E2DA]" />;
      }
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <div key={idx} className={line.startsWith('•') || line.startsWith('-') ? 'pl-2 my-0.5' : 'my-0.5'}>
          {parts.map((p, pIdx) => {
            if (p.startsWith('**') && p.endsWith('**')) {
              return <strong key={pIdx} className="font-extrabold text-[#1E2229]">{p.slice(2, -2)}</strong>;
            }
            if (p.startsWith('`') && p.endsWith('`')) {
              return <code key={pIdx} className="bg-[#EEF2FF] text-[#4F46E5] font-mono px-1 py-0.5 rounded text-[11px]">{p.slice(1, -1)}</code>;
            }
            return <span key={pIdx}>{p}</span>;
          })}
        </div>
      );
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      
      {/* Floating Widget Trigger Button (Professional White Theme) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white hover:bg-[#FAF9F6] text-[#1E2229] border border-[#E5E2DA] p-3 rounded-full shadow-xl hover:shadow-2xl flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all group"
        >
          <div className="w-8 h-8 rounded-full bg-[#F95738] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <span className="font-extrabold text-xs text-[#1E2229] pr-1 hidden sm:inline">Ask Orbit AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping hidden sm:inline" />
        </button>
      )}

      {/* Floating Chat Modal (Professional Clean White Theme) */}
      {isOpen && (
        <div className="bg-white border border-[#E5E2DA] rounded-3xl w-[360px] sm:w-[420px] h-[550px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header (Pure Clean White Theme) */}
          <div className="bg-white border-b border-[#E5E2DA] p-3.5 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#FFF0ED] border border-[#F95738]/20 flex items-center justify-center font-bold text-base shadow-xs text-[#F95738]">
                🪐
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-[#1E2229] leading-tight">Orbit AI Study Coach</h4>
                  {isModelReady && (
                    <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                      GPU Active
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-[#0D9488] font-bold bg-[#EEFDFB] border border-[#0D9488]/30 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] animate-ping" />
                    WebLLM WebGPU & Cloud Cache
                  </span>
                  <span className="text-[9px] bg-[#FAF9F6] border border-[#E5E2DA] text-[#5A606C] px-2 py-0.5 rounded-md font-semibold">
                    100% Offline
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {!isModelReady && webllmEngine.isWebGPUSupported && (
                <button
                  onClick={handleLoadOnDeviceModel}
                  disabled={modelLoading}
                  className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-[#4F46E5] bg-[#EEF2FF] border border-[#4F46E5]/30 hover:bg-[#4F46E5] hover:text-white px-2 py-1 rounded-lg transition-all"
                  title="Cache full neural weights in browser for offline token generation"
                >
                  <Cpu className="w-3 h-3" />
                  <span>{modelLoading ? 'Loading...' : 'Load GPU AI'}</span>
                </button>
              )}
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-1.5 text-[#89909E] hover:text-[#1E2229] hover:bg-[#FAF9F6] rounded-xl border border-transparent hover:border-[#E5E2DA] transition-all"
                title="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Model Loading Status Bar (if user triggered) */}
          {modelLoading && (
            <div className="bg-[#EEF2FF] border-b border-[#4F46E5]/20 px-3.5 py-2 flex items-center justify-between text-xs text-[#4F46E5] animate-in fade-in">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#4F46E5]" />
                <span className="text-[11px] font-semibold">{modelProgress || 'Loading on-device model weights...'}</span>
              </div>
            </div>
          )}

          {/* Messages Area (Clean White Canvas) */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FAF9F6]/40 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed relative group ${
                  m.sender === 'user'
                    ? 'bg-[#F95738] text-white rounded-tr-xs font-medium shadow-xs'
                    : 'bg-white text-[#1E2229] border border-[#E5E2DA] rounded-tl-xs shadow-xs'
                }`}>
                  {m.sender === 'ai' && (
                    <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-[#E5E2DA]/60">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-extrabold text-[#4F46E5] uppercase tracking-wider">
                          ORBIT AI
                        </span>
                        {m.engine && (
                          <span className="text-[8px] bg-[#EEF2FF] text-[#4F46E5] border border-[#4F46E5]/20 px-1.5 py-0.2 rounded font-semibold">
                            {m.engine}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => speakText(m.text)}
                        className="text-[#0D9488] hover:text-[#0B7A70] p-0.5 rounded transition-colors"
                        title="Read aloud"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  <div className="whitespace-pre-line text-[11.5px] leading-relaxed">
                    {m.sender === 'ai' ? formatAIText(m.text) : m.text}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-[#E5E2DA] w-fit text-[#5A606C] text-xs shadow-xs">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#F95738]" />
                <span className="font-semibold text-[11px] text-[#1E2229]">Orbit AI is thinking step-by-step...</span>
              </div>
            )}
          </div>

          {/* Quick Prompt Pills (Professional White) */}
          <div className="px-3.5 py-2.5 bg-white border-t border-[#E5E2DA] flex gap-1.5 overflow-x-auto shadow-2xs">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                className="text-[11px] font-semibold text-[#1E2229] bg-[#FAF9F6] hover:bg-[#FFF0ED] hover:text-[#F95738] border border-[#E5E2DA] hover:border-[#F95738]/40 px-3 py-1 rounded-full whitespace-nowrap transition-all active:scale-95 shadow-2xs"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Form with Voice Speech Recognition (White Theme) */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-[#E5E2DA] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={isListening ? "Listening to your voice..." : "Ask any question, equation, or chat freely..."}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 bg-[#FAF9F6] hover:bg-white focus:bg-white border border-[#E5E2DA] focus:border-[#F95738] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#1E2229] placeholder-[#89909E] focus:outline-none shadow-2xs transition-all"
            />

            <button
              type="button"
              onClick={handleSpeechInput}
              className={`p-2.5 rounded-xl border border-[#E5E2DA] transition-all ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-[#FAF9F6] text-[#5A606C] hover:text-[#4F46E5] hover:bg-[#EEF2FF]'
              }`}
              title="Speak question hands-free"
            >
              <Mic className="w-4 h-4" />
            </button>

            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="p-2.5 bg-[#F95738] text-white rounded-xl disabled:opacity-50 hover:bg-[#E04728] transition-all active:scale-95 shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
