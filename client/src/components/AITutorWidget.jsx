import React, { useState } from 'react';
import { api } from '../services/api';
import { Sparkles, MessageSquare, Send, X, Bot, RefreshCw, ChevronDown, Mic, Volume2 } from 'lucide-react';

export const AITutorWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi! I am Orbit AI, your personal STEM study coach. Ask me any question or tap the mic for hands-free voice search!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setLoading(true);

    try {
      const res = await api.aiTutorChat({
        userMessage: text,
        conversationHistory: messages,
        currentLessonContext: 'Photosynthesis & Linear Equations'
      });

      const aiMsg = { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: res.reply || 'Photosynthesis converts solar light into chemical glucose energy.',
        isFallback: res.isFallback
      };
      setMessages(prev => [...prev, aiMsg]);

      // Speak response
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(aiMsg.text);
        window.speechSynthesis.speak(u);
      }
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: 'Chlorophyll pigments absorb solar photons to split water into oxygen and hydrogen.' }]);
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
      const u = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(u);
    }
  };

  const quickPrompts = [
    'Explain Photosynthesis simply',
    'Give me a math formula mnemonic',
    'How do stomata work?'
  ];

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
        <div className="bg-white border border-[#E5E2DA] rounded-2xl w-[350px] sm:w-[380px] h-[490px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-[#1E2229] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#F95738] flex items-center justify-center font-bold text-base">
                🪐
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Orbit AI Voice & Study Assistant</h4>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Hands-Free Voice Enabled
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 text-[#89909E] hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF9F6] text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-3 rounded-2xl leading-relaxed relative group ${
                  m.sender === 'user'
                    ? 'bg-[#F95738] text-white rounded-tr-none font-semibold'
                    : 'bg-white text-[#1E2229] border border-[#E5E2DA] rounded-tl-none shadow-xs'
                }`}>
                  {m.sender === 'ai' && (
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-extrabold text-[#4F46E5] uppercase tracking-wider block">
                        ORBIT AI TUTOR
                      </span>
                      <button
                        onClick={() => speakText(m.text)}
                        className="text-[#0D9488] hover:text-[#0B7A70] p-0.5 rounded"
                        title="Read aloud"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-[#5A606C] text-xs italic">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#F95738]" />
                <span>Orbit AI is thinking...</span>
              </div>
            )}
          </div>

          {/* Quick Prompt Pills */}
          <div className="px-3 py-2 bg-white border-t border-[#E5E2DA] flex gap-1.5 overflow-x-auto">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                className="text-[10px] font-semibold text-[#4F46E5] bg-[#EEF2FF] border border-[#4F46E5]/30 px-2.5 py-1 rounded-full whitespace-nowrap hover:bg-[#4F46E5] hover:text-white transition-colors"
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
            className="p-3 bg-white border-t border-[#E5E2DA] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={isListening ? "Listening to your voice..." : "Ask any STEM question..."}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 bg-[#FAF9F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#F95738] text-[#1E2229]"
            />

            <button
              type="button"
              onClick={handleSpeechInput}
              className={`p-2 rounded-xl transition-colors ${
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
              className="p-2 bg-[#F95738] text-white rounded-xl disabled:opacity-50 hover:bg-[#E04728] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};

