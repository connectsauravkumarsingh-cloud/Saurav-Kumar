import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Volume2,
  VolumeX,
  Languages,
  ShieldCheck,
  PhoneCall,
  MapPin,
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  RESCUE_AI_KNOWLEDGE_BASE,
  OFFICIAL_EMERGENCY_CONTACTS,
} from '../../data/disasterData';
import { ChatMessage } from '../../types/disaster';

export const NexusRescueAI: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text:
        'Hello! I am **NEXUS RESCUE AI**, your autonomous smart-city emergency assistant. I provide instant safety guidance, verified early warnings, nearby emergency facilities, and official helplines in English and Hindi (हिंदी). How can I assist you right now?',
      timestamp: 'Just now',
      lang: 'en',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickPrompts = language === 'en'
    ? [
        { label: '🌊 Flood Safety Protocol', query: 'What to do during an urban flood?' },
        { label: '🌍 Earthquake Protocol', query: 'What should I do during an earthquake?' },
        { label: '🌪️ Cyclone Protocol', query: 'What does the cyclone warning mean?' },
        { label: '🔥 Fire Safety Protocol', query: 'What are the fire emergency rules?' },
        { label: '🏢 Nearest Shelters & Hospitals', query: 'Show available emergency facilities and shelters' },
        { label: '📞 Emergency Helpline Numbers', query: 'Give me official emergency contact numbers' },
      ]
    : [
        { label: '🌊 बाढ़ सुरक्षा निर्देश', query: 'बाढ़ आने पर क्या करें?' },
        { label: '🌍 भूकंप सुरक्षा निर्देश', query: 'भूकंप के दौरान क्या करें?' },
        { label: '🌪️ चक्रवात सुरक्षा निर्देश', query: 'चक्रवात चेतावनी का क्या अर्थ है?' },
        { label: '🔥 अग्निकांड सुरक्षा निर्देश', query: 'आग लगने पर क्या करें?' },
        { label: '🏢 राहत शिविर एवं अस्पताल', query: 'नज़दीकी राहत शिविर और अस्पताल दिखाएं' },
        { label: '📞 हेल्पलाइन नंबर', query: 'आपातकालीन हेल्पलाइन नंबर दिखाएं' },
      ];

  const handleToggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    const greetingText =
      newLang === 'hi'
        ? 'नमस्ते! मैं **NEXUS RESCUE AI** हूँ, आपकी स्वायत्त स्मार्ट-सिटी आपातकालीन सहायक। मैं आपको हिंदी और अंग्रेजी में त्वरित सुरक्षा निर्देश, आपदा चेतावनी, निकटतम राहत शिविर और आधिकारिक हेल्पलाइन नंबर प्रदान करती हूँ। मैं आपकी क्या मदद कर सकती हूँ?'
        : 'Hello! I am **NEXUS RESCUE AI**, your autonomous smart-city emergency assistant. How can I assist you right now?';

    setMessages((prev) => [
      ...prev,
      {
        id: `sys-${Date.now()}`,
        sender: 'assistant',
        text: greetingText,
        timestamp: 'Just now',
        lang: newLang,
      },
    ]);
  };

  const getAIResponse = (query: string, lang: 'en' | 'hi'): string => {
    const q = query.toLowerCase();

    // Check for flood
    if (q.includes('flood') || q.includes('water') || q.includes('rain') || q.includes('बाढ़') || q.includes('पानी')) {
      return RESCUE_AI_KNOWLEDGE_BASE[lang].flood;
    }
    // Check for earthquake
    if (q.includes('earthquake') || q.includes('tremor') || q.includes('seismic') || q.includes('भूकंप') || q.includes('कंपन')) {
      return RESCUE_AI_KNOWLEDGE_BASE[lang].earthquake;
    }
    // Check for cyclone
    if (q.includes('cyclone') || q.includes('storm') || q.includes('wind') || q.includes('चक्रवात') || q.includes('तूफान')) {
      return RESCUE_AI_KNOWLEDGE_BASE[lang].cyclone;
    }
    // Check for fire
    if (q.includes('fire') || q.includes('smoke') || q.includes('burn') || q.includes('आग') || q.includes('अग्नि')) {
      return RESCUE_AI_KNOWLEDGE_BASE[lang].fire;
    }
    // Check for shelters / hospital
    if (q.includes('shelter') || q.includes('hospital') || q.includes('clinic') || q.includes('राहत') || q.includes('शिविर') || q.includes('अस्पताल')) {
      return RESCUE_AI_KNOWLEDGE_BASE[lang].shelters;
    }
    // Check for contact / helpline
    if (q.includes('contact') || q.includes('helpline') || q.includes('number') || q.includes('call') || q.includes('phone') || q.includes('नंबर') || q.includes('हेल्पलाइन') || q.includes('संपर्क')) {
      return RESCUE_AI_KNOWLEDGE_BASE[lang].contacts;
    }

    // Default Fallback
    if (lang === 'hi') {
      return (
        '⚠️ **NEXUS RESCUE AI सहायता**:\n\n' +
        'मैं आपके प्रश्न को समझ रही हूँ। यदि आप तत्काल आपातकालीन स्थिति में हैं, तो सीधे **112 (राष्ट्रीय आपातकाल)** या **108 (एम्बुलेंस)** पर कॉल करें।\n\n' +
        'आप मुझसे बाढ़, भूकंप, चक्रवात, आग, राहत शिविर या हेल्पलाइन नंबरों के बारे में पूछ सकते हैं।'
      );
    }
    return (
      '⚠️ **NEXUS RESCUE AI Guidance**:\n\n' +
      'If you are experiencing an immediate life-threatening emergency, please dial **112 (Emergency Response)** or **108 (Medical Trauma)** immediately.\n\n' +
      'You can ask me specific questions about Flood Safety, Earthquake protocols, Cyclone alerts, Fire containment, Nearest Emergency Shelters, or Official Helplines.'
    );
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
      lang: language,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      const responseText = getAIResponse(query, language);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: 'Just now',
        lang: language,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 450);
  };

  // Text-To-Speech
  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Strip markdown formatting for voice
    const plainText = text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Assistant Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
                NEXUS RESCUE AI
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">
                BILINGUAL 24/7 ACTIVE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              Autonomous Multilingual Disaster Advisor &amp; Evacuation Navigator
            </p>
          </div>
        </div>

        {/* Language & Voice Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-cyan-500/40 bg-cyan-950/60 hover:bg-cyan-900/60 text-xs font-mono font-bold text-cyan-300 transition-colors"
          >
            <Languages className="w-4 h-4 text-cyan-400" />
            <span>{language === 'en' ? 'Switch to हिंदी (Hindi)' : 'Switch to English'}</span>
          </button>

          <button
            onClick={() => {
              const lastMsg = messages[messages.length - 1];
              if (lastMsg) speakText(lastMsg.text);
            }}
            className={`p-2 rounded-xl border transition-colors ${
              isSpeaking
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
            }`}
            title="Voice Readout"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Chat Interface Frame */}
      <div className="rounded-3xl glass-panel border border-cyan-500/30 p-5 sm:p-6 bg-[#060c1c] shadow-2xl flex flex-col h-[520px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="p-2 rounded-xl bg-slate-950 border border-cyan-500/40 text-cyan-400 shrink-0 self-start">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-slate-950 font-medium'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>
                  <div className="mt-2 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => speakText(msg.text)}
                        className="text-cyan-400 hover:text-cyan-300 ml-2"
                      >
                        🔊 Listen
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p.query)}
              className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-500/40 text-[11px] font-mono text-slate-300 hover:text-cyan-300 whitespace-nowrap transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Message Input Box */}
        <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder={
              language === 'en'
                ? 'Ask NEXUS RESCUE AI anything (e.g. nearest shelter, flood steps)...'
                : 'NEXUS RESCUE AI से कुछ भी पूछें (उदा. नज़दीकी शेल्टर, बाढ़ सुरक्षा)...'
            }
            className="flex-1 bg-slate-950/80 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-colors"
          />
          <button
            onClick={() => handleSendMessage()}
            className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold hover:opacity-90 transition-opacity"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Official Verified Helplines Accordion Banner */}
      <div className="rounded-2xl glass-panel border border-slate-800 p-4 bg-[#050b18]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-mono font-bold text-slate-100 uppercase">
              {language === 'en' ? 'Verified Government Emergency Hotlines' : 'सत्यापित सरकारी आपातकालीन हेल्पलाइन'}
            </h4>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold">24x7 TOLL FREE</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs font-mono">
          {OFFICIAL_EMERGENCY_CONTACTS.slice(0, 3).map((c, i) => (
            <div key={i} className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex justify-between items-center">
              <div>
                <div className="text-slate-200 font-bold">{language === 'en' ? c.agency : c.agencyHindi}</div>
                <div className="text-[10px] text-slate-400">{language === 'en' ? c.role : c.roleHindi}</div>
              </div>
              <div className="text-cyan-300 font-bold text-sm tabular-nums pl-2">
                {c.number}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
