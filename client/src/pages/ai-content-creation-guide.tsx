import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Wand2, 
  FileText, 
  Image, 
  Video, 
  MessageSquare,
  Mail,
  Clock,
  TrendingUp,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Calendar,
  Target,
  Lightbulb,
  Copy
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

export default function AIContentCreationGuide() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const contentTypes = [
    {
      type: "Blog Posts & Articles",
      icon: FileText,
      timeTraditional: "4-8 hours",
      timeAI: "30-60 minutes",
      tools: ["ChatGPT", "Jasper AI", "Copy.ai"],
      process: [
        "Generate topic ideas with AI keyword research",
        "Create detailed outline using AI",
        "Write first draft with AI assistance",
        "Edit and personalize with your expertise",
        "Optimize for SEO with AI tools"
      ],
      prompts: [
        "Write a comprehensive blog post about [topic] for Houston business owners, including practical tips and local examples",
        "Create an engaging introduction for an article about [topic] that hooks Houston readers within the first 30 words",
        "Generate 10 headline variations for a blog post about [topic] optimized for Houston local SEO"
      ]
    },
    {
      type: "Social Media Content",
      icon: MessageSquare,
      timeTraditional: "2-3 hours daily",
      timeAI: "15-20 minutes daily",
      tools: ["ChatGPT", "Copy.ai", "Buffer AI"],
      process: [
        "Generate month-long content calendar",
        "Create platform-specific posts (Facebook, Instagram, LinkedIn)",
        "Write engaging captions with hashtags",
        "Generate content variations for A/B testing",
        "Schedule posts for optimal engagement times"
      ],
      prompts: [
        "Create 5 engaging Instagram posts for a Houston [business type] showcasing [service/product] with relevant hashtags",
        "Write a LinkedIn article introduction about [topic] that appeals to Houston business professionals",
        "Generate Facebook post ideas for a Houston restaurant highlighting seasonal menu items"
      ]
    },
    {
      type: "Email Campaigns",
      icon: Mail,
      timeTraditional: "3-4 hours",
      timeAI: "30-45 minutes",
      tools: ["ChatGPT", "Mailchimp AI", "ConvertKit"],
      process: [
        "Create email sequence strategies",
        "Write compelling subject lines",
        "Generate personalized email content",
        "Create follow-up sequences",
        "Optimize for different customer segments"
      ],
      prompts: [
        "Write a welcome email series for new Houston customers of [business type] that builds trust and encourages engagement",
        "Create 10 subject line variations for a promotional email about [offer] that appeal to Houston residents",
        "Generate a re-engagement email for customers who haven't visited our Houston business in 3 months"
      ]
    },
    {
      type: "Website Copy",
      icon: Image,
      timeTraditional: "6-10 hours",
      timeAI: "1-2 hours",
      tools: ["Copy.ai", "Jasper AI", "ChatGPT"],
      process: [
        "Analyze competitor websites with AI",
        "Generate page-by-page copy structure",
        "Write compelling headlines and descriptions",
        "Create calls-to-action that convert",
        "Optimize copy for local Houston SEO"
      ],
      prompts: [
        "Write compelling homepage copy for a Houston [business type] that immediately communicates value and builds trust",
        "Create an About Us page for a Houston business that tells our story and connects with local customers",
        "Generate service page descriptions for [service] that rank well for Houston local searches"
      ]
    }
  ];

  const workflow = [
    {
      step: "Strategy & Planning",
      duration: "30 minutes weekly",
      description: "Use AI to analyze trends, competitors, and create content calendars",
      tasks: [
        "AI analyzes your audience and competitors",
        "Generate content ideas based on trending topics",
        "Create monthly content calendar",
        "Identify high-impact content opportunities"
      ]
    },
    {
      step: "Content Creation",
      duration: "1-2 hours weekly",
      description: "Leverage AI to create first drafts of all content types",
      tasks: [
        "Generate blog post outlines and first drafts",
        "Create social media posts for all platforms",
        "Write email campaigns and sequences",
        "Develop website copy and landing pages"
      ]
    },
    {
      step: "Editing & Personalization",
      duration: "1 hour weekly",
      description: "Add your expertise, brand voice, and local Houston context",
      tasks: [
        "Review AI-generated content for accuracy",
        "Add personal insights and expertise",
        "Ensure brand voice consistency",
        "Include Houston-specific references and examples"
      ]
    },
    {
      step: "Optimization & Publishing",
      duration: "30 minutes weekly",
      description: "Use AI to optimize and schedule content for maximum impact",
      tasks: [
        "SEO optimize with AI keyword suggestions",
        "A/B test headlines and copy variations", 
        "Schedule content for optimal engagement times",
        "Track performance and adjust strategy"
      ]
    }
  ];

  const businessExamples = [
    {
      business: "Houston Dental Practice",
      challenge: "Needed educational content to build trust and attract patients",
      solution: "AI-generated blog posts about dental health, patient testimonials, and FAQ content",
      results: [
        "500% increase in blog traffic",
        "300% more appointment bookings",
        "60% of new patients cite blog as influence",
        "Reduced content creation time by 85%"
      ],
      contentOutput: "From 1 blog post/month to 8 posts/month"
    },
    {
      business: "Houston HVAC Company",
      challenge: "Seasonal content needs and emergency service promotion",
      solution: "AI-powered seasonal campaigns, emergency service content, and maintenance tips",
      results: [
        "400% increase in emergency calls",
        "250% growth in maintenance contracts",
        "Doubled social media engagement",
        "90% reduction in content creation time"
      ],
      contentOutput: "From 3 social posts/week to 15 posts/week"
    },
    {
      business: "Houston Restaurant Group",
      challenge: "Multiple locations needed unique, consistent content",
      solution: "AI-generated location-specific menus, promotions, and social media content",
      results: [
        "320% increase in online orders",
        "180% growth in social media followers",
        "Consistent brand voice across all locations",
        "75% time savings on content creation"
      ],
      contentOutput: "From 20 hours/week to 5 hours/week content work"
    }
  ];

  const promptLibrary = [
    {
      category: "Blog Writing",
      prompts: [
        "Write a comprehensive guide about [topic] for Houston business owners, including actionable tips, local examples, and a clear call-to-action",
        "Create an engaging blog post that explains [complex topic] in simple terms for Houston small business owners",
        "Generate a list-style blog post: '10 Ways Houston Businesses Can [achieve goal] in 2025'"
      ]
    },
    {
      category: "Social Media",
      prompts: [
        "Create 5 Instagram posts for a Houston [business type] that showcase behind-the-scenes content and build community connection",
        "Write LinkedIn posts that position our Houston business as a thought leader in [industry]",
        "Generate Facebook posts that promote our Houston business while providing genuine value to followers"
      ]
    },
    {
      category: "Email Marketing",
      prompts: [
        "Write a nurturing email sequence for Houston prospects who downloaded our [lead magnet]",
        "Create a promotional email about [offer] that doesn't sound salesy and provides real value to Houston customers",
        "Generate a customer success story email featuring a Houston client's transformation"
      ]
    },
    {
      category: "Website Copy",
      prompts: [
        "Write compelling homepage hero text for a Houston [business type] that immediately communicates our unique value proposition",
        "Create service descriptions that explain [service] benefits in terms Houston customers care about",
        "Generate FAQ content that addresses the most common concerns of Houston prospects"
      ]
    }
  ];

  const faqs = [
    {
      question: "Will AI-generated content rank well on Google for Houston searches?",
      answer: "Yes, when properly optimized! Google cares about content quality and relevance, not how it's created. AI-generated content that's edited, personalized, and optimized for local Houston keywords often outperforms manually written content because it can be more comprehensive and consistently published."
    },
    {
      question: "How do I maintain my brand voice with AI content creation?",
      answer: "Start by creating a detailed brand voice guide and train your AI tools with examples of your best content. Always review and edit AI-generated content to ensure it matches your tone. Most Houston businesses find AI actually helps maintain more consistent brand voice across all content."
    },
    {
      question: "Can AI create content for technical Houston industries like oil & gas or medical?",
      answer: "Absolutely! AI excels at technical content when properly prompted. Provide specific industry knowledge, terminology, and examples. Many Houston medical practices and energy companies use AI to create technical content faster than ever while maintaining accuracy through expert review."
    },
    {
      question: "How much content can I realistically create with AI per week?",
      answer: "Most Houston businesses using AI create 10-20x more content than before. A typical small business can produce 4-8 blog posts, 15-20 social media posts, 2-3 email campaigns, and multiple web pages per week with just 3-4 hours of work."
    },
    {
      question: "Do I need writing skills to create good AI content?",
      answer: "Writing skills help but aren't required. The key is learning to prompt AI effectively and knowing how to edit for your audience. Our Houston workshops teach non-writers how to create professional content with AI in just a few hours."
    },
    {
      question: "How do I avoid AI content that sounds generic or robotic?",
      answer: "Always add personal insights, local Houston references, specific examples, and your unique perspective. The best AI content combines AI efficiency with human expertise. Never publish AI content without reviewing and personalizing it for your Houston audience."
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
                <Wand2 className="w-4 h-4 mr-2" />
                Content Creation Mastery
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" data-testid="article-title">
                Step-by-Step Guide to{" "}
                <span className="text-primary">AI Content Creation</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="article-subtitle">
                Master the complete AI content creation workflow used by Houston businesses to produce 500% more high-quality content in 80% less time. Includes proven prompts, tools, and real case studies.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  18 min read
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  January 8, 2025
                </div>
                <div className="flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Complete Workflow Guide
                </div>
              </div>
              <Button asChild size="lg" data-testid="button-get-content-guide">
                <a href="/contact">Get Free Content Creation Templates</a>
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
                Creating consistent, high-quality content is the biggest challenge Houston businesses face in digital marketing. Traditional content creation is time-consuming, expensive, and difficult to scale. That's where AI transforms everything.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                This comprehensive guide walks you through the exact AI content creation workflow that Houston businesses use to produce professional content 10x faster while maintaining quality and brand voice. Every technique is tested and proven by real businesses seeing extraordinary results.
              </p>
            </div>
          </AnimatedSection>

          {/* Content Types Comparison */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="content-types-title">
                AI Content Creation by Type
              </h2>
              
              <div className="space-y-8">
                {contentTypes.map((content, index) => (
                  <Card key={index} className="p-8" data-testid={`content-type-${index}`}>
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <content.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-card-foreground mb-4">{content.type}</h3>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                            <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">Traditional Method</h4>
                            <p className="text-red-700 dark:text-red-300 font-semibold">{content.timeTraditional}</p>
                          </div>
                          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                            <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">With AI</h4>
                            <p className="text-green-700 dark:text-green-300 font-semibold">{content.timeAI}</p>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold text-card-foreground mb-3">Recommended Tools:</h4>
                          <div className="flex gap-2">
                            {content.tools.map((tool, toolIndex) => (
                              <Badge key={toolIndex} variant="secondary">{tool}</Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold text-card-foreground mb-3">AI Workflow:</h4>
                          <ol className="space-y-2">
                            {content.process.map((step, stepIndex) => (
                              <li key={stepIndex} className="flex items-start">
                                <span className="font-semibold text-primary mr-3 mt-0.5">{stepIndex + 1}.</span>
                                <span className="text-sm text-muted-foreground">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        <div>
                          <h4 className="font-semibold text-card-foreground mb-3">Example Prompts:</h4>
                          <div className="space-y-3">
                            {content.prompts.map((prompt, promptIndex) => (
                              <div key={promptIndex} className="p-3 bg-muted/50 rounded-lg border">
                                <p className="text-sm text-muted-foreground italic">"{prompt}"</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* 4-Step AI Content Workflow */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="workflow-title">
                The 4-Step AI Content Creation Workflow
              </h2>
              
              <div className="space-y-6">
                {workflow.map((step, index) => (
                  <Card key={index} className="p-6" data-testid={`workflow-step-${index}`}>
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
                            <li key={taskIndex} className="flex items-center text-sm text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
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

          {/* Houston Business Examples */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="business-examples-title">
                Real Houston Business Transformations
              </h2>
              
              <div className="space-y-8">
                {businessExamples.map((example, index) => (
                  <Card key={index} className="p-8" data-testid={`business-example-${index}`}>
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-card-foreground">{example.business}</h3>
                        <Badge variant="outline" className="mt-2">{example.contentOutput}</Badge>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-card-foreground mb-3 flex items-center">
                          <Target className="w-4 h-4 mr-2" />
                          Challenge:
                        </h4>
                        <p className="text-muted-foreground">{example.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-card-foreground mb-3 flex items-center">
                          <Lightbulb className="w-4 h-4 mr-2" />
                          AI Solution:
                        </h4>
                        <p className="text-muted-foreground">{example.solution}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-3 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Results:
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {example.results.map((result, resultIndex) => (
                          <div key={resultIndex} className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
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

          {/* Prompt Library */}
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="prompt-library-title">
                Proven AI Prompt Library
              </h2>
              
              <div className="space-y-6">
                {promptLibrary.map((category, index) => (
                  <Card key={index} className="p-6" data-testid={`prompt-category-${index}`}>
                    <h3 className="text-xl font-bold text-card-foreground mb-4 flex items-center">
                      <Copy className="w-5 h-5 mr-2" />
                      {category.category}
                    </h3>
                    <div className="space-y-4">
                      {category.prompts.map((prompt, promptIndex) => (
                        <div key={promptIndex} className="p-4 bg-muted/50 rounded-lg border">
                          <p className="text-sm text-muted-foreground mb-2 italic">"{prompt}"</p>
                          <Button variant="outline" size="sm" className="text-xs">
                            Copy Prompt
                          </Button>
                        </div>
                      ))}
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
              Ready to 10x Your Content Creation?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Get our complete AI content creation toolkit with templates, prompts, and step-by-step training. Join 200+ Houston businesses already creating professional content in minutes, not hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" data-testid="button-content-toolkit">
                <a href="/contact">Get Complete Content Creation Toolkit</a>
              </Button>
              <Button asChild variant="outline" size="lg" data-testid="button-content-workshop">
                <a href="/ai-training">Join Content Creation Workshop</a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              ✅ Includes 50+ proven prompts, content templates, and workflow guides • No experience required
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}