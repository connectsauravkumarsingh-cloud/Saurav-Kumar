import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PageId } from '../../types';
import { ChatMessage, PipelineStep } from '../../types/chat';
import { nexusAiService } from '../../services/nexusAiService';
import {
  Bot,
  Sparkles,
  X,
  Send,
  RotateCcw,
  Plus,
  Minimize2,
  Maximize2,
  Cpu,
  ShieldAlert,
  ArrowRight,
  Radio,
  CheckCircle2,
  AlertTriangle,
  Waves,
  Activity,
  Flame,
  Zap,
  Terminal,
  Layers,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';

interface NexusAiChatbotProps {
  onNavigatePage: (page: PageId, tab?: string) => void;
}

export const NexusAiChatbot: React.FC<NexusAiChatbotProps> = ({ onNavigatePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-nexus-ai',
      sender: 'assistant',
      text: `Hello! I am **NEXUS AI**, the Urban Intelligence Assistant for NEXUS CITY.\n\nI am connected to all city telemetry, multi-hazard early warning sensors, serverless cloud topology, and subterranean actuators.\n\nHow can I assist your metropolitan operations or research inquiry today?`,
      timestamp: 'Just now',
      mode: 'information',
      dataTag: 'SIMULATED DATA',
      quickActions: [
        { label: 'Disaster Control Room', page: 'disaster' },
        { label: 'Cloud Architecture', page: 'architecture' },
        { label: 'Digital Twin', page: 'infrastructure' },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    try {
      const response = await nexusAiService.sendMessage(text, messages);
      setMessages((prev) => [...prev, response]);
    } catch (err) {
      console.error('Error generating AI response:', err);
      const fallbackResponse: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'assistant',
        text: 'NEXUS AI encountered an unexpected latency spike in neural dispatch. Autonomous fallback mode active. Please resubmit your query.',
        timestamp: 'Just now',
        mode: 'information',
        dataTag: 'NO LIVE DATA AVAILABLE',
      };
      setMessages((prev) => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: `New session initialized with NEXUS CITY Intelligence.\n\nAsk any question regarding our 7-tier cloud architecture, real-time flood & seismic responses, or request an urban problem-solving simulation.`,
        timestamp: 'Just now',
        mode: 'information',
        dataTag: 'SIMULATED DATA',
      },
    ]);
  };

  const handleClear = () => {
    setMessages([]);
  };

  const quickSuggestions = [
    { label: 'Explain NEXUS CITY', prompt: 'What is NEXUS CITY and what problem does it solve?' },
    { label: 'Analyze a Disaster', prompt: 'Explain the flood and earthquake disaster early warning system.' },
    { label: 'How does the AI work?', prompt: 'How does the AI Decision Engine and autonomous actuation work?' },
    { label: 'Explore Architecture', prompt: 'Explain the 7-tier cloud-native architecture and serverless scaling.' },
    { label: 'Check City Systems', prompt: 'What is the current status of the digital twin and municipal sensors?' },
    { label: 'Help me solve a problem', prompt: 'There is heavy rainfall and the drainage system is almost full. What should the city do?' },
  ];

  const getStepIcon = (iconType?: string) => {
    switch (iconType) {
      case 'event':
      case 'problem':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />;
      case 'sensor':
        return <Radio className="w-3.5 h-3.5 text-cyan-400" />;
      case 'ai':
        return <Cpu className="w-3.5 h-3.5 text-purple-400" />;
      case 'decision':
      case 'action':
        return <Zap className="w-3.5 h-3.5 text-blue-400" />;
      case 'status':
      case 'outcome':
      default:
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* 1. Floating Circular Launcher Button (Default State) */}
      {!isOpen && (
        <div className="relative group">
          {/* Glowing pulse ring */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 opacity-70 blur-md group-hover:opacity-100 transition-opacity animate-pulse" />

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open NEXUS AI Assistant"
            className="relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#050b1a] border-2 border-cyan-400 text-slate-100 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <div className="relative flex items-center justify-center">
              <Bot className="w-6 h-6 text-cyan-300 animate-bounce-slow" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#050b1a] animate-ping" />
            </div>

            <div className="text-left hidden sm:block">
              <div className="text-[11px] font-mono font-extrabold text-cyan-300 tracking-wider flex items-center gap-1.5">
                <span>ASK NEXUS AI</span>
                <Sparkles className="w-3 h-3 text-amber-300" />
              </div>
              <div className="text-[9px] font-mono text-slate-400 leading-tight">
                Urban Intelligence
              </div>
            </div>
          </button>

          {/* Tooltip on hover for mobile/desktop */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono whitespace-nowrap shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            Ask NEXUS AI • Urban Intelligence Assistant
          </div>
        </div>
      )}

      {/* 2. Floating Chat Panel */}
      {isOpen && (
        <div
          className={`w-[92vw] sm:w-[460px] md:w-[480px] bg-[#050b1a]/98 border border-cyan-400/50 rounded-3xl shadow-2xl backdrop-blur-2xl flex flex-col justify-between overflow-hidden transition-all duration-300 text-left ${
            isMinimized
              ? 'h-16 shadow-lg border-cyan-500/30'
              : 'h-[85vh] sm:h-[620px] max-h-[720px]'
          }`}
          style={{
            boxShadow: '0 0 35px rgba(6, 182, 212, 0.22), 0 20px 40px rgba(0, 0, 0, 0.8)',
          }}
        >
          {/* Header Bar */}
          <div className="p-3.5 sm:p-4 border-b border-slate-800 bg-[#060e22] relative z-10 shrink-0 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative p-2 rounded-2xl bg-cyan-950 border border-cyan-400/50 text-cyan-300 shadow-md">
                <Bot className="w-5 h-5 text-cyan-300" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#050b1a]" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-extrabold text-slate-100 tracking-tight">
                    NEXUS AI
                  </h3>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                    URBAN BRAIN
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE
                  </span>
                  <span>•</span>
                  <span className="truncate max-w-[170px] sm:max-w-none text-slate-300">
                    Connected to NEXUS CITY systems
                  </span>
                </div>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleNewChat}
                className="p-1.5 rounded-lg border border-slate-700 bg-slate-900/80 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
                title="＋ New Chat"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleClear}
                className="p-1.5 rounded-lg border border-slate-700 bg-slate-900/80 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
                title="Clear Conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg border border-slate-700 bg-slate-900/80 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? (
                  <Maximize2 className="w-3.5 h-3.5" />
                ) : (
                  <Minimize2 className="w-3.5 h-3.5" />
                )}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg border border-slate-700 bg-slate-900/80 text-slate-300 hover:text-white hover:border-red-500/50 hover:bg-red-950/40 transition-colors"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Main Body (hidden when minimized) */}
          {!isMinimized && (
            <>
              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-2`}
                    >
                      {/* Message Bubble */}
                      <div
                        className={`max-w-[92%] sm:max-w-[88%] p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed transition-all ${
                          isUser
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-slate-950 font-medium rounded-br-none shadow-md shadow-cyan-950/30 font-sans'
                            : 'bg-[#08122a] border border-cyan-500/30 text-slate-200 rounded-bl-none shadow-lg'
                        }`}
                      >
                        {/* Header Badges for AI responses */}
                        {!isUser && (
                          <div className="flex flex-wrap items-center gap-1.5 mb-2 pb-1.5 border-b border-slate-800 text-[10px] font-mono">
                            {msg.mode && (
                              <span
                                className={`px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${
                                  msg.mode === 'simulation'
                                    ? 'bg-purple-950 border border-purple-500/60 text-purple-300'
                                    : msg.mode === 'problem_solving'
                                    ? 'bg-amber-950 border border-amber-500/60 text-amber-300'
                                    : msg.mode === 'disaster'
                                    ? 'bg-red-950 border border-red-500/60 text-red-300'
                                    : 'bg-cyan-950 border border-cyan-500/60 text-cyan-300'
                                }`}
                              >
                                {msg.mode === 'simulation' && '⚠️ SIMULATION MODE'}
                                {msg.mode === 'problem_solving' && '⚙️ PROBLEM SOLVING'}
                                {msg.mode === 'disaster' && '🛡️ DISASTER ADVISORY'}
                                {msg.mode === 'system_analysis' && '🌐 SYSTEM ANALYSIS'}
                                {msg.mode === 'information' && '💡 INFORMATION'}
                              </span>
                            )}

                            {msg.dataTag && (
                              <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[9px]">
                                {msg.dataTag}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Formatted Markdown-like Text */}
                        <div className="space-y-2 whitespace-pre-line text-xs sm:text-[13px] leading-relaxed">
                          {msg.text.split('\n\n').map((para, i) => {
                            if (para.startsWith('### ')) {
                              return (
                                <h4
                                  key={i}
                                  className="text-xs sm:text-sm font-bold text-cyan-300 uppercase tracking-wider"
                                >
                                  {para.replace('### ', '')}
                                </h4>
                              );
                            }
                            if (para.startsWith('> ')) {
                              return (
                                <blockquote
                                  key={i}
                                  className="pl-3 border-l-2 border-cyan-400 text-cyan-200/90 italic"
                                >
                                  {para.replace('> ', '')}
                                </blockquote>
                              );
                            }
                            return <p key={i}>{para}</p>;
                          })}
                        </div>

                        {/* Structured Pipeline Timeline (Problem Solving & Simulation) */}
                        {msg.pipeline && msg.pipeline.length > 0 && (
                          <div className="mt-3.5 space-y-2 pt-2 border-t border-slate-800/80">
                            <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
                              Autonomous Execution Pipeline
                            </div>
                            <div className="space-y-1.5">
                              {msg.pipeline.map((step, idx) => (
                                <div
                                  key={idx}
                                  className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-left"
                                >
                                  <div className="flex items-center justify-between gap-2 mb-1">
                                    <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-cyan-300">
                                      {getStepIcon(step.iconType)}
                                      <span>{step.phase}</span>
                                    </div>
                                    {step.badge && (
                                      <span className="px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-400 text-[9px] font-mono">
                                        {step.badge}
                                      </span>
                                    )}
                                  </div>
                                  <div className="font-bold text-slate-200 text-xs mb-0.5">
                                    {step.title}
                                  </div>
                                  <div className="text-[11px] text-slate-300 leading-normal">
                                    {step.description}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Systems Involved tags */}
                        {msg.systemsInvolved && msg.systemsInvolved.length > 0 && (
                          <div className="mt-3 pt-2 border-t border-slate-800/80 flex flex-wrap gap-1 items-center">
                            <span className="text-[9px] font-mono text-slate-500 uppercase mr-1">
                              Systems:
                            </span>
                            {msg.systemsInvolved.map((sys, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-mono text-cyan-300"
                              >
                                {sys}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Explicit Warning Disclaimer (Disaster & Drills) */}
                        {msg.warningDisclaimer && (
                          <div className="mt-2.5 p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-[10px] text-slate-400 font-mono flex items-start gap-1.5">
                            <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                            <span>{msg.warningDisclaimer}</span>
                          </div>
                        )}

                        {/* Quick Navigation Action Links */}
                        {msg.quickActions && msg.quickActions.length > 0 && (
                          <div className="mt-3 pt-2 border-t border-slate-800 flex flex-wrap gap-1.5">
                            {msg.quickActions.map((action, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  onNavigatePage(action.page, action.tab);
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/60 font-mono text-[10px] font-bold transition-all shadow-sm"
                              >
                                <span>{action.label}</span>
                                <ArrowRight className="w-2.5 h-2.5" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Timestamp */}
                      <span className="text-[9px] font-mono text-slate-500 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })}

                {/* Animated Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#08122a] border border-cyan-500/30 w-fit text-xs font-mono text-cyan-300 shadow-md">
                    <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span>NEXUS AI is synthesizing multi-system model</span>
                    <span className="flex gap-1 ml-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping delay-150" />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping delay-300" />
                    </span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Action Suggestion Chips */}
              <div className="p-2 sm:px-3 border-t border-slate-800/80 bg-[#060c1d] shrink-0">
                <div className="text-[9px] font-mono text-slate-400 uppercase mb-1.5 px-1 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                  <span>Smart Prompts</span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-mono">
                  {quickSuggestions.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(item.prompt)}
                      className="px-2.5 py-1 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-slate-900 whitespace-nowrap transition-all shadow-sm active:scale-95"
                    >
                      [{item.label}]
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Bar Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 border-t border-slate-800 bg-[#060e22] relative z-10 shrink-0"
              >
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask about city systems, simulate a flood, solve an issue..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400/80 transition-colors"
                  />

                  <button
                    type="submit"
                    disabled={!inputText.trim() || isTyping}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md shadow-cyan-950/50 shrink-0"
                    title="Send message"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                  </button>
                </div>

                {/* Footer Brand Credit */}
                <div className="mt-2 text-center text-[9px] font-mono text-slate-400 flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>NEXUS AI • Powered by NEXUS CITY Intelligence</span>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};
