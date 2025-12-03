
import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'ابسيمارتا شراب',
    category: 'صحة الجهاز التنفسي',
    description: 'مذيب للبلغم و موسع للشعب الهوائية، يعمل كمضاد للالتهاب ويرطب مجرى التنفس ليساعد على تهدئة السعال.',
    benefits: ['مذيب للبلغم وموسع للشعب', 'مضاد للالتهاب', 'يرطب مجرى التنفس ويهدئ السعال'],
    image: 'https://lh3.googleusercontent.com/d/1jB1akFALfC5pre2cCvnigXFSxYgecunN',
    price: '55 ج.م',
    icon: 'wind'
  },
  {
    id: '2',
    name: 'لابينسيرون شراب',
    category: 'الحديد والمناعة',
    description: 'تركيبة مميزة تحتوي على الحديد ومالتي فيتامين وفيتامين سي وزينك بطعم التوتي فروتي. يدعم تكوين الهيموجلوبين في الدم.',
    benefits: ['زيادة الهيموجلوبين', 'فاتح للشهية', 'مجدد للطاقة', 'زيادة التركيز', 'رفع المناعة'],
    image: 'https://lh3.googleusercontent.com/d/1zB5VHzB-QiQVRmlLTnGGKx1AB1fHR6oo',
    price: '65 ج.م',
    icon: 'shield'
  },
  {
    id: '3',
    name: 'ابينسيكال شراب',
    category: 'صحة العظام والنمو',
    description: 'مكمل غذائي غني بالكالسيوم والزنك وفيتامين د3 والمغنسيوم. تركيبة مميزة لصحة أفضل بطعم البرتقال.',
    benefits: ['عظام صحية', 'أسنان قوية', 'بنيان عضلي قوي', 'رفع المناعة'],
    image: 'https://lh3.googleusercontent.com/d/1cizVQkjJuBLvxfSEzJ1G6UmiCh-X6efl',
    price: '60 ج.م',
    icon: 'activity'
  },
  {
    id: '4',
    name: 'SPI Product',
    category: 'صحة عامة',
    description: 'منتج مميز قادم قريبا',
    benefits: ['1', '2', '3'],
    image: 'https://lh3.googleusercontent.com/d/1oGtLLr47LduwrdW-pFeXEqN3jC7tr8tT',
    price: 'قريباً',
    icon: 'heart'
  },
  {
    id: '5',
    name: 'SPI Product',
    category: 'الجمال',
    description: 'منتج مميز قادم قريبا',
    benefits: ['1', '2', '3'],
    image: 'https://lh3.googleusercontent.com/d/1oGtLLr47LduwrdW-pFeXEqN3jC7tr8tT',
    price: 'قريباً',
    icon: 'sparkles'
  },
  {
    id: '6',
    name: 'SPI Product',
    category: 'العظام',
    description: 'منتج مميز قادم قريبا',
    benefits: ['1', '2', '3'],
    image: 'https://lh3.googleusercontent.com/d/1oGtLLr47LduwrdW-pFeXEqN3jC7tr8tT',
    price: 'قريباً',
    icon: 'activity'
  }
];