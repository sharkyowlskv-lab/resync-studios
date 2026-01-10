import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import * as userRankBadge from "@/components/user-rank-badge";
import { Link, useParams } from "wouter";
import {
  Calendar,
  Edit,
  CheckCircle,
  Mail,
  MapPin,
  Globe,
  Shield,
  MessageSquare,
  Star,
} from "lucide-react";
import { SiDiscord, SiRoblox } from "react-icons/si";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { User } from "@shared/schema";

export default function User() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const { toast } = useToast();
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

  const userId = id || currentUser?.id;

  const { data: user, isLoading } = useQuery<User>({
    queryKey: [`/api/users/${userId}`],
    enabled: !!userId,
  });

  const reportMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/reports", data);
    },
    onSuccess: () => {
      toast({
        title: "Report submitted",
        description: "Thank you for helping keep our community safe.",
      });
      setIsReportDialogOpen(true);
      setReportReason("");
      setReportDetails("");
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <Skeleton className="h-64 w-full rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-96 lg:col-span-1 rounded-xl" />
          <Skeleton className="h-96 lg:col-span-2 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <h1 className="text-4xl font-bold mb-4">User Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          The profile you are looking for might have been moved or deleted.
        </p>
        <Button asChild size="lg">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    );
  }

  const initials = (user.username || "U").slice(0, 2).toUpperCase();
  const isOwnProfile = currentUser?.id === user.id;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8 animate-in fade-in duration-500">
      {/* Hero Header */}
      <div className="relative group">
        <div className="h-48 sm:h-64 w-full bg-gradient-to-r from-slate-900 to-slate-800 rounded-t-xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>

        <div className="absolute -bottom-16 left-6 sm:left-12 flex flex-col sm:flex-row items-end gap-6 w-full pr-12">
          <Avatar className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-background shadow-xl rounded-2xl overflow-hidden">
            <AvatarImage
              src={user.profileImageUrl || undefined}
              className="object-cover"
            />
            <AvatarFallback className="text-4xl bg-slate-100 text-slate-600 font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 pb-4">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {user.username}
              </h1>
              <div className="flex gap-2">
                {user.userRank && (
                  <userRankBadge.UserRankBadge rank={user.userRank} size="md" />
                )}
                {user.isModerator && (
                  <Badge
                    variant="secondary"
                    className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                  >
                    <Shield className="w-3 h-3 mr-1" /> RS Trust & Safety Team
                  </Badge>
                )}
              </div>
            </div>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              Joined{" "}
              {new Date(user.createdAt!).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="pb-4 flex gap-2">
            {isOwnProfile ? (
              <Button
                asChild
                variant="outline"
                className="shadow-sm hover-elevate"
              >
                <Link href="/settings">
                  <Edit className="w-4 h-4 mr-2" /> Edit Profile
                </Link>
              </Button>
            ) : (
              <Dialog
                open={isReportDialogOpen}
                onOpenChange={setIsReportDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Shield className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Report User</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Reason</label>
                      <Select
                        value={reportReason}
                        onValueChange={setReportReason}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spam">Spamming</SelectItem>
                          <SelectItem value="harassment">Harassment</SelectItem>
                          <SelectItem value="inappropriate">
                            Inappropriate Content
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Additional Details
                      </label>
                      <Textarea
                        placeholder="Tell us more about the issue..."
                        value={reportDetails}
                        onChange={(e) => setReportDetails(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="ghost"
                      onClick={() => setIsReportDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() =>
                        reportMutation.mutate({
                          targetId: user.id,
                          targetType: "user",
                          reason: reportReason,
                          details: reportDetails,
                        })
                      }
                      disabled={!reportReason || reportMutation.isPending}
                    >
                      Submit Report
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>

      <div className="pt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-slate-50/50 dark:bg-slate-900/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Reputation</span>
                <span className="font-semibold text-green-600">
                  +{user.reputation || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Forum Posts</span>
                <span className="font-semibold">{user.totalPosts || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Games Played</span>
                <span className="font-semibold">{user.gamesPlayed || 0}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="w-4 h-4" /> Social Connections
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                <div className="flex items-center gap-3">
                  <SiDiscord className="w-5 h-5 text-[#5865F2]" />
                  <span className="font-medium text-sm">Discord</span>
                </div>
                {user.discordUsername ? (
                  <Badge variant="outline" className="text-xs font-mono">
                    {user.discordUsername}
                  </Badge>
                ) : (
                  <span className="text-xs text-muted-foreground italic">
                    Not Linked
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                <div className="flex items-center gap-3">
                  <SiRoblox className="w-5 h-5 text-red-500" />
                  <span className="font-medium text-sm">Roblox</span>
                </div>
                {user.robloxUsername ? (
                  <Badge variant="outline" className="text-xs font-mono">
                    {user.robloxUsername}
                  </Badge>
                ) : (
                  <span className="text-xs text-muted-foreground italic">
                    Not Linked
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                {user.bio || "This user hasn't written a bio yet. Stay tuned!"}
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Message</h3>
                  <p className="text-sm text-muted-foreground">
                    Start a private chat
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Reputation</h3>
                  <p className="text-sm text-muted-foreground">
                    Give +1 reputation
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
