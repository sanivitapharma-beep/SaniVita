
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, Info } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { useProducts } from '../context/ProductContext';

const SmartAdvisor: React.FC = () => {
  const { products } = useProducts();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'أهلاً بك! أنا مساعد SaniVita الذكي. كيف يمكنني مساعدتك في اختيار المكمل الغذائي المناسب لصحتك اليوم؟' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
        // Create a placeholder for the AI response
        setMessages(prev => [...prev, { role: 'model', text: '' }]);
        
        const stream = await sendMessageToGemini(userMessage, products);
        let fullText = '';
        
        for await (const chunk of stream) {
            fullText += chunk;
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMsg = newMessages[newMessages.length - 1];
                if (lastMsg.role === 'model') {
                    lastMsg.text = fullText;
                }
                return newMessages;
            });
        }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: 'عذراً، حدث خطأ أثناء الاتصال بالخدمة. يرجى المحاولة مرة أخرى لاحقاً.', 
        isError: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 flex flex-col items-center">
      <div className="w-full max-w-4xl px-4 flex-1 flex flex-col">
        
        <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-500 to-primary-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md mb-4">
                <Sparkles className="w-4 h-4" />
                <span>مدعوم بالذكاء الاصطناعي</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">مستشار SaniVita الصحي</h1>
            <p className="text-slate-500 mt-2">احصل على ترشيحات مخصصة لمنتجاتنا بناءً على احتياجاتك.</p>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 flex-1 flex flex-col overflow-hidden h-[600px]">
          
          {/* Chat Header */}
          <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="bg-secondary-100 p-2 rounded-full">
                    <Bot className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800">المساعد الذكي</h3>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-xs text-slate-500">متاح الآن</span>
                    </div>
                </div>
             </div>
             <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-white px-3 py-1.5 rounded-lg border border-slate-100">
                <Info className="w-3 h-3" />
                نصائح الذكاء الاصطناعي لا تغني عن استشارة الطبيب
             </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                    msg.role === 'user' ? 'bg-primary-600 text-white' : 'bg-white text-secondary-600 border border-slate-100'
                }`}>
                    {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                
                <div className={`max-w-[80%] rounded-2xl px-5 py-4 leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                    ? 'bg-primary-600 text-white rounded-tr-none' 
                    : msg.isError 
                        ? 'bg-red-50 text-red-600 border border-red-100'
                        : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                }`}>
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>
              </div>
            ))}
            {isLoading && !messages[messages.length -1].text && (
                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white text-secondary-600 border border-slate-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Loader2 className="w-5 h-5 animate-spin" />
                    </div>
                    <div className="bg-white px-5 py-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center">
                        <div className="flex gap-1">
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                        </div>
                    </div>
                 </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative">
                <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="اكتب استفسارك هنا..."
                    className="w-full pl-14 pr-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none resize-none h-16 bg-slate-50"
                    disabled={isLoading}
                />
                <button 
                    onClick={handleSend}
                    disabled={isLoading || !inputValue.trim()}
                    className={`absolute left-2 top-2 bottom-2 aspect-square rounded-lg flex items-center justify-center transition-all ${
                        isLoading || !inputValue.trim()
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-primary-600 hover:bg-primary-700 text-white shadow-md active:scale-95'
                    }`}
                >
                    <Send className={`w-5 h-5 ${isLoading ? 'hidden' : 'block'}`} />
                    {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                </button>
            </div>
            <p className="text-center text-xs text-slate-400 mt-2 md:hidden">
                نصائح الذكاء الاصطناعي لا تغني عن استشارة الطبيب
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartAdvisor;
