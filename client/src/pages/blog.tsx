import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Clock, ArrowRight, Calendar, User, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

const blogPosts = [
  {
    id: 1,
    title: "How AI Marketing Helps Houston Restaurants Grow",
    excerpt: "Discover how AI-powered marketing transforms Houston restaurants by automating customer service, optimizing delivery routes, and personalizing menu recommendations for increased revenue.",
    category: "Industry Specific",
    readTime: "12 min read",
    date: "January 15, 2025",
    featured: true,
    url: "/how-ai-helps-houston-restaurants",
    tags: ["Restaurants", "AI Marketing", "Houston Business"]
  },
  {
    id: 2,
    title: "AI Marketing vs Traditional Marketing: What Houston Businesses Need to Know",
    excerpt: "Compare AI marketing and traditional marketing strategies. Learn why Houston businesses are making the switch and see real ROI comparisons and case studies.",
    category: "Strategy",
    readTime: "15 min read", 
    date: "January 12, 2025",
    featured: true,
    url: "/ai-vs-traditional-marketing",
    tags: ["Strategy", "ROI", "Business Growth"]
  },
  {
    id: 3,
    title: "Optimizing Your Google Business Profile with AI",
    excerpt: "Master AI-powered Google Business Profile optimization to dominate Houston local search results. Step-by-step guide with proven strategies and tools.",
    category: "Local SEO",
    readTime: "10 min read",
    date: "January 10, 2025",
    featured: true,
    url: "/google-business-profile-ai-optimization", 
    tags: ["Local SEO", "Google Business Profile", "AI Tools"]
  },
  {
    id: 4,
    title: "Step-by-Step Guide to AI Content Creation",
    excerpt: "Learn how to create compelling marketing content using AI tools. From blog posts to social media content, master the complete AI content creation workflow.",
    category: "Content Marketing",
    readTime: "18 min read",
    date: "January 8, 2025",
    featured: false,
    url: "/ai-content-creation-guide",
    tags: ["Content Creation", "AI Tools", "Marketing Automation"]
  },
  {
    id: 5,
    title: "Voice Search Optimization for Houston Businesses",
    excerpt: "Master voice search optimization with AI to capture the growing number of voice search queries. Local SEO strategies specifically for Houston businesses.",
    category: "SEO",
    readTime: "14 min read",
    date: "January 5, 2025", 
    featured: false,
    url: "/voice-search-optimization-houston",
    tags: ["Voice Search", "SEO", "Local Business"]
  }
];

const resourcePages = [
  {
    title: "Complete Guide to AI Marketing for Houston Businesses",
    description: "Comprehensive 50-page guide covering everything from AI basics to advanced automation strategies for Houston businesses.",
    url: "/houston-ai-marketing-guide",
    type: "Complete Guide",
    icon: BookOpen
  },
  {
    title: "Essential AI Tools Every Small Business Should Use",
    description: "Curated list of the best AI tools for small businesses, with pricing, features, and implementation guides.",
    url: "/ai-tools-small-business", 
    type: "Tool Directory",
    icon: TrendingUp
  },
  {
    title: "30-Day AI Marketing Implementation Checklist",
    description: "Step-by-step checklist to implement AI marketing in your business over 30 days, with daily tasks and milestones.",
    url: "/ai-marketing-checklist",
    type: "Action Plan",
    icon: Calendar
  },
  {
    title: "Free Resources for Houston Business Owners",
    description: "Access our complete library of free templates, guides, checklists, and tools specifically designed for Houston businesses.",
    url: "/houston-business-resources",
    type: "Resource Hub",
    icon: Star
  }
];

export default function Blog() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="bg-background font-sans antialiased">
      {/* Navigation spacer */}
      <div className="pt-16"></div>
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <BookOpen className="w-4 h-4 mr-2" />
                AI Marketing Knowledge Hub
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" data-testid="blog-title">
                Master AI Marketing for Your{" "}
                <span className="text-primary">Houston Business</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8" data-testid="blog-subtitle">
                Expert insights, step-by-step guides, and proven strategies to help Houston businesses leverage AI for explosive growth. Learn from our experience helping 50+ local businesses succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" data-testid="button-free-consultation">
                  <a href="/contact">Get Free AI Strategy Consultation</a>
                </Button>
                <Button asChild variant="outline" size="lg" data-testid="button-ai-tools">
                  <a href="/ai-tools">Try Our Free AI Tools</a>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center" data-testid="resources-title">
              Essential Resources
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Comprehensive guides and tools to accelerate your AI marketing journey
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resourcePages.map((resource, index) => (
              <AnimatedSection key={index} className="h-full">
                <Card className="h-full hover-lift shadow-sm" data-testid={`resource-card-${index}`}>
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <resource.icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="self-start mb-3 text-xs">
                      {resource.type}
                    </Badge>
                    <h3 className="text-lg font-bold text-card-foreground mb-3 flex-grow" data-testid={`resource-title-${index}`}>
                      {resource.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow" data-testid={`resource-description-${index}`}>
                      {resource.description}
                    </p>
                    <Button asChild variant="outline" size="sm" className="w-full mt-auto" data-testid={`resource-button-${index}`}>
                      <a href={resource.url}>
                        Access Resource
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center" data-testid="featured-title">
              Featured Articles
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Our most popular and actionable AI marketing insights
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <AnimatedSection key={post.id} className="h-full">
                <Card className="h-full hover-lift shadow-sm" data-testid={`featured-post-${index}`}>
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="default" data-testid={`post-category-${index}`}>
                        {post.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Featured
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-bold text-card-foreground mb-3 leading-tight" data-testid={`post-title-${index}`}>
                      <a href={post.url} className="hover:text-primary transition-colors">
                        {post.title}
                      </a>
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 flex-grow" data-testid={`post-excerpt-${index}`}>
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <Button asChild variant="outline" className="w-full" data-testid={`post-button-${index}`}>
                      <a href={post.url}>
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* More Articles */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center" data-testid="more-articles-title">
              More AI Marketing Insights
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {regularPosts.map((post, index) => (
              <AnimatedSection key={post.id} className="h-full">
                <Card className="h-full hover-lift shadow-sm" data-testid={`regular-post-${index}`}>
                  <CardContent className="p-6 h-full flex flex-col">
                    <Badge variant="secondary" className="self-start mb-3" data-testid={`regular-post-category-${index}`}>
                      {post.category}
                    </Badge>
                    
                    <h3 className="text-xl font-bold text-card-foreground mb-3" data-testid={`regular-post-title-${index}`}>
                      <a href={post.url} className="hover:text-primary transition-colors">
                        {post.title}
                      </a>
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 flex-grow" data-testid={`regular-post-excerpt-${index}`}>
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <Button asChild variant="outline" className="w-full" data-testid={`regular-post-button-${index}`}>
                      <a href={post.url}>
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup CTA */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="newsletter-title">
              Stay Ahead of the AI Marketing Revolution
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get exclusive AI marketing insights, case studies, and strategies delivered to your inbox weekly. Join 500+ Houston business owners already growing with AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" data-testid="button-newsletter">
                <a href="/contact">Get Weekly AI Marketing Tips</a>
              </Button>
              <Button asChild variant="outline" size="lg" data-testid="button-free-audit">
                <a href="/assessment">Get Free AI Readiness Assessment</a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}