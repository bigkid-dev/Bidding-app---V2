"use client"

import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuctionCard from "@/components/auction/AuctionCard";

const mockAuctions = [
  {
    id: "1",
    title: "iPhone 15 Pro Max 256GB - Natural Titanium",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600",
    currentBid: 850000,
    startingBid: 500000,
    bidCount: 45,
    endTime: "2h 45m",
    location: "Lagos",
    category: "Electronics",
    status: "live" as const,
    isHot: true,
  },
  {
    id: "2",
    title: "Toyota Camry 2020 - XLE Fully Loaded",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600",
    currentBid: 12500000,
    startingBid: 10000000,
    bidCount: 23,
    endTime: "5h 12m",
    location: "Abuja",
    category: "Vehicles",
    status: "live" as const,
    isHot: true,
  },
  {
    id: "3",
    title: "MacBook Pro 16\" M3 Max - 64GB RAM",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
    currentBid: 2100000,
    startingBid: 1800000,
    bidCount: 18,
    endTime: "1h 30m",
    location: "Port Harcourt",
    category: "Computers",
    status: "live" as const,
  },
  {
    id: "4",
    title: "Rolex Submariner Date - 41mm Oystersteel",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600",
    currentBid: 8500000,
    startingBid: 7000000,
    bidCount: 31,
    endTime: "8h 20m",
    location: "Lagos",
    category: "Watches",
    status: "live" as const,
    isHot: true,
  },
  {
    id: "5",
    title: "3 Bedroom Apartment - Lekki Phase 1",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
    currentBid: 85000000,
    startingBid: 75000000,
    bidCount: 8,
    endTime: "2d 5h",
    location: "Lagos",
    category: "Real Estate",
    status: "upcoming" as const,
  },
  {
    id: "6",
    title: "PlayStation 5 + Extra Controller Bundle",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600",
    currentBid: 450000,
    startingBid: 350000,
    bidCount: 56,
    endTime: "45m",
    location: "Ibadan",
    category: "Electronics",
    status: "live" as const,
  },
  {
    id: "7",
    title: "Original Oil Painting - Lagos Sunset",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600",
    currentBid: 750000,
    startingBid: 500000,
    bidCount: 12,
    endTime: "1d 12h",
    location: "Lagos",
    category: "Art",
    status: "upcoming" as const,
  },
  {
    id: "8",
    title: "Gold Chain Necklace - 18K Italian Gold",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600",
    currentBid: 1200000,
    startingBid: 1000000,
    bidCount: 15,
    endTime: "3h 55m",
    location: "Kano",
    category: "Jewelry",
    status: "live" as const,
  },
];

const LiveAuctionsSection = () => {
  const liveAuctions = mockAuctions.filter((a) => a.status === "live");
  const upcomingAuctions = mockAuctions.filter((a) => a.status === "upcoming");
  const hotAuctions = mockAuctions.filter((a) => a.isHot);

  return (
    <section className="py-16">
      <div className="container">
        <Tabs defaultValue="live" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Discover Auctions
              </h2>
              <p className="text-muted-foreground mt-2">
                Find amazing deals on quality items
              </p>
            </div>

            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="live" className="gap-2 data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground">
                <span className="h-2 w-2 rounded-full bg-current animate-pulse" />
                Live Now
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="hot" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Flame className="h-4 w-4" />
                Hottest
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="live" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {liveAuctions.map((auction) => (
                <AuctionCard key={auction.id} {...auction} />
              ))}
            </div>
            <div className="flex justify-center">
              <Link href="/auctions?status=live">
                <Button variant="outline" size="lg" className="gap-2">
                  View All Live Auctions
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingAuctions.map((auction) => (
                <AuctionCard key={auction.id} {...auction} />
              ))}
            </div>
            <div className="flex justify-center">
              <Link href="/auctions?status=upcoming">
                <Button variant="outline" size="lg" className="gap-2">
                  View All Upcoming Auctions
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="hot" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {hotAuctions.map((auction) => (
                <AuctionCard key={auction.id} {...auction} />
              ))}
            </div>
            <div className="flex justify-center">
              <Link href="/auctions?filter=hot">
                <Button variant="outline" size="lg" className="gap-2">
                  View All Hot Auctions
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default LiveAuctionsSection;
