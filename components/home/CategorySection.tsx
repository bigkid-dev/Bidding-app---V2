"use client"

import Link from "next/link";
import { 
  Smartphone, 
  Car, 
  Home, 
  Gem, 
  Shirt, 
  Laptop, 
  Watch, 
  Paintbrush,
  ArrowRight 
} from "lucide-react";

const categories = [
  { name: "Electronics", icon: Smartphone, count: 1234, color: "bg-blue-500/10 text-blue-600" },
  { name: "Vehicles", icon: Car, count: 567, color: "bg-red-500/10 text-red-600" },
  { name: "Real Estate", icon: Home, count: 89, color: "bg-green-500/10 text-green-600" },
  { name: "Jewelry", icon: Gem, count: 432, color: "bg-purple-500/10 text-purple-600" },
  { name: "Fashion", icon: Shirt, count: 876, color: "bg-pink-500/10 text-pink-600" },
  { name: "Computers", icon: Laptop, count: 654, color: "bg-indigo-500/10 text-indigo-600" },
  { name: "Watches", icon: Watch, count: 321, color: "bg-amber-500/10 text-amber-600" },
  { name: "Art", icon: Paintbrush, count: 198, color: "bg-teal-500/10 text-teal-600" },
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Browse by Category
            </h2>
            <p className="text-muted-foreground mt-2">
              Find what you're looking for in our diverse marketplace
            </p>
          </div>
          <Link 
            href="/categories" 
            className="hidden md:flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={`/categories/${category.name.toLowerCase()}`}
                className="group flex flex-col items-center gap-3 p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300"
              >
                <div className={`h-14 w-14 rounded-xl ${category.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground text-sm">{category.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{category.count} items</p>
                </div>
              </Link>
            );
          })}
        </div>

        <Link 
          href="/categories" 
          className="md:hidden flex items-center justify-center gap-2 text-primary font-medium mt-6"
        >
          View All Categories
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default CategorySection;
