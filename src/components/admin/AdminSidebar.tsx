import { useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  BarChart3, 
  Cpu,
  ChevronLeft,
  Gamepad2,
  LogOut,
  Trophy,
  Rocket,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { mockRounds } from "@/data/hackathonData";
import { useTeamContext } from "@/context/TeamContext";
import { useAuth } from "@/context/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

const mainNavItems = [
  { title: "Overview", url: "/admin", icon: LayoutDashboard },
  { title: "Inauguration", url: "/admin/inauguration", icon: Rocket },
  { title: "Teams", url: "/admin/teams", icon: Users },
  { title: "Round Control", url: "/admin/rounds", icon: Clock },
  { title: "Evaluation", url: "/admin/evaluation", icon: Trophy },
  { title: "Reports", url: "/admin/reports", icon: BarChart3 },
  { title: "Fun Games", url: "/admin/games", icon: Gamepad2 },
];

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { teams } = useTeamContext();
  const { logout } = useAuth();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
            <Cpu className="h-4 w-4 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-pixel text-[10px] text-primary neon-glow">ChipCraft</span>
              <span className="text-xs text-sidebar-foreground/70 font-mono">Admin Panel</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-pixel text-[8px]">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <NavLink to={item.url} end={item.url === "/admin"}>
                      <item.icon className="h-4 w-4" />
                      <span className="font-mono">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="font-pixel text-[8px]">Quick Stats</SidebarGroupLabel>
          <SidebarGroupContent>
        {!isCollapsed && (() => {
              const activeRound = mockRounds.find((r) => r.status === "active") ?? mockRounds[0];
              return (
                <div className="space-y-2 px-2">
                  <div className="flex items-center justify-between rounded-md bg-sidebar-accent p-2 text-xs font-mono">
                    <span className="text-sidebar-foreground/70">Teams</span>
                    <span className="font-semibold text-secondary">{teams.length}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-md bg-primary/10 p-2 text-xs font-mono">
                    <span className="text-sidebar-foreground/70">Active Round</span>
                    <span className="font-semibold text-primary">{activeRound?.number ?? "—"}</span>
                  </div>
                </div>
              );
            })()}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Back to Portal">
              <NavLink to="/">
                <ChevronLeft className="h-4 w-4" />
                <span className="font-mono">Back to Portal</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              onClick={() => {
                logout();
                navigate("/admin/login", { replace: true });
              }}
            >
              <LogOut className="h-4 w-4" />
              <span className="font-mono">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
