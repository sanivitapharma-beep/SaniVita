
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'الرئيسية', value: Page.HOME },
    { label: 'منتجاتنا', value: Page.PRODUCTS },
    { label: 'المقالات الطبية', value: Page.ARTICLES },
    { label: 'قصتنا', value: Page.ABOUT },
  ];

  const handleNav = (page: Page) => {
    onNavigate(page);
    setIsOpen(false);
  };

  const isNavItemActive = (itemValue: Page) => {
      if (currentPage === itemValue) return true;
      if (itemValue === Page.ARTICLES && currentPage === Page.ARTICLE_DETAIL) return true;
      if (itemValue === Page.PRODUCTS && currentPage === Page.PRODUCT_DETAIL) return true;
      return false;
  };

  return (
    <header className="w-full z-50 transition-all duration-300">
      
      {/* 1. Top Utility Bar - Corporate Feel */}
      <div className="bg-primary-900 text-white py-2 text-xs md:text-sm hidden md:block border-b border-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-primary-100 hover:text-white transition-colors">
              <Phone className="w-4 h-4 text-secondary-500" />
              <span>+20 1009760524</span>
            </span>
            <span className="flex items-center gap-2 text-primary-100 hover:text-white transition-colors">
              <Mail className="w-4 h-4 text-secondary-500" />
              <span>info@sanivita.com</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-primary-200">تابعنا على:</span>
            <div className="flex gap-3">
               <a href="#" className="hover:text-secondary-500 transition-colors"><Facebook className="w-4 h-4" /></a>
               <a href="#" className="hover:text-secondary-500 transition-colors"><Instagram className="w-4 h-4" /></a>
               <a href="#" className="hover:text-secondary-500 transition-colors"><Twitter className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className={`w-full bg-white transition-all duration-300 border-b border-slate-100 ${scrolled ? 'shadow-md py-2 sticky top-0' : 'py-4 relative'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Identity */}
            <div 
              className="flex items-center cursor-pointer group gap-3" 
              onClick={() => handleNav(Page.HOME)}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-secondary-500 rounded-xl rotate-6 group-hover:rotate-12 transition-transform opacity-20"></div>
                <img 
                  src="https://lh3.googleusercontent.com/d/1uNrswnyenPwKrAcEr8t1JduTJPjNkzo3" 
                  alt="SaniVita Logo" 
                  referrerPolicy="no-referrer"
                  className="h-12 w-12 md:h-14 md:w-14 relative z-10 object-contain drop-shadow-sm"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary-900 leading-none">
                  SaniVita<span className="text-secondary-500">.</span>
                </h1>
                <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Pharma</span>
              </div>
            </div>

            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNav(item.value)}
                  className={`px-4 py-2 rounded-lg text-base font-bold transition-all duration-200 relative overflow-hidden group ${
                    isNavItemActive(item.value)
                      ? 'text-primary-700'
                      : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                  {/* Animated underline for active state */}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-secondary-500 transition-all duration-300 ${
                      isNavItemActive(item.value) ? 'w-full' : 'w-0 group-hover:w-full opacity-50'
                  }`}></span>
                </button>
              ))}
              
              {/* CTA Button in Nav */}
              <div className="mr-6 pr-6 border-r border-slate-200">
                <button 
                  onClick={() => handleNav(Page.CONTACT)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
                >
                  تواصل معنا
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-600 hover:text-primary-600 focus:outline-none p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl animate-fade-in-down z-50">
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNav(item.value)}
                  className={`block w-full text-right px-4 py-3 rounded-xl text-lg font-bold transition-colors ${
                    isNavItemActive(item.value)
                      ? 'bg-primary-50 text-primary-700 border-r-4 border-secondary-500'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <hr className="border-slate-100 my-2" />
              <button 
                  onClick={() => handleNav(Page.CONTACT)}
                  className="block w-full text-center bg-primary-600 text-white px-4 py-3 rounded-xl font-bold shadow-md active:scale-95 transition-transform"
                >
                  تواصل معنا
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
