
import React, { useEffect } from 'react';
import { Article, Page } from '../types';
import { Calendar, User, Clock, ArrowRight, Share2, Tag } from 'lucide-react';

interface ArticleDetailProps {
  article: Article;
  onNavigate: (page: Page) => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onNavigate }) => {
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pb-20">
      
      {/* Hero Header */}
      <div className="relative h-[400px] md:h-[500px] w-full">
        <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Navigation Back */}
        <div className="absolute top-8 right-4 md:right-8 z-10">
            <button 
                onClick={() => onNavigate(Page.ARTICLES)}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all font-bold text-sm border border-white/30"
            >
                <ArrowRight className="w-4 h-4" />
                العودة للمقالات
            </button>
        </div>

        {/* Title Container */}
        <div className="absolute bottom-0 w-full p-6 md:p-12">
            <div className="max-w-4xl mx-auto text-white">
                <span className="inline-block bg-secondary-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-4">
                    {article.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                    {article.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-200">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                             <User className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{article.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime} قراءة</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-3xl mx-auto px-4 py-12 -mt-10 relative z-10">
        <div className="bg-white rounded-t-3xl md:rounded-3xl p-6 md:p-12 shadow-xl border border-slate-100">
            
            {/* Share Buttons (Placeholder) */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-8 mb-8">
                <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
                    <Tag className="w-4 h-4" />
                    <span>كلمات مفتاحية:</span>
                    <span className="text-primary-600">صحة، {article.category}، وقاية</span>
                </div>
                <button className="text-slate-400 hover:text-primary-600 transition-colors flex items-center gap-2 text-sm font-bold">
                    <Share2 className="w-4 h-4" />
                    مشاركة المقال
                </button>
            </div>

            {/* Paragraphs */}
            <div className="prose prose-lg prose-slate max-w-none text-slate-700 leading-8">
                <p className="font-bold text-xl text-slate-900 mb-8 leading-9">
                    {article.excerpt}
                </p>
                {article.content.map((paragraph, idx) => (
                    <p key={idx} className="mb-6 last:mb-0">
                        {paragraph}
                    </p>
                ))}
            </div>

            {/* Author Bio Box */}
            <div className="bg-primary-50 rounded-2xl p-6 mt-12 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 flex-shrink-0">
                    <User className="w-8 h-8" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-900">كتب بواسطة: {article.author}</h3>
                    <p className="text-sm text-slate-600 mt-1">
                        متخصص في {article.category}، يهدف لنشر الوعي الصحي وتقديم نصائح مبنية على الحقائق العلمية.
                    </p>
                </div>
            </div>

        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-primary-900 to-primary-800 rounded-3xl p-8 md:p-12 text-white shadow-lg relative overflow-hidden group cursor-pointer" onClick={() => onNavigate(Page.ADVISOR)}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/10 transition-colors"></div>
            <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">هل لديك استفسار صحي؟</h2>
                <p className="text-primary-100 mb-8 max-w-xl mx-auto">
                    مستشارنا الذكي جاهز للإجابة على أسئلتك ومساعدتك في اختيار المنتجات المناسبة لحالتك الصحية.
                </p>
                <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-transform active:scale-95">
                    استشر الآن مجاناً
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
