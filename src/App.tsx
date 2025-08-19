import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import Index from "./pages/Index";
import Upload from "./pages/Upload";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-gradient-subtle">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-14 flex items-center border-b border-border/50 bg-background/80 backdrop-blur-sm px-4">
                <SidebarTrigger className="mr-4" />
                <div className="flex-1">
                  <h1 className="text-lg font-semibold text-foreground">Pysend - Automação de Relatórios</h1>
                </div>
              </header>
              <main className="flex-1 p-6">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
