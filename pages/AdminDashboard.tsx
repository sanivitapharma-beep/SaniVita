import React, { useState } from 'react';
import { useArticles } from '../context/ArticleContext';
import { Article, Page } from '../types';
import { Trash2, Edit, Plus, Save, X, Image as ImageIcon, Lock } from 'lucide-react';

interface AdminDashboardProps {
    onNavigate: (page: Page) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { articles, addArticle, updateArticle, deleteArticle } = useArticles();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // Form State
  const initialFormState: Article = {
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
  const [formData, setFormData] = useState<Article>(initialFormState);
  const [contentString, setContentString] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password for demonstration. In production, use real auth.
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  };

  const handleEditClick = (article: Article) => {
    setFormData(article);
    setContentString(article.content.join('\n\n'));
    setIsEditing(true);
    window.scrollTo(0, 0);
  };

  const handleAddNewClick = () => {
    setFormData({ ...initialFormState, id: Date.now().toString() });
    setContentString('');
    setIsEditing(true);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Split content by double newlines to create paragraphs
    const processedContent = contentString.split('\n\n').filter(p => p.trim() !== '');
    
    const finalArticle = {
        ...formData,
        content: processedContent
    };

    if (articles.some(a => a.id === finalArticle.id)) {
        updateArticle(finalArticle);
    } else {
        addArticle(finalArticle);
    }

    setIsEditing(false);
    setFormData(initialFormState);
    alert('تم حفظ المقال بنجاح!');
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المقال؟')) {
        deleteArticle(id);
    }
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">إدارة المقالات</h1>
          <button 
            onClick={handleAddNewClick}
            className="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow-md transition-transform active:scale-95"
          >
            <Plus className="w-5 h-5" />
            مقال جديد
          </button>
        </div>

        {/* Editor Form */}
        {isEditing && (
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mb-12 animate-fade-in-down">
                <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-bold text-slate-800">
                        {articles.some(a => a.id === formData.id) ? 'تعديل المقال' : 'إضافة مقال جديد'}
                    </h2>
                    <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-red-500">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">عنوان المقال</label>
                            <input 
                                type="text" 
                                required
                                value={formData.title}
                                onChange={e => setFormData({...formData, title: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">التصنيف</label>
                            <select 
                                value={formData.category}
                                onChange={e => setFormData({...formData, category: e.target.value})}
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
                        <div className="flex gap-4 items-start">
                            <input 
                                type="url" 
                                required
                                placeholder="https://example.com/image.jpg"
                                value={formData.image}
                                onChange={e => setFormData({...formData, image: e.target.value})}
                                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            />
                            {formData.image && (
                                <div className="w-20 h-20 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-slate-400 mt-1">يمكنك استخدام روابط صور من Google أو Unsplash</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">مقتطف قصير (يظهر في القائمة)</label>
                        <textarea 
                            rows={2}
                            required
                            value={formData.excerpt}
                            onChange={e => setFormData({...formData, excerpt: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">محتوى المقال</label>
                        <textarea 
                            rows={10}
                            required
                            placeholder="اكتب محتوى المقال هنا. افصل بين الفقرات بسطر فارغ."
                            value={contentString}
                            onChange={e => setContentString(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                        ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                             <label className="block text-sm font-bold text-slate-700 mb-2">اسم الكاتب</label>
                             <input 
                                type="text" 
                                value={formData.author}
                                onChange={e => setFormData({...formData, author: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            />
                        </div>
                         <div>
                             <label className="block text-sm font-bold text-slate-700 mb-2">وقت القراءة</label>
                             <input 
                                type="text" 
                                placeholder="مثال: 3 دقائق"
                                value={formData.readTime}
                                onChange={e => setFormData({...formData, readTime: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button 
                            type="button" 
                            onClick={() => setIsEditing(false)}
                            className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 ml-4 transition"
                        >
                            إلغاء
                        </button>
                        <button 
                            type="submit" 
                            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition flex items-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            حفظ المقال
                        </button>
                    </div>
                </form>
            </div>
        )}

        {/* Articles List Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-right">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-bold text-slate-700">الصورة</th>
                            <th className="px-6 py-4 font-bold text-slate-700">العنوان</th>
                            <th className="px-6 py-4 font-bold text-slate-700">التصنيف</th>
                            <th className="px-6 py-4 font-bold text-slate-700">التاريخ</th>
                            <th className="px-6 py-4 font-bold text-slate-700">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {articles.map((article) => (
                            <tr key={article.id} className="hover:bg-slate-50 transition">
                                <td className="px-6 py-4">
                                    <img src={article.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-slate-100" />
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-900">{article.title}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-bold">
                                        {article.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-500 text-sm">{article.date}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => handleEditClick(article)}
                                            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition"
                                            title="تعديل"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteClick(article.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                            title="حذف"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {articles.length === 0 && (
                <div className="p-12 text-center text-slate-500">
                    لا توجد مقالات حالياً. ابدأ بإضافة مقال جديد.
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;