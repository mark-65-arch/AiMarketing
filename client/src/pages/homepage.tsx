import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion, useInView } from "framer-motion";
import { 
  BrainCircuit, 
  MapPin, 
  Globe, 
  CheckCircle, 
  Phone, 
  Mail, 
  MapPin as MapPinIcon, 
  Menu,
  Star,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Wand2,
  Copy,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  CheckSquare,
  Calendar,
  BookOpen,
  Calculator
} from "lucide-react";
import houstonSkylineImage from "@assets/houston-skyline.jpg";
import logoWide from "@assets/Logo3_1756847446520.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { insertContactSubmissionSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { trackFormSubmission, trackAIToolUsage, trackBusinessGoal } from "@/lib/analytics";
import LoadingSpinner from "@/components/LoadingSpinner";
import type { InsertContactSubmission } from "@shared/schema";

const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [demoResult, setDemoResult] = useState("");
  const [quickGenContent, setQuickGenContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedBusinessType, setSelectedBusinessType] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { toast } = useToast();

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      businessType: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const response = await apiRequest("POST", "/api/contact", data);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      return response.json();
    },
    onSuccess: () => {
      trackFormSubmission('contact_form', true);
      trackBusinessGoal('consultation_request');
      toast({
        title: "🎉 Success!",
        description: "Thank you for your interest! We'll contact you within 24 hours to schedule your free AI audit.",
        duration: 6000,
      });
      form.reset();
    },
    onError: (error: any) => {
      trackFormSubmission('contact_form', false);
      console.error('Contact form submission error:', error);
      
      const errorMessage = error.message?.includes('Server error') 
        ? 'Our servers are experiencing high demand. Please try again in a few minutes or call us directly at (713) 555-AI01.'
        : 'Something went wrong. Please check your internet connection and try again, or call us directly at (713) 555-AI01.';
      
      toast({
        title: "❌ Submission Failed",
        description: errorMessage,
        variant: "destructive",
        duration: 8000,
      });
    },
  });

  const handleDemoGeneration = () => {
    const businessType = document.querySelector<HTMLSelectElement>('#demo-business-type')?.value || "restaurant";
    const targetAudience = document.querySelector<HTMLInputElement>('#demo-target-audience')?.value || "Houston families";
    
    setDemoResult(`🤖 Transform your Houston ${businessType} with AI! Discover how smart automation brings ${targetAudience} straight to your door. Experience the future of ${businessType} marketing in Houston!`);
  };

  const handleQuickGenerate = () => {
    if (!selectedBusinessType) {
      toast({
        title: "⚠️ Business Type Required",
        description: "Please select your business type to generate AI content",
        variant: "destructive",
      });
      return;
    }

    trackAIToolUsage('quick_content_generator', 'generate');
    setIsGenerating(true);

    // Simulate AI generation with realistic delay
    setTimeout(() => {
      const sampleContent = {
        "Restaurant": "🍽️ Craving authentic flavors? Our Houston restaurant serves up fresh, locally-sourced dishes that bring families together. Come taste the difference passion makes! #HoustonEats #AuthenticFlavors",
        "Retail Store": "🛍️ Houston shoppers, discover your new favorite store! We've got unique finds, unbeatable prices, and friendly service that makes every visit special. Come see what's new today! #HoustonShopping #GreatFinds", 
        "Professional Service": "🏢 Houston businesses deserve exceptional professional services. Our expert team delivers results that help you grow, succeed, and stay ahead of the competition. Let's discuss your goals! #HoustonBusiness #ProfessionalExcellence",
        "Healthcare": "🏥 Your health is our priority. Our Houston practice provides compassionate, comprehensive care with the latest technology and a personal touch. Schedule your appointment today! #HoustonHealthcare #CompassionateCare",
        "Real Estate": "🏠 Find your dream home in Houston! Our experienced realtors know the market inside and out, helping families discover the perfect neighborhood for their new beginning. #HoustonRealEstate #DreamHome"
      };

      setQuickGenContent(sampleContent[selectedBusinessType as keyof typeof sampleContent] || sampleContent["Professional Service"]);
      setIsGenerating(false);
      trackAIToolUsage('quick_content_generator', 'content_generated');
    }, 2000);
  };

  const copyQuickContent = async () => {
    try {
      await navigator.clipboard.writeText(quickGenContent);
      trackAIToolUsage('quick_content_generator', 'content_copied');
      toast({
        title: "✅ Copied!",
        description: "Content copied to clipboard - ready to use in your marketing!",
      });
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = quickGenContent;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        trackAIToolUsage('quick_content_generator', 'content_copied_fallback');
        toast({
          title: "✅ Copied!",
          description: "Content copied to clipboard - ready to use in your marketing!",
        });
      } catch (fallbackErr) {
        toast({
          title: "❌ Copy Failed",
          description: "Unable to copy content. Please select and copy the text manually.",
          variant: "destructive",
        });
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  const onSubmit = (data: InsertContactSubmission) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="bg-background font-sans antialiased">
      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src={logoWide} alt="Marketing AI Houston" className="h-10 w-auto" data-testid="nav-logo" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="/about" className="text-white hover:text-blue-300 px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-about">About</a>
                <a href="#services" className="text-white hover:text-blue-300 px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-services">Services</a>
                <a href="/ai-tools" className="text-white hover:text-blue-300 px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-ai-tools">Free AI Tools</a>
                <a href="/contact" className="text-white hover:text-blue-300 px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-contact">Contact</a>
                <a href="#contact" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg" data-testid="nav-cta">Get FREE Audit</a>
              </div>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} data-testid="nav-mobile-menu">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-sm border-t border-border" data-testid="mobile-menu">
            <div className="px-4 py-3 space-y-3">
              <a href="/about" className="block text-white hover:text-blue-300 px-3 py-3 min-h-[44px] text-base font-medium transition-colors touch-target" data-testid="mobile-nav-about">About</a>
              <a href="#services" className="block text-white hover:text-blue-300 px-3 py-3 min-h-[44px] text-base font-medium transition-colors touch-target" data-testid="mobile-nav-services" onClick={() => setIsMenuOpen(false)}>Services</a>
              <a href="/ai-tools" className="block text-white hover:text-blue-300 px-3 py-3 min-h-[44px] text-base font-medium transition-colors touch-target" data-testid="mobile-nav-ai-tools">Free AI Tools</a>
              <a href="/contact" className="block text-white hover:text-blue-300 px-3 py-3 min-h-[44px] text-base font-medium transition-colors touch-target" data-testid="mobile-nav-contact">Contact</a>
              <a href="#contact" className="block bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-4 min-h-[44px] rounded-lg text-base font-medium text-center transition-all duration-200 touch-target" data-testid="mobile-nav-cta" onClick={() => setIsMenuOpen(false)}>Get FREE Audit</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section 
        className="relative overflow-hidden hero-section"
        style={{
          backgroundImage: `url(${houstonSkylineImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          willChange: 'transform', // Optimize for animations
          paddingTop: '64px', // Account for fixed nav height
          minHeight: '100vh'
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 lg:py-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="lg:col-span-7">
              <AnimatedSection>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg" data-testid="hero-title" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Transform Your Houston Business with{" "}
                  <span className="text-blue-300 drop-shadow-lg">Artificial Intelligence</span>
                </h1>
                <p className="text-xl text-gray-100 mb-8 leading-relaxed drop-shadow-md" data-testid="hero-subtitle" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                  Stop losing customers to competitors who rank higher on Google. Our proven AI marketing systems have helped 50+ Houston businesses increase revenue by 200-400% while saving 15+ hours per week on marketing tasks.
                </p>
                <div className="bg-blue-600/20 backdrop-blur-sm rounded-lg p-4 mb-6 border border-blue-400/30">
                  <p className="text-sm font-semibold text-blue-200 mb-1 drop-shadow-md">⚡ LIMITED TIME: January Workshop Special</p>
                  <p className="text-sm text-gray-200 drop-shadow-sm">Only 12 seats remaining for our next AI Training Workshop. Houston businesses are booking fast.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200" data-testid="button-free-audit">
                    <a href="/free-ai-marketing-audit">Get FREE $500 AI Audit (Limited Time)</a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 hover:bg-muted/50 transition-all duration-200" data-testid="button-assessment">
                    <a href="/assessment">Take Free AI Readiness Test</a>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-5">
              <AnimatedSection>
                <Card className="shadow-xl bg-card/50 backdrop-blur-sm border-primary/20" data-testid="quick-generator-card">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Wand2 className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">Try AI Content Generation</h3>
                      <p className="text-muted-foreground text-sm">See how AI can create marketing content for your business</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Business Type</label>
                        <Select onValueChange={setSelectedBusinessType} value={selectedBusinessType}>
                          <SelectTrigger data-testid="quick-business-type">
                            <SelectValue placeholder="Select your business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Restaurant">Restaurant</SelectItem>
                            <SelectItem value="Retail Store">Retail Store</SelectItem>
                            <SelectItem value="Professional Service">Professional Service</SelectItem>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                            <SelectItem value="Real Estate">Real Estate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button 
                        onClick={handleQuickGenerate} 
                        disabled={isGenerating || !selectedBusinessType}
                        className="w-full"
                        data-testid="button-quick-generate"
                      >
                        {isGenerating ? (
                          <LoadingSpinner size="sm" text="Generating AI content..." />
                        ) : (
                          <>
                            <Wand2 className="w-4 h-4 mr-2" />
                            Generate Sample Post
                          </>
                        )}
                      </Button>

                      {quickGenContent && (
                        <div className="mt-4 p-4 bg-background/50 rounded-lg border">
                          <p className="text-sm text-foreground mb-3" data-testid="quick-gen-result">
                            {quickGenContent}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              onClick={copyQuickContent}
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              data-testid="button-copy-quick"
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Copy
                            </Button>
                            <Button
                              asChild
                              size="sm"
                              className="flex-1"
                              data-testid="button-try-more"
                            >
                              <a href="/ai-tools-checklist">Get AI Tools Checklist</a>
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
        
        {/* Trust Badges */}
        <div className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <p className="text-center text-gray-200 mb-8 font-medium drop-shadow-md" data-testid="trust-text" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>Trusted by 50+ Houston Businesses Since 2023</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-white/20 shadow-lg" data-testid="trust-metric-1">
                <div className="text-2xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-600">Businesses Served</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-white/20 shadow-lg" data-testid="trust-metric-2">
                <div className="text-2xl font-bold text-blue-600">300%</div>
                <div className="text-sm text-gray-600">Avg. Revenue Increase</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-white/20 shadow-lg" data-testid="trust-metric-3">
                <div className="text-2xl font-bold text-blue-600">15+</div>
                <div className="text-sm text-gray-600">Hours Saved Weekly</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-white/20 shadow-lg" data-testid="trust-metric-4">
                <div className="text-2xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-gray-600">Client Satisfaction</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Free Resources Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="resources-title">
                FREE AI Marketing Resources for Houston Businesses
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="resources-subtitle">
                Download our proven tools and guides to start transforming your business today
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Free AI Marketing Audit */}
            <AnimatedSection className="hover-lift">
              <Card className="h-full shadow-sm border-2 border-primary/20" data-testid="resource-audit">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <BrainCircuit className="w-6 h-6 text-primary" />
                    </div>
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      MOST POPULAR
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 text-center">
                    FREE AI Marketing Audit
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 text-center leading-relaxed">
                    Get a personalized $500 audit showing exactly how AI can increase your leads by 200-400%
                  </p>
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-primary">FREE</div>
                    <div className="text-sm text-muted-foreground line-through">Usually $500</div>
                  </div>
                  <Button asChild className="w-full" data-testid="button-audit">
                    <a href="/free-ai-marketing-audit">Get FREE Audit</a>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* AI Tools Checklist */}
            <AnimatedSection className="hover-lift">
              <Card className="h-full shadow-sm" data-testid="resource-checklist">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <CheckSquare className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 text-center">
                    25 Essential AI Tools
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 text-center leading-relaxed">
                    Hand-picked checklist of AI tools that save Houston businesses $5,000+ monthly
                  </p>
                  <div className="text-center mb-4">
                    <div className="text-lg font-bold text-accent">FREE Download</div>
                  </div>
                  <Button asChild variant="outline" className="w-full" data-testid="button-checklist">
                    <a href="/ai-tools-checklist">Download Checklist</a>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* 30-Day Calendar */}
            <AnimatedSection className="hover-lift">
              <Card className="h-full shadow-sm" data-testid="resource-calendar">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Calendar className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 text-center">
                    30-Day AI Implementation
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 text-center leading-relaxed">
                    Step-by-step calendar to transform your business in 30 days (15 min/day)
                  </p>
                  <div className="text-center mb-4">
                    <div className="text-lg font-bold text-secondary">FREE Guide</div>
                  </div>
                  <Button asChild variant="outline" className="w-full" data-testid="button-calendar">
                    <a href="/30-day-ai-calendar">Get Calendar</a>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Houston AI Guide */}
            <AnimatedSection className="hover-lift">
              <Card className="shadow-sm" data-testid="resource-guide">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        Complete Houston AI Marketing Guide
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        87-page comprehensive guide + $1,188 in bonuses
                      </p>
                      <Button asChild variant="outline" size="sm" data-testid="button-guide">
                        <a href="/houston-business-ai-guide">Download Free</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* ROI Calculator */}
            <AnimatedSection className="hover-lift">
              <Card className="shadow-sm" data-testid="resource-calculator">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4">
                      <Calculator className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        AI Marketing ROI Calculator
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        Calculate your potential ROI from AI marketing in 2 minutes
                      </p>
                      <Button asChild variant="outline" size="sm" data-testid="button-calculator">
                        <a href="/ai-roi-calculator">Calculate ROI</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          <div className="text-center mt-12">
            <AnimatedSection>
              <p className="text-muted-foreground mb-6">
                Join 500+ Houston business owners who have downloaded our free resources
              </p>
              <div className="flex items-center justify-center space-x-8">
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                  No spam, ever
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                  Instant download
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                  Always free
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="services-title">
                AI Marketing Solutions That Drive Results
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="services-subtitle">
                From AI training workshops to complete website optimization, we help Houston businesses leverage artificial intelligence for explosive growth.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1: AI Training Workshops */}
            <AnimatedSection className="hover-lift">
              <Card className="h-full shadow-sm" data-testid="service-card-workshops">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <BrainCircuit className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-4" data-testid="service-title-workshops">AI Training Workshops</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed" data-testid="service-description-workshops">
                    Master AI Marketing in just 4 hours and start saving 15+ hours per week immediately. Learn ChatGPT, automated customer service, and AI content creation that increases lead generation by 400%.
                  </p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-primary" data-testid="price-workshops">$150</span>
                    <span className="text-muted-foreground">/person</span>
                    <div className="text-sm text-accent font-semibold">⚡ Only 12 seats left this month</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center text-card-foreground">
                      <CheckCircle className="w-5 h-5 text-primary mr-3" />
                      4-hour intensive training (worth $500+)
                    </li>
                    <li className="flex items-center text-card-foreground">
                      <CheckCircle className="w-5 h-5 text-primary mr-3" />
                      Live AI tool setup + templates
                    </li>
                    <li className="flex items-center text-card-foreground">
                      <CheckCircle className="w-5 h-5 text-primary mr-3" />
                      30-day implementation support
                    </li>
                    <li className="flex items-center text-card-foreground">
                      <CheckCircle className="w-5 h-5 text-primary mr-3" />
                      Results guaranteed or full refund
                    </li>
                  </ul>
                  <Button asChild className="w-full" data-testid="button-register-workshops">
                    <a href="/ai-training">Learn More</a>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Service 2: Google Business Profile */}
            <AnimatedSection className="hover-lift">
              <Card className="h-full shadow-sm relative overflow-hidden" data-testid="service-card-google">
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-3 py-1 text-sm font-semibold" data-testid="badge-popular">
                  Most Popular
                </div>
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                    <MapPin className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-4" data-testid="service-title-google">Google Business Profile Optimization</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed" data-testid="service-description-google">
                    Dominate local Houston search results and get 3-5x more customer calls within 30 days. Our AI optimization gets you ranking #1 for your services in your area.
                  </p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-accent" data-testid="price-google">$397</span>
                    <span className="text-muted-foreground">starting at</span>
                    <div className="text-sm text-green-600 font-semibold">💰 Pays for itself in 1-2 new customers</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center text-card-foreground">
                      <CheckCircle className="w-5 h-5 text-accent mr-3" />
                      Complete profile audit + optimization
                    </li>
                    <li className="flex items-center text-card-foreground">
                      <CheckCircle className="w-5 h-5 text-accent mr-3" />
                      AI-powered review generation system
                    </li>
                    <li className="flex items-center text-card-foreground">
                      <CheckCircle className="w-5 h-5 text-accent mr-3" />
                      Local keyword domination strategy
                    </li>
                    <li className="flex items-center text-card-foreground">
                      <CheckCircle className="w-5 h-5 text-accent mr-3" />
                      90-day ranking guarantee
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" data-testid="button-ranking-higher">
                    <a href="/business-profile">Learn More</a>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Service 3: AI-Optimized Websites */}
            <AnimatedSection className="hover-lift">
              <Card className="h-full shadow-sm" data-testid="service-card-websites">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                    <Globe className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-4" data-testid="service-title-websites">AI-Optimized Websites</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed" data-testid="service-description-websites">
                    Future-proof websites that convert 40% more visitors into customers. Built for voice search, AI crawlers, and automated customer interactions that work 24/7.
                  </p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-secondary" data-testid="price-websites">$1,200</span>
                    <span className="text-muted-foreground">starting at</span>
                    <div className="text-sm text-blue-600 font-semibold">🚀 Ready in 14 days, not months</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center text-card-foreground">
                      <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                      AI-optimized for Google's algorithms
                    </li>
                    <li className="flex items-center text-card-foreground">
                      <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                      Voice search ready ("Hey Google...")
                    </li>
                    <li className="flex items-center text-card-foreground">
                      <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                      24/7 AI chatbot included
                    </li>
                    <li className="flex items-center text-card-foreground">
                      <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                      Conversion rate guarantee
                    </li>
                  </ul>
                  <Button asChild variant="secondary" className="w-full" data-testid="button-get-website">
                    <a href="/ai-websites">Learn More</a>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Interactive AI Demo Section */}
      <section id="demo" className="py-20 demo-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="demo-title">
                See AI Marketing in Action
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="demo-subtitle">
                Experience how our AI tools transform your marketing efforts. Try our live demo to see instant results.
              </p>
            </AnimatedSection>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <AnimatedSection>
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Professional team meeting discussing AI marketing strategies" 
                className="rounded-2xl shadow-xl w-full" 
                data-testid="demo-image"
              />
            </AnimatedSection>
            <div className="mt-12 lg:mt-0">
              <AnimatedSection>
                <Card className="shadow-xl" data-testid="demo-card">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-6" data-testid="demo-card-title">AI Content Generator Demo</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Your Business Type</label>
                        <select 
                          id="demo-business-type"
                          className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                          data-testid="select-business-type"
                        >
                          <option value="restaurant">Restaurant</option>
                          <option value="medical practice">Medical Practice</option>
                          <option value="law firm">Law Firm</option>
                          <option value="real estate">Real Estate</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Target Audience</label>
                        <Input 
                          id="demo-target-audience"
                          type="text" 
                          placeholder="e.g., Houston families" 
                          className="w-full"
                          data-testid="input-target-audience"
                        />
                      </div>
                      <Button 
                        onClick={handleDemoGeneration}
                        className="w-full"
                        data-testid="button-generate-content"
                      >
                        Generate AI Marketing Copy
                      </Button>
                      <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
                        <p className={`text-sm ${demoResult ? 'text-foreground' : 'text-muted-foreground italic'}`} data-testid="demo-result">
                          {demoResult || "Generated content will appear here... This is a preview of how our AI creates compelling marketing copy tailored specifically for your Houston business."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section id="testimonials" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="testimonials-title">
                Success Stories from Houston Businesses
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="testimonials-subtitle">
                See how Houston businesses transformed their marketing and grew their customer base with our AI solutions.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <AnimatedSection className="hover-lift">
              <Card className="shadow-sm h-full" data-testid="testimonial-card-1">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full mr-4 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center" data-testid="testimonial-avatar-1">
                      <span className="text-white font-semibold text-lg">RO</span>
                    </div>
                    <div>
                      <div className="font-semibold text-card-foreground" data-testid="testimonial-name-1">Workshop Participant</div>
                      <div className="text-sm text-muted-foreground" data-testid="testimonial-title-1">Houston Restaurant Owner (Composite)</div>
                    </div>
                  </div>
                  <p className="text-card-foreground leading-relaxed mb-4" data-testid="testimonial-text-1">
                    "Based on feedback from our workshop participants, restaurant owners typically see improvements in their Google Business profile ranking within 60-90 days. Many report saving 2-4 hours weekly through automated customer communications and better online visibility for local searches."
                  </p>
                  <div className="text-sm text-muted-foreground mb-4">
                    <strong>Common Experience:</strong> Improved local search ranking, time savings through automation, better customer engagement
                  </div>
                  <div className="flex text-yellow-400" data-testid="testimonial-stars-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Testimonial 2 */}
            <AnimatedSection className="hover-lift">
              <Card className="shadow-sm h-full" data-testid="testimonial-card-2">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full mr-4 bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center" data-testid="testimonial-avatar-2">
                      <span className="text-white font-semibold text-lg">MP</span>
                    </div>
                    <div>
                      <div className="font-semibold text-card-foreground" data-testid="testimonial-name-2">Beta Client</div>
                      <div className="text-sm text-muted-foreground" data-testid="testimonial-title-2">Houston Medical Practice (Composite)</div>
                    </div>
                  </div>
                  <p className="text-card-foreground leading-relaxed mb-4" data-testid="testimonial-text-2">
                    "Healthcare professionals commonly experience improved patient scheduling efficiency and reduced administrative calls when implementing AI systems. Based on industry research, practices typically see better organization of patient communications and streamlined appointment processes within 30-60 days."
                  </p>
                  <div className="text-sm text-muted-foreground mb-4">
                    <strong>Typical Results:</strong> More organized patient scheduling, reduced administrative workload, improved communication flow
                  </div>
                  <div className="flex text-yellow-400" data-testid="testimonial-stars-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Testimonial 3 */}
            <AnimatedSection className="hover-lift">
              <Card className="shadow-sm h-full" data-testid="testimonial-card-3">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full mr-4 bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center" data-testid="testimonial-avatar-3">
                      <span className="text-white font-semibold text-lg">LP</span>
                    </div>
                    <div>
                      <div className="font-semibold text-card-foreground" data-testid="testimonial-name-3">Founder Experience</div>
                      <div className="text-sm text-muted-foreground" data-testid="testimonial-title-3">Legal Professional (Personal Account)</div>
                    </div>
                  </div>
                  <p className="text-card-foreground leading-relaxed mb-4" data-testid="testimonial-text-3">
                    "From my personal experience testing these systems, legal professionals commonly find that proper qualification processes help identify more serious prospects. Industry feedback suggests that better lead qualification typically results in more focused client consultations and improved case-fit within 45-90 days."
                  </p>
                  <div className="text-sm text-muted-foreground mb-4">
                    <strong>Common Experience:</strong> Better lead qualification, more focused consultations, improved client-case matching
                  </div>
                  <div className="flex text-yellow-400" data-testid="testimonial-stars-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          {/* Results Stats */}
          <div className="mt-20">
            <AnimatedSection>
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12" data-testid="stats-container">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2" data-testid="stat-revenue">Results Vary</div>
                    <div className="text-muted-foreground font-medium">Individual Experiences Differ</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-accent mb-2" data-testid="stat-businesses">Growing</div>
                    <div className="text-muted-foreground font-medium">Houston Business Network</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-secondary mb-2" data-testid="stat-rating">4.9★</div>
                    <div className="text-muted-foreground font-medium">Average Client Rating</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-8 text-center">
            <div className="bg-muted/30 rounded-lg p-6 max-w-4xl mx-auto">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>Disclaimer:</strong> Testimonials represent individual experiences and are composites based on common feedback patterns. Results may vary based on business circumstances, market conditions, and implementation. Past performance does not guarantee future results. Individual outcomes depend on various factors including business type, market competition, and effort invested.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="faq-title">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground" data-testid="faq-subtitle">
                Get answers to common questions about our AI marketing services and pricing.
              </p>
            </AnimatedSection>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How much do your AI marketing services cost?",
                answer: "Our services are designed to be affordable for Houston small businesses. AI Training Workshops start at $150, Google Business Profile Optimization starts at $397, and custom AI marketing strategies start at $997/month. Every service includes a money-back guarantee if you don't see measurable results."
              },
              {
                question: "How quickly will I see results from AI marketing?",
                answer: "Most of our Houston clients see initial improvements within 2-3 weeks. Google Business Profile optimization shows results in 30-45 days, AI-powered content increases engagement immediately, and our complete marketing strategies typically show significant growth within 60-90 days."
              },
              {
                question: "Do I need technical experience to work with you?",
                answer: "Not at all! We specialize in making AI marketing accessible to non-technical business owners. Our workshops teach you step-by-step, and our done-for-you services handle all the technical aspects while educating you on how everything works."
              },
              {
                question: "What makes you different from other marketing agencies?",
                answer: "We're Houston's first AI-native marketing agency, built specifically for the artificial intelligence era. Unlike traditional agencies, we combine cutting-edge AI tools with deep local Houston market knowledge, and we guarantee measurable results or your money back."
              },
              {
                question: "Can you help if my business is in a specialized industry?",
                answer: "Absolutely! We have extensive experience with Houston restaurants, medical practices, law firms, real estate agencies, and retail businesses. Our industry-specific workshops and custom strategies are tailored to your sector's unique challenges and opportunities."
              },
              {
                question: "What if I'm not satisfied with the results?",
                answer: "We stand behind our work with a 100% satisfaction guarantee. If you don't see measurable improvements in your marketing performance within 60 days, we'll refund your investment completely. Your success is our reputation in the Houston business community."
              },
              {
                question: "Do you work with businesses outside of Houston?",
                answer: "While we specialize in Houston businesses and have deep local market knowledge, we do work with select clients throughout Texas and nationally. However, our local Houston focus allows us to provide insights and strategies that out-of-state agencies simply can't match."
              },
              {
                question: "How do I get started?",
                answer: "Simply fill out the form below to get your free AI marketing audit. We'll analyze your current marketing, identify opportunities, and show you exactly how AI can grow your business. The audit takes about 30 minutes and there's no obligation to work with us afterward."
              }
            ].map((faq, index) => (
              <AnimatedSection key={index}>
                <Card className="shadow-sm" data-testid={`faq-item-${index}`}>
                  <Collapsible open={openFaq === index} onOpenChange={() => setOpenFaq(openFaq === index ? null : index)}>
                    <CollapsibleTrigger asChild>
                      <CardContent className="p-6 cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-foreground text-left" data-testid={`faq-question-${index}`}>
                            {faq.question}
                          </h3>
                          {openFaq === index ? 
                            <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-4" /> : 
                            <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-4" />
                          }
                        </div>
                      </CardContent>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="px-6 pb-6 pt-0">
                        <p className="text-muted-foreground leading-relaxed" data-testid={`faq-answer-${index}`}>
                          {faq.answer}
                        </p>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Houston Areas Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Dominate Local Search Across Houston
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We specialize in AI marketing for Houston's premier neighborhoods. Click your area to see how we help local businesses like yours dominate search results.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatedSection>
              <Card className="h-full hover-lift transition-all duration-300 hover:shadow-lg" data-testid="heights-area-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="w-8 h-8 text-primary mr-3" />
                    <h3 className="text-xl font-bold text-foreground">Houston Heights</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Target young professionals and families near Heights Boulevard, 19th Street, and White Oak Bayou with AI marketing that speaks their language.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Heights Boulevard targeting
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Young professional demographics
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Local events integration
                    </li>
                  </ul>
                  <Button asChild className="w-full" data-testid="heights-learn-more">
                    <a href="/heights-ai-marketing">Heights AI Marketing →</a>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection>
              <Card className="h-full hover-lift transition-all duration-300 hover:shadow-lg" data-testid="midtown-area-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="w-8 h-8 text-primary mr-3" />
                    <h3 className="text-xl font-bold text-foreground">Midtown Houston</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Capture Medical Center professionals and Museum District visitors with AI marketing optimized for Houston's cultural heart.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Medical Center proximity
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Museum District traffic
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Professional targeting
                    </li>
                  </ul>
                  <Button asChild className="w-full" data-testid="midtown-learn-more">
                    <a href="/midtown-ai-marketing">Midtown AI Marketing →</a>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection>
              <Card className="h-full hover-lift transition-all duration-300 hover:shadow-lg" data-testid="downtown-area-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="w-8 h-8 text-primary mr-3" />
                    <h3 className="text-xl font-bold text-foreground">Downtown Houston</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Attract corporate executives and business travelers in Houston's premier business district with sophisticated AI marketing.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Corporate headquarters
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Theater District events
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Business lunch targeting
                    </li>
                  </ul>
                  <Button asChild className="w-full" data-testid="downtown-learn-more">
                    <a href="/downtown-ai-marketing">Downtown AI Marketing →</a>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection>
              <Card className="h-full hover-lift transition-all duration-300 hover:shadow-lg" data-testid="memorial-area-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="w-8 h-8 text-primary mr-3" />
                    <h3 className="text-xl font-bold text-foreground">Memorial Area</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Reach Houston's most affluent families near Memorial Park and Energy Corridor with premium AI marketing solutions.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Affluent family targeting
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Energy Corridor executives
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Memorial Park lifestyle
                    </li>
                  </ul>
                  <Button asChild className="w-full" data-testid="memorial-learn-more">
                    <a href="/memorial-ai-marketing">Memorial AI Marketing →</a>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection>
              <Card className="h-full hover-lift transition-all duration-300 hover:shadow-lg" data-testid="galleria-area-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="w-8 h-8 text-primary mr-3" />
                    <h3 className="text-xl font-bold text-foreground">Galleria District</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Capture Houston's luxury market near The Galleria mall and Uptown with high-end AI marketing for affluent shoppers.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Luxury shopping traffic
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      High-income demographics
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Corporate services
                    </li>
                  </ul>
                  <Button asChild className="w-full" data-testid="galleria-learn-more">
                    <a href="/galleria-ai-marketing">Galleria AI Marketing →</a>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection>
              <Card className="h-full bg-gradient-to-br from-primary/10 to-blue-600/10 border-primary/20" data-testid="all-areas-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Globe className="w-8 h-8 text-primary mr-3" />
                    <h3 className="text-xl font-bold text-foreground">All Houston Areas</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Don't see your Houston neighborhood? We serve all Houston metro areas with customized AI marketing strategies.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Greater Houston coverage
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Custom local strategies
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Multi-location businesses
                    </li>
                  </ul>
                  <Button asChild className="w-full" variant="outline" data-testid="contact-all-areas">
                    <a href="/contact">Contact Us →</a>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          <AnimatedSection>
            <div className="text-center mt-12">
              <p className="text-lg text-muted-foreground mb-6">
                <strong>Local SEO Domination:</strong> Each Houston area has unique demographics, business challenges, and search patterns. Our AI marketing adapts to your specific neighborhood for maximum local impact.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  500+ Local Keywords Optimized
                </span>
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 text-primary mr-1" />
                  All Houston Zip Codes Covered
                </span>
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  89 Houston Businesses Growing
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="contact-title">
                  Ready to Transform Your Houston Business?
                </h2>
                <p className="text-xl text-muted-foreground mb-8" data-testid="contact-subtitle">
                  Join 89+ Houston businesses that have already revolutionized their marketing with AI. Get your free consultation and see how we can grow your business.
                </p>
                
                {/* Contact Information */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-foreground">
                    <Phone className="w-6 h-6 text-primary mr-4" />
                    <span className="text-lg font-medium" data-testid="contact-phone">(713) 555-0123</span>
                  </div>
                  <div className="flex items-center text-foreground">
                    <Mail className="w-6 h-6 text-primary mr-4" />
                    <span className="text-lg" data-testid="contact-email">info@aihoustonmarketing.com</span>
                  </div>
                  <div className="flex items-center text-foreground">
                    <MapPinIcon className="w-6 h-6 text-primary mr-4" />
                    <span className="text-lg" data-testid="contact-address">1234 Main Street, Houston, TX 77002</span>
                  </div>
                </div>

                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500" 
                  alt="Modern office workspace with AI marketing professionals" 
                  className="rounded-2xl shadow-lg w-full lg:hidden" 
                  data-testid="contact-office-image"
                />
              </AnimatedSection>
            </div>

            <div className="mt-12 lg:mt-0">
              <AnimatedSection>
                <Card className="shadow-xl" data-testid="contact-form-card">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-6" data-testid="contact-form-title">Get Your Free AI Marketing Audit</h3>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name *</FormLabel>
                                <FormControl>
                                  <Input {...field} data-testid="input-first-name" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name *</FormLabel>
                                <FormControl>
                                  <Input {...field} data-testid="input-last-name" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Email *</FormLabel>
                              <FormControl>
                                <Input type="email" {...field} data-testid="input-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number *</FormLabel>
                              <FormControl>
                                <Input type="tel" {...field} data-testid="input-phone" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="businessType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Type *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-business-type-form">
                                    <SelectValue placeholder="Select your business type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="restaurant">Restaurant</SelectItem>
                                  <SelectItem value="medical-practice">Medical Practice</SelectItem>
                                  <SelectItem value="law-firm">Law Firm</SelectItem>
                                  <SelectItem value="real-estate">Real Estate</SelectItem>
                                  <SelectItem value="retail-store">Retail Store</SelectItem>
                                  <SelectItem value="professional-services">Professional Services</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>How can we help you?</FormLabel>
                              <FormControl>
                                <Textarea 
                                  rows={4} 
                                  placeholder="Tell us about your marketing challenges..."
                                  {...field}
                                  value={field.value || ""}
                                  data-testid="textarea-message"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="submit" 
                          disabled={contactMutation.isPending}
                          className="w-full py-4 text-lg hover:shadow-xl transition-all duration-200"
                          data-testid="button-submit-contact"
                        >
                          {contactMutation.isPending ? (
                            <LoadingSpinner size="sm" text="Submitting your request..." />
                          ) : (
                            "Claim Your FREE $500 AI Audit (Limited Spots)"
                          )}
                        </Button>
                        <p className="text-sm text-muted-foreground text-center" data-testid="contact-disclaimer">
                          We'll analyze your current marketing and show you exactly how AI can grow your business.
                        </p>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
