import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16" data-testid="footer-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4" data-testid="footer-company-name">
                Houston AI Marketing
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed" data-testid="footer-company-description">
                Transforming Houston businesses with cutting-edge AI marketing solutions. We help local companies dominate search results and automate customer engagement.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300" data-testid="footer-address">
                <MapPin className="w-5 h-5 mr-3 text-blue-400" />
                <span>Houston, TX 77002</span>
              </div>
              <div className="flex items-center text-gray-300" data-testid="footer-phone">
                <Phone className="w-5 h-5 mr-3 text-blue-400" />
                <span>(713) 555-AI01</span>
              </div>
              <div className="flex items-center text-gray-300" data-testid="footer-email">
                <Mail className="w-5 h-5 mr-3 text-blue-400" />
                <span>hello@houstonaimarketing.com</span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6" data-testid="footer-services-title">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/ai-training" className="text-gray-300 hover:text-blue-400 transition-colors" data-testid="footer-link-ai-training">
                  AI Training Workshops
                </Link>
              </li>
              <li>
                <Link href="/business-profile" className="text-gray-300 hover:text-blue-400 transition-colors" data-testid="footer-link-business-profile">
                  Business Profile Optimization
                </Link>
              </li>
              <li>
                <Link href="/ai-websites" className="text-gray-300 hover:text-blue-400 transition-colors" data-testid="footer-link-ai-websites">
                  AI-Optimized Websites
                </Link>
              </li>
              <li>
                <Link href="/ai-tools" className="text-gray-300 hover:text-blue-400 transition-colors" data-testid="footer-link-ai-tools">
                  Free AI Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Resource Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6" data-testid="footer-resources-title">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors" data-testid="footer-link-about">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/assessment" className="text-gray-300 hover:text-blue-400 transition-colors" data-testid="footer-link-assessment">
                  Free AI Assessment
                </Link>
              </li>
              <li>
                <a href="/blog" className="text-gray-300 hover:text-blue-400 transition-colors" data-testid="footer-link-blog">
                  Blog
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors" data-testid="footer-link-contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links & Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-6" data-testid="footer-legal-title">Legal & Connect</h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a href="/privacy-policy" className="text-gray-300 hover:text-blue-400 transition-colors" data-testid="footer-link-privacy">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-gray-300 hover:text-blue-400 transition-colors" data-testid="footer-link-terms">
                  Terms of Service
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div>
              <h5 className="text-md font-medium mb-4" data-testid="footer-social-title">Follow Us</h5>
              <div className="flex space-x-4">
                <a href="https://linkedin.com/company/houston-ai-marketing" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors" data-testid="footer-social-linkedin">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://facebook.com/houstonaimarketing" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors" data-testid="footer-social-facebook">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://twitter.com/houstonaimarket" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors" data-testid="footer-social-twitter">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm" data-testid="footer-copyright">
              © 2025 Houston AI Marketing. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0" data-testid="footer-tagline">
              Empowering Houston businesses with AI technology
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}