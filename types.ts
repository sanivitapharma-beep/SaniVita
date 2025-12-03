
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  image: string;
  price?: string;
  icon: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string[]; // Array of paragraphs
  image: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Page {
  HOME = 'home',
  PRODUCTS = 'products',
  ABOUT = 'about',
  CONTACT = 'contact',
  ADVISOR = 'advisor',
  ARTICLES = 'articles',
  ARTICLE_DETAIL = 'article_detail',
  PRODUCT_DETAIL = 'product_detail'
}
