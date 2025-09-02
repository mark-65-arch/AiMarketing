import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion, useInView } from "framer-motion";
import { 
  Wand2, 
  Copy, 
  CheckCircle, 
  Phone, 
  Mail,
  Sparkles,
  Clock,
  Gift,
  User,
  Building2,
  Palette,
  FileText,
  ArrowRight,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logoWide from "@assets/Logo Wide_1756845680532.webp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertContactSubmissionSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import type { InsertContactSubmission } from "@shared/schema";
import { z } from "zod";

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

const generatorSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  industry: z.string().min(1, "Please select an industry"),
  contentType: z.string().min(1, "Please select a content type"),
  tone: z.string().min(1, "Please select a tone"),
});

type GeneratorForm = z.infer<typeof generatorSchema>;

// Comprehensive content database
const contentDatabase = {
  "Restaurant": {
    "Social Media Post": {
      "Professional": [
        "Fresh ingredients, authentic flavors, and exceptional service define our Houston restaurant experience. Join us today for a culinary journey that celebrates both tradition and innovation.",
        "Discover Houston's hidden gem for authentic cuisine. Our chefs craft each dish with locally-sourced ingredients and time-honored techniques that have been passed down through generations.",
        "Experience fine dining in the heart of Houston. Our restaurant combines elegant atmosphere with exceptional cuisine, creating memorable moments for every special occasion."
      ],
      "Casual": [
        "Hey Houston! Craving something delicious? Come hang out with us for amazing food, great vibes, and the best meals in town. Your taste buds will thank you! 🍴",
        "Who's hungry? We're serving up Houston's most craveable dishes right now! Fresh, tasty, and made with love. Come see what everyone's talking about!",
        "Food lovers of Houston, unite! We've got the flavors you've been searching for. Come hungry, leave happy, and tell your friends about us!"
      ],
      "Friendly": [
        "Good morning, Houston! We can't wait to welcome you to our restaurant family today. Fresh coffee, delicious breakfast, and warm smiles are waiting for you!",
        "Nothing makes us happier than seeing our Houston neighbors enjoy our homemade specialties. Come in today and let us treat you to something special!",
        "Welcome to our little slice of culinary heaven in Houston! We're cooking up something amazing today and would love to share it with you and your loved ones."
      ],
      "Bold": [
        "Houston's BEST kept secret is out! We're revolutionizing the dining scene with bold flavors that will blow your mind. Are you ready for the ultimate food adventure?",
        "ATTENTION Houston foodies: This is NOT your average restaurant. We're breaking all the rules with explosive flavors and unforgettable experiences. Dare to try us?",
        "Houston, we have FLAVOR! Our kitchen is on fire with the most incredible dishes you've never tried. One bite and you'll be addicted. Consider yourself warned!"
      ],
      "Persuasive": [
        "Don't settle for ordinary when extraordinary is just minutes away. Houston's most talked-about restaurant is serving the dishes that will become your new obsession. Reserve your table now.",
        "Smart Houston diners already know: this is THE place for unforgettable meals. Join the movement and discover why we're becoming Houston's favorite dining destination.",
        "Limited seating, unlimited flavor. Houston's most exclusive dining experience awaits those who refuse to compromise on quality. Make your reservation today."
      ]
    },
    "Email Subject Lines": {
      "Professional": [
        "Your Reserved Table Awaits - Houston's Premier Dining Experience",
        "Exclusive Menu Preview: Seasonal Specialties Now Available",
        "Thank You for Choosing Our Restaurant - Your Feedback Matters"
      ],
      "Casual": [
        "Hey Houston! New menu items just dropped 🍽️",
        "Your favorite table is calling your name...",
        "Weekend plans sorted: Amazing food awaits!"
      ],
      "Friendly": [
        "We missed you! Special welcome back offer inside",
        "Save the date: Our anniversary celebration invitation",
        "A little something special from our kitchen to yours"
      ],
      "Bold": [
        "BREAKING: Houston's most exclusive menu just launched",
        "WARNING: These dishes are dangerously addictive",
        "REVEALED: The secret behind Houston's #1 restaurant"
      ],
      "Persuasive": [
        "Last chance: Reserve Houston's most sought-after dining experience",
        "Why smart diners choose us (and you should too)",
        "Don't miss out: Limited-time tasting menu available now"
      ]
    },
    "Google Ad Headlines": {
      "Professional": [
        "Houston's Premier Fine Dining | Exceptional Cuisine & Service",
        "Authentic Restaurant Experience | Downtown Houston Location",
        "Award-Winning Houston Restaurant | Reserve Your Table Today"
      ],
      "Casual": [
        "Best Food in Houston | Come Hungry, Leave Happy!",
        "Houston's Favorite Restaurant | Great Food, Great Times",
        "Delicious Houston Eats | Where Friends & Food Meet"
      ],
      "Friendly": [
        "Welcome to Houston's Friendliest Restaurant | Family-Owned",
        "Your Neighborhood Houston Restaurant | Everyone's Welcome",
        "Houston's Home-Style Cooking | Made with Love"
      ],
      "Bold": [
        "Houston's MOST EXCITING Restaurant | Revolutionary Flavors",
        "UNFORGETTABLE Houston Dining | Bold Flavors, Big Results",
        "Houston's WILDEST Food Experience | Dare to Try?"
      ],
      "Persuasive": [
        "Houston's #1 Rated Restaurant | See Why Customers Choose Us",
        "Don't Settle for Less | Houston's Premier Dining Destination",
        "Houston's Most Exclusive Restaurant | Reserve Now or Miss Out"
      ]
    },
    "Business Description": {
      "Professional": [
        "Located in the heart of Houston, our restaurant offers an exceptional dining experience featuring carefully curated menus, premium ingredients, and impeccable service. We specialize in creating memorable culinary moments for both intimate dinners and special celebrations.",
        "Our Houston restaurant combines traditional culinary techniques with modern innovation to deliver an unparalleled dining experience. With a commitment to quality and customer satisfaction, we've become a cornerstone of Houston's vibrant food scene.",
        "Established as Houston's premier dining destination, our restaurant features award-winning cuisine, an extensive wine selection, and elegant atmosphere perfect for business dinners, romantic evenings, and family celebrations."
      ],
      "Casual": [
        "We're Houston's go-to spot for amazing food and good times! Our laid-back atmosphere and delicious menu make every meal feel like a celebration with friends and family.",
        "Come as you are to Houston's most welcoming restaurant! We serve up incredible food in a relaxed setting where everyone feels at home. Great food, great people, great times!",
        "Houston's favorite neighborhood restaurant where great food meets good vibes. We're all about serving delicious meals that bring people together in a fun, comfortable setting."
      ],
      "Friendly": [
        "Welcome to our Houston restaurant family! We're passionate about serving homemade goodness with a smile. Every dish is prepared with love, and every guest is treated like family.",
        "Our warm, inviting Houston restaurant is where neighbors become friends over exceptional food. We pride ourselves on creating a welcoming space where everyone feels at home.",
        "Family-owned and Houston-proud, our restaurant is built on the belief that great food brings people together. Come experience our hospitality and taste the difference love makes."
      ],
      "Bold": [
        "Houston's most daring restaurant experience! We're revolutionizing dining with explosive flavors, creative presentations, and an atmosphere that's anything but ordinary. Ready for an adventure?",
        "Not your typical Houston restaurant. We're breaking boundaries with bold flavors, innovative dishes, and experiences that will challenge everything you thought you knew about dining.",
        "Houston's culinary rebels! We're rewriting the rules of restaurant dining with fearless flavors and unforgettable experiences that push the limits of what food can be."
      ],
      "Persuasive": [
        "Smart Houston diners choose us for a reason: uncompromising quality, exceptional value, and experiences that create lasting memories. Discover why we're Houston's fastest-growing restaurant.",
        "Don't just dine, invest in an experience. Our Houston restaurant delivers superior cuisine, outstanding service, and value that makes every visit worthwhile. See the difference quality makes.",
        "Houston's most recommended restaurant for good reason. When you want guaranteed satisfaction, exceptional food, and service that exceeds expectations, choose the restaurant others wish they could be."
      ]
    }
  },
  "Retail Store": {
    "Social Media Post": {
      "Professional": [
        "Discover Houston's premier retail destination for quality products and exceptional customer service. Our curated selection and knowledgeable staff ensure you find exactly what you need.",
        "Experience shopping redefined at our Houston location. We combine extensive product knowledge with personalized service to deliver an unmatched retail experience.",
        "Your trusted Houston retail partner, committed to providing superior products and expert guidance for all your shopping needs."
      ],
      "Casual": [
        "Hey Houston shoppers! We've got all the good stuff you're looking for, plus some amazing surprises. Come check us out and see what catches your eye! 🛍️",
        "Shopping just got way more fun! Our Houston store is packed with awesome finds and friendly faces ready to help you discover something perfect.",
        "Houston's coolest retail spot! Whether you're browsing or hunting for something specific, we've got you covered with amazing products and great vibes."
      ],
      "Friendly": [
        "Welcome to our Houston retail family! We love helping our neighbors find exactly what they're looking for. Come say hi and let us help make your day better!",
        "Good morning, Houston! Our doors are open and we're excited to help you find something wonderful today. Every customer leaves with a smile!",
        "Your friendly neighborhood Houston store where shopping feels like visiting old friends. We can't wait to help you find exactly what you need!"
      ],
      "Bold": [
        "Houston's MOST EXCITING retail experience! We're not just selling products - we're delivering adventures in every aisle. Ready to be amazed?",
        "REVOLUTION in Houston retail! We're changing the game with incredible products, unbeatable deals, and shopping experiences that will blow your mind!",
        "Houston shoppers, prepare to be OBSESSED! Our store is packed with must-have items that you won't find anywhere else. Shopping will never be the same!"
      ],
      "Persuasive": [
        "Smart Houston shoppers choose us for unbeatable value, superior quality, and service that makes every purchase worthwhile. Experience the difference today.",
        "Don't settle for ordinary when extraordinary is right here in Houston. Our retail store delivers premium products at prices that make sense.",
        "Houston's most trusted retail destination where quality meets value. Join thousands of satisfied customers who've made us their shopping headquarters."
      ]
    },
    "Email Subject Lines": {
      "Professional": [
        "Exclusive Preview: New Arrivals at Our Houston Store",
        "Your VIP Access: Members-Only Sale Event This Weekend",
        "Thank You for Choosing Our Houston Retail Store"
      ],
      "Casual": [
        "Houston! New stuff just arrived and it's amazing 🛍️",
        "Psst... huge sale happening right now!",
        "You're gonna love what we just got in..."
      ],
      "Friendly": [
        "We saved something special just for you!",
        "Your Houston favorites are back in stock!",
        "A little thank you gift from us to you"
      ],
      "Bold": [
        "HOUSTON EXCLUSIVE: Products everyone wants, limited stock!",
        "BREAKING: Biggest sale of the year starts NOW",
        "WARNING: These deals won't last long!"
      ],
      "Persuasive": [
        "Last chance: Houston's best retail deals end tomorrow",
        "Why savvy Houston shoppers choose us (insider info)",
        "Don't miss out: Limited-time Houston store exclusive"
      ]
    },
    "Google Ad Headlines": {
      "Professional": [
        "Premium Houston Retail Store | Quality Products & Expert Service",
        "Houston's Trusted Retail Destination | Professional Shopping Experience",
        "Top-Rated Houston Store | Exceptional Products & Customer Care"
      ],
      "Casual": [
        "Best Shopping in Houston | Great Stuff, Great Prices!",
        "Houston's Fun Retail Store | Come Browse & Discover",
        "Amazing Houston Shopping | Where Great Finds Happen"
      ],
      "Friendly": [
        "Your Neighborhood Houston Store | Everyone's Welcome Here",
        "Friendly Houston Retail Store | Personal Service & Great Products",
        "Houston's Most Welcoming Store | Shop Like Family"
      ],
      "Bold": [
        "Houston's HOTTEST Retail Store | Incredible Products Inside!",
        "REVOLUTIONARY Houston Shopping | Experience the Difference",
        "Houston's MUST-VISIT Store | Shopping Adventure Awaits"
      ],
      "Persuasive": [
        "Houston's #1 Retail Choice | See Why Customers Love Us",
        "Smart Houston Shoppers Choose Us | Premium Value Guaranteed",
        "Don't Shop Anywhere Else | Houston's Premier Retail Experience"
      ]
    },
    "Business Description": {
      "Professional": [
        "Our Houston retail store combines extensive product knowledge with exceptional customer service to deliver a superior shopping experience. We specialize in quality merchandise and professional guidance for discerning customers.",
        "Established as Houston's premier retail destination, we offer carefully curated products and expert customer service. Our commitment to quality and customer satisfaction sets us apart in the competitive retail landscape.",
        "Located in Houston, our retail store features premium products, knowledgeable staff, and personalized service that ensures every customer finds exactly what they need with confidence."
      ],
      "Casual": [
        "We're Houston's go-to retail spot for all the good stuff! Our store is packed with awesome products and staffed by people who genuinely love helping customers find cool things.",
        "Houston's most fun retail experience! We've got great products, friendly staff, and an atmosphere that makes shopping feel like hanging out with friends.",
        "Your favorite Houston store where shopping is always a good time. We're all about great products, fair prices, and making every customer feel like a VIP."
      ],
      "Friendly": [
        "Welcome to Houston's friendliest retail store! We're a family-owned business that treats every customer like a valued neighbor. Come experience genuine hospitality and find something wonderful.",
        "Our warm, welcoming Houston store is where shopping feels personal. We're passionate about helping our community find exactly what they need with a smile and a helping hand.",
        "Family-owned and Houston-proud, our retail store is built on the belief that every customer deserves exceptional service and quality products at fair prices."
      ],
      "Bold": [
        "Houston's most exciting retail revolution! We're transforming shopping with incredible products, unbeatable deals, and experiences that challenge everything you expect from retail.",
        "Not your average Houston store. We're retail rebels offering extraordinary products, game-changing deals, and shopping adventures that are anything but ordinary.",
        "Houston's retail game-changers! We're redefining what a store can be with fearless product selection and customer experiences that push the boundaries of retail."
      ],
      "Persuasive": [
        "Smart Houston shoppers choose us for guaranteed quality, unbeatable value, and service that makes every purchase worthwhile. Discover why we're the fastest-growing retail store in Houston.",
        "Don't just shop, invest in quality. Our Houston retail store delivers superior products, exceptional service, and value that makes every visit a smart decision.",
        "Houston's most recommended retail store for good reason. When you want guaranteed satisfaction, quality products, and service that exceeds expectations, choose the store others wish they could be."
      ]
    }
  },
  "Professional Service": {
    "Social Media Post": {
      "Professional": [
        "Excellence in professional services, delivered with integrity and expertise. Our Houston team provides comprehensive solutions tailored to your unique business needs and objectives.",
        "Trust Houston's leading professional service firm for strategic guidance and exceptional results. We combine industry expertise with personalized attention to deliver superior outcomes.",
        "Your success is our mission. Our Houston professional services team brings decades of experience and proven methodologies to help you achieve your business goals."
      ],
      "Casual": [
        "Need professional help without the stuffy attitude? Our Houston team gets stuff done while keeping things real and straightforward. Let's chat about your goals! 💼",
        "Houston business owners, we're here to make your life easier! Professional services that actually make sense, delivered by people who genuinely care about your success.",
        "Who says professional services have to be boring? Our Houston team brings expertise with personality. Come see how we can help your business thrive!"
      ],
      "Friendly": [
        "Good morning, Houston! Our professional services team is here to support your business dreams with genuine care and expert guidance. How can we help you succeed today?",
        "Welcome to Houston's most approachable professional services firm! We believe success should be achieved with integrity, collaboration, and a genuine desire to help others.",
        "Your Houston partners in success! Our professional services team treats every client like family, providing expert guidance with warmth and personal attention."
      ],
      "Bold": [
        "Houston businesses, STOP settling for mediocre results! Our professional services team delivers game-changing strategies that transform companies and skyrocket success!",
        "BREAKTHROUGH results demand BOLD professional services! We're Houston's most aggressive team of business strategists, ready to revolutionize your company's future!",
        "Houston's MOST POWERFUL professional services firm! We don't just provide advice - we deliver transformational results that leave competitors wondering what happened!"
      ],
      "Persuasive": [
        "Smart Houston business leaders choose professional services that deliver measurable ROI. Our proven track record and strategic expertise ensure your investment pays dividends.",
        "Don't leave success to chance. Houston's most trusted professional services firm provides the strategic advantage your business needs to outperform competitors.",
        "Successful Houston businesses partner with us for one reason: we deliver results that matter. Experience the difference strategic professional services make."
      ]
    },
    "Email Subject Lines": {
      "Professional": [
        "Strategic Consultation Scheduled: Your Business Growth Plan",
        "Quarterly Review Invitation: Optimizing Your Business Performance",
        "Professional Services Update: New Solutions for Your Industry"
      ],
      "Casual": [
        "Let's talk business growth (without the boring stuff) 📈",
        "Quick question about your business goals...",
        "Houston business tip that could change everything"
      ],
      "Friendly": [
        "Checking in on your business success journey",
        "A personal invitation from your Houston business partners",
        "We have some exciting news to share with you!"
      ],
      "Bold": [
        "HOUSTON EXCLUSIVE: Business transformation opportunity inside",
        "BREAKTHROUGH strategy session - limited availability",
        "WARNING: Your competitors might be reading this too"
      ],
      "Persuasive": [
        "Why successful Houston businesses choose our services",
        "Don't miss this competitive advantage opportunity",
        "Last chance: Strategic business review before Q2"
      ]
    },
    "Google Ad Headlines": {
      "Professional": [
        "Houston Professional Services | Strategic Business Consulting",
        "Expert Business Consulting Houston | Proven Results & Growth",
        "Top-Rated Houston Professional Services | Call Today"
      ],
      "Casual": [
        "Business Help That Actually Works | Houston Professional Services",
        "No-Nonsense Houston Business Consulting | Real Results",
        "Houston Business Services | Professional Help Made Simple"
      ],
      "Friendly": [
        "Your Houston Business Partners | Professional Services with Heart",
        "Friendly Houston Business Consulting | Personal Attention Guaranteed",
        "Houston's Most Approachable Professional Services Team"
      ],
      "Bold": [
        "TRANSFORM Your Houston Business | Revolutionary Professional Services",
        "Houston's MOST AGGRESSIVE Business Growth Experts",
        "BREAKTHROUGH Business Results | Houston Professional Services"
      ],
      "Persuasive": [
        "Houston's #1 Professional Services Firm | Proven ROI",
        "Smart Businesses Choose Us | Houston Professional Services",
        "Don't Settle for Less | Premier Houston Business Consulting"
      ]
    },
    "Business Description": {
      "Professional": [
        "Our Houston professional services firm provides comprehensive business consulting and strategic solutions to help organizations achieve sustainable growth and operational excellence. We combine industry expertise with proven methodologies to deliver measurable results.",
        "Established as Houston's premier professional services provider, we offer strategic consulting, business development, and specialized services tailored to each client's unique needs and market position.",
        "Located in Houston, our professional services team delivers expert guidance and strategic solutions that drive business growth, improve efficiency, and enhance competitive positioning in today's dynamic marketplace."
      ],
      "Casual": [
        "We're Houston's no-nonsense professional services team that gets real results for real businesses. No corporate speak, no empty promises - just solid expertise and genuine care for your success.",
        "Houston's most down-to-earth professional services firm! We help businesses grow and thrive without all the complicated jargon and stuffy attitudes you find elsewhere.",
        "Your Houston business partners who actually care about your success. We provide professional services with personality, expertise with enthusiasm, and results with relationship."
      ],
      "Friendly": [
        "Welcome to Houston's most caring professional services firm! We're passionate about helping local businesses succeed through personalized attention, expert guidance, and genuine partnership.",
        "Our warm, Houston-based professional services team treats every client like family. We believe business success should be achieved with integrity, collaboration, and personal care.",
        "Family-owned and Houston-proud, our professional services firm is built on the belief that every business deserves expert guidance delivered with warmth and personal attention."
      ],
      "Bold": [
        "Houston's most aggressive professional services firm! We're revolutionizing business consulting with breakthrough strategies, fearless innovation, and results that shatter expectations.",
        "Not your typical Houston consulting firm. We're business transformation specialists who challenge conventional thinking and deliver game-changing results that leave competitors behind.",
        "Houston's professional services rebels! We're rewriting the rules of business consulting with bold strategies and revolutionary approaches that transform companies."
      ],
      "Persuasive": [
        "Smart Houston business leaders choose our professional services for guaranteed results, proven ROI, and strategic advantages that ensure long-term success and market leadership.",
        "Don't just hire consultants, invest in transformation. Our Houston professional services firm delivers superior results, exceptional value, and strategic advantages that competitors can't match.",
        "Houston's most trusted professional services firm for good reason. When you need guaranteed business growth, strategic excellence, and results that exceed expectations, choose the team others recommend."
      ]
    }
  }
};

export default function AITools() {
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const form = useForm<GeneratorForm>({
    resolver: zodResolver(generatorSchema),
    defaultValues: {
      businessName: "",
      industry: "",
      contentType: "",
      tone: "",
    },
  });

  const emailForm = useForm<InsertContactSubmission>({
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

  const emailMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Results saved! We'll email you these AI-generated content ideas plus bonus templates.",
      });
      emailForm.reset();
      setShowEmailCapture(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: GeneratorForm) => {
    if (generationCount >= 3) {
      toast({
        title: "Free limit reached",
        description: "You've used your 3 free generations. Book a consultation for unlimited access!",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation delay
    setTimeout(() => {
      const industryData = contentDatabase[data.industry as keyof typeof contentDatabase];
      if (industryData) {
        const contentTypeData = industryData[data.contentType as keyof typeof industryData];
        if (contentTypeData) {
          const toneData = contentTypeData[data.tone as keyof typeof contentTypeData];
          if (toneData) {
            // Customize the content with the business name
            const customizedContent = toneData.map(content => 
              content.replace(/our restaurant|our store|our business|our company/gi, data.businessName)
                     .replace(/Our restaurant|Our store|Our business|Our company/gi, data.businessName)
                     .replace(/restaurant|store|business|company/gi, data.businessName)
            );
            setGeneratedContent(customizedContent);
            setGenerationCount(prev => prev + 1);
          }
        }
      }
      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast({
        title: "Copied!",
        description: "Content copied to clipboard",
      });
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy content",
        variant: "destructive",
      });
    }
  };

  const onEmailSubmit = (data: InsertContactSubmission) => {
    const contentContext = `Generated content:\n${generatedContent.join('\n\n---\n\n')}\n\nRequested: Email delivery of AI-generated content results`;
    emailMutation.mutate({ ...data, message: contentContext });
  };

  const industries = [
    "Restaurant", "Retail Store", "Professional Service", "Home Service", "Healthcare", 
    "Real Estate", "Fitness", "Beauty/Salon", "Auto Service", "Legal", "Accounting"
  ];

  const contentTypes = [
    "Social Media Post", "Email Subject Lines", "Google Ad Headlines", "Business Description"
  ];

  const tones = [
    "Professional", "Casual", "Friendly", "Bold", "Persuasive"
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
                <a href="/#services" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-services">Services</a>
                <a href="/assessment" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors" data-testid="nav-assessment">Assessment</a>
                <a href="/ai-tools" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors border-b-2 border-primary" data-testid="nav-ai-tools">Free AI Tools</a>
                <a href="#contact" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg" data-testid="nav-cta">Get Started</a>
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
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Wand2 className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" data-testid="hero-title">
                Free AI Content Generator for{" "}
                <span className="gradient-text">Houston Businesses</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto" data-testid="hero-subtitle">
                Generate professional marketing content in seconds with our AI-powered tool. Perfect for social media posts, email campaigns, and business descriptions. Try it free right now!
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center">
                  <Gift className="w-4 h-4 mr-2" />
                  3 free generations
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Instant results
                </div>
                <div className="flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Professional quality
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* AI Generator Tool */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Card className="shadow-xl" data-testid="generator-card">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center">
                  <Zap className="w-6 h-6 mr-2 text-primary" />
                  AI Content Generator
                </CardTitle>
                <p className="text-muted-foreground">
                  Generate professional marketing content tailored to your Houston business
                </p>
                <div className="text-sm text-muted-foreground">
                  {generationCount}/3 free generations used today
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Building2 className="w-4 h-4 mr-2" />
                            Business Name
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Houston Coffee Company" {...field} data-testid="input-business-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <User className="w-4 h-4 mr-2" />
                              Industry
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-industry">
                                  <SelectValue placeholder="Select industry" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {industries.map(industry => (
                                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contentType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <FileText className="w-4 h-4 mr-2" />
                              Content Type
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-content-type">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {contentTypes.map(type => (
                                  <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Palette className="w-4 h-4 mr-2" />
                              Tone
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-tone">
                                  <SelectValue placeholder="Select tone" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {tones.map(tone => (
                                  <SelectItem key={tone} value={tone}>{tone}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full text-lg py-4"
                      disabled={isGenerating || generationCount >= 3}
                      data-testid="button-generate"
                    >
                      {isGenerating ? (
                        <>
                          <Wand2 className="w-5 h-5 mr-2 animate-spin" />
                          Generating AI Content...
                        </>
                      ) : generationCount >= 3 ? (
                        "Free Limit Reached - Book Consultation"
                      ) : (
                        <>
                          <Wand2 className="w-5 h-5 mr-2" />
                          Generate AI Content
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Generated Results */}
          {generatedContent.length > 0 && (
            <AnimatedSection className="mt-12">
              <Card className="shadow-xl" data-testid="results-card">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-primary" />
                    Your AI-Generated Content
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Here are 3 professional variations for your business. Click to copy any one you like!
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {generatedContent.map((content, index) => (
                    <Card key={index} className="relative hover:shadow-md transition-shadow" data-testid={`result-card-${index}`}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 pr-4">
                            <div className="text-sm text-muted-foreground mb-2">Variation {index + 1}</div>
                            <p className="text-foreground leading-relaxed" data-testid={`result-text-${index}`}>
                              {content}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(content, index)}
                            className={`flex-shrink-0 ${copiedIndex === index ? 'bg-green-50 border-green-200' : ''}`}
                            data-testid={`button-copy-${index}`}
                          >
                            {copiedIndex === index ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4 mr-2" />
                                Copy
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="pt-6 space-y-4">
                    <Button
                      onClick={() => setShowEmailCapture(true)}
                      variant="outline"
                      className="w-full"
                      data-testid="button-save-email"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Save These Results to My Email
                    </Button>

                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-6 text-center">
                        <h3 className="font-bold text-foreground mb-2">Want Unlimited AI Content Generation?</h3>
                        <p className="text-muted-foreground mb-4">
                          Get unlimited access to our AI tools, plus custom training and advanced features.
                        </p>
                        <Button asChild className="w-full sm:w-auto" data-testid="button-consultation">
                          <a href="#contact">
                            Book Free Consultation
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          )}

          {/* Email Capture Modal */}
          {showEmailCapture && (
            <AnimatedSection className="mt-8">
              <Card className="shadow-xl border-primary/20" data-testid="email-capture-card">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground">
                    Save Results to Email
                  </CardTitle>
                  <p className="text-muted-foreground">
                    We'll email you these results plus bonus AI marketing templates!
                  </p>
                </CardHeader>
                <CardContent>
                  <Form {...emailForm}>
                    <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={emailForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} data-testid="email-input-first-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={emailForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Smith" {...field} data-testid="email-input-last-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={emailForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@yourbusiness.com" {...field} data-testid="email-input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-4">
                        <Button 
                          type="submit" 
                          className="flex-1"
                          disabled={emailMutation.isPending}
                          data-testid="button-save-results"
                        >
                          {emailMutation.isPending ? "Saving..." : "Save Results & Send Bonus Templates"}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setShowEmailCapture(false)}
                          data-testid="button-cancel-email"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 demo-container">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="contact-title">
              Ready for Unlimited AI Marketing Tools?
            </h2>
            <p className="text-xl text-muted-foreground mb-8" data-testid="contact-subtitle">
              Book a free consultation to discuss custom AI solutions for your Houston business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center text-foreground">
                <Phone className="w-5 h-5 mr-2" />
                <span className="text-lg">(713) 555-0123</span>
              </div>
              <div className="flex items-center text-foreground">
                <Mail className="w-5 h-5 mr-2" />
                <span className="text-lg">info@aihoustonmarketing.com</span>
              </div>
            </div>
            <div className="mt-8">
              <Button asChild size="lg" className="text-lg px-8 py-4" data-testid="button-book-consultation">
                <a href="/#contact">Book Free Consultation</a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}