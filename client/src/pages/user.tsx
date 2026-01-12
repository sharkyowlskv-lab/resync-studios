import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User as UserIcon, Calendar, Award } from "lucide-react";
import type { User } from "@shared/schema";
import { UserRankBadge } from "@/components/user-rank-badge";
import { useAuth } from "@/hooks/useAuth";

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
      <div className="max-w-6xl mx-auto p-4 space-y-6 animate-pulse">
        <div className="h-64 bg-slate-100 rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-96 bg-slate-100 rounded-2xl" />
          <div className="md:col-span-2 h-96 bg-slate-100 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!profile) return <div>User not found</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <Card className="border-none shadow-xl bg-white overflow-hidden rounded-[2.5rem]">
        <div className="h-48 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent)]" />
        </div>
        <CardContent className="relative px-8 pb-10">
          <div className="flex flex-col md:flex-row items-end gap-6 -mt-16">
            <Avatar className="w-32 h-32 border-4 border-white shadow-2xl rounded-[2rem]">
              <AvatarImage src={profile.profileImageUrl || undefined} />
              <AvatarFallback className="bg-slate-100 text-slate-400">
                <UserIcon className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 pb-2 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h1 className="text-4xl font-black tracking-tight text-slate-900">
                  {profile.username}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <UserRankBadge rank={profile.userRank || "member"} />
                  {profile.isModerator && (
                    <Badge className="bg-slate-900 text-white border-none px-3 font-bold">
                      Staff
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-4 mt-3 text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Joined{" "}
                  {profile.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString()
                    : "Unknown"}
                </span>
                {profile.vipTier !== "none" && (
                  <span className="flex items-center gap-1.5 text-slate-900 font-bold">
                    <Award className="w-4 h-4" />
                    {profile.vipTier?.toUpperCase()} VIP
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column - Stats & Info */}
        <div className="md:col-span-4 space-y-6">
          <Card className="border-none shadow-lg bg-white rounded-3xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
                Information
              </h3>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl text-center space-y-1">
                  <span className="text-2xl font-black text-slate-900">
                    {profile.totalPosts || 0}
                  </span>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Forum Posts
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl text-center space-y-1">
                  <span className="text-2xl font-black text-slate-900">
                    {profile.reputation || 0}
                  </span>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Reputation
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-500">Discord</span>
                  <span className="text-slate-900 font-medium">
                    {profile.discordUsername || "Not Linked"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-500">Roblox</span>
                  <span className="text-slate-900 font-medium">
                    {profile.robloxUsername || "Not Linked"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - About & Content */}
        <div className="md:col-span-8 space-y-6">
          <Card className="border-none shadow-lg bg-white rounded-3xl overflow-hidden min-h-[300px]">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
                About Me
              </h3>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-slate-600 leading-relaxed text-lg italic whitespace-pre-wrap">
                {profile.bio || "This user hasn't written a bio yet."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
