
import React from 'react';
import { X, CheckCircle, Store, Tag, Info, Star, Wind, Shield, Activity, Heart, Sparkles, Zap, Package } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
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

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-primary-900/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-modal flex flex-col md:flex-row max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-slate-50 relative h-64 md:h-auto p-8 flex items-center justify-center flex-shrink-0">
          <img 
            src={product.image} 
            alt={product.name} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain drop-shadow-lg"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full text-slate-600 hover:text-red-500 transition-colors md:hidden shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 right-4 left-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-sm border border-slate-200 md:hidden">
             <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800">{product.category}</span>
             </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 flex flex-col flex-1 min-h-0 bg-white relative">
            <button 
                onClick={onClose}
                className="absolute top-4 left-4 bg-slate-50 hover:bg-slate-100 p-2 rounded-full text-slate-400 hover:text-slate-600 transition-colors hidden md:block z-10"
            >
                <X className="w-6 h-6" />
            </button>

            <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
                <div className="flex items-center gap-2 mb-4">
                    <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-bold border border-primary-100 flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {product.category}
                    </span>
                </div>
                
                <div className="flex items-start gap-4 mb-2">
                    <div className="bg-secondary-50 p-3 rounded-2xl border border-secondary-100 hidden sm:block">
                        <IconComponent className="w-8 h-8 text-secondary-500" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-1">{product.name}</h2>
                    </div>
                </div>

                <div className="space-y-8 mt-6">
                    <div>
                        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-3">
                            <Info className="w-5 h-5 text-accent-500" />
                            الوصف
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            {product.description}
                        </p>
                    </div>

                    <div>
                        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4">
                            <Star className="w-5 h-5 text-secondary-500" />
                            الفوائد والمميزات
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {product.benefits.map((benefit, idx) => (
                                <div key={idx} className="bg-slate-50 hover:bg-white p-4 rounded-2xl border border-slate-100 hover:border-secondary-200 hover:shadow-md transition-all duration-300 group">
                                    <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                                        <CheckCircle className="w-5 h-5 text-secondary-500" />
                                    </div>
                                    <p className="text-slate-700 font-medium text-sm leading-relaxed">{benefit}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Action - Informational only */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex-shrink-0 flex items-center justify-center gap-2 text-slate-500 font-medium">
                <Store className="w-5 h-5 text-secondary-500" />
                <span>متوفر في جميع الصيدليات الكبرى</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
