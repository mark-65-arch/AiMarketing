import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { 
  UtensilsCrossed, 
  Clock, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  BarChart3,
  Star,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  CheckCircle,
  Phone,
  Mail,
  Globe,
  DollarSign
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

export default function HowAIHelpsHoustonRestaurants() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const aiApplications = [
    {
      title: "Automated Customer Service",
      description: "AI chatbots handle 70% of customer inquiries instantly",
      benefits: ["24/7 availability", "Instant responses", "Multilingual support", "Order taking"],
      roi: "350% increase in customer satisfaction",
      implementation: "2-3 days setup",
      cost: "$50-100/month",
      icon: MessageSquare
    },
    {
      title: "Predictive Menu Optimization",
      description: "AI analyzes sales data to optimize menu items and pricing",
      benefits: ["Identify top performers", "Optimize pricing", "Reduce waste", "Seasonal adjustments"],
      roi: "25% increase in profit margins",
      implementation: "1-2 weeks",
      cost: "$200-300/month",
      icon: BarChart3
    },
    {
      title: "Personalized Marketing",
      description: "AI creates targeted campaigns based on customer preferences",
      benefits: ["Email personalization", "Social media automation", "Loyalty program optimization", "Event promotion"],
      roi: "400% increase in email open rates",
      implementation: "1 week",
      cost: "$100-200/month",
      icon: TrendingUp
    },
    {
      title: "Staff Scheduling Optimization",
      description: "AI predicts busy periods and optimizes staff schedules",
      benefits: ["Reduce labor costs", "Improve service levels", "Prevent understaffing", "Employee satisfaction"],
      roi: "20% reduction in labor costs",
      implementation: "2 weeks",
      cost: "$150-250/month",
      icon: Calendar
    }
  ];

  const successStories = [
    {
      name: "Tex-Mex Family Restaurant",
      location: "Heights, Houston",
      challenge: "Struggling with phone orders and customer service during peak hours",
      solution: "Implemented AI chatbot for order taking and customer service",
      results: [
        "320% increase in online orders",
        "18 hours per week saved on phone calls",
        "400% improvement in customer response time",
        "95% customer satisfaction with AI service"
      ],
      revenue: "+$45,000/month additional revenue"
    },
    {
      name: "Houston BBQ Joint",
      location: "Downtown Houston",
      challenge: "Food waste and unpredictable demand patterns",
      solution: "AI-powered demand forecasting and inventory management",
      results: [
        "35% reduction in food waste",
        "25% improvement in profit margins",
        "Better preparation planning",
        "Consistent food availability"
      ],
      revenue: "+$28,000/month cost savings"
    },
    {
      name: "Fine Dining Restaurant",
      location: "Galleria, Houston",
      challenge: "Low reservation rates and poor online presence",
      solution: "AI-powered social media marketing and reservation optimization",
      results: [
        "250% increase in reservations",
        "500% growth in social media engagement",
        "40% increase in average table spend",
        "98% positive review response rate"
      ],
      revenue: "+$75,000/month additional revenue"
    }
  ];

  const implementationSteps = [
    {
      week: "Week 1",
      title: "Assessment & Planning",
      tasks: [
        "Analyze current operations and pain points",
        "Identify highest-impact AI opportunities",
        "Set up tracking systems for ROI measurement",
        "Create implementation timeline and budget"
      ]
    },
    {
      week: "Week 2-3",
      title: "Customer Service Automation",
      tasks: [
        "Install AI chatbot on website and social media",
        "Set up automated phone system",
        "Train AI on menu items and common questions",
        "Test order taking and customer service flows"
      ]
    },
    {
      week: "Week 4-5", 
      title: "Marketing Automation",
      tasks: [
        "Set up email marketing automation",
        "Implement social media scheduling",
        "Create personalized loyalty program",
        "Launch targeted advertising campaigns"
      ]
    },
    {
      week: "Week 6-8",
      title: "Operations Optimization",
      tasks: [
        "Implement demand forecasting",
        "Optimize staff scheduling",
        "Set up inventory management alerts",
        "Launch review response automation"
      ]
    }
  ];

  const faqs = [
    {
      question: "How much does AI implementation cost for a Houston restaurant?",
      answer: "Most Houston restaurants can start with AI for $200-500 per month. This includes chatbot setup ($50-100), marketing automation ($100-200), and basic analytics ($50-200). The ROI typically pays for itself within 30-60 days through increased orders and operational savings."
    },
    {
      question: "Will AI replace my restaurant staff?",
      answer: "No, AI enhances your staff rather than replacing them. AI handles repetitive tasks like taking phone orders, scheduling reservations, and responding to basic questions, freeing your staff to focus on food preparation, customer service, and creating great dining experiences."
    },
    {
      question: "How long before I see results from restaurant AI?",
      answer: "Most Houston restaurants see immediate results with customer service automation (within days), while marketing and operational improvements typically show within 2-4 weeks. Full optimization usually takes 60-90 days depending on implementation scope."
    },
    {
      question: "Can AI handle multiple languages for Houston's diverse population?",
      answer: "Absolutely! AI chatbots can communicate in Spanish, English, and other languages common in Houston. This is particularly valuable for restaurants serving diverse communities, helping you serve customers in their preferred language 24/7."
    },
    {
      question: "What if my restaurant doesn't have technical staff?",
      answer: "Most restaurant AI tools are designed for non-technical users with simple interfaces. Additionally, our Houston team provides hands-on setup and training. You don't need technical expertise - just willingness to learn new tools that will grow your business."
    },
    {
      question: "How does AI help with Houston's competitive restaurant market?",
      answer: "AI gives Houston restaurants a significant competitive advantage through faster customer service, better marketing targeting, optimized operations, and consistent quality. Restaurants using AI typically see 2-3x growth compared to competitors using only traditional methods."
    }
  ];

  const relatedArticles = [
    {
      title: "AI Marketing vs Traditional Marketing for Houston Businesses",
      excerpt: "Compare costs, results, and implementation timeline for AI vs traditional marketing",
      url: "/ai-vs-traditional-marketing",
      readTime: "15 min"
    },
    {
      title: "Complete Guide to AI Marketing for Houston Businesses",
      excerpt: "Comprehensive 50-page guide covering AI marketing from basics to advanced strategies",
      url: "/houston-ai-marketing-guide", 
      readTime: "45 min"
    },
    {
      title: "30-Day AI Marketing Implementation Checklist",
      excerpt: "Step-by-step checklist to implement AI marketing in 30 days with guaranteed results",
      url: "/ai-marketing-checklist",
      readTime: "20 min"
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
                <UtensilsCrossed className="w-4 h-4 mr-2" />
                Restaurant Industry Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" data-testid="article-title">
                How AI Marketing Helps{" "}
                <span className="text-primary">Houston Restaurants</span> Grow
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="article-subtitle">
                Discover how Houston restaurants are using AI to increase orders by 320%, save 18+ hours per week, and compete with delivery giants. Real case studies, implementation guides, and ROI analysis included.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  12 min read
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  January 15, 2025
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Houston Restaurant Focus
                </div>
              </div>
              <Button asChild size="lg" data-testid="button-get-restaurant-guide">
                <a href="/contact">Get Free Restaurant AI Guide</a>
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
                Houston's restaurant industry is more competitive than ever. With over 8,000 restaurants in the metro area competing for customers, traditional marketing methods are no longer enough. The restaurants that are thriving aren't just serving great food—they're leveraging artificial intelligence to automate operations, personalize customer experiences, and optimize every aspect of their business.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                This comprehensive guide reveals exactly how Houston restaurants are using AI to increase revenue by 300-400%, save 15+ hours per week, and build loyal customer bases in one of America's most diverse food markets.
              </p>
            </div>
          </AnimatedSection>

          {/* Houston Restaurant Market Overview */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="market-overview-title">
                The Houston Restaurant Landscape: Challenges & Opportunities
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-card-foreground mb-4 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                    Market Statistics
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 8,000+ restaurants in Houston metro</li>
                    <li>• $12 billion annual food service revenue</li>
                    <li>• 85% of customers research restaurants online</li>
                    <li>• 73% order delivery at least weekly</li>
                    <li>• Average profit margins: 3-5%</li>
                  </ul>
                </Card>
                
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-card-foreground mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-primary" />
                    Key Challenges
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• High competition and customer acquisition costs</li>
                    <li>• Staff shortages and high turnover</li>
                    <li>• Rising food and labor costs</li>
                    <li>• Delivery platform commission fees (20-30%)</li>
                    <li>• Difficulty reaching diverse Houston demographics</li>
                  </ul>
                </Card>
              </div>
              
              <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="text-xl font-bold text-foreground mb-4">The AI Opportunity</h3>
                <p className="text-muted-foreground">
                  Only 15% of Houston restaurants currently use AI marketing and automation. Early adopters are seeing 300-400% revenue increases while reducing operational costs by 20-30%. The window for competitive advantage is still open, but it's closing fast as more restaurants discover AI's potential.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* AI Applications for Restaurants */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="ai-applications-title">
                4 Ways AI Transforms Houston Restaurant Operations
              </h2>
              
              <div className="space-y-8">
                {aiApplications.map((application, index) => (
                  <Card key={index} className="p-8" data-testid={`ai-application-${index}`}>
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <application.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-card-foreground mb-3">{application.title}</h3>
                        <p className="text-muted-foreground mb-6">{application.description}</p>
                        
                        <div className="grid md:grid-cols-3 gap-6 mb-6">
                          <div>
                            <h4 className="font-semibold text-card-foreground mb-3">Key Benefits:</h4>
                            <ul className="space-y-2">
                              {application.benefits.map((benefit, benefitIndex) => (
                                <li key={benefitIndex} className="flex items-center text-sm text-muted-foreground">
                                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-card-foreground mb-3">Implementation:</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              <strong>Timeline:</strong> {application.implementation}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              <strong>Cost:</strong> {application.cost}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-card-foreground mb-3">ROI Impact:</h4>
                            <p className="text-lg font-bold text-primary">{application.roi}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Success Stories */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="success-stories-title">
                Real Houston Restaurant Success Stories
              </h2>
              
              <div className="space-y-8">
                {successStories.map((story, index) => (
                  <Card key={index} className="p-8" data-testid={`success-story-${index}`}>
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-card-foreground">{story.name}</h3>
                        <p className="text-muted-foreground flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {story.location}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-primary font-bold">
                        {story.revenue}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-card-foreground mb-3">The Challenge:</h4>
                        <p className="text-muted-foreground">{story.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-card-foreground mb-3">AI Solution:</h4>
                        <p className="text-muted-foreground">{story.solution}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-3">Results After 90 Days:</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {story.results.map((result, resultIndex) => (
                          <div key={resultIndex} className="flex items-center">
                            <TrendingUp className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Implementation Guide */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="implementation-title">
                8-Week Restaurant AI Implementation Plan
              </h2>
              
              <div className="space-y-6">
                {implementationSteps.map((step, index) => (
                  <Card key={index} className="p-6" data-testid={`implementation-step-${index}`}>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                        <span className="font-bold text-primary">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-card-foreground">{step.title}</h3>
                        <p className="text-muted-foreground">{step.week}</p>
                      </div>
                    </div>
                    <div className="ml-14">
                      <ul className="space-y-2">
                        {step.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-1 flex-shrink-0" />
                            <span className="text-muted-foreground">{task}</span>
                          </li>
                        ))}
                      </ul>
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

          {/* Related Articles */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="related-articles-title">
                Related Articles
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((article, index) => (
                  <Card key={index} className="hover-lift" data-testid={`related-article-${index}`}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-card-foreground mb-3">
                        <a href={article.url} className="hover:text-primary transition-colors">
                          {article.title}
                        </a>
                      </h3>
                      <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{article.readTime}</Badge>
                        <Button asChild variant="outline" size="sm">
                          <a href={article.url}>Read More</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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
              Ready to Transform Your Houston Restaurant with AI?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join 25+ Houston restaurants already using AI to increase revenue and reduce costs. Get a personalized implementation plan designed specifically for your restaurant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" data-testid="button-restaurant-consultation">
                <a href="/contact">Get Free Restaurant AI Consultation</a>
              </Button>
              <Button asChild variant="outline" size="lg" data-testid="button-restaurant-workshop">
                <a href="/ai-training">Join Restaurant AI Workshop</a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              ✅ Free consultation includes personalized AI roadmap for your restaurant • No obligation
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}