
import React, { useState } from 'react';
import { useArticles } from '../context/ArticleContext';
import { useProducts } from '../context/ProductContext';
import { Article, Page, Product } from '../types';
import { Trash2, Edit, Plus, Save, X, Image as ImageIcon, Lock, LogOut, Package, FileText } from 'lucide-react';

interface AdminDashboardProps {
    onNavigate: (page: Page) => void;
}

type Tab = 'articles' | 'products';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { articles, addArticle, updateArticle, deleteArticle } = useArticles();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('articles');
  const [isEditing, setIsEditing] = useState(false);
  
  // Article Form State
  const initialArticleState: Article = {
    id: '',
    title: '',
    excerpt: '',
    content: [],
    image: '',
    date: new Date().toLocaleDateString('ar-EG'),
    author: 'Admin',
    category: 'صحة عامة',
    readTime: '3 دقائق'
  };
  const [articleForm, setArticleForm] = useState<Article>(initialArticleState);
  const [articleContentString, setArticleContentString] = useState('');

  // Product Form State
  const initialProductState: Product = {
    id: '',
    name: '',
    category: '',
    description: '',
    benefits: [],
    image: '',
    price: '',
    icon: 'package'
  };
  const [productForm, setProductForm] = useState<Product>(initialProductState);
  const [productBenefitsString, setProductBenefitsString] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  };

  // --- Article Handlers ---
  const handleEditArticle = (article: Article) => {
    setArticleForm(article);
    setArticleContentString(article.content.join('\n\n'));
    setIsEditing(true);
    window.scrollTo(0, 0);
  };

  const handleNewArticle = () => {
    setArticleForm({ ...initialArticleState, id: Date.now().toString() });
    setArticleContentString('');
    setIsEditing(true);
    window.scrollTo(0, 0);
  };

  const submitArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const processedContent = articleContentString.split('\n\n').filter(p => p.trim() !== '');
    const finalArticle = { ...articleForm, content: processedContent };

    if (articles.some(a => a.id === finalArticle.id)) {
        updateArticle(finalArticle);
    } else {
        addArticle(finalArticle);
    }
    setIsEditing(false);
    alert('تم حفظ المقال بنجاح!');
  };

  const handleDeleteArticle = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المقال؟')) deleteArticle(id);
  };

  // --- Product Handlers ---
  const handleEditProduct = (product: Product) => {
    setProductForm(product);
    setProductBenefitsString(product.benefits.join('\n'));
    setIsEditing(true);
    window.scrollTo(0, 0);
  };

  const handleNewProduct = () => {
    setProductForm({ ...initialProductState, id: Date.now().toString() });
    setProductBenefitsString('');
    setIsEditing(true);
    window.scrollTo(0, 0);
  };

  const submitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const processedBenefits = productBenefitsString.split('\n').filter(b => b.trim() !== '');
    const finalProduct = { ...productForm, benefits: processedBenefits };

    if (products.some(p => p.id === finalProduct.id)) {
        updateProduct(finalProduct);
    } else {
        addProduct(finalProduct);
    }
    setIsEditing(false);
    alert('تم حفظ المنتج بنجاح!');
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) deleteProduct(id);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary-100 rounded-full">
                <Lock className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">لوحة تحكم المدير</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">كلمة المرور</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                placeholder="أدخل كلمة المرور (admin123)"
              />
            </div>
            <button type="submit" className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 transition">
              دخول
            </button>
            <button type="button" onClick={() => onNavigate(Page.HOME)} className="w-full text-slate-500 text-sm mt-2 hover:text-slate-700">
                العودة للرئيسية
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 gap-4">
            <div className="flex items-center gap-4">
                <div className="bg-primary-100 p-3 rounded-xl text-primary-600">
                    <Lock className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">لوحة التحكم</h1>
                    <p className="text-sm text-slate-500">مرحباً بك في منطقة الإدارة</p>
                </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
                <button 
                    onClick={() => onNavigate(Page.HOME)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 text-slate-500 hover:text-slate-700 font-bold px-4 py-2.5 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200"
                >
                    <LogOut className="w-4 h-4" />
                    العودة للموقع
                </button>
                <button 
                    onClick={activeTab === 'articles' ? handleNewArticle : handleNewProduct}
                    className="flex-1 md:flex-none bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    <span>{activeTab === 'articles' ? 'مقال جديد' : 'منتج جديد'}</span>
                </button>
            </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
            <button 
                onClick={() => { setActiveTab('articles'); setIsEditing(false); }}
                className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                    activeTab === 'articles' 
                    ? 'bg-white text-primary-600 shadow-md border-b-4 border-primary-500' 
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
            >
                <FileText className="w-5 h-5" />
                المقالات
            </button>
            <button 
                onClick={() => { setActiveTab('products'); setIsEditing(false); }}
                className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                    activeTab === 'products' 
                    ? 'bg-white text-primary-600 shadow-md border-b-4 border-primary-500' 
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
            >
                <Package className="w-5 h-5" />
                المنتجات
            </button>
        </div>

        {/* --- ARTICLE EDITOR --- */}
        {isEditing && activeTab === 'articles' && (
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mb-12 animate-fade-in-down">
                <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-bold text-slate-800">
                        {articles.some(a => a.id === articleForm.id) ? 'تعديل المقال' : 'إضافة مقال جديد'}
                    </h2>
                    <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-red-500">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={submitArticle} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">عنوان المقال</label>
                            <input 
                                type="text" required value={articleForm.title}
                                onChange={e => setArticleForm({...articleForm, title: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">التصنيف</label>
                            <select 
                                value={articleForm.category}
                                onChange={e => setArticleForm({...articleForm, category: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none bg-white"
                            >
                                <option value="صحة عامة">صحة عامة</option>
                                <option value="صحة الأطفال">صحة الأطفال</option>
                                <option value="تغذية">تغذية</option>
                                <option value="جمال وعناية">جمال وعناية</option>
                                <option value="أخبار الشركة">أخبار الشركة</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">رابط الصورة (URL)</label>
                        <input 
                            type="url" required value={articleForm.image}
                            onChange={e => setArticleForm({...articleForm, image: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">مقتطف قصير</label>
                        <textarea 
                            rows={2} required value={articleForm.excerpt}
                            onChange={e => setArticleForm({...articleForm, excerpt: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">المحتوى (افصل الفقرات بسطر فارغ)</label>
                        <textarea 
                            rows={10} required value={articleContentString}
                            onChange={e => setArticleContentString(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                        ></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                             <label className="block text-sm font-bold text-slate-700 mb-2">الكاتب</label>
                             <input type="text" value={articleForm.author} onChange={e => setArticleForm({...articleForm, author: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200" />
                        </div>
                         <div>
                             <label className="block text-sm font-bold text-slate-700 mb-2">وقت القراءة</label>
                             <input type="text" value={articleForm.readTime} onChange={e => setArticleForm({...articleForm, readTime: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200" />
                        </div>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 ml-4">إلغاء</button>
                        <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2"><Save className="w-5 h-5" /> حفظ</button>
                    </div>
                </form>
            </div>
        )}

        {/* --- PRODUCT EDITOR --- */}
        {isEditing && activeTab === 'products' && (
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mb-12 animate-fade-in-down">
                <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-bold text-slate-800">
                        {products.some(p => p.id === productForm.id) ? 'تعديل المنتج' : 'إضافة منتج جديد'}
                    </h2>
                    <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-red-500">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={submitProduct} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">اسم المنتج</label>
                            <input 
                                type="text" required value={productForm.name}
                                onChange={e => setProductForm({...productForm, name: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">التصنيف</label>
                             <input 
                                type="text" required placeholder="مثال: صحة الجهاز التنفسي" value={productForm.category}
                                onChange={e => setProductForm({...productForm, category: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">السعر</label>
                            <input 
                                type="text" placeholder="مثال: 55 ج.م" value={productForm.price}
                                onChange={e => setProductForm({...productForm, price: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">الأيقونة</label>
                            <select 
                                value={productForm.icon}
                                onChange={e => setProductForm({...productForm, icon: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none bg-white"
                            >
                                <option value="package">Package (Default)</option>
                                <option value="wind">Wind (Respiratory)</option>
                                <option value="shield">Shield (Immunity)</option>
                                <option value="activity">Activity (Bones/Growth)</option>
                                <option value="heart">Heart (General)</option>
                                <option value="sparkles">Sparkles (Beauty)</option>
                                <option value="zap">Zap (Energy)</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">رابط الصورة (URL)</label>
                        <div className="flex gap-4 items-start">
                             <input 
                                type="url" required value={productForm.image}
                                onChange={e => setProductForm({...productForm, image: e.target.value})}
                                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            />
                             {productForm.image && (
                                <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                                    <img src={productForm.image} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">وصف المنتج</label>
                        <textarea 
                            rows={3} required value={productForm.description}
                            onChange={e => setProductForm({...productForm, description: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">الفوائد (فائدة واحدة لكل سطر)</label>
                        <textarea 
                            rows={5} required value={productBenefitsString}
                            onChange={e => setProductBenefitsString(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                        ></textarea>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 ml-4">إلغاء</button>
                        <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2"><Save className="w-5 h-5" /> حفظ</button>
                    </div>
                </form>
            </div>
        )}

        {/* --- LIST VIEW --- */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-right">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-bold text-slate-700">الصورة</th>
                            <th className="px-6 py-4 font-bold text-slate-700">{activeTab === 'articles' ? 'العنوان' : 'الاسم'}</th>
                            <th className="px-6 py-4 font-bold text-slate-700">التصنيف</th>
                            <th className="px-6 py-4 font-bold text-slate-700">{activeTab === 'articles' ? 'التاريخ' : 'السعر'}</th>
                            <th className="px-6 py-4 font-bold text-slate-700">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {activeTab === 'articles' ? (
                            articles.map((article) => (
                                <tr key={article.id} className="hover:bg-slate-50 transition">
                                    <td className="px-6 py-4">
                                        <img src={article.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-slate-100" />
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-900">{article.title}</td>
                                    <td className="px-6 py-4"><span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-bold">{article.category}</span></td>
                                    <td className="px-6 py-4 text-slate-500 text-sm">{article.date}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => handleEditArticle(article)} className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition"><Edit className="w-5 h-5" /></button>
                                            <button onClick={() => handleDeleteArticle(article.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 className="w-5 h-5" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            products.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50 transition">
                                    <td className="px-6 py-4">
                                        <img src={product.image} alt="" className="w-12 h-12 rounded-lg object-contain bg-slate-100" />
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-900">{product.name}</td>
                                    <td className="px-6 py-4"><span className="bg-secondary-50 text-secondary-700 px-3 py-1 rounded-full text-xs font-bold">{product.category}</span></td>
                                    <td className="px-6 py-4 text-slate-500 text-sm">{product.price}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => handleEditProduct(product)} className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition"><Edit className="w-5 h-5" /></button>
                                            <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 className="w-5 h-5" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {((activeTab === 'articles' && articles.length === 0) || (activeTab === 'products' && products.length === 0)) && (
                <div className="p-12 text-center text-slate-500">
                    لا توجد بيانات حالياً. ابدأ بإضافة جديد.
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
