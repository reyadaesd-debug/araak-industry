import React, { useState, useRef, useEffect } from 'react';
import { Language, ChatMessage } from '../types';
import { translations } from '../data/translations';
import { Bot, Send, X, Sparkles, User, RefreshCw, PhoneCall } from 'lucide-react';

interface AIAdvisorDrawerProps {
  lang: Language;
  onClose: () => void;
  onOpenRfq: () => void;
}

export const AIAdvisorDrawer: React.FC<AIAdvisorDrawerProps> = ({
  lang,
  onClose,
  onOpenRfq,
}) => {
  const t = translations[lang];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: lang === 'ar'
        ? 'أهلاً بك! أنا مستشار اراك الصناعي الذكي. كيف يمكنني مساعدتك اليوم في اختيار المقاطع والأنظمة المعدنية أو تقديم استفسارات المشاريع؟'
        : 'Welcome! I am the ARAAK Industrial Advisor. How can I assist you with metal profiles, specifications, or project inquiries?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    lang === 'ar' ? 'الفرق بين أوميغا وفورينج بالأسقف' : 'Main Channel vs Furring difference',
    lang === 'ar' ? 'سمك القاطع الجداري لارتفاع 4 أمتار' : 'Recommended stud for 4m wall',
    lang === 'ar' ? 'درجة جلفنة الصاج بالمصنع' : 'Galvanization standard Z275',
    lang === 'ar' ? 'الطاقة الإنتاجية اليومية' : 'Daily factory production capacity',
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (userText: string) => {
    if (!userText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, history }),
      });

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply || (lang === 'ar' ? 'أهلاً بك! يرجى توضيح استفسارك الفني.' : 'How can I further clarify your inquiry?'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: lang === 'ar'
          ? 'تنتج اراك الصناعية مقاطع مجلفنة بجودة عالية (Main Channel, Furring Channel, Wall Angle, C-Stud, U-Track) بطاقة 500 طن/وردية وبشهادات ISO. يسعدنا استقبال طلبك عبر زر طلب عرض السعر.'
          : 'ARAAK Industry produces premium ISO-certified galvanized profiles up to 500 tons/shift. Please use our RFQ button for direct quotes.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-[#070E11]/95 backdrop-blur-2xl border-l border-[#C5A059]/30 shadow-2xl flex flex-col justify-between">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#0B1519]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1A4F63] border border-[#C5A059]/40 flex items-center justify-center">
            <Bot className="w-5 h-5 text-[#C5A059]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-serif">{t.aiAdvisorTitle}</h3>
            <span className="text-[10px] text-[#C5A059] font-mono block">{t.aiAdvisorSub}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Prompts Bar */}
      <div className="p-3 bg-slate-950 border-b border-slate-800 overflow-x-auto flex gap-2 no-scrollbar">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp)}
            className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 hover:text-[#C5A059] hover:border-[#C5A059]/40 shrink-0 cursor-pointer"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Messages List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-[#C5A059] text-slate-950'
                  : 'bg-[#1A4F63] text-white border border-[#C5A059]/30'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-[#C5A059]" />}
            </div>

            <div
              className={`p-3.5 rounded-2xl max-w-[80%] text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#1A4F63] text-white rounded-tr-none'
                  : 'glass-panel text-slate-200 border border-slate-800 rounded-tl-none'
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-[9px] text-slate-400 font-mono block mt-1 text-left">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-[#C5A059] font-mono animate-pulse">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>{lang === 'ar' ? 'جاري التحليل الهندسي واستحضار المواصفات...' : 'Analyzing specifications...'}</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input & Direct RFQ Trigger */}
      <div className="p-4 border-t border-slate-800 bg-[#0B1519] space-y-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.aiPlaceholder}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-[#C5A059] outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="p-3 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#E5C158] text-slate-950 font-bold hover:scale-105 transition-transform cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <button
          onClick={() => {
            onClose();
            onOpenRfq();
          }}
          className="w-full py-2.5 rounded-xl bg-slate-900 border border-[#C5A059]/40 text-[#C5A059] text-xs font-bold hover:bg-[#1A4F63] hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>{lang === 'ar' ? 'الانتقال لطلب عرض سعر رسمي' : 'Switch to Official RFQ'}</span>
        </button>
      </div>

    </div>
  );
};
