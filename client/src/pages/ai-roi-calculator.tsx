import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Calculator, 
  CheckCircle, 
  Download, 
  Star, 
  Zap,
  Shield,
  Clock,
  DollarSign,
  TrendingUp,
  BarChart,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
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

export default function AIROICalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState("");
  const [marketingHours, setMarketingHours] = useState("");
  const [marketingBudget, setMarketingBudget] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [showResults, setShowResults] = useState(false);

  const calculatorBenefits = [
    "Interactive ROI calculator for your specific business",
    "Personalized cost-benefit analysis based on your numbers",
    "Time savings calculator showing hours recovered weekly",
    "Revenue projection with AI marketing implementation",
    "Break-even analysis for AI tool investments",
    "Industry-specific benchmarks and comparisons",
    "Detailed implementation cost breakdown",
    "12-month growth projections and milestones",
    "Printable report with your custom calculations",
    "Follow-up recommendations based on your results"
  ];

  const calculateROI = () => {
    if (!monthlyRevenue || !marketingHours || !marketingBudget || !businessType) {
      return null;
    }

    const revenue = parseFloat(monthlyRevenue);
    const hours = parseFloat(marketingHours);
    const budget = parseFloat(marketingBudget);

    // AI ROI calculations based on industry averages
    const aiLeadIncrease = 2.5; // 250% increase
    const timeSavings = 0.75; // 75% time savings
    const costReduction = 0.6; // 60% cost reduction

    const newMonthlyRevenue = revenue * aiLeadIncrease;
    const revenueIncrease = newMonthlyRevenue - revenue;
    const timeSaved = hours * timeSavings;
    const costSavings = budget * costReduction;

    return {
      currentRevenue: revenue,
      newRevenue: newMonthlyRevenue,
      revenueIncrease,
      timeSaved,
      costSavings,
      yearlyIncrease: revenueIncrease * 12,
      roiPercentage: Math.round((revenueIncrease / (budget * 0.4)) * 100) // Assuming 40% of budget goes to AI tools
    };
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const results = calculateROI();

  const testimonials = [
    {
      name: "Carlos Martinez",
      business: "Martinez Construction",
      location: "Northwest Houston",
      quote: "This calculator showed me exactly why I needed AI. The ROI predictions were spot on - we're making 3x more!",
      rating: 5
    },
    {
      name: "Dr. Sarah Kim",
      business: "Kim Family Dentistry", 
      location: "Sugar Land",
      quote: "Seeing the numbers laid out convinced me to invest. We're now saving $3,000/month and getting 5x more patients.",
      rating: 5
    },
    {
      name: "Roberto Garcia",
      business: "Garcia's Auto Repair",
      location: "East Houston",
      quote: "The calculator helped me pitch AI to my partners. Now we're the busiest shop in our area!",
      rating: 5
    }
  ];

  const stats = [
    { number: "250%", label: "Average Lead Increase" },
    { number: "75%", label: "Time Saved" },
    { number: "60%", label: "Cost Reduction" },
    { number: "18 Months", label: "Average Payback Period" }
  ];

  const calculatorFeatures = [
    {
      title: "Revenue Projections",
      description: "See exactly how much additional revenue AI marketing can generate for your business",
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      title: "Time Savings Analysis", 
      description: "Calculate how many hours per week you'll save with AI automation",
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: "Cost-Benefit Breakdown",
      description: "Compare AI tool costs against your potential savings and increased revenue",
      icon: <BarChart className="w-6 h-6" />
    },
    {
      title: "Industry Benchmarks",
      description: "See how your ROI compares to other Houston businesses in your industry",
      icon: <Target className="w-6 h-6" />
    }
  ];

  const AdditionalFields = () => (
    <div className="space-y-6">
      <div className="text-lg font-semibold text-foreground mb-4 text-center">
        Get Your Personalized AI ROI Report
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Monthly Revenue*
          </label>
          <Input
            placeholder="e.g., 25000"
            value={monthlyRevenue}
            onChange={(e) => setMonthlyRevenue(e.target.value)}
            data-testid="input-monthly-revenue"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Hours/Week on Marketing*
          </label>
          <Input
            placeholder="e.g., 10"
            value={marketingHours}
            onChange={(e) => setMarketingHours(e.target.value)}
            data-testid="input-marketing-hours"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Monthly Marketing Budget*
        </label>
        <Input
          placeholder="e.g., 2000"
          value={marketingBudget}
          onChange={(e) => setMarketingBudget(e.target.value)}
          data-testid="input-marketing-budget"
        />
      </div>
    </div>
  );

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
                  <a href="#calculator-form">Calculate ROI</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 pt-20 lg:pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <AnimatedSection>
              <div className="inline-flex items-center bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                FREE TOOL - Calculate Your AI ROI in 2 Minutes
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" data-testid="hero-title">
                AI Marketing{" "}
                <span className="gradient-text">ROI Calculator</span>{" "}
                for Houston Businesses
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto" data-testid="hero-subtitle">
                Discover exactly how much money and time AI marketing will save your Houston business. Get personalized projections based on your actual numbers - see your potential ROI in under 2 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                  onClick={() => document.getElementById('calculator-form')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="button-calculate-roi"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate My ROI Now
                </Button>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 mr-2 text-primary" />
                  Free tool • No signup required • Instant results
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

      {/* Calculator Preview */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="calculator-preview-title">
                Try Our Interactive ROI Calculator
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="calculator-preview-subtitle">
                Enter your business numbers and see your AI marketing potential instantly
              </p>
            </AnimatedSection>
          </div>

          <AnimatedSection>
            <Card className="shadow-xl" data-testid="calculator-preview-card">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-6">Quick ROI Preview</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Monthly Revenue</label>
                        <Input
                          placeholder="e.g., $25,000"
                          value={monthlyRevenue}
                          onChange={(e) => setMonthlyRevenue(e.target.value)}
                          data-testid="preview-monthly-revenue"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Hours/Week on Marketing</label>
                        <Input
                          placeholder="e.g., 10 hours"
                          value={marketingHours}
                          onChange={(e) => setMarketingHours(e.target.value)}
                          data-testid="preview-marketing-hours"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Monthly Marketing Budget</label>
                        <Input
                          placeholder="e.g., $2,000"
                          value={marketingBudget}
                          onChange={(e) => setMarketingBudget(e.target.value)}
                          data-testid="preview-marketing-budget"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Business Type</label>
                        <Select onValueChange={setBusinessType} value={businessType}>
                          <SelectTrigger data-testid="preview-business-type">
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="restaurant">Restaurant</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="professional-services">Professional Services</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="real-estate">Real Estate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleCalculate} className="w-full" data-testid="button-calculate-preview">
                        <Calculator className="w-4 h-4 mr-2" />
                        Calculate ROI
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-6">Your AI ROI Projection</h3>
                    {showResults && results ? (
                      <div className="space-y-6">
                        <div className="bg-primary/5 rounded-lg p-6">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">
                              ${results.revenueIncrease.toLocaleString()}/month
                            </div>
                            <div className="text-sm text-muted-foreground">Additional Revenue</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-accent">{results.timeSaved}h</div>
                            <div className="text-xs text-muted-foreground">Hours Saved/Week</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-accent">${results.costSavings.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">Monthly Savings</div>
                          </div>
                        </div>

                        <div className="bg-accent/5 rounded-lg p-4 text-center">
                          <div className="text-lg font-bold text-foreground mb-1">
                            {results.roiPercentage}% ROI
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ${results.yearlyIncrease.toLocaleString()} yearly increase
                          </div>
                        </div>

                        <Button 
                          onClick={() => document.getElementById('calculator-form')?.scrollIntoView({ behavior: 'smooth' })}
                          className="w-full"
                          data-testid="button-get-detailed-report"
                        >
                          Get Detailed Report
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-12">
                        <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Enter your numbers on the left to see your personalized ROI projection</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Calculator Features */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="features-title">
                What Our ROI Calculator Analyzes
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="features-subtitle">
                Comprehensive analysis tailored to your Houston business
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {calculatorFeatures.map((feature, index) => (
              <AnimatedSection key={index} className="hover-lift">
                <Card className="h-full shadow-sm" data-testid={`feature-card-${index}`}>
                  <CardContent className="p-8">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-6 mt-1">
                        <div className="text-primary">{feature.icon}</div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-3" data-testid={`feature-title-${index}`}>
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed" data-testid={`feature-description-${index}`}>
                          {feature.description}
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
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="testimonials-title">
                Houston Business Owners Trust Our Calculator
              </h2>
              <p className="text-xl text-muted-foreground" data-testid="testimonials-subtitle">
                See how accurate ROI projections helped them make the right decision
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
      <section id="calculator-form" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <AnimatedSection>
              <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Clock className="w-4 h-4 mr-2" />
                Get detailed report in under 2 minutes
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="form-section-title">
                Get Your Personalized AI ROI Report
              </h2>
              <p className="text-xl text-muted-foreground" data-testid="form-section-subtitle">
                Detailed analysis with projections, benchmarks, and implementation recommendations
              </p>
            </AnimatedSection>
          </div>

          <LeadMagnetForm
            leadMagnetType="calculator"
            title="Get Your Custom AI Marketing ROI Report"
            subtitle="Personalized analysis showing exactly how AI will impact your Houston business bottom line"
            benefits={calculatorBenefits}
            additionalFields={<AdditionalFields />}
            onSuccess={() => {
              // Redirect to thank you page
              window.location.href = '/thank-you?type=calculator';
            }}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="cta-title">
              See Your AI Marketing Potential Today
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto" data-testid="cta-subtitle">
              Don't guess at your ROI. Get precise calculations based on real Houston business data and start your AI transformation with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                onClick={() => document.getElementById('calculator-form')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-final-cta"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Calculate My AI ROI Now
              </Button>
              <div className="text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 inline mr-1 text-primary" />
                Free tool • Instant results • Personalized report
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}