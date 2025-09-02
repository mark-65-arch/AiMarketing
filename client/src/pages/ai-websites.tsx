import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion, useInView } from "framer-motion";
import { 
  Globe, 
  Smartphone, 
  CheckCircle, 
  Phone, 
  Mail, 
  Calendar,
  Search,
  Zap,
  Shield,
  Clock,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Mic,
  BarChart3,
  Laptop,
  Star
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

export default function AIWebsites() {
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
        description: "Thank you! We'll contact you within 24 hours to discuss your AI-optimized website project.",
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
    const messageWithContext = `${data.message}\n\nInterested in: AI-Optimized Websites`;
    contactMutation.mutate({ ...data, message: messageWithContext });
  };

  const faqs = [
    {
      question: "What makes your websites 'AI-optimized' compared to regular websites?",
      answer: "Our AI-optimized websites are built specifically for the new era of search. They include voice search optimization, structured data for AI crawlers, conversational interfaces, and content structured to answer the questions people ask AI assistants about your business."
    },
    {
      question: "How long does it take to build an AI-optimized website?",
      answer: "Most websites are completed within 2-3 weeks. The timeline includes content creation, AI optimization setup, mobile responsiveness testing, and training your team on the new features."
    },
    {
      question: "Do you provide hosting and ongoing maintenance?",
      answer: "Yes! All packages include the first year of hosting, SSL certificates, and basic maintenance. We also provide training so you can update content yourself, plus ongoing support for any technical questions."
    },
    {
      question: "Will my website work well on mobile devices?",
      answer: "Absolutely! All our websites are built mobile-first, meaning they're designed to work perfectly on smartphones and tablets. Mobile optimization is crucial for both user experience and search rankings."
    },
    {
      question: "Can you integrate with my existing business systems?",
      answer: "Yes, we can integrate with most popular business systems including appointment scheduling, CRM platforms, e-commerce systems, and payment processors. We'll discuss your specific needs during the consultation."
    },
    {
      question: "What if I already have a website? Can you optimize it instead of building new?",
      answer: "We can evaluate your existing website, but often building new is more cost-effective than retrofitting old sites for AI optimization. We'll provide honest recommendations based on your current site's structure and your business goals."
    }
  ];

  const packages = [
    {
      name: "AI Starter Website",
      pages: "5 pages",
      price: "$1,200",
      description: "Perfect for small Houston businesses ready to embrace AI-powered web presence.",
      timeline: "2-3 weeks",
      includes: [
        "5 professionally designed pages",
        "AI-optimized content structure",
        "Voice search optimization",
        "Mobile-responsive design",
        "Basic chatbot integration",
        "Contact forms with automation",
        "Google Analytics setup",
        "First year hosting included",
        "SSL certificate",
        "Basic training session"
      ]
    },
    {
      name: "AI Professional Website",
      pages: "8 pages",
      price: "$1,800",
      description: "Comprehensive solution for growing businesses serious about AI marketing dominance.",
      timeline: "2-3 weeks",
      popular: true,
      includes: [
        "8 professionally designed pages",
        "Advanced AI content optimization",
        "Voice search and AI crawler optimization",
        "Advanced chatbot with FAQ automation",
        "Lead capture and nurturing system",
        "Social media integration",
        "Review management integration",
        "Advanced analytics and tracking",
        "Local SEO optimization",
        "First year hosting included",
        "SSL certificate",
        "Comprehensive training"
      ]
    },
    {
      name: "AI Complete Website",
      pages: "12+ pages",
      price: "$2,500",
      description: "Full-scale AI marketing website for businesses ready to dominate their Houston market.",
      timeline: "3-4 weeks",
      includes: [
        "12+ custom designed pages",
        "Full AI automation suite",
        "Advanced voice search optimization",
        "Intelligent chatbot with booking",
        "Marketing automation integration",
        "E-commerce capabilities (if needed)",
        "Advanced lead scoring system",
        "Multi-location optimization",
        "Competitor analysis integration",
        "First year hosting included",
        "SSL certificate",
        "Ongoing consultation included"
      ]
    }
  ];

  const features = [
    {
      icon: Mic,
      title: "Voice Search Optimized",
      description: "Structured for how people actually speak to AI assistants and voice search devices."
    },
    {
      icon: MessageCircle,
      title: "AI Chatbot Integration",
      description: "Automated customer service that works 24/7 to capture leads and answer questions."
    },
    {
      icon: Search,
      title: "AI Crawler Friendly",
      description: "Built to be easily understood and indexed by Google's AI and other search engines."
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Optimized for mobile devices where most of your Houston customers will find you."
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Strategy & Planning",
      description: "We analyze your business, competitors, and Houston market to create an AI-optimized website strategy."
    },
    {
      step: "2", 
      title: "Design & Development",
      description: "Our team builds your custom website with AI optimization, mobile responsiveness, and modern design."
    },
    {
      step: "3",
      title: "Content & Optimization", 
      description: "We create AI-friendly content and implement advanced optimization for voice search and automation."
    },
    {
      step: "4",
      title: "Launch & Training",
      description: "We launch your website, set up hosting, and train your team on managing your new AI-powered presence."
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
                  Websites Built for the{" "}
                  <span className="gradient-text">AI Search Era</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="hero-subtitle">
                  Transform your Houston business with a website designed for voice search, AI assistants, and automated customer interactions. Get found, get leads, and grow faster with AI-optimized web design.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button asChild size="lg" className="text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200" data-testid="button-get-started">
                    <a href="#contact">Get Your AI Website</a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 hover:bg-muted/50 transition-all duration-200" data-testid="button-learn-more">
                    <a href="#packages">View Packages</a>
                  </Button>
                </div>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    2-3 weeks delivery
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Hosting included
                  </div>
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 mr-2" />
                    AI-optimized
                  </div>
                </div>
              </AnimatedSection>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-5">
              <AnimatedSection>
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Modern AI-optimized website design on multiple devices" 
                  className="rounded-2xl shadow-2xl w-full hover-lift" 
                  data-testid="hero-image"
                />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="features-title">
                Why AI-Optimized Websites Outperform Traditional Sites
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="features-subtitle">
                Built for the future of search, designed for today's Houston business owners who want to stay ahead of the competition.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={index} className="text-center">
                <Card className="shadow-sm h-full hover-lift" data-testid={`feature-card-${index}`}>
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <feature.icon className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold text-card-foreground mb-4" data-testid={`feature-title-${index}`}>
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" data-testid={`feature-description-${index}`}>
                      {feature.description}
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
                Choose Your AI Website Package
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="packages-subtitle">
                From starter websites to comprehensive AI marketing platforms, we have the perfect solution for your Houston business.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <AnimatedSection key={index} className="hover-lift">
                <Card className={`h-full shadow-sm relative overflow-hidden ${pkg.popular ? 'border-2 border-secondary' : ''}`} data-testid={`package-card-${index}`}>
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground px-4 py-2 text-sm font-semibold" data-testid="badge-popular">
                      Most Popular
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                      <Globe className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-2xl font-bold text-card-foreground mb-2" data-testid={`package-name-${index}`}>
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{pkg.pages}</p>
                    <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`package-description-${index}`}>
                      {pkg.description}
                    </p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-secondary" data-testid={`package-price-${index}`}>
                        {pkg.price}
                      </span>
                      <div className="text-sm text-muted-foreground mt-1">
                        Delivery: {pkg.timeline}
                      </div>
                    </div>
                    <div className="space-y-3 mb-8">
                      {pkg.includes.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-card-foreground text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                    <Button asChild variant={pkg.popular ? "default" : "secondary"} className="w-full" data-testid={`button-choose-${index}`}>
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
                Our AI Website Development Process
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="process-subtitle">
                From strategy to launch, we guide you through every step of creating your AI-optimized website.
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

      {/* Benefits Comparison */}
      <section className="py-20 demo-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="comparison-title">
                AI-Optimized vs Traditional Websites
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="comparison-subtitle">
                See why Houston businesses are choosing AI-optimized websites for better results.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <Card className="shadow-xl" data-testid="traditional-card">
                <CardContent className="p-8">
                  <div className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                      <Laptop className="w-6 h-6 mr-2" />
                      Traditional Websites
                    </h3>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li>• Built for desktop-first browsing</li>
                      <li>• Limited voice search optimization</li>
                      <li>• Basic contact forms</li>
                      <li>• Manual customer service required</li>
                      <li>• Standard SEO practices only</li>
                      <li>• Slower adaptation to search changes</li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">Yesterday's Technology</div>
                    <div className="text-sm text-muted-foreground">Missing modern search opportunities</div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection>
              <Card className="shadow-xl border-2 border-secondary" data-testid="ai-card">
                <CardContent className="p-8">
                  <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-secondary mb-4 flex items-center">
                      <Zap className="w-6 h-6 mr-2" />
                      AI-Optimized Websites
                    </h3>
                    <ul className="space-y-3 text-foreground">
                      <li>• Mobile-first, voice search optimized</li>
                      <li>• AI chatbots for 24/7 customer service</li>
                      <li>• Automated lead capture and nurturing</li>
                      <li>• Structured for AI crawler understanding</li>
                      <li>• Advanced analytics and insights</li>
                      <li>• Future-ready for search evolution</li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">Tomorrow's Technology</div>
                    <div className="text-sm text-muted-foreground">Built for the AI search era</div>
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
                Houston Businesses Love Their AI Websites
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="testimonials-subtitle">
                See how AI-optimized websites have transformed customer acquisition for local businesses.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection className="hover-lift">
              <Card className="shadow-sm h-full" data-testid="testimonial-card-1">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full mr-4 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center" data-testid="testimonial-avatar-1">
                      <span className="text-white font-semibold text-lg">HC</span>
                    </div>
                    <div>
                      <div className="font-semibold text-card-foreground" data-testid="testimonial-name-1">Beta Client</div>
                      <div className="text-sm text-muted-foreground" data-testid="testimonial-title-1">Healthcare Practice (Composite)</div>
                    </div>
                  </div>
                  <p className="text-card-foreground leading-relaxed mb-4" data-testid="testimonial-text-1">
                    "Based on beta testing feedback, healthcare practices commonly experience improved appointment booking efficiency when implementing AI chatbots. Clients typically report better patient communication and more organized scheduling systems within 60-90 days."
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
                    <div className="w-12 h-12 rounded-full mr-4 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center" data-testid="testimonial-avatar-2">
                      <span className="text-white font-semibold text-lg">RE</span>
                    </div>
                    <div>
                      <div className="font-semibold text-card-foreground" data-testid="testimonial-name-2">Industry Research</div>
                      <div className="text-sm text-muted-foreground" data-testid="testimonial-title-2">Real Estate Professional (Based on Studies)</div>
                    </div>
                  </div>
                  <p className="text-card-foreground leading-relaxed mb-4" data-testid="testimonial-text-2">
                    "Industry research shows real estate professionals commonly benefit from voice search optimization. Studies indicate that properly optimized listings typically gain better visibility for voice queries, often resulting in more qualified lead generation within 45-90 days."
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
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                      alt="Restaurant owner testimonial" 
                      className="w-12 h-12 rounded-full mr-4" 
                      data-testid="testimonial-avatar-3"
                    />
                    <div>
                      <div className="font-semibold text-card-foreground" data-testid="testimonial-name-3">Founder Experience</div>
                      <div className="text-sm text-muted-foreground" data-testid="testimonial-title-3">Restaurant Testing (Personal Account)</div>
                    </div>
                  </div>
                  <p className="text-card-foreground leading-relaxed mb-4" data-testid="testimonial-text-3">
                    "From personal testing experience, restaurant AI systems commonly help handle routine inquiries like menu questions and reservation requests outside business hours. This typically results in better customer service availability and improved operational efficiency."
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
                Get answers to common questions about AI-optimized websites.
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
                Ready for Your AI-Optimized Website?
              </h2>
              <p className="text-xl text-muted-foreground" data-testid="contact-subtitle">
                Get started today and position your Houston business for the future of search and customer engagement.
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
                            <Input type="tel" placeholder="(713) 555-0123" {...field} data-testid="input-phone" inputMode="tel" autoComplete="tel" />
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
                          <FormLabel>Tell us about your website needs</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Do you currently have a website? What are your main goals for the new site? Any specific features you need?"
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
                      {contactMutation.isPending ? "Submitting..." : "Start My AI Website Project"}
                    </Button>
                  </form>
                </Form>

                <div className="mt-8 pt-8 border-t border-border text-center">
                  <p className="text-muted-foreground mb-4">
                    Ready to discuss your project? Contact us directly:
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

    </div>
  );
}