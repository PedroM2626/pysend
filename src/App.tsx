import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Upload from "./pages/Upload";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Carregando...</div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const AppContent = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Carregando...</div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/auth" element={user ? <Navigate to="/" replace /> : <Auth />} />
      <Route path="/" element={
        <ProtectedRoute>
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
                  <Index />
                </main>
              </div>
            </div>
          </SidebarProvider>
        </ProtectedRoute>
      } />
      <Route path="/upload" element={
        <ProtectedRoute>
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
                  <Upload />
                </main>
              </div>
            </div>
          </SidebarProvider>
        </ProtectedRoute>
      } />
      <Route path="/reports" element={
        <ProtectedRoute>
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
                  <Reports />
                </main>
              </div>
            </div>
          </SidebarProvider>
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
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
                  <Settings />
                </main>
              </div>
            </div>
          </SidebarProvider>
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
