import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Phone, 
  Mail,
  MapPin,
  Star,
  Play,
  Users,
  TrendingUp,
  Clock,
  Award,
  Shield,
  Target,
  Trophy
} from "lucide-react";
import houstonSkylineImage from "@assets/houston-skyline.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertContactSubmissionSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { SEOHead, generateLocationKeywords } from "@/components/seo/SEOHead";
import { LocalBusinessSchema, WebPageSchema } from "@/components/seo/SchemaMarkup";
import { Navigation } from "@/components/Navigation";
import type { InsertContactSubmission } from "@shared/schema";
import { z } from "zod";

const leadMagnetSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type LeadMagnetForm = z.infer<typeof leadMagnetSchema>;

export default function Homepage() {
  const { toast } = useToast();
  
  // SEO data
  const pageTitle = "Houston's #1 AI Marketing Agency - Get 3X More Customers in 90 Days";
  const pageDescription = "We help Houston businesses save 10+ hours per week and dominate local search using proven AI marketing systems. Now serving Houston businesses.";
  const pageKeywords = generateLocationKeywords("Houston", "AI Marketing");
  const canonicalUrl = "https://houstonaimarketing.com/";

  const form = useForm<LeadMagnetForm>({
    resolver: zodResolver(leadMagnetSchema),
    defaultValues: {
      email: "",
    },
  });

  const auditMutation = useMutation({
    mutationFn: async (data: LeadMagnetForm) => {
      const response = await apiRequest("POST", "/api/lead-magnet", {
        firstName: "",
        lastName: "",
        email: data.email,
        phone: "",
        businessType: "",
        leadMagnetType: "audit",
        additionalInfo: "Homepage AI Marketing Audit Request",
      });
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "🎉 Success!",
        description: "Check your email! Your FREE AI Marketing Audit guide is on the way.",
        duration: 6000,
      });
      form.reset();
      window.location.href = "/thank-you";
    },
    onError: (error: any) => {
      toast({
        title: "❌ Submission Failed",
        description: "Something went wrong. Please try again or call us directly at (713) 555-0198.",
        variant: "destructive",
        duration: 8000,
      });
    },
  });

  const onSubmit = (data: LeadMagnetForm) => {
    auditMutation.mutate(data);
  };

  return (
    <div className="bg-background font-sans antialiased">
      {/* SEO Components */}
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
        canonicalUrl={canonicalUrl}
        ogTitle="Houston's #1 AI Marketing Agency"
        ogDescription={pageDescription}
        ogImage="https://houstonaimarketing.com/images/houston-ai-marketing-og.jpg"
        twitterTitle="Houston's #1 AI Marketing Agency"
        twitterDescription={pageDescription}
        twitterImage="https://houstonaimarketing.com/images/houston-ai-marketing-twitter.jpg"
      />

      {/* Schema Markup */}
      <LocalBusinessSchema
        aggregateRating={{
          ratingValue: 4.9,
          reviewCount: 89
        }}
      />
      <WebPageSchema
        title={pageTitle}
        description={pageDescription}
        url={canonicalUrl}
      />

      {/* Navigation */}
      <Navigation />

      {/* HERO SECTION */}
      <section 
        className="relative overflow-hidden"
        style={{
          backgroundImage: `url(${houstonSkylineImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          paddingTop: '64px',
          minHeight: '100vh'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6" data-testid="hero-title" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                <span className="text-blue-300">AI Marketing Systems</span>{" "}
                That Run Themselves
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 mb-6 leading-relaxed max-w-3xl mx-auto" data-testid="hero-subtitle" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                We build professional AI marketing systems for Houston businesses. One-time setup, lifetime benefits. No monthly fees.
              </p>
              <div className="mb-4">
                <p className="text-lg font-medium text-blue-200" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                  AI Marketing Systems Specialist
                </p>
              </div>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                Launched September 2025 - Now serving Houston and surrounding areas
              </p>

              {/* Trust Indicator */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 border border-white/20 max-w-md mx-auto">
                <p className="text-white font-semibold flex items-center justify-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  Now Serving Houston Businesses
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </p>
              </div>

              {/* CTAs - Mobile Optimized */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="text-lg px-10 py-6 min-h-[56px] w-full sm:w-auto text-white bg-blue-600 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 font-bold" 
                  data-testid="button-primary-cta"
                >
                  <a href="#audit-form">Book Free Consultation</a>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-6 min-h-[56px] w-full sm:w-auto text-white border-white/70 hover:bg-white hover:text-gray-900 transition-all duration-200 font-medium" 
                  data-testid="button-demo"
                >
                  <a href="/services" className="flex items-center justify-center gap-2">
                    <Play className="w-5 h-5" />
                    See Project Packages
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">New</div>
              <div className="text-sm text-gray-600">Houston Business</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">AI-Proven</div>
              <div className="text-sm text-gray-600">Results</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">10+</div>
              <div className="text-sm text-gray-600">Hours Saved Weekly</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">Professional</div>
              <div className="text-sm text-gray-600">Service Guaranteed</div>
            </motion.div>
          </div>

          {/* Single Standout Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-blue-50 border-blue-200 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    SM
                  </div>
                  <div className="flex-1">
                    <div className="flex text-yellow-400 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-lg text-gray-800 mb-4 leading-relaxed italic">
                      "As Houston's newest AI marketing specialist, I bring fresh expertise and cutting-edge AI systems to help local businesses automate their marketing and save time."
                    </p>
                    <div className="font-semibold text-gray-900">Founder</div>
                    <div className="text-gray-600">Marketing AI Houston</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Disclaimer */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Results may vary. Past performance does not guarantee future results.
          </p>
        </div>
      </section>

      {/* SERVICES OVERVIEW (Simplified) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Project Package
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional AI marketing systems built for you. One-time setup, lifetime ownership.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Package 1: Google Business AI Domination */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    Google Business AI Domination
                  </h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Complete profile optimization + 6 months automated posting
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      AI review response system + training included
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Delivered in 2 weeks, then you own it forever
                    </li>
                  </ul>
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-blue-600 mb-1">$800-1,200</div>
                    <div className="text-gray-600">one-time project</div>
                  </div>
                  <Button asChild className="w-full min-h-[48px]" size="lg">
                    <a href="/google-business-ai">Learn More</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Package 2: AI Marketing System Setup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-blue-500">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-center mb-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      MOST POPULAR
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    AI Marketing System Setup
                  </h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Custom AI content creation system you control
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Social media automation + email integration
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Delivered in 3 weeks with full training
                    </li>
                  </ul>
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-green-600 mb-1">$1,500-2,500</div>
                    <div className="text-gray-600">one-time project</div>
                  </div>
                  <Button asChild className="w-full min-h-[48px]" size="lg">
                    <a href="/ai-marketing-system">Learn More</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Package 3: Website + AI Optimization */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    Website + AI Optimization
                  </h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Complete AI-optimized website + smart chatbot
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Local SEO + conversion optimization included
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Delivered in 4 weeks, lifetime ownership
                    </li>
                  </ul>
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-purple-600 mb-1">$2,500-5,000</div>
                    <div className="text-gray-600">complete project</div>
                  </div>
                  <Button asChild className="w-full min-h-[48px]" size="lg">
                    <a href="/website-ai-optimization">Learn More</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ONE LEAD MAGNET SECTION */}
      <section id="audit-form" className="py-16 bg-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Book Your FREE Consultation
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover which AI marketing system is right for your Houston business. New business special - limited-time introductory pricing.
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-6">What's Included:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-blue-100">
                    <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                    <span>Assessment of which AI system fits your business needs</span>
                  </li>
                  <li className="flex items-start gap-3 text-blue-100">
                    <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                    <span>Project timeline and deliverables breakdown</span>
                  </li>
                  <li className="flex items-start gap-3 text-blue-100">
                    <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                    <span>One-time investment breakdown with no hidden fees</span>
                  </li>
                </ul>
              </div>

              <div>
                <Card className="bg-white shadow-xl">
                  <CardContent className="p-8">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-900 font-medium">Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your business email"
                                  {...field}
                                  className="h-12 text-lg"
                                  data-testid="audit-email-input"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          disabled={auditMutation.isPending}
                          className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 min-h-[56px]"
                          data-testid="audit-submit-button"
                        >
                          {auditMutation.isPending ? "Sending..." : "Book Free Consultation"}
                        </Button>
                      </form>
                    </Form>
                    <p className="text-xs text-gray-500 mt-4 text-center">
                      No spam. Unsubscribe anytime. Professional consultation value.
                    </p>
                    <p className="text-sm text-gray-600 mt-2 text-center">
                      No obligation. See if AI marketing is right for your business.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US (Brief) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Houston Businesses Choose Us
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Houston Local Expertise</h3>
              <p className="text-gray-600">
                Deep understanding of Houston's unique market dynamics and customer behavior patterns
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Own Your Marketing Systems</h3>
              <p className="text-gray-600">
                No monthly fees, you control everything. Build once, benefit forever with systems that work 24/7.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Professional Setup + Training</h3>
              <p className="text-gray-600">
                We build it, teach you how to use it, and support you. One-time investment for lifetime benefits.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SIMPLE CONTACT SECTION */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how AI can transform your Houston business
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <a
                href="tel:7135550123"
                className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors"
              >
                <Phone className="w-6 h-6" />
                <span className="text-xl font-medium">(713) 555-0123</span>
              </a>
              <a
                href="mailto:info@marketingaihouston.com"
                className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors"
              >
                <Mail className="w-6 h-6" />
                <span className="text-xl font-medium">info@marketingaihouston.com</span>
              </a>
            </div>

            <Button asChild size="lg" className="text-lg px-8 py-4 min-h-[56px] bg-blue-600 hover:bg-blue-700">
              <a href="/contact">Schedule Free Consultation</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}