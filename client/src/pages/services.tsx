import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  CheckCircle, 
  Clock, 
  Target, 
  TrendingUp,
  Globe,
  Search,
  BarChart3,
  ArrowRight,
  Users,
  Zap
} from "lucide-react";
import logoWide from "@assets/Logo3-ezgif.com-optipng_1756914512078.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

export default function Services() {
  const services = [
    {
      title: "Google Business AI Domination",
      price: "$800-1,200",
      timeline: "2-3 weeks",
      href: "/business-profile",
      icon: <Search className="w-8 h-8 text-primary" />,
      description: "Transform your Google Business Profile into a customer-generating machine with AI optimization.",
      features: [
        "AI-powered review response automation",
        "Smart keyword optimization for local search",
        "Automated post scheduling and content creation",
        "Local SEO optimization with AI insights",
        "Performance tracking and analytics setup"
      ],
      bestFor: "Local businesses wanting to dominate Google search results"
    },
    {
      title: "AI Marketing System Setup",
      price: "$1,500-2,500",
      timeline: "3-4 weeks",
      href: "/ai-training",
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      description: "Complete AI marketing automation system tailored to your Houston business needs.",
      features: [
        "Custom AI chatbot for lead qualification",
        "Automated email marketing sequences",
        "Social media content automation",
        "Customer journey mapping and optimization",
        "Staff training on AI tools and systems"
      ],
      bestFor: "Growing businesses ready to scale with automation",
      popular: true
    },
    {
      title: "Website + AI Optimization",
      price: "$2,500-5,000",
      timeline: "4-6 weeks",
      href: "/ai-websites",
      icon: <Globe className="w-8 h-8 text-primary" />,
      description: "Complete website redesign with integrated AI features for maximum conversion.",
      features: [
        "Modern, mobile-responsive website design",
        "AI-powered chatbot integration",
        "Smart contact forms with lead scoring",
        "SEO optimization with AI content",
        "Analytics and conversion tracking setup"
      ],
      bestFor: "Businesses needing a complete online presence overhaul"
    }
  ];

  const timeline = [
    { step: 1, title: "Discovery Call", duration: "1 week", description: "Understand your business goals and current challenges" },
    { step: 2, title: "Strategy & Setup", duration: "2-4 weeks", description: "Build and configure your AI marketing systems" },
    { step: 3, title: "Training & Launch", duration: "1 week", description: "Train your team and launch your new systems" },
    { step: 4, title: "Ongoing Support", duration: "Lifetime", description: "You own the system - we provide support when needed" }
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
                <a href="/services" className="text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-services">Services</a>
                <a href="/about" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-about">About</a>
                <a href="/assessment" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-assessment">Assessment</a>
                <a href="/contact" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-contact">Contact</a>
                <a href="/contact" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg" data-testid="nav-cta">Get Started</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-muted/30 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AnimatedSection>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" data-testid="hero-title">
                Professional AI Marketing{" "}
                <span className="gradient-text">Projects for Houston Businesses</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-4xl mx-auto" data-testid="hero-subtitle">
                Choose your project package. One-time setup, lifetime ownership, no monthly fees.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200" data-testid="button-get-assessment">
                  <a href="/assessment">
                    <Target className="w-5 h-5 mr-2" />
                    Take Free Assessment
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 hover:bg-muted/50 transition-all duration-200" data-testid="button-contact">
                  <a href="/contact">Schedule Consultation</a>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="services-title">
                Choose Your AI Marketing Project
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="services-subtitle">
                Each package is designed to deliver specific results for Houston businesses at different growth stages.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={index} className="hover-lift">
                <Card className={`h-full shadow-lg relative ${service.popular ? 'border-primary/50 shadow-primary/10' : ''}`} data-testid={`service-card-${index}`}>
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-3 py-1">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-card-foreground mb-2" data-testid={`service-title-${index}`}>
                      {service.title}
                    </CardTitle>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-primary">{service.price}</div>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.timeline}
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed" data-testid={`service-description-${index}`}>
                      {service.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                      <div className="text-xs font-semibold text-muted-foreground mb-1">BEST FOR:</div>
                      <div className="text-sm text-foreground">{service.bestFor}</div>
                    </div>
                    <Button asChild className="w-full" data-testid={`service-button-${index}`}>
                      <a href={service.href}>
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Project Timeline */}
      <section className="py-20 demo-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="timeline-title">
                How Our Projects Work
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="timeline-subtitle">
                Every project follows our proven process to ensure you get results and own your systems.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {timeline.map((phase, index) => (
              <AnimatedSection key={index} className="text-center">
                <Card className="h-full shadow-sm" data-testid={`timeline-card-${index}`}>
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">{phase.step}</span>
                    </div>
                    <h3 className="text-lg font-bold text-card-foreground mb-2" data-testid={`timeline-title-${index}`}>
                      {phase.title}
                    </h3>
                    <div className="text-sm text-primary font-semibold mb-3">{phase.duration}</div>
                    <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`timeline-description-${index}`}>
                      {phase.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment CTA */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-8">
              <Target className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="assessment-cta-title">
                Not Sure Which Package Is Right for You?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="assessment-cta-description">
                Take our free 3-minute assessment to discover which AI marketing project will deliver the biggest impact for your Houston business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200" data-testid="button-take-assessment">
                  <a href="/assessment">
                    <Zap className="w-5 h-5 mr-2" />
                    Take Free Assessment
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 hover:bg-muted/50 transition-all duration-200" data-testid="button-schedule-call">
                  <a href="/contact">
                    <Users className="w-5 h-5 mr-2" />
                    Schedule Strategy Call
                  </a>
                </Button>
              </div>
              <div className="mt-6 text-sm text-muted-foreground">
                <strong>No obligation</strong> • Get personalized recommendations in minutes
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}