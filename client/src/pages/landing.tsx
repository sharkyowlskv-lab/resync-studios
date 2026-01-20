import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "@/components/animated-counter";
import {
  Users,
  MessageSquare,
  BarChart3,
  Gamepad2,
  Shield,
  Globe,
  ArrowRight,
} from "lucide-react";
import { Link } from "wouter";

const stats = [
  { value: 15, label: "Connected Members", suffix: "K+" },
  { value: 20, label: "Discord Members", suffix: "K+" },
  { value: 25, label: "Roblox Members", suffix: "K+" },
  { value: 36.6, label: "Active Discussions", suffix: "K+" },
  { value: 99.9, label: "Uptime", suffix: "%" },
  { value: 24, label: "Support", suffix: "/7" },
];

const features = [
  {
    icon: Users,
    title: "Member Management",
    description:
      "Comprehensive member management with detailed profiles, statistics tracking, and powerful community moderation tools.",
  },
  {
    icon: MessageSquare,
    title: "Community Forums",
    description:
      "Built-in forum system with real-time discussions, announcements, and engaging spaces for our community.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Advanced analytics providing deep insights into member engagement and community growth metrics.",
  },
  {
    icon: Gamepad2,
    title: "Game Integration",
    description:
      "Advanced game development integration supporting high-fidelity experiences across platforms.",
  },
  {
    icon: Shield,
    title: "Security & Moderation",
    description:
      "Advanced security systems ensuring fair play and safe gaming environments with robust monitoring.",
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description:
      "Worldwide server network delivering high-fidelity gaming experiences with low latency globally.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://i.imgur.com/a/car-fire-sbi-resync-studios-project-foxtrot-teaser-AjnovPK.png")' }}
        >
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center space-y-8">
          <div className="space-y-4 max-w-4xl mx-auto">
            <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-md px-4 py-1">
              Building the Future of Digital Experiences
            </Badge>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-tight">
              RIVET Studios™
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
              We create open gaming environments accessible to everyone, delivering high-fidelity games through exceptional expertise.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8 h-14 text-lg font-bold shadow-2xl" asChild>
              <Link href="/signup">Join Community</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 backdrop-blur-md px-8 h-14 text-lg font-bold" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-20 space-y-32">
        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center space-y-2">
              <div className="text-4xl font-black text-slate-900 tracking-tighter">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Features Grid */}
        <section className="space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">Innovative Solutions</h2>
            <p className="text-lg text-slate-500 font-medium">Our platform provides the essential tools needed to build thriving communities.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="border-none shadow-sm bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8 space-y-6">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-slate-900" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                      <p className="text-slate-500 leading-relaxed font-medium">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
