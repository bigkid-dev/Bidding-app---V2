"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Plus,
  Eye,
} from "lucide-react";

const disputes = [
  {
    id: "DSP-001",
    title: "Item not as described",
    item: "iPhone 15 Pro Max 256GB",
    status: "open",
    priority: "high",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    lastUpdate: new Date(Date.now() - 6 * 60 * 60 * 1000),
    messages: 4,
  },
  {
    id: "DSP-002",
    title: "Delayed shipping",
    item: "MacBook Pro M3 14-inch",
    status: "in-progress",
    priority: "medium",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    lastUpdate: new Date(Date.now() - 12 * 60 * 60 * 1000),
    messages: 8,
  },
  {
    id: "DSP-003",
    title: "Refund not received",
    item: 'Samsung 65" QLED Smart TV',
    status: "resolved",
    priority: "low",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    lastUpdate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    messages: 12,
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
    case "closed":
      return (
        <Badge variant="secondary">
          <XCircle className="h-3 w-3 mr-1" />
          Closed
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

const Disputes = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateDispute = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({
      title: "Dispute Created",
      description:
        "Your dispute has been submitted. We'll review it within 24-48 hours.",
    });
    setIsSubmitting(false);
  };

  const openDisputes = disputes.filter(
    (d) => d.status === "open" || d.status === "in-progress"
  );
  const closedDisputes = disputes.filter(
    (d) => d.status === "resolved" || d.status === "closed"
  );

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Disputes</h1>
          <p className="text-muted-foreground">
            Manage and track your dispute cases
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Raise New Dispute
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Raise a Dispute</DialogTitle>
              <DialogDescription>
                Describe your issue and we'll help resolve it
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateDispute} className="space-y-4 pt-4">
              <div>
                <Label>Transaction/Order ID</Label>
                <Input
                  placeholder="Enter order or auction ID"
                  className="mt-1.5"
                  required
                />
              </div>

              <div>
                <Label>Dispute Type</Label>
                <Select required>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not-received">
                      Item Not Received
                    </SelectItem>
                    <SelectItem value="not-as-described">
                      Item Not as Described
                    </SelectItem>
                    <SelectItem value="damaged">Damaged Item</SelectItem>
                    <SelectItem value="refund">Refund Issue</SelectItem>
                    <SelectItem value="seller">Seller Issue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Title</Label>
                <Input
                  placeholder="Brief summary of the issue"
                  className="mt-1.5"
                  required
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  placeholder="Provide detailed information about your dispute..."
                  className="mt-1.5 min-h-[120px]"
                  required
                />
              </div>

              <div>
                <Label>Evidence (Optional)</Label>
                <Input type="file" multiple className="mt-1.5" />
                <p className="text-xs text-muted-foreground mt-1">
                  Upload photos, screenshots, or documents
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Dispute"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
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

      {/* Disputes List */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">
            Active ({openDisputes.length})
          </TabsTrigger>
          <TabsTrigger value="closed">
            Closed ({closedDisputes.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {openDisputes.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No active disputes</p>
            </Card>
          ) : (
            openDisputes.map((dispute) => (
              <Card key={dispute.id} className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-sm text-muted-foreground">
                        {dispute.id}
                      </span>
                      {getStatusBadge(dispute.status)}
                      {getPriorityBadge(dispute.priority)}
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {dispute.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Related to: {dispute.item}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Created {dispute.createdAt.toLocaleDateString("en-NG")}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {dispute.messages} messages
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <MessageSquare className="h-4 w-4" />
                      Reply
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="closed" className="space-y-4">
          {closedDisputes.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No closed disputes</p>
            </Card>
          ) : (
            closedDisputes.map((dispute) => (
              <Card key={dispute.id} className="p-4 opacity-75">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-sm text-muted-foreground">
                        {dispute.id}
                      </span>
                      {getStatusBadge(dispute.status)}
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {dispute.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Related to: {dispute.item}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Disputes;
