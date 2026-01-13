"use client"

import { UserPlus, Search, Gavel, Shield, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up in seconds and verify your identity for secure bidding.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Search,
    title: "Find Items",
    description: "Browse thousands of items across multiple categories.",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    icon: Gavel,
    title: "Place Bids",
    description: "Bid in real-time on items you love. Outbid others to win!",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "Pay through our escrow system for guaranteed protection.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: CheckCircle,
    title: "Receive Item",
    description: "Get your item delivered safely. Release payment when satisfied.",
    color: "bg-green-500/10 text-green-600",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            How GObid Works
          </h2>
          <p className="text-muted-foreground mt-3">
            Our simple 5-step process ensures safe, secure transactions for buyers and sellers
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-20" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="relative text-center group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Step Number */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center z-10">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`h-20 w-20 mx-auto rounded-2xl ${step.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                    <Icon className="h-10 w-10" />
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
