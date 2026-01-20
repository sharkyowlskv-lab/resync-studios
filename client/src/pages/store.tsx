import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function Store() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16 animate-in fade-in duration-500">
      {/* Category Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-bold tracking-tight">
              Shop by category
            </h2>
            <p className="text-sm text-muted-foreground">
              Browse our most popular products
            </p>
          </div>
          <Button variant="ghost" className="text-xs font-bold gap-1 group">
            Browse all categories{" "}
            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card
              key={i}
              className="aspect-square bg-muted/30 border-none shadow-none rounded-xl"
            />
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg font-bold tracking-tight">
            Featured products
          </h2>
          <p className="text-sm text-muted-foreground">
            Our most popular products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="aspect-[4/3] bg-muted/30 border-none shadow-none rounded-xl" />
          <Card className="aspect-[4/3] bg-muted/30 border-none shadow-none rounded-xl" />

          <Card className="aspect-[4/3] bg-muted/30 border-none shadow-none rounded-xl" />
          <Card className="aspect-[4/3] bg-muted/30 border-none shadow-none rounded-xl" />
          <Card className="aspect-[4/3] bg-muted/30 border-none shadow-none rounded-xl" />
          <Card className="aspect-[4/3] bg-muted/30 border-none shadow-none rounded-xl" />
        </div>
      </section>
    </div>
  );
}
