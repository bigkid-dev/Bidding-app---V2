"use client"

import { Shield, Lock, HeadphonesIcon, Banknote, Award, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Escrow Protection",
    description: "Your payment is held securely until you confirm receipt of your item.",
  },
  {
    icon: Lock,
    title: "Verified Sellers",
    description: "All sellers undergo verification to ensure authenticity and reliability.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Our dedicated team is always available to help resolve any issues.",
  },
  {
    icon: Banknote,
    title: "Money Back Guarantee",
    description: "If something goes wrong, our dispute resolution ensures you're protected.",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Items are checked for authenticity before being listed on our platform.",
  },
  {
    icon: Users,
    title: "Active Community",
    description: "Join thousands of satisfied buyers and sellers across Nigeria.",
  },
];

const TrustSection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Why Trust GObid?
          </h2>
          <p className="text-muted-foreground mt-3">
            We've built our platform with security and trust at its core
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
