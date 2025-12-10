
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductsPage from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import ArticlesList from './pages/ArticlesList';
import ArticleDetail from './pages/ArticleDetail';
import ProductDetail from './pages/ProductDetail';
import AdminDashboard from './pages/AdminDashboard';
import ScrollToTop from './components/ScrollToTop';
import { Page, Article, Product } from './types';
import { products } from './data/products';
import { ArticleProvider, useArticles } from './context/ArticleContext';

// Helper component to find article within context for detail view
const ArticleDetailWrapper: React.FC<{ 
    articleId: string | null; 
    onNavigate: (page: Page) => void;
}> = ({ articleId, onNavigate }) => {
    const { articles } = useArticles();
    const article = articleId ? articles.find(a => a.id === articleId) : null;

    if (!article) {
        // If not found, go back to list
        return <ArticlesList onNavigate={onNavigate} onSelectArticle={() => {}} />;
    }
    return <ArticleDetail article={article} onNavigate={onNavigate} />;
};

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Initialize state from URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    const idParam = params.get('id');

    if (pageParam === 'article_detail' && idParam) {
        setSelectedArticleId(idParam);
        setCurrentPage(Page.ARTICLE_DETAIL);
    } else if (pageParam === 'product_detail' && idParam) {
      const foundProduct = products.find(p => p.id === idParam);
      if (foundProduct) {
        setSelectedProduct(foundProduct);
        setCurrentPage(Page.PRODUCT_DETAIL);
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
          setSelectedArticleId(idParam);
          setCurrentPage(Page.ARTICLE_DETAIL);
      } else if (pageParam === 'product_detail' && idParam) {
        const foundProduct = products.find(p => p.id === idParam);
        if (foundProduct) {
          setSelectedProduct(foundProduct);
          setCurrentPage(Page.PRODUCT_DETAIL);
        }
      } else if (pageParam && Object.values(Page).includes(pageParam as Page)) {
        setCurrentPage(pageParam as Page);
        setSelectedArticleId(null);
        setSelectedProduct(null);
      } else {
        setCurrentPage(Page.HOME);
        setSelectedArticleId(null);
        setSelectedProduct(null);
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

    if (currentPage === Page.ARTICLE_DETAIL && selectedArticleId) {
      url.searchParams.set('page', 'article_detail');
      url.searchParams.set('id', selectedArticleId);
    } else if (currentPage === Page.PRODUCT_DETAIL && selectedProduct) {
      url.searchParams.set('page', 'product_detail');
      url.searchParams.set('id', selectedProduct.id);
    } else if (currentPage !== Page.HOME) {
      url.searchParams.set('page', currentPage);
    }

    // Only update history if the URL is different to avoid redundant entries
    if (window.location.href !== url.toString()) {
      window.history.pushState({}, '', url);
    }
  }, [currentPage, selectedArticleId, selectedProduct]);

  const handleProductSelect = (product: Product) => {
      setSelectedProduct(product);
      setCurrentPage(Page.PRODUCT_DETAIL);
  };

  const handleArticleSelect = (article: Article) => {
      setSelectedArticleId(article.id);
      setCurrentPage(Page.ARTICLE_DETAIL);
  }

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <Home onNavigate={setCurrentPage} onSelectProduct={handleProductSelect} />;
      case Page.PRODUCTS:
        return <ProductsPage onSelectProduct={handleProductSelect} />;
      case Page.ABOUT:
        return <About />;
      case Page.CONTACT:
        return <Contact />;
      case Page.ADMIN:
        return <AdminDashboard onNavigate={setCurrentPage} />;
      case Page.ARTICLES:
        return <ArticlesList onNavigate={setCurrentPage} onSelectArticle={handleArticleSelect} />;
      case Page.ARTICLE_DETAIL:
        return <ArticleDetailWrapper articleId={selectedArticleId} onNavigate={setCurrentPage} />;
      case Page.PRODUCT_DETAIL:
        return selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onNavigate={setCurrentPage} 
            onSelectProduct={handleProductSelect}
          />
        ) : (
          <ProductsPage onSelectProduct={handleProductSelect} />
        );
      default:
        return <Home onNavigate={setCurrentPage} onSelectProduct={handleProductSelect} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans" dir="rtl">
      {/* Hide header on admin page for cleaner look, optional */}
      {currentPage !== Page.ADMIN && (
          <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      )}
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Hide footer on admin page */}
      {currentPage !== Page.ADMIN && (
          <Footer onNavigate={setCurrentPage} />
      )}
      <ScrollToTop />
    </div>
  );
};

const App: React.FC = () => {
    return (
        <ArticleProvider>
            <AppContent />
        </ArticleProvider>
    );
};

export default App;