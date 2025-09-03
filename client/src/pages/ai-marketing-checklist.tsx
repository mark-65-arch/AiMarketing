import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Download, 
  Target, 
  TrendingUp, 
  Users, 
  BarChart3,
  Settings,
  Wand2,
  MessageSquare,
  Mail,
  Search,
  Star,
  ChevronRight,
  AlertCircle,
  Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

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

const checklistWeeks = [
  {
    week: "Week 1",
    title: "Foundation & Assessment",
    description: "Establish your AI marketing baseline and set up essential tracking",
    tasks: [
      {
        task: "Complete AI readiness assessment",
        description: "Evaluate current marketing performance and identify automation opportunities",
        timeRequired: "30 minutes",
        difficulty: "Easy",
        tools: ["Assessment form"],
        outcome: "Clear understanding of AI potential for your business"
      },
      {
        task: "Set up Google Analytics 4 with enhanced ecommerce",
        description: "Enable AI-powered insights and conversion tracking",
        timeRequired: "45 minutes",
        difficulty: "Medium",
        tools: ["Google Analytics 4"],
        outcome: "Data foundation for AI optimization"
      },
      {
        task: "Document current marketing workflows",
        description: "Map out time-consuming tasks that can be automated",
        timeRequired: "60 minutes", 
        difficulty: "Easy",
        tools: ["Spreadsheet template"],
        outcome: "Automation priority list"
      },
      {
        task: "Create AI marketing budget ($200-500/month)",
        description: "Allocate funds for essential AI tools and training",
        timeRequired: "15 minutes",
        difficulty: "Easy",
        tools: ["Budget template"],
        outcome: "Clear investment plan"
      },
      {
        task: "Join Marketing AI Houston community",
        description: "Connect with local businesses using AI marketing",
        timeRequired: "10 minutes",
        difficulty: "Easy",
        tools: ["Community access"],
        outcome: "Ongoing support network"
      }
    ]
  },
  {
    week: "Week 2",
    title: "Content Creation Setup",
    description: "Implement AI-powered content creation for consistent marketing",
    tasks: [
      {
        task: "Set up ChatGPT account and learn basic prompts",
        description: "Master prompt engineering for your business type",
        timeRequired: "90 minutes",
        difficulty: "Easy",
        tools: ["ChatGPT", "Prompt library"],
        outcome: "Ability to generate quality content in minutes"
      },
      {
        task: "Create brand voice guide for AI tools",
        description: "Define tone, style, and key messages for consistent output",
        timeRequired: "45 minutes",
        difficulty: "Medium",
        tools: ["Brand guide template"],
        outcome: "Consistent AI-generated content"
      },
      {
        task: "Generate 30 days of social media content",
        description: "Use AI to create a month's worth of posts",
        timeRequired: "2 hours",
        difficulty: "Medium",
        tools: ["ChatGPT", "Content calendar"],
        outcome: "30 ready-to-post pieces of content"
      },
      {
        task: "Set up content approval workflow",
        description: "Create system for reviewing and approving AI content",
        timeRequired: "30 minutes",
        difficulty: "Easy", 
        tools: ["Approval checklist"],
        outcome: "Quality control process"
      },
      {
        task: "Test AI content performance",
        description: "Post AI content and measure engagement vs manual content",
        timeRequired: "15 minutes daily",
        difficulty: "Easy",
        tools: ["Social media analytics"],
        outcome: "Performance baseline"
      }
    ]
  },
  {
    week: "Week 3",
    title: "Customer Service Automation",
    description: "Implement AI chatbots and automated customer support",
    tasks: [
      {
        task: "Install AI chatbot on website",
        description: "Set up 24/7 customer service with common questions",
        timeRequired: "2 hours",
        difficulty: "Medium",
        tools: ["Tidio or Intercom"],
        outcome: "24/7 customer support"
      },
      {
        task: "Create FAQ database for chatbot",
        description: "Input 20+ common questions and AI responses",
        timeRequired: "90 minutes",
        difficulty: "Easy",
        tools: ["FAQ template"],
        outcome: "Automated customer support"
      },
      {
        task: "Set up email auto-responses",
        description: "Create intelligent email replies for common inquiries",
        timeRequired: "45 minutes",
        difficulty: "Medium",
        tools: ["Email marketing platform"],
        outcome: "Faster response times"
      },
      {
        task: "Configure handoff to human support",
        description: "Set triggers for when AI should transfer to humans",
        timeRequired: "30 minutes",
        difficulty: "Medium",
        tools: ["Chatbot settings"],
        outcome: "Seamless customer experience"
      },
      {
        task: "Test chatbot with real scenarios",
        description: "Have team members test common customer interactions",
        timeRequired: "60 minutes",
        difficulty: "Easy",
        tools: ["Testing checklist"],
        outcome: "Optimized chatbot performance"
      }
    ]
  },
  {
    week: "Week 4",
    title: "Local SEO Optimization",
    description: "Use AI to dominate Houston local search results",
    tasks: [
      {
        task: "Optimize Google Business Profile with AI",
        description: "Use AI to create compelling descriptions and posts",
        timeRequired: "2 hours",
        difficulty: "Medium",
        tools: ["ChatGPT", "Google Business Profile"],
        outcome: "Improved local search rankings"
      },
      {
        task: "Generate location-based content",
        description: "Create Houston neighborhood-specific content",
        timeRequired: "90 minutes",
        difficulty: "Medium",
        tools: ["AI content tools", "Local keyword list"],
        outcome: "Better local relevance"
      },
      {
        task: "Set up review response automation",
        description: "Create AI templates for responding to reviews",
        timeRequired: "60 minutes",
        difficulty: "Easy",
        tools: ["Review management tool"],
        outcome: "Consistent review engagement"
      },
      {
        task: "Implement local SEO tracking",
        description: "Monitor local search rankings and performance",
        timeRequired: "45 minutes",
        difficulty: "Medium",
        tools: ["BrightLocal or similar"],
        outcome: "Local SEO insights"
      },
      {
        task: "Create local landing pages",
        description: "Build AI-optimized pages for different Houston areas",
        timeRequired: "3 hours",
        difficulty: "Hard",
        tools: ["Website builder", "AI content"],
        outcome: "Better local search presence"
      }
    ]
  }
];

const successMetrics = [
  {
    metric: "Time Saved",
    target: "15+ hours/week",
    measurement: "Track hours before/after automation",
    icon: Clock
  },
  {
    metric: "Lead Generation",
    target: "200% increase",
    measurement: "Compare leads 30 days before/after",
    icon: TrendingUp
  },
  {
    metric: "Customer Response",
    target: "85% faster replies",
    measurement: "Average response time tracking",
    icon: MessageSquare
  },
  {
    metric: "Content Output",
    target: "500% more content",
    measurement: "Posts/articles created per week",
    icon: Wand2
  },
  {
    metric: "Local Rankings",
    target: "Top 3 positions",
    measurement: "Local search ranking positions",
    icon: Search
  },
  {
    metric: "ROI",
    target: "300-400% return",
    measurement: "Revenue increase vs AI investment",
    icon: BarChart3
  }
];

export default function AIMarketingChecklist() {
  const [checkedItems, setCheckedItems] = useState<{[key: string]: boolean}>({});

  const handleCheck = (weekIndex: number, taskIndex: number) => {
    const key = `${weekIndex}-${taskIndex}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getCompletionPercentage = () => {
    const totalTasks = checklistWeeks.reduce((sum, week) => sum + week.tasks.length, 0);
    const completedTasks = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((completedTasks / totalTasks) * 100);
  };

  return (
    <div className="bg-background font-sans antialiased">
      {/* Navigation spacer */}
      <div className="pt-16"></div>
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-8">
              <AnimatedSection>
                <Badge variant="secondary" className="mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  30-Day Implementation Plan
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" data-testid="checklist-title">
                  30-Day AI Marketing{" "}
                  <span className="text-primary">Implementation</span> Checklist
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="checklist-subtitle">
                  Transform your Houston business with our proven 30-day AI marketing implementation checklist. Follow this step-by-step plan used by 50+ local businesses to save 15+ hours per week and increase revenue by 300%.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button asChild size="lg" data-testid="button-get-started">
                    <a href="/contact">Get Personal Implementation Guide</a>
                  </Button>
                  <Button asChild variant="outline" size="lg" data-testid="button-download">
                    <a href="/contact">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF Checklist
                    </a>
                  </Button>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                    20 actionable tasks
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    30 days to completion
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    300% average ROI
                  </div>
                </div>
              </AnimatedSection>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-4">
              <AnimatedSection>
                <Card className="shadow-xl" data-testid="progress-card">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <div className="text-2xl font-bold text-primary">{getCompletionPercentage()}%</div>
                      </div>
                      <h3 className="text-xl font-bold text-card-foreground">Your Progress</h3>
                      <p className="text-muted-foreground">Track your implementation</p>
                    </div>
                    <div className="space-y-4">
                      {checklistWeeks.map((week, index) => {
                        const weekTasks = week.tasks.length;
                        const completedWeekTasks = week.tasks.filter((_, taskIndex) => 
                          checkedItems[`${index}-${taskIndex}`]
                        ).length;
                        return (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm font-medium">{week.week}</span>
                            <Badge variant={completedWeekTasks === weekTasks ? "default" : "secondary"}>
                              {completedWeekTasks}/{weekTasks}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                    <Button asChild className="w-full mt-6" data-testid="button-get-help">
                      <a href="/contact">Get Implementation Help</a>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Expected Results */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="results-title">
                What to Expect After 30 Days
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Measurable results Houston businesses achieve following this checklist
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successMetrics.map((metric, index) => (
              <AnimatedSection key={index}>
                <Card className="h-full text-center hover-lift" data-testid={`metric-card-${index}`}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <metric.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-card-foreground mb-2">{metric.metric}</h3>
                    <div className="text-2xl font-bold text-primary mb-3">{metric.target}</div>
                    <p className="text-sm text-muted-foreground">{metric.measurement}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Checklist */}
      <section className="py-16 bg-muted/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="checklist-sections-title">
                Your 30-Day Implementation Checklist
              </h2>
              <p className="text-xl text-muted-foreground">
                Complete these tasks week by week for guaranteed AI marketing success
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-8">
            {checklistWeeks.map((week, weekIndex) => (
              <AnimatedSection key={weekIndex}>
                <Card className="shadow-sm" data-testid={`week-card-${weekIndex}`}>
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                        <span className="font-bold text-primary">{weekIndex + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-card-foreground">{week.title}</h3>
                        <p className="text-muted-foreground">{week.description}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {week.tasks.map((task, taskIndex) => {
                        const isChecked = checkedItems[`${weekIndex}-${taskIndex}`];
                        return (
                          <div 
                            key={taskIndex} 
                            className={`p-4 rounded-lg border transition-all ${isChecked ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' : 'bg-background border-border'}`}
                            data-testid={`task-${weekIndex}-${taskIndex}`}
                          >
                            <div className="flex items-start gap-4">
                              <div className="mt-1">
                                <Checkbox
                                  checked={isChecked}
                                  onCheckedChange={() => handleCheck(weekIndex, taskIndex)}
                                  className="data-[state=checked]:bg-green-600"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-3">
                                  <h4 className={`text-lg font-semibold ${isChecked ? 'text-green-800 dark:text-green-200 line-through' : 'text-card-foreground'}`}>
                                    {task.task}
                                  </h4>
                                  <div className="flex gap-2">
                                    <Badge variant="outline" className="text-xs">
                                      <Clock className="w-3 h-3 mr-1" />
                                      {task.timeRequired}
                                    </Badge>
                                    <Badge variant={task.difficulty === 'Easy' ? 'secondary' : task.difficulty === 'Medium' ? 'default' : 'destructive'} className="text-xs">
                                      {task.difficulty}
                                    </Badge>
                                  </div>
                                </div>
                                
                                <p className="text-muted-foreground mb-4">{task.description}</p>
                                
                                <div className="grid md:grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <strong className="text-card-foreground">Tools Needed:</strong>
                                    <ul className="text-muted-foreground mt-1">
                                      {task.tools.map((tool, toolIndex) => (
                                        <li key={toolIndex}>• {tool}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="md:col-span-2">
                                    <strong className="text-card-foreground">Expected Outcome:</strong>
                                    <p className="text-muted-foreground mt-1">{task.outcome}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Houston Success Stories */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="success-stories-title">
                Houston Businesses Using This Checklist
              </h2>
              <p className="text-xl text-muted-foreground">
                Real results from Houston business owners who followed our 30-day plan
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            <AnimatedSection>
              <Card className="h-full" data-testid="success-story-1">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-card-foreground">Houston Restaurant</h3>
                      <p className="text-sm text-muted-foreground">Family-owned Mexican restaurant</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Time Saved:</span>
                      <span className="font-semibold text-green-600">18 hours/week</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Revenue Increase:</span>
                      <span className="font-semibold text-green-600">+320%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Online Orders:</span>
                      <span className="font-semibold text-green-600">+450%</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    "Following the 30-day checklist transformed our business. We went from struggling with social media to having automated systems that bring in customers daily."
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection>
              <Card className="h-full" data-testid="success-story-2">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <Settings className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-card-foreground">HVAC Company</h3>
                      <p className="text-sm text-muted-foreground">Houston air conditioning service</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Response Time:</span>
                      <span className="font-semibold text-green-600">-85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Lead Generation:</span>
                      <span className="font-semibold text-green-600">+280%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Customer Satisfaction:</span>
                      <span className="font-semibold text-green-600">+40%</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    "The AI chatbot handles 70% of our customer inquiries automatically. We can focus on complex repairs while AI handles scheduling and basic questions."
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection>
              <Card className="h-full" data-testid="success-story-3">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-card-foreground">Real Estate Agency</h3>
                      <p className="text-sm text-muted-foreground">Houston luxury home sales</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Content Output:</span>
                      <span className="font-semibold text-green-600">+600%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Qualified Leads:</span>
                      <span className="font-semibold text-green-600">+380%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Social Engagement:</span>
                      <span className="font-semibold text-green-600">+250%</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    "AI helped us create personalized content for different Houston neighborhoods. Our social media engagement skyrocketed and we're closing more deals."
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="mb-8">
              <Lightbulb className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="support-title">
                Don't Go It Alone
              </h2>
              <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
                Get personalized guidance from Houston AI marketing experts. We'll help you implement each step and ensure you hit your 30-day goals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" data-testid="button-implementation-help">
                <a href="/contact">Get Implementation Support</a>
              </Button>
              <Button asChild variant="outline" size="lg" data-testid="button-workshop-attend">
                <a href="/ai-training">Attend Live Workshop</a>
              </Button>
            </div>
            <div className="mt-6 p-4 bg-background/50 rounded-lg inline-block">
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" />
                  Free consultation included
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-2" />
                  Guaranteed results in 30 days
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}