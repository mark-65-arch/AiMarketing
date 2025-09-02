import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion, useInView } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle,
  Calendar,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logoWide from "@assets/GeneratedImageSeptember022025-3_25PM1-ezgif.com-gif-maker-removebg-preview_1756847016286.png";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertContactSubmissionSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import type { InsertContactSubmission } from "@shared/schema";

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

export default function Contact() {
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
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us! We'll respond within 4 hours to discuss your AI marketing needs.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or call us directly at (713) 555-0123.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    contactMutation.mutate(data);
  };

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "Phone",
      value: "(713) 555-0123",
      description: "Call us for immediate assistance",
      action: "tel:+17135550123"
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email", 
      value: "info@aihoustonmarketing.com",
      description: "Send us a detailed message",
      action: "mailto:info@aihoustonmarketing.com"
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Address",
      value: "1234 Main Street, Suite 100",
      description: "Houston, TX 77002",
      action: "https://maps.google.com/?q=1234+Main+Street+Suite+100+Houston+TX+77002"
    }
  ];

  const businessHours = [
    { days: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { days: "Saturday", hours: "10:00 AM - 2:00 PM" },
    { days: "Sunday", hours: "Closed" }
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, name: "Facebook", href: "#" },
    { icon: <Twitter className="w-5 h-5" />, name: "Twitter", href: "#" },
    { icon: <Linkedin className="w-5 h-5" />, name: "LinkedIn", href: "#" },
    { icon: <Instagram className="w-5 h-5" />, name: "Instagram", href: "#" }
  ];

  return (
    <div className="bg-background font-sans antialiased">
      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold text-secondary">
                <a href="/" data-testid="nav-logo">
                  <img src={logoWide} alt="Marketing AI Houston" className="h-10 w-auto" />
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="/" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-home">Home</a>
                <a href="/about" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-about">About</a>
                <a href="/#services" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-services">Services</a>
                <a href="/ai-tools" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-ai-tools">Free AI Tools</a>
                <a href="/contact" className="text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-contact">Contact</a>
                <a href="#contact-form" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg" data-testid="nav-cta">Get Started</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-muted/30 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AnimatedSection>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" data-testid="hero-title">
                Contact{" "}
                <span className="gradient-text">Houston AI Marketing</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto" data-testid="hero-subtitle">
                Ready to transform your Houston business with AI marketing? Get in touch with us today for a free consultation and discover how artificial intelligence can drive your growth.
              </p>
              <div className="inline-flex items-center bg-accent/10 text-accent px-4 py-2 rounded-lg text-sm font-medium">
                <Clock className="w-4 h-4 mr-2" />
                We respond to all inquiries within 4 hours
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <AnimatedSection key={index} className="hover-lift">
                <Card className="h-full shadow-sm text-center" data-testid={`contact-method-${index}`}>
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                      {method.icon}
                    </div>
                    <h3 className="text-xl font-bold text-card-foreground mb-2" data-testid={`contact-title-${index}`}>
                      {method.title}
                    </h3>
                    <div className="text-primary font-semibold mb-2" data-testid={`contact-value-${index}`}>
                      {method.value}
                    </div>
                    <p className="text-muted-foreground text-sm mb-6" data-testid={`contact-description-${index}`}>
                      {method.description}
                    </p>
                    <Button asChild variant="outline" className="w-full" data-testid={`contact-button-${index}`}>
                      <a href={method.action} target={method.title === "Address" ? "_blank" : "_self"}>
                        {method.title === "Phone" ? "Call Now" : method.title === "Email" ? "Send Email" : "View Map"}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Business Hours */}
      <section id="contact-form" className="py-20 demo-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <Card className="shadow-xl" data-testid="contact-form-card">
                  <CardContent className="p-8">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-4" data-testid="form-title">
                        Send Us a Message
                      </h2>
                      <p className="text-muted-foreground" data-testid="form-subtitle">
                        Tell us about your business and how we can help you succeed with AI marketing.
                      </p>
                    </div>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your first name" {...field} data-testid="input-first-name" />
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
                                  <Input placeholder="Your last name" {...field} data-testid="input-last-name" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="your@email.com" {...field} data-testid="input-email" />
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
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="(713) 555-0123" {...field} data-testid="input-phone" inputMode="tel" autoComplete="tel" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="businessType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Type</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Restaurant, Medical Practice" {...field} data-testid="input-business-type" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormItem>
                            <FormLabel>Service Interest</FormLabel>
                            <Select data-testid="select-service-interest">
                              <SelectTrigger>
                                <SelectValue placeholder="What service interests you?" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ai-training">AI Training Workshop</SelectItem>
                                <SelectItem value="business-profile">Business Profile Optimization</SelectItem>
                                <SelectItem value="ai-website">AI Website Development</SelectItem>
                                <SelectItem value="general">General Inquiry</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        </div>

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Tell us about your business goals and how we can help you succeed with AI marketing..."
                                  className="min-h-[120px]"
                                  {...field}
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
                          className="w-full text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                          disabled={contactMutation.isPending}
                          data-testid="button-send-message"
                        >
                          <Send className="w-5 h-5 mr-2" />
                          {contactMutation.isPending ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>

            {/* Business Hours and Additional Info */}
            <div className="mt-12 lg:mt-0 space-y-8">
              {/* Business Hours */}
              <AnimatedSection>
                <Card className="shadow-sm" data-testid="business-hours-card">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Clock className="w-6 h-6 text-primary mr-3" />
                      <h3 className="text-xl font-bold text-foreground" data-testid="hours-title">Business Hours</h3>
                    </div>
                    <div className="space-y-3">
                      {businessHours.map((schedule, index) => (
                        <div key={index} className="flex justify-between text-sm" data-testid={`hours-schedule-${index}`}>
                          <span className="text-muted-foreground">{schedule.days}</span>
                          <span className="font-medium text-foreground">{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* Free Consultation */}
              <AnimatedSection>
                <Card className="shadow-sm bg-primary/5 border-primary/20" data-testid="consultation-card">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Calendar className="w-6 h-6 text-primary mr-3" />
                      <h3 className="text-xl font-bold text-foreground" data-testid="consultation-title">
                        Free 15-Minute Consultation
                      </h3>
                    </div>
                    <p className="text-muted-foreground mb-4 text-sm">
                      Schedule a quick call to discuss your AI marketing goals and see how we can help your Houston business grow.
                    </p>
                    <Button asChild className="w-full" data-testid="button-schedule-consultation">
                      <a href="tel:+17135550123">Schedule Now</a>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* Social Media */}
              <AnimatedSection>
                <Card className="shadow-sm" data-testid="social-media-card">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <MessageSquare className="w-6 h-6 text-primary mr-3" />
                      <h3 className="text-xl font-bold text-foreground" data-testid="social-title">Follow Us</h3>
                    </div>
                    <p className="text-muted-foreground mb-4 text-sm">
                      Stay updated with the latest AI marketing tips and Houston business insights.
                    </p>
                    <div className="flex space-x-3">
                      {socialLinks.map((social, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="icon"
                          asChild
                          data-testid={`social-link-${index}`}
                        >
                          <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                            {social.icon}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Map/Address Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Card className="shadow-xl" data-testid="location-card">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="location-title">
                    Visit Our Houston Office
                  </h2>
                  <p className="text-xl text-muted-foreground" data-testid="location-subtitle">
                    Located in the heart of Houston's business district
                  </p>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-12 text-center">
                  <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                  <div className="text-lg font-semibold text-foreground mb-2">1234 Main Street, Suite 100</div>
                  <div className="text-lg text-muted-foreground mb-4">Houston, TX 77002</div>
                  <Button asChild variant="outline" data-testid="button-directions">
                    <a href="https://maps.google.com/?q=1234+Main+Street+Suite+100+Houston+TX+77002" target="_blank">
                      Get Directions
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}