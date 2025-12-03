
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
import { articles } from './data/articles';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Initialize state from URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    const idParam = params.get('id');

    if (pageParam === 'article_detail' && idParam) {
      const foundArticle = articles.find(a => a.id === idParam);
      if (foundArticle) {
        setSelectedArticle(foundArticle);
        setCurrentPage(Page.ARTICLE_DETAIL);
      }
    } else if (pageParam && Object.values(Page).includes(pageParam as Page)) {
      setCurrentPage(pageParam as Page);
    }

    // Handle browser back/forward buttons
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get('page');
      const idParam = params.get('id');

      if (pageParam === 'article_detail' && idParam) {
        const foundArticle = articles.find(a => a.id === idParam);
        if (foundArticle) {
          setSelectedArticle(foundArticle);
          setCurrentPage(Page.ARTICLE_DETAIL);
        }
      } else if (pageParam && Object.values(Page).includes(pageParam as Page)) {
        setCurrentPage(pageParam as Page);
        setSelectedArticle(null);
      } else {
        setCurrentPage(Page.HOME);
        setSelectedArticle(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync URL with state changes
  useEffect(() => {
    window.scrollTo(0, 0);

    const url = new URL(window.location.href);
    url.search = ''; // Clear existing params

    if (currentPage === Page.ARTICLE_DETAIL && selectedArticle) {
      url.searchParams.set('page', 'article_detail');
      url.searchParams.set('id', selectedArticle.id);
    } else if (currentPage !== Page.HOME) {
      url.searchParams.set('page', currentPage);
    }

    // Only update history if the URL is different to avoid redundant entries
    if (window.location.href !== url.toString()) {
      window.history.pushState({}, '', url);
    }
  }, [currentPage, selectedArticle]);

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
