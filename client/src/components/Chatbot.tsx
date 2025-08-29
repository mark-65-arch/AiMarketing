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
          "👋 Hi! I'm here to help you discover how AI can grow your Houston business. What type of business do you own?",
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
        "Great! What's your biggest marketing challenge right now?",
        ["Not enough time", "Creating content", "Getting new customers", "Managing reviews", "Other"]
      );
    }, 500);
  };

  const handleChallengeSelection = (challenge: string) => {
    setUserChallenge(challenge);
    addUserMessage(challenge);
    setCurrentStep(2);
    
    setTimeout(() => {
      let recommendation = "";
      let service = "";
      
      if (challenge.includes("time") || challenge.includes("content")) {
        service = "AI Training Workshop";
        recommendation = `Perfect! Our ${service} is exactly what you need. In just 4 hours, you'll learn to use AI tools like ChatGPT to create marketing content 10x faster. You'll save hours every week while creating better content for your ${userBusiness.toLowerCase()}.`;
      } else if (challenge.includes("customers")) {
        service = "Business Profile Optimization";
        recommendation = `Excellent! Our ${service} service is designed for this exact challenge. We'll optimize your Google Business Profile with AI-powered strategies to help your ${userBusiness.toLowerCase()} appear at the top of local search results, bringing you more customers automatically.`;
      } else {
        service = "AI Website Development";
        recommendation = `Great choice! Our ${service} service creates websites specifically optimized for AI search and voice queries. This means more people will find your ${userBusiness.toLowerCase()} online, and your website will convert visitors into customers much more effectively.`;
      }
      
      addBotMessage(recommendation);
      
      setTimeout(() => {
        showSuccessStory();
      }, 2000);
    }, 500);
  };

  const showSuccessStory = () => {
    setCurrentStep(3);
    
    let successStory = "";
    
    if (userBusiness === "Restaurant") {
      successStory = "🌟 Success Story: Carlos from El Corazón Restaurant in Heights used our AI training and saw a 40% increase in customers within just 2 months. He now saves 10 hours per week on marketing while bringing in more business than ever!";
    } else if (userBusiness === "Professional Service") {
      successStory = "🌟 Success Story: Dr. Lisa from Houston Wellness Clinic automated her patient communications with our AI solutions. She's now saving 10 hours per week while providing better patient care and growing her practice!";
    } else if (userBusiness === "Retail Store") {
      successStory = "🌟 Success Story: A local Houston retail store used our Business Profile Optimization and increased their foot traffic by 65% in just 3 months. Their Google listing now dominates local search results!";
    } else {
      successStory = "🌟 Success Story: Houston businesses working with us see an average of 340% increase in leads and save 15+ hours per week on marketing tasks. Our AI solutions are transforming how local businesses grow!";
    }
    
    addBotMessage(successStory);
    
    setTimeout(() => {
      requestEmail();
    }, 2500);
  };

  const requestEmail = () => {
    setCurrentStep(4);
    addBotMessage(`I'd love to send you a free AI marketing guide specifically for ${userBusiness.toLowerCase()} businesses. What's your email address?`);
  };

  const handleEmailSubmit = () => {
    if (userEmail && userEmail.includes('@')) {
      addUserMessage(userEmail);
      setCurrentStep(5);
      
      setTimeout(() => {
        addBotMessage(
          `Perfect! I'll send that guide to ${userEmail} right away. 📧\n\nWould you like to schedule a quick 15-minute call to discuss your specific situation? It's completely free and I can show you exactly how AI can solve your marketing challenges.`,
          ["Yes, let's schedule a call", "Not now, just send me resources"]
        );
      }, 500);
    }
  };

  const handleConsultationResponse = (response: string) => {
    addUserMessage(response);
    setCurrentStep(6);
    
    if (response.includes("Yes")) {
      setTimeout(() => {
        addBotMessage(
          "Fantastic! 🎉 You can schedule your free 15-minute consultation right now by calling us at (713) 555-0123 or visit our contact page.\n\nI'm excited to help your business succeed with AI marketing!"
        );
      }, 500);
    } else {
      setTimeout(() => {
        addBotMessage(
          "No problem at all! I've sent you the free guide and you can always reach out when you're ready. Feel free to explore our website for more AI marketing tips.\n\nHere's to your business success! 🚀"
        );
      }, 500);
    }
  };

  const handleOptionClick = (option: string) => {
    if (currentStep === 0) {
      handleBusinessTypeSelection(option);
    } else if (currentStep === 1) {
      handleChallengeSelection(option);
    } else if (currentStep === 5) {
      handleConsultationResponse(option);
    }
  };

  const openChat = () => {
    setIsOpen(true);
    setUnreadCount(0);
    
    if (messages.length === 0) {
      addBotMessage(
        "👋 Hi! I'm here to help you discover how AI can grow your Houston business. What type of business do you own?",
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
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden md:w-96 sm:w-80 xs:w-72"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            data-testid="chatbot-window"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1E3A5F] to-[#0066FF] text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Houston AI Marketing</h3>
                  <p className="text-xs opacity-90">AI Marketing Assistant</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeChat}
                className="text-white hover:bg-white/20 w-8 h-8"
                data-testid="chatbot-close"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      message.isBot
                        ? 'bg-white text-gray-800 shadow-sm border'
                        : 'bg-[#0066FF] text-white'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                    
                    {message.options && (
                      <div className="mt-3 space-y-2">
                        {message.options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleOptionClick(option)}
                            className="w-full text-left justify-start text-xs py-2 h-auto hover:bg-[#0066FF] hover:text-white transition-colors"
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
                  <div className="bg-white p-3 rounded-2xl shadow-sm border text-gray-800">
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
              <div className="p-4 border-t bg-white">
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="flex-1 text-sm"
                    data-testid="chatbot-email-input"
                  />
                  <Button
                    onClick={handleEmailSubmit}
                    size="sm"
                    className="bg-[#0066FF] hover:bg-[#1E3A5F] px-4"
                    data-testid="chatbot-email-submit"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile Responsive Adjustments */}
      <style>{`
        @media (max-width: 640px) {
          .chatbot-window {
            width: calc(100vw - 24px) !important;
            right: 12px !important;
            left: 12px !important;
            bottom: 80px !important;
          }
        }
      `}</style>
    </>
  );
};

export default Chatbot;