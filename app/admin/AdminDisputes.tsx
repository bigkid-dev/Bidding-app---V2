import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/components/layout/AdminHeader";
import {
  Search,
  AlertTriangle,
  Clock,
  CheckCircle,
  MessageSquare,
  Eye,
  User,
  Package,
} from "lucide-react";

const disputes = [
  {
    id: "DSP-001",
    title: "Item not as described",
    item: "iPhone 15 Pro Max 256GB",
    buyer: "john.doe@email.com",
    seller: "tech_store_ng",
    amount: 875000,
    status: "open",
    priority: "high",
    createdAt: "Dec 5, 2024",
    lastUpdate: "6 hours ago",
    messages: 4,
    description:
      "The phone received has visible scratches on the screen, which was not mentioned in the listing. The seller claimed it was brand new.",
  },
  {
    id: "DSP-002",
    title: "Delayed shipping",
    item: "MacBook Pro M3 14-inch",
    buyer: "amara.o@email.com",
    seller: "gadget_hub",
    amount: 1200000,
    status: "in-progress",
    priority: "medium",
    createdAt: "Dec 2, 2024",
    lastUpdate: "12 hours ago",
    messages: 8,
    description:
      "Seller has not shipped the item after 5 days. No response to messages.",
  },
  {
    id: "DSP-003",
    title: "Refund not received",
    item: "Samsung 65\" QLED Smart TV",
    buyer: "mike.p@email.com",
    seller: "electronics_plus",
    amount: 580000,
    status: "resolved",
    priority: "low",
    createdAt: "Nov 27, 2024",
    lastUpdate: "3 days ago",
    messages: 12,
    description:
      "Return was accepted but refund not processed after 7 days.",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "open":
      return (
        <Badge className="bg-destructive/10 text-destructive border-destructive/20">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Open
        </Badge>
      );
    case "in-progress":
      return (
        <Badge className="bg-warning/10 text-warning border-warning/20">
          <Clock className="h-3 w-3 mr-1" />
          In Progress
        </Badge>
      );
    case "resolved":
      return (
        <Badge className="bg-success/10 text-success border-success/20">
          <CheckCircle className="h-3 w-3 mr-1" />
          Resolved
        </Badge>
      );
    default:
      return null;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return <Badge variant="destructive">High</Badge>;
    case "medium":
      return <Badge variant="outline">Medium</Badge>;
    case "low":
      return <Badge variant="secondary">Low</Badge>;
    default:
      return null;
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

const AdminDisputes = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDispute, setSelectedDispute] = useState<
    (typeof disputes)[0] | null
  >(null);
  const [response, setResponse] = useState("");

  const handleResolve = (action: "refund" | "release" | "partial") => {
    toast({
      title: "Dispute Resolved",
      description: `Action taken: ${action}. Both parties have been notified.`,
    });
    setSelectedDispute(null);
  };

  const openDisputes = disputes.filter(
    (d) => d.status === "open" || d.status === "in-progress"
  );
  const closedDisputes = disputes.filter((d) => d.status === "resolved");

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Dispute Management
            </h1>
            <p className="text-muted-foreground">
              Review and resolve customer disputes
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search disputes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-[300px]"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{disputes.length}</p>
            <p className="text-sm text-muted-foreground">Total Disputes</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-destructive">
              {disputes.filter((d) => d.status === "open").length}
            </p>
            <p className="text-sm text-muted-foreground">Open</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">
              {disputes.filter((d) => d.status === "in-progress").length}
            </p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-success">
              {disputes.filter((d) => d.status === "resolved").length}
            </p>
            <p className="text-sm text-muted-foreground">Resolved</p>
          </Card>
        </div>

        {/* Disputes Tabs */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">
              Active ({openDisputes.length})
            </TabsTrigger>
            <TabsTrigger value="resolved">
              Resolved ({closedDisputes.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {openDisputes.map((dispute) => (
              <Card key={dispute.id} className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-sm text-muted-foreground">
                        {dispute.id}
                      </span>
                      {getStatusBadge(dispute.status)}
                      {getPriorityBadge(dispute.priority)}
                    </div>
                    <h3 className="font-semibold text-lg">{dispute.title}</h3>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span>{dispute.item}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-semibold">
                          {formatCurrency(dispute.amount)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>Buyer: {dispute.buyer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>Seller: {dispute.seller}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {dispute.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Created: {dispute.createdAt}</span>
                      <span>Last update: {dispute.lastUpdate}</span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {dispute.messages} messages
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDispute(dispute)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Review
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="resolved" className="space-y-4">
            {closedDisputes.map((dispute) => (
              <Card key={dispute.id} className="p-6 opacity-75">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-muted-foreground">
                        {dispute.id}
                      </span>
                      {getStatusBadge(dispute.status)}
                    </div>
                    <h3 className="font-semibold">{dispute.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {dispute.item} • {formatCurrency(dispute.amount)}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Dispute Review Dialog */}
        <Dialog
          open={!!selectedDispute}
          onOpenChange={() => setSelectedDispute(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                Review Dispute: {selectedDispute?.id}
              </DialogTitle>
              <DialogDescription>
                Review the details and take appropriate action
              </DialogDescription>
            </DialogHeader>

            {selectedDispute && (
              <div className="space-y-6 pt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Buyer</p>
                    <p className="font-medium">{selectedDispute.buyer}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Seller</p>
                    <p className="font-medium">{selectedDispute.seller}</p>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    Dispute Description
                  </p>
                  <p>{selectedDispute.description}</p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Admin Response</p>
                  <Textarea
                    placeholder="Enter your response to both parties..."
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    className="bg-success hover:bg-success/90"
                    onClick={() => handleResolve("refund")}
                  >
                    Full Refund to Buyer
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleResolve("release")}
                  >
                    Release to Seller
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleResolve("partial")}
                  >
                    Partial Refund
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setSelectedDispute(null)}
                  >
                    Close Without Action
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default AdminDisputes;
