import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Brain, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Users, 
  BarChart3,
  Star,
  Calendar,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  CheckCircle,
  X,
  Zap,
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

export default function AIVsTraditionalMarketing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const comparisonPoints = [
    {
      category: "Cost Efficiency",
      traditional: {
        description: "High upfront costs with uncertain returns",
        details: [
          "$5,000-15,000+ monthly advertising spend",
          "20-30% waste on untargeted audiences",
          "No real-time optimization",
          "Manual campaign management costs"
        ],
        rating: 2
      },
      ai: {
        description: "Lower costs with precision targeting and optimization",
        details: [
          "$500-2,000 monthly tool costs",
          "5-10% waste due to precise targeting",
          "Automated optimization reduces waste",
          "Self-managing campaigns"
        ],
        rating: 5
      }
    },
    {
      category: "Time Investment", 
      traditional: {
        description: "Requires 20-30 hours per week of manual work",
        details: [
          "Manual content creation (10+ hours)",
          "Campaign monitoring (8+ hours)", 
          "Customer service (15+ hours)",
          "Analysis and reporting (5+ hours)"
        ],
        rating: 1
      },
      ai: {
        description: "Automated systems require 2-5 hours per week",
        details: [
          "AI content generation (1-2 hours)",
          "Automated monitoring (0.5 hours)",
          "AI chatbot handles inquiries (0 hours)",
          "Automated reports (0.5 hours)"
        ],
        rating: 5
      }
    },
    {
      category: "Targeting Precision",
      traditional: {
        description: "Broad demographic targeting with limited personalization",
        details: [
          "Basic demographic filters",
          "One-size-fits-all messaging",
          "Limited audience insights",
          "Manual segmentation"
        ],
        rating: 2
      },
      ai: {
        description: "Hyper-targeted campaigns with individual personalization", 
        details: [
          "Behavioral and predictive targeting",
          "Personalized content for each user",
          "Real-time audience insights",
          "Automated micro-segmentation"
        ],
        rating: 5
      }
    },
    {
      category: "Scalability",
      traditional: {
        description: "Linear growth requires proportional resource increase",
        details: [
          "More customers = more staff needed",
          "Manual processes don't scale",
          "Quality decreases with volume",
          "Higher costs per customer"
        ],
        rating: 2
      },
      ai: {
        description: "Exponential growth with minimal resource increase",
        details: [
          "AI handles unlimited customers",
          "Automated processes scale infinitely",
          "Quality maintains or improves",
          "Lower costs per customer at scale"
        ],
        rating: 5
      }
    }
  ];

  const roiComparison = [
    {
      metric: "Customer Acquisition Cost",
      traditional: "$150-300",
      ai: "$25-75",
      improvement: "75% reduction"
    },
    {
      metric: "Lead Conversion Rate",
      traditional: "2-5%",
      ai: "8-15%",
      improvement: "200% increase"
    },
    {
      metric: "Customer Lifetime Value",
      traditional: "$1,200",
      ai: "$2,800",
      improvement: "133% increase"
    },
    {
      metric: "Marketing ROI",
      traditional: "3:1",
      ai: "12:1",
      improvement: "300% increase"
    },
    {
      metric: "Time to Results",
      traditional: "3-6 months",
      ai: "2-4 weeks",
      improvement: "80% faster"
    }
  ];

  const houstonCaseStudies = [
    {
      business: "Houston HVAC Company",
      industry: "Home Services",
      traditionalApproach: {
        method: "Yellow Pages ads, radio spots, door hangers",
        monthlySpend: "$8,000",
        leads: "45 leads/month",
        costPerLead: "$178",
        conversion: "12%"
      },
      aiApproach: {
        method: "AI-powered Google Ads, chatbot, email automation",
        monthlySpend: "$2,500", 
        leads: "180 leads/month",
        costPerLead: "$14",
        conversion: "28%"
      },
      results: "320% more leads, 87% lower cost per lead, $35K additional monthly revenue"
    },
    {
      business: "Houston Real Estate Team",
      industry: "Real Estate",
      traditionalApproach: {
        method: "Print ads, direct mail, networking events",
        monthlySpend: "$12,000",
        leads: "25 qualified leads/month",
        costPerLead: "$480", 
        conversion: "8%"
      },
      aiApproach: {
        method: "AI lead scoring, personalized email sequences, predictive analytics",
        monthlySpend: "$3,200",
        leads: "95 qualified leads/month",
        costPerLead: "$34",
        conversion: "22%"
      },
      results: "280% more leads, 93% lower cost per lead, closed 15 additional homes/month"
    },
    {
      business: "Houston Restaurant Group",
      industry: "Food & Beverage",
      traditionalApproach: {
        method: "Local newspaper ads, coupon mailers, social media posts",
        monthlySpend: "$5,500",
        leads: "120 new customers/month",
        costPerLead: "$46",
        conversion: "15%"
      },
      aiApproach: {
        method: "AI chatbot orders, personalized promotions, automated reviews",
        monthlySpend: "$1,800",
        leads: "450 new customers/month", 
        costPerLead: "$4",
        conversion: "35%"
      },
      results: "275% more customers, 91% lower acquisition cost, $28K additional monthly revenue"
    }
  ];

  const implementationTimeline = [
    {
      phase: "Traditional Marketing Setup",
      timeframe: "3-6 months",
      activities: [
        "Market research and planning (4-6 weeks)",
        "Creative development (3-4 weeks)",
        "Media buying and placement (2-3 weeks)", 
        "Campaign launch and optimization (4-8 weeks)",
        "First meaningful results (12-24 weeks)"
      ],
      cost: "$15,000-50,000",
      roi: "Break-even at 6-12 months"
    },
    {
      phase: "AI Marketing Setup",
      timeframe: "2-4 weeks",
      activities: [
        "AI tool selection and setup (1 week)",
        "Data integration and training (1 week)",
        "Campaign automation setup (3-5 days)",
        "Testing and optimization (2-3 days)",
        "First meaningful results (1-2 weeks)"
      ],
      cost: "$2,000-8,000",
      roi: "Break-even at 4-8 weeks"
    }
  ];

  const faqs = [
    {
      question: "Is AI marketing really more cost-effective than traditional marketing for Houston businesses?",
      answer: "Yes, significantly. Our Houston clients typically see 70-90% reduction in marketing costs while achieving 200-400% better results. AI eliminates waste through precise targeting and automation, while traditional marketing relies on broad reach with high waste rates."
    },
    {
      question: "How long does it take to switch from traditional to AI marketing?",
      answer: "Most Houston businesses can transition in 2-4 weeks. Unlike traditional marketing that requires months of planning and creative development, AI marketing tools can be set up and generating results within days. You can also run both simultaneously during transition."
    },
    {
      question: "Will AI marketing work for my specific Houston industry?",
      answer: "AI marketing works across all industries but excels in competitive Houston markets like real estate, restaurants, HVAC, legal services, and healthcare. The more competitive your industry, the bigger the advantage AI provides through better targeting and personalization."
    },
    {
      question: "Do I need to eliminate traditional marketing completely?",
      answer: "Not necessarily. Many successful Houston businesses use a hybrid approach - AI for precision targeting and automation, traditional marketing for brand awareness and local community presence. The key is allocating budget based on ROI, which typically favors AI by 3-4x."
    },
    {
      question: "What if my Houston customers prefer traditional marketing approaches?",
      answer: "Houston demographics show 85% of consumers research businesses online before buying, regardless of age. AI doesn't change your message or brand - it delivers it more effectively to the right people at the right time. Your customers will see better, more relevant experiences."
    },
    {
      question: "How much should I budget for transitioning to AI marketing?",
      answer: "Most Houston businesses start with $500-2,000/month for AI tools and can scale up. This is typically 50-80% less than traditional marketing spend while generating better results. Many businesses fund the transition from savings in their first month of AI implementation."
    }
  ];

  const relatedResources = [
    {
      title: "Complete Guide to AI Marketing for Houston Businesses",
      description: "50-page comprehensive guide covering AI marketing from basics to advanced strategies",
      url: "/houston-ai-marketing-guide",
      type: "Complete Guide"
    },
    {
      title: "30-Day AI Marketing Implementation Checklist",
      description: "Step-by-step checklist to transition from traditional to AI marketing in 30 days",
      url: "/ai-marketing-checklist", 
      type: "Action Plan"
    },
    {
      title: "Essential AI Tools Every Small Business Should Use",
      description: "Curated list of AI tools with pricing, features, and Houston business case studies",
      url: "/ai-tools-small-business",
      type: "Tool Directory"
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
                <Brain className="w-4 h-4 mr-2" />
                Marketing Strategy Comparison
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" data-testid="article-title">
                AI Marketing vs Traditional Marketing:{" "}
                <span className="text-primary">What Houston Businesses</span> Need to Know
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="article-subtitle">
                Complete cost, ROI, and results comparison between AI marketing and traditional marketing. Real Houston business case studies show 300-400% better results with 70% lower costs using AI approaches.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  15 min read
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  January 12, 2025
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  ROI Analysis Included
                </div>
              </div>
              <Button asChild size="lg" data-testid="button-get-comparison-guide">
                <a href="/contact">Get Free Marketing Strategy Assessment</a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="prose prose-lg max-w-none mb-16">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Houston businesses are at a crossroads. Traditional marketing methods that worked for decades are becoming increasingly expensive and less effective. Meanwhile, artificial intelligence is revolutionizing how businesses reach, engage, and convert customers.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                This comprehensive analysis compares AI marketing and traditional marketing across cost, effectiveness, time investment, and scalability. Using real data from 50+ Houston businesses, we'll show you exactly why AI marketing delivers 300-400% better ROI while costing 70% less than traditional approaches.
              </p>
            </div>
          </AnimatedSection>

          {/* Quick Comparison */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center" data-testid="quick-comparison-title">
                AI vs Traditional Marketing: Quick Comparison
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="p-8 border-2 border-red-200 dark:border-red-800">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <X className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-card-foreground">Traditional Marketing</h3>
                    <p className="text-red-600 font-semibold">The Old Way</p>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <X className="w-4 h-4 text-red-600 mr-3" />
                      <span className="text-muted-foreground">$5,000-15,000+ monthly spend</span>
                    </li>
                    <li className="flex items-center">
                      <X className="w-4 h-4 text-red-600 mr-3" />
                      <span className="text-muted-foreground">20-30 hours per week manual work</span>
                    </li>
                    <li className="flex items-center">
                      <X className="w-4 h-4 text-red-600 mr-3" />
                      <span className="text-muted-foreground">3-6 months to see results</span>
                    </li>
                    <li className="flex items-center">
                      <X className="w-4 h-4 text-red-600 mr-3" />
                      <span className="text-muted-foreground">2-5% conversion rates</span>
                    </li>
                    <li className="flex items-center">
                      <X className="w-4 h-4 text-red-600 mr-3" />
                      <span className="text-muted-foreground">Limited targeting precision</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-8 border-2 border-green-200 dark:border-green-800">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-card-foreground">AI Marketing</h3>
                    <p className="text-green-600 font-semibold">The Smart Way</p>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
                      <span className="text-muted-foreground">$500-2,000 monthly investment</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
                      <span className="text-muted-foreground">2-5 hours per week oversight</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
                      <span className="text-muted-foreground">2-4 weeks to see results</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
                      <span className="text-muted-foreground">8-15% conversion rates</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
                      <span className="text-muted-foreground">Hyper-precise targeting</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </AnimatedSection>

          {/* Detailed Comparison */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="detailed-comparison-title">
                Detailed Performance Comparison
              </h2>
              
              <div className="space-y-8">
                {comparisonPoints.map((comparison, index) => (
                  <Card key={index} className="p-8" data-testid={`comparison-${index}`}>
                    <h3 className="text-2xl font-bold text-card-foreground mb-6 text-center">{comparison.category}</h3>
                    
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div className="p-6 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-bold text-card-foreground">Traditional Marketing</h4>
                          <div className="flex gap-1">
                            {[1,2,3,4,5].map((star) => (
                              <Star key={star} className={`w-4 h-4 ${star <= comparison.traditional.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4">{comparison.traditional.description}</p>
                        <ul className="space-y-2">
                          {comparison.traditional.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start">
                              <X className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-6 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-bold text-card-foreground">AI Marketing</h4>
                          <div className="flex gap-1">
                            {[1,2,3,4,5].map((star) => (
                              <Star key={star} className={`w-4 h-4 ${star <= comparison.ai.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4">{comparison.ai.description}</p>
                        <ul className="space-y-2">
                          {comparison.ai.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{detail}</span>
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

          {/* ROI Comparison */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="roi-comparison-title">
                ROI & Performance Metrics Comparison
              </h2>
              
              <Card className="p-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 font-bold text-card-foreground">Metric</th>
                        <th className="text-center p-4 font-bold text-red-600">Traditional</th>
                        <th className="text-center p-4 font-bold text-green-600">AI Marketing</th>
                        <th className="text-center p-4 font-bold text-primary">Improvement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roiComparison.map((row, index) => (
                        <tr key={index} className="border-b border-border/50" data-testid={`roi-row-${index}`}>
                          <td className="p-4 font-semibold text-card-foreground">{row.metric}</td>
                          <td className="p-4 text-center text-red-600">{row.traditional}</td>
                          <td className="p-4 text-center text-green-600">{row.ai}</td>
                          <td className="p-4 text-center">
                            <Badge variant="default" className="font-bold">{row.improvement}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </AnimatedSection>

          {/* Houston Case Studies */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="case-studies-title">
                Real Houston Business Transformations
              </h2>
              
              <div className="space-y-8">
                {houstonCaseStudies.map((study, index) => (
                  <Card key={index} className="p-8" data-testid={`case-study-${index}`}>
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-card-foreground">{study.business}</h3>
                      <Badge variant="secondary">{study.industry}</Badge>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-8 mb-6">
                      <div className="p-6 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                        <h4 className="text-lg font-bold text-card-foreground mb-4 flex items-center">
                          <X className="w-5 h-5 text-red-600 mr-2" />
                          Traditional Approach
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div><strong>Method:</strong> {study.traditionalApproach.method}</div>
                          <div><strong>Monthly Spend:</strong> {study.traditionalApproach.monthlySpend}</div>
                          <div><strong>Leads Generated:</strong> {study.traditionalApproach.leads}</div>
                          <div><strong>Cost Per Lead:</strong> {study.traditionalApproach.costPerLead}</div>
                          <div><strong>Conversion Rate:</strong> {study.traditionalApproach.conversion}</div>
                        </div>
                      </div>

                      <div className="p-6 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                        <h4 className="text-lg font-bold text-card-foreground mb-4 flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          AI Approach
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div><strong>Method:</strong> {study.aiApproach.method}</div>
                          <div><strong>Monthly Spend:</strong> {study.aiApproach.monthlySpend}</div>
                          <div><strong>Leads Generated:</strong> {study.aiApproach.leads}</div>
                          <div><strong>Cost Per Lead:</strong> {study.aiApproach.costPerLead}</div>
                          <div><strong>Conversion Rate:</strong> {study.aiApproach.conversion}</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                      <h4 className="text-lg font-bold text-primary mb-2 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        90-Day Results
                      </h4>
                      <p className="text-muted-foreground font-semibold">{study.results}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Implementation Timeline */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="implementation-timeline-title">
                Implementation Timeline & Investment Comparison
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {implementationTimeline.map((timeline, index) => (
                  <Card key={index} className={`p-8 ${index === 1 ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/50' : 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/50'}`} data-testid={`timeline-${index}`}>
                    <div className="flex items-center mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${index === 1 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                        {index === 1 ? <Zap className="w-6 h-6 text-green-600" /> : <Clock className="w-6 h-6 text-red-600" />}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-card-foreground">{timeline.phase}</h3>
                        <p className={`font-semibold ${index === 1 ? 'text-green-600' : 'text-red-600'}`}>{timeline.timeframe}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      {timeline.activities.map((activity, activityIndex) => (
                        <div key={activityIndex} className="flex items-start">
                          <div className={`w-2 h-2 rounded-full mr-3 mt-2 ${index === 1 ? 'bg-green-600' : 'bg-red-600'}`}></div>
                          <span className="text-sm text-muted-foreground">{activity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-card-foreground">Total Investment:</span>
                        <span className={`font-bold text-lg ${index === 1 ? 'text-green-600' : 'text-red-600'}`}>{timeline.cost}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-card-foreground">Expected ROI:</span>
                        <span className={`font-bold ${index === 1 ? 'text-green-600' : 'text-red-600'}`}>{timeline.roi}</span>
                      </div>
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

          {/* Related Resources */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="related-resources-title">
                Related Resources
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {relatedResources.map((resource, index) => (
                  <Card key={index} className="hover-lift" data-testid={`related-resource-${index}`}>
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-3">{resource.type}</Badge>
                      <h3 className="text-lg font-bold text-card-foreground mb-3">
                        <a href={resource.url} className="hover:text-primary transition-colors">
                          {resource.title}
                        </a>
                      </h3>
                      <p className="text-muted-foreground mb-4">{resource.description}</p>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <a href={resource.url}>Access Resource</a>
                      </Button>
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
              Ready to Make the Switch to AI Marketing?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join 50+ Houston businesses already seeing 300-400% better results with AI marketing. Get a personalized comparison and transition plan for your specific business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" data-testid="button-marketing-assessment">
                <a href="/contact">Get Free Marketing Assessment</a>
              </Button>
              <Button asChild variant="outline" size="lg" data-testid="button-ai-workshop">
                <a href="/ai-training">Join AI Marketing Workshop</a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              ✅ Free assessment includes personalized ROI projection and transition timeline
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}