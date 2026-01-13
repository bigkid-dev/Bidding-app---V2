"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Clock, TrendingUp, Trophy, XCircle, Eye } from "lucide-react";

const myBids = [
  {
    id: "1",
    title: "iPhone 15 Pro Max 256GB",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    myBid: 850000,
    currentBid: 875000,
    status: "outbid",
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    title: "MacBook Pro M3 14-inch",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    myBid: 1200000,
    currentBid: 1200000,
    status: "winning",
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
  },
  {
    id: "3",
    title: "Antique Gold Necklace",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
    myBid: 350000,
    currentBid: 350000,
    status: "won",
    endTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    title: 'Samsung 65" QLED Smart TV',
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
    myBid: 520000,
    currentBid: 580000,
    status: "lost",
    endTime: new Date(Date.now() - 48 * 60 * 60 * 1000),
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "winning":
      return (
        <Badge className="bg-success/10 text-success border-success/20">
          <TrendingUp className="h-3 w-3 mr-1" />
          Winning
        </Badge>
      );
    case "outbid":
      return (
        <Badge variant="destructive">
          <XCircle className="h-3 w-3 mr-1" />
          Outbid
        </Badge>
      );
    case "won":
      return (
        <Badge className="bg-primary/10 text-primary border-primary/20">
          <Trophy className="h-3 w-3 mr-1" />
          Won
        </Badge>
      );
    case "lost":
      return <Badge variant="secondary">Lost</Badge>;
    default:
      return null;
  }
};

const MyBids = () => {
  const activeBids = myBids.filter(
    (bid) => bid.status === "winning" || bid.status === "outbid"
  );
  const completedBids = myBids.filter(
    (bid) => bid.status === "won" || bid.status === "lost"
  );

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Bids</h1>
        <p className="text-muted-foreground">
          Track all your active and past bids in one place
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-primary">{myBids.length}</p>
          <p className="text-sm text-muted-foreground">Total Bids</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-success">{activeBids.length}</p>
          <p className="text-sm text-muted-foreground">Active Bids</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-primary">
            {myBids.filter((b) => b.status === "won").length}
          </p>
          <p className="text-sm text-muted-foreground">Auctions Won</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-foreground">
            {formatCurrency(myBids.reduce((acc, bid) => acc + bid.myBid, 0))}
          </p>
          <p className="text-sm text-muted-foreground">Total Bid Value</p>
        </Card>
      </div>

      {/* Bids Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active ({activeBids.length})</TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedBids.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeBids.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-4">
                You don't have any active bids
              </p>
              <Link href="/auctions">
                <Button>Browse Auctions</Button>
              </Link>
            </Card>
          ) : (
            activeBids.map((bid) => (
              <Card key={bid.id} className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <img
                    src={bid.image}
                    alt={bid.title}
                    className="w-full md:w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {bid.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          {getStatusBadge(bid.status)}
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Ends in 2h 30m
                          </span>
                        </div>
                      </div>
                      <Link href={`/auction/${bid.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Your Bid
                        </p>
                        <p className="font-semibold">
                          {formatCurrency(bid.myBid)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Current Bid
                        </p>
                        <p className="font-semibold text-primary">
                          {formatCurrency(bid.currentBid)}
                        </p>
                      </div>
                    </div>
                    {bid.status === "outbid" && (
                      <Link href={`/auction/${bid.id}`}>
                        <Button className="mt-4" size="sm">
                          Increase Bid
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedBids.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No completed bids yet</p>
            </Card>
          ) : (
            completedBids.map((bid) => (
              <Card key={bid.id} className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <img
                    src={bid.image}
                    alt={bid.title}
                    className="w-full md:w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {bid.title}
                        </h3>
                        <div className="mt-2">{getStatusBadge(bid.status)}</div>
                      </div>
                      <Link href={`/auction/${bid.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Your Bid
                        </p>
                        <p className="font-semibold">
                          {formatCurrency(bid.myBid)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Final Price
                        </p>
                        <p className="font-semibold">
                          {formatCurrency(bid.currentBid)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default MyBids;
