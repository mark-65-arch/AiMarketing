import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  BookOpen, 
  CheckCircle, 
  Download, 
  Star, 
  TrendingUp, 
  Target, 
  Users, 
  Clock,
  Zap,
  Shield,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import logoWide from "@assets/Logo 3_1756914281767.png";

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

export default function HoustonBusinessAIGuide() {
  const guideBenefits = [
    "Complete beginner's guide to AI marketing for Houston businesses",
    "Step-by-step instructions for implementing ChatGPT in your business",
    "Houston-specific marketing strategies and local SEO tactics",
    "20+ AI tools every Houston business should use (with setup guides)",
    "Real case studies from successful Houston businesses",
    "Legal and ethical considerations for AI marketing in Texas",
    "Industry-specific AI strategies (restaurants, retail, services, etc.)",
    "30-day implementation checklist with measurable milestones",
    "Template scripts and prompts for immediate use",
    "Cost analysis and ROI calculations for AI marketing investments"
  ];

  const chapters = [
    {
      number: "01",
      title: "AI Marketing Fundamentals",
      description: "Understanding AI marketing basics and how it applies to Houston businesses"
    },
    {
      number: "02", 
      title: "Houston Market Analysis",
      description: "Local market insights and AI opportunities specific to Houston"
    },
    {
      number: "03",
      title: "Essential AI Tools Setup",
      description: "Complete setup guide for ChatGPT, automation tools, and more"
    },
    {
      number: "04",
      title: "Content Creation with AI",
      description: "Generate high-converting content for social media, ads, and websites"
    },
    {
      number: "05",
      title: "Local SEO Domination",
      description: "AI-powered strategies to rank #1 in Houston search results"
    },
    {
      number: "06",
      title: "Customer Service Automation",
      description: "Implement chatbots and automated responses that increase sales"
    },
    {
      number: "07",
      title: "Industry-Specific Strategies",
      description: "Customized AI approaches for restaurants, retail, services, and more"
    },
    {
      number: "08",
      title: "Measuring Success",
      description: "Track ROI and optimize your AI marketing for maximum results"
    }
  ];

  const testimonials = [
    {
      name: "Carlos Mendoza",
      business: "Mendoza Construction",
      location: "Katy, TX",
      quote: "This guide was a game-changer! We implemented the AI strategies and got 5x more leads in just 6 weeks. Worth every penny!",
      rating: 5
    },
    {
      name: "Jennifer Park",
      business: "Park's Beauty Salon",
      location: "Memorial, Houston", 
      quote: "As a small business owner, I was intimidated by AI. This guide made it so simple! Our appointment bookings doubled.",
      rating: 5
    },
    {
      name: "Michael Thompson",
      business: "Thompson HVAC Services",
      location: "Sugar Land",
      quote: "The Houston-specific strategies were exactly what we needed. Our Google ranking went from page 3 to #1!",
      rating: 5
    }
  ];

  const stats = [
    { number: "87 Pages", label: "Comprehensive Guide" },
    { number: "20+", label: "AI Tools Covered" },
    { number: "50+", label: "Houston Case Studies" },
    { number: "$10,000+", label: "Value Packed" }
  ];

  const bonuses = [
    {
      title: "BONUS #1: AI Prompt Library",
      description: "100+ proven ChatGPT prompts for marketing, customer service, and content creation",
      value: "$297"
    },
    {
      title: "BONUS #2: Houston Business Directory",
      description: "Curated list of Houston-specific resources, networking groups, and marketing opportunities",
      value: "$197"
    },
    {
      title: "BONUS #3: Video Tutorial Series",
      description: "Step-by-step video walkthroughs for setting up each AI tool mentioned in the guide",
      value: "$497"
    },
    {
      title: "BONUS #4: Implementation Checklist",
      description: "30-day action plan with daily tasks to implement AI marketing in your business",
      value: "$197"
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
                <a href="/about" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-about">About</a>
                <a href="/contact" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-contact">Contact</a>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium" data-testid="nav-cta">
                  <a href="#guide-form">Download Guide</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-accent/10 via-background to-primary/10 pt-20 lg:pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="lg:col-span-7">
              <AnimatedSection>
                <div className="inline-flex items-center bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Zap className="w-4 h-4 mr-2" />
                  FREE DOWNLOAD - Limited Time Only
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" data-testid="hero-title">
                  The Complete{" "}
                  <span className="gradient-text">Houston Business Owner's Guide</span>{" "}
                  to AI Marketing
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="hero-subtitle">
                  87-page comprehensive guide showing exactly how to implement AI marketing in your Houston business. Includes tools, strategies, case studies, and step-by-step tutorials worth over $10,000.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                    onClick={() => document.getElementById('guide-form')?.scrollIntoView({ behavior: 'smooth' })}
                    data-testid="button-download-guide"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download FREE Guide
                  </Button>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 mr-2 text-primary" />
                    Instant download • No spam • Always free
                  </div>
                </div>
                
                {/* Trust Indicators */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center" data-testid={`stat-${index}`}>
                      <div className="text-2xl font-bold text-primary">{stat.number}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            <div className="mt-12 lg:mt-0 lg:col-span-5">
              <AnimatedSection>
                <Card className="shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2" data-testid="guide-preview">
                  <CardContent className="p-8 text-center">
                    <div className="w-32 h-40 bg-gradient-to-br from-primary to-accent rounded-lg mx-auto mb-6 flex items-center justify-center shadow-lg">
                      <BookOpen className="w-16 h-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">87-Page Guide</h3>
                    <p className="text-muted-foreground mb-4">Complete AI Marketing Playbook</p>
                    <div className="text-3xl font-bold text-primary mb-2">FREE</div>
                    <div className="text-sm text-muted-foreground line-through">Usually $497</div>
                    <Button className="w-full mt-4" onClick={() => document.getElementById('guide-form')?.scrollIntoView({ behavior: 'smooth' })} data-testid="button-preview-download">
                      Download Now
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="chapters-title">
                What's Inside This Comprehensive Guide
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="chapters-subtitle">
                8 detailed chapters covering everything you need to dominate Houston with AI marketing
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {chapters.map((chapter, index) => (
              <AnimatedSection key={index} className="hover-lift">
                <Card className="h-full shadow-sm hover:shadow-lg transition-all duration-300" data-testid={`chapter-card-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mr-4 mt-1">
                        <span className="text-primary font-bold text-lg">{chapter.number}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-2" data-testid={`chapter-title-${index}`}>
                          {chapter.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed" data-testid={`chapter-description-${index}`}>
                          {chapter.description}
                        </p>
                        <div className="flex items-center text-primary text-sm font-medium mt-3">
                          <span>Read Chapter</span>
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bonuses Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="bonuses-title">
                Plus These Exclusive Bonuses (Worth $1,188)
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="bonuses-subtitle">
                Everything you need to implement AI marketing immediately
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {bonuses.map((bonus, index) => (
              <AnimatedSection key={index} className="hover-lift">
                <Card className="h-full shadow-sm border-2 border-accent/20" data-testid={`bonus-card-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                        BONUS
                      </span>
                      <span className="text-2xl font-bold text-primary">{bonus.value}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3" data-testid={`bonus-title-${index}`}>
                      {bonus.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" data-testid={`bonus-description-${index}`}>
                      {bonus.description}
                    </p>
                    <div className="flex items-center text-accent text-sm font-medium mt-4">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>Included FREE</span>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="testimonials-title">
                Houston Business Owners Love This Guide
              </h2>
              <p className="text-xl text-muted-foreground" data-testid="testimonials-subtitle">
                Join thousands who have transformed their marketing with AI
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} className="hover-lift">
                <Card className="h-full shadow-sm" data-testid={`testimonial-card-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-foreground mb-6 leading-relaxed" data-testid={`testimonial-quote-${index}`}>
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <div className="font-semibold text-foreground" data-testid={`testimonial-name-${index}`}>
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground" data-testid={`testimonial-business-${index}`}>
                        {testimonial.business}
                      </div>
                      <div className="text-xs text-muted-foreground" data-testid={`testimonial-location-${index}`}>
                        {testimonial.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="guide-form" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <AnimatedSection>
              <div className="inline-flex items-center bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Clock className="w-4 h-4 mr-2" />
                Download in 30 seconds • Always FREE
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="form-section-title">
                Download Your Free Guide Now
              </h2>
              <p className="text-xl text-muted-foreground" data-testid="form-section-subtitle">
                Get instant access to the complete 87-page guide + $1,188 in bonuses
              </p>
            </AnimatedSection>
          </div>

          <LeadMagnetForm
            leadMagnetType="guide"
            title="Download The Complete Houston Business AI Marketing Guide"
            subtitle="Get the 87-page guide + exclusive bonuses delivered instantly to your inbox"
            benefits={guideBenefits}
            onSuccess={() => {
              // Redirect to thank you page
              window.location.href = '/thank-you?type=guide';
            }}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="cta-title">
              Your Competitors Are Already Using AI
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto" data-testid="cta-subtitle">
              Don't get left behind. Download this comprehensive guide and start dominating your Houston market with AI marketing today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                onClick={() => document.getElementById('guide-form')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-final-cta"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Get My Free Guide Now
              </Button>
              <div className="text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 inline mr-1 text-primary" />
                87 pages + bonuses • Instant download
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}