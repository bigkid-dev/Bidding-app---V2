"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-background rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-background rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your Auction Journey?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Whether you're looking to buy unique items at great prices or sell to a wide audience, GObid is your trusted platform.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auctions">
              <Button 
                size="xl" 
                className="bg-background text-foreground hover:bg-background/90 shadow-lg gap-2"
              >
                Browse Auctions
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/list-item">
              <Button 
                size="xl" 
                variant="hero-outline"
                className="gap-2"
              >
                <Plus className="h-5 w-5" />
                List Your Item
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-10 border-t border-primary-foreground/20">
            <div>
              <p className="text-4xl font-bold">50K+</p>
              <p className="text-sm text-primary-foreground/70 mt-1">Active Users</p>
            </div>
            <div>
              <p className="text-4xl font-bold">₦2.5B+</p>
              <p className="text-sm text-primary-foreground/70 mt-1">Total Sales</p>
            </div>
            <div>
              <p className="text-4xl font-bold">99%</p>
              <p className="text-sm text-primary-foreground/70 mt-1">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
