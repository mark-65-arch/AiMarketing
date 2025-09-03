import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion, useInView } from "framer-motion";
import { CheckCircle, Download, Send, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertLeadMagnetSubmissionSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import type { InsertLeadMagnetSubmission } from "@shared/schema";

interface LeadMagnetFormProps {
  leadMagnetType: string;
  title: string;
  subtitle: string;
  benefits: string[];
  additionalFields?: React.ReactNode;
  onSuccess?: () => void;
  showPhoneField?: boolean;
  className?: string;
}

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

export default function LeadMagnetForm({
  leadMagnetType,
  title,
  subtitle,
  benefits,
  additionalFields,
  onSuccess,
  showPhoneField = false,
  className = ""
}: LeadMagnetFormProps) {
  const { toast } = useToast();

  const form = useForm<InsertLeadMagnetSubmission>({
    resolver: zodResolver(insertLeadMagnetSubmissionSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      businessType: "",
      leadMagnetType,
      additionalInfo: "",
    },
  });

  const leadMagnetMutation = useMutation({
    mutationFn: async (data: InsertLeadMagnetSubmission) => {
      const response = await apiRequest("POST", "/api/lead-magnet", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "🎉 Success!",
        description: "Thank you! Check your email for your free resource. We'll also follow up with personalized AI marketing tips.",
        duration: 6000,
      });
      form.reset();
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      console.error('Lead magnet form submission error:', error);
      
      const errorMessage = error.message?.includes('Server error') 
        ? 'Our servers are experiencing high demand. Please try again in a few minutes or call us directly at (713) 555-0123.'
        : 'Something went wrong. Please check your internet connection and try again, or call us directly at (713) 555-0123.';
      
      toast({
        title: "❌ Submission Failed",
        description: errorMessage,
        variant: "destructive",
        duration: 8000,
      });
    },
  });

  const onSubmit = (data: InsertLeadMagnetSubmission) => {
    leadMagnetMutation.mutate(data);
  };

  return (
    <AnimatedSection className={className}>
      <Card className="shadow-xl" data-testid="lead-magnet-form-card">
        <CardContent className="p-8">
          <div className="mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                <Download className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4 text-center" data-testid="form-title">
              {title}
            </h2>
            <p className="text-muted-foreground text-center mb-6" data-testid="form-subtitle">
              {subtitle}
            </p>
            
            {/* Benefits List */}
            <div className="bg-accent/10 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-primary mr-2" />
                What's Included:
              </h3>
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="lead-magnet-form">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name*</FormLabel>
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
                      <FormLabel>Last Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Your last name" {...field} data-testid="input-last-name" />
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
                    <FormLabel>Email Address*</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {showPhoneField && (
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone (Optional)</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="(713) 555-0123" {...field} data-testid="input-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Type*</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} data-testid="select-business-type">
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your business type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="restaurant">Restaurant/Food Service</SelectItem>
                        <SelectItem value="retail">Retail Store</SelectItem>
                        <SelectItem value="professional-services">Professional Services</SelectItem>
                        <SelectItem value="healthcare">Healthcare/Medical</SelectItem>
                        <SelectItem value="real-estate">Real Estate</SelectItem>
                        <SelectItem value="fitness">Fitness/Wellness</SelectItem>
                        <SelectItem value="beauty">Beauty/Salon</SelectItem>
                        <SelectItem value="home-services">Home Services</SelectItem>
                        <SelectItem value="automotive">Automotive</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {additionalFields}

              <div className="bg-muted/30 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <Star className="w-4 h-4 text-yellow-500 mr-2" />
                  <span className="text-sm font-medium">4.9/5 from 100+ Houston businesses</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  "This resource helped us increase our leads by 300% in just 30 days!" - Sarah, Houston Restaurant Owner
                </p>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full text-lg px-8 py-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                disabled={leadMagnetMutation.isPending}
                data-testid="button-submit"
              >
                <Send className="w-5 h-5 mr-2" />
                {leadMagnetMutation.isPending ? "Sending..." : "Get My Free Resource"}
              </Button>

              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-2">
                  <CheckCircle className="w-4 h-4 inline mr-1 text-primary" />
                  Instant delivery to your inbox
                </div>
                <div className="text-xs text-muted-foreground">
                  <CheckCircle className="w-4 h-4 inline mr-1 text-primary" />
                  No spam, unsubscribe anytime
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}