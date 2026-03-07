import { BarChart3, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockProblemStatements, mockTeams } from "@/data/hackathonData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Reports() {
  const difficultyData = [
    { name: "Easy", value: mockProblemStatements.filter((p) => p.difficulty === "Easy").length, color: "hsl(120, 100%, 50%)" },
    { name: "Medium", value: mockProblemStatements.filter((p) => p.difficulty === "Medium").length, color: "hsl(45, 100%, 55%)" },
    { name: "Hard", value: mockProblemStatements.filter((p) => p.difficulty === "Hard").length, color: "hsl(0, 100%, 55%)" },
  ];

  const componentData = [
    { name: "Arduino Uno", count: 4 },
    { name: "Arduino Nano", count: 2 },
    { name: "Arduino Mega", count: 1 },
    { name: "Sensors", count: 6 },
    { name: "Displays", count: 5 },
    { name: "Motors", count: 3 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-pixel text-sm text-warning">REPORTS</h1>
        <p className="text-muted-foreground font-mono">Hackathon analytics and insights</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-mono">Total Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-pixel">{mockTeams.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-mono">Problems Assigned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-pixel">{mockProblemStatements.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-mono">Hard Problems</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-pixel text-destructive">
              {mockProblemStatements.filter((p) => p.difficulty === "Hard").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-mono">Avg Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-pixel">5</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-mono">
              <BarChart3 className="h-5 w-5" />
              Components Usage
            </CardTitle>
            <CardDescription className="font-mono">Most used components across problems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={componentData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" tick={{ fontSize: 10 }} />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" name="Count" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-mono">Difficulty Distribution</CardTitle>
            <CardDescription className="font-mono">Problem difficulty breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={difficultyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {difficultyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
