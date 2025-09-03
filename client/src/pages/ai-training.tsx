import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion, useInView } from "framer-motion";
import { 
  BrainCircuit, 
  Clock, 
  Users, 
  CheckCircle, 
  Phone, 
  Mail, 
  Calendar,
  MapPin,
  Star,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Award,
  HeadphonesIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { insertContactSubmissionSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import type { InsertContactSubmission } from "@shared/schema";
import { useState } from "react";
import logoWide from "@assets/Logo3-ezgif.com-optipng_1756914512078.png";

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

export default function AITraining() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { toast } = useToast();

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      businessType: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Thank you! We'll contact you within 24 hours to discuss your project requirements and provide a custom quote.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    const messageWithContext = `${data.message}\n\nInterested in: AI Marketing System Setup Project`;
    contactMutation.mutate({ ...data, message: messageWithContext });
  };

  const faqs = [
    {
      question: "Do I need any technical experience for this project?",
      answer: "Not at all! We build everything for you. During the training session, we'll show you how to use your new system in simple, non-technical terms. You don't need to understand how it works, just how to operate it."
    },
    {
      question: "What exactly will I own after the 3 weeks?",
      answer: "You'll own a complete AI marketing system including: custom content generation tools, automated social media posting, email marketing workflows, and lead capture systems. Everything runs on platforms you control - no monthly fees to us."
    },
    {
      question: "How is this different from monthly marketing services?",
      answer: "Instead of paying monthly fees forever, you pay once and own the entire system. We build it, train you to use it, and you keep all the tools and automation forever. It's like buying a house instead of renting."
    },
    {
      question: "What if I need changes after the project is done?",
      answer: "You get 30 days of free support for questions and minor adjustments. After that, we offer maintenance packages or one-off updates at hourly rates. But most clients find the system works great as-is."
    },
    {
      question: "How much time will I need to spend during the 3 weeks?",
      answer: "Week 1 requires about 2 hours for strategy sessions. Week 2 is mostly us working behind the scenes. Week 3 needs 3-4 hours for training. After that, the system runs automatically with minimal input from you."
    },
    {
      question: "What if the system doesn't work for my business?",
      answer: "We do a thorough analysis before starting to ensure it's a good fit. If for any reason you're not satisfied after Week 1 planning phase, we'll refund your deposit. Our goal is long-term success, not quick sales."
    }
  ];

  const projectPackage = {
    name: "AI Marketing System Setup",
    price: "$1,500-2,500",
    duration: "3 weeks",
    delivery: "Complete system",
    description: "A complete AI marketing automation system custom-built for your business. You own everything, no monthly fees.",
    includes: [
      "Custom AI content generation system",
      "Automated social media posting", 
      "Email marketing integration",
      "Lead capture and nurturing workflows",
      "Complete training and handoff",
      "30-day post-launch support"
    ]
  };

  const processSteps = [
    {
      step: "Week 1",
      title: "Strategy & Planning",
      description: "We analyze your business, identify opportunities, and create a custom AI marketing strategy tailored to your Houston market."
    },
    {
      step: "Week 2", 
      title: "System Setup",
      description: "We build and configure your complete AI marketing system including content automation, social scheduling, and email integration."
    },
    {
      step: "Week 3",
      title: "Training & Handoff", 
      description: "Complete training session where you learn to operate your new system, plus 30 days of support for any questions."
    }
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
                <a href="/#services" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-services">Services</a>
                <a href="/assessment" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-assessment">Assessment</a>
                <a href="#contact" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg" data-testid="nav-cta">Get Quote</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-muted/30 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="lg:col-span-7">
              <AnimatedSection>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" data-testid="hero-title">
                  AI Marketing System Setup -{" "}
                  <span className="gradient-text">Complete Automation in 3 Weeks</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="hero-subtitle">
                  Get a complete AI marketing system built for your Houston business. Custom AI content creation, social automation, email integration, and full training. You own everything, no monthly fees.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button asChild size="lg" className="text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200" data-testid="button-register">
                    <a href="#contact">Get Project Quote</a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 hover:bg-muted/50 transition-all duration-200" data-testid="button-learn-more">
                    <a href="#package">View Package Details</a>
                  </Button>
                </div>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    3 Week Delivery
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Houston, TX
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    $1,500-2,500
                  </div>
                </div>
              </AnimatedSection>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-5">
              <AnimatedSection>
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Professional team learning AI marketing strategies" 
                  className="rounded-2xl shadow-2xl w-full hover-lift" 
                  data-testid="hero-image"
                />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Package Details Section */}
      <section id="package" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="package-title">
                AI Marketing System Setup Package
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="package-subtitle">
                Everything you need to automate your marketing and generate more leads. Custom-built for your Houston business and delivered in just 3 weeks.
              </p>
            </AnimatedSection>
          </div>

          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="hover-lift">
              <Card className="h-full shadow-lg" data-testid="project-package-card">
                <CardContent className="p-12">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <BrainCircuit className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-3xl font-bold text-card-foreground mb-4" data-testid="project-package-name">
                      {projectPackage.name}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed" data-testid="project-package-description">
                      {projectPackage.description}
                    </p>
                    <div className="mb-8">
                      <span className="text-4xl font-bold text-primary" data-testid="project-package-price">
                        {projectPackage.price}
                      </span>
                      <div className="text-lg text-muted-foreground mt-2">
                        {projectPackage.duration} • {projectPackage.delivery}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 mb-8">
                    {projectPackage.includes.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-primary mr-4 mt-0.5 flex-shrink-0" />
                        <span className="text-card-foreground text-lg">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <Button asChild size="lg" className="text-lg px-12 py-4" data-testid="button-start-project">
                      <a href="#contact">Start Your Project</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 demo-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="process-title">
                3-Week Project Timeline
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="process-subtitle">
                From strategy to handoff, we deliver your complete AI marketing system in just 3 weeks.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <AnimatedSection key={index}>
                <Card className="text-center shadow-sm h-full" data-testid={`process-step-${index}`}>
                  <CardContent className="p-8">
                    <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-lg font-bold">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-card-foreground mb-4" data-testid={`step-title-${index}`}>
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" data-testid={`step-description-${index}`}>
                      {step.description}
                    </p>
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
                What Houston Business Owners Say
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="testimonials-subtitle">
                See how our AI marketing systems have transformed local businesses across Houston.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection className="hover-lift">
              <Card className="shadow-sm h-full" data-testid="testimonial-card-1">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                      alt="Business owner testimonial" 
                      className="w-12 h-12 rounded-full mr-4" 
                      data-testid="testimonial-avatar-1"
                    />
                    <div>
                      <div className="font-semibold text-card-foreground" data-testid="testimonial-name-1">Workshop Participant</div>
                      <div className="text-sm text-muted-foreground" data-testid="testimonial-title-1">Houston Restaurant (Composite Feedback)</div>
                    </div>
                  </div>
                  <p className="text-card-foreground leading-relaxed mb-4" data-testid="testimonial-text-1">
                    "Workshop participants typically report feeling much more confident with social media and marketing content creation. Based on feedback collected, business owners commonly experience improved customer engagement and better marketing efficiency within 60-90 days."
                  </p>
                  <div className="flex text-yellow-400" data-testid="testimonial-stars-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection className="hover-lift">
              <Card className="shadow-sm h-full" data-testid="testimonial-card-2">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108755-2616c56d5e55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                      alt="Professional female business owner" 
                      className="w-12 h-12 rounded-full mr-4" 
                      data-testid="testimonial-avatar-2"
                    />
                    <div>
                      <div className="font-semibold text-card-foreground" data-testid="testimonial-name-2">Workshop Participant</div>
                      <div className="text-sm text-muted-foreground" data-testid="testimonial-title-2">Healthcare Professional (Composite Feedback)</div>
                    </div>
                  </div>
                  <p className="text-card-foreground leading-relaxed mb-4" data-testid="testimonial-text-2">
                    "Healthcare professionals commonly find our workshops helpful for learning to streamline patient communications and create educational content more efficiently. Participants typically report saving 3-8 hours weekly on administrative tasks."
                  </p>
                  <div className="flex text-yellow-400" data-testid="testimonial-stars-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection className="hover-lift">
              <Card className="shadow-sm h-full" data-testid="testimonial-card-3">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                      alt="Professional male business owner" 
                      className="w-12 h-12 rounded-full mr-4" 
                      data-testid="testimonial-avatar-3"
                    />
                    <div>
                      <div className="font-semibold text-card-foreground" data-testid="testimonial-name-3">Workshop Participant</div>
                      <div className="text-sm text-muted-foreground" data-testid="testimonial-title-3">Legal Professional (Composite Feedback)</div>
                    </div>
                  </div>
                  <p className="text-card-foreground leading-relaxed mb-4" data-testid="testimonial-text-3">
                    "Legal professionals often start our workshops with reservations about AI, but commonly leave with practical knowledge for creating professional content and organizing client intake processes more efficiently."
                  </p>
                  <div className="flex text-yellow-400" data-testid="testimonial-stars-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 demo-container">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="faq-title">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground" data-testid="faq-subtitle">
                Get answers to common questions about our AI marketing system setup project.
              </p>
            </AnimatedSection>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index}>
                <Card className="shadow-sm" data-testid={`faq-item-${index}`}>
                  <Collapsible open={openFaq === index} onOpenChange={() => setOpenFaq(openFaq === index ? null : index)}>
                    <CollapsibleTrigger asChild>
                      <CardContent className="p-6 cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-foreground text-left" data-testid={`faq-question-${index}`}>
                            {faq.question}
                          </h3>
                          {openFaq === index ? 
                            <ChevronUp className="w-5 h-5 text-muted-foreground" /> : 
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          }
                        </div>
                      </CardContent>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="px-6 pb-6 pt-0">
                        <p className="text-muted-foreground leading-relaxed" data-testid={`faq-answer-${index}`}>
                          {faq.answer}
                        </p>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/Registration Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="contact-title">
                Ready to Master AI Marketing?
              </h2>
              <p className="text-xl text-muted-foreground" data-testid="contact-subtitle">
                Secure your spot in our next workshop and transform your Houston business with AI marketing.
              </p>
            </AnimatedSection>
          </div>

          <AnimatedSection>
            <Card className="shadow-xl" data-testid="contact-card">
              <CardContent className="p-8 md:p-12">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} data-testid="input-first-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Smith" {...field} data-testid="input-last-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@yourbusiness.com" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(713) 555-0123" {...field} data-testid="input-phone" inputMode="tel" autoComplete="tel" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="businessType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-business-type">
                                <SelectValue placeholder="Select your business type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="restaurant">Restaurant/Food Service</SelectItem>
                              <SelectItem value="medical">Healthcare/Medical Practice</SelectItem>
                              <SelectItem value="legal">Legal Services</SelectItem>
                              <SelectItem value="realestate">Real Estate</SelectItem>
                              <SelectItem value="retail">Retail/E-commerce</SelectItem>
                              <SelectItem value="professional">Professional Services</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Details & Questions</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your business and what you'd like to achieve with AI marketing..."
                              className="resize-none"
                              {...field}
                              value={field.value || ""}
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full text-lg py-4"
                      disabled={contactMutation.isPending}
                      data-testid="button-submit"
                    >
                      {contactMutation.isPending ? "Submitting..." : "Get Project Quote"}
                    </Button>
                  </form>
                </Form>

                <div className="mt-8 pt-8 border-t border-border text-center">
                  <p className="text-muted-foreground mb-4">
                    Have questions? Contact us directly:
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8">
                    <div className="flex items-center text-foreground">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>(713) 555-0123</span>
                    </div>
                    <div className="flex items-center text-foreground">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>info@marketingaihouston.com</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}