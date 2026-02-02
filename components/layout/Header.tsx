"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Gavel, Menu, X, Plus, Search, User, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationsDropdown from "@/components/notifications/NotificationsDropdown";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Live Auctions", href: "/auctions" },
    { name: "Categories", href: "/categories" },
    { name: "My Bids", href: "/my-bids" },
    { name: "Support", href: "/support" },
  ];

  const isActive = (href: string) => pathname === href.split("?")[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md group-hover:shadow-glow-primary transition-all duration-300">
            <Gavel className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">
            GO<span className="text-primary">bid</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Search className="h-5 w-5" />
          </Button>
          <NotificationsDropdown />

          <Link href="/list-item">
            <Button variant="secondary" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              List Item
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/profile">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/my-bids">My Bids</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/my-listings">My Listings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/wallet">Wallet</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dispute">My Disputes</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin">Admin Panel</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/auth" className="text-primary font-medium">
                  Sign In / Sign Up
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background animate-slide-up">
          <nav className="container py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border space-y-2">
              <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  My Profile
                </Button>
              </Link>
              <Link
                href="/list-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button variant="secondary" className="w-full gap-2">
                  <Plus className="h-4 w-4" />
                  List Item
                </Button>
              </Link>
              <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Sign In / Sign Up
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
