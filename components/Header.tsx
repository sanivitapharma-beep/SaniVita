
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'الرئيسية', value: Page.HOME },
    { label: 'منتجاتنا', value: Page.PRODUCTS },
    { label: 'المقالات', value: Page.ARTICLES },
    { label: 'من نحن', value: Page.ABOUT },
    { label: 'تواصل معنا', value: Page.CONTACT },
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
    <nav className="sticky top-0 z-50 bg-primary-900/95 backdrop-blur-md shadow-lg border-b border-primary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => handleNav(Page.HOME)}
          >
            <img 
              src="https://lh3.googleusercontent.com/d/1uNrswnyenPwKrAcEr8t1JduTJPjNkzo3" 
              alt="SaniVita Logo" 
              referrerPolicy="no-referrer"
              className="h-12 w-12 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300 object-cover bg-white"
            />
            <div className="mr-3">
              <h1 className="text-2xl font-bold text-white tracking-tight">SaniVita <span className="text-secondary-500">Pharma</span></h1>
              <p className="text-[10px] sm:text-xs text-primary-200 font-medium tracking-wide">الطريقة الذكية للحفاظ على صحة عائلتك</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1 space-x-reverse">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNav(item.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isNavItemActive(item.value)
                    ? 'bg-primary-800 text-white shadow-sm ring-2 ring-secondary-500'
                    : 'text-primary-100 hover:text-white hover:bg-primary-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary-100 hover:text-white focus:outline-none p-2"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary-900 border-b border-primary-800 absolute w-full shadow-xl animate-fade-in-down">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNav(item.value)}
                className={`block w-full text-right px-4 py-3 rounded-lg text-base font-medium ${
                  isNavItemActive(item.value)
                    ? 'bg-primary-800 text-white ring-1 ring-secondary-500'
                    : 'text-primary-100 hover:bg-primary-800 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;