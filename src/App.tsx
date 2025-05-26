
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { SavedCaseStudiesProvider } from "@/context/SavedCaseStudiesContext";
import Index from "./pages/Index";
import { ThemeProvider } from "@/components/ThemeProvider";

// Lazy load pages
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const Companies = lazy(() => import("./pages/Companies"));
const CompanyDetail = lazy(() => import("./pages/CompanyDetail"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Join = lazy(() => import("./pages/Join"));
const Submit = lazy(() => import("./pages/Submit"));
const SavedCaseStudies = lazy(() => import("./pages/SavedCaseStudies"));
const Newsletter = lazy(() => import("./pages/Newsletter"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const NarrativeRadar = lazy(() => import("./pages/NarrativeRadar"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <SavedCaseStudiesProvider>
              <TooltipProvider>
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/case-studies" element={<CaseStudies />} />
                    <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
                    <Route path="/companies" element={<Companies />} />
                    <Route path="/companies/:slug" element={<CompanyDetail />} />
                    <Route path="/narrative-radar" element={<NarrativeRadar />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/join" element={<Join />} />
                    <Route path="/submit" element={<Submit />} />
                    <Route path="/saved" element={<SavedCaseStudies />} />
                    <Route path="/newsletter" element={<Newsletter />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </SavedCaseStudiesProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
