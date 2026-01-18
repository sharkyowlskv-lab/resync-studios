import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Shield,
  FileText,
  ShoppingBag,
  MessageSquare,
  Users,
  Calendar,
} from "lucide-react";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<string[]>([]);

  const filterOptions = [
    { id: "policies", label: "Policies", icon: Shield },
    { id: "posts", label: "Posts", icon: FileText },
    { id: "products", label: "Products", icon: ShoppingBag },
    { id: "topics", label: "Topics", icon: MessageSquare },
    { id: "members", label: "Members", icon: Users },
    { id: "date", label: "Date Filters", icon: Calendar },
  ];

  const toggleFilter = (filterId: string) => {
    setFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-base">Search</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <Input
            placeholder="Search policies, posts, products, topics and members..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-base"
            autoFocus
            data-testid="input-search-query"
          />

          {/* Filters */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              Filter by:
            </p>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  variant={filters.includes(id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter(id)}
                  className="gap-1.5"
                  data-testid={`filter-${id}`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Placeholder */}
          {query && (
            <div className="space-y-2 pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                No results found for "{query}"
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
