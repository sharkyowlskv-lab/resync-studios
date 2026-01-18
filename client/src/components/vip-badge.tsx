import { Badge } from "@/components/ui/badge";
import { Crown, Gem, Diamond, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type VipTier = "none" | "bronze" | "sapphire" | "diamond" | "founders";

interface VipBadgeProps {
  tier: VipTier;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const tierGradients = {
  bronze: "linear-gradient(135deg, #B87333 0%, #CD7F32 50%, #D4A574 100%)", // Bronze/Copper gradient
  sapphire:
    "linear-gradient(135deg, #0F3460 0%, #16213E 25%, #0A5DC9 50%, #00A8FF 100%)", // Deep blue to cyan
  diamond:
    "linear-gradient(135deg, #4DD9FF 0%, #00E0FF 25%, #00B8D4 50%, #0099CC 100%)", // Cyan/Diamond gradient
  founders:
    "linear-gradient(135deg, #8B5CF6 0%, #EC4899 25%, #3B82F6 50%, #FBBF24 75%, #10B981 100%)", // Rainbow gradient
};

const tierConfig = {
  none: { label: "Free", icon: null, className: "" },
  bronze: {
    label: "Bronze VIP",
    icon: Crown,
    className: "vip-bronze border-0 text-white font-bold",
  },
  sapphire: {
    label: "Sapphire VIP",
    icon: Gem,
    className: "vip-sapphire border-0 text-white font-bold",
  },
  diamond: {
    label: "Diamond VIP",
    icon: Diamond,
    className: "vip-diamond border-0 text-white font-bold",
  },
  founders: {
    label: "Founders Edition",
    icon: Star,
    className: "vip-founders border-0 text-white font-bold",
  },
};

const sizeConfig = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-2.5 py-0.5",
  lg: "text-base px-3 py-1",
};

const iconSizeConfig = {
  sm: "h-3 w-3",
  md: "h-3.5 w-3.5",
  lg: "h-4 w-4",
};

export function VipBadge({
  tier,
  size = "md",
  showLabel = true,
}: VipBadgeProps) {
  if (tier === "none") return null;

  const config = tierConfig[tier];
  const Icon = config.icon;
  const gradient =
    tierGradients[tier as keyof typeof tierGradients] || "transparent";

  return (
    <Badge
      className={cn(
        sizeConfig[size],
        config.className,
        "font-semibold gap-1 inline-flex items-center",
      )}
      style={{
        background: gradient,
      }}
      data-testid={`badge-vip-${tier}`}
    >
      {Icon && <Icon className={iconSizeConfig[size]} />}
      {showLabel && <span>{config.label}</span>}
    </Badge>
  );
}
