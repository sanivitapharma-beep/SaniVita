
import React, { useEffect, useState } from 'react';
import { Article, Page } from '../types';
import { Calendar, User, Clock, ArrowRight, Tag, Facebook, Twitter, Linkedin, Link as LinkIcon, Check, MessageCircle } from 'lucide-react';

interface ArticleDetailProps {
  article: Article;
  onNavigate: (page: Page) => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onNavigate }) => {
  const [copied, setCopied] = useState(false);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getShareUrl = () => {
    // Construct a URL with query parameters that the App.tsx routing logic understands
    return `${window.location.origin}?page=article_detail&id=${article.id}`;
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(article.title);
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(getShareUrl());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    } catch (err) {
        console.error('Failed to copy', err);
    }
  };

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
            
            {/* Share Buttons */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-8 mb-8 gap-4">
                <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
                    <Tag className="w-4 h-4" />
                    <span>كلمات مفتاحية:</span>
                    <span className="text-primary-600">صحة، {article.category}، وقاية</span>
                </div>
                
                <div className="flex items-center gap-3 self-end md:self-auto">
                    <span className="text-slate-400 text-sm font-bold ml-2">مشاركة:</span>
                    
                    {/* Facebook */}
                    <button 
                        onClick={() => handleShare('facebook')} 
                        className="w-9 h-9 rounded-full bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all shadow-sm" 
                        title="مشاركة على فيسبوك"
                    >
                        <Facebook className="w-4 h-4" />
                    </button>

                    {/* Twitter */}
                    <button 
                        onClick={() => handleShare('twitter')} 
                        className="w-9 h-9 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-all shadow-sm" 
                        title="مشاركة على تويتر"
                    >
                        <Twitter className="w-4 h-4" />
                    </button>

                    {/* WhatsApp */}
                    <button 
                        onClick={() => handleShare('whatsapp')} 
                        className="w-9 h-9 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all shadow-sm" 
                        title="مشاركة على واتساب"
                    >
                        <MessageCircle className="w-4 h-4" />
                    </button>

                     {/* LinkedIn */}
                     <button 
                        onClick={() => handleShare('linkedin')} 
                        className="w-9 h-9 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-all shadow-sm" 
                        title="مشاركة على لينكد إن"
                    >
                        <Linkedin className="w-4 h-4" />
                    </button>

                    {/* Copy Link */}
                    <button 
                        onClick={copyToClipboard} 
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${
                            copied 
                            ? 'bg-green-100 text-green-600 hover:bg-green-600 hover:text-white' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-600 hover:text-white'
                        }`} 
                        title="نسخ الرابط"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                    </button>
                </div>
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
      </div>
    </div>
  );
};

export default ArticleDetail;