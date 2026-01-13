"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuctionCard from "@/components/auction/AuctionCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, Grid3X3, List } from "lucide-react";

const allAuctions = [
  {
    id: "1",
    title: "iPhone 15 Pro Max 256GB",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    currentBid: 850000,
    startingBid: 500000,
    bidCount: 23,
    endTime: "2h 15m left",
    location: "Lagos",
    category: "Electronics",
    status: "live" as const,
  },
  {
    id: "2",
    title: "Toyota Camry 2020 Model",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400",
    currentBid: 12500000,
    startingBid: 10000000,
    bidCount: 45,
    endTime: "5h 30m left",
    location: "Abuja",
    category: "Vehicles",
    status: "live" as const,
  },
  {
    id: "3",
    title: "MacBook Pro M3 14-inch",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    currentBid: 1200000,
    startingBid: 900000,
    bidCount: 18,
    endTime: "Starts in 1d",
    location: "Port Harcourt",
    category: "Electronics",
    status: "upcoming" as const,
  },
  {
    id: "4",
    title: "3 Bedroom Apartment",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
    currentBid: 45000000,
    startingBid: 40000000,
    bidCount: 12,
    endTime: "Starts in 3d",
    location: "Lagos",
    category: "Real Estate",
    status: "upcoming" as const,
  },
  {
    id: "5",
    title: "Antique Gold Necklace",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
    currentBid: 350000,
    startingBid: 200000,
    bidCount: 31,
    endTime: "1h 5m left",
    location: "Kano",
    category: "Fashion",
    status: "live" as const,
  },
  {
    id: "6",
    title: 'Samsung 65" QLED Smart TV',
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
    currentBid: 580000,
    startingBid: 400000,
    bidCount: 15,
    endTime: "8h 20m left",
    location: "Ibadan",
    category: "Electronics",
    status: "live" as const,
  },
];

const categories = [
  "All Categories",
  "Electronics",
  "Vehicles",
  "Real Estate",
  "Fashion",
  "Art & Collectibles",
  "Home & Garden",
];

const Auctions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("ending-soon");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredAuctions = allAuctions.filter((auction) => {
    const matchesSearch = auction.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      auction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Browse Auctions
        </h1>
        <p className="text-muted-foreground">
          Discover amazing deals from verified sellers across Nigeria
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-card rounded-xl p-4 mb-8 border border-border">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search auctions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full lg:w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort By */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ending-soon">Ending Soon</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="most-bids">Most Bids</SelectItem>
            </SelectContent>
          </Select>

          {/* View Toggle */}
          <div className="flex gap-1 border border-border rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="secondary" className="gap-1">
            {filteredAuctions.length} auctions found
          </Badge>
          {selectedCategory !== "All Categories" && (
            <Badge variant="outline" className="gap-1">
              {selectedCategory}
              <button
                onClick={() => setSelectedCategory("All Categories")}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      </div>

      {/* Auctions Grid */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "flex flex-col gap-4"
        }
      >
        {filteredAuctions.map((auction) => (
          <AuctionCard key={auction.id} {...auction} />
        ))}
      </div>

      {/* Empty State */}
      {filteredAuctions.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            No auctions found matching your criteria
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All Categories");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </main>
  );
};

export default Auctions;
