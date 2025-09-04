import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  CheckCircle, 
  Star, 
  Target, 
  TrendingUp,
  Users,
  Zap,
  Brain,
  Heart,
  Home,
  DollarSign,
  Clock,
  Shield,
  Award,
  Lightbulb,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import houstonSkylineImage from "@assets/houston-skyline.jpg";
import houstonBusinessImage from "@assets/photo_5021966124203486685_y_1756837832564.jpg";
import businessMeetingImage from "@assets/generated_images/Houston_business_meeting_scene_767a3d9e.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

export default function About() {
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
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="lg:col-span-7">
              <AnimatedSection>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6" data-testid="hero-title" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Meet Houston's <span className="text-blue-300">AI Marketing Specialist</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed" data-testid="hero-subtitle" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                  Fresh perspective, cutting-edge technology, unbeatable value
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="text-lg px-8 py-4 text-white bg-blue-600 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-200" data-testid="button-get-started">
                    <a href="/contact">Start Your AI Journey</a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 text-gray-900 bg-white/90 border-white hover:bg-white hover:text-gray-900 transition-all duration-200" data-testid="button-services">
                    <a href="/services">View Services</a>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-5">
              <AnimatedSection>
                <Card className="shadow-xl bg-white/95 backdrop-blur-sm border-0" data-testid="founder-card">
                  <CardContent className="p-8 text-center">
                    <div className="founder-photo-container rounded-full mb-6">
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                        <div className="w-3/4 h-3/4 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-gray-700">[Your Name]</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Founder & AI Marketing Specialist</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Professional photo placeholder
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* PERSONAL STORY SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                The AI Marketing Advantage
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
              <p>
                As someone who grew up with artificial intelligence technology, I see opportunities that traditional marketers miss. While other agencies are just learning about AI tools, I've been using them to solve real business problems.
              </p>
              <p>
                My mission is simple: make advanced AI marketing accessible and affordable for Houston's small businesses. No corporate overhead, no monthly retainer fees, no complicated contracts - just professional AI systems that you own and control.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* WHY CHOOSE HOME-BASED SPECIALIST */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose a Home-Based AI Specialist
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Working from home isn't just convenient - it's a competitive advantage that benefits you directly
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Lower Costs, Higher Value */}
            <AnimatedSection>
              <Card className="shadow-xl h-full">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Lower Costs, Higher Value</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <span>No expensive office rent = savings passed to you</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <span>No corporate overhead = competitive project pricing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <span>Direct access to the specialist, not account managers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <span>Personal attention to your specific business needs</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Technology Advantage */}
            <AnimatedSection>
              <Card className="shadow-xl h-full">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <Zap className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Technology Advantage</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span>Native understanding of AI tools and capabilities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span>Latest AI techniques applied to Houston market</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span>Fresh perspective on traditional marketing challenges</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span>Rapid implementation without corporate bureaucracy</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* LOCAL HOUSTON FOCUS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <AnimatedSection>
                <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <MapPin className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Local Houston Focus
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Born and raised in Houston, I understand:
                </p>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                    <span>Local business challenges and opportunities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                    <span>Houston market dynamics and customer behavior</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                    <span>Community connections and networking importance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                    <span>Suburban vs urban market differences</span>
                  </li>
                </ul>
              </AnimatedSection>
            </div>
            <div className="mt-12 lg:mt-0">
              <AnimatedSection>
                <div className="responsive-image-container rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={businessMeetingImage}
                    alt="Professional business meeting in Houston office setting" 
                    className="rounded-2xl w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* MY COMMITMENT */}
      <section className="py-20 bg-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <Shield className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-white mb-6">
                My Commitment to You
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 text-white">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-300 mt-1 flex-shrink-0" />
                  <span>Honest assessment of what AI can and cannot do for your business</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-300 mt-1 flex-shrink-0" />
                  <span>Complete transparency in pricing and project scope</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-300 mt-1 flex-shrink-0" />
                  <span>Systems you own forever, not rent monthly</span>
                </li>
              </ul>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-300 mt-1 flex-shrink-0" />
                  <span>Personal support and training throughout the project</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-300 mt-1 flex-shrink-0" />
                  <span>30-day follow-up to ensure your success</span>
                </li>
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CREDENTIALS & APPROACH */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedSection>
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Credentials & Approach</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span>Extensively trained in advanced AI marketing tools and techniques</span>
                </li>
                <li className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span>Continuous learning in emerging AI technologies</span>
                </li>
                <li className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span>Focus on practical, measurable business results</span>
                </li>
                <li className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span>Education-first approach - I teach, not just implement</span>
                </li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Project-Based Philosophy</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                I believe in building systems you own and control. Unlike traditional agencies that want monthly retainers, I create AI marketing systems that work for you 24/7 without ongoing fees.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You get the technology advantage without the corporate markup.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CONTACT INFO UPDATE */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Schedule a free 15-minute consultation to discuss your business goals and see if AI marketing is right for you.
            </p>

            {/* Contact Information */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Call</h4>
                <p className="text-gray-600">(713) 555-0123</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Email</h4>
                <p className="text-gray-600">info@marketingaihouston.com</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Service Area</h4>
                <p className="text-gray-600">Serving Greater Houston Area</p>
                <p className="text-sm text-gray-500 mt-1">Remote consultations available</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-200" data-testid="button-consultation">
                <a href="/contact">Schedule Free Consultation</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 hover:bg-gray-50 transition-all duration-200" data-testid="button-assessment">
                <a href="/assessment">Take Free Assessment</a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}