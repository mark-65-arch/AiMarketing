import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  CheckSquare, 
  CheckCircle, 
  Download, 
  Star, 
  Zap,
  Shield,
  Clock,
  Wrench,
  TrendingUp,
  DollarSign
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

export default function AIToolsChecklist() {
  const checklistBenefits = [
    "25 hand-picked AI tools specifically tested for Houston businesses",
    "Setup instructions and pricing for each tool",
    "Priority ranking based on impact vs. cost",
    "Industry-specific tool recommendations",
    "Integration guides for connecting tools together",
    "Cost-saving alternatives to expensive solutions", 
    "Free vs. paid tool comparisons",
    "Implementation timeline and order of adoption",
    "ROI calculations for each tool category",
    "Troubleshooting guides and support resources"
  ];

  const toolCategories = [
    {
      category: "Content Creation",
      tools: ["ChatGPT Plus", "Copy.ai", "Jasper", "Canva AI", "Midjourney"],
      description: "Create compelling content for social media, websites, and ads",
      icon: <CheckSquare className="w-6 h-6" />
    },
    {
      category: "Customer Service",
      tools: ["Intercom", "Tidio", "ManyChat", "Chatfuel", "Zendesk AI"],
      description: "Automate customer support and increase satisfaction",
      icon: <CheckSquare className="w-6 h-6" />
    },
    {
      category: "Local SEO",
      tools: ["BrightLocal", "Moz Local", "Whitespark", "LocalFalcon", "SEMrush"],
      description: "Dominate Houston search results and Google Maps",
      icon: <CheckSquare className="w-6 h-6" />
    },
    {
      category: "Social Media",
      tools: ["Buffer", "Hootsuite AI", "Later", "Sprout Social", "SocialBee"],
      description: "Schedule and optimize social media posts automatically",
      icon: <CheckSquare className="w-6 h-6" />
    },
    {
      category: "Email Marketing",
      tools: ["Mailchimp", "ConvertKit", "ActiveCampaign", "Klaviyo", "GetResponse"],
      description: "Personalized email campaigns that convert",
      icon: <CheckSquare className="w-6 h-6" />
    }
  ];

  const testimonials = [
    {
      name: "Roberto Silva",
      business: "Silva's Auto Repair",
      location: "East Houston",
      quote: "This checklist saved me months of research! I implemented 5 tools and saw a 250% increase in appointments.",
      rating: 5
    },
    {
      name: "Lisa Chen",
      business: "Chen's Fitness Studio",
      location: "The Woodlands",
      quote: "The cost-saving alternatives alone saved me $2,000 per month. The ROI was immediate!",
      rating: 5
    },
    {
      name: "David Rodriguez",
      business: "Rodriguez Plumbing",
      location: "Southwest Houston", 
      quote: "Finally, a practical list that works for small businesses. We're booking 3x more jobs now.",
      rating: 5
    }
  ];

  const stats = [
    { number: "25", label: "Essential AI Tools" },
    { number: "5", label: "Tool Categories" },
    { number: "$5,000", label: "Monthly Savings Potential" },
    { number: "30 Days", label: "Implementation Timeline" }
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
                  <a href="#checklist-form">Get Checklist</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 pt-20 lg:pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <AnimatedSection>
              <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                FREE DOWNLOAD - Save $5,000+ Monthly
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" data-testid="hero-title">
                25 Essential{" "}
                <span className="gradient-text">AI Tools</span>{" "}
                Every Houston Business Should Use
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto" data-testid="hero-subtitle">
                Stop wasting time and money on the wrong tools. Get our hand-picked checklist of 25 AI tools that will transform your Houston business and save you thousands every month.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                  onClick={() => document.getElementById('checklist-form')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="button-get-checklist"
                >
                  <CheckSquare className="w-5 h-5 mr-2" />
                  Get My FREE Checklist
                </Button>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 mr-2 text-primary" />
                  Instant download • No spam • Always updated
                </div>
              </div>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center" data-testid={`stat-${index}`}>
                    <div className="text-2xl md:text-3xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Tool Categories Preview */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="categories-title">
                5 Essential Categories Covered
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="categories-subtitle">
                Complete coverage of every AI tool your Houston business needs to succeed
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-1 gap-8">
            {toolCategories.map((category, index) => (
              <AnimatedSection key={index} className="hover-lift">
                <Card className="shadow-sm" data-testid={`category-card-${index}`}>
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-6 mt-1">
                          <div className="text-primary">{category.icon}</div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-foreground mb-3" data-testid={`category-title-${index}`}>
                            {category.category}
                          </h3>
                          <p className="text-muted-foreground mb-4 text-lg leading-relaxed" data-testid={`category-description-${index}`}>
                            {category.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {category.tools.map((tool, toolIndex) => (
                              <span key={toolIndex} className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          {category.tools.length} Tools
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

      {/* What You Get */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="benefits-title">
                What's Included in Your AI Tools Checklist
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="benefits-subtitle">
                Everything you need to implement AI tools successfully in your Houston business
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {checklistBenefits.map((benefit, index) => (
              <AnimatedSection key={index} className="hover-lift">
                <Card className="h-full shadow-sm" data-testid={`benefit-card-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 mt-1">
                        <CheckCircle className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-foreground font-medium leading-relaxed" data-testid={`benefit-text-${index}`}>
                          {benefit}
                        </p>
                      </div>
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
                Houston Businesses Are Saving Thousands
              </h2>
              <p className="text-xl text-muted-foreground" data-testid="testimonials-subtitle">
                See how other Houston business owners used this checklist to transform their operations
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
      <section id="checklist-form" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <AnimatedSection>
              <div className="inline-flex items-center bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Clock className="w-4 h-4 mr-2" />
                Download in 30 seconds • Save $5,000+ monthly
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="form-section-title">
                Get Your Free AI Tools Checklist
              </h2>
              <p className="text-xl text-muted-foreground" data-testid="form-section-subtitle">
                25 hand-picked tools + setup guides delivered instantly to your inbox
              </p>
            </AnimatedSection>
          </div>

          <LeadMagnetForm
            leadMagnetType="checklist"
            title="Download Your Free AI Tools Checklist"
            subtitle="Get 25 essential AI tools that will save you $5,000+ monthly and 20+ hours per week"
            benefits={checklistBenefits}
            onSuccess={() => {
              // Redirect to thank you page
              window.location.href = '/thank-you?type=checklist';
            }}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="cta-title">
              Stop Wasting Money on the Wrong Tools
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto" data-testid="cta-subtitle">
              Get our proven checklist of 25 AI tools that actually work for Houston businesses. Start saving money and time today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                onClick={() => document.getElementById('checklist-form')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-final-cta"
              >
                <Wrench className="w-5 h-5 mr-2" />
                Get My Free Checklist Now
              </Button>
              <div className="text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 inline mr-1 text-primary" />
                25 tools • Setup guides • Cost comparisons
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}