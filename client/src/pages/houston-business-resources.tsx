import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Download, 
  BookOpen, 
  FileText, 
  CheckSquare, 
  Users, 
  Calendar, 
  Briefcase,
  TrendingUp,
  MapPin,
  Star,
  ExternalLink,
  Lightbulb,
  Target,
  BarChart3,
  Mail,
  Phone,
  Globe
} from "lucide-react";
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

const resourceCategories = [
  {
    title: "AI Marketing Guides",
    description: "Comprehensive guides to master AI marketing for your Houston business",
    icon: BookOpen,
    resources: [
      {
        name: "Complete AI Marketing Guide",
        description: "50-page comprehensive guide covering everything from basics to advanced strategies",
        type: "PDF Guide",
        pages: "50 pages",
        downloadAction: "Download Free PDF",
        featured: true
      },
      {
        name: "AI Tools Comparison Chart",
        description: "Side-by-side comparison of 20+ AI marketing tools with pricing and features",
        type: "Comparison Chart",
        pages: "8 pages",
        downloadAction: "Get Comparison Chart"
      },
      {
        name: "Prompt Engineering Workbook",
        description: "Master AI prompts with 100+ tested prompts for different business types",
        type: "Workbook",
        pages: "25 pages",
        downloadAction: "Download Workbook"
      }
    ]
  },
  {
    title: "Implementation Templates",
    description: "Ready-to-use templates to accelerate your AI marketing implementation",
    icon: FileText,
    resources: [
      {
        name: "AI Marketing Strategy Template",
        description: "Complete strategic planning template with goals, tactics, and measurement",
        type: "Strategy Template",
        pages: "12 pages",
        downloadAction: "Get Template"
      },
      {
        name: "Content Calendar Template",
        description: "30-day AI-generated content calendar with prompts and scheduling",
        type: "Excel Template",
        pages: "Spreadsheet",
        downloadAction: "Download Calendar"
      },
      {
        name: "ROI Tracking Dashboard",
        description: "Track your AI marketing investments and returns with this comprehensive dashboard",
        type: "Dashboard",
        pages: "Interactive",
        downloadAction: "Get Dashboard"
      }
    ]
  },
  {
    title: "Checklists & Action Plans", 
    description: "Step-by-step checklists to ensure successful AI implementation",
    icon: CheckSquare,
    resources: [
      {
        name: "30-Day Implementation Checklist",
        description: "Complete day-by-day checklist for implementing AI marketing in your business",
        type: "Action Checklist",
        pages: "20 tasks",
        downloadAction: "Get Checklist",
        featured: true
      },
      {
        name: "AI Readiness Assessment",
        description: "Evaluate your business readiness for AI marketing implementation",
        type: "Assessment",
        pages: "15 questions",
        downloadAction: "Take Assessment"
      },
      {
        name: "Launch Day Checklist",
        description: "Pre-launch checklist to ensure smooth AI marketing rollout",
        type: "Checklist",
        pages: "25 items",
        downloadAction: "Download Checklist"
      }
    ]
  }
];

const houstonSpecificResources = [
  {
    title: "Houston Market Research",
    description: "2024 Houston business landscape analysis with AI opportunities",
    type: "Market Report",
    icon: BarChart3,
    highlights: ["2.3M+ population data", "Industry breakdown", "Digital readiness scores", "Competitive analysis"]
  },
  {
    title: "Local SEO Keywords Database",
    description: "500+ Houston-specific keywords for local business optimization",
    type: "Keyword Database",
    icon: Target,
    highlights: ["Neighborhood-specific terms", "Industry keywords", "Search volume data", "Competition analysis"]
  },
  {
    title: "Houston Business Directory",
    description: "Curated list of Houston business resources, organizations, and networking groups",
    type: "Business Directory",
    icon: Users,
    highlights: ["Chamber of Commerce info", "Networking groups", "Business associations", "Local resources"]
  },
  {
    title: "Regulatory Compliance Guide",
    description: "Houston and Texas-specific regulations for AI marketing and data privacy",
    type: "Compliance Guide", 
    icon: FileText,
    highlights: ["Privacy regulations", "AI disclosure requirements", "Local advertising rules", "Best practices"]
  }
];

const workshops = [
  {
    title: "AI Marketing Fundamentals",
    duration: "4 hours",
    format: "In-person & Virtual",
    nextDate: "February 15, 2025",
    description: "Master the basics of AI marketing with hands-on exercises and real Houston case studies",
    price: "$150",
    popular: true
  },
  {
    title: "Advanced AI Automation",
    duration: "6 hours",
    format: "In-person only",
    nextDate: "March 2, 2025", 
    description: "Build sophisticated AI marketing workflows and automation systems",
    price: "$300"
  },
  {
    title: "Industry-Specific AI Marketing",
    duration: "3 hours",
    format: "Virtual",
    nextDate: "February 28, 2025",
    description: "Tailored AI strategies for restaurants, retail, services, and healthcare",
    price: "$100"
  }
];

const communityResources = [
  {
    title: "Marketing AI Houston Community",
    description: "Join 500+ Houston business owners sharing AI marketing strategies and results",
    members: "500+",
    platform: "Private Facebook Group",
    features: ["Weekly case studies", "Tool recommendations", "Q&A sessions", "Networking events"]
  },
  {
    title: "Monthly Mastermind Sessions",
    description: "Small group sessions for advanced AI marketing strategy and accountability",
    members: "15-20",
    platform: "In-person & Zoom",
    features: ["Strategy sessions", "Accountability partners", "Expert presentations", "Resource sharing"]
  },
  {
    title: "AI Marketing Newsletter",
    description: "Weekly insights, case studies, and tool updates delivered to your inbox",
    members: "1,200+",
    platform: "Email",
    features: ["Case studies", "Tool updates", "Industry news", "Local business spotlights"]
  }
];

export default function HoustonBusinessResources() {
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
                <Download className="w-4 h-4 mr-2" />
                25+ Free Resources
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" data-testid="resources-title">
                Free Resources for{" "}
                <span className="text-primary">Houston</span> Business Owners
              </h1>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8" data-testid="resources-subtitle">
                Everything you need to implement AI marketing successfully in your Houston business. Guides, templates, checklists, and tools used by 500+ local business owners to grow revenue by 300%.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" data-testid="button-get-all-resources">
                  <a href="/contact">Get All Resources (Free)</a>
                </Button>
                <Button asChild variant="outline" size="lg" data-testid="button-join-community">
                  <a href="/contact">Join Houston AI Community</a>
                </Button>
              </div>
              <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Used by 500+ Houston businesses
                </div>
                <div className="flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  2,000+ downloads
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  4.9/5 average rating
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {resourceCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-20 last:mb-0">
              <AnimatedSection>
                <div className="text-center mb-12">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <category.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid={`category-title-${categoryIndex}`}>
                    {category.title}
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    {category.description}
                  </p>
                </div>
              </AnimatedSection>

              <div className="grid lg:grid-cols-3 gap-8">
                {category.resources.map((resource, resourceIndex) => (
                  <AnimatedSection key={resourceIndex}>
                    <Card className={`h-full hover-lift ${resource.featured ? 'ring-2 ring-primary shadow-lg' : ''}`} data-testid={`resource-card-${categoryIndex}-${resourceIndex}`}>
                      <CardContent className="p-6">
                        {resource.featured && (
                          <Badge variant="default" className="mb-4">
                            Most Popular
                          </Badge>
                        )}
                        <h3 className="text-xl font-bold text-card-foreground mb-3">{resource.name}</h3>
                        <p className="text-muted-foreground mb-4">{resource.description}</p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="secondary">{resource.type}</Badge>
                          <span className="text-sm font-semibold text-primary">{resource.pages}</span>
                        </div>

                        <Button asChild className="w-full" data-testid={`download-button-${categoryIndex}-${resourceIndex}`}>
                          <a href="/contact">
                            <Download className="w-4 h-4 mr-2" />
                            {resource.downloadAction}
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Houston-Specific Resources */}
      <section className="py-16 bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="houston-resources-title">
                Houston-Specific Resources
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Tailored resources specifically for the Houston market and business environment
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {houstonSpecificResources.map((resource, index) => (
              <AnimatedSection key={index}>
                <Card className="h-full hover-lift" data-testid={`houston-resource-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                        <resource.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-card-foreground">{resource.title}</h3>
                        <Badge variant="secondary" className="mt-1">{resource.type}</Badge>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      {resource.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          {highlight}
                        </div>
                      ))}
                    </div>

                    <Button asChild variant="outline" className="w-full" data-testid={`houston-resource-button-${index}`}>
                      <a href="/contact">
                        Access Resource
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops & Training */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="workshops-title">
                Workshops & Training
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Hands-on workshops to accelerate your AI marketing implementation
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {workshops.map((workshop, index) => (
              <AnimatedSection key={index}>
                <Card className={`h-full ${workshop.popular ? 'ring-2 ring-primary shadow-lg' : 'hover-lift'}`} data-testid={`workshop-card-${index}`}>
                  <CardContent className="p-6">
                    {workshop.popular && (
                      <Badge variant="default" className="mb-4">
                        Most Popular
                      </Badge>
                    )}
                    
                    <h3 className="text-xl font-bold text-card-foreground mb-3">{workshop.title}</h3>
                    <p className="text-muted-foreground mb-4">{workshop.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Duration:</span>
                        <span className="font-semibold">{workshop.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Format:</span>
                        <span className="font-semibold">{workshop.format}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Next Date:</span>
                        <span className="font-semibold text-primary">{workshop.nextDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-primary">{workshop.price}</span>
                      <Badge variant="secondary">Limited Seats</Badge>
                    </div>

                    <Button asChild className="w-full" data-testid={`workshop-button-${index}`}>
                      <a href="/ai-training">Register Now</a>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Community Resources */}
      <section className="py-16 bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="community-title">
                Community & Ongoing Support
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Join Houston's most active AI marketing community for ongoing learning and networking
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {communityResources.map((community, index) => (
              <AnimatedSection key={index}>
                <Card className="h-full hover-lift" data-testid={`community-card-${index}`}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-3">{community.title}</h3>
                    <p className="text-muted-foreground mb-4">{community.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary">{community.platform}</Badge>
                      <span className="text-sm font-semibold text-primary">{community.members} members</span>
                    </div>

                    <div className="space-y-2 mb-6">
                      {community.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Button asChild variant="outline" className="w-full" data-testid={`community-button-${index}`}>
                      <a href="/contact">Join Community</a>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Support */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="support-contact-title">
              Need Personal Help with Implementation?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Our Houston AI marketing experts provide one-on-one guidance to ensure your success. Get personalized advice tailored to your specific business and industry.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center">
                <Phone className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Phone Support</h3>
                <p className="text-sm text-muted-foreground">(713) 555-AI01</p>
              </div>
              <div className="flex flex-col items-center">
                <Mail className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Email Support</h3>
                <p className="text-sm text-muted-foreground">hello@houstonaimarketing.com</p>
              </div>
              <div className="flex flex-col items-center">
                <Calendar className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Schedule Call</h3>
                <p className="text-sm text-muted-foreground">Free 30-minute consultation</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" data-testid="button-schedule-consultation">
                <a href="/contact">Schedule Free Consultation</a>
              </Button>
              <Button asChild variant="outline" size="lg" data-testid="button-download-all">
                <a href="/contact">
                  <Download className="w-4 h-4 mr-2" />
                  Download All Resources
                </a>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              ✅ No obligation • Personalized recommendations • Implementation roadmap included
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}