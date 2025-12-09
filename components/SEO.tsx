import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, image }) => {
  useEffect(() => {
    // Update Title
    document.title = `${title} | SaniVita Pharma`;

    // Helper to update or create meta tag
    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper for OG tags (property instead of name)
    const updateOg = (property: string, content: string) => {
        let element = document.querySelector(`meta[property="${property}"]`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute('property', property);
          document.head.appendChild(element);
        }
        element.setAttribute('content', content);
      };

    // Standard Meta
    updateMeta('description', description);
    if (keywords) updateMeta('keywords', keywords);

    // Open Graph
    updateOg('og:title', title);
    updateOg('og:description', description);
    if (image) updateOg('og:image', image);
    updateOg('og:type', 'website');
    updateOg('og:locale', 'ar_EG'); // Set locale to Egypt

    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    if (image) updateMeta('twitter:image', image);

  }, [title, description, keywords, image]);

  return null;
};

export default SEO;