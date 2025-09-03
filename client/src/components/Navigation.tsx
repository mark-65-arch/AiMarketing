import { useState } from "react";
import { Menu, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import logoWide from "@assets/Logo3_1756847446520.png";

interface NavigationProps {
  className?: string;
}

export function Navigation({ className = "" }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);

  // Navigation structure
  const navigation = {
    services: [
      { name: "AI Tools & Software", href: "/ai-tools", description: "Discover powerful AI tools for your business" },
      { name: "AI Website Development", href: "/ai-websites", description: "Build smart, responsive websites with AI" },
      { name: "AI Training Workshops", href: "/ai-training", description: "Learn to leverage AI for your business" },
      { name: "Business Profile Optimization", href: "/business-profile", description: "Optimize your online presence" },
      { name: "AI Readiness Assessment", href: "/assessment", description: "Evaluate your business's AI potential" },
    ],
    houstonAreas: [
      // Inner Houston
      { name: "Heights AI Marketing", href: "/heights-ai-marketing", area: "Inner Houston" },
      { name: "Midtown AI Marketing", href: "/midtown-ai-marketing", area: "Inner Houston" },
      { name: "Downtown AI Marketing", href: "/downtown-ai-marketing", area: "Inner Houston" },
      { name: "Memorial AI Marketing", href: "/memorial-ai-marketing", area: "Inner Houston" },
      { name: "Galleria AI Marketing", href: "/galleria-ai-marketing", area: "Inner Houston" },
      // Suburbs
      { name: "The Woodlands AI Marketing", href: "/ai-marketing-the-woodlands-texas", area: "Suburbs" },
      { name: "Sugar Land AI Marketing", href: "/ai-marketing-sugar-land-texas", area: "Suburbs" },
      { name: "Katy AI Marketing", href: "/ai-marketing-katy-texas", area: "Suburbs" },
      { name: "Pearland AI Marketing", href: "/ai-marketing-pearland-texas", area: "Suburbs" },
      { name: "Clear Lake AI Marketing", href: "/ai-marketing-clear-lake-texas", area: "Suburbs" },
      { name: "League City AI Marketing", href: "/ai-marketing-league-city-texas", area: "Suburbs" },
      { name: "Pasadena AI Marketing", href: "/ai-marketing-pasadena-texas", area: "Suburbs" },
      { name: "Cypress AI Marketing", href: "/ai-marketing-cypress-texas", area: "Suburbs" },
    ],
    resources: [
      { name: "Blog", href: "/blog", description: "Latest AI marketing insights and tips" },
      { name: "Marketing AI Houston Guide", href: "/houston-ai-marketing-guide", description: "Complete guide to AI marketing in Houston" },
      { name: "AI Tools for Small Business", href: "/ai-tools-small-business", description: "Essential AI tools for small businesses" },
      { name: "AI Marketing Checklist", href: "/ai-marketing-checklist", description: "Step-by-step AI marketing checklist" },
      { name: "Houston Business Resources", href: "/houston-business-resources", description: "Local business resources and directories" },
      // Blog Articles
      { name: "How AI Helps Houston Restaurants", href: "/how-ai-helps-houston-restaurants", description: "AI solutions for restaurant industry" },
      { name: "AI vs Traditional Marketing", href: "/ai-vs-traditional-marketing", description: "Compare AI and traditional marketing methods" },
      { name: "Google Business Profile AI Optimization", href: "/google-business-profile-ai-optimization", description: "Optimize your Google presence with AI" },
      { name: "AI Content Creation Guide", href: "/ai-content-creation-guide", description: "Create compelling content with AI" },
      { name: "Voice Search Optimization Houston", href: "/voice-search-optimization-houston", description: "Optimize for voice search in Houston" },
    ],
    freeTools: [
      { name: "Free AI Marketing Audit", href: "/free-ai-marketing-audit", description: "Get a $500 value audit for free", highlight: true },
      { name: "AI ROI Calculator", href: "/ai-roi-calculator", description: "Calculate your AI marketing ROI" },
      { name: "AI Tools Checklist", href: "/ai-tools-checklist", description: "25 essential AI tools for businesses" },
      { name: "30-Day AI Implementation", href: "/30-day-ai-calendar", description: "Step-by-step AI implementation plan" },
      { name: "Houston Business AI Guide", href: "/houston-business-ai-guide", description: "Complete AI guide for Houston businesses" },
    ],
  };

  // Group Houston areas
  const innerHouston = navigation.houstonAreas.filter(area => area.area === "Inner Houston");
  const suburbs = navigation.houstonAreas.filter(area => area.area === "Suburbs");

  const toggleMobileSection = (section: string) => {
    setOpenMobileSection(openMobileSection === section ? null : section);
  };

  return (
    <nav className={`bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm fixed top-0 w-full z-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" data-testid="nav-logo">
              <img src={logoWide} alt="Marketing AI Houston" className="h-10 w-auto" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="/about" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-about">
                About
              </a>

              {/* Services Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-services-dropdown">
                  Services <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" data-testid="services-dropdown-content">
                  {navigation.services.map((service) => (
                    <DropdownMenuItem key={service.href} asChild>
                      <a href={service.href} className="block px-4 py-3 hover:bg-muted" data-testid={`service-${service.href.replace('/', '')}`}>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-muted-foreground mt-1">{service.description}</div>
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Houston Areas Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-areas-dropdown">
                  Houston Areas <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" data-testid="areas-dropdown-content">
                  <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">Inner Houston</div>
                  {innerHouston.map((area) => (
                    <DropdownMenuItem key={area.href} asChild>
                      <a href={area.href} className="block px-4 py-2 hover:bg-muted" data-testid={`area-${area.href.replace('/', '')}`}>
                        {area.name}
                      </a>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">Houston Suburbs</div>
                  {suburbs.map((area) => (
                    <DropdownMenuItem key={area.href} asChild>
                      <a href={area.href} className="block px-4 py-2 hover:bg-muted" data-testid={`area-${area.href.replace('/', '')}`}>
                        {area.name}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Resources Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-resources-dropdown">
                  Resources <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" data-testid="resources-dropdown-content">
                  {navigation.resources.map((resource) => (
                    <DropdownMenuItem key={resource.href} asChild>
                      <a href={resource.href} className="block px-4 py-3 hover:bg-muted" data-testid={`resource-${resource.href.replace('/', '')}`}>
                        <div className="font-medium">{resource.name}</div>
                        <div className="text-sm text-muted-foreground mt-1">{resource.description}</div>
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Free Tools Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-tools-dropdown">
                  Free Tools <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" data-testid="tools-dropdown-content">
                  {navigation.freeTools.map((tool) => (
                    <DropdownMenuItem key={tool.href} asChild>
                      <a href={tool.href} className="block px-4 py-3 hover:bg-muted" data-testid={`tool-${tool.href.replace('/', '')}`}>
                        <div className={`font-medium ${tool.highlight ? 'text-primary' : ''}`}>
                          {tool.name}
                          {tool.highlight && <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">POPULAR</span>}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{tool.description}</div>
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <a href="/contact" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-contact">
                Contact
              </a>

              <a href="/free-ai-marketing-audit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg" data-testid="nav-cta">
                Get FREE Audit
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} data-testid="nav-mobile-menu">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200" data-testid="mobile-menu">
          <div className="px-4 py-3 space-y-3 max-h-96 overflow-y-auto">
            <a href="/about" className="block text-gray-900 hover:text-blue-600 px-3 py-3 min-h-[44px] text-base font-medium transition-colors touch-target" data-testid="mobile-nav-about">
              About
            </a>

            {/* Mobile Services */}
            <Collapsible
              open={openMobileSection === 'services'}
              onOpenChange={() => toggleMobileSection('services')}
            >
              <CollapsibleTrigger className="flex justify-between items-center w-full text-gray-900 hover:text-blue-600 px-3 py-3 min-h-[44px] text-base font-medium transition-colors touch-target" data-testid="mobile-nav-services">
                Services
                {openMobileSection === 'services' ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-2">
                {navigation.services.map((service) => (
                  <a
                    key={service.href}
                    href={service.href}
                    className="block text-muted-foreground hover:text-primary px-3 py-2 text-sm transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    data-testid={`mobile-service-${service.href.replace('/', '')}`}
                  >
                    {service.name}
                  </a>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Mobile Houston Areas */}
            <Collapsible
              open={openMobileSection === 'areas'}
              onOpenChange={() => toggleMobileSection('areas')}
            >
              <CollapsibleTrigger className="flex justify-between items-center w-full text-gray-900 hover:text-blue-600 px-3 py-3 min-h-[44px] text-base font-medium transition-colors touch-target" data-testid="mobile-nav-areas">
                Houston Areas
                {openMobileSection === 'areas' ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-2">
                <div className="text-xs font-semibold text-muted-foreground px-3 py-1">Inner Houston</div>
                {innerHouston.map((area) => (
                  <a
                    key={area.href}
                    href={area.href}
                    className="block text-muted-foreground hover:text-primary px-3 py-2 text-sm transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    data-testid={`mobile-area-${area.href.replace('/', '')}`}
                  >
                    {area.name}
                  </a>
                ))}
                <div className="text-xs font-semibold text-muted-foreground px-3 py-1 pt-3">Suburbs</div>
                {suburbs.map((area) => (
                  <a
                    key={area.href}
                    href={area.href}
                    className="block text-muted-foreground hover:text-primary px-3 py-2 text-sm transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    data-testid={`mobile-area-${area.href.replace('/', '')}`}
                  >
                    {area.name}
                  </a>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Mobile Resources */}
            <Collapsible
              open={openMobileSection === 'resources'}
              onOpenChange={() => toggleMobileSection('resources')}
            >
              <CollapsibleTrigger className="flex justify-between items-center w-full text-gray-900 hover:text-blue-600 px-3 py-3 min-h-[44px] text-base font-medium transition-colors touch-target" data-testid="mobile-nav-resources">
                Resources
                {openMobileSection === 'resources' ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-2">
                {navigation.resources.map((resource) => (
                  <a
                    key={resource.href}
                    href={resource.href}
                    className="block text-muted-foreground hover:text-primary px-3 py-2 text-sm transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    data-testid={`mobile-resource-${resource.href.replace('/', '')}`}
                  >
                    {resource.name}
                  </a>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Mobile Free Tools */}
            <Collapsible
              open={openMobileSection === 'tools'}
              onOpenChange={() => toggleMobileSection('tools')}
            >
              <CollapsibleTrigger className="flex justify-between items-center w-full text-gray-900 hover:text-blue-600 px-3 py-3 min-h-[44px] text-base font-medium transition-colors touch-target" data-testid="mobile-nav-tools">
                Free Tools
                {openMobileSection === 'tools' ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-2">
                {navigation.freeTools.map((tool) => (
                  <a
                    key={tool.href}
                    href={tool.href}
                    className={`block px-3 py-2 text-sm transition-colors ${tool.highlight ? 'text-primary hover:text-primary/80' : 'text-muted-foreground hover:text-primary'}`}
                    onClick={() => setIsMenuOpen(false)}
                    data-testid={`mobile-tool-${tool.href.replace('/', '')}`}
                  >
                    {tool.name}
                    {tool.highlight && <span className="ml-2 text-xs">🔥</span>}
                  </a>
                ))}
              </CollapsibleContent>
            </Collapsible>

            <a href="/contact" className="block text-gray-900 hover:text-blue-600 px-3 py-3 min-h-[44px] text-base font-medium transition-colors touch-target" data-testid="mobile-nav-contact">
              Contact
            </a>

            <a href="/free-ai-marketing-audit" className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-4 min-h-[44px] rounded-lg text-base font-medium text-center transition-all duration-200 touch-target" data-testid="mobile-nav-cta" onClick={() => setIsMenuOpen(false)}>
              Get FREE Audit
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}