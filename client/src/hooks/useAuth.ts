import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

export function useAuth() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  }) as { data: User | undefined; isLoading: boolean };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
