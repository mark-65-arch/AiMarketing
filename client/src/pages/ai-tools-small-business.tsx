import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Wand2, 
  MessageSquare, 
  BarChart3, 
  Mail, 
  Camera, 
  Calendar, 
  Search, 
  Users,
  DollarSign,
  Star,
  CheckCircle,
  ExternalLink,
  Filter,
  ArrowRight,
  Clock,
  TrendingUp,
  Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const aiTools = [
  // Content Creation
  {
    id: 1,
    name: "ChatGPT",
    category: "Content Creation",
    pricing: "Free / $20/month",
    rating: 4.8,
    users: "100M+",
    description: "Create blog posts, social media content, ad copy, and email campaigns. Perfect for Houston businesses needing consistent content.",
    features: ["Blog post writing", "Social media captions", "Ad copy generation", "Email templates", "SEO optimization"],
    pros: ["Easy to use", "Versatile", "Great for beginners", "Affordable"],
    cons: ["Can be repetitive", "Requires good prompts"],
    bestFor: "Small businesses starting with AI content creation",
    houstonUseCase: "A Houston restaurant used ChatGPT to create daily social media posts, saving 10 hours per week.",
    implementation: "Start with simple prompts, build a prompt library, integrate with scheduling tools.",
    icon: Wand2,
    featured: true,
    budget: "starter"
  },
  {
    id: 2,
    name: "Jasper AI",
    category: "Content Creation",
    pricing: "$49/month",
    rating: 4.7,
    users: "105K+",
    description: "Advanced AI writing assistant with brand voice consistency and team collaboration features.",
    features: ["Brand voice training", "Long-form content", "Team collaboration", "Plagiarism checker", "50+ templates"],
    pros: ["Consistent brand voice", "Team features", "High quality output"],
    cons: ["More expensive", "Steeper learning curve"],
    bestFor: "Growing businesses with content teams",
    houstonUseCase: "Houston law firm increased content output by 400% while maintaining consistent brand voice.",
    implementation: "Train your brand voice, set up templates, integrate with content calendar.",
    icon: Wand2,
    featured: false,
    budget: "growth"
  },
  {
    id: 3,
    name: "Copy.ai",
    category: "Content Creation", 
    pricing: "$35/month",
    rating: 4.6,
    users: "50K+",
    description: "AI copywriting tool specialized in marketing copy, ads, and sales content.",
    features: ["Sales copy", "Facebook ads", "Email sequences", "Product descriptions", "Landing pages"],
    pros: ["Marketing-focused", "Great templates", "A/B test variations"],
    cons: ["Limited long-form content", "Subscription required"],
    bestFor: "E-commerce and service businesses",
    houstonUseCase: "Houston retail store improved ad conversion rates by 250% using AI-generated ad copy.",
    implementation: "Start with ad copy templates, test variations, scale what works.",
    icon: Wand2,
    featured: false,
    budget: "growth"
  },

  // Customer Service
  {
    id: 4,
    name: "Zendesk AI",
    category: "Customer Service",
    pricing: "$79/month",
    rating: 4.5,
    users: "100K+",
    description: "AI-powered customer service with smart ticket routing, chatbots, and sentiment analysis.",
    features: ["Smart routing", "AI chatbots", "Sentiment analysis", "Auto-responses", "Knowledge base AI"],
    pros: ["Enterprise features", "Great integrations", "Scalable"],
    cons: ["Complex setup", "Higher cost"],
    bestFor: "Businesses with high support volume",
    houstonUseCase: "Houston HVAC company reduced response time by 85% and increased customer satisfaction.",
    implementation: "Set up knowledge base, train chatbot, configure routing rules.",
    icon: MessageSquare,
    featured: true,
    budget: "scale"
  },
  {
    id: 5,
    name: "Intercom",
    category: "Customer Service",
    pricing: "$74/month",
    rating: 4.4,
    users: "25K+",
    description: "Conversational AI platform for customer messaging and support automation.",
    features: ["Live chat", "Bot automation", "Customer insights", "Product tours", "Help desk"],
    pros: ["Great UX", "Easy setup", "Powerful automation"],
    cons: ["Can get expensive", "Limited customization"],
    bestFor: "SaaS and online businesses",
    houstonUseCase: "Houston tech startup automated 70% of customer inquiries, freeing up team for complex issues.",
    implementation: "Install chat widget, set up common flows, train team on handoffs.",
    icon: MessageSquare,
    featured: false,
    budget: "growth"
  },
  {
    id: 6,
    name: "Tidio",
    category: "Customer Service",
    pricing: "Free / $29/month",
    rating: 4.7,
    users: "300K+",
    description: "Simple chatbot and live chat solution perfect for small businesses getting started with AI.",
    features: ["Live chat", "Chatbots", "Email integration", "Mobile app", "Visitor tracking"],
    pros: ["Easy to use", "Affordable", "Great for beginners"],
    cons: ["Limited advanced features", "Basic reporting"],
    bestFor: "Small businesses starting with chat",
    houstonUseCase: "Houston boutique increased online sales by 180% with automated product recommendations.",
    implementation: "Add chat widget, create basic flows, monitor and optimize.",
    icon: MessageSquare,
    featured: false,
    budget: "starter"
  },

  // Analytics & Insights
  {
    id: 7,
    name: "Google Analytics 4",
    category: "Analytics",
    pricing: "Free",
    rating: 4.3,
    users: "35M+",
    description: "AI-powered analytics with predictive insights and automated reporting for data-driven decisions.",
    features: ["Predictive metrics", "Smart insights", "Attribution modeling", "Audience insights", "Custom reports"],
    pros: ["Free", "Powerful AI features", "Google integration"],
    cons: ["Complex interface", "Steep learning curve"],
    bestFor: "All businesses with websites",
    houstonUseCase: "Houston e-commerce store identified high-value customers, increasing repeat purchases by 300%.",
    implementation: "Set up enhanced ecommerce, configure goals, use AI insights dashboard.",
    icon: BarChart3,
    featured: true,
    budget: "starter"
  },
  {
    id: 8,
    name: "Hotjar",
    category: "Analytics",
    pricing: "Free / $32/month",
    rating: 4.6,
    users: "900K+",
    description: "User behavior analytics with AI-powered insights into how customers interact with your website.",
    features: ["Heatmaps", "Session recordings", "Surveys", "Funnels", "AI insights"],
    pros: ["Visual insights", "Easy to understand", "Good free tier"],
    cons: ["Can slow site slightly", "Privacy considerations"],
    bestFor: "Businesses optimizing website UX",
    houstonUseCase: "Houston service company increased form completions by 225% using heatmap insights.",
    implementation: "Install tracking code, set up heatmaps, analyze user journeys.",
    icon: BarChart3,
    featured: false,
    budget: "growth"
  },

  // Email Marketing
  {
    id: 9,
    name: "Mailchimp",
    category: "Email Marketing",
    pricing: "Free / $13/month",
    rating: 4.5,
    users: "14M+",
    description: "AI-powered email marketing with smart recommendations, send time optimization, and automated campaigns.",
    features: ["Smart recommendations", "Send time optimization", "A/B testing", "Automation", "Audience insights"],
    pros: ["Easy to use", "Great automation", "Good free tier"],
    cons: ["Limited customization", "Pricing increases with size"],
    bestFor: "Small to medium businesses",
    houstonUseCase: "Houston fitness studio increased class bookings by 190% with automated email sequences.",
    implementation: "Import contacts, set up welcome series, use AI send time optimization.",
    icon: Mail,
    featured: true,
    budget: "starter"
  },
  {
    id: 10,
    name: "ConvertKit",
    category: "Email Marketing",
    pricing: "$25/month",
    rating: 4.6,
    users: "400K+",
    description: "Creator-focused email platform with AI tagging and advanced automation for content businesses.",
    features: ["AI tagging", "Visual automation", "Landing pages", "Commerce integration", "Creator tools"],
    pros: ["Great for creators", "Powerful automation", "Good deliverability"],
    cons: ["More expensive", "Less templates"],
    bestFor: "Content creators and coaches",
    houstonUseCase: "Houston business coach grew email list by 400% using AI-optimized lead magnets.",
    implementation: "Set up lead magnets, create automation sequences, use AI tagging.",
    icon: Mail,
    featured: false,
    budget: "growth"
  },

  // Social Media
  {
    id: 11,
    name: "Buffer",
    category: "Social Media",
    pricing: "Free / $15/month", 
    rating: 4.4,
    users: "140K+",
    description: "AI-powered social media scheduling with optimal posting times and content suggestions.",
    features: ["Smart scheduling", "Content suggestions", "Analytics", "Team collaboration", "AI assistant"],
    pros: ["Simple interface", "Great scheduling", "Affordable"],
    cons: ["Limited advanced features", "Basic analytics"],
    bestFor: "Small businesses managing multiple platforms",
    houstonUseCase: "Houston real estate agent doubled social media engagement with AI-optimized posting times.",
    implementation: "Connect accounts, use AI scheduling, analyze performance weekly.",
    icon: Calendar,
    featured: false,
    budget: "starter"
  },
  {
    id: 12,
    name: "Hootsuite",
    category: "Social Media",
    pricing: "$49/month",
    rating: 4.2,
    users: "18M+",
    description: "Comprehensive social media management with AI insights and automated publishing.",
    features: ["AI insights", "Bulk scheduling", "Social listening", "Team workflows", "Advanced analytics"],
    pros: ["Comprehensive features", "Good for teams", "Strong analytics"],
    cons: ["Can be complex", "Higher pricing"],
    bestFor: "Agencies and larger businesses",
    houstonUseCase: "Houston marketing agency managed 50+ client accounts efficiently with AI automation.",
    implementation: "Set up all client accounts, create content streams, use AI insights for optimization.",
    icon: Calendar,
    featured: false,
    budget: "scale"
  },

  // Local SEO
  {
    id: 13,
    name: "BrightLocal",
    category: "Local SEO",
    pricing: "$29/month",
    rating: 4.5,
    users: "50K+",
    description: "AI-powered local SEO tools for citation management, review monitoring, and ranking tracking.",
    features: ["Citation management", "Review monitoring", "Local rank tracking", "Audit tools", "Reporting"],
    pros: ["Local SEO focused", "Comprehensive tools", "Good reporting"],
    cons: ["Learning curve", "Feature overload"],
    bestFor: "Local businesses and agencies",
    houstonUseCase: "Houston plumber improved local rankings from page 3 to #1 in 6 weeks using citation audit.",
    implementation: "Audit current citations, fix inconsistencies, monitor rankings weekly.",
    icon: Search,
    featured: true,
    budget: "growth"
  },

  // Design & Creative
  {
    id: 14,
    name: "Canva AI",
    category: "Design",
    pricing: "Free / $15/month",
    rating: 4.7,
    users: "135M+",
    description: "AI-powered design platform for creating professional marketing materials without design skills.",
    features: ["AI design suggestions", "Magic resize", "Background removal", "Brand kit", "Templates"],
    pros: ["Very easy to use", "AI features", "Great templates"],
    cons: ["Limited customization", "Can look generic"],
    bestFor: "Non-designers creating marketing materials",
    houstonUseCase: "Houston food truck created professional social media presence, increasing followers by 300%.",
    implementation: "Set up brand colors, use AI templates, create content calendar designs.",
    icon: Camera,
    featured: false,
    budget: "starter"
  },
];

export default function AIToolsSmallBusiness() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBudget, setSelectedBudget] = useState<string>("all");

  const categories = ["all", "Content Creation", "Customer Service", "Analytics", "Email Marketing", "Social Media", "Local SEO", "Design"];
  const budgets = ["all", "starter", "growth", "scale"];

  const filteredTools = aiTools.filter(tool => {
    const categoryMatch = selectedCategory === "all" || tool.category === selectedCategory;
    const budgetMatch = selectedBudget === "all" || tool.budget === selectedBudget;
    return categoryMatch && budgetMatch;
  });

  const featuredTools = aiTools.filter(tool => tool.featured);

  const budgetGuides = [
    {
      title: "Starter Budget",
      budget: "$0-100/month",
      description: "Essential AI tools for small businesses just getting started",
      tools: ["ChatGPT", "Google Analytics 4", "Mailchimp", "Canva AI", "Tidio"],
      totalCost: "$67/month",
      expectedROI: "200-300% in 3 months"
    },
    {
      title: "Growth Budget", 
      budget: "$200-500/month",
      description: "Comprehensive AI toolkit for scaling businesses",
      tools: ["Jasper AI", "Intercom", "ConvertKit", "BrightLocal", "Hotjar"],
      totalCost: "$423/month",
      expectedROI: "400-500% in 6 months"
    },
    {
      title: "Scale Budget",
      budget: "$500-1000/month",
      description: "Enterprise-grade AI tools for established businesses",
      tools: ["Zendesk AI", "Hootsuite", "Advanced Analytics", "Team Licenses"],
      totalCost: "$847/month",
      expectedROI: "600-800% in 12 months"
    }
  ];

  return (
    <div className="bg-background font-sans antialiased">
      {/* Navigation spacer */}
      <div className="pt-16"></div>
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <Wand2 className="w-4 h-4 mr-2" />
                14 Essential AI Tools
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" data-testid="tools-title">
                Essential AI Tools Every{" "}
                <span className="text-primary">Small Business</span> Should Use
              </h1>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8" data-testid="tools-subtitle">
                Hand-picked AI tools that Houston small businesses use to save 15+ hours per week, increase revenue by 300%, and compete with larger companies. Complete with pricing, implementation guides, and real Houston case studies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" data-testid="button-strategy-call">
                  <a href="/contact">Get Personal Tool Recommendations</a>
                </Button>
                <Button asChild variant="outline" size="lg" data-testid="button-workshop">
                  <a href="/ai-training">Join AI Tools Workshop</a>
                </Button>
              </div>
              <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  500+ Houston businesses using these tools
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Average 300% ROI increase
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  15+ hours saved per week
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Budget Guides */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="budget-title">
                AI Tool Budgets for Every Business Size
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Choose the right AI tool stack for your budget and growth stage
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {budgetGuides.map((guide, index) => (
              <AnimatedSection key={index}>
                <Card className={`h-full ${index === 1 ? 'ring-2 ring-primary shadow-lg' : 'hover-lift'}`} data-testid={`budget-guide-${index}`}>
                  <CardContent className="p-8">
                    {index === 1 && (
                      <Badge variant="default" className="mb-4">
                        Most Popular
                      </Badge>
                    )}
                    <h3 className="text-2xl font-bold text-card-foreground mb-2">{guide.title}</h3>
                    <div className="text-3xl font-bold text-primary mb-4">{guide.budget}</div>
                    <p className="text-muted-foreground mb-6">{guide.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      <h4 className="font-semibold text-card-foreground">Included Tools:</h4>
                      <ul className="space-y-2">
                        {guide.tools.map((tool, toolIndex) => (
                          <li key={toolIndex} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-border pt-4 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Total Cost:</span>
                        <span className="text-primary font-bold">{guide.totalCost}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Expected ROI:</span>
                        <span className="text-green-600 font-bold">{guide.expectedROI}</span>
                      </div>
                    </div>

                    <Button asChild className="w-full" data-testid={`budget-button-${index}`}>
                      <a href="/contact">Get This Setup</a>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-16 bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="featured-title">
                Top Recommended AI Tools
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our most recommended tools with proven results for Houston businesses
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredTools.map((tool, index) => (
              <AnimatedSection key={tool.id}>
                <Card className="h-full hover-lift shadow-lg" data-testid={`featured-tool-${index}`}>
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                          <tool.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-card-foreground">{tool.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">{tool.category}</Badge>
                            <Badge variant="outline">Featured</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">{tool.pricing}</div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Star className="w-3 h-3 text-yellow-500 mr-1" />
                          {tool.rating} ({tool.users} users)
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6">{tool.description}</p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-card-foreground mb-3">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {tool.features.slice(0, 4).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm">
                            <CheckCircle className="w-3 h-3 text-green-600 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-primary/5 rounded-lg mb-6">
                      <h4 className="font-semibold text-card-foreground mb-2 flex items-center">
                        <Lightbulb className="w-4 h-4 text-primary mr-2" />
                        Houston Success Story
                      </h4>
                      <p className="text-sm text-muted-foreground">{tool.houstonUseCase}</p>
                    </div>

                    <div className="flex gap-3">
                      <Button asChild className="flex-1" data-testid={`featured-tool-button-${index}`}>
                        <a href="/contact">Get Setup Help</a>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <a href="/contact">Learn More</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* All Tools Directory */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="directory-title">
                Complete AI Tools Directory
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Browse all recommended AI tools with detailed comparisons and implementation guides
              </p>
              
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger data-testid="category-filter">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                  <SelectTrigger data-testid="budget-filter">
                    <SelectValue placeholder="All Budgets" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Budgets</SelectItem>
                    <SelectItem value="starter">Starter ($0-100)</SelectItem>
                    <SelectItem value="growth">Growth ($200-500)</SelectItem>
                    <SelectItem value="scale">Scale ($500+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, index) => (
              <AnimatedSection key={tool.id}>
                <Card className="h-full hover-lift" data-testid={`tool-card-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                          <tool.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-card-foreground">{tool.name}</h3>
                          <Badge variant="secondary" className="text-xs">{tool.category}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary text-sm">{tool.pricing}</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Star className="w-3 h-3 text-yellow-500 mr-1" />
                          {tool.rating}
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4">{tool.description}</p>

                    <div className="space-y-3 mb-4">
                      <div>
                        <h4 className="font-semibold text-card-foreground text-sm mb-2">Best For:</h4>
                        <p className="text-xs text-muted-foreground">{tool.bestFor}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-card-foreground text-sm mb-2">Houston Example:</h4>
                        <p className="text-xs text-muted-foreground">{tool.houstonUseCase}</p>
                      </div>
                    </div>

                    <Button asChild variant="outline" size="sm" className="w-full" data-testid={`tool-button-${index}`}>
                      <a href="/contact">
                        Get Implementation Guide
                        <ArrowRight className="w-3 h-3 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Support CTA */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="implementation-title">
              Need Help Choosing the Right AI Tools?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Don't waste time and money on the wrong tools. Get personalized recommendations based on your business type, budget, and goals. Our Houston AI experts will create a custom implementation plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" data-testid="button-custom-plan">
                <a href="/contact">Get Custom AI Tool Plan</a>
              </Button>
              <Button asChild variant="outline" size="lg" data-testid="button-workshop-signup">
                <a href="/ai-training">Join Hands-On Workshop</a>
              </Button>
            </div>
            <div className="mt-6 text-sm text-muted-foreground">
              <p>✅ Free consultation includes tool recommendations and implementation timeline</p>
              <p>🎯 Guaranteed ROI within 90 days or money back</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}