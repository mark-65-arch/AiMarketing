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
  Instagram
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertContactSubmissionSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
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
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Thank you for your interest! We'll contact you within 24 hours to schedule your free AI audit.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  const handleDemoGeneration = () => {
    const businessType = document.querySelector<HTMLSelectElement>('#demo-business-type')?.value || "restaurant";
    const targetAudience = document.querySelector<HTMLInputElement>('#demo-target-audience')?.value || "Houston families";
    
    setDemoResult(`🤖 Transform your Houston ${businessType} with AI! Discover how smart automation brings ${targetAudience} straight to your door. Experience the future of ${businessType} marketing in Houston!`);
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
                <a href="#services" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-services">Services</a>
                <a href="#demo" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-demo">AI Demo</a>
                <a href="#testimonials" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-testimonials">Success Stories</a>
                <a href="#contact" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg" data-testid="nav-cta">Get Started</a>
              </div>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} data-testid="nav-mobile-menu">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
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
                  Stop losing customers to competitors who rank higher on Google. Our AI-powered marketing solutions help Houston businesses dominate local search, automate customer engagement, and grow revenue faster than ever before.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200" data-testid="button-free-audit">
                    <a href="#contact">Get Your Free AI Audit</a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 hover:bg-muted/50 transition-all duration-200" data-testid="button-assessment">
                    <a href="/assessment">Take Free AI Assessment</a>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-5">
              <AnimatedSection>
                <img 
                  src="https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Houston business skyline" 
                  className="rounded-2xl shadow-2xl w-full hover-lift" 
                  data-testid="hero-image"
                />
              </AnimatedSection>
            </div>
          </div>
        </div>
        
        {/* Trust Badges */}
        <div className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-center text-muted-foreground mb-8 font-medium" data-testid="trust-text">Trusted by Houston's Leading Businesses</p>
            <div className="flex justify-center items-center space-x-12 opacity-60 flex-wrap gap-4">
              <div className="text-xl md:text-2xl font-bold text-foreground" data-testid="trust-badge-restaurant">Local Restaurant Group</div>
              <div className="text-xl md:text-2xl font-bold text-foreground" data-testid="trust-badge-medical">Medical Practice</div>
              <div className="text-xl md:text-2xl font-bold text-foreground" data-testid="trust-badge-law">Law Firm</div>
              <div className="text-xl md:text-2xl font-bold text-foreground" data-testid="trust-badge-realestate">Real Estate Agency</div>
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
                    Master AI Marketing in just 4 hours. Learn to use ChatGPT, automated customer service, and AI content creation to revolutionize your marketing strategy.
                  </p>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-primary" data-testid="price-workshops">$150</span>
                    <span className="text-muted-foreground">/person</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center text-card-foreground">
                      <CheckCircle className="w-5 h-5 text-primary mr-3" />
                      4-hour intensive training
                    </li>
                    <li className="flex items-center text-card-foreground">
                      <CheckCircle className="w-5 h-5 text-primary mr-3" />
                      Hands-on AI tool setup
                    </li>
                    <li className="flex items-center text-card-foreground">
                      <CheckCircle className="w-5 h-5 text-primary mr-3" />
                      30-day email support
                    </li>
                  </ul>
                  <Button asChild className="w-full" data-testid="button-register-workshops">
                    <a href="#contact">Register Now</a>
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
                    Dominate local search results with AI-optimized Google Business Profile. Get more calls, website visits, and foot traffic from Houston customers.
                  </p>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-accent" data-testid="price-google">$397</span>
                    <span className="text-muted-foreground">starting at</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center text-card-foreground">
                      <CheckCircle className="w-5 h-5 text-accent mr-3" />
                      Complete profile optimization
                    </li>
                    <li className="flex items-center text-card-foreground">
                      <CheckCircle className="w-5 h-5 text-accent mr-3" />
                      AI-powered review management
                    </li>
                    <li className="flex items-center text-card-foreground">
                      <CheckCircle className="w-5 h-5 text-accent mr-3" />
                      Local SEO strategy
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" data-testid="button-ranking-higher">
                    <a href="#contact">Start Ranking Higher</a>
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
                    Websites built for the AI search era. Optimized for voice search, AI crawlers, and automated customer interactions that convert visitors into customers.
                  </p>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-secondary" data-testid="price-websites">$1,200</span>
                    <span className="text-muted-foreground">starting at</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center text-card-foreground">
                      <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                      AI-optimized content structure
                    </li>
                    <li className="flex items-center text-card-foreground">
                      <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                      Voice search optimization
                    </li>
                    <li className="flex items-center text-card-foreground">
                      <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                      Automated chat integration
                    </li>
                  </ul>
                  <Button asChild variant="secondary" className="w-full" data-testid="button-get-website">
                    <a href="#contact">Get Your Website</a>
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
                      <div className="font-semibold text-card-foreground" data-testid="testimonial-name-1">Mike Rodriguez</div>
                      <div className="text-sm text-muted-foreground" data-testid="testimonial-title-1">Houston Restaurant Owner</div>
                    </div>
                  </div>
                  <p className="text-card-foreground leading-relaxed mb-4" data-testid="testimonial-text-1">
                    "After implementing Houston AI Marketing's Google Business Profile optimization, our restaurant saw a 300% increase in online orders. The AI training workshop was incredible - we now handle customer service automatically!"
                  </p>
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
                      <div className="font-semibold text-card-foreground" data-testid="testimonial-name-2">Dr. Sarah Chen</div>
                      <div className="text-sm text-muted-foreground" data-testid="testimonial-title-2">Medical Practice Owner</div>
                    </div>
                  </div>
                  <p className="text-card-foreground leading-relaxed mb-4" data-testid="testimonial-text-2">
                    "The AI-optimized website doubled our appointment bookings within 2 months. Patients love the automated scheduling system. Houston AI Marketing delivered exactly what they promised."
                  </p>
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
                      <div className="font-semibold text-card-foreground" data-testid="testimonial-name-3">James Thompson</div>
                      <div className="text-sm text-muted-foreground" data-testid="testimonial-title-3">Law Firm Partner</div>
                    </div>
                  </div>
                  <p className="text-card-foreground leading-relaxed mb-4" data-testid="testimonial-text-3">
                    "Our law firm now ranks #1 for 'Houston personal injury lawyer' thanks to their AI optimization. The ROI has been incredible - we've gained 15 new clients this month alone."
                  </p>
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
                          {contactMutation.isPending ? "Submitting..." : "Get My Free AI Audit ($500 Value)"}
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
