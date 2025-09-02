import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import Homepage from "@/pages/homepage";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Assessment from "@/pages/assessment";
import AITraining from "@/pages/ai-training";
import BusinessProfile from "@/pages/business-profile";
import AIWebsites from "@/pages/ai-websites";
import AITools from "@/pages/ai-tools";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();
  const isHomepage = location === '/';

  return (
    <>
      <Switch>
        <Route path="/" component={Homepage}/>
        <Route path="/about" component={About}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/assessment" component={Assessment}/>
        <Route path="/ai-training" component={AITraining}/>
        <Route path="/business-profile" component={BusinessProfile}/>
        <Route path="/ai-websites" component={AIWebsites}/>
        <Route path="/ai-tools" component={AITools}/>
        <Route component={NotFound} />
      </Switch>
      <Footer />
      <Chatbot autoOpenOnHomepage={isHomepage} />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
