import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion, useInView } from "framer-motion";
import { 
  BrainCircuit, 
  MapPin, 
  CheckCircle, 
  Phone, 
  Mail, 
  Star,
  Building2,
  Users,
  TrendingUp,
  Award,
  Send,
  Briefcase,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertContactSubmissionSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import type { InsertContactSubmission } from "@shared/schema";
import houstonSkylineImage from "@assets/houston-skyline.jpg";
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

export default function LeagueCityAIMarketing() {
  const { toast } = useToast();

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      businessType: "",
      message: "I'm interested in AI marketing services for my League City business",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const response = await apiRequest("POST", "/api/contact", data);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "🎉 Success!",
        description: "Thank you! We'll contact you within 24 hours to discuss AI marketing for your League City business.",
        duration: 6000,
      });
      form.reset();
    },
    onError: (error: any) => {
      console.error('Contact form submission error:', error);
      const errorMessage = error.message?.includes('Server error') 
        ? 'Our servers are experiencing high demand. Please try again in a few minutes or call us directly at (713) 555-AI01.'
        : 'Something went wrong. Please check your internet connection and try again, or call us directly at (713) 555-AI01.';
      
      toast({
        title: "❌ Submission Failed",
        description: errorMessage,
        variant: "destructive",
        duration: 8000,
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    contactMutation.mutate(data);
  };

  // Schema markup for local SEO
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Marketing AI Houston - League City",
      "description": "AI Marketing Services for League City businesses. Local AI solutions for professional services and family businesses in League City area.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "League City",
        "addressRegion": "TX",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "29.5074",
        "longitude": "-95.0949"
      },
      "areaServed": "League City, TX",
      "serviceArea": "League City, TX",
      "priceRange": "$397-$2500",
      "telephone": "(713) 555-AI01"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-background font-sans antialiased">
      {/* SEO Head */}
      <title>League City AI Marketing | AI Marketing Services League City TX</title>
      <meta name="description" content="AI Marketing Services for League City businesses. Help your professional services or family business dominate local search in League City's thriving community along I-45 and Highway 96." />
      <meta name="keywords" content="League City AI marketing, AI marketing services League City, League City marketing, AI automation League City TX, professional services League City" />
      
      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" data-testid="nav-logo">
                <img src={logoWide} alt="Marketing AI Houston" className="h-10 w-auto" />
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors">Home</a>
              <a href="/about" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors">About</a>
              <a href="/ai-tools" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors">Free AI Tools</a>
              <a href="/contact" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors">Contact</a>
              <a href="#contact" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg">Get FREE Audit</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="relative py-20 lg:py-32 overflow-hidden hero-section"
        style={{
          backgroundImage: `url(${houstonSkylineImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          willChange: 'transform',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="lg:col-span-8">
              <AnimatedSection>
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-600/20 text-indigo-200 border border-indigo-400/30">
                    <MapPin className="w-4 h-4 mr-2" />
                    League City, TX
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  AI Marketing for{" "}
                  <span className="text-indigo-300 drop-shadow-lg">League City</span>{" "}
                  Businesses
                </h1>
                <p className="text-xl text-gray-100 mb-8 leading-relaxed drop-shadow-md" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                  Connect with League City's professional community. Our AI marketing solutions help businesses along I-45 and Highway 96 attract local families and build lasting relationships in this thriving city.
                </p>
                
                <div className="bg-indigo-600/20 backdrop-blur-sm rounded-lg p-4 mb-6 border border-indigo-400/30">
                  <p className="text-sm font-semibold text-indigo-200 mb-1 drop-shadow-md">⭐ League City Professional Special</p>
                  <p className="text-sm text-gray-200 drop-shadow-sm">Premium AI audit for professional services and family-oriented businesses</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200" data-testid="button-free-audit">
                    <a href="#contact">Get FREE League City Business AI Audit</a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-200" data-testid="button-call">
                    <a href="tel:(713)555-AI01">Call (713) 555-AI01</a>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* League City Success Stories */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                League City Business Success Stories
              </h2>
              <p className="text-xl text-muted-foreground">
                Composite feedback from League City business community research
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection>
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Award className="w-8 h-8 text-primary mr-3" />
                    <div>
                      <h3 className="font-bold text-lg">Professional Services - I-45 Corridor</h3>
                      <p className="text-sm text-muted-foreground">Composite Experience • Professional District</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "Research from professional services shows businesses commonly experience improved client communication and appointment scheduling when implementing AI systems for suburban professional communities."
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">Better</div>
                      <div className="text-sm text-muted-foreground">Client Communication</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">Improved</div>
                      <div className="text-sm text-muted-foreground">Schedule Management</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection>
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Award className="w-8 h-8 text-primary mr-3" />
                    <div>
                      <h3 className="font-bold text-lg">Family Business - Highway 96</h3>
                      <p className="text-sm text-muted-foreground">Industry Research • Family Business District</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "Family business research indicates League City establishments commonly benefit from building community relationships and targeting local families through personalized marketing approaches."
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">Enhanced</div>
                      <div className="text-sm text-muted-foreground">Community Bonds</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">Better</div>
                      <div className="text-sm text-muted-foreground">Family Targeting</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Get Your FREE League City Business AI Audit
              </h2>
              <p className="text-xl text-muted-foreground">
                Discover how AI can transform your League City business in just 30 minutes
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="leaguecity-contact-form">
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

                    <FormField
                      control={form.control}
                      name="businessType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>League City Business Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-business-type">
                                <SelectValue placeholder="Select your League City business type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="professional">Professional Services</SelectItem>
                              <SelectItem value="family-business">Family Business</SelectItem>
                              <SelectItem value="healthcare">Healthcare Services</SelectItem>
                              <SelectItem value="restaurant">Family Restaurant</SelectItem>
                              <SelectItem value="retail">Local Retail</SelectItem>
                              <SelectItem value="fitness">Fitness/Wellness</SelectItem>
                              <SelectItem value="home-services">Home Services</SelectItem>
                              <SelectItem value="other">Other League City Business</SelectItem>
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
                          <FormLabel>Tell us about your League City business goals</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can we help your League City business connect with local professionals and families?"
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
                      data-testid="button-submit-leaguecity"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      {contactMutation.isPending ? "Sending..." : "Get My FREE League City AI Audit"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}