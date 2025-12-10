
import React, { useState } from 'react';
import { useArticles } from '../context/ArticleContext';
import { Article, Page } from '../types';
import { Calendar, User, Clock, ArrowLeft, Search } from 'lucide-react';
import SEO from '../components/SEO';

interface ArticlesListProps {
  onNavigate: (page: Page) => void;
  onSelectArticle: (article: Article) => void;
}

const ArticlesList: React.FC<ArticlesListProps> = ({ onNavigate, onSelectArticle }) => {
  const { articles } = useArticles(); // Use Context
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = articles.filter(article => 
    article.title.includes(searchTerm) || article.excerpt.includes(searchTerm)
  );

  const handleReadMore = (article: Article) => {
    onSelectArticle(article);
    onNavigate(Page.ARTICLE_DETAIL);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <SEO 
        title="المقالات الطبية - نصائح صحية موثوقة"
        description="اقرأ أحدث المقالات الطبية والنصائح الصحية من خبراء سانيفيتا فارما. معلومات عن المناعة، التغذية، صحة الأطفال، والجمال."
        keywords="مقالات طبية, مدونة صحية, نصائح تغذية, صحة الطفل, مقالات سانيفيتا"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">المقالات الطبية</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            مقالات متخصصة ونصائح طبية موثوقة لمساعدتك في الحفاظ على صحتك وصحة عائلتك.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
             <input 
                type="text" 
                placeholder="ابحث في المقالات..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm"
            />
            <Search className="absolute right-4 top-3.5 text-slate-400 w-5 h-5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <div key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col h-full">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden cursor-pointer" onClick={() => handleReadMore(article)}>
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-700 shadow-sm">
                      {article.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
                    </div>

                    <h2 
                        className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 cursor-pointer hover:text-secondary-500 transition-colors"
                        onClick={() => handleReadMore(article)}
                    >
                        {article.title}
                    </h2>
                    
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                            <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                                <User className="w-3 h-3" />
                            </div>
                            {article.author}
                        </div>
                        <button 
                            onClick={() => handleReadMore(article)}
                            className="text-secondary-500 hover:text-secondary-700 font-bold text-sm flex items-center gap-1"
                        >
                            اقرأ المزيد
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                    </div>
                  </div>
                </div>
              ))
          ) : (
             <div className="col-span-full text-center py-12 text-slate-500">
                لا توجد مقالات تطابق بحثك.
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticlesList;