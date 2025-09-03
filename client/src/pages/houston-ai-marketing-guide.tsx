import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { 
  BookOpen, 
  CheckCircle, 
  ChevronRight, 
  Download, 
  Star, 
  TrendingUp, 
  MapPin,
  Brain,
  Target,
  Clock,
  DollarSign,
  Users,
  BarChart3,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  HelpCircle
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

export default function HoustonAIMarketingGuide() {
  const [openSection, setOpenSection] = useState<number | null>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tableOfContents = [
    { id: 1, title: "What is AI Marketing?", anchor: "#what-is-ai-marketing" },
    { id: 2, title: "Why Houston Businesses Need AI", anchor: "#why-houston-needs-ai" },
    { id: 3, title: "Getting Started: AI Foundations", anchor: "#getting-started" },
    { id: 4, title: "Essential AI Marketing Tools", anchor: "#essential-tools" },
    { id: 5, title: "Local SEO with AI", anchor: "#local-seo" },
    { id: 6, title: "AI Content Creation", anchor: "#content-creation" },
    { id: 7, title: "Customer Service Automation", anchor: "#customer-service" },
    { id: 8, title: "Social Media Automation", anchor: "#social-media" },
    { id: 9, title: "ROI Tracking & Analytics", anchor: "#roi-tracking" },
    { id: 10, title: "Implementation Roadmap", anchor: "#implementation" }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Save 15+ Hours Per Week",
      description: "Automate repetitive marketing tasks and focus on growing your business."
    },
    {
      icon: TrendingUp,
      title: "Increase Revenue by 200-400%",
      description: "Better targeting and personalization lead to higher conversion rates."
    },
    {
      icon: Users,
      title: "24/7 Customer Engagement",
      description: "AI chatbots and automation ensure you never miss a customer inquiry."
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "Reach the right customers at the right time with AI-powered insights."
    },
    {
      icon: DollarSign,
      title: "Lower Marketing Costs",
      description: "Reduce advertising spend while increasing effectiveness and ROI."
    },
    {
      icon: BarChart3,
      title: "Data-Driven Decisions",
      description: "Make informed marketing decisions based on AI analytics and insights."
    }
  ];

  const houstonStats = [
    { stat: "2.3M+", label: "Houston Metro Population", description: "Massive local market opportunity" },
    { stat: "85%", label: "Mobile Search Usage", description: "Houstonians search on mobile first" },
    { stat: "$45K+", label: "Median Household Income", description: "Strong purchasing power" },
    { stat: "1M+", label: "Local Businesses", description: "Competitive market requiring AI advantage" }
  ];

  const aiTools = [
    {
      category: "Content Creation",
      tools: [
        { name: "ChatGPT", price: "$20/month", description: "Blog posts, social media content, ad copy" },
        { name: "Jasper AI", price: "$49/month", description: "Long-form content, brand voice consistency" },
        { name: "Copy.ai", price: "$35/month", description: "Quick copy generation, email campaigns" }
      ]
    },
    {
      category: "Local SEO",
      tools: [
        { name: "BrightLocal", price: "$29/month", description: "Local citation management, ranking tracking" },
        { name: "Whitespark", price: "$47/month", description: "Citation building, review management" },
        { name: "LocalFalcon", price: "$30/month", description: "Local rank tracking, competitor analysis" }
      ]
    },
    {
      category: "Social Media",
      tools: [
        { name: "Hootsuite Insights", price: "$99/month", description: "AI-powered social listening" },
        { name: "Buffer", price: "$15/month", description: "Smart scheduling, content optimization" },
        { name: "Sprout Social", price: "$249/month", description: "Advanced analytics, customer care" }
      ]
    },
    {
      category: "Customer Service",
      tools: [
        { name: "Zendesk AI", price: "$79/month", description: "Smart ticket routing, chatbots" },
        { name: "Intercom", price: "$74/month", description: "AI-powered conversations" },
        { name: "Drift", price: "$50/month", description: "Conversational marketing automation" }
      ]
    }
  ];

  const implementationSteps = [
    {
      phase: "Week 1-2: Foundation",
      tasks: [
        "Assess current marketing performance",
        "Identify biggest time-consuming tasks", 
        "Set up Google Analytics 4 with AI insights",
        "Create AI marketing budget ($200-500/month)"
      ]
    },
    {
      phase: "Week 3-4: Core Tools",
      tasks: [
        "Implement ChatGPT for content creation",
        "Set up automated social media scheduling",
        "Install AI chatbot on website",
        "Optimize Google Business Profile with AI"
      ]
    },
    {
      phase: "Week 5-6: Local SEO",
      tasks: [
        "Implement local SEO AI tools",
        "Automate review response system",
        "Create location-based content strategy",
        "Set up local competitor monitoring"
      ]
    },
    {
      phase: "Week 7-8: Advanced Automation",
      tasks: [
        "Deploy email marketing automation",
        "Implement lead scoring system",
        "Set up advanced analytics dashboards",
        "Create AI-powered ad campaigns"
      ]
    }
  ];

  const faqs = [
    {
      question: "How much does AI marketing cost for Houston businesses?",
      answer: "Most Houston businesses can start with AI marketing for $200-500 per month. This includes essential tools like ChatGPT ($20), social media management ($50), and local SEO tools ($80). The ROI typically pays for itself within 30-60 days through increased leads and time savings."
    },
    {
      question: "Can small Houston businesses compete with big companies using AI?",
      answer: "Absolutely! AI levels the playing field by giving small businesses access to the same sophisticated marketing capabilities as large corporations. Many small Houston businesses actually have advantages - they're more agile, can implement AI faster, and can provide more personalized customer experiences."
    },
    {
      question: "How long before I see results from AI marketing?",
      answer: "Most Houston businesses see initial results within 2-4 weeks. Time savings happen immediately, while lead generation and revenue improvements typically show up within 30-60 days. Full optimization usually takes 3-6 months depending on implementation depth."
    },
    {
      question: "Do I need technical skills to implement AI marketing?",
      answer: "No technical skills required! Modern AI marketing tools are designed for business owners, not programmers. Most tools have intuitive interfaces, and many offer setup assistance. Our Houston AI workshops teach you everything hands-on in just 4 hours."
    },
    {
      question: "What's the biggest AI marketing mistake Houston businesses make?",
      answer: "The biggest mistake is trying to implement everything at once. Start with one area (like content creation), master it, then expand. Also, many businesses don't track ROI properly - make sure you measure time saved and revenue generated from AI tools."
    },
    {
      question: "How do I measure AI marketing ROI?",
      answer: "Track three key metrics: (1) Time saved per week (multiply by your hourly rate), (2) Increase in leads/customers, and (3) Revenue attribution. Most Houston businesses see 300-500% ROI within 6 months when properly implemented."
    }
  ];

  return (
    <div className="bg-background font-sans antialiased">
      {/* Navigation spacer */}
      <div className="pt-16"></div>
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <AnimatedSection>
                <Badge variant="secondary" className="mb-4">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Complete Guide - 50+ Pages
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" data-testid="guide-title">
                  The Complete Guide to{" "}
                  <span className="text-primary">AI Marketing</span>{" "}
                  for Houston Businesses
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="guide-subtitle">
                  Master artificial intelligence marketing with our comprehensive guide specifically designed for Houston business owners. Learn proven strategies that have helped 50+ local businesses increase revenue by 200-400% while saving 15+ hours per week.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button asChild size="lg" data-testid="button-free-consultation">
                    <a href="/contact">Get Free AI Strategy Session</a>
                  </Button>
                  <Button asChild variant="outline" size="lg" data-testid="button-download-pdf">
                    <a href="/contact">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF Guide
                    </a>
                  </Button>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    45 min read
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    4.9/5 rating (127 reviews)
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    500+ Houston businesses trained
                  </div>
                </div>
              </AnimatedSection>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-5">
              <AnimatedSection>
                <Card className="shadow-xl" data-testid="table-of-contents">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-card-foreground mb-6 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-primary" />
                      Table of Contents
                    </h3>
                    <div className="space-y-3">
                      {tableOfContents.map((item, index) => (
                        <div key={item.id} className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="text-xs font-semibold text-primary">{index + 1}</span>
                          </div>
                          <a 
                            href={item.anchor} 
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            data-testid={`toc-item-${index}`}
                          >
                            {item.title}
                          </a>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                      <p className="text-sm font-semibold text-primary mb-2">🎯 What You'll Learn</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Save 15+ hours per week with AI automation</li>
                        <li>• Increase revenue by 200-400% with better targeting</li>
                        <li>• Dominate Houston local search results</li>
                        <li>• Implement AI tools for under $500/month</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Houston Market Opportunity */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="opportunity-title">
                The Marketing AI Houston Opportunity
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Houston's massive market and competitive landscape make AI marketing essential for business success
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {houstonStats.map((stat, index) => (
              <AnimatedSection key={index}>
                <Card className="text-center" data-testid={`houston-stat-${index}`}>
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-primary mb-2">{stat.stat}</div>
                    <div className="text-lg font-semibold text-foreground mb-2">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={index}>
                <Card className="h-full hover-lift" data-testid={`benefit-card-${index}`}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-card-foreground mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-16 bg-muted/10" id="what-is-ai-marketing">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* Section 1: What is AI Marketing */}
            <AnimatedSection>
              <Collapsible open={openSection === 1} onOpenChange={() => setOpenSection(openSection === 1 ? null : 1)}>
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-md transition-shadow" data-testid="section-what-is-ai">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                            <Brain className="w-5 h-5 text-primary" />
                          </div>
                          <h2 className="text-2xl font-bold text-foreground">What is AI Marketing?</h2>
                        </div>
                        {openSection === 1 ? 
                          <ChevronUp className="w-5 h-5 text-muted-foreground" /> : 
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        }
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="mt-4">
                    <CardContent className="p-8 prose prose-lg max-w-none">
                      <p className="text-muted-foreground mb-6">
                        AI marketing uses artificial intelligence to analyze customer data, predict behavior, and automate marketing tasks. For Houston businesses, this means reaching the right customers at the right time with personalized messages that drive action.
                      </p>
                      
                      <h3 className="text-xl font-bold text-foreground mb-4">How AI Marketing Works for Houston Businesses</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="p-4 bg-primary/5 rounded-lg">
                          <h4 className="font-semibold text-foreground mb-2">Data Collection</h4>
                          <p className="text-sm text-muted-foreground">AI gathers data from your website, social media, customer interactions, and local search behavior to understand Houston market patterns.</p>
                        </div>
                        <div className="p-4 bg-secondary/5 rounded-lg">
                          <h4 className="font-semibold text-foreground mb-2">Pattern Recognition</h4>
                          <p className="text-sm text-muted-foreground">Machine learning identifies what messaging works best for different Houston neighborhoods and customer segments.</p>
                        </div>
                        <div className="p-4 bg-primary/5 rounded-lg">
                          <h4 className="font-semibold text-foreground mb-2">Automation</h4>
                          <p className="text-sm text-muted-foreground">AI automatically creates and distributes personalized content, responds to customers, and optimizes ad campaigns.</p>
                        </div>
                        <div className="p-4 bg-secondary/5 rounded-lg">
                          <h4 className="font-semibold text-foreground mb-2">Optimization</h4>
                          <p className="text-sm text-muted-foreground">Continuous learning improves performance, increasing ROI and customer satisfaction over time.</p>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-4">Real Houston Business Example</h3>
                      <div className="p-6 bg-background rounded-lg border border-border mb-6">
                        <p className="text-muted-foreground mb-4">
                          <strong className="text-foreground">Houston Restaurant Case Study:</strong> A local restaurant implemented AI marketing and saw these results in 90 days:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                            <span className="text-sm">350% increase in online orders through personalized email campaigns</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                            <span className="text-sm">12 hours per week saved on social media management</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                            <span className="text-sm">400% improvement in Google Business Profile engagement</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                            <span className="text-sm">85% reduction in customer service response time</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            </AnimatedSection>

            {/* Section 2: Why Houston Needs AI */}
            <AnimatedSection>
              <Collapsible open={openSection === 2} onOpenChange={() => setOpenSection(openSection === 2 ? null : 2)}>
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-md transition-shadow" data-testid="section-why-houston">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                            <MapPin className="w-5 h-5 text-primary" />
                          </div>
                          <h2 className="text-2xl font-bold text-foreground">Why Houston Businesses Need AI Marketing Now</h2>
                        </div>
                        {openSection === 2 ? 
                          <ChevronUp className="w-5 h-5 text-muted-foreground" /> : 
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        }
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="mt-4">
                    <CardContent className="p-8 prose prose-lg max-w-none">
                      <p className="text-muted-foreground mb-6">
                        Houston's competitive business environment and tech-savvy population make AI marketing essential for staying ahead. Businesses that don't adopt AI risk being left behind by competitors who do.
                      </p>
                      
                      <h3 className="text-xl font-bold text-foreground mb-4">Houston Market Challenges</h3>
                      <div className="space-y-4 mb-8">
                        <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                          <h4 className="font-semibold text-foreground mb-2 flex items-center">
                            <Target className="w-4 h-4 mr-2 text-destructive" />
                            Intense Competition
                          </h4>
                          <p className="text-sm text-muted-foreground">Over 1 million businesses compete for customer attention in the Houston metro. AI helps you stand out with personalized messaging and better targeting.</p>
                        </div>
                        <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                          <h4 className="font-semibold text-foreground mb-2 flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-destructive" />
                            Time Constraints
                          </h4>
                          <p className="text-sm text-muted-foreground">Houston business owners work 55+ hours per week on average. AI marketing automation frees up time for core business activities.</p>
                        </div>
                        <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                          <h4 className="font-semibold text-foreground mb-2 flex items-center">
                            <Users className="w-4 h-4 mr-2 text-destructive" />
                            Diverse Demographics
                          </h4>
                          <p className="text-sm text-muted-foreground">Houston's diverse population requires different messaging approaches. AI helps personalize content for different cultural and economic segments.</p>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-4">The AI Advantage in Houston</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Early Adopter Advantage</h4>
                          <p className="text-sm text-green-700 dark:text-green-300">Only 23% of Houston businesses use AI marketing. Early adopters gain significant competitive advantages.</p>
                        </div>
                        <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Tech-Ready Market</h4>
                          <p className="text-sm text-green-700 dark:text-green-300">85% of Houstonians use smartphones for local searches, making them ready for AI-powered marketing experiences.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* Essential AI Tools Section */}
      <section className="py-16 bg-background" id="essential-tools">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="tools-title">
                Essential AI Marketing Tools for Houston Businesses
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Hand-picked tools that deliver real results for Houston businesses, organized by use case and budget
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-12">
            {aiTools.map((category, index) => (
              <AnimatedSection key={index}>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center" data-testid={`category-title-${index}`}>
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                      <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                    {category.category}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {category.tools.map((tool, toolIndex) => (
                      <Card key={toolIndex} className="hover-lift" data-testid={`tool-card-${index}-${toolIndex}`}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-bold text-foreground">{tool.name}</h4>
                            <Badge variant="secondary">{tool.price}</Badge>
                          </div>
                          <p className="text-muted-foreground text-sm">{tool.description}</p>
                          <Button asChild variant="outline" size="sm" className="w-full mt-4">
                            <a href="/contact">Learn More</a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Roadmap */}
      <section className="py-16 bg-muted/10" id="implementation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="roadmap-title">
                8-Week AI Marketing Implementation Roadmap
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Step-by-step plan to implement AI marketing in your Houston business safely and effectively
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {implementationSteps.map((step, index) => (
              <AnimatedSection key={index}>
                <Card className="h-full" data-testid={`implementation-step-${index}`}>
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                        <span className="text-sm font-bold text-primary">{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{step.phase}</h3>
                    </div>
                    <ul className="space-y-3">
                      {step.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="faq-title">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground">
                Common questions from Houston business owners about AI marketing
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index}>
                <Collapsible open={openFaq === index} onOpenChange={() => setOpenFaq(openFaq === index ? null : index)}>
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
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="cta-title">
              Ready to Transform Your Houston Business with AI?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join 50+ Houston businesses already using AI to dominate their markets. Get personalized implementation guidance and start seeing results in 30 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" data-testid="button-strategy-call">
                <a href="/contact">Schedule Free Strategy Call</a>
              </Button>
              <Button asChild variant="outline" size="lg" data-testid="button-workshop">
                <a href="/ai-training">Join Next AI Workshop</a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              💡 Free consultation includes personalized AI marketing roadmap for your business
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}