import { useState } from "react";
import * as reactQuery from "@tanstack/react-query";
import * as queryClient from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Thread {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  author: {
    username?: string | null;
    profileImageUrl?: string | null;
  } | null;
}

interface Category {
  id: string;
  name: string;
}

// Fetch categories
const useCategories = () => {
  return reactQuery.useQuery<Category[]>({
    queryKey: ["/api/forums/categories"],
    queryFn: async () => {
      const res = await queryClient.apiRequest("GET", "/api/forums/categories");
      return res.json();
    },
  });
};

// Fetch threads
const useThreads = (selectedCategory?: string) => {
  return reactQuery.useQuery<Thread[]>({
    queryKey: ["/api/forums/threads", selectedCategory],
    queryFn: async () => {
      const url = selectedCategory
        ? `/api/forums/threads?category=${selectedCategory}`
        : "/api/forums/threads";
      const res = await queryClient.apiRequest("GET", url);
      return res.json();
    },
  });
};

export default function Forums() {
  const [selectedCategory, setSelectedCategory] = useState<string | "">("");
  const { data: categories = [] } = useCategories();
  const { data: threads = [], isLoading: threadsLoading } =
    useThreads(selectedCategory);

  // Filter threads if a category is selected
  const filteredThreads = selectedCategory
    ? threads.filter((t) => t.categoryId === selectedCategory)
    : threads;

  return (
    <div className="space-y-4">
      {/* Categories */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedCategory("")}
          className={`px-3 py-1 rounded ${
            selectedCategory === "" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-3 py-1 rounded ${
              selectedCategory === category.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Threads */}
      {threadsLoading ? (
        <div>Loading threads...</div>
      ) : filteredThreads.length > 0 ? (
        filteredThreads.map((thread) => (
          <Card key={thread.id}>
            <CardHeader>
              <CardTitle>{thread.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={thread.author?.profileImageUrl || undefined}
                  />
                  <AvatarFallback>
                    {thread.author?.username?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <span>{thread.author?.username || "Unknown User"}</span>
              </div>
              <p className="mt-2">{thread.content}</p>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent>
            No discussions yet. Be the first to start one!
          </CardContent>
        </Card>
      )}
    </div>
  );
}
