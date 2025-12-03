import React from 'react';
import { Target, Eye, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">من نحن</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">قصتنا، رؤيتنا، والتزامنا بصحتك.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">قصة SaniVita Pharma</h2>
                <p className="text-lg text-slate-600 leading-8 mb-12 text-center">
                    تأسست SaniVita Pharma برؤية واضحة: سد الفجوة بين الطبيعة والعلم. بدأنا رحلتنا بهدف توفير مكملات غذائية آمنة وفعالة تدعم نمط الحياة الصحي. نحن نؤمن بأن الوقاية خير من العلاج، وأن الجسم السليم هو أساس السعادة.
                    <br /><br />
                    فريقنا يتكون من صيادلة وخبراء تغذية وباحثين يعملون بشغف لابتكار تركيبات فريدة تلبي احتياجات جميع أفراد الأسرة، من الأطفال إلى كبار السن.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-primary-50 p-8 rounded-2xl text-center hover:bg-primary-100 transition-colors">
                        <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <Target className="w-8 h-8 text-primary-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">مهمتنا</h3>
                        <p className="text-slate-600">تمكين الأفراد من عيش حياة صحية ومتوازنة من خلال توفير حلول غذائية مبتكرة وعالية الجودة.</p>
                    </div>

                    <div className="bg-secondary-50 p-8 rounded-2xl text-center hover:bg-secondary-100 transition-colors">
                        <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <Eye className="w-8 h-8 text-secondary-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">رؤيتنا</h3>
                        <p className="text-slate-600">أن نكون الشركة الرائدة والمرجع الأول في مجال المكملات الغذائية في الشرق الأوسط.</p>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-2xl text-center hover:bg-slate-100 transition-colors">
                        <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <Award className="w-8 h-8 text-slate-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">قيمنا</h3>
                        <p className="text-slate-600">الشفافية، الجودة، الابتكار، والمسؤولية تجاه مجتمعنا وعملائنا.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
      
       {/* Team/Office Image (Placeholder) */}
       <div className="max-w-7xl mx-auto px-4 mt-20">
         <div className="relative rounded-3xl overflow-hidden h-96 shadow-lg">
           <img 
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Laboratory" 
            className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
             <div className="p-8 text-white">
               <h3 className="text-2xl font-bold mb-2">مختبراتنا</h3>
               <p className="text-slate-200">مجهزة بأحدث التقنيات لضمان السلامة والفعالية.</p>
             </div>
           </div>
         </div>
       </div>
    </div>
  );
};

export default About;