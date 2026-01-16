"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-foreground via-foreground to-foreground/90 text-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container relative py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary border border-primary/30">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">
                Nigeria's #1 Auction Platform
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Bid, Win & Sell with{" "}
              <span className="text-primary">Confidence</span>
            </h1>

            <p className="text-lg text-background/70 max-w-lg">
              Join thousands of Nigerians buying and selling through our secure
              escrow-protected auction platform. Real-time bidding, verified
              sellers, guaranteed transactions.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/auctions">
                <Button variant="hero" size="xl" className="gap-2">
                  Start Bidding
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/list-item">
                <Button variant="hero-outline" size="xl">
                  List an Item
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold">Escrow Protected</p>
                  <p className="text-sm text-background/60">Secure payments</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">50K+ Users</p>
                  <p className="text-sm text-background/60">Active bidders</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image / Stats */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 bg-card/10 backdrop-blur-sm rounded-3xl p-8 border border-background/10">
              {/* Live Auction Preview */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-destructive animate-pulse" />
                    <span className="text-sm font-medium">Live Now</span>
                  </div>
                  <span className="text-sm text-background/60">
                    Ends in 02:45:30
                  </span>
                </div>

                <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
                    alt="Featured Auction"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Apple Watch Series 9 - Brand New
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-background/60">Current Bid</p>
                      <p className="text-2xl font-bold text-primary">
                        ₦285,000
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-background/60">Bids</p>
                      <p className="text-lg font-semibold">24</p>
                    </div>
                  </div>
                </div>

                <Button variant="hero" className="w-full">
                  Place Bid Now
                </Button>
              </div>
            </div>

            {/* Floating Stats */}
            <div
              className="absolute -left-8 top-1/4 bg-card text-card-foreground rounded-2xl p-4 shadow-lg animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <p className="text-2xl font-bold text-primary">₦2.5B+</p>
              <p className="text-sm text-muted-foreground">Total Sales</p>
            </div>

            <div
              className="absolute -right-4 bottom-1/4 bg-card text-card-foreground rounded-2xl p-4 shadow-lg animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <p className="text-2xl font-bold text-secondary">15K+</p>
              <p className="text-sm text-muted-foreground">Items Sold</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
