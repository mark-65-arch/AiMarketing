import { ChevronRight, Home } from "lucide-react";
import { BreadcrumbSchema } from "./SchemaMarkup";

interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  // Prepare schema data
  const schemaItems = [
    {
      name: "Home",
      item: window.location.origin,
      position: 1
    },
    ...items.map((item, index) => ({
      name: item.name,
      item: `${window.location.origin}${item.href}`,
      position: index + 2
    }))
  ];

  return (
    <>
      <BreadcrumbSchema items={schemaItems} />
      <nav 
        className={`flex ${className}`} 
        aria-label="Breadcrumb"
        data-testid="breadcrumbs"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          {/* Home */}
          <li className="inline-flex items-center">
            <a
              href="/"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              data-testid="breadcrumb-home"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </a>
          </li>

          {/* Breadcrumb items */}
          {items.map((item, index) => (
            <li key={index} className="inline-flex items-center">
              <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />
              {item.current ? (
                <span 
                  className="text-sm font-medium text-foreground"
                  aria-current="page"
                  data-testid={`breadcrumb-current`}
                >
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  data-testid={`breadcrumb-${index}`}
                >
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

// Utility function to generate breadcrumbs from pathname
export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  // Build breadcrumbs from URL segments
  segments.forEach((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const isLast = index === segments.length - 1;
    
    // Convert URL segment to readable name
    const name = formatSegmentName(segment);
    
    breadcrumbs.push({
      name,
      href,
      current: isLast
    });
  });

  return breadcrumbs;
}

// Convert URL segment to human-readable name
function formatSegmentName(segment: string): string {
  // Map of common URL segments to display names
  const segmentMap: Record<string, string> = {
    'about': 'About',
    'contact': 'Contact',
    'ai-tools': 'AI Tools',
    'ai-training': 'AI Training',
    'ai-websites': 'AI Websites',
    'business-profile': 'Business Profile',
    'assessment': 'Assessment',
    'blog': 'Blog',
    'free-ai-marketing-audit': 'Free AI Marketing Audit',
    'houston-ai-marketing-guide': 'Marketing AI Houston Guide',
    'ai-tools-checklist': 'AI Tools Checklist',
    '30-day-ai-calendar': '30-Day AI Calendar',
    'ai-roi-calculator': 'AI ROI Calculator',
    'heights-ai-marketing': 'Heights AI Marketing',
    'midtown-ai-marketing': 'Midtown AI Marketing',
    'downtown-ai-marketing': 'Downtown AI Marketing',
    'memorial-ai-marketing': 'Memorial AI Marketing',
    'galleria-ai-marketing': 'Galleria AI Marketing',
    'ai-marketing-the-woodlands-texas': 'The Woodlands AI Marketing',
    'ai-marketing-sugar-land-texas': 'Sugar Land AI Marketing',
    'ai-marketing-katy-texas': 'Katy AI Marketing',
    'ai-marketing-pearland-texas': 'Pearland AI Marketing',
    'ai-marketing-clear-lake-texas': 'Clear Lake AI Marketing',
    'ai-marketing-league-city-texas': 'League City AI Marketing',
    'ai-marketing-pasadena-texas': 'Pasadena AI Marketing',
    'ai-marketing-cypress-texas': 'Cypress AI Marketing',
    'how-ai-helps-houston-restaurants': 'How AI Helps Houston Restaurants',
    'ai-vs-traditional-marketing': 'AI vs Traditional Marketing',
    'google-business-profile-ai-optimization': 'Google Business Profile AI Optimization',
    'ai-content-creation-guide': 'AI Content Creation Guide',
    'voice-search-optimization-houston': 'Voice Search Optimization Houston',
    'houston-business-resources': 'Houston Business Resources',
    'ai-tools-small-business': 'AI Tools for Small Business',
    'ai-marketing-checklist': 'AI Marketing Checklist',
    'houston-business-ai-guide': 'Houston Business AI Guide'
  };

  // Return mapped name or convert dashes to spaces and capitalize
  return segmentMap[segment] || segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}