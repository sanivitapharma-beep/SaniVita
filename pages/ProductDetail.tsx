
import React, { useEffect, useState } from 'react';
import { Product, Page } from '../types';
import { 
    ArrowRight, CheckCircle, Store, Tag, Info, Star, Wind, Shield, Activity, 
    Heart, Sparkles, Zap, Package, Facebook, Twitter, MessageCircle, 
    Link as LinkIcon, Check, Linkedin 
} from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onNavigate: (page: Page) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onNavigate }) => {
  const [copied, setCopied] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    return `${window.location.origin}?page=product_detail&id=${product.id}`;
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`اكتشف ${product.name} من SaniVita Pharma: ${product.description}`);
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(getShareUrl());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    } catch (err) {
        console.error('Failed to copy', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Hero / Header Section */}
      <div className="bg-gradient-to-br from-primary-900 to-primary-700 pt-28 pb-32 relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             {/* Back Button */}
            <div className="mb-8">
                <button 
                    onClick={() => onNavigate(Page.PRODUCTS)}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all font-bold text-sm border border-white/20 backdrop-blur-sm w-fit"
                >
                    <ArrowRight className="w-4 h-4" />
                    العودة للمنتجات
                </button>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12">
                {/* Image Container */}
                <div className="w-full md:w-1/3 flex justify-center order-2 md:order-1">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-xl transform group-hover:scale-105 transition-transform duration-500"></div>
                        <div className="relative bg-white/10 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/20 shadow-2xl">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                referrerPolicy="no-referrer"
                                className="w-full h-64 md:h-80 object-contain drop-shadow-lg transform group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Info Header */}
                <div className="w-full md:w-2/3 text-center md:text-right order-1 md:order-2">
                    <div className="inline-flex items-center gap-2 bg-secondary-500/20 text-secondary-200 px-4 py-1.5 rounded-full text-sm font-bold border border-secondary-500/30 mb-6 backdrop-blur-sm">
                        <Tag className="w-4 h-4" />
                        {product.category}
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        {product.name}
                    </h1>
                    
                    <p className="text-xl text-primary-100 leading-relaxed max-w-2xl mx-auto md:mx-0 font-medium">
                        {product.description}
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            
            {/* Share & Actions Toolbar */}
            <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                        <IconComponent className="w-6 h-6 text-secondary-500" />
                    </div>
                    <div>
                        <span className="block text-xs text-slate-500 font-bold uppercase tracking-wider">السعر</span>
                        <span className="text-xl font-bold text-primary-900">{product.price || 'تواصل معنا'}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-sm font-bold hidden md:inline">مشاركة المنتج:</span>
                    <div className="flex gap-2">
                        {[
                            { id: 'facebook', icon: Facebook, color: 'text-[#1877F2]', bg: 'bg-[#1877F2]/10 hover:bg-[#1877F2]' },
                            { id: 'twitter', icon: Twitter, color: 'text-[#1DA1F2]', bg: 'bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]' },
                            { id: 'whatsapp', icon: MessageCircle, color: 'text-[#25D366]', bg: 'bg-[#25D366]/10 hover:bg-[#25D366]' },
                            { id: 'linkedin', icon: Linkedin, color: 'text-[#0A66C2]', bg: 'bg-[#0A66C2]/10 hover:bg-[#0A66C2]' },
                        ].map((btn) => (
                            <button 
                                key={btn.id}
                                onClick={() => handleShare(btn.id)} 
                                className={`w-10 h-10 rounded-full ${btn.bg} ${btn.color} flex items-center justify-center hover:text-white transition-all shadow-sm`}
                            >
                                <btn.icon className="w-5 h-5" />
                            </button>
                        ))}
                        <button 
                            onClick={copyToClipboard} 
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm ${
                                copied 
                                ? 'bg-green-100 text-green-600 hover:bg-green-600 hover:text-white' 
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-600 hover:text-white'
                            }`}
                        >
                            {copied ? <Check className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    
                    {/* Benefits Column */}
                    <div>
                        <h3 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-6">
                            <Star className="w-6 h-6 text-secondary-500" />
                            الفوائد والمميزات
                        </h3>
                        <div className="space-y-4">
                            {product.benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-start bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-secondary-200 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center flex-shrink-0 ml-4 shadow-sm">
                                        <CheckCircle className="w-5 h-5 text-secondary-500" />
                                    </div>
                                    <p className="text-slate-700 font-medium leading-relaxed mt-1">{benefit}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Description & Extra Info */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-6">
                                <Info className="w-6 h-6 text-primary-500" />
                                نظرة عامة
                            </h3>
                            <div className="prose prose-lg text-slate-600 leading-8">
                                <p>{product.description}</p>
                                <p className="mt-4">
                                    يتميز هذا المنتج بتركيبته الفريدة التي تجمع بين الفعالية والأمان، مصمم خصيصاً لتلبية احتياجات {product.category} بكفاءة عالية.
                                </p>
                            </div>
                        </div>

                        <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100">
                             <div className="flex items-center gap-3 mb-2 text-primary-800 font-bold">
                                <Store className="w-5 h-5" />
                                <span>متوفر الآن</span>
                             </div>
                             <p className="text-primary-600 text-sm">
                                يمكنك العثور على {product.name} في جميع الصيدليات الكبرى. اطلب المنتج بالاسم للحصول على العبوة الأصلية.
                             </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-slate-50 p-8 md:p-12 text-center border-t border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">هل لديك استفسار عن هذا المنتج؟</h3>
                <p className="text-slate-500 mb-8 max-w-xl mx-auto">
                    فريقنا الطبي ومستشارك الذكي جاهزون للإجابة على جميع تساؤلاتك حول الجرعات وطريقة الاستخدام.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <button 
                        onClick={() => onNavigate(Page.CONTACT)}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-bold shadow-md transition-transform active:scale-95"
                    >
                        تواصل معنا
                    </button>
                    <button 
                        onClick={() => onNavigate(Page.ADVISOR)}
                        className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 rounded-xl font-bold shadow-sm transition-colors"
                    >
                        استشر الخبير الذكي
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
