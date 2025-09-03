import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  options?: string[];
}

interface ChatbotProps {
  autoOpenOnHomepage?: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({ autoOpenOnHomepage = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userEmail, setUserEmail] = useState('');
  const [userBusiness, setUserBusiness] = useState('');
  const [userChallenge, setUserChallenge] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-open functionality for homepage
  useEffect(() => {
    if (autoOpenOnHomepage) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        addBotMessage(
          "👋 Hello! I'm Sarah, your AI marketing assistant from Marketing AI Houston. I help local business owners discover how AI can save them time and attract more customers. What type of business do you own?",
          ["Restaurant", "Retail Store", "Professional Service", "Home Service", "Other"]
        );
      }, 45000); // 45 seconds

      return () => clearTimeout(timer);
    }
  }, [autoOpenOnHomepage]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Play notification sound
  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Ignore errors if audio can't play
      });
    }
  };

  const addBotMessage = (text: string, options?: string[]) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        isBot: true,
        timestamp: new Date(),
        options
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
      
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
      
      playNotificationSound();
    }, 1000); // Simulate typing delay
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  const handleBusinessTypeSelection = (businessType: string) => {
    setUserBusiness(businessType);
    addUserMessage(businessType);
    setCurrentStep(1);
    
    setTimeout(() => {
      addBotMessage(
        `Thanks! Running a ${businessType.toLowerCase()} in Houston can be challenging with all the competition. What's your biggest marketing challenge right now?`,
        ["Not enough time", "Creating content", "Getting new customers", "Managing online reputation", "Something else"]
      );
    }, 500);
  };

  const handleChallengeSelection = (challenge: string) => {
    setUserChallenge(challenge);
    addUserMessage(challenge);
    setCurrentStep(2);
    
    setTimeout(() => {
      let recommendation = "";
      
      // Restaurant specific responses
      if (userBusiness === "Restaurant" && challenge.includes("content")) {
        recommendation = "I totally understand! Restaurant owners tell me they spend hours trying to create social media posts about daily specials, events, and promotions. Our AI Training Workshop teaches you to create a week's worth of restaurant content in just 30 minutes. You'll learn specific prompts for food photos, menu descriptions, and customer engagement posts.";
      } else if (userBusiness === "Restaurant" && challenge.includes("customers")) {
        recommendation = "That's so common for Houston restaurants! Our Google Business Profile Optimization service is perfect for this. We optimize your profile so when people search 'best Mexican food near me' or 'restaurants in Heights' you show up first. Our restaurant clients typically see 3x more reservations within 60 days.";
      } else if (userBusiness === "Restaurant" && challenge.includes("time")) {
        recommendation = "You're juggling so much - kitchen operations, staff, and marketing! Our AI tools can automate your social media posts, write menu descriptions, and create promotional content while you focus on what you do best - creating amazing food. Most restaurant owners save 10+ hours per week.";
      }
      // Professional Service specific responses  
      else if (userBusiness === "Professional Service" && challenge.includes("customers")) {
        recommendation = "That's the #1 challenge I hear from Houston professionals. Our Google Business Profile Optimization service is perfect for this. We optimize your profile so when people search 'best accountant near me' or 'Houston lawyer' you show up first. Our clients typically see 3x more phone calls within 60 days.";
      } else if (userBusiness === "Professional Service" && challenge.includes("content")) {
        recommendation = "Professional services need credible, authoritative content, and that takes time to write well. Our AI Training Workshop teaches you to create professional blog posts, social media content, and client communications in minutes instead of hours. You'll maintain your professional voice while saving tons of time.";
      }
      // Retail specific responses
      else if (userBusiness === "Retail Store" && challenge.includes("time")) {
        recommendation = "You're not alone - retail owners are juggling inventory, customers, and marketing. Our AI tools can automate your social media, write product descriptions, and create email campaigns while you focus on running your store. Most clients save 10+ hours per week.";
      } else if (userBusiness === "Retail Store" && challenge.includes("customers")) {
        recommendation = "Getting foot traffic in Houston retail is tough with all the competition! Our Google Business Profile Optimization helps you dominate local searches like 'clothing store near me' or 'gift shop in Houston.' We also set up AI-powered review management to build trust with potential customers.";
      }
      // Generic responses for other combinations
      else if (challenge.includes("time") || challenge.includes("content")) {
        recommendation = "I hear this constantly from Houston business owners! Our AI Training Workshop is perfect for this. In just 4 hours, you'll learn to use AI tools to create a week's worth of marketing content in 30 minutes. You'll save hours every week while creating better content for your business.";
      } else if (challenge.includes("customers")) {
        recommendation = "That's the biggest challenge for Houston businesses right now. Our Google Business Profile Optimization service is designed exactly for this. We optimize your profile so when people search for your type of business in Houston, you show up first. Our clients typically see 3x more inquiries within 60 days.";
      } else {
        recommendation = "I completely understand that challenge. Our AI marketing solutions can help streamline your operations and attract more customers. Let me tell you about a specific approach that works really well for Houston businesses like yours.";
      }
      
      addBotMessage(recommendation);
      
      setTimeout(() => {
        showSuccessStory();
      }, 1500);
    }, 500);
  };

  const showSuccessStory = () => {
    setCurrentStep(3);
    
    let successStory = "";
    
    if (userBusiness === "Restaurant") {
      successStory = "For example, Maria's Mexican Restaurant in the Heights used our AI training and increased their weekend bookings by 40% while spending 75% less time on marketing. She went from spending 3 hours creating posts to just 30 minutes per week!";
    } else if (userBusiness === "Professional Service") {
      successStory = "For example, Johnson & Associates Law Firm used our Google Business Profile optimization and went from 2-3 consultation calls per week to 8-10 calls per week within just 60 days. Their profile now dominates searches for 'Houston attorney.'";
    } else if (userBusiness === "Retail Store") {
      successStory = "For example, Boutique 77 in Rice Village used our AI content tools and saw a 65% increase in foot traffic within 3 months. They now create engaging social media posts in minutes instead of hours, and their Google listing gets 5x more views.";
    } else {
      successStory = "For example, Houston businesses working with us typically see a 340% increase in leads within 90 days while saving 15+ hours per week on marketing tasks. Our AI approach is transforming how local businesses grow!";
    }
    
    addBotMessage(successStory);
    
    setTimeout(() => {
      requestEmail();
    }, 2500);
  };

  const requestEmail = () => {
    setCurrentStep(4);
    addBotMessage(`I'd love to send you a free guide: '${userBusiness} Owner's Guide to AI Marketing.' What's the best email to send this to?`);
  };

  const handleEmailSubmit = () => {
    if (userEmail && userEmail.includes('@')) {
      addUserMessage(userEmail);
      setCurrentStep(5);
      
      setTimeout(() => {
        addBotMessage(
          `Thanks! I'll send that right over. I can also set up a quick 15-minute call where I'll show you exactly which AI tools would work best for your ${userBusiness.toLowerCase()}. What would you like to do?`,
          ["Book Free Call", "Just Send Guide", "Start Over"]
        );
      }, 500);
    }
  };

  const handleFinalResponse = (response: string) => {
    addUserMessage(response);
    setCurrentStep(6);
    
    if (response === "Book Free Call") {
      setTimeout(() => {
        addBotMessage(
          "Perfect! You can schedule your free consultation at our contact page or call us directly at (713) 555-0123. I'll make sure you get that ${userBusiness} guide right away too!\n\nI'm excited to help your Houston business grow with AI! 🚀"
        );
      }, 500);
    } else if (response === "Just Send Guide") {
      setTimeout(() => {
        addBotMessage(
          "Thanks! Check your email in a few minutes for your ${userBusiness} AI guide. If you change your mind about that call, just visit our contact page anytime.\n\nHere's to your business success! 📧"
        );
      }, 500);
    } else if (response === "Start Over") {
      startNewConversation();
    }
  };

  const handleOptionClick = (option: string) => {
    if (currentStep === 0) {
      handleBusinessTypeSelection(option);
    } else if (currentStep === 1) {
      handleChallengeSelection(option);
    } else if (currentStep === 5) {
      handleFinalResponse(option);
    }
  };

  const startNewConversation = () => {
    setMessages([]);
    setUserEmail('');
    setUserBusiness('');
    setUserChallenge('');
    setCurrentStep(0);
    setIsTyping(false);
    
    setTimeout(() => {
      addBotMessage(
        "👋 Hello! I'm Sarah, your AI marketing assistant from Marketing AI Houston. I help local business owners discover how AI can save them time and attract more customers. What type of business do you own?",
        ["Restaurant", "Retail Store", "Professional Service", "Home Service", "Other"]
      );
    }, 500);
  };

  const openChat = () => {
    setIsOpen(true);
    setUnreadCount(0);
    
    if (messages.length === 0) {
      addBotMessage(
        "👋 Hello! I'm Sarah, your AI marketing assistant from Marketing AI Houston. I help local business owners discover how AI can save them time and attract more customers. What type of business do you own?",
        ["Restaurant", "Retail Store", "Professional Service", "Home Service", "Other"]
      );
    }
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hidden audio element for notification sound */}
      <audio
        ref={audioRef}
        preload="auto"
        style={{ display: 'none' }}
      >
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEaAzmDz/LNeyMEKojM7+CVQQ0PVqzn77BdGAg+ltrywnIlBSuCz+/ejUEEDlCo5u+zYxsGPJPY88p9KwUme8v4rmsZCS2F0fPgi0cFBkGg4PK2YxsGOpTS8tGAKwUrcPvxekwgKVw" type="audio/wav" />
      </audio>

      {/* Chat Icon */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={openChat}
          className="relative w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-[#1E3A5F] hover:bg-[#0066FF] border-2 border-white"
          data-testid="chatbot-toggle"
        >
          <MessageCircle className="w-8 h-8 text-white" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-96 h-[500px] max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden md:w-96 md:right-6 sm:right-3 sm:w-[calc(100vw-24px)] sm:max-w-[90vw] sm:h-[450px]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            data-testid="chatbot-window"
            style={{
              left: window.innerWidth < 768 ? '10px' : 'auto',
              right: window.innerWidth < 768 ? '10px' : '24px',
              width: window.innerWidth < 768 ? 'calc(100vw - 20px)' : '384px',
              maxWidth: window.innerWidth < 768 ? '90vw' : '384px'
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1E3A5F] to-[#0066FF] text-white p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-xs sm:text-sm leading-tight">Marketing AI Houston</h3>
                  <p className="text-xs opacity-90 leading-tight">AI Marketing Assistant</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeChat}
                className="text-white hover:bg-white/20 w-8 h-8 sm:w-8 sm:h-8 min-h-[44px] min-w-[44px] sm:min-h-[32px] sm:min-w-[32px]"
                data-testid="chatbot-close"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] p-2.5 sm:p-3 rounded-2xl text-xs sm:text-sm ${
                      message.isBot
                        ? 'bg-white text-gray-800 shadow-sm border'
                        : 'bg-[#0066FF] text-white'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed break-words">{message.text}</p>
                    
                    {message.options && (
                      <div className="mt-3 sm:mt-4 space-y-2">
                        {message.options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleOptionClick(option)}
                            className="w-full text-left justify-start text-xs sm:text-sm py-3 sm:py-3 px-3 sm:px-4 h-auto min-h-[44px] hover:bg-[#0066FF] hover:text-white transition-colors border border-gray-200 rounded-lg leading-tight"
                            data-testid={`chatbot-option-${index}`}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white p-2.5 sm:p-3 rounded-2xl shadow-sm border text-gray-800">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Email Input */}
            {currentStep === 4 && (
              <div className="p-3 sm:p-4 border-t bg-white">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="flex-1 text-sm min-h-[44px] px-3 py-2"
                    data-testid="chatbot-email-input"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleEmailSubmit();
                      }
                    }}
                  />
                  <Button
                    onClick={handleEmailSubmit}
                    size="sm"
                    className="bg-[#0066FF] hover:bg-[#1E3A5F] px-4 min-h-[44px] w-full sm:w-auto"
                    data-testid="chatbot-email-submit"
                  >
                    <Send className="w-4 h-4 mr-2 sm:mr-0" />
                    <span className="sm:hidden">Send Email</span>
                  </Button>
                </div>
              </div>
            )}
            
            {/* New Conversation Button */}
            {messages.length > 0 && (
              <div className="p-2 sm:p-3 border-t bg-gray-50 flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={startNewConversation}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors min-h-[44px] px-4 py-2"
                  data-testid="chatbot-new-conversation"
                >
                  New Conversation
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile Responsive Adjustments */}
      <style>{`
        @media (max-width: 768px) {
          [data-testid="chatbot-window"] {
            width: calc(100vw - 20px) !important;
            max-width: 90vw !important;
            left: 10px !important;
            right: 10px !important;
            bottom: 80px !important;
            height: 450px !important;
          }
        }
        
        @media (max-width: 480px) {
          [data-testid="chatbot-window"] {
            width: calc(100vw - 16px) !important;
            left: 8px !important;
            right: 8px !important;
            bottom: 76px !important;
            height: 400px !important;
          }
        }
        
        /* Ensure proper text wrapping and touch targets */
        @media (max-width: 768px) {
          .chatbot-window .break-words {
            word-wrap: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
          }
          
          .chatbot-window button {
            min-height: 44px;
            touch-action: manipulation;
          }
        }
      `}</style>
    </>
  );
};

export default Chatbot;