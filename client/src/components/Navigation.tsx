import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoWide from "@assets/Logo3-ezgif.com-optipng_1756914512078.png";

interface NavigationProps {
  className?: string;
}

export function Navigation({ className = "" }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              <a href="/" className="text-blue-900 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-home">
                Home
              </a>

              <a href="/#services" className="text-blue-900 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-services">
                Services
              </a>

              <a href="/about" className="text-blue-900 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-about">
                About
              </a>


              <a href="/contact" className="text-blue-900 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-contact">
                Contact
              </a>

              <a href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg" data-testid="nav-cta">
                Get Started
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
            <a href="/" className="block text-blue-900 hover:text-blue-700 px-3 py-3 min-h-[44px] text-base font-medium transition-colors touch-target" data-testid="mobile-nav-home" onClick={() => setIsMenuOpen(false)}>
              Home
            </a>

            <a href="/#services" className="block text-blue-900 hover:text-blue-700 px-3 py-3 min-h-[44px] text-base font-medium transition-colors touch-target" data-testid="mobile-nav-services" onClick={() => setIsMenuOpen(false)}>
              Services
            </a>

            <a href="/about" className="block text-blue-900 hover:text-blue-700 px-3 py-3 min-h-[44px] text-base font-medium transition-colors touch-target" data-testid="mobile-nav-about" onClick={() => setIsMenuOpen(false)}>
              About
            </a>


            <a href="/contact" className="block text-blue-900 hover:text-blue-700 px-3 py-3 min-h-[44px] text-base font-medium transition-colors touch-target" data-testid="mobile-nav-contact">
              Contact
            </a>

            <a href="/contact" className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-4 min-h-[44px] rounded-lg text-base font-medium text-center transition-all duration-200 touch-target" data-testid="mobile-nav-cta" onClick={() => setIsMenuOpen(false)}>
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}