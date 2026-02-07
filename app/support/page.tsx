"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  HelpCircle,
  FileText,
  AlertTriangle,
  Send,
} from "lucide-react";
import Link from "next/link";
import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";

const faqs = [
  {
    question: "How does escrow protection work?",
    answer:
      "When you win a bid, your payment is held securely in escrow until you receive and confirm the item. This protects both buyers and sellers from fraud.",
  },
  {
    question: "How long does it take to get a refund?",
    answer:
      "Refunds are processed within 3-5 business days after approval. The funds will be returned to your GObid wallet or original payment method.",
  },
  {
    question: "What happens if I win a bid?",
    answer:
      "You'll receive a notification and must complete payment within 48 hours. After payment, the seller ships the item. Once you receive and confirm the item, the funds are released to the seller.",
  },
  {
    question: "How do I become a verified seller?",
    answer:
      "Complete your profile, verify your identity with a valid ID, link a bank account, and successfully complete 5 transactions with positive reviews.",
  },
  {
    question: "What are the fees for selling?",
    answer:
      "GObid charges a 5% success fee only when your item sells. There are no listing fees or monthly charges.",
  },
  {
    question: "How do I dispute a transaction?",
    answer:
      "Go to My Bids or My Listings, find the transaction, and click 'Raise Dispute'. Our team will review and respond within 24-48 hours.",
  },
];

const Support = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({
      title: "Ticket Submitted",
      description: "We'll respond to your inquiry within 24 hours.",
    });
    setIsSubmitting(false);
  };

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

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          How Can We Help?
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get answers to your questions or reach out to our support team
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        <Dialog>
          <DialogTrigger asChild>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="p-3 rounded-xl bg-destructive/10 w-fit mx-auto mb-3 group-hover:scale-110 transition-transform">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="font-semibold">Raise Dispute</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Report an issue
              </p>
            </Card>
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

        <Link href="/terms">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="p-3 rounded-xl bg-success/10 w-fit mx-auto mb-3 group-hover:scale-110 transition-transform">
              <FileText className="h-6 w-6 text-success" />
            </div>
            <h3 className="font-semibold">Terms & Policies</h3>
            <p className="text-sm text-muted-foreground mt-1">Read our terms</p>
          </Card>
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Select>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="payment">Payment Issue</SelectItem>
                    <SelectItem value="shipping">Shipping Question</SelectItem>
                    <SelectItem value="account">Account Help</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="mt-1.5"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Describe your issue or question..."
                  className="mt-1.5 min-h-[120px]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full gap-2"
                disabled={isSubmitting}
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>

            {/* Contact Info */}
            <div className="mt-8 pt-6 border-t border-border space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">support@gobid.ng</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">+234 800 123 4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hours</p>
                  <p className="font-medium">Mon-Fri: 8AM - 8PM WAT</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Support;
