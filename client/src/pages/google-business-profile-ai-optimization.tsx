import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { 
  MapPin, 
  Star, 
  Search, 
  Clock, 
  TrendingUp, 
  MessageSquare,
  Camera,
  Calendar,
  Users,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Phone,
  Globe,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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

export default function GoogleBusinessProfileAIOptimization() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const optimizationSteps = [
    {
      step: "AI-Powered Business Description",
      description: "Create compelling, keyword-rich descriptions that convert browsers into customers",
      tools: ["ChatGPT", "Copy.ai"],
      timeRequired: "30 minutes",
      impact: "25% increase in click-through rates",
      implementation: [
        "Analyze top 10 competitors' descriptions using AI",
        "Generate multiple description variations with AI",
        "A/B test different versions for 2 weeks",
        "Optimize based on performance data"
      ]
    },
    {
      step: "Automated Review Response System",
      description: "Never miss a review again with AI-generated personalized responses",
      tools: ["Zendesk AI", "Review management tools"],
      timeRequired: "2 hours setup",
      impact: "400% faster response times, 95% review response rate",
      implementation: [
        "Set up AI templates for 5-star, 4-star, and negative reviews",
        "Train AI on your brand voice and values",
        "Configure automatic monitoring and alerts",
        "Review and approve responses before posting"
      ]
    },
    {
      step: "Smart Photo Optimization",
      description: "AI analyzes which photos drive the most engagement and calls",
      tools: ["Google Analytics 4", "Photo optimization AI"],
      timeRequired: "1 hour weekly",
      impact: "60% more photo views, 30% more calls",
      implementation: [
        "Upload high-quality photos of products, services, team",
        "Use AI to analyze photo performance metrics",
        "Automatically rotate best-performing photos to front",
        "Generate captions and alt text with AI"
      ]
    },
    {
      step: "AI-Generated Posts & Updates",
      description: "Consistent posting schedule with AI-created local content",
      tools: ["ChatGPT", "Social media management tools"],
      timeRequired: "30 minutes weekly", 
      impact: "300% increase in post engagement",
      implementation: [
        "Create content calendar templates in AI",
        "Generate posts about local events, offers, tips",
        "Schedule posts for optimal engagement times",
        "Track performance and adjust strategy"
      ]
    },
    {
      step: "Smart Q&A Optimization",
      description: "Anticipate customer questions and provide helpful AI-generated answers",
      tools: ["FAQ analysis tools", "ChatGPT"],
      timeRequired: "1 hour monthly",
      impact: "50% reduction in phone calls for basic questions",
      implementation: [
        "Analyze common customer questions using AI",
        "Generate comprehensive Q&A pairs",
        "Update answers seasonally or when services change",
        "Monitor new questions and add to database"
      ]
    }
  ];

  const houstonOptimizations = [
    {
      strategy: "Neighborhood-Specific Keywords",
      description: "Target Houston's diverse neighborhoods with hyper-local SEO",
      examples: [
        "Heights electrician near me",
        "Midtown restaurant delivery",
        "Galleria hair salon appointments",
        "Sugar Land plumbing emergency"
      ],
      implementation: "Use AI to generate location-specific content for your service area"
    },
    {
      strategy: "Cultural Relevance",
      description: "Connect with Houston's multicultural population",
      examples: [
        "Spanish-speaking services",
        "Tex-Mex catering options",
        "International business services",
        "Cultural event participation"
      ],
      implementation: "AI creates culturally relevant content and multilingual descriptions"
    },
    {
      strategy: "Local Event Integration",
      description: "Tie your business to Houston events and seasons",
      examples: [
        "Rodeo season specials",
        "Hurricane preparation services",
        "Astros game day offerings",
        "Energy Corridor business solutions"
      ],
      implementation: "AI monitors local events and generates timely posts and offers"
    }
  ];

  const beforeAfterMetrics = [
    {
      metric: "Profile Views",
      before: "150/month",
      after: "850/month",
      improvement: "467% increase"
    },
    {
      metric: "Phone Calls",
      before: "12/month",
      after: "48/month",
      improvement: "300% increase"
    },
    {
      metric: "Website Clicks",
      before: "25/month",
      after: "120/month",
      improvement: "380% increase"
    },
    {
      metric: "Direction Requests", 
      before: "8/month",
      after: "35/month",
      improvement: "338% increase"
    },
    {
      metric: "Review Response Rate",
      before: "30%",
      after: "95%",
      improvement: "217% increase"
    },
    {
      metric: "Average Rating",
      before: "4.1 stars",
      after: "4.7 stars",
      improvement: "15% increase"
    }
  ];

  const aiTools = [
    {
      name: "ChatGPT",
      purpose: "Content creation and optimization",
      cost: "$20/month",
      useCase: "Generate business descriptions, posts, Q&A responses",
      setup: "5 minutes"
    },
    {
      name: "BrightLocal",
      purpose: "Local SEO monitoring and optimization", 
      cost: "$29/month",
      useCase: "Track rankings, manage citations, monitor reviews",
      setup: "1 hour"
    },
    {
      name: "Review Trackers",
      purpose: "Automated review management",
      cost: "$89/month", 
      useCase: "Monitor reviews across platforms, automated responses",
      setup: "2 hours"
    },
    {
      name: "LocalFalcon",
      purpose: "Local search ranking tracking",
      cost: "$30/month",
      useCase: "Track local rankings, competitor analysis",
      setup: "30 minutes"
    }
  ];

  const faqs = [
    {
      question: "How long does it take to see results from Google Business Profile AI optimization?",
      answer: "Most Houston businesses see initial improvements within 2-4 weeks. Profile views typically increase 200-400% within the first month, while phone calls and website visits improve over 6-8 weeks as Google's algorithm recognizes the enhanced engagement."
    },
    {
      question: "Will AI-generated content violate Google's guidelines?",
      answer: "No, when used properly. AI helps create original, relevant content that follows Google's guidelines. The key is reviewing and customizing AI-generated content to ensure it's accurate, helpful, and represents your business authentically. Never copy content directly from competitors."
    },
    {
      question: "Can AI help with negative reviews on my Google Business Profile?",
      answer: "Absolutely! AI can generate professional, empathetic responses to negative reviews that show you care about customer feedback. It can also help identify patterns in negative reviews and suggest operational improvements. Quick, thoughtful responses often turn negative experiences into positive outcomes."
    },
    {
      question: "How much does it cost to implement AI optimization for my Houston business?",
      answer: "Basic AI optimization costs $100-300/month for most Houston businesses. This includes AI content tools ($20-50), local SEO tracking ($30-100), and review management ($50-150). The ROI typically returns 5-10x the investment through increased customers."
    },
    {
      question: "Do I need technical skills to optimize my Google Business Profile with AI?",
      answer: "No technical skills required! Modern AI tools are designed for business owners with simple interfaces and step-by-step guidance. Most optimization tasks take 15-30 minutes weekly. Our Houston workshop teaches you everything hands-on in just 4 hours."
    },
    {
      question: "How does AI optimization help with Houston's competitive market?",
      answer: "AI gives you a significant advantage by enabling hyper-local content, faster response times, and consistent optimization that most Houston businesses can't match manually. Early adopters are dominating local search results because they can optimize at scale while competitors struggle with manual processes."
    }
  ];

  return (
    <div className="bg-background font-sans antialiased">
      {/* Navigation spacer */}
      <div className="pt-16"></div>
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <MapPin className="w-4 h-4 mr-2" />
                Local SEO Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" data-testid="article-title">
                Optimizing Your Google Business Profile{" "}
                <span className="text-primary">with AI</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="article-subtitle">
                Master AI-powered Google Business Profile optimization to dominate Houston local search results. Complete step-by-step guide with proven strategies, tools, and real case studies showing 400% increases in customer calls.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  10 min read
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  January 10, 2025
                </div>
                <div className="flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Local SEO Focus
                </div>
              </div>
              <Button asChild size="lg" data-testid="button-get-optimization-guide">
                <a href="/contact">Get Free Profile Optimization Audit</a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <AnimatedSection>
            <div className="prose prose-lg max-w-none mb-16">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Your Google Business Profile is your digital storefront in Houston's competitive market. With over 1 million local searches happening daily in the Houston metro area, optimization isn't optional—it's essential for survival.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                This comprehensive guide reveals exactly how Houston businesses are using AI to dominate local search results, increase customer calls by 300-400%, and build unshakeable online reputations. Every strategy is tested and proven by real Houston businesses seeing extraordinary results.
              </p>
            </div>
          </AnimatedSection>

          {/* Why This Matters for Houston */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="houston-importance-title">
                Why Google Business Profile Optimization is Critical in Houston
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">1M+ Daily Searches</h3>
                  <p className="text-sm text-muted-foreground">Houston residents perform over 1 million local business searches daily</p>
                </Card>
                
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">97% Check Reviews</h3>
                  <p className="text-sm text-muted-foreground">Houston consumers read reviews before visiting or calling businesses</p>
                </Card>
                
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">76% Call Within 24hrs</h3>
                  <p className="text-sm text-muted-foreground">Houstonians call businesses within 24 hours of finding them online</p>
                </Card>
              </div>

              <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  The AI Advantage
                </h3>
                <p className="text-muted-foreground">
                  Houston businesses using AI for Google Business Profile optimization see 400% more customer interactions, 300% increase in phone calls, and 250% more website visits compared to those using manual methods. The competitive advantage is massive and growing.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Before/After Metrics */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="before-after-title">
                Real Houston Business Results: Before vs After AI Optimization
              </h2>
              
              <Card className="p-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 font-bold text-card-foreground">Metric</th>
                        <th className="text-center p-4 font-bold text-red-600">Before AI</th>
                        <th className="text-center p-4 font-bold text-green-600">After AI</th>
                        <th className="text-center p-4 font-bold text-primary">Improvement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {beforeAfterMetrics.map((metric, index) => (
                        <tr key={index} className="border-b border-border/50" data-testid={`metric-row-${index}`}>
                          <td className="p-4 font-semibold text-card-foreground">{metric.metric}</td>
                          <td className="p-4 text-center text-red-600">{metric.before}</td>
                          <td className="p-4 text-center text-green-600">{metric.after}</td>
                          <td className="p-4 text-center">
                            <Badge variant="default" className="font-bold">{metric.improvement}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </AnimatedSection>

          {/* 5-Step Optimization Process */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="optimization-steps-title">
                5-Step AI-Powered Optimization Process
              </h2>
              
              <div className="space-y-8">
                {optimizationSteps.map((step, index) => (
                  <Card key={index} className="p-8" data-testid={`optimization-step-${index}`}>
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-primary text-lg">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-bold text-card-foreground">{step.step}</h3>
                          <Badge variant="secondary" className="text-green-600 font-semibold">{step.impact}</Badge>
                        </div>
                        
                        <p className="text-muted-foreground mb-6">{step.description}</p>
                        
                        <div className="grid md:grid-cols-3 gap-6 mb-6">
                          <div>
                            <h4 className="font-semibold text-card-foreground mb-3">Recommended Tools:</h4>
                            <ul className="space-y-2">
                              {step.tools.map((tool, toolIndex) => (
                                <li key={toolIndex} className="flex items-center text-sm text-muted-foreground">
                                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                                  {tool}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-card-foreground mb-3">Time Required:</h4>
                            <p className="text-primary font-bold">{step.timeRequired}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-card-foreground mb-3">Expected Impact:</h4>
                            <p className="text-green-600 font-semibold">{step.impact}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-card-foreground mb-3">Implementation Steps:</h4>
                          <ol className="space-y-2">
                            {step.implementation.map((impl, implIndex) => (
                              <li key={implIndex} className="flex items-start text-sm text-muted-foreground">
                                <span className="font-semibold text-primary mr-3 mt-0.5">{implIndex + 1}.</span>
                                {impl}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Houston-Specific Strategies */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="houston-strategies-title">
                Houston-Specific Optimization Strategies
              </h2>
              
              <div className="space-y-6">
                {houstonOptimizations.map((strategy, index) => (
                  <Card key={index} className="p-6" data-testid={`houston-strategy-${index}`}>
                    <h3 className="text-xl font-bold text-card-foreground mb-3">{strategy.strategy}</h3>
                    <p className="text-muted-foreground mb-4">{strategy.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-card-foreground mb-3">Examples:</h4>
                        <ul className="space-y-2">
                          {strategy.examples.map((example, exampleIndex) => (
                            <li key={exampleIndex} className="flex items-center text-sm text-muted-foreground">
                              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-card-foreground mb-3">AI Implementation:</h4>
                        <p className="text-sm text-muted-foreground">{strategy.implementation}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Essential AI Tools */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="ai-tools-title">
                Essential AI Tools for Google Business Profile Optimization
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {aiTools.map((tool, index) => (
                  <Card key={index} className="p-6" data-testid={`ai-tool-${index}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-card-foreground">{tool.name}</h3>
                      <Badge variant="secondary" className="text-primary font-bold">{tool.cost}</Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{tool.purpose}</p>
                    <p className="text-sm text-muted-foreground mb-4"><strong>Use Case:</strong> {tool.useCase}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        <strong>Setup Time:</strong> {tool.setup}
                      </span>
                      <Button asChild variant="outline" size="sm">
                        <a href="/contact">Learn More</a>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* FAQ Section */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="faq-title">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Collapsible key={index} open={openFaq === index} onOpenChange={() => setOpenFaq(openFaq === index ? null : index)}>
                    <CollapsibleTrigger asChild>
                      <Card className="cursor-pointer hover:shadow-md transition-shadow" data-testid={`faq-${index}`}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <HelpCircle className="w-5 h-5 text-primary mr-3" />
                              <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
                            </div>
                            {openFaq === index ? 
                              <ChevronUp className="w-5 h-5 text-muted-foreground" /> : 
                              <ChevronDown className="w-5 h-5 text-muted-foreground" />
                            }
                          </div>
                        </CardContent>
                      </Card>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <Card className="mt-2">
                        <CardContent className="p-6 pt-0">
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </CardContent>
                      </Card>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="cta-title">
              Ready to Dominate Houston Local Search?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Let our AI experts optimize your Google Business Profile for maximum Houston market impact. Get a free audit and see exactly how much more business you could be getting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" data-testid="button-profile-audit">
                <a href="/contact">Get Free Profile Optimization Audit</a>
              </Button>
              <Button asChild variant="outline" size="lg" data-testid="button-local-seo-workshop">
                <a href="/ai-training">Join Local SEO Workshop</a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              ✅ Free audit includes competitor analysis and optimization roadmap • Results guaranteed
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}