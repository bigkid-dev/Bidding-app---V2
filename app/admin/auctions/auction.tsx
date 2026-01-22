import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminHeader from "@/components/layout/AdminHeader";
import {
  Search,
  MoreHorizontal,
  Eye,
  Ban,
  CheckCircle,
  Trash2,
  Clock,
  TrendingUp,
} from "lucide-react";

const auctions = [
  {
    id: "AUC-001",
    title: "iPhone 15 Pro Max 256GB",
    seller: "TechHub Nigeria",
    category: "Electronics",
    currentBid: 850000,
    bidCount: 23,
    status: "live",
    startDate: "Dec 10, 2024",
    endDate: "Dec 15, 2024",
    featured: true,
  },
  {
    id: "AUC-002",
    title: "Toyota Camry 2020 Model",
    seller: "AutoDeals Lagos",
    category: "Vehicles",
    currentBid: 12500000,
    bidCount: 45,
    status: "live",
    startDate: "Dec 8, 2024",
    endDate: "Dec 18, 2024",
    featured: true,
  },
  {
    id: "AUC-003",
    title: "MacBook Pro M3 14-inch",
    seller: "mike_photos",
    category: "Electronics",
    currentBid: 1200000,
    bidCount: 18,
    status: "pending",
    startDate: "Dec 20, 2024",
    endDate: "Dec 27, 2024",
    featured: false,
  },
  {
    id: "AUC-004",
    title: "3 Bedroom Apartment",
    seller: "LagosEstates",
    category: "Real Estate",
    currentBid: 45000000,
    bidCount: 12,
    status: "upcoming",
    startDate: "Dec 25, 2024",
    endDate: "Jan 5, 2025",
    featured: false,
  },
  {
    id: "AUC-005",
    title: "Antique Gold Necklace",
    seller: "jewelry_palace",
    category: "Fashion",
    currentBid: 350000,
    bidCount: 31,
    status: "ended",
    startDate: "Dec 1, 2024",
    endDate: "Dec 8, 2024",
    featured: false,
  },
  {
    id: "AUC-006",
    title: "Samsung 65\" QLED Smart TV",
    seller: "ElectroMart",
    category: "Electronics",
    currentBid: 580000,
    bidCount: 15,
    status: "live",
    startDate: "Dec 12, 2024",
    endDate: "Dec 19, 2024",
    featured: false,
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

const AdminAuctions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredAuctions = auctions.filter((auction) => {
    const matchesSearch =
      auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      auction.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
      auction.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || auction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return (
          <Badge className="bg-success/10 text-success gap-1">
            <span className="h-2 w-2 rounded-full bg-current animate-pulse" />
            Live
          </Badge>
        );
      case "upcoming":
        return (
          <Badge className="bg-primary/10 text-primary gap-1">
            <Clock className="h-3 w-3" />
            Upcoming
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-warning/10 text-warning">
            Pending Review
          </Badge>
        );
      case "ended":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Ended
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Auction Management
            </h1>
            <p className="text-muted-foreground">
              View and manage all auctions on the platform
            </p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search auctions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-[250px]"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="live">Live</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="ended">Ended</SelectItem>
              </SelectContent>
            </Select>
            <Button>Export</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{auctions.length}</p>
            <p className="text-sm text-muted-foreground">Total Auctions</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-success">
              {auctions.filter((a) => a.status === "live").length}
            </p>
            <p className="text-sm text-muted-foreground">Live</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">
              {auctions.filter((a) => a.status === "upcoming").length}
            </p>
            <p className="text-sm text-muted-foreground">Upcoming</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">
              {auctions.filter((a) => a.status === "pending").length}
            </p>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-muted-foreground">
              {auctions.filter((a) => a.status === "ended").length}
            </p>
            <p className="text-sm text-muted-foreground">Ended</p>
          </Card>
        </div>

        {/* Auctions Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Auction ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Current Bid</TableHead>
                <TableHead>Bids</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAuctions.map((auction) => (
                <TableRow key={auction.id}>
                  <TableCell className="font-medium">{auction.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="max-w-[200px] truncate">
                        {auction.title}
                      </span>
                      {auction.featured && (
                        <TrendingUp className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{auction.seller}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{auction.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(auction.currentBid)}
                  </TableCell>
                  <TableCell>{auction.bidCount}</TableCell>
                  <TableCell>{getStatusBadge(auction.status)}</TableCell>
                  <TableCell>{auction.endDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        {auction.status === "pending" && (
                          <DropdownMenuItem className="text-success">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve Listing
                          </DropdownMenuItem>
                        )}
                        {auction.status === "live" && (
                          <DropdownMenuItem className="text-warning">
                            <Ban className="h-4 w-4 mr-2" />
                            Suspend Auction
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Auction
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
};

export default AdminAuctions;
