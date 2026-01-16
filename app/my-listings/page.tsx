"use client"

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Clock, Eye, Edit, Trash2, Plus, Users } from "lucide-react";

const myListings = [
  {
    id: "5",
    title: "PlayStation 5 Console",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400",
    startingPrice: 450000,
    currentBid: 520000,
    bidCount: 12,
    status: "active",
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    views: 234,
  },
  {
    id: "6",
    title: "Vintage Rolex Watch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    startingPrice: 2500000,
    currentBid: 2800000,
    bidCount: 8,
    status: "active",
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    views: 156,
  },
  {
    id: "7",
    title: "Canon EOS R5 Camera",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
    startingPrice: 1800000,
    currentBid: 0,
    bidCount: 0,
    status: "pending",
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    views: 0,
  },
  {
    id: "8",
    title: "Herman Miller Chair",
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400",
    startingPrice: 350000,
    currentBid: 420000,
    bidCount: 15,
    status: "sold",
    endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    views: 312,
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
    case "active":
      return (
        <Badge className="bg-success/10 text-success border-success/20">
          Live
        </Badge>
      );
    case "pending":
      return <Badge variant="secondary">Pending Approval</Badge>;
    case "sold":
      return (
        <Badge className="bg-primary/10 text-primary border-primary/20">
          Sold
        </Badge>
      );
    case "expired":
      return <Badge variant="destructive">Expired</Badge>;
    default:
      return null;
  }
};

const MyListings = () => {
  const activeListings = myListings.filter(
    (listing) => listing.status === "active" || listing.status === "pending"
  );
  const completedListings = myListings.filter(
    (listing) => listing.status === "sold" || listing.status === "expired"
  );

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My Listings
          </h1>
          <p className="text-muted-foreground">
            Manage all your auction listings
          </p>
        </div>
        <Link href="/list-item">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            List New Item
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-primary">{myListings.length}</p>
          <p className="text-sm text-muted-foreground">Total Listings</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-success">
            {activeListings.length}
          </p>
          <p className="text-sm text-muted-foreground">Active</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-primary">
            {myListings.filter((l) => l.status === "sold").length}
          </p>
          <p className="text-sm text-muted-foreground">Sold</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-foreground">
            {formatCurrency(
              myListings
                .filter((l) => l.status === "sold")
                .reduce((acc, l) => acc + l.currentBid, 0)
            )}
          </p>
          <p className="text-sm text-muted-foreground">Total Earnings</p>
        </Card>
      </div>

      {/* Listings Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">
            Active ({activeListings.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedListings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeListings.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-4">
                You don't have any active listings
              </p>
              <Link href="/list-item">
                <Button>List Your First Item</Button>
              </Link>
            </Card>
          ) : (
            activeListings.map((listing) => (
              <Card key={listing.id} className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full md:w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {listing.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          {getStatusBadge(listing.status)}
                          {listing.status === "active" && (
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />3 days left
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Starting Price
                        </p>
                        <p className="font-semibold">
                          {formatCurrency(listing.startingPrice)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Current Bid
                        </p>
                        <p className="font-semibold text-primary">
                          {listing.currentBid > 0
                            ? formatCurrency(listing.currentBid)
                            : "No bids yet"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Bids</p>
                        <p className="font-semibold flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {listing.bidCount}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Views</p>
                        <p className="font-semibold flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {listing.views}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedListings.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No completed listings yet</p>
            </Card>
          ) : (
            completedListings.map((listing) => (
              <Card key={listing.id} className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full md:w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {listing.title}
                        </h3>
                        <div className="mt-2">
                          {getStatusBadge(listing.status)}
                        </div>
                      </div>
                      <Link href={`/auction/${listing.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Final Price
                        </p>
                        <p className="font-semibold text-primary">
                          {formatCurrency(listing.currentBid)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Total Bids
                        </p>
                        <p className="font-semibold">{listing.bidCount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Total Views
                        </p>
                        <p className="font-semibold">{listing.views}</p>
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

export default MyListings;
