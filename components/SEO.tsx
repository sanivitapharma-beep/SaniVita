
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords, 
  image,
  url = window.location.href,
  type = 'website'
}) => {
  useEffect(() => {
    // 1. Update Main Title
    document.title = `${title} | SaniVita Pharma`;

    // Helper to update standard meta tags (name="...")
    const setMetaName = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to update Open Graph tags (property="og:...")
    const setMetaProperty = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // --- Standard SEO ---
    setMetaName('description', description);
    if (keywords) setMetaName('keywords', keywords);

    // --- Open Graph (Facebook/WhatsApp/LinkedIn) ---
    setMetaProperty('og:site_name', 'SaniVita Pharma');
    setMetaProperty('og:title', title);
    setMetaProperty('og:description', description);
    setMetaProperty('og:type', type);
    setMetaProperty('og:url', url);
    setMetaProperty('og:locale', 'ar_EG');

    // Handle Image specifically
    if (image) {
      setMetaProperty('og:image', image);
      setMetaProperty('og:image:secure_url', image);
      setMetaProperty('og:image:alt', title);
      // Adding dimensions helps crawlers render the image faster
      setMetaProperty('og:image:width', '1200');
      setMetaProperty('og:image:height', '630');
    }

    // --- Twitter Card ---
    setMetaName('twitter:card', 'summary_large_image');
    setMetaName('twitter:title', title);
    setMetaName('twitter:description', description);
    if (image) setMetaName('twitter:image', image);

    // Clean up function (optional but good practice in SPA)
    return () => {
      // We don't remove tags to prevent flickering, 
      // but the next component mount will overwrite them.
    };
  }, [title, description, keywords, image, url, type]);

  return null;
};

export default SEO;
