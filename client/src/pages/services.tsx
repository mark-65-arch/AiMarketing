import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  CheckCircle, 
  Clock, 
  Target, 
  TrendingUp,
  Globe,
  Search,
  BarChart3,
  ArrowRight,
  Users,
  Zap,
  Trophy,
  Shield,
  Play,
  Star,
  Calendar,
  FileText,
  Settings,
  Camera,
  MessageSquare,
  DollarSign
} from "lucide-react";
import houstonSkylineImage from "@assets/houston-skyline.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";

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

export default function Services() {
  const services = [
    {
      title: "Google Business AI Domination",
      price: "$800-1,200",
      timeline: "2 weeks",
      href: "/business-profile",
      icon: <Trophy className="w-8 h-8 text-blue-600" />,
      week1: {
        title: "Week 1 Deliverables:",
        items: [
          "Professional photographer recommendations for 15+ business photos",
          "Complete competitor analysis report for your Houston area",
          "Optimized business description using local Houston keywords",
          "Service/product descriptions rewritten with AI for maximum appeal",
          "Categories optimized for better search visibility"
        ]
      },
      week2: {
        title: "Week 2 Deliverables:",
        items: [
          "24 pre-written posts scheduled across 6 months (holidays, tips, promotions)",
          "12 different review response templates for various scenarios",
          "Google Analytics and insights tracking setup",
          "Step-by-step maintenance guide you can follow",
          "2-hour hands-on training session via video call"
        ]
      },
      difference: "Unlike other agencies that charge monthly fees, you own everything. The posts keep running automatically, and you can modify or add to them anytime without paying us again."
    },
    {
      title: "AI Marketing System Setup",
      price: "$1,500-2,500",
      timeline: "3 weeks",
      href: "/ai-training",
      icon: <BarChart3 className="w-8 h-8 text-green-600" />,
      popular: true,
      phases: [
        {
          title: "Week 1 - Discovery & Strategy:",
          items: [
            "Detailed analysis of your current marketing workflow",
            "Custom AI prompt creation for your specific industry language",
            "Competitor content analysis to identify opportunities",
            "Customer journey mapping for your business type"
          ]
        },
        {
          title: "Week 2 - System Building:",
          items: [
            "30+ custom ChatGPT prompts for content creation",
            "Zapier automation connecting 3-5 of your current tools",
            "Email templates for customer follow-up sequences",
            "Social media posting schedules optimized for your audience"
          ]
        },
        {
          title: "Week 3 - Training & Handoff:",
          items: [
            "3-hour comprehensive training session (recorded for reference)",
            "Written procedures manual for daily/weekly tasks",
            "30-day email support for questions and adjustments",
            "Monthly content calendar template you can reuse forever"
          ]
        }
      ],
      difference: "Most agencies create content for you monthly. We teach you to create unlimited content yourself using AI, saving thousands in ongoing fees."
    },
    {
      title: "Website + AI Optimization",
      price: "$2,500-5,000",
      timeline: "4 weeks",
      href: "/ai-websites",
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      phases: [
        {
          title: "Week 1 - Planning & Design:",
          items: [
            "Complete website audit and user experience analysis",
            "Custom design mockups based on your Houston market position",
            "Competitor website analysis and improvement recommendations",
            "Site architecture planning for optimal conversion"
          ]
        },
        {
          title: "Week 2-3 - Development & AI Integration:",
          items: [
            "Complete website rebuild on modern, fast-loading platform",
            "AI chatbot programmed with your business FAQs and personality",
            "Contact forms with smart lead scoring and auto-responses",
            "Voice search optimization for mobile \"near me\" searches",
            "Speed optimization for Google's ranking requirements"
          ]
        },
        {
          title: "Week 4 - Launch & Training:",
          items: [
            "Complete website testing and optimization",
            "3-hour website management training session",
            "Google Analytics and conversion tracking setup",
            "SEO monitoring dashboard setup and training",
            "Website maintenance checklist and ongoing support plan"
          ]
        }
      ],
      difference: "Your website is built to work with AI search engines like ChatGPT, not just Google. When people ask AI \"recommend a [your service] in Houston,\" your business appears in the response."
    }
  ];


  return (
    <div className="bg-background font-sans antialiased">
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
          minHeight: '80vh'
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
                <span className="text-blue-300">Detailed AI Marketing Project Packages</span>{" "}
                for Houston Businesses
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed max-w-3xl mx-auto" data-testid="hero-subtitle" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                Each project is custom-built for your specific business needs and Houston market position. Here's exactly what you get, how long it takes, and what results to expect.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="text-lg px-10 py-6 min-h-[56px] w-full sm:w-auto text-white bg-blue-600 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 font-bold" 
                  data-testid="button-assessment"
                >
                  <a href="/assessment" className="flex items-center justify-center gap-2">
                    <Target className="w-5 h-5" />
                    Take Free Assessment
                  </a>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-6 min-h-[56px] w-full sm:w-auto text-gray-900 bg-white/90 border-white hover:bg-white hover:text-gray-900 transition-all duration-200 font-medium" 
                  data-testid="button-consultation"
                >
                  <a href="/contact" className="flex items-center justify-center gap-2">
                    <Users className="w-5 h-5" />
                    Schedule Consultation
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DETAILED SERVICES */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {services.map((service, index) => (
              <AnimatedSection key={index}>
                <Card className="shadow-xl bg-white">
                  <CardContent className="p-8 lg:p-12">
                    <div className="grid lg:grid-cols-2 gap-8 items-start">
                      {/* Service Header */}
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-16 h-16 ${index === 0 ? 'bg-blue-100' : index === 1 ? 'bg-green-100' : 'bg-purple-100'} rounded-xl flex items-center justify-center`}>
                            {service.icon}
                          </div>
                          <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                              {service.title}
                            </h2>
                            {service.popular && (
                              <Badge className="bg-blue-500 text-white">Most Popular</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-6 mb-6">
                          <div className={`text-4xl font-bold ${index === 0 ? 'text-blue-600' : index === 1 ? 'text-green-600' : 'text-purple-600'}`}>
                            {service.price}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-5 h-5 mr-2" />
                            <span className="font-semibold">{service.timeline}</span>
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex justify-end">
                        <Button asChild size="lg" className="px-8 py-4 text-lg">
                          <a href={service.href}>
                            Get Started
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Week-by-Week Breakdown */}
                    <div className="mt-8 space-y-8">
                      {service.phases ? (
                        service.phases.map((phase, phaseIndex) => (
                          <div key={phaseIndex} className="border-l-4 border-gray-200 pl-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                              <Calendar className="w-5 h-5 text-blue-600" />
                              {phase.title}
                            </h3>
                            <ul className="space-y-3">
                              {phase.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="flex items-start gap-3">
                                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                  <span className="text-gray-700">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="border-l-4 border-gray-200 pl-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                              <Calendar className="w-5 h-5 text-blue-600" />
                              {service.week1.title}
                            </h3>
                            <ul className="space-y-3">
                              {service.week1.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="flex items-start gap-3">
                                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                  <span className="text-gray-700">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="border-l-4 border-gray-200 pl-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                              <Calendar className="w-5 h-5 text-blue-600" />
                              {service.week2.title}
                            </h3>
                            <ul className="space-y-3">
                              {service.week2.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="flex items-start gap-3">
                                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                  <span className="text-gray-700">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}

                      {/* What Makes This Different */}
                      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                        <h4 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                          <Star className="w-5 h-5 text-blue-600" />
                          What Makes This Different:
                        </h4>
                        <p className="text-blue-800 leading-relaxed">{service.difference}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE-FRIENDLY COMPARISON CARDS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Choose Your Perfect Package
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Each package solves a specific problem and delivers clear results. Here's how to decide:
              </p>
            </div>

            {/* Service Comparison Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Card 1: Google Business AI */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-blue-200">
                <CardHeader className="bg-blue-50 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-blue-900 text-xl">Google Business AI Domination</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">$800-1,200</div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Main Problem:</h4>
                      <p className="text-gray-700">"Invisible in local searches"</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Time Savings:</h4>
                      <p className="text-gray-700">5-8 hours monthly (posting & reviews)</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Perfect If:</h4>
                      <p className="text-gray-700">You post inconsistently on Google</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Results:</h4>
                      <p className="text-gray-700">Customers find you in local search</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Best For:</h4>
                      <p className="text-gray-700">Local restaurant, salon, contractor</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Replaces:</h4>
                      <p className="text-gray-700">$300-500/month local SEO agency</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-blue-800 font-semibold">ROI: Pays for itself in 2-3 months</p>
                      <p className="text-blue-700 text-sm">Revenue Fit: $10K-50K/month businesses</p>
                    </div>
                  </div>
                  <Button asChild className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                    <a href="/business-profile">Choose This Package</a>
                  </Button>
                </CardContent>
              </Card>

              {/* Card 2: AI Marketing System */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-green-200 relative">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1">
                  Most Popular
                </Badge>
                <CardHeader className="bg-green-50 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-green-900 text-xl">AI Marketing System Setup</CardTitle>
                  <div className="text-3xl font-bold text-green-600">$1,500-2,500</div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Main Problem:</h4>
                      <p className="text-gray-700">"Marketing takes too much time"</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Time Savings:</h4>
                      <p className="text-gray-700">10-15 hours monthly (content creation)</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Perfect If:</h4>
                      <p className="text-gray-700">You manually create all content</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Results:</h4>
                      <p className="text-gray-700">Automate 80% of marketing tasks</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Best For:</h4>
                      <p className="text-gray-700">Professional services, growing business</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Replaces:</h4>
                      <p className="text-gray-700">$800-1500/month content agency</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="text-green-800 font-semibold">ROI: Pays for itself in 1-2 months</p>
                      <p className="text-green-700 text-sm">Revenue Fit: $25K-100K/month businesses</p>
                    </div>
                  </div>
                  <Button asChild className="w-full mt-6 bg-green-600 hover:bg-green-700">
                    <a href="/ai-training">Choose This Package</a>
                  </Button>
                </CardContent>
              </Card>

              {/* Card 3: Website + AI */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-purple-200">
                <CardHeader className="bg-purple-50 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-purple-900 text-xl">Website + AI Optimization</CardTitle>
                  <div className="text-3xl font-bold text-purple-600">$2,500-5,000</div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Main Problem:</h4>
                      <p className="text-gray-700">"Website doesn't generate leads"</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Value Proposition:</h4>
                      <p className="text-gray-700">Turn website into 24/7 sales machine</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Perfect If:</h4>
                      <p className="text-gray-700">Website is 3+ years old or converts poorly</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Results:</h4>
                      <p className="text-gray-700">3-5x more leads from same traffic</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Best For:</h4>
                      <p className="text-gray-700">Any business needing web presence</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Replaces:</h4>
                      <p className="text-gray-700">$1000-2000/month web management</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded">
                      <p className="text-purple-800 font-semibold">ROI: Pays for itself in 3-4 months</p>
                      <p className="text-purple-700 text-sm">Revenue Fit: $50K-200K/month businesses</p>
                    </div>
                  </div>
                  <Button asChild className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
                    <a href="/ai-websites">Choose This Package</a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Decision Guide */}
            <div className="bg-blue-50 p-8 rounded-lg border border-blue-200">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">
                Quick Decision Guide
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-blue-800">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Choose Google Business</strong> if people can't find you locally</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Choose AI Marketing</strong> if you spend 10+ hours/week on marketing</span>
                  </li>
                </ul>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Choose Website</strong> if your current site was built before 2022</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-gray-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Still unsure?</strong> Book a free 15-minute consultation</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* What You DON'T Get Section */}
            <div className="mt-12 bg-red-50 p-8 rounded-lg border border-red-200">
              <h3 className="text-2xl font-bold text-red-900 mb-6 text-center">
                What You DON'T Get (Setting Proper Expectations)
              </h3>
              <p className="text-red-800 mb-6 text-center font-medium">
                This isn't ongoing management - we BUILD systems that YOU own and control forever:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-3 text-red-800">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0"></div>
                    <span>We <strong>don't manage</strong> your marketing month-to-month</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0"></div>
                    <span>We <strong>don't create new content</strong> for you after the project</span>
                  </li>
                </ul>
                <ul className="space-y-3 text-red-800">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0"></div>
                    <span>We <strong>don't run</strong> your advertising campaigns</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0"></div>
                    <span>We <strong>BUILD systems</strong> that YOU own and control forever</span>
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Assessment CTA */}
      <section className="py-16 bg-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <Target className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Still Not Sure Which Package Is Right?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Take our free 3-minute assessment to get a personalized recommendation based on your business size, goals, and current marketing setup.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-4 bg-white text-blue-900 hover:bg-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
                <a href="/assessment" className="flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Take Free Assessment
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 text-gray-900 bg-white/90 border-white hover:bg-white hover:text-gray-900 transition-all duration-200">
                <a href="/contact" className="flex items-center justify-center gap-2">
                  <Users className="w-5 h-5" />
                  Schedule Strategy Call
                </a>
              </Button>
            </div>
            <div className="mt-6 text-sm text-blue-200">
              <strong>No obligation</strong> • Get personalized recommendations in minutes
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}