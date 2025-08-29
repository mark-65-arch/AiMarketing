import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion, useInView } from "framer-motion";
import { 
  MapPin, 
  Star, 
  CheckCircle, 
  Phone, 
  Mail, 
  Calendar,
  TrendingUp,
  Camera,
  MessageSquare,
  Clock,
  ChevronDown,
  ChevronUp,
  Search,
  Users,
  BarChart3
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
import type { InsertContactSubmission } from "@shared/schema";
import { useState } from "react";

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

export default function BusinessProfile() {
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
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Thank you! We'll contact you within 24 hours to discuss your Google Business Profile optimization.",
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

  const onSubmit = (data: InsertContactSubmission) => {
    const messageWithContext = `${data.message}\n\nInterested in: Google Business Profile Optimization`;
    contactMutation.mutate({ ...data, message: messageWithContext });
  };

  const faqs = [
    {
      question: "How quickly will I see results from Google Business Profile optimization?",
      answer: "Most Houston businesses see improved local search visibility within 2-3 weeks. Full results typically appear within 30-45 days as Google recognizes your optimized profile and increased activity."
    },
    {
      question: "Do you guarantee first page rankings on Google?",
      answer: "While we can't guarantee specific rankings due to Google's complex algorithm, our optimization dramatically improves your chances. 85% of our Houston clients reach the first page for their primary local keywords within 60 days."
    },
    {
      question: "What if my business doesn't have many reviews yet?",
      answer: "That's actually perfect! We'll help you build a strong review foundation with our proven review generation system. We provide templates and strategies to ethically encourage satisfied customers to leave reviews."
    },
    {
      question: "Can you help if my business has multiple Houston locations?",
      answer: "Absolutely! We specialize in multi-location businesses. Each location gets its own optimized profile with location-specific content, photos, and review management strategies."
    },
    {
      question: "What happens after the initial optimization is complete?",
      answer: "With our Complete package, you get 3 months of content templates and posting schedules. We also provide training so your team can maintain the momentum we build during optimization."
    },
    {
      question: "Is this different from regular SEO or website optimization?",
      answer: "Yes! Google Business Profile optimization focuses specifically on local search results, Google Maps rankings, and the information panel that appears when people search for your business. It's faster and often more effective than traditional SEO for local businesses."
    }
  ];

  const packages = [
    {
      name: "Basic Optimization",
      price: "$397",
      description: "Perfect for new businesses or those just getting started with local search optimization.",
      timeline: "5-7 business days",
      includes: [
        "Complete profile audit and cleanup",
        "Keyword optimization for Houston searches",
        "Professional business description writing",
        "Category and attribute optimization",
        "Basic photo recommendations",
        "Review response templates",
        "Initial posting strategy guide"
      ]
    },
    {
      name: "Complete with Templates",
      price: "$597",
      description: "Our most popular package for businesses serious about dominating local Houston search results.",
      timeline: "5-7 business days + 3 months support",
      popular: true,
      includes: [
        "Everything in Basic Optimization",
        "3 months of post templates and content calendar",
        "Advanced photo optimization and editing",
        "Competitor analysis and positioning",
        "Review generation strategy and templates",
        "Monthly performance tracking setup",
        "AI-powered posting recommendations",
        "One hour of implementation training"
      ]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Profile Audit",
      description: "We conduct a comprehensive analysis of your current Google Business Profile and identify optimization opportunities."
    },
    {
      step: "2", 
      title: "Optimization",
      description: "We optimize every element: business info, categories, descriptions, photos, and set up tracking systems."
    },
    {
      step: "3",
      title: "Content Strategy", 
      description: "We create a posting calendar, review templates, and provide ongoing content to keep your profile active."
    },
    {
      step: "4",
      title: "Monitor & Improve",
      description: "We track performance and provide recommendations for continued growth and local search dominance."
    }
  ];

  const benefits = [
    {
      icon: Search,
      title: "Rank Higher in Local Search",
      description: "Appear when Houston customers search for your services in Google and Google Maps."
    },
    {
      icon: Phone,
      title: "Get More Phone Calls",
      description: "Make it easy for customers to call you directly from search results."
    },
    {
      icon: TrendingUp,
      title: "Increase Website Traffic",
      description: "Drive qualified traffic to your website from people ready to buy."
    },
    {
      icon: Users,
      title: "Attract More Foot Traffic",
      description: "Help nearby customers find your physical location and visit your business."
    }
  ];

  return (
    <div className="bg-background font-sans antialiased">
      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold text-secondary">
                <a href="/" className="gradient-text" data-testid="nav-logo">Houston AI Marketing</a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="/" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-home">Home</a>
                <a href="/#services" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-services">Services</a>
                <a href="/assessment" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-assessment">Assessment</a>
                <a href="#contact" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg" data-testid="nav-cta">Get Started</a>
              </div>
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
                  Dominate Houston Local Search with{" "}
                  <span className="gradient-text">Google Business Profile</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="hero-subtitle">
                  Stop losing customers to competitors who show up first on Google. Our proven optimization process helps Houston businesses rank higher, get more calls, and attract more customers through local search.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button asChild size="lg" className="text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200" data-testid="button-get-started">
                    <a href="#contact">Start Ranking Higher</a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 hover:bg-muted/50 transition-all duration-200" data-testid="button-learn-more">
                    <a href="#packages">View Packages</a>
                  </Button>
                </div>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    5-7 day delivery
                  </div>
                  <div className="flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Proven results
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Houston-focused
                  </div>
                </div>
              </AnimatedSection>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-5">
              <AnimatedSection>
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Houston business owner celebrating increased local search visibility" 
                  className="rounded-2xl shadow-2xl w-full hover-lift" 
                  data-testid="hero-image"
                />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="benefits-title">
                Why Houston Businesses Choose Our Optimization
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="benefits-subtitle">
                Transform your Google Business Profile into a powerful customer-generating machine that works 24/7 for your Houston business.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={index} className="text-center">
                <Card className="shadow-sm h-full hover-lift" data-testid={`benefit-card-${index}`}>
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <benefit.icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-card-foreground mb-4" data-testid={`benefit-title-${index}`}>
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" data-testid={`benefit-description-${index}`}>
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 demo-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="packages-title">
                Choose Your Optimization Package
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="packages-subtitle">
                From basic optimization to comprehensive local marketing dominance, we have the perfect package for your Houston business needs.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <AnimatedSection key={index} className="hover-lift">
                <Card className={`h-full shadow-sm relative overflow-hidden ${pkg.popular ? 'border-2 border-accent' : ''}`} data-testid={`package-card-${index}`}>
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-4 py-2 text-sm font-semibold" data-testid="badge-popular">
                      Most Popular
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                      <MapPin className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold text-card-foreground mb-4" data-testid={`package-name-${index}`}>
                      {pkg.name}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`package-description-${index}`}>
                      {pkg.description}
                    </p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-accent" data-testid={`package-price-${index}`}>
                        {pkg.price}
                      </span>
                      <div className="text-sm text-muted-foreground mt-1">
                        Delivery: {pkg.timeline}
                      </div>
                    </div>
                    <div className="space-y-3 mb-8">
                      {pkg.includes.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-card-foreground text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                    <Button asChild className={`w-full ${pkg.popular ? 'bg-accent hover:bg-accent/90 text-accent-foreground' : ''}`} data-testid={`button-choose-${index}`}>
                      <a href="#contact">Choose This Package</a>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="process-title">
                Our Proven Optimization Process
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="process-subtitle">
                We follow a systematic approach that has helped hundreds of Houston businesses dominate local search results.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <AnimatedSection key={index}>
                <Card className="text-center shadow-sm h-full" data-testid={`process-step-${index}`}>
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-card-foreground mb-4" data-testid={`step-title-${index}`}>
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" data-testid={`step-description-${index}`}>
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Examples */}
      <section className="py-20 demo-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="examples-title">
                Real Results from Houston Businesses
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="examples-subtitle">
                See how our optimization transforms local search performance for businesses just like yours.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <Card className="shadow-xl" data-testid="before-card">
                <CardContent className="p-8">
                  <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-4 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-2 rotate-180" />
                      Before Optimization
                    </h3>
                    <ul className="space-y-3 text-red-700 dark:text-red-300">
                      <li>• Buried on page 3 of Google search results</li>
                      <li>• Only 2-3 customer calls per week from Google</li>
                      <li>• Incomplete business information</li>
                      <li>• Few or outdated photos</li>
                      <li>• Limited online visibility</li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">3rd Page Rankings</div>
                    <div className="text-sm text-muted-foreground">Average Houston restaurant before optimization</div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection>
              <Card className="shadow-xl" data-testid="after-card">
                <CardContent className="p-8">
                  <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-4 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-2" />
                      After Optimization
                    </h3>
                    <ul className="space-y-3 text-green-700 dark:text-green-300">
                      <li>• First page rankings for key Houston searches</li>
                      <li>• 15-20 qualified calls per week</li>
                      <li>• Complete, optimized business profile</li>
                      <li>• Professional photo galleries</li>
                      <li>• Dominant local search presence</li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">Top 3 Rankings</div>
                    <div className="text-sm text-muted-foreground">Within 45 days of optimization</div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="testimonials-title">
                Success Stories from Houston
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="testimonials-subtitle">
                Local business owners share how Google Business Profile optimization transformed their customer acquisition.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection className="hover-lift">
              <Card className="shadow-sm h-full" data-testid="testimonial-card-1">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                      alt="Restaurant owner testimonial" 
                      className="w-12 h-12 rounded-full mr-4" 
                      data-testid="testimonial-avatar-1"
                    />
                    <div>
                      <div className="font-semibold text-card-foreground" data-testid="testimonial-name-1">Roberto Santos</div>
                      <div className="text-sm text-muted-foreground" data-testid="testimonial-title-1">Santos Mexican Grill, Montrose</div>
                    </div>
                  </div>
                  <p className="text-card-foreground leading-relaxed mb-4" data-testid="testimonial-text-1">
                    "We went from getting maybe 5 calls a week to 20+ calls a day! Our Google listing now shows up first when people search for Mexican food in Montrose. The phone hasn't stopped ringing."
                  </p>
                  <div className="flex text-yellow-400" data-testid="testimonial-stars-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection className="hover-lift">
              <Card className="shadow-sm h-full" data-testid="testimonial-card-2">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108755-2616c56d5e55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                      alt="Healthcare professional testimonial" 
                      className="w-12 h-12 rounded-full mr-4" 
                      data-testid="testimonial-avatar-2"
                    />
                    <div>
                      <div className="font-semibold text-card-foreground" data-testid="testimonial-name-2">Dr. Amanda Foster</div>
                      <div className="text-sm text-muted-foreground" data-testid="testimonial-title-2">Foster Dental Care, Heights</div>
                    </div>
                  </div>
                  <p className="text-card-foreground leading-relaxed mb-4" data-testid="testimonial-text-2">
                    "The optimization was incredible. We're now the first dental practice that shows up when people search in the Heights area. New patient appointments have tripled in just two months."
                  </p>
                  <div className="flex text-yellow-400" data-testid="testimonial-stars-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection className="hover-lift">
              <Card className="shadow-sm h-full" data-testid="testimonial-card-3">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                      alt="Auto repair shop owner testimonial" 
                      className="w-12 h-12 rounded-full mr-4" 
                      data-testid="testimonial-avatar-3"
                    />
                    <div>
                      <div className="font-semibold text-card-foreground" data-testid="testimonial-name-3">James Wilson</div>
                      <div className="text-sm text-muted-foreground" data-testid="testimonial-title-3">Wilson Auto Repair, Katy</div>
                    </div>
                  </div>
                  <p className="text-card-foreground leading-relaxed mb-4" data-testid="testimonial-text-3">
                    "Best investment I've made for my auto shop. We're now getting customers from all over west Houston who find us through Google. Our revenue increased 40% in the first quarter."
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
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 demo-container">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="faq-title">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground" data-testid="faq-subtitle">
                Get answers to common questions about Google Business Profile optimization.
              </p>
            </AnimatedSection>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
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
                            <ChevronUp className="w-5 h-5 text-muted-foreground" /> : 
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="contact-title">
                Ready to Dominate Houston Local Search?
              </h2>
              <p className="text-xl text-muted-foreground" data-testid="contact-subtitle">
                Get started today and start attracting more customers through Google search and maps.
              </p>
            </AnimatedSection>
          </div>

          <AnimatedSection>
            <Card className="shadow-xl" data-testid="contact-card">
              <CardContent className="p-8 md:p-12">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} data-testid="input-first-name" />
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
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Smith" {...field} data-testid="input-last-name" />
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
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@yourbusiness.com" {...field} data-testid="input-email" />
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
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(713) 555-0123" {...field} data-testid="input-phone" />
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
                          <FormLabel>Business Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-business-type">
                                <SelectValue placeholder="Select your business type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="restaurant">Restaurant/Food Service</SelectItem>
                              <SelectItem value="medical">Healthcare/Medical Practice</SelectItem>
                              <SelectItem value="legal">Legal Services</SelectItem>
                              <SelectItem value="realestate">Real Estate</SelectItem>
                              <SelectItem value="retail">Retail/E-commerce</SelectItem>
                              <SelectItem value="professional">Professional Services</SelectItem>
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
                          <FormLabel>Tell us about your current Google Business Profile</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Do you have a Google Business Profile set up? What challenges are you facing with local search visibility?"
                              className="resize-none"
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
                      size="lg" 
                      className="w-full text-lg py-4"
                      disabled={contactMutation.isPending}
                      data-testid="button-submit"
                    >
                      {contactMutation.isPending ? "Submitting..." : "Start My Optimization"}
                    </Button>
                  </form>
                </Form>

                <div className="mt-8 pt-8 border-t border-border text-center">
                  <p className="text-muted-foreground mb-4">
                    Questions about our optimization process?
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8">
                    <div className="flex items-center text-foreground">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>(713) 555-0123</span>
                    </div>
                    <div className="flex items-center text-foreground">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>info@aihoustonmarketing.com</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Houston AI Marketing</h3>
              <p className="text-secondary-foreground/80 text-sm leading-relaxed">
                Empowering Houston businesses with artificial intelligence marketing solutions that drive real results.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/ai-training" className="hover:text-white transition-colors">AI Training Workshops</a></li>
                <li><a href="/business-profile" className="hover:text-white transition-colors">Google Profile Optimization</a></li>
                <li><a href="/ai-websites" className="hover:text-white transition-colors">AI-Optimized Websites</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>(713) 555-0123</li>
                <li>info@aihoustonmarketing.com</li>
                <li>1234 Main Street<br />Houston, TX 77002</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">Facebook</a>
              </div>
            </div>
          </div>
          <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 Houston AI Marketing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}