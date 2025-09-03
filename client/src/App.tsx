import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
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
import WoodlandsAIMarketing from "@/pages/woodlands-ai-marketing";
import SugarLandAIMarketing from "@/pages/sugar-land-ai-marketing";
import KatyAIMarketing from "@/pages/katy-ai-marketing";
import PearlandAIMarketing from "@/pages/pearland-ai-marketing";
import ClearLakeAIMarketing from "@/pages/clear-lake-ai-marketing";
import LeagueCityAIMarketing from "@/pages/league-city-ai-marketing";
import PasadenaAIMarketing from "@/pages/pasadena-ai-marketing";
import CypressAIMarketing from "@/pages/cypress-ai-marketing";

// Blog and Resource Pages
import Blog from "@/pages/blog";
import HoustonAIMarketingGuide from "@/pages/houston-ai-marketing-guide";
import AIToolsSmallBusiness from "@/pages/ai-tools-small-business";
import AIMarketingChecklist from "@/pages/ai-marketing-checklist";
import HoustonBusinessResources from "@/pages/houston-business-resources";

// Blog Articles
import HowAIHelpsHoustonRestaurants from "@/pages/how-ai-helps-houston-restaurants";
import AIVsTraditionalMarketing from "@/pages/ai-vs-traditional-marketing";
import GoogleBusinessProfileAIOptimization from "@/pages/google-business-profile-ai-optimization";
import AIContentCreationGuide from "@/pages/ai-content-creation-guide";
import VoiceSearchOptimizationHouston from "@/pages/voice-search-optimization-houston";

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
        <Route path="/ai-tools" component={AITools}/>
        <Route path="/heights-ai-marketing" component={HeightsAIMarketing}/>
        <Route path="/midtown-ai-marketing" component={MidtownAIMarketing}/>
        <Route path="/downtown-ai-marketing" component={DowntownAIMarketing}/>
        <Route path="/memorial-ai-marketing" component={MemorialAIMarketing}/>
        <Route path="/galleria-ai-marketing" component={GalleriaAIMarketing}/>
        <Route path="/ai-marketing-the-woodlands-texas" component={WoodlandsAIMarketing}/>
        <Route path="/ai-marketing-sugar-land-texas" component={SugarLandAIMarketing}/>
        <Route path="/ai-marketing-katy-texas" component={KatyAIMarketing}/>
        <Route path="/ai-marketing-pearland-texas" component={PearlandAIMarketing}/>
        <Route path="/ai-marketing-clear-lake-texas" component={ClearLakeAIMarketing}/>
        <Route path="/ai-marketing-league-city-texas" component={LeagueCityAIMarketing}/>
        <Route path="/ai-marketing-pasadena-texas" component={PasadenaAIMarketing}/>
        <Route path="/ai-marketing-cypress-texas" component={CypressAIMarketing}/>
        
        {/* Blog and Resource Pages */}
        <Route path="/blog" component={Blog}/>
        <Route path="/houston-ai-marketing-guide" component={HoustonAIMarketingGuide}/>
        <Route path="/ai-tools-small-business" component={AIToolsSmallBusiness}/>
        <Route path="/ai-marketing-checklist" component={AIMarketingChecklist}/>
        <Route path="/houston-business-resources" component={HoustonBusinessResources}/>
        
        {/* Blog Articles */}
        <Route path="/how-ai-helps-houston-restaurants" component={HowAIHelpsHoustonRestaurants}/>
        <Route path="/ai-vs-traditional-marketing" component={AIVsTraditionalMarketing}/>
        <Route path="/google-business-profile-ai-optimization" component={GoogleBusinessProfileAIOptimization}/>
        <Route path="/ai-content-creation-guide" component={AIContentCreationGuide}/>
        <Route path="/voice-search-optimization-houston" component={VoiceSearchOptimizationHouston}/>
        
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
