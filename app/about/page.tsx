"use client"

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Users,
  Award,
  TrendingUp,
  Heart,
  Globe,
  Target,
  Zap,
} from "lucide-react";

const stats = [
  { value: "50,000+", label: "Active Users" },
  { value: "₦5B+", label: "Transaction Volume" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
];

const values = [
  {
    icon: Shield,
    title: "Trust & Security",
    description:
      "Every transaction is protected by our escrow system, ensuring safe and secure trades for all users.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "We're building a vibrant community of buyers and sellers who share a passion for great deals.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We strive for excellence in everything we do, from user experience to customer support.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description:
      "We operate with transparency and honesty, building long-term relationships with our users.",
  },
];

const team = [
  {
    name: "Chinedu Okafor",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
  },
  {
    name: "Amara Eze",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300",
  },
  {
    name: "Oluwaseun Adeyemi",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300",
  },
  {
    name: "Fatima Ibrahim",
    role: "Head of Customer Success",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300",
  },
];

const About = () => {
  return (
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4">About GObid</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Nigeria's Most Trusted
              <br />
              <span className="text-primary">Auction Platform</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to revolutionize how Nigerians buy and sell
              through transparent, secure, and exciting online auctions.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4">Our Story</Badge>
                <h2 className="text-3xl font-bold mb-6">
                  From Idea to Nigeria's Leading Auction Platform
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    GObid was founded in 2023 with a simple vision: to create a
                    safe, transparent, and exciting marketplace where Nigerians
                    can discover amazing deals through the thrill of auctions.
                  </p>
                  <p>
                    We noticed that traditional marketplaces lacked the
                    excitement and competitive pricing that auctions offer.
                    Combined with trust issues around online transactions, we
                    saw an opportunity to build something better.
                  </p>
                  <p>
                    Today, GObid is trusted by over 50,000 users who have
                    collectively transacted over ₦5 billion through our
                    platform. Our escrow-protected system has prevented
                    countless potential fraud cases, making online shopping
                    safer for everyone.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600"
                  alt="GObid team"
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg">
                  <p className="text-3xl font-bold">2023</p>
                  <p className="text-sm">Founded</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4">Our Values</Badge>
              <h2 className="text-3xl font-bold">What We Stand For</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <Card key={value.title} className="p-6 text-center">
                    <div className="p-3 rounded-xl bg-primary/10 w-fit mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4">Our Team</Badge>
              <h2 className="text-3xl font-bold">Meet the People Behind GObid</h2>
              <p className="text-muted-foreground mt-2">
                A passionate team dedicated to transforming e-commerce in
                Nigeria
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <Card key={member.name} className="p-6 text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-6 w-6" />
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                </div>
                <p className="text-primary-foreground/80">
                  To democratize access to quality products at competitive
                  prices through secure, transparent, and engaging online
                  auctions, while empowering Nigerian entrepreneurs to reach
                  customers nationwide.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-6 w-6" />
                  <h2 className="text-2xl font-bold">Our Vision</h2>
                </div>
                <p className="text-primary-foreground/80">
                  To become Africa's most trusted and exciting online auction
                  marketplace, setting the standard for secure e-commerce and
                  creating economic opportunities for millions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
};

export default About;
