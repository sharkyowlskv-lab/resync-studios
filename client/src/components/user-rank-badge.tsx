export const rankConfig: Record<string, {
  label: string;
  color: string;
  badgeUrl: string | null;
  formatted: boolean;
  isGradient?: boolean;
  gradient?: string;
}> = {
  // Lifetime rank (automatic for Founders Edition Lifetime purchase)
  lifetime: {
    label: "Lifetime",
    color: "#F59E0B", // Amber/Gold for premium
    badgeUrl: null,
    formatted: true,
  },
  // Leadership ranks (Verified badge - blue, formatted username)
  company_director: {
    label: "Company Director",
    color: "#4B7DF7", // Capitalized blue
    badgeUrl: "https://i.imgur.com/Rqbqq9B.png",
    formatted: true,
  },
  leadership_council: {
    label: "Leadership Council",
    color: "#4B7DF7",
    badgeUrl: "https://i.imgur.com/Rqbqq9B.png",
    formatted: true,
  },
  operations_manager: {
    label: "Operations Manager",
    color: "#4B7DF7",
    badgeUrl: "https://i.imgur.com/Rqbqq9B.png",
    formatted: true,
  },
  mi_trust_safety_director: {
    label: "MI Trust & Safety Director™",
    color: "#4B7DF7",
    badgeUrl: "https://i.imgur.com/Rqbqq9B.png",
    formatted: true,
  },
  mi_trust_safety_director_trademark: {
    label: "MI Trust & Safety Director™",
    color: "#4B7DF7",
    badgeUrl: "https://i.imgur.com/Rqbqq9B.png",
    formatted: true,
  },
  // Team ranks (Team badge - blue, formatted username)
  team_member: {
    label: "Team Member",
    color: "#4B7DF7",
    badgeUrl: "https://i.imgur.com/rTNSCQt.png",
    formatted: true,
  },
  rs_trust_safety_team: {
    label: "RS Trust & Safety Team",
    color: "#EF4444", // Red for trust & safety
    badgeUrl: "https://i.imgur.com/rTNSCQt.png",
    formatted: true,
  },
  // Staff ranks (no badge, formatted)
  staff_internal_affairs: {
    label: "Staff Internal Affairs",
    color: "#6B7280",
    badgeUrl: null,
    formatted: true,
  },
  staff_department_director: {
    label: "Staff Department Director",
    color: "#A855F7", // Purple for department director
    badgeUrl: null,
    formatted: true,
  },
  appeals_moderator: {
    label: "Appeals Moderator",
    color: "#06B6D4", // Light cyan for appeals moderator
    badgeUrl: null,
    formatted: true,
  },
  community_senior_administrator: {
    label: "Community Senior Administrator",
    color: "#EF4444", // Red for community admin
    badgeUrl: null,
    formatted: true,
  },
  community_administrator: {
    label: "Community Administrator",
    color: "#EF4444", // Red for community admin
    badgeUrl: null,
    formatted: true,
  },
  community_moderator: {
    label: "Community Moderator",
    color: "#0D9488", // Dark teal-green for moderators
    badgeUrl: null,
    formatted: true,
  },
  community_senior_moderator: {
    label: "Community Senior Moderator",
    color: "#0D9488", // Dark teal-green for senior moderators
    badgeUrl: null,
    formatted: true,
  },
  community_developer: {
    label: "Community Developer",
    color: "#6B7280",
    badgeUrl: null,
    formatted: true,
  },
  // Legacy staff ranks (kept for backward compatibility)
  administrator: {
    label: "Administrator",
    color: "#6B7280",
    badgeUrl: null,
    formatted: true,
  },
  senior_administrator: {
    label: "Senior Administrator",
    color: "#6B7280",
    badgeUrl: null,
    formatted: true,
  },
  moderator: {
    label: "Moderator",
    color: "#6B7280",
    badgeUrl: null,
    formatted: true,
  },
  // VIP ranks (tier-corresponding VIP badge)
  bronze_vip: {
    label: "Bronze VIP",
    color: "#CD7F32",
    badgeUrl: "https://i.imgur.com/G7B9P5N.png",
    formatted: true,
    isGradient: true,
    gradient: "linear-gradient(to right, #CD7F32, #A0522D)",
  },
  diamond_vip: {
    label: "Diamond VIP",
    color: "#B9F2FF",
    badgeUrl: "https://i.imgur.com/vH3m3YV.png",
    formatted: true,
    isGradient: true,
    gradient: "linear-gradient(to right, #B9F2FF, #00BFFF)",
  },
  founders_edition_vip: {
    label: "Founders Edition VIP",
    color: "#FFBF00",
    badgeUrl: "https://i.imgur.com/Y3v1X7X.png",
    formatted: true,
    isGradient: true,
    gradient: "linear-gradient(to right, #FFBF00, #FFD700, #00BFFF)",
  },
  // Member types & statuses
  trusted_member: {
    label: "Trusted Member",
    color: "#10B981", // Green for trusted
    badgeUrl: null,
    formatted: true,
  },
  active_member: {
    label: "Active Member",
    color: "#3B82F6", // Blue for active
    badgeUrl: null,
    formatted: false,
  },
  community_partner: {
    label: "Community Partner",
    color: "#8B5CF6", // Purple for partner
    badgeUrl: null,
    formatted: true,
  },
  banned: {
    label: "Banned",
    color: "#EF4444", // Red for banned
    badgeUrl: null,
    formatted: false,
  },
  // Sub-groups
  customer_relations: {
    label: "Customer Relations",
    color: "#6B7280",
    badgeUrl: null,
    formatted: false,
  },
  rs_volunteer_staff: {
    label: "RS™ Volunteer Staff",
    color: "#6B7280",
    badgeUrl: null,
    formatted: true,
  },
  member: {
    label: "Member",
    color: "#6B7280",
    badgeUrl: null,
    formatted: false,
  },
};

interface UserRankBadgeProps {
  rank?: string;
  username?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function UserRankBadge({
  rank = "member",
  username,
  className = "",
  size = "md",
}: UserRankBadgeProps) {
  if (!rank || rank === "member") return null;

  const config = rankConfig[rank as keyof typeof rankConfig];
  if (!config) return null;

  const sizeClass =
    size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm";

  return (
    <strong
      className={`group-prefix inline-flex items-center gap-1.5 ${sizeClass} ${className}`}
    >
      {config.badgeUrl && (
        <img
          src={config.badgeUrl}
          alt={config.label}
          width="16"
          height="16"
          loading="lazy"
          decoding="async"
          className="w-4 h-4"
        />
      )}
      <span 
        className="font-bold" 
        style={ { 
          color: config.isGradient ? 'transparent' : config.color,
          backgroundImage: config.isGradient ? config.gradient : 'none',
          WebkitBackgroundClip: config.isGradient ? 'text' : 'border-box',
          backgroundClip: config.isGradient ? 'text' : 'border-box',
        } }
      >
        {config.label}
      </span>
    </strong>
  );
}

export function FormattedUsername({
  rank = "member",
  username = "User",
  className = "",
}: UserRankBadgeProps) {
  const config = rankConfig[rank as keyof typeof rankConfig];

  // If rank is not formatted or no username, return plain
  if (!config?.formatted || !username) {
    return <span className={className}>{username}</span>;
  }

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      {config.badgeUrl && (
        <img
          src={config.badgeUrl}
          alt={config.label}
          width="16"
          height="16"
          loading="lazy"
          decoding="async"
          className="w-4 h-4"
        />
      )}
      <span 
        className="font-bold uppercase" 
        style={ { 
          color: config.isGradient ? 'transparent' : config.color,
          backgroundImage: config.isGradient ? config.gradient : 'none',
          WebkitBackgroundClip: config.isGradient ? 'text' : 'border-box',
          backgroundClip: config.isGradient ? 'text' : 'border-box',
        } }
      >
        {username}
      </span>
    </div>
  );
}
