
import React, { useState } from 'react';
import { products } from '../data/products';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { Search, Filter } from 'lucide-react';

interface ProductsPageProps {
  onSelectProduct: (product: Product) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ onSelectProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.includes(searchTerm) || product.description.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      
      {/* Hero Section with Background Image */}
      <div className="relative h-[400px] w-full mb-8 flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://lh3.googleusercontent.com/d/1AsWmNwnvbS3rRC4cIOrcVsqzJ-6FQXfL" 
                alt="Products Background" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
            />
            {/* Overlay - Reduced opacity for better lighting */}
            <div className="absolute inset-0 bg-primary-900/20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
            <div className="inline-block bg-black/30 backdrop-blur-[2px] rounded-2xl px-6 py-4 shadow-sm">
                <p className="text-lg md:text-xl text-white max-w-2xl mx-auto font-bold leading-relaxed drop-shadow-md">
                    تصفح مجموعتنا المتميزة من المكملات الغذائية المصممة لتعزيز صحتك ورفاهيتك.
                </p>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Filters and Search - Overlapping the hero slightly for modern look */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-10 flex flex-col md:flex-row gap-6 justify-between items-center -mt-16 relative z-20 border border-slate-100">
            {/* Search */}
            <div className="relative w-full md:w-96">
                <input 
                    type="text" 
                    placeholder="ابحث عن منتج..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-12 pl-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow bg-slate-50 focus:bg-white"
                />
                <Search className="absolute right-4 top-3.5 text-slate-400 w-5 h-5" />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                <Filter className="w-5 h-5 text-slate-400 ml-2 flex-shrink-0" />
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                            selectedCategory === cat 
                            ? 'bg-primary-600 text-white shadow-md' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        {cat === 'all' ? 'الكل' : cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    onViewDetails={onSelectProduct}
                />
            ))}
            </div>
        ) : (
            <div className="text-center py-20">
                <div className="inline-block p-4 rounded-full bg-slate-100 mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">لم يتم العثور على نتائج</h3>
                <p className="text-slate-500">جرب البحث بكلمات مختلفة أو تغيير التصنيف.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
