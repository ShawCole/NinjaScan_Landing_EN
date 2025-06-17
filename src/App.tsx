import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import './i18n';

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider
    defaultTheme="system"
    storageKey="theme"
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <LanguageSwitcher />
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
