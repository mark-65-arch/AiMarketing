import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Homepage from "@/pages/homepage";
import Assessment from "@/pages/assessment";
import AITraining from "@/pages/ai-training";
import BusinessProfile from "@/pages/business-profile";
import AIWebsites from "@/pages/ai-websites";
import AITools from "@/pages/ai-tools";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Homepage}/>
      <Route path="/assessment" component={Assessment}/>
      <Route path="/ai-training" component={AITraining}/>
      <Route path="/business-profile" component={BusinessProfile}/>
      <Route path="/ai-websites" component={AIWebsites}/>
      <Route path="/ai-tools" component={AITools}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
