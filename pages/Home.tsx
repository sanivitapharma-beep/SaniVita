
import React from 'react';
import { Page, Product } from '../types';
import { ArrowRight, Activity, ShieldCheck, Leaf } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

interface HomeProps {
  onNavigate: (page: Page) => void;
  onSelectProduct: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onSelectProduct }) => {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[750px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/d/19fGQqUwDcQKOh-ZEyDxPFWoZmV3Nd72V" 
            alt="SaniVita Hero Background" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[70%_center]"
          />
          {/* Gradient Overlay - Lighter now since we have a text box */}
          <div className="absolute inset-0 bg-gradient-to-l from-white/10 via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Box Container */}
            <div className="text-right space-y-8 animate-fade-in-up bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/50">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full border border-primary-100">
                <span className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse"></span>
                <span className="text-sm font-bold text-primary-800">الخيار الأول للأطباء والمتخصصين</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
                الطريقة الذكية <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-500 to-primary-600">للحفاظ على صحة عائلتك</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl font-medium">
                في SaniVita Pharma، نمزج العلم بالطبيعة لنقدم لك مكملات غذائية عالية الجودة تساعدك على عيش حياة أكثر صحة وحيوية.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={() => onNavigate(Page.PRODUCTS)}
                  className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-2"
                >
                  استكشف منتجاتنا
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Empty column to let image show on the left */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">لماذا تختار SaniVita Pharma؟</h2>
            <p className="text-slate-500 text-lg">نلتزم بتقديم منتجات تفوق توقعاتك من حيث الجودة والفعالية</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: 'جودة مضمونة', text: 'جميع منتجاتنا خاضعة لأدق اختبارات الجودة العالمية وحاصلة على التراخيص اللازمة.' },
              { icon: Leaf, title: 'مكونات طبيعية', text: 'نستخدم أجود الخامات الطبيعية لضمان أقصى استفادة لجسمك بأمان تام.' },
              { icon: Activity, title: 'فعالية مثبتة', text: 'تركيبات علمية متطورة تضمن لك الحصول على النتائج المرجوة لصحتك.' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-accent-200 group">
                <div className="bg-white w-16 h-16 rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-primary-600 group-hover:text-secondary-500 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-primary-900 mb-2">الأكثر مبيعاً</h2>
              <p className="text-slate-500">منتجات يثق بها عملاؤنا</p>
            </div>
            <button 
              onClick={() => onNavigate(Page.PRODUCTS)}
              className="hidden md:flex items-center gap-2 text-primary-600 font-bold hover:text-secondary-500 transition-colors"
            >
              عرض الكل <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewDetails={onSelectProduct}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
             <button 
              onClick={() => onNavigate(Page.PRODUCTS)}
              className="bg-white border border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-bold shadow-sm"
            >
              عرض جميع المنتجات
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;