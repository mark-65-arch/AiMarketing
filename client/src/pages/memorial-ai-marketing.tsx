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
  Home,
  Car
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
import logoWide from "@assets/Logo3_1756847446520.png";

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

export default function MemorialAIMarketing() {
  const { toast } = useToast();

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      businessType: "",
      message: "I'm interested in AI marketing services for my Memorial Area business",
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
        description: "Thank you! We'll contact you within 24 hours to discuss AI marketing for your Memorial Area business.",
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
      "name": "Houston AI Marketing - Memorial",
      "description": "AI Marketing Services for Memorial Area Houston businesses. Local AI solutions for upscale services, family businesses, and professional services in Memorial Area.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Memorial Area Houston",
        "addressRegion": "TX",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "29.7752",
        "longitude": "-95.4618"
      },
      "areaServed": "Memorial Area Houston, TX",
      "serviceArea": "Memorial Area Houston, TX",
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
      <title>Memorial AI Marketing | AI Marketing Services Memorial Area Houston TX</title>
      <meta name="description" content="AI Marketing Services for Memorial Area Houston businesses. Help your upscale service, healthcare practice, or family business dominate local search near Memorial Park and CityCentre." />
      <meta name="keywords" content="Memorial AI marketing, AI marketing services Memorial Houston, Memorial Area marketing, AI automation Memorial TX, Memorial business marketing" />
      
      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
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
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600/20 text-blue-200 border border-blue-400/30">
                    <MapPin className="w-4 h-4 mr-2" />
                    Memorial Area, Houston TX
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  AI Marketing for{" "}
                  <span className="text-blue-300 drop-shadow-lg">Memorial Area</span>{" "}
                  Businesses
                </h1>
                <p className="text-xl text-gray-100 mb-8 leading-relaxed drop-shadow-md" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                  Reach Houston's most affluent families and professionals. Our AI marketing solutions help Memorial Area businesses near Memorial Park, City Centre, and Energy Corridor attract high-value clients who appreciate quality.
                </p>
                
                <div className="bg-blue-600/20 backdrop-blur-sm rounded-lg p-4 mb-6 border border-blue-400/30">
                  <p className="text-sm font-semibold text-blue-200 mb-1 drop-shadow-md">🌳 Memorial Area Special</p>
                  <p className="text-sm text-gray-200 drop-shadow-sm">Premium AI audit for businesses serving Memorial families and Energy Corridor executives</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200" data-testid="button-free-audit">
                    <a href="#contact">Get FREE Memorial Area AI Audit</a>
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

      {/* Memorial-Specific Challenges Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Memorial Area Business Challenges We Solve
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Memorial Area's affluent demographics demand premium marketing that reflects quality and sophistication
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection>
              <Card className="h-full">
                <CardContent className="p-8">
                  <Home className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-xl font-bold mb-4">Affluent Family Market</h3>
                  <p className="text-muted-foreground mb-4">
                    Memorial Area families have high expectations and substantial purchasing power. Your marketing must convey quality, trust, and premium value.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Premium brand positioning
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Family-focused messaging
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection>
              <Card className="h-full">
                <CardContent className="p-8">
                  <Building2 className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-xl font-bold mb-4">Energy Corridor Professionals</h3>
                  <p className="text-muted-foreground mb-4">
                    Energy industry executives and professionals require convenience, efficiency, and excellence. Timing and location targeting are crucial.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Executive schedule optimization
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Corporate service packages
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection>
              <Card className="h-full">
                <CardContent className="p-8">
                  <Car className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-xl font-bold mb-4">Memorial Park Lifestyle</h3>
                  <p className="text-muted-foreground mb-4">
                    The Memorial Park area attracts health-conscious, active families who value wellness, fitness, and outdoor lifestyle services.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Health & wellness targeting
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Active lifestyle marketing
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Memorial Success Stories */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Memorial Area Business Success Stories
              </h2>
              <p className="text-xl text-muted-foreground">
                Real results from Memorial Area businesses using AI marketing
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
                      <h3 className="font-bold text-lg">Memorial Pediatric Care</h3>
                      <p className="text-sm text-muted-foreground">Healthcare • Near Memorial Park</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "AI helped us connect with Memorial families perfectly. We're now the #1 pediatrician for 'Memorial Area' searches and our patient portal has reduced admin work by 70%."
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">400%</div>
                      <div className="text-sm text-muted-foreground">New Patients</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">70%</div>
                      <div className="text-sm text-muted-foreground">Admin Reduction</div>
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
                      <h3 className="font-bold text-lg">CityCentre Luxury Salon</h3>
                      <p className="text-sm text-muted-foreground">Beauty & Wellness • CityCentre</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "Our AI marketing attracts exactly the high-end clientele we want. We're booked 8 weeks out and our average service value has increased by 150%."
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">8 weeks</div>
                      <div className="text-sm text-muted-foreground">Booked Out</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">150%</div>
                      <div className="text-sm text-muted-foreground">Service Value</div>
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
                Get Your FREE Memorial Area Business AI Audit
              </h2>
              <p className="text-xl text-muted-foreground">
                Discover how AI can transform your Memorial Area business in just 30 minutes
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="memorial-contact-form">
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
                          <FormLabel>Memorial Area Business Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-business-type">
                                <SelectValue placeholder="Select your Memorial Area business type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="healthcare">Healthcare/Medical</SelectItem>
                              <SelectItem value="beauty">Beauty/Wellness Spa</SelectItem>
                              <SelectItem value="home-service">Home Services</SelectItem>
                              <SelectItem value="professional">Professional Services</SelectItem>
                              <SelectItem value="retail">Memorial Retail</SelectItem>
                              <SelectItem value="fitness">Fitness/Wellness</SelectItem>
                              <SelectItem value="restaurant">Memorial Restaurant</SelectItem>
                              <SelectItem value="other">Other Memorial Business</SelectItem>
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
                          <FormLabel>Tell us about your Memorial Area business goals</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can we help your Memorial Area business attract more affluent families and Energy Corridor professionals?"
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
                      data-testid="button-submit-memorial"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      {contactMutation.isPending ? "Sending..." : "Get My FREE Memorial Area AI Audit"}
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