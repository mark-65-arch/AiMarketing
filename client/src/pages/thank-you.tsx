import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { 
  CheckCircle, 
  Download, 
  Star, 
  Calendar, 
  Phone, 
  Mail,
  ArrowRight,
  BookOpen,
  Calculator,
  CheckSquare,
  BrainCircuit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

export default function ThankYou() {
  const [leadMagnetType, setLeadMagnetType] = useState("");

  useEffect(() => {
    // Get the type from URL query params
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type') || 'general';
    setLeadMagnetType(type);
  }, []);

  const getContentByType = (type: string) => {
    switch (type) {
      case 'audit':
        return {
          icon: <BrainCircuit className="w-16 h-16 text-primary" />,
          title: "Your FREE AI Marketing Audit is On Its Way!",
          subtitle: "Check your email for your personalized audit report",
          description: "We've sent your comprehensive AI marketing audit to your inbox. You'll receive a detailed analysis of your current marketing strategy and personalized recommendations for implementing AI in your Houston business.",
          nextSteps: [
            "Check your email (including spam folder) for your audit report",
            "Review the personalized recommendations for your business",
            "Schedule your free consultation call to discuss implementation",
            "Start with the highest-impact recommendations first"
          ]
        };
      case 'guide':
        return {
          icon: <BookOpen className="w-16 h-16 text-primary" />,
          title: "Your Houston Business AI Guide is Ready!",
          subtitle: "87 pages of AI marketing secrets delivered to your inbox",
          description: "Your complete Houston Business Owner's Guide to AI Marketing is now in your email, along with all the exclusive bonuses worth $1,188. This comprehensive resource will transform how you approach marketing.",
          nextSteps: [
            "Download the 87-page guide from your email",
            "Start with Chapter 1: AI Marketing Fundamentals",
            "Set up your first AI tool using our step-by-step instructions",
            "Join our Marketing AI Houston community for ongoing support"
          ]
        };
      case 'checklist':
        return {
          icon: <CheckSquare className="w-16 h-16 text-primary" />,
          title: "Your AI Tools Checklist is Here!",
          subtitle: "25 essential AI tools to transform your business",
          description: "Your hand-picked checklist of 25 AI tools is now in your inbox. Each tool has been tested specifically for Houston businesses, with setup guides and cost-saving alternatives included.",
          nextSteps: [
            "Download your checklist and setup guides",
            "Start with the 'Quick Wins' section for immediate impact",
            "Implement tools in the recommended priority order",
            "Track your time and cost savings as you implement each tool"
          ]
        };
      case 'calendar':
        return {
          icon: <Calendar className="w-16 h-16 text-primary" />,
          title: "Your 30-Day AI Transformation Starts Today!",
          subtitle: "Your step-by-step implementation calendar is ready",
          description: "Your 30-Day AI Marketing Implementation Calendar is in your email, complete with daily tasks, weekly milestones, and printable versions. Follow this proven system for guaranteed results.",
          nextSteps: [
            "Print your calendar and put it somewhere visible",
            "Complete Day 1 task today (takes only 15 minutes)",
            "Set daily reminders to stay on track",
            "Join our accountability group for extra support"
          ]
        };
      case 'calculator':
        return {
          icon: <Calculator className="w-16 h-16 text-primary" />,
          title: "Your Personalized AI ROI Report is Ready!",
          subtitle: "See exactly how AI will impact your bottom line",
          description: "Your custom AI Marketing ROI Report is in your inbox with projections based on your specific business numbers. This detailed analysis shows your potential revenue increase, time savings, and implementation costs.",
          nextSteps: [
            "Review your personalized ROI projections",
            "Identify the highest-impact AI implementations first",
            "Use the cost-benefit analysis to plan your budget",
            "Schedule a strategy call to discuss your specific results"
          ]
        };
      default:
        return {
          icon: <CheckCircle className="w-16 h-16 text-primary" />,
          title: "Thank You for Your Interest!",
          subtitle: "We'll be in touch soon",
          description: "Thank you for reaching out to Marketing AI Houston. We've received your information and will follow up with you soon with valuable AI marketing insights for your business.",
          nextSteps: [
            "Check your email for confirmation",
            "Follow us on social media for daily AI tips",
            "Browse our other free resources below",
            "Schedule a consultation when you're ready to get started"
          ]
        };
    }
  };

  const content = getContentByType(leadMagnetType);

  const nextActions = [
    {
      title: "Schedule Your Free Consultation",
      description: "Get personalized advice for implementing AI in your specific business",
      action: "Book Now",
      href: "/contact",
      icon: <Phone className="w-5 h-5" />
    },
    {
      title: "Join Our AI Marketing Community",
      description: "Connect with other Houston business owners using AI marketing",
      action: "Join Now",
      href: "#",
      icon: <Star className="w-5 h-5" />
    },
    {
      title: "Explore Our Other Resources",
      description: "Download additional free tools and guides for your business",
      action: "Browse",
      href: "/ai-tools",
      icon: <ArrowRight className="w-5 h-5" />
    }
  ];

  const otherLeadMagnets = [
    {
      title: "Free AI Marketing Audit",
      description: "Get a personalized analysis of your current marketing",
      href: "/free-ai-marketing-audit",
      icon: <BrainCircuit className="w-6 h-6" />
    },
    {
      title: "Marketing AI Houston Guide",
      description: "87-page comprehensive guide to AI marketing",
      href: "/houston-business-ai-guide",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: "AI Tools Checklist",
      description: "25 essential AI tools every business should use",
      href: "/ai-tools-checklist",
      icon: <CheckSquare className="w-6 h-6" />
    },
    {
      title: "30-Day Implementation Calendar",
      description: "Step-by-step plan to implement AI in your business",
      href: "/30-day-ai-calendar",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      title: "AI ROI Calculator",
      description: "Calculate your potential return on AI investments",
      href: "/ai-roi-calculator",
      icon: <Calculator className="w-6 h-6" />
    }
  ].filter(item => !item.href.includes(leadMagnetType)); // Remove the current lead magnet

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
                  <a href="/contact">Get Started</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Success Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-20 lg:pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              {content.icon}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6" data-testid="success-title">
              {content.title}
            </h1>
            <p className="text-xl text-primary mb-4" data-testid="success-subtitle">
              {content.subtitle}
            </p>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto" data-testid="success-description">
              {content.description}
            </p>

            <div className="inline-flex items-center bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-8">
              <Mail className="w-4 h-4 mr-2" />
              Check your email inbox (and spam folder) now!
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="next-steps-title">
                What Happens Next?
              </h2>
              <p className="text-xl text-muted-foreground" data-testid="next-steps-subtitle">
                Here's your step-by-step action plan
              </p>
            </AnimatedSection>
          </div>

          <AnimatedSection>
            <Card className="shadow-lg" data-testid="next-steps-card">
              <CardContent className="p-8">
                <ol className="space-y-6">
                  {content.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start" data-testid={`next-step-${index}`}>
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mr-4 mt-1 text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground leading-relaxed">{step}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Next Actions */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="actions-title">
                Ready to Take the Next Step?
              </h2>
              <p className="text-xl text-muted-foreground" data-testid="actions-subtitle">
                Here are some ways we can help you implement AI marketing right now
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {nextActions.map((action, index) => (
              <AnimatedSection key={index} className="hover-lift">
                <Card className="h-full shadow-sm text-center" data-testid={`action-card-${index}`}>
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <div className="text-primary">{action.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3" data-testid={`action-title-${index}`}>
                      {action.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`action-description-${index}`}>
                      {action.description}
                    </p>
                    <Button asChild className="w-full" data-testid={`action-button-${index}`}>
                      <a href={action.href}>{action.action}</a>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Other Resources */}
      {otherLeadMagnets.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="resources-title">
                  Get Even More Free Resources
                </h2>
                <p className="text-xl text-muted-foreground" data-testid="resources-subtitle">
                  Download our other free AI marketing tools and guides
                </p>
              </AnimatedSection>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherLeadMagnets.slice(0, 4).map((resource, index) => (
                <AnimatedSection key={index} className="hover-lift">
                  <Card className="h-full shadow-sm" data-testid={`resource-card-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 mt-1">
                          <div className="text-primary">{resource.icon}</div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground mb-2" data-testid={`resource-title-${index}`}>
                            {resource.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 leading-relaxed" data-testid={`resource-description-${index}`}>
                            {resource.description}
                          </p>
                          <Button asChild variant="outline" size="sm" data-testid={`resource-button-${index}`}>
                            <a href={resource.href} className="text-sm">
                              Download Free
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="contact-cta-title">
              Questions? We're Here to Help!
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="contact-cta-description">
              Have questions about implementing AI in your Houston business? Our team is here to provide personalized guidance and support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="text-lg px-8 py-4" data-testid="button-contact-us">
                <a href="/contact">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Us
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4" data-testid="button-browse-resources">
                <a href="/ai-tools">
                  <Download className="w-5 h-5 mr-2" />
                  Browse All Resources
                </a>
              </Button>
            </div>
            
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>
                <Phone className="w-4 h-4 inline mr-2" />
                Call us: (713) 555-0123 • 
                <Mail className="w-4 h-4 inline mx-2" />
                Email: info@marketingaihouston.com
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}