
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductsPage from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import SmartAdvisor from './pages/SmartAdvisor';
import ArticlesList from './pages/ArticlesList';
import ArticleDetail from './pages/ArticleDetail';
import { Page, Article } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <Home onNavigate={setCurrentPage} />;
      case Page.PRODUCTS:
        return <ProductsPage />;
      case Page.ABOUT:
        return <About />;
      case Page.CONTACT:
        return <Contact />;
      case Page.ADVISOR:
        return <SmartAdvisor />;
      case Page.ARTICLES:
        return <ArticlesList onNavigate={setCurrentPage} onSelectArticle={setSelectedArticle} />;
      case Page.ARTICLE_DETAIL:
        return selectedArticle ? (
          <ArticleDetail article={selectedArticle} onNavigate={setCurrentPage} />
        ) : (
          <ArticlesList onNavigate={setCurrentPage} onSelectArticle={setSelectedArticle} />
        );
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans" dir="rtl">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

export default App;
