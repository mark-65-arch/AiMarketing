import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Mail, 
  Award, 
  TrendingUp, 
  Target,
  CheckCircle,
  Phone,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logoWide from "@assets/Logo 2_1756846680619.png";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertContactSubmissionSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import type { InsertContactSubmission } from "@shared/schema";
import { z } from "zod";

interface QuizQuestion {
  id: string;
  question: string;
  options: { value: string; label: string; points: number }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "businessType",
    question: "What type of business do you operate in Houston?",
    options: [
      { value: "restaurant", label: "Restaurant/Food Service", points: 8 },
      { value: "medical", label: "Healthcare/Medical Practice", points: 10 },
      { value: "legal", label: "Legal Services", points: 9 },
      { value: "realestate", label: "Real Estate", points: 9 },
      { value: "retail", label: "Retail/E-commerce", points: 7 },
      { value: "professional", label: "Professional Services", points: 8 },
      { value: "other", label: "Other", points: 6 }
    ]
  },
  {
    id: "businessSize",
    question: "How many employees does your Houston business have?",
    options: [
      { value: "solo", label: "Just me (Solo entrepreneur)", points: 6 },
      { value: "small", label: "2-10 employees", points: 8 },
      { value: "medium", label: "11-50 employees", points: 10 },
      { value: "large", label: "50+ employees", points: 9 }
    ]
  },
  {
    id: "currentMarketing",
    question: "Which marketing methods are you currently using?",
    options: [
      { value: "none", label: "Little to no marketing", points: 3 },
      { value: "basic", label: "Basic social media and word-of-mouth", points: 5 },
      { value: "traditional", label: "Traditional advertising (radio, print, etc.)", points: 6 },
      { value: "digital", label: "Digital marketing (Google Ads, social media ads)", points: 9 },
      { value: "comprehensive", label: "Comprehensive marketing strategy", points: 10 }
    ]
  },
  {
    id: "timeSpent",
    question: "How much time do you spend on marketing each week?",
    options: [
      { value: "minimal", label: "Less than 2 hours", points: 4 },
      { value: "some", label: "2-5 hours", points: 6 },
      { value: "moderate", label: "6-10 hours", points: 8 },
      { value: "significant", label: "More than 10 hours", points: 10 }
    ]
  },
  {
    id: "biggestChallenge",
    question: "What's your biggest marketing challenge in Houston?",
    options: [
      { value: "time", label: "Not enough time for marketing", points: 7 },
      { value: "knowledge", label: "Don't know what works", points: 8 },
      { value: "competition", label: "Too much competition", points: 9 },
      { value: "budget", label: "Limited marketing budget", points: 6 },
      { value: "results", label: "Not seeing measurable results", points: 10 }
    ]
  },
  {
    id: "aiExperience",
    question: "How familiar are you with AI marketing tools?",
    options: [
      { value: "none", label: "Never used AI for business", points: 3 },
      { value: "curious", label: "Curious but haven't tried", points: 5 },
      { value: "basic", label: "Used ChatGPT or similar occasionally", points: 7 },
      { value: "intermediate", label: "Regular user of AI tools", points: 9 },
      { value: "advanced", label: "Implementing AI in business processes", points: 10 }
    ]
  },
  {
    id: "techComfort",
    question: "How comfortable are you with technology?",
    options: [
      { value: "beginner", label: "Prefer simple, basic tools", points: 4 },
      { value: "moderate", label: "Comfortable with standard software", points: 6 },
      { value: "good", label: "Quick to learn new tech tools", points: 8 },
      { value: "expert", label: "Tech-savvy early adopter", points: 10 }
    ]
  },
  {
    id: "budget",
    question: "What's your monthly marketing budget range?",
    options: [
      { value: "minimal", label: "Under $500", points: 4 },
      { value: "small", label: "$500 - $1,500", points: 6 },
      { value: "moderate", label: "$1,500 - $5,000", points: 8 },
      { value: "substantial", label: "$5,000+", points: 10 }
    ]
  },
  {
    id: "goals",
    question: "What's your primary business goal for the next 12 months?",
    options: [
      { value: "survive", label: "Maintain current revenue", points: 5 },
      { value: "grow", label: "Increase revenue by 25-50%", points: 8 },
      { value: "expand", label: "Double my business", points: 10 },
      { value: "scale", label: "Expand to multiple locations", points: 9 }
    ]
  },
  {
    id: "automation",
    question: "Which business process would benefit most from automation?",
    options: [
      { value: "customer", label: "Customer service and support", points: 9 },
      { value: "marketing", label: "Marketing and lead generation", points: 10 },
      { value: "scheduling", label: "Appointment scheduling", points: 8 },
      { value: "social", label: "Social media posting", points: 7 },
      { value: "reviews", label: "Review management", points: 8 }
    ]
  }
];

const emailSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  businessType: z.string().min(1, "Business type is required"),
});

type EmailFormData = z.infer<typeof emailSchema>;

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [userData, setUserData] = useState<EmailFormData | null>(null);
  const { toast } = useToast();

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      businessType: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      setShowResults(true);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [quizQuestions[currentQuestion].id]: value
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowEmailCapture(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    Object.entries(answers).forEach(([questionId, answerValue]) => {
      const question = quizQuestions.find(q => q.id === questionId);
      const answer = question?.options.find(opt => opt.value === answerValue);
      if (answer) {
        totalScore += answer.points;
      }
    });
    return Math.round((totalScore / 100) * 100); // Convert to percentage
  };

  const getResultTier = (score: number) => {
    if (score <= 35) return "beginner";
    if (score <= 70) return "intermediate";
    return "advanced";
  };

  const getResultData = (tier: string, score: number) => {
    switch (tier) {
      case "beginner":
        return {
          title: "AI Marketing Beginner",
          badge: "Bronze",
          color: "bg-amber-600",
          description: "You're just starting your AI marketing journey, and that's perfect! Houston has incredible opportunities for businesses ready to embrace AI.",
          recommendations: [
            "Start with our AI Training Workshop ($150) to master the basics",
            "Set up proper Google Business Profile optimization to capture local Houston customers",
            "Learn essential AI tools like ChatGPT for content creation",
            "Implement basic automation for customer service"
          ]
        };
      case "intermediate":
        return {
          title: "AI Marketing Intermediate",
          badge: "Silver", 
          color: "bg-gray-500",
          description: "You have a solid foundation and are ready to accelerate your AI marketing efforts in the competitive Houston market.",
          recommendations: [
            "Optimize your Google Business Profile for maximum local visibility",
            "Implement advanced AI content strategies for social media",
            "Add automated customer interaction systems to your website",
            "Scale your marketing with AI-powered lead generation"
          ]
        };
      case "advanced":
        return {
          title: "AI Marketing Advanced",
          badge: "Gold",
          color: "bg-yellow-500",
          description: "You're ahead of the curve! Let's take your Houston business to the next level with cutting-edge AI marketing strategies.",
          recommendations: [
            "Build a custom AI-optimized website designed for voice search",
            "Implement advanced automation across all customer touchpoints",
            "Scale with multi-location AI marketing strategies",
            "Become an AI marketing leader in your Houston industry"
          ]
        };
      default:
        return getResultData("beginner", score);
    }
  };

  const onEmailSubmit = (data: EmailFormData) => {
    setUserData(data);
    const contactData: InsertContactSubmission = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      businessType: data.businessType,
      message: `AI Assessment completed. Score: ${calculateScore()}%. Answers: ${JSON.stringify(answers)}`
    };
    contactMutation.mutate(contactData);
  };

  const currentQuestionData = quizQuestions[currentQuestion];
  const selectedAnswer = answers[currentQuestionData?.id];
  const score = calculateScore();
  const tier = getResultTier(score);
  const resultData = getResultData(tier, score);

  if (showResults && userData) {
    return (
      <div className="bg-background font-sans antialiased min-h-screen">
        {/* Navigation */}
        <nav className="bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <a href="/" data-testid="nav-logo">
                  <div className="bg-white rounded px-2 py-1">
                    <img src={logoWide} alt="Marketing AI Houston" className="h-8 w-auto" />
                  </div>
                </a>
              </div>
              <div className="hidden md:flex items-baseline space-x-8">
                <a href="/" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors">Home</a>
                <a href="/#services" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors">Services</a>
                <a href="/#contact" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">Contact</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Results Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="results-title">
                Your AI Marketing Assessment Results
              </h1>
              <p className="text-xl text-muted-foreground" data-testid="results-subtitle">
                {userData.firstName}, here's your personalized AI marketing roadmap for your Houston business.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="shadow-2xl mb-8" data-testid="results-card">
                <CardContent className="p-8 md:p-12">
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center px-6 py-3 rounded-full ${resultData.color} text-white font-bold text-lg mb-4`} data-testid="result-badge">
                      <Award className="w-6 h-6 mr-2" />
                      {resultData.badge} Level - {resultData.title}
                    </div>
                    <div className="text-6xl font-bold text-primary mb-4" data-testid="result-score">{score}%</div>
                    <p className="text-lg text-muted-foreground leading-relaxed" data-testid="result-description">
                      {resultData.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center" data-testid="recommendations-title">
                      <Target className="w-6 h-6 mr-3 text-primary" />
                      Your Personalized Recommendations
                    </h3>
                    <div className="grid gap-4">
                      {resultData.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start p-4 bg-muted/50 rounded-lg" data-testid={`recommendation-${index}`}>
                          <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                          <p className="text-foreground">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-center bg-primary/10 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4" data-testid="cta-title">
                      Ready to Transform Your Houston Business?
                    </h3>
                    <p className="text-muted-foreground mb-6 text-lg" data-testid="cta-subtitle">
                      Book a free 30-minute consultation to discuss your AI marketing strategy and get started on your growth journey.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild size="lg" className="text-lg px-8 py-4" data-testid="button-book-consultation">
                        <a href="/#contact">
                          <Calendar className="w-5 h-5 mr-2" />
                          Book Free Consultation
                        </a>
                      </Button>
                      <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild data-testid="button-call-now">
                        <a href="tel:(713)555-AI01">
                          <Phone className="w-5 h-5 mr-2" />
                          Call (713) 555-AI01
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  if (showEmailCapture) {
    return (
      <div className="bg-background font-sans antialiased min-h-screen">
        {/* Navigation */}
        <nav className="bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <a href="/" data-testid="nav-logo">
                  <div className="bg-white rounded px-2 py-1">
                    <img src={logoWide} alt="Marketing AI Houston" className="h-8 w-auto" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </nav>

        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-2xl" data-testid="email-capture-card">
                <CardContent className="p-8 md:p-12">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Mail className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="email-title">
                      Get Your Personalized AI Marketing Roadmap
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed" data-testid="email-subtitle">
                      You're almost done! Enter your information below to receive your detailed assessment results and custom recommendations for growing your Houston business with AI.
                    </p>
                  </div>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onEmailSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
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
                            <FormControl>
                              <Input placeholder="e.g., Restaurant, Medical Practice, Law Firm" {...field} data-testid="input-business-type" />
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
                        data-testid="button-get-results"
                      >
                        {contactMutation.isPending ? "Processing..." : "Get My AI Marketing Results"}
                      </Button>
                    </form>
                  </Form>

                  <p className="text-sm text-muted-foreground text-center mt-6" data-testid="privacy-notice">
                    We respect your privacy. Your information will only be used to provide your assessment results and relevant AI marketing insights.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-background font-sans antialiased min-h-screen">
      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" data-testid="nav-logo">
                <img src={logoWide} alt="Marketing AI Houston" className="h-10 w-auto mix-blend-multiply" style={{filter: 'brightness(0) invert(1)'}} />
              </a>
            </div>
            <div className="text-sm text-muted-foreground" data-testid="progress-text">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </div>
          </div>
        </div>
      </nav>

      {/* Quiz Section */}
      <section className="py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-foreground" data-testid="progress-start">AI Marketing Assessment</span>
              <span className="text-sm font-medium text-primary" data-testid="progress-percentage">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3" data-testid="progress-bar" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-xl" data-testid={`question-card-${currentQuestion}`}>
                <CardContent className="p-8 md:p-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 leading-relaxed" data-testid="question-text">
                    {currentQuestionData?.question}
                  </h2>

                  <RadioGroup
                    value={selectedAnswer || ""}
                    onValueChange={handleAnswer}
                    className="space-y-4"
                    data-testid="answer-options"
                  >
                    {currentQuestionData?.options.map((option, index) => (
                      <div key={option.value} className="flex items-center space-x-3">
                        <RadioGroupItem value={option.value} id={option.value} className="text-primary" />
                        <Label 
                          htmlFor={option.value} 
                          className="flex-1 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors text-base leading-relaxed"
                          data-testid={`option-${index}`}
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  <div className="flex justify-between mt-12">
                    <Button
                      variant="outline"
                      onClick={prevQuestion}
                      disabled={currentQuestion === 0}
                      className="flex items-center px-6 py-3"
                      data-testid="button-previous"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>

                    <Button
                      onClick={nextQuestion}
                      disabled={!selectedAnswer}
                      className="flex items-center px-6 py-3"
                      data-testid="button-next"
                    >
                      {currentQuestion === quizQuestions.length - 1 ? "View Results" : "Next"}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}