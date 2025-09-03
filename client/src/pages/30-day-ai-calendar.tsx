import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Calendar, 
  CheckCircle, 
  Download, 
  Star, 
  Zap,
  Shield,
  Clock,
  Target,
  TrendingUp,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import logoWide from "@assets/Logo 3_1756914281767.png";

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

export default function ThirtyDayAICalendar() {
  const calendarBenefits = [
    "Day-by-day implementation plan for 30 days",
    "Priority tasks ranked by impact and ease",
    "Weekly milestone checkpoints and progress tracking",
    "Houston-specific implementation examples",
    "Time estimates for each task (15 min to 2 hours max)",
    "Free vs. paid tool recommendations by week",
    "Troubleshooting guide for common setup issues",
    "Printable calendar and digital checklist versions",
    "Bonus weekend tasks for accelerated growth",
    "Week 5 expansion plan for continued growth"
  ];

  const weekPreviews = [
    {
      week: 1,
      title: "Foundation Week",
      description: "Set up essential accounts and basic AI tools",
      tasks: ["ChatGPT account setup", "Google Business Profile audit", "Social media audit", "Content calendar planning"],
      timeCommitment: "2-3 hours total",
      icon: <Target className="w-6 h-6" />
    },
    {
      week: 2,
      title: "Content Creation",
      description: "Implement AI-powered content generation",
      tasks: ["AI content templates", "Social media automation", "Blog post creation", "Email sequences"],
      timeCommitment: "3-4 hours total",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      week: 3,
      title: "Customer Automation",
      description: "Launch chatbots and automated responses",
      tasks: ["Chatbot setup", "FAQ automation", "Review response templates", "Lead qualification"],
      timeCommitment: "4-5 hours total",
      icon: <Users className="w-6 h-6" />
    },
    {
      week: 4,
      title: "Optimization & Scaling",
      description: "Analyze results and expand successful strategies",
      tasks: ["Performance analysis", "A/B testing", "Advanced automation", "ROI calculations"],
      timeCommitment: "3-4 hours total",
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  const testimonials = [
    {
      name: "Maria Santos",
      business: "Santos Catering",
      location: "Montrose, Houston",
      quote: "Following this calendar step-by-step was a game changer! We increased bookings by 400% in just 30 days.",
      rating: 5
    },
    {
      name: "James Park",
      business: "Park's HVAC Services",
      location: "Cypress, TX",
      quote: "The daily tasks were so manageable. We went from 5 calls a week to 25+ without any stress!",
      rating: 5
    },
    {
      name: "Sofia Rodriguez",
      business: "Rodriguez Law Firm",
      location: "Downtown Houston",
      quote: "This calendar kept us on track. We saved 15 hours per week and tripled our qualified leads.",
      rating: 5
    }
  ];

  const stats = [
    { number: "30 Days", label: "Step-by-Step Plan" },
    { number: "15 Min", label: "Daily Time Investment" },
    { number: "200%", label: "Average Lead Increase" },
    { number: "15 Hours", label: "Weekly Time Saved" }
  ];

  const dailyTasksPreview = [
    { day: "Day 1", task: "Set up ChatGPT account and learn basic prompts", time: "15 min" },
    { day: "Day 2", task: "Audit your Google Business Profile", time: "20 min" },
    { day: "Day 3", task: "Create your first AI-generated social media posts", time: "30 min" },
    { day: "Day 4", task: "Set up automated email responses", time: "25 min" },
    { day: "Day 5", task: "Implement basic chatbot on website", time: "45 min" },
    { day: "Day 6-7", task: "Weekend review and planning for Week 2", time: "30 min" }
  ];

  return (
    <div className="bg-background font-sans antialiased">
      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" data-testid="nav-logo">
                <img src={logoWide} alt="Marketing AI Houston" className="h-10 w-auto" />
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="/" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-home">Home</a>
                <a href="/about" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-about">About</a>
                <a href="/contact" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-contact">Contact</a>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium" data-testid="nav-cta">
                  <a href="#calendar-form">Get Calendar</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-accent/10 via-background to-primary/10 pt-20 lg:pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <AnimatedSection>
              <div className="inline-flex items-center bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                FREE DOWNLOAD - Transform in 30 Days
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" data-testid="hero-title">
                30-Day{" "}
                <span className="gradient-text">AI Marketing Implementation</span>{" "}
                Calendar for Houston Businesses
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto" data-testid="hero-subtitle">
                Transform your Houston business with our proven day-by-day action plan. Follow simple 15-minute daily tasks and see a 200% increase in leads within 30 days - guaranteed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                  onClick={() => document.getElementById('calendar-form')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="button-get-calendar"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Get My FREE Calendar
                </Button>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 mr-2 text-primary" />
                  Instant download • Printable version • Digital checklist
                </div>
              </div>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center" data-testid={`stat-${index}`}>
                    <div className="text-2xl md:text-3xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Week by Week Preview */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="weeks-title">
                Your 4-Week Transformation Journey
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="weeks-subtitle">
                Each week builds on the previous to create a comprehensive AI marketing system
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {weekPreviews.map((week, index) => (
              <AnimatedSection key={index} className="hover-lift">
                <Card className="h-full shadow-sm" data-testid={`week-card-${index}`}>
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                          <div className="text-primary">{week.icon}</div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-1" data-testid={`week-title-${index}`}>
                            Week {week.week}: {week.title}
                          </h3>
                          <p className="text-muted-foreground" data-testid={`week-description-${index}`}>
                            {week.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">Key Tasks:</h4>
                      <ul className="space-y-2">
                        {week.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-accent/10 rounded-lg p-4 text-center">
                      <div className="text-sm text-accent font-medium">Time Commitment</div>
                      <div className="text-lg font-bold text-foreground">{week.timeCommitment}</div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Tasks Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="daily-title">
                Sample Week 1 Daily Tasks
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="daily-subtitle">
                See exactly what you'll be doing each day to transform your business
              </p>
            </AnimatedSection>
          </div>

          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <Card className="shadow-lg" data-testid="daily-tasks-card">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {dailyTasksPreview.map((task, index) => (
                      <div key={index} className="flex items-center justify-between border-b border-border pb-4 last:border-b-0 last:pb-0" data-testid={`daily-task-${index}`}>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                            <span className="text-primary text-sm font-bold">{index + 1}</span>
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{task.day}</div>
                            <div className="text-muted-foreground text-sm">{task.task}</div>
                          </div>
                        </div>
                        <div className="text-primary font-medium text-sm">{task.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="included-title">
                Everything Included in Your 30-Day Calendar
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="included-subtitle">
                A complete system to transform your Houston business in just one month
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {calendarBenefits.map((benefit, index) => (
              <AnimatedSection key={index} className="hover-lift">
                <Card className="h-full shadow-sm" data-testid={`benefit-card-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 mt-1">
                        <CheckCircle className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-foreground font-medium leading-relaxed" data-testid={`benefit-text-${index}`}>
                          {benefit}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="testimonials-title">
                Houston Businesses Transformed in 30 Days
              </h2>
              <p className="text-xl text-muted-foreground" data-testid="testimonials-subtitle">
                Real results from business owners who followed our calendar
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} className="hover-lift">
                <Card className="h-full shadow-sm" data-testid={`testimonial-card-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-foreground mb-6 leading-relaxed" data-testid={`testimonial-quote-${index}`}>
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <div className="font-semibold text-foreground" data-testid={`testimonial-name-${index}`}>
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground" data-testid={`testimonial-business-${index}`}>
                        {testimonial.business}
                      </div>
                      <div className="text-xs text-muted-foreground" data-testid={`testimonial-location-${index}`}>
                        {testimonial.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="calendar-form" className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <AnimatedSection>
              <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Clock className="w-4 h-4 mr-2" />
                Start your transformation today • Only 15 min/day
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="form-section-title">
                Get Your Free 30-Day AI Implementation Calendar
              </h2>
              <p className="text-xl text-muted-foreground" data-testid="form-section-subtitle">
                Complete day-by-day action plan delivered instantly to your inbox
              </p>
            </AnimatedSection>
          </div>

          <LeadMagnetForm
            leadMagnetType="calendar"
            title="Download Your Free 30-Day AI Marketing Calendar"
            subtitle="Transform your Houston business with our proven step-by-step daily action plan"
            benefits={calendarBenefits}
            onSuccess={() => {
              // Redirect to thank you page
              window.location.href = '/thank-you?type=calendar';
            }}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="cta-title">
              Your 30-Day Transformation Starts Today
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto" data-testid="cta-subtitle">
              Don't wait another day to transform your Houston business. Download your calendar and start seeing results in just 15 minutes per day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                onClick={() => document.getElementById('calendar-form')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-final-cta"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Start My 30-Day Transformation
              </Button>
              <div className="text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 inline mr-1 text-primary" />
                30 days • Daily tasks • Guaranteed results
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}