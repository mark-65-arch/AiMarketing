import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  BrainCircuit, 
  CheckCircle, 
  Users, 
  Award, 
  Target, 
  Heart, 
  TrendingUp,
  MapPin,
  GraduationCap,
  Building
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

export default function About() {
  const benefits = [
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      title: "Houston's First AI-Native Marketing Agency",
      description: "We were built for the AI era from day one, giving you cutting-edge advantages your competitors don't have."
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-primary" />,
      title: "AI Tool Certified Experts",
      description: "Our team holds certifications in all major AI platforms and stays ahead of the latest developments."
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Deep Local Market Knowledge",
      description: "We understand Houston's unique business landscape and how to make AI work for local companies."
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Education-First Approach",
      description: "We don't just do the work for you - we teach you how to leverage AI for long-term success."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
      title: "Guaranteed Results",
      description: "We're so confident in our methods that we guarantee measurable improvements or your money back."
    }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Transparency",
      description: "No black box solutions. We explain exactly how our AI strategies work and why they're effective for your business."
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-primary" />,
      title: "Education-First",
      description: "We believe in empowering business owners with knowledge, not creating dependency on our services."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      title: "Results-Driven",
      description: "Every strategy we implement is measured, tracked, and optimized for maximum ROI and real business growth."
    }
  ];

  const stats = [
    { number: "50+", label: "Houston businesses served" },
    { number: "340%", label: "Average lead increase" },
    { number: "15+", label: "Hours saved per week" }
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
                <a href="/about" className="text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-about">About</a>
                <a href="/#services" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-services">Services</a>
                <a href="/ai-tools" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-ai-tools">Free AI Tools</a>
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
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="lg:col-span-7">
              <AnimatedSection>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" data-testid="hero-title">
                  About{" "}
                  <span className="gradient-text">Houston AI Marketing</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="hero-subtitle">
                  Making AI marketing accessible and affordable for every Houston small business. We're Houston's first AI-native marketing agency, founded by a young entrepreneur passionate about helping local businesses succeed with artificial intelligence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200" data-testid="button-get-started">
                    <a href="/contact">Start Your AI Journey</a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 hover:bg-muted/50 transition-all duration-200" data-testid="button-learn-more">
                    <a href="/#services">View Our Services</a>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-5">
              <AnimatedSection>
                <Card className="shadow-xl bg-card/50 backdrop-blur-sm border-primary/20" data-testid="founder-card">
                  <CardContent className="p-8 text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-foreground">Founder Photo</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Our Founder</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Young entrepreneur and AI expert passionate about empowering Houston businesses with cutting-edge marketing technology that drives real results.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>

        {/* Success Stats */}
        <div className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-primary/20" data-testid={`stat-${index}`}>
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <AnimatedSection>
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Houston skyline representing our local community focus" 
                className="rounded-2xl shadow-xl w-full" 
                data-testid="mission-image"
              />
            </AnimatedSection>
            <div className="mt-12 lg:mt-0">
              <AnimatedSection>
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <BrainCircuit className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="mission-title">
                  Our Mission
                </h2>
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed" data-testid="mission-description">
                  Making AI marketing accessible and affordable for every Houston small business.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  We believe that artificial intelligence shouldn't be reserved for Fortune 500 companies. Every Houston business, from family restaurants to local service providers, deserves access to the same powerful marketing tools that drive explosive growth.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">Local Focus</div>
                      <div className="text-muted-foreground text-sm">We understand Houston's unique market and business landscape</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">Practical Solutions</div>
                      <div className="text-muted-foreground text-sm">No complicated tech jargon - just results that grow your business</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">Continuous Learning</div>
                      <div className="text-muted-foreground text-sm">We stay ahead of AI developments to keep your business competitive</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 demo-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="benefits-title">
                Why Choose Houston AI Marketing?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="benefits-subtitle">
                We're not just another marketing agency. We're Houston's AI-native marketing experts, built specifically for the artificial intelligence era.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={index} className="hover-lift">
                <Card className="h-full shadow-sm" data-testid={`benefit-card-${index}`}>
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                      {benefit.icon}
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

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="values-title">
                Our Core Values
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="values-subtitle">
                The principles that guide everything we do for Houston businesses.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <AnimatedSection key={index} className="text-center hover-lift">
                <Card className="h-full shadow-sm" data-testid={`value-card-${index}`}>
                  <CardContent className="p-8">
                    <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-card-foreground mb-4" data-testid={`value-title-${index}`}>
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" data-testid={`value-description-${index}`}>
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Community Involvement Section */}
      <section className="py-20 demo-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="community-title">
                Proud Houston Community Member
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="community-subtitle">
                We're deeply rooted in the Houston business community and committed to helping our city's economy thrive.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="space-y-8">
                <div className="flex items-start">
                  <Building className="w-8 h-8 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Houston Chamber of Commerce</h3>
                    <p className="text-muted-foreground">
                      Active member supporting Houston's business ecosystem and connecting with fellow entrepreneurs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-8 h-8 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Local Business Groups</h3>
                    <p className="text-muted-foreground">
                      Regular participant in Houston entrepreneur meetups, sharing AI insights and learning from peers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="w-8 h-8 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Community Education</h3>
                    <p className="text-muted-foreground">
                      Free workshops and seminars to help Houston businesses understand and adopt AI marketing strategies.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <img 
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Houston business community meeting" 
                className="rounded-2xl shadow-xl w-full" 
                data-testid="community-image"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="cta-title">
              Ready to Transform Your Business with AI?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="cta-description">
              Join the growing community of Houston businesses using AI to dominate their markets. Let's discuss how we can help your business thrive in the age of artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200" data-testid="button-get-consultation">
                <a href="/contact">Get Free Consultation</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 hover:bg-muted/50 transition-all duration-200" data-testid="button-view-services">
                <a href="/#services">View All Services</a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}