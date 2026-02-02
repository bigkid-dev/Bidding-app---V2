"use client"

import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import LiveAuctionsSection from "@/components/home/LiveAuctionsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import TrustSection from "@/components/home/TrustSection";
import CTASection from "@/components/home/CTASection";
import { WishlistProvider } from "@/contexts/WishlistContext";

const Home = () => {
  return (
      <>
        <HeroSection />
        <CategorySection />
        <LiveAuctionsSection />
        <HowItWorksSection />
        <TrustSection />
        <CTASection />
      
    </>
  );
};

export default Home;
