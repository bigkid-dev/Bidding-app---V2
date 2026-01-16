"use client"
import Link from "next/link";
import { Clock, Users, TrendingUp, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AuctionCardProps {
  id: string;
  title: string;
  image: string;
  currentBid: number;
  startingBid: number;
  bidCount: number;
  endTime: string;
  location: string;
  category: string;
  status: "live" | "upcoming" | "ended";
  isHot?: boolean;
}

const AuctionCard = ({
  id,
  title,
  image,
  currentBid,
  startingBid,
  bidCount,
  endTime,
  location,
  category,
  status,
  isHot,
}: AuctionCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = () => {
    switch (status) {
      case "live":
        return (
          <Badge className="bg-destructive/90 text-destructive-foreground gap-1 animate-pulse">
            <span className="h-2 w-2 rounded-full bg-current live-indicator" />
            LIVE
          </Badge>
        );
      case "upcoming":
        return (
          <Badge className="bg-secondary/90 text-secondary-foreground">
            Upcoming
          </Badge>
        );
      case "ended":
        return (
          <Badge
            variant="outline"
            className="border-muted-foreground/50 text-muted-foreground"
          >
            Ended
          </Badge>
        );
    }
  };

  return (
    <Link href={`/auction/${id}`} className="group block">
      <div className="relative bg-card rounded-xl overflow-hidden shadow-sm card-hover border border-border">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

          {/* Status Badge */}
          <div className="absolute top-3 left-3 flex gap-2">
            {getStatusBadge()}
            {isHot && (
              <Badge className="bg-primary text-primary-foreground gap-1">
                <TrendingUp className="h-3 w-3" />
                Hot
              </Badge>
            )}
          </div>

          {/* Category */}
          <div className="absolute top-3 right-3">
            <Badge
              variant="outline"
              className="bg-background/80 backdrop-blur-sm border-0 text-foreground"
            >
              {category}
            </Badge>
          </div>

          {/* Timer */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-background text-sm font-medium">
              <Clock className="h-4 w-4" />
              <span>{endTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-background text-sm">
              <MapPin className="h-3.5 w-3.5" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Current Bid</p>
              <p className="text-xl font-bold text-primary">
                {formatCurrency(currentBid)}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{bidCount} bids</span>
            </div>
          </div>

          {status === "live" && (
            <Button variant="bid" className="w-full">
              Place Bid
            </Button>
          )}
          {status === "upcoming" && (
            <Button variant="secondary" className="w-full">
              Set Reminder
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default AuctionCard;
