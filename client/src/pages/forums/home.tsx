import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, ChevronRight, Clock, User as UserIcon } from "lucide-react";
import type { ForumCategory, ForumThread, User } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

export default function ForumHome() {
  const { data: categories = [] } = useQuery<ForumCategory[]>({
    queryKey: ["/api/forums/categories"],
  });

  const { data: threads = [] } = useQuery<(ForumThread & { author: User; category: ForumCategory })[]>({
    queryKey: ["/api/forums/threads"],
  });

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Forums</h1>
          <p className="text-slate-500 mt-1">Connect with our community and get support</p>
        </div>
        <Button asChild className="bg-slate-900 text-white hover:bg-slate-800 shadow-lg px-6">
          <Link href="/forums/new">
            <Plus className="w-4 h-4 mr-2" /> Start Discussion
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Categories */}
        <aside className="lg:col-span-3 space-y-6">
          <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Categories
              </CardTitle>
              <p className="text-xs text-slate-400 mt-1">{categories?.length || 0} categories</p>
            </CardHeader>
            <CardContent className="p-2">
              <div className="space-y-1">
                <Link href="/forums">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100/80 transition-colors group">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                    All Discussions
                  </button>
                </Link>
                {categories?.map((cat) => (
                  <Link key={cat.id} href={`/forums/category/${cat.id}`}>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100/80 transition-colors group">
                      <div 
                        className="w-1.5 h-1.5 rounded-full transition-colors" 
                        style={{ backgroundColor: cat.color || '#cbd5e1' }}
                      />
                      {cat.name}
                    </button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Main Thread List */}
        <div className="lg:col-span-9 space-y-4">
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <div className="divide-y divide-slate-100">
              {threads?.map((thread) => (
                <div key={thread.id} className="p-5 flex items-start gap-5 hover:bg-slate-50/50 transition-colors group">
                  <Avatar className="w-10 h-10 border-2 border-white shadow-sm flex-shrink-0">
                    <AvatarImage src={thread.author?.profileImageUrl || undefined} />
                    <AvatarFallback className="bg-slate-100 text-slate-500">
                      <UserIcon className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0 space-y-1">
                    <Link href={`/forums/thread/${thread.id}`}>
                      <h3 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-slate-700 transition-colors cursor-pointer truncate">
                        {thread.title}
                      </h3>
                    </Link>
                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5">
                        Started by <span className="font-semibold text-slate-700">{thread.author?.username}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDistanceToNow(new Date(thread.createdAt!), { addSuffix: true })}
                      </span>
                      {thread.category && (
                        <Badge variant="outline" className="px-2 py-0 h-5 text-[10px] font-bold bg-slate-50 text-slate-500 border-slate-200">
                          {thread.category.name}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <div className="flex items-center gap-1 text-slate-400">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm font-bold">{thread.replyCount}</span>
                    </div>
                    {thread.isPinned && <Badge className="bg-amber-50 text-amber-600 border-amber-100 text-[10px] px-1.5">PINNED</Badge>}
                  </div>
                </div>
              ))}
              
              {threads?.length === 0 && (
                <div className="p-12 text-center space-y-3">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                    <MessageSquare className="w-6 h-6 text-slate-300" />
                  </div>
                  <p className="text-slate-500">No discussions yet. Be the first to start one!</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
