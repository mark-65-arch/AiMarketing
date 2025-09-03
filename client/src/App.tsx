import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import Homepage from "@/pages/homepage";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Assessment from "@/pages/assessment";
import AITraining from "@/pages/ai-training";
import BusinessProfile from "@/pages/business-profile";
import AIWebsites from "@/pages/ai-websites";
import HeightsAIMarketing from "@/pages/heights-ai-marketing";
import MidtownAIMarketing from "@/pages/midtown-ai-marketing";
import DowntownAIMarketing from "@/pages/downtown-ai-marketing";
import MemorialAIMarketing from "@/pages/memorial-ai-marketing";
import WoodlandsAIMarketing from "@/pages/woodlands-ai-marketing";
import SugarLandAIMarketing from "@/pages/sugar-land-ai-marketing";
import KatyAIMarketing from "@/pages/katy-ai-marketing";
import ClearLakeAIMarketing from "@/pages/clear-lake-ai-marketing";

// Keep only essential pages
import ThankYou from "@/pages/thank-you";

import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();
  const isHomepage = location === '/';

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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
        <Route path="/heights-ai-marketing" component={HeightsAIMarketing}/>
        <Route path="/midtown-ai-marketing" component={MidtownAIMarketing}/>
        <Route path="/downtown-ai-marketing" component={DowntownAIMarketing}/>
        <Route path="/memorial-ai-marketing" component={MemorialAIMarketing}/>
        <Route path="/ai-marketing-the-woodlands-texas" component={WoodlandsAIMarketing}/>
        <Route path="/ai-marketing-sugar-land-texas" component={SugarLandAIMarketing}/>
        <Route path="/ai-marketing-katy-texas" component={KatyAIMarketing}/>
        <Route path="/ai-marketing-clear-lake-texas" component={ClearLakeAIMarketing}/>
        <Route path="/thank-you" component={ThankYou}/>
        
        <Route component={NotFound} />
      </Switch>
      <Footer />
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
