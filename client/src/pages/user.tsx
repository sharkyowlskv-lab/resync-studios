import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User as UserIcon, Calendar, ChevronRight } from "lucide-react";
import type { User } from "@shared/schema";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { getDate } from "date-fns";

export default function UserProfile() {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const userId = id || currentUser?.id;

  const { data: profile, isLoading } = useQuery<User>({
    queryKey: [`/api/users/${userId}`],
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Skeleton className="h-48 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    );
  }

  if (!profile) return <div className="p-8 text-center">User not found</div>;

  const isOwnProfile = currentUser?.id === profile.id;

  // Rank visibility logic
  const renderRank = (rank: string | null | undefined) => {
    if (!rank || rank === "None" || rank === "Member") return null;

    return (
      <Badge
        variant="outline"
        className="rounded-full px-3 py-0.5 text-[11px] font-bold border-slate-200 bg-white shadow-sm text-slate-600"
      >
        {rank
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l: string) => l.toUpperCase())}
      </Badge>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 space-y-8 animate-in fade-in duration-700">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
        <Link
          href="/dashboard"
          className="hover:text-slate-900 transition-colors"
        >
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-900">{profile.username}</span>
      </div>

      {/* Profile Header Card */}
      <Card className="border-none bg-white shadow-2xl rounded-[2rem] overflow-hidden">
        <div className="h-32 bg-slate-900" />
        <CardContent className="px-8 pb-12 -mt-12">
          <div className="flex flex-col md:flex-row items-end gap-6 text-center md:text-left">
            <Avatar className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl">
              <AvatarImage src={profile.profileImageUrl || undefined} />
              <AvatarFallback className="bg-slate-100 text-slate-400">
                <UserIcon className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 pb-2">
              <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
                <h1 className="text-4xl font-black tracking-tight text-slate-900 case-sensitive">
                  {profile.username}
                </h1>
                {profile.vipTier !== "none" && (
                  <Badge className="bg-amber-400 text-white font-black rounded-lg px-3 py-1 text-xs shadow-lg">
                    VIP
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                {renderRank(
                  profile.vipTier !== "none" ? profile.vipTier : null,
                )}
                {renderRank(profile.userRank)}
                {(profile as any).additionalRanks?.map((rank: string) => (
                  <span key={rank}>{renderRank(rank)}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-slate-50">
            <div className="space-y-6">
              <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Join Date
                </p>
                <p className="text-slate-900 font-bold">
                  {profile.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "January 26, 2025"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Member ID
                </p>
                <p className="text-slate-900 font-mono text-xs font-bold">
                  {profile.id}
                </p>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                About Me
              </p>
              <div className="bg-slate-50 rounded-2xl p-6">
                <p className="text-slate-600 font-medium leading-relaxed">
                  {profile.bio || "No bio information provided."}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Signature Card */}
      <Card className="border-none bg-white shadow-xl rounded-[2rem] overflow-hidden">
        <CardContent className="p-8 space-y-4">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">
            Community Signature
          </p>
          <div className="text-sm text-slate-500 italic font-bold border-l-4 border-slate-900 pl-6 py-2">
            {profile.signature || " "}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
