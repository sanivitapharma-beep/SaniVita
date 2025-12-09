import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <SEO 
        title="تواصل معنا - سانيفيتا فارما"
        description="تواصل مع فريق سانيفيتا فارما. نحن هنا للإجابة على استفساراتك حول منتجاتنا أو لتقديم الدعم والمساعدة."
        keywords="اتصل بنا, سانيفيتا, خدمة العملاء, عنوان الشركة"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">تواصل معنا</h1>
          <p className="text-lg text-slate-500">نحن هنا للإجابة على استفساراتك ومساعدتك.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-slate-50 p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">أرسل لنا رسالة</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">الاسم</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none bg-white" placeholder="اسمك الكريم" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">البريد الإلكتروني</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none bg-white" placeholder="example@mail.com" />
                </div>
              </div>
              
              <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">الموضوع</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none bg-white" placeholder="كيف يمكننا مساعدتك؟" />
              </div>

              <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">الرسالة</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none bg-white" placeholder="اكتب رسالتك هنا..."></textarea>
              </div>

              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2">
                إرسال الرسالة
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4">
               <div className="bg-primary-100 p-3 rounded-full text-primary-600">
                 <MapPin className="w-6 h-6" />
               </div>
               <div>
                 <h3 className="text-xl font-bold text-slate-800 mb-2">مقر الشركة</h3>
                 <p className="text-slate-500">26 شارع محمود البكري مدينة الجندول الزاويه الحمراء القاهرة</p>
               </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4">
               <div className="bg-primary-100 p-3 rounded-full text-primary-600">
                 <Phone className="w-6 h-6" />
               </div>
               <div>
                 <h3 className="text-xl font-bold text-slate-800 mb-2">اتصل بنا</h3>
                 <p className="text-slate-500 text-lg dir-ltr text-right">+20 1009760524</p>
                 <p className="text-slate-400 text-sm mt-1">يومياً من 9 صباحاً حتى 6 مساءً</p>
               </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4">
               <div className="bg-primary-100 p-3 rounded-full text-primary-600">
                 <Mail className="w-6 h-6" />
               </div>
               <div>
                 <h3 className="text-xl font-bold text-slate-800 mb-2">البريد الإلكتروني</h3>
                 <p className="text-slate-500">info@sanivita.com</p>
                 <p className="text-slate-500">sales@sanivita.com</p>
               </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="rounded-3xl overflow-hidden h-64 bg-slate-200 shadow-inner relative">
                <img 
                    src="https://maps.googleapis.com/maps/api/staticmap?center=30.0444,31.2357&zoom=14&size=600x300&sensor=false&key=YOUR_API_KEY_HERE" 
                    alt="موقع شركة سانيفيتا فارما على الخريطة" 
                    className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-500"
                    // Fallback since no key
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/600x300.png?text=SaniVita+Location+Map";
                    }}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;