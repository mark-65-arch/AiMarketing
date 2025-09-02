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
  HelpCircle
} from "lucide-react";
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
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold text-secondary">
                <span className="gradient-text" data-testid="nav-logo">Houston AI Marketing</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="/about" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-about">About</a>
                <a href="#services" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-services">Services</a>
                <a href="/ai-tools" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-ai-tools">Free AI Tools</a>
                <a href="/contact" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-contact">Contact</a>
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
          <div className="md:hidden bg-background border-t border-border" data-testid="mobile-menu">
            <div className="px-4 py-3 space-y-3">
              <a href="/about" className="block text-foreground hover:text-primary px-3 py-2 text-base font-medium transition-colors" data-testid="mobile-nav-about">About</a>
              <a href="#services" className="block text-foreground hover:text-primary px-3 py-2 text-base font-medium transition-colors" data-testid="mobile-nav-services" onClick={() => setIsMenuOpen(false)}>Services</a>
              <a href="/ai-tools" className="block text-foreground hover:text-primary px-3 py-2 text-base font-medium transition-colors" data-testid="mobile-nav-ai-tools">Free AI Tools</a>
              <a href="/contact" className="block text-foreground hover:text-primary px-3 py-2 text-base font-medium transition-colors" data-testid="mobile-nav-contact">Contact</a>
              <a href="#contact" className="block bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 rounded-lg text-base font-medium text-center transition-all duration-200" data-testid="mobile-nav-cta" onClick={() => setIsMenuOpen(false)}>Get FREE Audit</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-muted/30 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="lg:col-span-7">
              <AnimatedSection>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" data-testid="hero-title">
                  Transform Your Houston Business with{" "}
                  <span className="gradient-text">Artificial Intelligence</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="hero-subtitle">
                  Stop losing customers to competitors who rank higher on Google. Our proven AI marketing systems have helped 50+ Houston businesses increase revenue by 200-400% while saving 15+ hours per week on marketing tasks.
                </p>
                <div className="bg-accent/10 rounded-lg p-4 mb-6 border border-accent/20">
                  <p className="text-sm font-semibold text-accent mb-1">⚡ LIMITED TIME: January Workshop Special</p>
                  <p className="text-sm text-muted-foreground">Only 12 seats remaining for our next AI Training Workshop. Houston businesses are booking fast.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200" data-testid="button-free-audit">
                    <a href="#contact">Get FREE $500 AI Audit (Limited Time)</a>
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
                              <a href="/ai-tools">Try More AI Tools</a>
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
        <div className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-center text-muted-foreground mb-8 font-medium" data-testid="trust-text">Trusted by 50+ Houston Businesses Since 2023</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-background/80 rounded-lg p-4 border" data-testid="trust-metric-1">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Businesses Served</div>
              </div>
              <div className="bg-background/80 rounded-lg p-4 border" data-testid="trust-metric-2">
                <div className="text-2xl font-bold text-primary">300%</div>
                <div className="text-sm text-muted-foreground">Avg. Revenue Increase</div>
              </div>
              <div className="bg-background/80 rounded-lg p-4 border" data-testid="trust-metric-3">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Hours Saved Weekly</div>
              </div>
              <div className="bg-background/80 rounded-lg p-4 border" data-testid="trust-metric-4">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
            </div>
          </AnimatedSection>
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
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                      alt="Professional business owner" 
                      className="w-12 h-12 rounded-full mr-4" 
                      data-testid="testimonial-avatar-1"
                    />
                    <div>
                      <div className="font-semibold text-card-foreground" data-testid="testimonial-name-1">Maria Gonzalez</div>
                      <div className="text-sm text-muted-foreground" data-testid="testimonial-title-1">Owner, Abuela's Kitchen (Montrose)</div>
                    </div>
                  </div>
                  <p className="text-card-foreground leading-relaxed mb-4" data-testid="testimonial-text-1">
                    "In just 45 days, our Google listing went from page 3 to #1 for 'Mexican food Montrose.' We went from 15 online orders per day to 63! The AI chatbot handles 80% of our reservation calls now, saving me 3 hours daily."
                  </p>
                  <div className="text-sm text-muted-foreground mb-4">
                    <strong>Results:</strong> 320% increase in online orders, #1 Google ranking, 3 hours saved daily
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
                    <img 
                      src="https://images.unsplash.com/photo-1494790108755-2616c56d5e55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                      alt="Professional female business leader" 
                      className="w-12 h-12 rounded-full mr-4" 
                      data-testid="testimonial-avatar-2"
                    />
                    <div>
                      <div className="font-semibold text-card-foreground" data-testid="testimonial-name-2">Dr. James Patterson</div>
                      <div className="text-sm text-muted-foreground" data-testid="testimonial-title-2">Memorial Hermann Affiliated Cardiologist</div>
                    </div>
                  </div>
                  <p className="text-card-foreground leading-relaxed mb-4" data-testid="testimonial-text-2">
                    "Our new patient appointments increased from 8 per week to 31 per week after the website launch. The AI scheduling system reduced our front desk calls by 70%. My practice revenue grew $47,000 in the first quarter alone."
                  </p>
                  <div className="text-sm text-muted-foreground mb-4">
                    <strong>Results:</strong> 288% more new patients, $47K additional quarterly revenue, 70% fewer calls
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
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                      alt="Professional male business executive" 
                      className="w-12 h-12 rounded-full mr-4" 
                      data-testid="testimonial-avatar-3"
                    />
                    <div>
                      <div className="font-semibold text-card-foreground" data-testid="testimonial-name-3">Rachel Kim</div>
                      <div className="text-sm text-muted-foreground" data-testid="testimonial-title-3">Partner, Kim & Associates (Downtown)</div>
                    </div>
                  </div>
                  <p className="text-card-foreground leading-relaxed mb-4" data-testid="testimonial-text-3">
                    "We went from 2-3 consultation requests per month to 47 qualified leads. The AI qualification system filters out time-wasters, so we only speak with serious clients. Our case value increased 180% because we're attracting better clients."
                  </p>
                  <div className="text-sm text-muted-foreground mb-4">
                    <strong>Results:</strong> 1,467% increase in leads, 180% higher case values, better client quality
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
                    <div className="text-4xl font-bold text-primary mb-2" data-testid="stat-revenue">250%</div>
                    <div className="text-muted-foreground font-medium">Average Revenue Increase</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-accent mb-2" data-testid="stat-businesses">89</div>
                    <div className="text-muted-foreground font-medium">Houston Businesses Served</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-secondary mb-2" data-testid="stat-rating">4.9★</div>
                    <div className="text-muted-foreground font-medium">Average Client Rating</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
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

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold mb-4" data-testid="footer-logo">Houston AI Marketing</div>
              <p className="text-secondary-foreground/80 mb-6 leading-relaxed" data-testid="footer-description">
                Transform your Houston business with cutting-edge AI marketing solutions. We help local businesses dominate search results and automate customer engagement.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors" data-testid="social-facebook">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors" data-testid="social-twitter">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors" data-testid="social-linkedin">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors" data-testid="social-instagram">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4" data-testid="footer-services-title">Services</h4>
              <ul className="space-y-2 text-secondary-foreground/80">
                <li><a href="#services" className="hover:text-secondary-foreground transition-colors" data-testid="footer-link-workshops">AI Training Workshops</a></li>
                <li><a href="#services" className="hover:text-secondary-foreground transition-colors" data-testid="footer-link-optimization">Google Business Optimization</a></li>
                <li><a href="#services" className="hover:text-secondary-foreground transition-colors" data-testid="footer-link-websites">AI-Optimized Websites</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4" data-testid="footer-contact-title">Contact</h4>
              <ul className="space-y-2 text-secondary-foreground/80">
                <li data-testid="footer-phone">(713) 555-0123</li>
                <li data-testid="footer-email">info@aihoustonmarketing.com</li>
                <li data-testid="footer-address">1234 Main Street<br/>Houston, TX 77002</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-secondary-foreground/60">
            <p data-testid="footer-copyright">&copy; 2025 Houston AI Marketing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
