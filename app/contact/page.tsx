"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setIsSubmitting(false);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a question or need assistance? We're here to help. Reach out to
            us through any of the channels below.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    For general inquiries
                  </p>
                  <a
                    href="mailto:support@gobid.ng"
                    className="text-primary hover:underline mt-2 block"
                  >
                    support@gobid.ng
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-success/10">
                  <Phone className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold">Call Us</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Mon-Fri, 8AM - 8PM WAT
                  </p>
                  <a
                    href="tel:+2348001234567"
                    className="text-primary hover:underline mt-2 block"
                  >
                    +234 800 123 4567
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-secondary">
                  <MapPin className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Visit Us</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Our headquarters
                  </p>
                  <p className="text-sm mt-2">
                    123 Victoria Island
                    <br />
                    Lagos, Nigeria
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-warning/10">
                  <MessageSquare className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Chat with our support team
                  </p>
                  <Button variant="link" className="px-0 h-auto mt-2">
                    Start Chat →
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="mt-1.5"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="mt-1.5"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="mt-1.5"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+234 800 000 0000"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label>Subject</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="partnership">
                        Partnership Opportunity
                      </SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    className="mt-1.5 min-h-[150px]"
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
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <Card className="mt-8 p-0 overflow-hidden">
          <div className="h-[300px] bg-muted flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Map placeholder</p>
              <p className="text-sm text-muted-foreground">
                123 Victoria Island, Lagos, Nigeria
              </p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default Contact;
