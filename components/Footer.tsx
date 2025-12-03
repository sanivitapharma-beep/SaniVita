
import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
    onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-primary-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center mb-6">
              <img 
                  src="https://lh3.googleusercontent.com/d/1uNrswnyenPwKrAcEr8t1JduTJPjNkzo3" 
                  alt="SaniVita Logo" 
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-lg mr-3 shadow-md object-cover bg-white"
              />
              <h2 className="text-2xl font-bold">SaniVita<span className="text-secondary-500">Pharma</span></h2>
            </div>
            <p className="text-primary-100 leading-relaxed mb-6">
              الطريقة الذكية للحفاظ على صحة عائلتك. نسعى لتقديم أفضل المكملات الغذائية المصنعة وفقاً لأعلى معايير الجودة العالمية.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="bg-primary-800 p-2 rounded-full hover:bg-secondary-500 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="bg-primary-800 p-2 rounded-full hover:bg-secondary-500 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="bg-primary-800 p-2 rounded-full hover:bg-secondary-500 transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-accent-400">روابط سريعة</h3>
            <ul className="space-y-3">
              <li><button onClick={() => onNavigate(Page.HOME)} className="text-primary-200 hover:text-white transition-colors">الرئيسية</button></li>
              <li><button onClick={() => onNavigate(Page.ABOUT)} className="text-primary-200 hover:text-white transition-colors">من نحن</button></li>
              <li><button onClick={() => onNavigate(Page.PRODUCTS)} className="text-primary-200 hover:text-white transition-colors">منتجاتنا</button></li>
              <li><button onClick={() => onNavigate(Page.ARTICLES)} className="text-primary-200 hover:text-white transition-colors">المقالات</button></li>
              <li><button onClick={() => onNavigate(Page.ADVISOR)} className="text-primary-200 hover:text-white transition-colors">المستشار الذكي</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-accent-400">تواصل معنا</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-secondary-500 ml-3 mt-1 flex-shrink-0" />
                <span className="text-primary-200">26 شارع محمود البكري مدينة الجندول الزاويه الحمراء القاهرة</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-secondary-500 ml-3 flex-shrink-0" />
                <span className="text-primary-200">+20 1009760524</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-secondary-500 ml-3 flex-shrink-0" />
                <span className="text-primary-200">info@sanivita.com</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-primary-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-primary-400">
          <p>&copy; {new Date().getFullYear()} SaniVita Pharma. جميع الحقوق محفوظة.</p>
          <div className="flex space-x-6 space-x-reverse mt-4 md:mt-0">
            <a href="#" className="hover:text-white">سياسة الخصوصية</a>
            <a href="#" className="hover:text-white">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
