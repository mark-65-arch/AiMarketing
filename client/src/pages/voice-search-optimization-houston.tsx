import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Mic, 
  Smartphone, 
  MapPin, 
  Search, 
  Clock, 
  TrendingUp,
  Users,
  Target,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Calendar,
  Star,
  Brain
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

export default function VoiceSearchOptimizationHouston() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const voiceSearchStats = [
    {
      stat: "58%",
      description: "of Houston adults use voice search daily",
      insight: "Voice search is mainstream in Houston"
    },
    {
      stat: "76%",
      description: "of voice searches are for local businesses",
      insight: "Perfect for Houston local businesses"
    },
    {
      stat: "3x",
      description: "more likely to visit after voice search",
      insight: "Voice searchers take action quickly"
    },
    {
      stat: "89%",
      description: "use voice search on mobile devices",
      insight: "Mobile optimization is critical"
    }
  ];

  const optimizationStrategies = [
    {
      strategy: "Conversational Keywords",
      description: "Optimize for how people actually speak, not just type",
      traditional: "houston dentist",
      voiceOptimized: "dentist near me in Houston",
      implementation: [
        "Research conversational long-tail keywords",
        "Include question-based keywords",
        "Use natural language patterns",
        "Focus on 'near me' searches"
      ],
      tools: ["Answer the Public", "ChatGPT for questions", "Google Keyword Planner"]
    },
    {
      strategy: "Local Intent Optimization",
      description: "Target location-specific voice queries with AI-powered local content",
      traditional: "plumber Houston",
      voiceOptimized: "emergency plumber open now near Heights Houston",
      implementation: [
        "Create neighborhood-specific pages",
        "Optimize for 'open now' queries",
        "Include service area details",
        "Add local landmarks and references"
      ],
      tools: ["BrightLocal", "Google My Business", "Local keyword tools"]
    },
    {
      strategy: "Featured Snippet Optimization",
      description: "Structure content to win position zero for voice search results",
      traditional: "What is SEO?",
      voiceOptimized: "What is SEO and how does it help Houston businesses?",
      implementation: [
        "Create FAQ-style content",
        "Use structured data markup",
        "Answer questions directly and concisely",
        "Format content in lists and tables"
      ],
      tools: ["Schema markup generators", "Featured snippet tools", "AI content optimization"]
    },
    {
      strategy: "Mobile-First Optimization",
      description: "Ensure fast, mobile-friendly experiences for voice search users",
      traditional: "Desktop-focused website",
      voiceOptimized: "Mobile-first, fast-loading, voice-friendly site",
      implementation: [
        "Optimize page speed for mobile",
        "Ensure mobile-responsive design",
        "Implement click-to-call buttons",
        "Create easy navigation"
      ],
      tools: ["Google PageSpeed Insights", "Mobile-Friendly Test", "Core Web Vitals"]
    }
  ];

  const houstonVoiceQueries = [
    {
      category: "Restaurant Searches",
      queries: [
        "What's the best Tex-Mex restaurant in Houston?",
        "Find me a BBQ place open now near downtown Houston",
        "Where can I get good Vietnamese food in Houston?",
        "What restaurants deliver to Memorial area Houston?"
      ]
    },
    {
      category: "Service Searches", 
      queries: [
        "Find an emergency plumber in Houston",
        "What HVAC company serves Katy Houston?",
        "Where's the nearest car repair shop in Houston?",
        "Find a dentist taking new patients in The Woodlands"
      ]
    },
    {
      category: "Shopping Searches",
      queries: [
        "Where can I buy furniture in Houston today?",
        "Find a pharmacy open 24 hours in Houston",
        "What stores sell electronics near Galleria Houston?",
        "Where's the closest grocery store in Houston?"
      ]
    },
    {
      category: "Professional Services",
      queries: [
        "Find a real estate agent in Sugar Land Houston",
        "What law firm handles personal injury in Houston?",
        "Where can I find a CPA near me in Houston?",
        "Find a marketing consultant in Houston"
      ]
    }
  ];

  const aiOptimizationSteps = [
    {
      step: "AI-Powered Question Research",
      description: "Use AI to discover what voice questions your Houston customers are asking",
      duration: "2 hours",
      tasks: [
        "Analyze competitor voice search strategies with AI",
        "Generate question variations for your services", 
        "Identify local Houston-specific voice queries",
        "Create comprehensive question database"
      ]
    },
    {
      step: "Content Optimization with AI",
      description: "Transform existing content into voice search-friendly formats",
      duration: "4 hours",
      tasks: [
        "Rewrite content in conversational tone",
        "Create FAQ sections for each service page",
        "Generate local Houston context",
        "Optimize meta descriptions for voice"
      ]
    },
    {
      step: "Technical Implementation",
      description: "Implement technical changes for voice search success",
      duration: "3 hours",
      tasks: [
        "Add structured data markup",
        "Optimize for mobile voice search",
        "Improve page loading speeds",
        "Implement local business schema"
      ]
    },
    {
      step: "AI Monitoring & Optimization",
      description: "Use AI tools to track and improve voice search performance",
      duration: "1 hour weekly",
      tasks: [
        "Monitor voice search rankings",
        "Analyze featured snippet captures",
        "Track local voice search traffic",
        "Optimize based on performance data"
      ]
    }
  ];

  const beforeAfterCase = {
    business: "Houston Home Services Company",
    industry: "HVAC & Plumbing",
    before: {
      voiceSearchTraffic: "5% of total traffic",
      localCalls: "25 calls/month from search",
      featuredSnippets: "2 snippets captured",
      mobilePerformance: "Slow loading (4+ seconds)"
    },
    after: {
      voiceSearchTraffic: "35% of total traffic",
      localCalls: "180 calls/month from search", 
      featuredSnippets: "15 snippets captured",
      mobilePerformance: "Fast loading (<2 seconds)"
    },
    improvements: [
      "600% increase in voice search traffic",
      "620% more phone calls from search",
      "650% more featured snippet captures",
      "50% improvement in mobile performance"
    ],
    timeline: "Results achieved in 90 days"
  };

  const faqs = [
    {
      question: "How important is voice search optimization for Houston businesses?",
      answer: "Voice search is critical for Houston businesses. 58% of Houston adults use voice search daily, and 76% of voice searches are for local businesses. With Houston's mobile-first population and competitive market, voice search optimization can give you a significant advantage over competitors who aren't optimizing for voice queries."
    },
    {
      question: "What makes voice search different from regular SEO?",
      answer: "Voice search queries are longer, more conversational, and often location-specific. Instead of typing 'Houston dentist,' people ask 'Where's the best dentist near me in Houston?' Voice searchers want immediate, specific answers, making local optimization and featured snippets crucial for success."
    },
    {
      question: "How can AI help with voice search optimization?",
      answer: "AI excels at generating conversational content, identifying question patterns, and optimizing for natural language. It can analyze how people speak about your services, create FAQ content, and generate local variations of your content that match voice search patterns better than traditional SEO approaches."
    },
    {
      question: "How long does it take to see voice search optimization results?",
      answer: "Most Houston businesses see initial voice search improvements within 4-6 weeks, with significant results typically appearing in 60-90 days. Voice search optimization builds momentum over time as search engines recognize your content as authoritative for conversational queries."
    },
    {
      question: "Do I need different content for voice search vs. regular search?",
      answer: "You don't need completely different content, but you should optimize existing content for conversational queries. This means adding FAQ sections, using natural language, including local Houston references, and structuring content to answer specific questions directly and concisely."
    },
    {
      question: "How do I track voice search performance?",
      answer: "Track voice search through Google Search Console (look for longer, question-based queries), monitor featured snippet captures, analyze local search performance, and track phone calls from search. Many voice searches don't show up as 'voice search' specifically, but appear as longer, conversational queries."
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
                <Mic className="w-4 h-4 mr-2" />
                Voice Search SEO Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" data-testid="article-title">
                Voice Search Optimization for{" "}
                <span className="text-primary">Houston Businesses</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="article-subtitle">
                Master voice search optimization with AI to capture the 58% of Houston consumers using voice search daily. Complete guide with local strategies, proven techniques, and case studies showing 600% traffic increases.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  14 min read
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  January 5, 2025
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Houston Local Focus
                </div>
              </div>
              <Button asChild size="lg" data-testid="button-voice-optimization-audit">
                <a href="/contact">Get Free Voice Search Audit</a>
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
                Voice search is revolutionizing how Houston consumers find local businesses. With 58% of Houston adults using voice search daily and 76% of voice searches targeting local businesses, optimization is no longer optional—it's essential for competitive survival.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                This comprehensive guide reveals the exact voice search optimization strategies Houston businesses use to dominate local results, increase phone calls by 600%, and capture the growing voice search market before competitors catch on.
              </p>
            </div>
          </AnimatedSection>

          {/* Voice Search Statistics */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="voice-stats-title">
                Voice Search in Houston: The Numbers Don't Lie
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {voiceSearchStats.map((stat, index) => (
                  <Card key={index} className="p-6 text-center" data-testid={`voice-stat-${index}`}>
                    <div className="text-4xl font-bold text-primary mb-2">{stat.stat}</div>
                    <div className="text-sm text-muted-foreground mb-3">{stat.description}</div>
                    <div className="text-xs text-card-foreground font-semibold">{stat.insight}</div>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Common Houston Voice Queries */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="houston-queries-title">
                What Houston Consumers Ask Voice Assistants
              </h2>
              
              <div className="space-y-6">
                {houstonVoiceQueries.map((category, index) => (
                  <Card key={index} className="p-6" data-testid={`query-category-${index}`}>
                    <h3 className="text-xl font-bold text-card-foreground mb-4 flex items-center">
                      <Mic className="w-5 h-5 mr-2" />
                      {category.category}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {category.queries.map((query, queryIndex) => (
                        <div key={queryIndex} className="p-3 bg-muted/50 rounded-lg border">
                          <p className="text-sm text-muted-foreground italic">"{query}"</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Optimization Strategies */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="optimization-strategies-title">
                4 AI-Powered Voice Search Optimization Strategies
              </h2>
              
              <div className="space-y-8">
                {optimizationStrategies.map((strategy, index) => (
                  <Card key={index} className="p-8" data-testid={`strategy-${index}`}>
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-primary text-lg">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-card-foreground mb-3">{strategy.strategy}</h3>
                        <p className="text-muted-foreground mb-6">{strategy.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                            <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">Traditional Keyword:</h4>
                            <p className="text-red-700 dark:text-red-300 font-mono text-sm">"{strategy.traditional}"</p>
                          </div>
                          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                            <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">Voice Optimized:</h4>
                            <p className="text-green-700 dark:text-green-300 font-mono text-sm">"{strategy.voiceOptimized}"</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-card-foreground mb-3">Implementation Steps:</h4>
                            <ul className="space-y-2">
                              {strategy.implementation.map((step, stepIndex) => (
                                <li key={stepIndex} className="flex items-start text-sm text-muted-foreground">
                                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                  {step}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-card-foreground mb-3">Recommended Tools:</h4>
                            <div className="space-y-2">
                              {strategy.tools.map((tool, toolIndex) => (
                                <Badge key={toolIndex} variant="secondary" className="mr-2">{tool}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* AI Implementation Steps */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="ai-implementation-title">
                4-Step AI Voice Search Implementation Plan
              </h2>
              
              <div className="space-y-6">
                {aiOptimizationSteps.map((step, index) => (
                  <Card key={index} className="p-6" data-testid={`ai-step-${index}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-primary">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold text-card-foreground">{step.step}</h3>
                          <Badge variant="secondary" className="text-primary font-semibold">{step.duration}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-4">{step.description}</p>
                        <ul className="space-y-2">
                          {step.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="flex items-start text-sm text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Case Study */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="case-study-title">
                Houston Business Voice Search Transformation
              </h2>
              
              <Card className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground">{beforeAfterCase.business}</h3>
                    <Badge variant="secondary">{beforeAfterCase.industry}</Badge>
                  </div>
                  <Badge variant="outline" className="text-primary font-bold">{beforeAfterCase.timeline}</Badge>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8 mb-6">
                  <div className="p-6 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="text-lg font-bold text-card-foreground mb-4 flex items-center">
                      <Search className="w-5 h-5 mr-2" />
                      Before Voice Optimization
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div><strong>Voice Search Traffic:</strong> {beforeAfterCase.before.voiceSearchTraffic}</div>
                      <div><strong>Local Calls:</strong> {beforeAfterCase.before.localCalls}</div>
                      <div><strong>Featured Snippets:</strong> {beforeAfterCase.before.featuredSnippets}</div>
                      <div><strong>Mobile Performance:</strong> {beforeAfterCase.before.mobilePerformance}</div>
                    </div>
                  </div>

                  <div className="p-6 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="text-lg font-bold text-card-foreground mb-4 flex items-center">
                      <Mic className="w-5 h-5 mr-2" />
                      After Voice Optimization
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div><strong>Voice Search Traffic:</strong> {beforeAfterCase.after.voiceSearchTraffic}</div>
                      <div><strong>Local Calls:</strong> {beforeAfterCase.after.localCalls}</div>
                      <div><strong>Featured Snippets:</strong> {beforeAfterCase.after.featuredSnippets}</div>
                      <div><strong>Mobile Performance:</strong> {beforeAfterCase.after.mobilePerformance}</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="text-lg font-bold text-primary mb-3 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Key Improvements
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {beforeAfterCase.improvements.map((improvement, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground font-semibold">{improvement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
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
              Ready to Capture Houston's Voice Search Market?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Don't let competitors capture the 58% of Houston consumers using voice search. Get a personalized voice search optimization plan and start dominating conversational queries today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" data-testid="button-voice-audit">
                <a href="/contact">Get Free Voice Search Audit</a>
              </Button>
              <Button asChild variant="outline" size="lg" data-testid="button-voice-workshop">
                <a href="/ai-training">Join Voice Search Workshop</a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              ✅ Free audit includes voice search opportunity analysis and optimization roadmap
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}