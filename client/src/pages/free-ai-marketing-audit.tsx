import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { 
  BrainCircuit, 
  CheckCircle, 
  Clock, 
  Star, 
  TrendingUp, 
  Target, 
  Users, 
  DollarSign,
  Zap,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import logoWide from "@assets/Logo3_1756847446520.png";

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

export default function FreeAIMarketingAudit() {
  const [showForm, setShowForm] = useState(false);

  const auditBenefits = [
    "Complete analysis of your current digital marketing strategy",
    "Personalized AI implementation roadmap for your Houston business",
    "Specific recommendations to increase leads by 200-400%",
    "Time-saving automation opportunities worth $2,000+ per month",
    "Local SEO optimization strategies for Houston market dominance",
    "Competitive analysis showing what your competitors are missing",
    "Custom AI tool recommendations for your industry",
    "30-day action plan with priority implementation steps"
  ];

  const testimonials = [
    {
      name: "Maria Rodriguez",
      business: "Rodriguez Family Restaurant",
      location: "Heights, Houston",
      quote: "The AI audit completely transformed our marketing! We went from 20 customers a day to 80+ in just 2 months.",
      rating: 5
    },
    {
      name: "Dr. James Chen",
      business: "Chen Dental Practice",
      location: "Sugar Land",
      quote: "Our patient bookings increased 300% after implementing their AI recommendations. Best investment we ever made!",
      rating: 5
    },
    {
      name: "Sarah Williams",
      business: "Williams Law Firm",
      location: "Downtown Houston",
      quote: "The personalized audit saved us 20+ hours per week and brought in $50,000 in new clients in 60 days.",
      rating: 5
    }
  ];

  const auditProcess = [
    {
      step: 1,
      title: "Submit Your Info",
      description: "Tell us about your business goals and current marketing challenges",
      icon: <Target className="w-6 h-6" />
    },
    {
      step: 2,
      title: "Deep Analysis",
      description: "Our AI experts analyze your online presence, competitors, and market opportunities",
      icon: <BrainCircuit className="w-6 h-6" />
    },
    {
      step: 3,
      title: "Custom Report",
      description: "Receive a detailed audit report with specific AI solutions for your Houston business",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      step: 4,
      title: "Strategy Call",
      description: "30-minute consultation to discuss your results and implementation plan",
      icon: <Users className="w-6 h-6" />
    }
  ];

  const stats = [
    { number: "200-400%", label: "Average Lead Increase" },
    { number: "20+", label: "Hours Saved Weekly" },
    { number: "72%", label: "Faster Customer Response" },
    { number: "$2,000+", label: "Monthly Cost Savings" }
  ];

  const AdditionalFields = () => (
    <FormField
      name="additionalInfo"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Current Marketing Challenges (Optional)</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Tell us about your biggest marketing challenges or what you'd like to improve..."
              className="min-h-[100px]"
              {...field}
              data-testid="textarea-challenges"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );

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
                  <a href="#audit-form">Get Free Audit</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 pt-20 lg:pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <AnimatedSection>
              <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                LIMITED TIME: Completely FREE (Usually $500)
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" data-testid="hero-title">
                Get Your FREE{" "}
                <span className="gradient-text">AI Marketing Audit</span>{" "}
                for Your Houston Business
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto" data-testid="hero-subtitle">
                Discover exactly how AI can transform your marketing, increase your leads by 200-400%, and save you 20+ hours per week. Get a personalized roadmap created specifically for your Houston business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                  onClick={() => setShowForm(true)}
                  data-testid="button-get-audit"
                >
                  <BrainCircuit className="w-5 h-5 mr-2" />
                  Get My FREE $500 Audit
                </Button>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 mr-2 text-primary" />
                  No commitment • No spam • Results guaranteed
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

      {/* What's Included Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="included-title">
                Your Comprehensive AI Marketing Audit Includes:
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="included-subtitle">
                Everything you need to dominate your Houston market with AI-powered marketing
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {auditBenefits.map((benefit, index) => (
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

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="process-title">
                How Your AI Marketing Audit Works
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="process-subtitle">
                Simple 4-step process to transform your Houston business marketing
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {auditProcess.map((step, index) => (
              <AnimatedSection key={index} className="text-center">
                <div className="relative mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-primary">{step.icon}</div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3" data-testid={`step-title-${index}`}>
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed" data-testid={`step-description-${index}`}>
                  {step.description}
                </p>
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
                Houston Businesses Are Already Seeing Results
              </h2>
              <p className="text-xl text-muted-foreground" data-testid="testimonials-subtitle">
                Join 100+ Houston businesses that have transformed their marketing with AI
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
      <section id="audit-form" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <AnimatedSection>
              <div className="inline-flex items-center bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Clock className="w-4 h-4 mr-2" />
                Limited Time: FREE Audit (Usually $500)
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="form-section-title">
                Get Your FREE AI Marketing Audit
              </h2>
              <p className="text-xl text-muted-foreground" data-testid="form-section-subtitle">
                Takes 2 minutes • Instant confirmation • Results within 48 hours
              </p>
            </AnimatedSection>
          </div>

          <LeadMagnetForm
            leadMagnetType="audit"
            title="Get Your FREE AI Marketing Audit"
            subtitle="Discover how AI can transform your Houston business marketing and increase your leads by 200-400%"
            benefits={auditBenefits}
            additionalFields={<AdditionalFields />}
            showPhoneField={true}
            onSuccess={() => {
              // Redirect to thank you page
              window.location.href = '/thank-you?type=audit';
            }}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="cta-title">
              Don't Let Your Competitors Get Ahead
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto" data-testid="cta-subtitle">
              Every day you wait is another day your competitors gain an advantage. Get your FREE AI audit now and start dominating your Houston market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                onClick={() => setShowForm(true)}
                data-testid="button-final-cta"
              >
                <DollarSign className="w-5 h-5 mr-2" />
                Get My FREE $500 Audit Now
              </Button>
              <div className="text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 inline mr-1 text-primary" />
                100% Free • No strings attached
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}