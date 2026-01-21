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
      <span
        className="text-[10px] font-bold uppercase tracking-tight text-slate-800"
      >
        {rank
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l: string) => l.toUpperCase())}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col pt-12">
      <div className="max-w-4xl mx-auto w-full px-4 space-y-8 animate-in fade-in duration-700 pb-20">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
          <Link
            href="/"
            className="hover:text-white transition-colors"
          >
            HOME
          </Link>
          <span className="text-slate-700">/</span>
          <span className="text-white">PROFILE</span>
        </div>

        {/* Profile Header Card */}
        <Card className="border-none bg-white shadow-2xl rounded-[2.5rem] overflow-hidden">
          <div className="h-40 bg-[#0f172a]" />
          <CardContent className="px-10 pb-12">
            <div className="relative flex flex-col items-start">
              <div className="absolute -top-16 left-0">
                <div className="p-1.5 bg-white rounded-[2rem] shadow-2xl">
                  <Avatar className="w-28 h-28 rounded-[1.8rem]">
                    <AvatarImage src={profile.profileImageUrl || undefined} />
                    <AvatarFallback className="bg-slate-100 text-slate-400">
                      <UserIcon className="w-10 h-10" />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="w-full mt-4 flex flex-col space-y-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-end w-full">
                     {profile.vipTier !== "none" && (
                        <Badge className="bg-amber-400 hover:bg-amber-400 text-white font-black rounded-full px-4 py-1 text-[10px] shadow-sm uppercase tracking-wider border-none">
                          VIP
                        </Badge>
                      )}
                  </div>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-2 items-center justify-start max-w-2xl">
                    {renderRank(profile.vipTier !== "none" ? profile.vipTier : null)}
                    {renderRank(profile.userRank)}
                    {(profile as any).additionalRanks?.map((rank: string) => (
                      <span key={rank}>{renderRank(rank)}</span>
                    ))}
                    {profile.isAdmin && renderRank("Administrator")}
                    {profile.isModerator && renderRank("Moderator")}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        JOIN DATE
                      </p>
                      <p className="text-slate-900 text-xl font-black">
                        {profile.createdAt
                          ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "December 30, 2025"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        MEMBER ID
                      </p>
                      <p className="text-slate-900 font-mono text-[10px] font-bold bg-slate-50 px-2 py-1 rounded inline-block">
                        {profile.id}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      ABOUT ME
                    </p>
                    <div className="bg-slate-50 rounded-[1.5rem] p-6 min-h-[100px] flex items-center">
                      <p className="text-slate-700 font-bold text-sm leading-relaxed">
                        {profile.bio || "No bio information provided."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Signature Card */}
        <Card className="border-none bg-white shadow-xl rounded-[2.5rem] overflow-hidden">
          <CardContent className="p-10 space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              COMMUNITY SIGNATURE
            </p>
            <div className="text-2xl text-slate-900 font-black min-h-[40px] flex items-center">
              {profile.signature || " "}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
