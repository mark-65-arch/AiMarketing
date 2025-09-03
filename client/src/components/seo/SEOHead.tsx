import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  noIndex?: boolean;
  structuredData?: object;
}

export function SEOHead({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = "https://houstonaimarketing.com/images/og-default.jpg",
  ogType = "website",
  ogTitle,
  ogDescription,
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage,
  noIndex = false,
  structuredData
}: SEOHeadProps) {
  
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tag
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let metaTag = document.querySelector(selector) as HTMLMetaElement;
      
      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (property) {
          metaTag.setAttribute('property', name);
        } else {
          metaTag.setAttribute('name', name);
        }
        document.head.appendChild(metaTag);
      }
      
      metaTag.setAttribute('content', content);
    };

    // Helper function to update or create link tag
    const updateLinkTag = (rel: string, href: string) => {
      let linkTag = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      
      if (!linkTag) {
        linkTag = document.createElement('link');
        linkTag.setAttribute('rel', rel);
        document.head.appendChild(linkTag);
      }
      
      linkTag.setAttribute('href', href);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Robots meta tag
    if (noIndex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow');
    }

    // Canonical URL
    if (canonicalUrl) {
      updateLinkTag('canonical', canonicalUrl);
    }

    // Open Graph meta tags
    updateMetaTag('og:title', ogTitle || title, true);
    updateMetaTag('og:description', ogDescription || description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:url', canonicalUrl || window.location.href, true);
    updateMetaTag('og:site_name', 'Marketing AI Houston', true);

    // Twitter Card meta tags
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', twitterTitle || ogTitle || title);
    updateMetaTag('twitter:description', twitterDescription || ogDescription || description);
    updateMetaTag('twitter:image', twitterImage || ogImage);
    updateMetaTag('twitter:site', '@houstonaimarket');

    // Additional SEO meta tags
    updateMetaTag('author', 'Marketing AI Houston');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1');
    updateMetaTag('theme-color', '#1e40af');

    // Language and region
    updateMetaTag('language', 'en-US');
    updateMetaTag('geo.region', 'US-TX');
    updateMetaTag('geo.placename', 'Houston');
    updateMetaTag('geo.position', '29.7604;-95.3698');

    // Business-specific meta tags
    updateMetaTag('classification', 'Business');
    updateMetaTag('category', 'Marketing Services');
    updateMetaTag('coverage', 'Worldwide');
    updateMetaTag('distribution', 'Global');
    updateMetaTag('rating', 'General');

    // Structured Data
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      script.id = 'custom-structured-data';
      
      // Remove existing custom structured data
      const existingScript = document.getElementById('custom-structured-data');
      if (existingScript) {
        existingScript.remove();
      }
      
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      if (structuredData) {
        const scriptToRemove = document.getElementById('custom-structured-data');
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      }
    };
  }, [
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage,
    ogType,
    ogTitle,
    ogDescription,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage,
    noIndex,
    structuredData
  ]);

  return null;
}

// Houston location-specific SEO data
export const houstonLocationSEO = {
  baseKeywords: "AI marketing Houston, artificial intelligence marketing, Houston digital marketing, AI tools Houston, marketing automation Houston, Houston SEO, local marketing Houston",
  serviceAreas: [
    "Houston, TX",
    "The Heights, Houston, TX",
    "Midtown Houston, TX", 
    "Downtown Houston, TX",
    "Memorial, Houston, TX",
    "Galleria, Houston, TX",
    "The Woodlands, TX",
    "Sugar Land, TX",
    "Katy, TX",
    "Pearland, TX",
    "Clear Lake, TX",
    "League City, TX",
    "Pasadena, TX",
    "Cypress, TX"
  ],
  businessData: {
    name: "Marketing AI Houston",
    description: "Houston's premier AI marketing agency helping local businesses grow with artificial intelligence technology, automation, and digital marketing strategies.",
    phone: "(713) 555-0123",
    email: "info@marketingaihouston.com",
    address: {
      streetAddress: "Houston Business District",
      cityName: "Houston",
      stateName: "Texas",
      postalCode: "77001"
    }
  }
};

// Generate location-specific keywords
export function generateLocationKeywords(location: string, service?: string): string {
  const baseKeywords = [
    `AI marketing ${location}`,
    `artificial intelligence marketing ${location}`,
    `digital marketing ${location}`,
    `marketing automation ${location}`,
    `SEO ${location}`,
    `social media marketing ${location}`
  ];

  if (service) {
    baseKeywords.push(
      `${service} ${location}`,
      `${service} services ${location}`,
      `best ${service} ${location}`
    );
  }

  return baseKeywords.join(', ');
}

// Generate service-specific structured data
export function generateServiceStructuredData(
  serviceName: string,
  description: string,
  price?: string,
  duration?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Marketing AI Houston",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Houston",
        "addressRegion": "TX",
        "addressCountry": "US"
      }
    },
    "areaServed": houstonLocationSEO.serviceAreas.map(area => ({
      "@type": "City",
      "name": area
    })),
    ...(price && { "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "USD"
    }}),
    ...(duration && { "duration": duration })
  };
}