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
import HeightsAIMarketing from "@/pages/heights-ai-marketing";
import MidtownAIMarketing from "@/pages/midtown-ai-marketing";
import DowntownAIMarketing from "@/pages/downtown-ai-marketing";
import MemorialAIMarketing from "@/pages/memorial-ai-marketing";
import GalleriaAIMarketing from "@/pages/galleria-ai-marketing";
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
        <Route path="/heights-ai-marketing" component={HeightsAIMarketing}/>
        <Route path="/midtown-ai-marketing" component={MidtownAIMarketing}/>
        <Route path="/downtown-ai-marketing" component={DowntownAIMarketing}/>
        <Route path="/memorial-ai-marketing" component={MemorialAIMarketing}/>
        <Route path="/galleria-ai-marketing" component={GalleriaAIMarketing}/>
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
