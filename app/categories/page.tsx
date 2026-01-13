"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Smartphone,
  Car,
  Home,
  Shirt,
  Palette,
  Sofa,
  Dumbbell,
  Briefcase,
  Baby,
  Gem,
  Music,
  BookOpen,
} from "lucide-react";

const categories = [
  {
    name: "Electronics",
    icon: Smartphone,
    count: 1250,
    description: "Phones, laptops, tablets & more",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    name: "Vehicles",
    icon: Car,
    count: 340,
    description: "Cars, motorcycles & accessories",
    color: "bg-red-500/10 text-red-500",
  },
  {
    name: "Real Estate",
    icon: Home,
    count: 89,
    description: "Houses, apartments & land",
    color: "bg-green-500/10 text-green-500",
  },
  {
    name: "Fashion",
    icon: Shirt,
    count: 2100,
    description: "Clothing, shoes & accessories",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    name: "Art & Collectibles",
    icon: Palette,
    count: 156,
    description: "Paintings, antiques & rare items",
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    name: "Home & Garden",
    icon: Sofa,
    count: 890,
    description: "Furniture, decor & appliances",
    color: "bg-teal-500/10 text-teal-500",
  },
  {
    name: "Sports & Fitness",
    icon: Dumbbell,
    count: 445,
    description: "Equipment, gear & accessories",
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    name: "Business & Industrial",
    icon: Briefcase,
    count: 234,
    description: "Office equipment & machinery",
    color: "bg-gray-500/10 text-gray-500",
  },
  {
    name: "Baby & Kids",
    icon: Baby,
    count: 678,
    description: "Toys, clothing & essentials",
    color: "bg-pink-500/10 text-pink-500",
  },
  {
    name: "Jewelry & Watches",
    icon: Gem,
    count: 312,
    description: "Luxury items & accessories",
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    name: "Musical Instruments",
    icon: Music,
    count: 189,
    description: "Instruments & audio equipment",
    color: "bg-indigo-500/10 text-indigo-500",
  },
  {
    name: "Books & Media",
    icon: BookOpen,
    count: 567,
    description: "Books, movies & games",
    color: "bg-cyan-500/10 text-cyan-500",
  },
];

const Categories = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Browse by Category
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore thousands of items across various categories. Find exactly
          what you're looking for from verified sellers across Nigeria.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.name}
              href={`/auctions?category=${category.name}`}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl ${category.color} transition-transform group-hover:scale-110`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.description}
                    </p>
                    <Badge variant="secondary" className="mt-3">
                      {category.count.toLocaleString()} items
                    </Badge>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default Categories;
