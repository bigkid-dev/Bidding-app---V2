"use client"

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Wallet as WalletIcon,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Shield,
  Clock,
  CreditCard,
  Building2,
} from "lucide-react";

const transactions = [
  {
    id: "1",
    type: "deposit",
    amount: 500000,
    status: "completed",
    description: "Wallet Top-up",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    type: "escrow",
    amount: -350000,
    status: "held",
    description: "Bid on iPhone 15 Pro Max",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    type: "refund",
    amount: 150000,
    status: "completed",
    description: "Refund - Outbid on MacBook Pro",
    date: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: "4",
    type: "withdrawal",
    amount: -100000,
    status: "pending",
    description: "Withdrawal to Bank",
    date: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    id: "5",
    type: "sale",
    amount: 420000,
    status: "completed",
    description: "Sale - Herman Miller Chair",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(Math.abs(amount));
};

const Wallet = () => {
  const { toast } = useToast();
  const [fundAmount, setFundAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const walletBalance = 650000;
  const escrowBalance = 350000;

  const handleFundWallet = () => {
    toast({
      title: "Redirecting to Payment",
      description: "You'll be redirected to complete your payment.",
    });
  };

  const handleWithdraw = () => {
    toast({
      title: "Withdrawal Initiated",
      description: "Your withdrawal request has been submitted for processing.",
    });
  };

  return (
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My Wallet
          </h1>
          <p className="text-muted-foreground">
            Manage your funds and view transaction history
          </p>
        </div>

        {/* Balance Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <WalletIcon className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="secondary">Available</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Available Balance</p>
            <p className="text-3xl font-bold text-foreground">
              {formatCurrency(walletBalance)}
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-secondary/30 to-secondary/10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-secondary">
                <Shield className="h-6 w-6 text-secondary-foreground" />
              </div>
              <Badge variant="outline">In Escrow</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Escrow Balance</p>
            <p className="text-3xl font-bold text-foreground">
              {formatCurrency(escrowBalance)}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-success/10">
                <Clock className="h-6 w-6 text-success" />
              </div>
              <Badge className="bg-success/10 text-success border-success/20">
                Pending
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Pending Withdrawal</p>
            <p className="text-3xl font-bold text-foreground">
              {formatCurrency(100000)}
            </p>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Fund Wallet
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Fund Your Wallet</DialogTitle>
                <DialogDescription>
                  Add money to your wallet to start bidding
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="amount">Amount (₦)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div className="flex gap-2">
                  {[50000, 100000, 250000, 500000].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setFundAmount(amount.toString())}
                    >
                      ₦{(amount / 1000).toFixed(0)}k
                    </Button>
                  ))}
                </div>
                <div className="space-y-3 pt-4">
                  <p className="text-sm font-medium">Payment Method</p>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3"
                    onClick={handleFundWallet}
                  >
                    <CreditCard className="h-5 w-5" />
                    Pay with Card
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3"
                    onClick={handleFundWallet}
                  >
                    <Building2 className="h-5 w-5" />
                    Bank Transfer
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <ArrowUpRight className="h-4 w-4" />
                Withdraw
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Withdraw Funds</DialogTitle>
                <DialogDescription>
                  Transfer money to your bank account
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Available for withdrawal
                  </p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(walletBalance)}
                  </p>
                </div>
                <div>
                  <Label htmlFor="withdrawAmount">Amount (₦)</Label>
                  <Input
                    id="withdrawAmount"
                    type="number"
                    placeholder="Enter amount"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="bankAccount">Bank Account</Label>
                  <Input
                    id="bankAccount"
                    value="GTBank - **** 4521"
                    disabled
                    className="mt-1.5"
                  />
                  <Button variant="link" className="px-0 h-auto text-sm">
                    Change account
                  </Button>
                </div>
                <Button
                  className="w-full"
                  onClick={handleWithdraw}
                  disabled={!withdrawAmount}
                >
                  Withdraw Funds
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Transactions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="deposits">Deposits</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              <TabsTrigger value="escrow">Escrow</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-full ${
                        tx.amount > 0
                          ? "bg-success/10 text-success"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {tx.amount > 0 ? (
                        <ArrowDownLeft className="h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{tx.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {tx.date.toLocaleDateString("en-NG", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        tx.amount > 0 ? "text-success" : "text-foreground"
                      }`}
                    >
                      {tx.amount > 0 ? "+" : "-"}
                      {formatCurrency(tx.amount)}
                    </p>
                    <Badge
                      variant={
                        tx.status === "completed"
                          ? "secondary"
                          : tx.status === "pending"
                          ? "outline"
                          : "default"
                      }
                      className="text-xs"
                    >
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="deposits">
              <p className="text-muted-foreground text-center py-8">
                Filter by deposits
              </p>
            </TabsContent>

            <TabsContent value="withdrawals">
              <p className="text-muted-foreground text-center py-8">
                Filter by withdrawals
              </p>
            </TabsContent>

            <TabsContent value="escrow">
              <p className="text-muted-foreground text-center py-8">
                Filter by escrow transactions
              </p>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
  );
};

export default Wallet;
