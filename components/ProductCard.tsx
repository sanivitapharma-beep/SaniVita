
import React, { useState } from 'react';
import { Product } from '../types';
import { 
  CheckCircle, ArrowRight, Share2, Wind, Shield, Activity, 
  Heart, Sparkles, Zap, Package, Facebook, Twitter, Link as LinkIcon, Check, MessageCircle 
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  
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

  const getShareUrl = () => {
    // Generate a deep link to the specific product page
    return `${window.location.origin}?page=product_detail&id=${product.id}`;
  };

  const handleSocialShare = (platform: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = encodeURIComponent(getShareUrl());
    // Include product name and description in the shared text
    const text = encodeURIComponent(`اكتشف ${product.name} من SaniVita Pharma: ${product.description}`);
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Copy full details with the specific link
    const textToCopy = `${product.name}\n${product.description}\n${getShareUrl()}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        setTimeout(() => setShowShareMenu(false), 2000);
    });
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-visible flex flex-col h-full group relative"
      onMouseLeave={() => setShowShareMenu(false)}
    >
      {/* Share Button & Dropdown */}
      <div className="absolute top-4 left-4 z-30">
          <button 
              onClick={(e) => { e.stopPropagation(); setShowShareMenu(!showShareMenu); }}
              className="bg-white/90 hover:bg-secondary-50 p-2 rounded-full text-slate-400 hover:text-secondary-500 shadow-sm border border-slate-100 transition-colors"
              aria-label="مشاركة المنتج"
          >
              <Share2 className="w-4 h-4" />
          </button>

          {/* Share Menu */}
          {showShareMenu && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 p-2 flex flex-col gap-1 min-w-[40px] animate-modal z-40">
                  <button onClick={(e) => handleSocialShare('facebook', e)} className="p-2 hover:bg-blue-50 rounded-lg text-[#1877F2] transition-colors" title="Facebook">
                      <Facebook className="w-4 h-4" />
                  </button>
                  <button onClick={(e) => handleSocialShare('twitter', e)} className="p-2 hover:bg-sky-50 rounded-lg text-[#1DA1F2] transition-colors" title="Twitter">
                      <Twitter className="w-4 h-4" />
                  </button>
                  <button onClick={(e) => handleSocialShare('whatsapp', e)} className="p-2 hover:bg-green-50 rounded-lg text-[#25D366] transition-colors" title="WhatsApp">
                      <MessageCircle className="w-4 h-4" />
                  </button>
                  <button onClick={handleCopyLink} className="p-2 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors" title="نسخ الرابط">
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                  </button>
              </div>
          )}
      </div>

      {/* Category Badge - Moved outside to prevent clipping and allow click-through */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-700 shadow-sm border border-slate-100">
          {product.category}
        </div>
      </div>
      
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
