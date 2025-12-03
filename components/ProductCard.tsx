
import React from 'react';
import { Product } from '../types';
import { CheckCircle, ArrowRight, Share2, Wind, Shield, Activity, Heart, Sparkles, Zap, Package } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  
  const iconMap: Record<string, React.ElementType> = {
    wind: Wind,
    shield: Shield,
    activity: Activity,
    heart: Heart,
    sparkles: Sparkles,
    zap: Zap,
    package: Package
  };

  const IconComponent = iconMap[product.icon] || Package;

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Ensure we have a valid URL protocol for sharing.
    // In some sandbox environments, window.location.href might be 'about:srcdoc' which navigator.share rejects.
    let shareUrl = window.location.href;
    if (!shareUrl.startsWith('http')) {
        shareUrl = 'https://sanivita-pharma.com'; // Fallback URL for demo/sandbox
    }

    const shareData = {
      title: product.name,
      text: `اكتشف ${product.name} من SaniVita Pharma: ${product.description}`,
      url: shareUrl
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        throw new Error('Share API not supported');
      }
    } catch (err) {
      console.log('Error sharing:', err);
      // Fallback
      navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
      alert('تم نسخ معلومات المنتج للحافظة');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-visible flex flex-col h-full group relative">
      <div 
        className="relative h-64 overflow-hidden bg-white cursor-pointer p-4 flex items-center justify-center rounded-t-2xl"
        onClick={() => onViewDetails(product)}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-700 shadow-sm border border-slate-100">
          {product.category}
        </div>
        
        {/* Share Button */}
        <button 
            onClick={handleShare}
            className="absolute top-4 left-4 bg-white/90 hover:bg-secondary-50 p-2 rounded-full text-slate-400 hover:text-secondary-500 shadow-sm border border-slate-100 transition-colors z-10"
            aria-label="مشاركة المنتج"
        >
            <Share2 className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-6 flex-1 flex flex-col border-t border-slate-50 relative">
        {/* Prominent Icon */}
        <div className="absolute -top-8 left-6 bg-white p-3 rounded-2xl shadow-lg border border-slate-100 group-hover:scale-110 transition-transform duration-300 z-20">
            <IconComponent className="w-8 h-8 text-secondary-500" />
        </div>

        <div className="flex justify-between items-start mb-2 pt-2">
            <h3 className="text-xl font-bold text-slate-800">{product.name}</h3>
        </div>
        
        <p className="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-3">
          {product.description}
        </p>
        
        <div className="mt-auto">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">الفوائد الرئيسية:</h4>
          <ul className="space-y-1 mb-6">
            {product.benefits.slice(0, 2).map((benefit, idx) => (
              <li key={idx} className="flex items-center text-sm text-slate-600">
                <CheckCircle className="w-4 h-4 text-accent-500 ml-2 flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
          
          <button 
            onClick={() => onViewDetails(product)}
            className="w-full bg-slate-50 hover:bg-primary-600 text-slate-700 hover:text-white border border-slate-200 hover:border-transparent font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 group-btn"
          >
             <span>عرض التفاصيل</span>
             <ArrowRight className="w-4 h-4 text-secondary-500 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
