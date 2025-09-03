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
  const pageDescription = "We help Houston businesses save 15+ hours per week and dominate local search using proven AI marketing systems. Trusted by 89+ businesses.";
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
                Houston's #1 AI Marketing Agency - Get{" "}
                <span className="text-blue-300">3X More Customers</span> in 90 Days
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed max-w-3xl mx-auto" data-testid="hero-subtitle" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                We help Houston businesses save 15+ hours per week and dominate local search using proven AI marketing systems
              </p>

              {/* Trust Indicator */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 border border-white/20 max-w-md mx-auto">
                <p className="text-white font-semibold flex items-center justify-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  Trusted by 89+ Houston Businesses
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="text-lg px-10 py-6 text-white bg-blue-600 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 font-bold" 
                  data-testid="button-primary-cta"
                >
                  <a href="#audit-form">Get FREE AI Marketing Audit</a>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-6 text-white border-white/50 hover:bg-white/10 transition-all duration-200 font-medium" 
                  data-testid="button-demo"
                >
                  <a href="/ai-tools" className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Watch 2-Minute Demo
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
              <div className="text-3xl font-bold text-gray-900 mb-1">89+</div>
              <div className="text-sm text-gray-600">Businesses Served</div>
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
              <div className="text-3xl font-bold text-gray-900 mb-1">200-400%</div>
              <div className="text-sm text-gray-600">Avg Revenue Increase</div>
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
              <div className="text-3xl font-bold text-gray-900 mb-1">15+</div>
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
              <div className="text-3xl font-bold text-gray-900 mb-1">98%</div>
              <div className="text-sm text-gray-600">Client Satisfaction</div>
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
                      "Marketing AI Houston transformed our restaurant's online presence. We went from 2-3 customers per day to 25+ customers daily. Their AI systems found us customers we never knew existed in Houston. The ROI has been incredible - we've doubled our revenue in just 4 months."
                    </p>
                    <div className="font-semibold text-gray-900">Sarah Martinez</div>
                    <div className="text-gray-600">Owner, Sabor Latino Restaurant, Houston Heights</div>
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
              Choose Your AI Marketing Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proven services that help Houston businesses dominate their local market
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1: AI Training Workshops */}
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
                    AI Training Workshops
                  </h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Learn 25+ AI tools for marketing automation
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Hands-on training with real business examples
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Certificate of completion + ongoing support
                    </li>
                  </ul>
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-blue-600 mb-1">$150</div>
                    <div className="text-gray-600">per person</div>
                  </div>
                  <Button asChild className="w-full" size="lg">
                    <a href="/ai-training">Learn More</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Service 2: Google Business Optimization */}
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
                    Google Business Optimization
                  </h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      AI-powered Google My Business optimization
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Local SEO domination in Houston market
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Review management and reputation building
                    </li>
                  </ul>
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-green-600 mb-1">$397</div>
                    <div className="text-gray-600">one-time setup</div>
                  </div>
                  <Button asChild className="w-full" size="lg">
                    <a href="/business-profile">Learn More</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Service 3: AI-Optimized Websites */}
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
                    AI-Optimized Websites
                  </h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      AI-powered design and content optimization
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Mobile-first, conversion-focused design
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Built-in chatbots and lead capture systems
                    </li>
                  </ul>
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-purple-600 mb-1">$1,200</div>
                    <div className="text-gray-600">complete website</div>
                  </div>
                  <Button asChild className="w-full" size="lg">
                    <a href="/ai-websites">Learn More</a>
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
              Get Your FREE $500 AI Marketing Audit
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover exactly how AI can transform your Houston business and increase your customer flow
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-6">What's Included:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-blue-100">
                    <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                    <span>Complete AI readiness assessment for your business</span>
                  </li>
                  <li className="flex items-start gap-3 text-blue-100">
                    <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                    <span>Customized AI marketing strategy for Houston market</span>
                  </li>
                  <li className="flex items-start gap-3 text-blue-100">
                    <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                    <span>ROI projections showing potential revenue increase</span>
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
                          className="w-full h-12 text-lg font-bold bg-blue-600 hover:bg-blue-700"
                          data-testid="audit-submit-button"
                        >
                          {auditMutation.isPending ? "Sending..." : "Get My FREE Audit"}
                        </Button>
                      </form>
                    </Form>
                    <p className="text-xs text-gray-500 mt-4 text-center">
                      No spam. Unsubscribe anytime. Usually $500 value.
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">Local Houston Experts</h3>
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">Proven AI Systems</h3>
              <p className="text-gray-600">
                Battle-tested AI marketing systems that have generated millions in revenue for local businesses
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">Guaranteed Results</h3>
              <p className="text-gray-600">
                We're so confident in our systems, we guarantee measurable results within 90 days or work for free
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
                href="tel:7135550198"
                className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors"
              >
                <Phone className="w-6 h-6" />
                <span className="text-xl font-medium">(713) 555-0198</span>
              </a>
              <a
                href="mailto:hello@houstonaimarketing.com"
                className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors"
              >
                <Mail className="w-6 h-6" />
                <span className="text-xl font-medium">hello@houstonaimarketing.com</span>
              </a>
            </div>

            <Button asChild size="lg" className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700">
              <a href="/contact">Schedule Free Consultation</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}