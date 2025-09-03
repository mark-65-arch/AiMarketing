import { useEffect } from 'react';

interface LocalBusinessSchemaProps {
  businessName?: string;
  description?: string;
  address?: {
    streetAddress: string;
    cityName: string;
    stateName: string;
    postalCode: string;
  };
  telephone?: string;
  email?: string;
  url?: string;
  serviceArea?: string[];
  services?: string[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

interface FAQSchemaProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

interface ServiceSchemaProps {
  serviceName: string;
  description: string;
  provider: string;
  areaServed: string[];
  serviceType: string;
  url?: string;
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    item: string;
    position: number;
  }>;
}

interface WebPageSchemaProps {
  title: string;
  description: string;
  url: string;
  breadcrumbs?: Array<{
    name: string;
    item: string;
    position: number;
  }>;
}

export function LocalBusinessSchema({
  businessName = "Marketing AI Houston",
  description = "Houston's premier AI marketing agency helping local businesses grow with artificial intelligence technology, automation, and digital marketing strategies.",
  address = {
    streetAddress: "Houston Business District",
    cityName: "Houston",
    stateName: "Texas",
    postalCode: "77001"
  },
  telephone = "(713) 555-AI01",
  email = "hello@houstonaimarketing.com",
  url = "https://houstonaimarketing.com",
  serviceArea = [
    "Houston, TX",
    "The Heights, TX", 
    "Midtown Houston, TX",
    "Downtown Houston, TX",
    "Memorial, TX",
    "Galleria, TX",
    "The Woodlands, TX",
    "Sugar Land, TX",
    "Katy, TX",
    "Pearland, TX",
    "Clear Lake, TX",
    "League City, TX",
    "Pasadena, TX",
    "Cypress, TX"
  ],
  services = [
    "AI Marketing Strategy",
    "Search Engine Optimization",
    "Social Media Marketing",
    "Content Creation",
    "Marketing Automation",
    "Local SEO",
    "PPC Advertising",
    "Website Design",
    "AI Tools Training"
  ],
  aggregateRating
}: LocalBusinessSchemaProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${url}#business`,
      "name": businessName,
      "description": description,
      "url": url,
      "telephone": telephone,
      "email": email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": address.streetAddress,
        "addressLocality": address.cityName,
        "addressRegion": address.stateName,
        "postalCode": address.postalCode,
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 29.7604,
        "longitude": -95.3698
      },
      "areaServed": serviceArea.map(area => ({
        "@type": "City",
        "name": area
      })),
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AI Marketing Services",
        "itemListElement": services.map((service, index) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service
          },
          "position": index + 1
        }))
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "17:00"
        }
      ],
      "priceRange": "$$",
      "currenciesAccepted": "USD",
      "paymentAccepted": "Cash, Credit Card, Check, Invoice",
      ...(aggregateRating && {
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": aggregateRating.ratingValue,
          "reviewCount": aggregateRating.reviewCount,
          "bestRating": 5,
          "worstRating": 1
        }
      }),
      "sameAs": [
        "https://www.facebook.com/houstonaimarketing",
        "https://www.linkedin.com/company/houstonaimarketing",
        "https://twitter.com/houstonaimarket"
      ]
    });
    script.id = 'local-business-schema';
    
    // Remove existing schema
    const existingScript = document.getElementById('local-business-schema');
    if (existingScript) {
      existingScript.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('local-business-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [businessName, description, address, telephone, email, url, serviceArea, services, aggregateRating]);

  return null;
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  useEffect(() => {
    if (!faqs || faqs.length === 0) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
    script.id = 'faq-schema';
    
    // Remove existing schema
    const existingScript = document.getElementById('faq-schema');
    if (existingScript) {
      existingScript.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('faq-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [faqs]);

  return null;
}

export function ServiceSchema({
  serviceName,
  description,
  provider,
  areaServed,
  serviceType,
  url
}: ServiceSchemaProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": serviceName,
      "description": description,
      "provider": {
        "@type": "LocalBusiness",
        "name": provider
      },
      "areaServed": areaServed.map(area => ({
        "@type": "City",
        "name": area
      })),
      "serviceType": serviceType,
      "category": "Marketing Services",
      ...(url && { "url": url })
    });
    script.id = 'service-schema';
    
    // Remove existing schema
    const existingScript = document.getElementById('service-schema');
    if (existingScript) {
      existingScript.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('service-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [serviceName, description, provider, areaServed, serviceType, url]);

  return null;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  useEffect(() => {
    if (!items || items.length === 0) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map(item => ({
        "@type": "ListItem",
        "position": item.position,
        "name": item.name,
        "item": item.item
      }))
    });
    script.id = 'breadcrumb-schema';
    
    // Remove existing schema
    const existingScript = document.getElementById('breadcrumb-schema');
    if (existingScript) {
      existingScript.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('breadcrumb-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [items]);

  return null;
}

export function WebPageSchema({ title, description, url, breadcrumbs }: WebPageSchemaProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": title,
      "description": description,
      "url": url,
      "isPartOf": {
        "@type": "WebSite",
        "name": "Marketing AI Houston",
        "url": "https://houstonaimarketing.com"
      },
      ...(breadcrumbs && {
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbs.map(item => ({
            "@type": "ListItem",
            "position": item.position,
            "name": item.name,
            "item": item.item
          }))
        }
      })
    });
    script.id = 'webpage-schema';
    
    // Remove existing schema
    const existingScript = document.getElementById('webpage-schema');
    if (existingScript) {
      existingScript.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('webpage-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [title, description, url, breadcrumbs]);

  return null;
}