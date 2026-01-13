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
import { Upload, X, Info, Clock, Shield } from "lucide-react";

const categories = [
  "Electronics",
  "Vehicles",
  "Real Estate",
  "Fashion",
  "Art & Collectibles",
  "Home & Garden",
  "Sports & Fitness",
  "Business & Industrial",
  "Baby & Kids",
  "Jewelry & Watches",
  "Musical Instruments",
  "Books & Media",
];

const conditions = [
  "Brand New",
  "Like New",
  "Excellent",
  "Good",
  "Fair",
  "For Parts",
];

const durations = [
  { value: "1", label: "1 Day" },
  { value: "3", label: "3 Days" },
  { value: "5", label: "5 Days" },
  { value: "7", label: "7 Days" },
  { value: "10", label: "10 Days" },
  { value: "14", label: "14 Days" },
];

const ListItem = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Mock image upload - in real app would upload to storage
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prev) => [...prev, ...newImages].slice(0, 10));
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Listing Submitted!",
      description:
        "Your item has been submitted for review. You'll be notified once it's approved.",
    });

    setIsSubmitting(false);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            List an Item
          </h1>
          <p className="text-muted-foreground">
            Create your auction listing and reach thousands of buyers
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Escrow Protection</h3>
              <p className="text-xs text-muted-foreground">
                All payments are held securely
              </p>
            </div>
          </Card>
          <Card className="p-4 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <Clock className="h-5 w-5 text-success" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Quick Review</h3>
              <p className="text-xs text-muted-foreground">
                Listings approved within 24hrs
              </p>
            </div>
          </Card>
          <Card className="p-4 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-secondary/50">
              <Info className="h-5 w-5 text-secondary-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-sm">5% Success Fee</h3>
              <p className="text-xs text-muted-foreground">
                Only pay when your item sells
              </p>
            </div>
          </Card>
        </div>

        {/* Listing Form */}
        <form onSubmit={handleSubmit}>
          <Card className="p-6 space-y-6">
            {/* Images Section */}
            <div>
              <Label className="text-base font-semibold mb-3 block">
                Photos (up to 10)
              </Label>
              <div className="grid grid-cols-5 gap-3">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {images.length < 10 && (
                  <label className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground mt-1">
                      Add Photo
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter a descriptive title for your item"
                className="mt-1.5"
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your item in detail. Include condition, features, and any defects."
                className="mt-1.5 min-h-[120px]"
                required
              />
            </div>

            {/* Category & Condition */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Select required>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Condition</Label>
                <Select required>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Pricing */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startingPrice">Starting Price (₦)</Label>
                <Input
                  id="startingPrice"
                  type="number"
                  placeholder="0"
                  className="mt-1.5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="reservePrice">
                  Reserve Price (₦) - Optional
                </Label>
                <Input
                  id="reservePrice"
                  type="number"
                  placeholder="Minimum price to sell"
                  className="mt-1.5"
                />
              </div>
            </div>

            {/* Duration & Location */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Auction Duration</Label>
                <Select required>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((duration) => (
                      <SelectItem key={duration.value} value={duration.value}>
                        {duration.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Item Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Lagos, Nigeria"
                  className="mt-1.5"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                disabled={isSubmitting}
              >
                Save as Draft
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit for Review"}
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </main>
  );
};

export default ListItem;
