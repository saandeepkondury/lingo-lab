
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Join from "./pages/Join";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import CompanyDetail from "./pages/CompanyDetail";
import Submit from "./pages/Submit";
import Newsletter from "./pages/Newsletter";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import MobileSidebar from "./pages/MobileSidebar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="lingolab-theme">
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/join" element={<Join />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
              <Route path="/companies/:slug" element={<CompanyDetail />} />
              <Route path="/companies" element={<Navigate to="/case-studies" replace />} />
              <Route path="/search" element={<Navigate to="/case-studies" replace />} />
              <Route path="/submit" element={<Submit />} />
              <Route path="/newsletter" element={<Newsletter />} />
              <Route path="/pricing" element={<Navigate to="/join" replace />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/mobile-sidebar" element={<MobileSidebar />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
