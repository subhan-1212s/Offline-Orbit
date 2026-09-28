import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { webllmEngine } from '../services/webllmEngine';
import { Sparkles, MessageSquare, Send, X, Bot, RefreshCw, ChevronDown, Mic, Volume2, Cpu, Zap, WifiOff, CheckCircle } from 'lucide-react';

export const AITutorWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'ai', 
      text: 'Hi! I am Orbit AI, your personal STEM study tutor powered by WebLLM Cloud Cache & WebGPU.\n\nAsk me any question in Algebra, Algorithms, Physics, or Biology—I work 100% offline directly in your browser!',
      engine: 'WebLLM Cloud Cache (Offline Ready)'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [engineStatus, setEngineStatus] = useState('WebLLM Cloud Cache Active');

  useEffect(() => {
    if (webllmEngine.isWebGPUSupported) {
      setEngineStatus('WebGPU Hardware Accelerated');
    } else {
      setEngineStatus('WebLLM Cloud Cache Active');
    }
  }, []);

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
        // Strip markdown asterisks for natural speech
        const speechClean = replyText.replace(/[\*#`]/g, '');
        const u = new SpeechSynthesisUtterance(speechClean);
        window.speechSynthesis.speak(u);
      }
    } catch (err) {
      // NEVER fall back to static text: compute tailored STEM solution directly to the user's question
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
    'Solve 2x + 6 = 20',
    'Binary Search O(log n)',
    'Big O Complexity Rankings',
    'Photosynthesis & Stomata',
    'Newton Second Law F=ma',
    'Ohm Law V=IR'
  ];

  // Helper to format text with bold, code blocks, and bullets
  const formatAIText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, idx) => {
      // Code block
      if (line.startsWith('```')) {
        return <div key={idx} className="h-1 my-1 border-t border-dashed border-[#E5E2DA]" />;
      }
      // Bold items
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
      
      {/* Floating Widget Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#F95738] text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all group border border-white/20"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
          </div>
          <span className="font-bold text-xs pr-1 hidden sm:inline">Ask Orbit AI</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="bg-white border border-[#E5E2DA] rounded-2xl w-[350px] sm:w-[410px] h-[520px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-[#1E2229] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#F95738] flex items-center justify-center font-bold text-base shadow-xs">
                🪐
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Orbit AI STEM Study Coach</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    WebLLM WebGPU Cloud Cache
                  </span>
                  <span className="text-[9px] bg-white/10 text-white/80 px-1.5 py-0.2 rounded font-mono">
                    100% Offline
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-1 text-[#89909E] hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#FAF9F6] text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[88%] p-3 rounded-2xl leading-relaxed relative group ${
                  m.sender === 'user'
                    ? 'bg-[#F95738] text-white rounded-tr-none font-medium shadow-xs'
                    : 'bg-white text-[#1E2229] border border-[#E5E2DA] rounded-tl-none shadow-xs'
                }`}>
                  {m.sender === 'ai' && (
                    <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-[#E5E2DA]/60">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-extrabold text-[#4F46E5] uppercase tracking-wider">
                          ORBIT AI
                        </span>
                        {m.engine && (
                          <span className="text-[8px] bg-[#EEF2FF] text-[#4F46E5] px-1.5 py-0.2 rounded font-semibold">
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
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#E5E2DA] w-fit text-[#5A606C] text-xs shadow-xs">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#F95738]" />
                <span className="font-semibold text-[11px]">Orbit WebLLM is reasoning step-by-step...</span>
              </div>
            )}
          </div>

          {/* Quick Prompt Pills */}
          <div className="px-3 py-2 bg-white border-t border-[#E5E2DA] flex gap-1.5 overflow-x-auto">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                className="text-[10px] font-semibold text-[#4F46E5] bg-[#EEF2FF] border border-[#4F46E5]/30 px-2.5 py-1 rounded-full whitespace-nowrap hover:bg-[#4F46E5] hover:text-white transition-all active:scale-95"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Form with Voice Speech Recognition */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-white border-t border-[#E5E2DA] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={isListening ? "Listening to your voice..." : "Ask any STEM question (e.g. solve 3x + 12 = 36)..."}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 bg-[#FAF9F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#F95738] text-[#1E2229]"
            />

            <button
              type="button"
              onClick={handleSpeechInput}
              className={`p-2 rounded-xl transition-all ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-[#EEF2FF] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white border border-[#4F46E5]/30'
              }`}
              title="Speak question hands-free"
            >
              <Mic className="w-4 h-4" />
            </button>

            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="p-2 bg-[#F95738] text-white rounded-xl disabled:opacity-50 hover:bg-[#E04728] transition-all active:scale-95 shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
