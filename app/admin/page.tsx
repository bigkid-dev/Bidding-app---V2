import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AdminHeader from "@/components/layout/AdminHeader";
import {
  Users,
  Package,
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Eye,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "52,431",
    change: "+12.5%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Active Auctions",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: Package,
  },
  {
    title: "Revenue (MTD)",
    value: "₦45.2M",
    change: "+23.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Open Disputes",
    value: "47",
    change: "-5.3%",
    trend: "down",
    icon: AlertTriangle,
  },
];

const recentActivity = [
  {
    id: 1,
    type: "new_user",
    message: "New user registration: john.doe@email.com",
    time: "2 minutes ago",
  },
  {
    id: 2,
    type: "auction_ended",
    message: "Auction ended: iPhone 15 Pro Max - ₦875,000",
    time: "15 minutes ago",
  },
  {
    id: 3,
    type: "dispute",
    message: "New dispute raised: DSP-004",
    time: "1 hour ago",
  },
  {
    id: 4,
    type: "withdrawal",
    message: "Withdrawal request: ₦500,000 - Pending approval",
    time: "2 hours ago",
  },
  {
    id: 5,
    type: "new_listing",
    message: "New listing submitted for review: Canon EOS R5",
    time: "3 hours ago",
  },
];

const pendingApprovals = [
  {
    id: 1,
    title: "Canon EOS R5 Camera",
    seller: "mike_photos",
    startingPrice: 1800000,
    submittedAt: "2 hours ago",
  },
  {
    id: 2,
    title: "Vintage Rolex Submariner",
    seller: "luxury_watches_ng",
    startingPrice: 5500000,
    submittedAt: "5 hours ago",
  },
  {
    id: 3,
    title: "2019 Mercedes-Benz GLE",
    seller: "auto_deals_lagos",
    startingPrice: 28000000,
    submittedAt: "1 day ago",
  },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge
                    variant={stat.trend === "up" ? "default" : "secondary"}
                    className={
                      stat.trend === "up"
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive"
                    }
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <div className="p-2 rounded-full bg-primary/10">
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Pending Approvals */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Pending Approvals</h2>
              <Badge variant="destructive">{pendingApprovals.length}</Badge>
            </div>
            <div className="space-y-4">
              {pendingApprovals.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      by {item.seller} • ₦{item.startingPrice.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.submittedAt}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="bg-success hover:bg-success/90"
                    >
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive">
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 mt-8">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/users">
              <Button variant="outline">Manage Users</Button>
            </Link>
            <Link href="/admin/auctions">
              <Button variant="outline">View All Auctions</Button>
            </Link>
            <Link href="/admin/disputes">
              <Button variant="outline">Handle Disputes</Button>
            </Link>
            <Link href="/admin/team">
              <Button variant="outline">Manage Team</Button>
            </Link>
            <Button variant="outline">Generate Reports</Button>
            <Button variant="outline">System Settings</Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
