"use client"

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Gavel, 
  AlertTriangle, 
  UsersRound,
  ExternalLink
} from "lucide-react";
import { usePathname } from "next/navigation";

const AdminHeader = () => {
  const location = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Auctions", href: "/admin/auctions", icon: Gavel },
    { name: "Disputes", href: "/admin/disputes", icon: AlertTriangle },
    { name: "Team", href: "/admin/team", icon: UsersRound },
  ];

  const isActive = (href: string) => location === href;

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-2xl font-bold text-primary">
            GO<span className="text-success">bid</span>
          </Link>
          <Badge variant="secondary">Admin</Badge>
        </div>
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/auctions">
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              View Site
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
