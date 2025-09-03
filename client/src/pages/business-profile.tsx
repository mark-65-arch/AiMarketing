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
import logoWide from "@assets/Logo3-ezgif.com-optipng_1756914512078.png";

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
      question: "What exactly do I own after the 2-week project?",
      answer: "You own a complete automated system that posts to your Google Business Profile for 6 months, plus all templates, review responses, and optimization. No ongoing monthly fees to us."
    },
    {
      question: "How is this different from monthly marketing services?",
      answer: "Instead of paying monthly fees forever, you pay once and own the entire system. We build it, set it up, train you, and you keep everything. It's like buying automation instead of renting it."
    },
    {
      question: "What if I need help after the 2 weeks are complete?",
      answer: "You get 30 days of free support for questions and minor adjustments. After that, we offer hourly support if needed, but most clients find the system runs smoothly on its own."
    },
    {
      question: "How much time will I need during the project?",
      answer: "Week 1 requires about 2 hours for photos and business information gathering. Week 2 needs 2-3 hours for training. After setup, the system runs automatically with minimal input from you."
    },
    {
      question: "Will this work for multiple Houston locations?",
      answer: "Yes! Each location gets its own optimized profile and automation system. Pricing varies by number of locations - we'll provide a custom quote for multi-location businesses."
    },
    {
      question: "What if the automated system stops working?",
      answer: "The system is built on reliable platforms and includes redundancy. If anything stops working during your 6-month automation period, we'll fix it at no charge. After 6 months, you can renew the automation or manage posts manually."
    }
  ];

  const projectPackage = {
    name: "Google Business AI Domination",
    price: "$800-1,200",
    description: "Complete optimization plus 6 months of automated posting. Set up once, works forever.",
    timeline: "2 weeks",
    popular: true,
    includes: [
      "Complete profile audit and optimization",
      "6-month automated posting system",
      "Professional photo optimization",
      "Review templates and response automation",
      "Competitor analysis and positioning",
      "Complete training and handoff",
      "30-day post-launch support"
    ]
  };

  const processSteps = [
    {
      step: "Week 1",
      title: "Audit & Optimization",
      description: "Complete profile analysis, optimization of all elements, photo enhancement, and competitor research."
    },
    {
      step: "Week 2", 
      title: "Automation Setup",
      description: "Configure 6-month automated posting system, review templates, training session, and complete handoff."
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
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" data-testid="nav-logo">
                <img src={logoWide} alt="Marketing AI Houston" className="h-10 w-auto" />
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="/" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-home">Home</a>
                <a href="/services" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-services">Services</a>
                <a href="/assessment" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-assessment">Assessment</a>
                <a href="#contact" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg" data-testid="nav-cta">Get Quote</a>
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
                  Google Business AI Domination -{" "}
                  <span className="gradient-text">Automated Local Marketing</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="hero-subtitle">
                  Get complete optimization plus 6 months of automated posting. We optimize everything, set up automation, and train you to manage it. Set up once, works forever.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button asChild size="lg" className="text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200" data-testid="button-get-started">
                    <a href="#contact">Get Project Quote</a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 hover:bg-muted/50 transition-all duration-200" data-testid="button-learn-more">
                    <a href="#package">View Package Details</a>
                  </Button>
                </div>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    2 week delivery
                  </div>
                  <div className="flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    $800-1,200
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    6 months automation
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="package-title">
                Google Business AI Domination Package
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="package-subtitle">
                Complete optimization plus 6 months of automation. Everything you need to dominate local Houston search results.
              </p>
            </AnimatedSection>
          </div>

          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="hover-lift">
              <Card className="h-full shadow-lg relative overflow-hidden border-2 border-accent" data-testid="project-package-card">
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-4 py-2 text-sm font-semibold" data-testid="badge-popular">
                  Most Popular
                </div>
                <CardContent className="p-12">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <MapPin className="w-10 h-10 text-accent" />
                    </div>
                    <h3 className="text-3xl font-bold text-card-foreground mb-4" data-testid="project-package-name">
                      {projectPackage.name}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed" data-testid="project-package-description">
                      {projectPackage.description}
                    </p>
                    <div className="mb-8">
                      <span className="text-4xl font-bold text-accent" data-testid="project-package-price">
                        {projectPackage.price}
                      </span>
                      <div className="text-lg text-muted-foreground mt-2">
                        Delivery: {projectPackage.timeline}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 mb-8">
                    {projectPackage.includes.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-accent mr-4 mt-0.5 flex-shrink-0" />
                        <span className="text-card-foreground text-lg">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-12 py-4" data-testid="button-start-project">
                      <a href="#contact">Start Your Project</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="process-title">
                2-Week Project Timeline
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="process-subtitle">
                From audit to automation setup, we deliver your complete system in just 2 weeks.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <AnimatedSection key={index}>
                <Card className="text-center shadow-sm h-full" data-testid={`process-step-${index}`}>
                  <CardContent className="p-8">
                    <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-lg font-bold">
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
                      <div className="font-semibold text-card-foreground" data-testid="testimonial-name-1">Service Client</div>
                      <div className="text-sm text-muted-foreground" data-testid="testimonial-title-1">Houston Restaurant (Composite)</div>
                    </div>
                  </div>
                  <p className="text-card-foreground leading-relaxed mb-4" data-testid="testimonial-text-1">
                    "Based on service feedback, restaurants typically see improved call volume and better local search visibility after Google Business Profile optimization. Most clients report noticeable improvements in customer inquiries within 30-60 days."
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
                      <div className="font-semibold text-card-foreground" data-testid="testimonial-name-2">Service Client</div>
                      <div className="text-sm text-muted-foreground" data-testid="testimonial-title-2">Healthcare Practice (Composite)</div>
                    </div>
                  </div>
                  <p className="text-card-foreground leading-relaxed mb-4" data-testid="testimonial-text-2">
                    "Healthcare practices commonly experience improved local search rankings through proper Google Business Profile optimization. Based on client feedback, most see enhanced visibility for area searches and better patient acquisition within 60-90 days."
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
                      <div className="font-semibold text-card-foreground" data-testid="testimonial-name-3">Service Client</div>
                      <div className="text-sm text-muted-foreground" data-testid="testimonial-title-3">Auto Service Business (Composite)</div>
                    </div>
                  </div>
                  <p className="text-card-foreground leading-relaxed mb-4" data-testid="testimonial-text-3">
                    "Auto repair businesses typically benefit from expanded customer reach through improved Google visibility. Service clients commonly report attracting customers from wider geographic areas and better business growth over 3-6 month periods."
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
                      <span>info@marketingaihouston.com</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}