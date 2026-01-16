"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  Users,
  MapPin,
  Shield,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { useWishlist } from "@/contexts/WishlistContext";
import { shareItem } from "@/lib/share";

const auctionData = {
  id: "1",
  title: "iPhone 15 Pro Max 256GB - Natural Titanium",
  description: `Brand new, factory sealed iPhone 15 Pro Max in Natural Titanium. 
  
This device features:
• 6.7-inch Super Retina XDR display
• A17 Pro chip with 6-core GPU
• Pro camera system with 48MP main camera
• Titanium design with Action button
• USB-C with USB 3 speeds

Original box, all accessories included. Nigeria warranty applicable.`,
  images: [
    "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800",
    "https://images.unsplash.com/photo-1696426051820-90ffc6bbdbc6?w=800",
    "https://images.unsplash.com/photo-1697900794267-f0e98dd8e1af?w=800",
  ],
  currentBid: 850000,
  startingBid: 500000,
  minBidIncrement: 10000,
  bidCount: 45,
  watchers: 128,
  endTime: "2024-12-15T14:00:00",
  location: "Lagos, Nigeria",
  category: "Electronics",
  seller: {
    name: "TechHub Nigeria",
    rating: 4.9,
    sales: 234,
    verified: true,
  },
  bidHistory: [
    { bidder: "John D.", amount: 850000, time: "2 min ago" },
    { bidder: "Sarah M.", amount: 840000, time: "5 min ago" },
    { bidder: "Ahmed K.", amount: 820000, time: "12 min ago" },
    { bidder: "Grace O.", amount: 800000, time: "25 min ago" },
    { bidder: "David A.", amount: 780000, time: "1 hour ago" },
  ],
};

const AuctionDetail = () => {
  // const { id } = useSearchParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bidAmount, setBidAmount] = useState(
    auctionData.currentBid + auctionData.minBidIncrement
  );
  const { isInWishlist, toggleWishlist } = useWishlist();

  const wishlistItem = {
    id: auctionData.id,
    title: auctionData.title,
    image: auctionData.images[0],
    currentBid: auctionData.currentBid,
  };

  const inWishlist = isInWishlist(auctionData.id);

  const handleShare = () => {
    shareItem({
      title: auctionData.title,
      text: `Check out this auction: ${
        auctionData.title
      } - Current bid: ₦${auctionData.currentBid.toLocaleString()}`,
      url: `/auction/${auctionData.id}`,
    });
  };

  const handleWatchItem = () => {
    toggleWishlist(wishlistItem);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handlePlaceBid = () => {
    if (bidAmount < auctionData.currentBid + auctionData.minBidIncrement) {
      toast.error(
        `Minimum bid must be ${formatCurrency(
          auctionData.currentBid + auctionData.minBidIncrement
        )}`
      );
      return;
    }
    toast.success("Bid placed successfully! You are now the highest bidder.");
  };

  const getTimeRemaining = () => {
    const end = new Date(auctionData.endTime).getTime();
    const now = Date.now();
    const diff = end - now;

    if (diff <= 0) return "Ended";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <main className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <Link href="/auctions" className="hover:text-primary">
          Auctions
        </Link>
        <span>/</span>
        <span className="text-foreground">{auctionData.title}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
            <img
              src={auctionData.images[currentImageIndex]}
              alt={auctionData.title}
              className="w-full h-full object-cover"
            />

            {/* Navigation Arrows */}
            <button
              onClick={() =>
                setCurrentImageIndex((i) =>
                  i === 0 ? auctionData.images.length - 1 : i - 1
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() =>
                setCurrentImageIndex((i) =>
                  i === auctionData.images.length - 1 ? 0 : i + 1
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Live Badge */}
            <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground gap-1">
              <span className="h-2 w-2 rounded-full bg-current animate-pulse" />
              LIVE
            </Badge>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {auctionData.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  index === currentImageIndex
                    ? "border-primary"
                    : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Auction Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{auctionData.category}</Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {auctionData.location}
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {auctionData.title}
            </h1>
          </div>

          {/* Timer and Stats */}
          <div className="flex items-center gap-6 p-4 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-2 text-destructive">
              <Clock className="h-5 w-5" />
              <div>
                <p className="text-xs text-muted-foreground">Ends in</p>
                <p className="font-bold text-lg">{getTimeRemaining()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Bids</p>
                <p className="font-semibold">{auctionData.bidCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Watching</p>
                <p className="font-semibold">{auctionData.watchers}</p>
              </div>
            </div>
          </div>

          {/* Current Bid */}
          <div className="p-6 bg-card border border-border rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Bid</p>
                <p className="text-3xl font-bold text-primary">
                  {formatCurrency(auctionData.currentBid)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Starting Bid</p>
                <p className="text-lg text-muted-foreground line-through">
                  {formatCurrency(auctionData.startingBid)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
              <AlertCircle className="h-4 w-4 text-accent-foreground" />
              <p className="text-sm text-accent-foreground">
                Minimum increment: {formatCurrency(auctionData.minBidIncrement)}
              </p>
            </div>

            {/* Bid Input */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    ₦
                  </span>
                  <Input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    className="pl-8 h-12 text-lg"
                  />
                </div>
                <Button variant="bid" size="lg" onClick={handlePlaceBid}>
                  Place Bid
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                By bidding, you agree to our{" "}
                <Link href="/terms" className="text-primary underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/escrow-terms" className="text-primary underline">
                  Escrow Policy
                </Link>
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3">
            <Button
              variant={inWishlist ? "default" : "outline"}
              className="flex-1 gap-2"
              onClick={handleWatchItem}
            >
              <Heart
                className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`}
              />
              {inWishlist ? "Watching" : "Watch Item"}
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          {/* Seller Info */}
          <div className="p-4 bg-card border border-border rounded-xl">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{auctionData.seller.name}</p>
                  {auctionData.seller.verified && (
                    <CheckCircle className="h-4 w-4 text-secondary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  ⭐ {auctionData.seller.rating} • {auctionData.seller.sales}{" "}
                  sales
                </p>
              </div>
              <Button variant="outline" size="sm">
                View Profile
              </Button>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center gap-2 p-3 bg-secondary/10 rounded-lg">
            <Shield className="h-5 w-5 text-secondary" />
            <p className="text-sm text-secondary">
              This transaction is protected by GObid Escrow
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="description" className="mt-12">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="bids">Bid History</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-foreground bg-transparent p-0">
              {auctionData.description}
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="bids" className="mt-6">
          <div className="space-y-3">
            {auctionData.bidHistory.map((bid, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  index === 0
                    ? "bg-primary/10 border border-primary/20"
                    : "bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{bid.bidder}</p>
                    <p className="text-sm text-muted-foreground">{bid.time}</p>
                  </div>
                  {index === 0 && (
                    <Badge className="bg-primary text-primary-foreground gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Highest
                    </Badge>
                  )}
                </div>
                <p className="font-bold text-lg">
                  {formatCurrency(bid.amount)}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shipping" className="mt-6">
          <div className="bg-muted/50 p-6 rounded-xl">
            <h3 className="font-semibold mb-4">Shipping Information</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Free shipping within Lagos</li>
              <li>• ₦3,000 - ₦5,000 for other states</li>
              <li>• Estimated delivery: 2-5 business days</li>
              <li>• Tracking provided for all shipments</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default AuctionDetail;
