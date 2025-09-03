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
  Zap,
  Trophy,
  Shield,
  Play,
  Star
} from "lucide-react";
import houstonSkylineImage from "@assets/houston-skyline.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";

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
      timeline: "2 weeks",
      href: "/business-profile",
      icon: <Trophy className="w-8 h-8 text-blue-600" />,
      description: "Transform your Google Business Profile into a customer-generating machine with AI optimization.",
      features: [
        "Complete Google Business Profile audit and optimization",
        "6 months of AI-generated posts (24 posts total, pre-scheduled)",
        "AI-powered review response templates in your voice",
        "Local keyword optimization for Houston market",
        "Competitor analysis and positioning strategy",
        "2-hour training session on managing your profile"
      ],
      bestFor: "Local businesses wanting to dominate Google search results",
      results: "Typically saves 5+ hours weekly, increases local visibility 300%"
    },
    {
      title: "AI Marketing System Setup",
      price: "$1,500-2,500",
      timeline: "3 weeks",
      href: "/ai-training",
      icon: <BarChart3 className="w-8 h-8 text-green-600" />,
      description: "Complete AI marketing automation system tailored to your Houston business needs.",
      features: [
        "Custom AI prompt library (20-30 prompts for your industry)",
        "Social media automation across 3 platforms",
        "Email marketing integration with AI content generation",
        "Customer journey automation workflows",
        "AI chatbot setup for lead qualification",
        "Complete staff training on all systems"
      ],
      bestFor: "Growing businesses ready to scale with automation",
      popular: true,
      results: "Typically saves 10+ hours weekly, automates 80% of content creation"
    },
    {
      title: "Website + AI Optimization",
      price: "$2,500-5,000",
      timeline: "4 weeks",
      href: "/ai-websites",
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      description: "Complete website redesign with integrated AI features for maximum conversion.",
      features: [
        "Complete website rebuild with AI-optimized content",
        "Smart chatbot with industry-specific conversation flows",
        "Voice search optimization for \"near me\" queries",
        "Local SEO optimization for Houston suburbs",
        "Conversion tracking and analytics setup",
        "3-hour comprehensive training session"
      ],
      bestFor: "Businesses needing a complete online presence overhaul",
      results: "Typically increases website leads by 200-400%"
    }
  ];

  const timeline = [
    { 
      step: 1, 
      title: "Discovery & Strategy", 
      duration: "Week 1", 
      description: "Initial consultation, business audit, and custom strategy development",
      details: [
        "Business goals assessment",
        "Current system analysis", 
        "Custom project roadmap"
      ]
    },
    { 
      step: 2, 
      title: "System Build & Setup", 
      duration: "2-4 weeks", 
      description: "Build and configure your AI marketing systems according to specifications",
      details: [
        "AI system development",
        "Custom automation setup",
        "Integration testing"
      ]
    },
    { 
      step: 3, 
      title: "Training & Launch", 
      duration: "Final week", 
      description: "Comprehensive training session and official system launch",
      details: [
        "Staff training session",
        "System handover",
        "Live launch support"
      ]
    },
    { 
      step: 4, 
      title: "Ongoing Ownership", 
      duration: "Lifetime", 
      description: "You own the complete system with lifetime access and support when needed",
      details: [
        "Complete system ownership",
        "Documentation provided",
        "Support available as needed"
      ]
    }
  ];

  return (
    <div className="bg-background font-sans antialiased">
      {/* Navigation */}
      <Navigation />

      {/* HERO SECTION */}
      <section 
        className="relative overflow-hidden"
        style={{
          backgroundImage: `url(${houstonSkylineImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          paddingTop: '64px',
          minHeight: '80vh'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6" data-testid="hero-title" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                <span className="text-blue-300">Professional AI Marketing Projects</span>{" "}
                for Houston Businesses
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed max-w-3xl mx-auto" data-testid="hero-subtitle" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                Choose your project package. One-time setup, lifetime ownership, no monthly fees.
              </p>

              {/* CTAs - Mobile Optimized */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="text-lg px-10 py-6 min-h-[56px] w-full sm:w-auto text-white bg-blue-600 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 font-bold" 
                  data-testid="button-assessment"
                >
                  <a href="/assessment" className="flex items-center justify-center gap-2">
                    <Target className="w-5 h-5" />
                    Take Free Assessment
                  </a>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-6 min-h-[56px] w-full sm:w-auto text-gray-900 bg-white/90 border-white hover:bg-white hover:text-gray-900 transition-all duration-200 font-medium" 
                  data-testid="button-consultation"
                >
                  <a href="/contact" className="flex items-center justify-center gap-2">
                    <Users className="w-5 h-5" />
                    Schedule Consultation
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your AI Marketing Project
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each package is designed to deliver specific results for Houston businesses at different growth stages.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              >
                <Card className={`h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ${service.popular ? 'border-2 border-blue-500' : ''}`}>
                  {service.popular && (
                    <div className="text-center mb-4 pt-4">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 ${index === 0 ? 'bg-blue-100' : index === 1 ? 'bg-green-100' : 'bg-purple-100'} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                      {service.title}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className={`text-3xl font-bold ${index === 0 ? 'text-blue-600' : index === 1 ? 'text-green-600' : 'text-purple-600'} mb-1`}>
                        {service.price}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.timeline}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <div className="text-xs font-semibold text-gray-500 mb-1">BEST FOR:</div>
                      <div className="text-sm text-gray-700 mb-3">{service.bestFor}</div>
                      <div className="text-xs font-semibold text-gray-500 mb-1">TYPICAL RESULTS:</div>
                      <div className="text-sm text-gray-700">{service.results}</div>
                    </div>

                    <Button asChild className="w-full min-h-[48px]" size="lg">
                      <a href={service.href}>
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ENHANCED PROCESS SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <AnimatedSection>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                How Our Projects Work
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every project follows our proven 4-phase process to ensure you get results and own your systems.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {timeline.map((phase, index) => (
              <AnimatedSection key={index} className="text-center">
                <Card className="h-full shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-600">{phase.step}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {phase.title}
                    </h3>
                    <div className="text-sm text-blue-600 font-semibold mb-3">{phase.duration}</div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {phase.description}
                    </p>
                    <div className="space-y-1">
                      {phase.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center justify-center gap-2 text-xs text-gray-500">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment CTA */}
      <section className="py-16 bg-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <Target className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Not Sure Which Package Is Right for You?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Take our free 3-minute assessment to discover which AI marketing project will deliver the biggest impact for your Houston business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-4 bg-white text-blue-900 hover:bg-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
                <a href="/assessment" className="flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Take Free Assessment
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 text-gray-900 bg-white/90 border-white hover:bg-white hover:text-gray-900 transition-all duration-200">
                <a href="/contact" className="flex items-center justify-center gap-2">
                  <Users className="w-5 h-5" />
                  Schedule Strategy Call
                </a>
              </Button>
            </div>
            <div className="mt-6 text-sm text-blue-200">
              <strong>No obligation</strong> • Get personalized recommendations in minutes
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}