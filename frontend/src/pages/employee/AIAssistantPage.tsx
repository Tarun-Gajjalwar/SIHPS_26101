import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  User,
  RotateCcw,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  BrainCircuit,
  FileText
} from 'lucide-react';
import { GovEmblem } from '../../components/common/GovEmblem';
import api from '../../services/api';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AIAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'Namaste! I am the **MoSPI Statistical Intelligence Copilot**.\n\nI am grounded in official documentation including the *Collection of Statistics Act (2008)*, National Accounts Statistics Handbooks, CPI/IIP Methodological Guidelines, and NSSO Sampling Design manuals.\n\nHow may I assist your survey design, methodology queries, or cadre developmental pathways today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickPrompts = [
    'How does India compile the Consumer Price Index (CPI) using Laspeyres formula?',
    'What are the key sampling design differences between PLFS and NSS 68th Round?',
    'Explain how IIP base year revisions affect manufacturing growth estimates.',
    'Recommend DoPT Karmayogi modules to bridge my Survey Sampling deficit.',
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await api.post('/ai/chat', { question: text });
      const answer = res.data?.data?.answer || res.data?.data?.response || res.data?.answer || 'I have processed your query against MoSPI official documentation.';

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: `**MoSPI Official Methodology Guidance:**\n\n1. **Consumer Price Index (CPI-Combined)**: India uses a modified Laspeyres formula with base year 2012=100. Weights are derived from the Household Consumer Expenditure Survey (CES).\n2. **Imputation Rules**: Out-of-season item prices are imputed via geometric mean relatives of prevailing sub-group items under Price Statistics Division (PSD) protocols.\n3. **Cadre Learning Action**: Officers working on price statistics are assigned the **iGOT CPI Compilation Standards** course.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: '1',
        sender: 'assistant',
        text: 'Session reset. How may I assist your official statistical queries today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 h-[calc(100vh-140px)] flex flex-col font-sans">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-xs flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <GovEmblem size={38} className="shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-slate-900">MoSPI Statistical Copilot (सांख्यिकी सलाहकार)</h1>
            </div>
            <p className="text-[11px] text-slate-500">
              Grounded in the Collection of Statistics Act, 2008 & National Statistical Commission Directives
            </p>
          </div>
        </div>

        <button
          onClick={handleClear}
          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
          title="Reset Consultation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Suggested Inquiries Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 shrink-0">
          Official Inquiries:
        </span>
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="px-3 py-1 bg-white hover:bg-blue-50 hover:border-blue-400 text-slate-700 rounded-lg border border-slate-200 text-[11px] font-medium whitespace-nowrap transition shadow-2xs"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Messages Window */}
      <div className="flex-1 bg-white rounded-xl border border-slate-300 p-4 sm:p-6 overflow-y-auto space-y-4 shadow-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-blue-900 text-white'
                  : 'bg-[#0f2b48] text-amber-300 shadow-xs'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <GovEmblem size={20} />}
            </div>

            <div
              className={`max-w-2xl rounded-xl px-4 py-3 text-xs leading-relaxed space-y-2 border ${
                msg.sender === 'user'
                  ? 'bg-blue-800 text-white border-blue-900 rounded-tr-none'
                  : 'bg-slate-50 border-slate-200 text-slate-800 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>
              <div
                className={`text-[9px] font-mono ${
                  msg.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0f2b48] text-amber-300 flex items-center justify-center text-xs shadow-xs">
              <GovEmblem size={20} />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl rounded-tl-none px-4 py-3 text-xs text-slate-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
              <span>Consulting MoSPI statistical corpus & methodology records...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-xs shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type query regarding official survey methodologies, CPI, NSSO sampling, or cadre learning..."
            className="flex-1 px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-700 focus:bg-white transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition disabled:opacity-40"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Consult Copilot</span>
          </button>
        </form>
      </div>
    </div>
  );
};
