import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, RequireAdmin } from "@/context/AuthContext";
import { FunZoneProvider } from "@/context/FunZoneContext";
import { TeamProvider } from "@/context/TeamContext";
import { MarksProvider } from "@/context/MarksContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import DashboardOverview from "./pages/admin/DashboardOverview";
import MyAssignments from "./pages/admin/MyAssignments";
import Escalations from "./pages/admin/Escalations";
import Reports from "./pages/admin/Reports";
import Games from "./pages/admin/Games";
import AdminLogin from "./pages/admin/AdminLogin";
import GamesPage from "./pages/GamesPage";
import Evaluation from "./pages/admin/Evaluation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <TeamProvider>
            <MarksProvider>
              <FunZoneProvider>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/games" element={<GamesPage />} />
                  <Route path="/admin/login" element={<AdminLogin />} />

                  {/* Admin Dashboard Routes (protected) */}
                  <Route
                    path="/admin"
                    element={
                      <RequireAdmin>
                        <AdminLayout />
                      </RequireAdmin>
                    }
                  >
                    <Route index element={<DashboardOverview />} />
                    <Route path="teams" element={<MyAssignments />} />
                    <Route path="rounds" element={<Escalations />} />
                    <Route path="evaluation" element={<Evaluation />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="games" element={<Games />} />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </FunZoneProvider>
            </MarksProvider>
          </TeamProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

