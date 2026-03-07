import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Cpu, Lock, ShieldCheck, ChevronLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContext";

export default function AdminLogin() {
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as { from?: Location })?.from?.pathname ?? "/admin";

  if (isAdmin) {
    // Already logged in, send to dashboard
    navigate("/admin", { replace: true });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const ok = login(username.trim(), password);
    if (!ok) {
      setError("Invalid admin credentials. Try again or contact the organizers.");
      return;
    }
    navigate(from, { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md px-4">
        <Card className="border border-primary/40 bg-card/80 neon-border">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <Cpu className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="font-pixel text-sm text-primary neon-glow">
                CHIPCRAFT ADMIN
              </CardTitle>
              <CardDescription className="mt-1 text-xs font-mono">
                Secure access to the 24-hour hackathon control panel.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4 border-destructive/40 bg-destructive/10">
                <AlertTitle className="flex items-center gap-2 font-pixel text-[10px] text-destructive">
                  <Lock className="h-3 w-3" />
                  ACCESS DENIED
                </AlertTitle>
                <AlertDescription className="text-xs font-mono text-destructive/90">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="username" className="font-pixel text-[9px] text-muted-foreground">
                  ADMIN USERNAME
                </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  className="font-mono"
                  placeholder="admin"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password" className="font-pixel text-[9px] text-muted-foreground">
                  PASSWORD
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="font-mono"
                  placeholder="••••••••"
                />
              </div>
              <Button type="submit" className="mt-2 w-full gap-2 font-mono">
                <ShieldCheck className="h-4 w-4" />
                Enter Admin Panel
              </Button>
              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-card px-2 text-[10px] text-muted-foreground font-mono">OR</span>
                </div>
              </div>
              <Button type="button" variant="outline" className="w-full gap-2 font-mono" asChild>
                <Link to="/">
                  <ChevronLeft className="h-4 w-4" />
                  Back to Portal
                </Link>
              </Button>
              <p className="mt-2 text-center text-[11px] text-muted-foreground font-mono">
                This login is for organizers only. Participants can view rounds and problems from the
                public portal.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

