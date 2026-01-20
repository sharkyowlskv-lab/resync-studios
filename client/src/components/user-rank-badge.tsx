export const rankConfig: Record<
  string,
  {
    label: string;
    color: string;
    badgeUrl: string | null;
    formatted: boolean;
    isGradient?: boolean;
    gradient?: string;
  }
> = {
  // Lifetime rank (automatic for Founders Edition Lifetime purchase)
  // Graident username formatted - overrides every other rank coloring/gradient/formatting - graident/color format should always be applied to the username if this rank is present, does not apply to the rank label and the formatted username should be the only thing that is gradiented
  Lifetime: {
    label: "Lifetime",
    color: "#F59E0B", // Amber/Gold for premium
    badgeUrl: null,
    formatted: true, // Formatted username with gradient text
    isGradient: true, // Enable gradient text for lifetime users (Founders Edition Lifetime) - gradient from gold to blue (like the Founders Edition VIP gradient) but with a gold base instead of yellow - #FFBF00 to #00BFFF
    gradient: "linear-gradient(to right, #FFBF00, #00BFFF)",
  },
  // Leadership ranks (Verified badge - blue, formatted username)
  Company_Director: {
    label: "Company Director",
    color: "#4B7DF7", // Capitalized blue
    badgeUrl: null,
    formatted: true,
  },
  Company_Representative: {
    label: "Company Representative",
    color: "#4B7DF7",
    badgeUrl: "https://i.imgur.com/rTNSCQt.png",
    formatted: true,
  },
  Operations_Manager: {
    label: "Operations Manager",
    color: "#EF4444", // Red for operations manager
    badgeUrl: null,
    formatted: true,
  },
  MI_Trust_Safety_Director: {
    label: "MI Trust & Safety Director",
    color: "#A855F7", // Purple for MI T&S director
    badgeUrl: null,
    formatted: true,
  },
  // Team ranks (Team badge - blue, formatted username)
  Team_Member: {
    label: "Team Member",
    color: "#4B7DF7",
    badgeUrl: "https://i.imgur.com/rTNSCQt.png",
    formatted: true,
  },
  // Staff ranks (no badge, formatted)
  Staff_Internal_Affairs: {
    label: "Staff Internal Affairs",
    color: "#6B7280",
    badgeUrl: null,
    formatted: true,
  },
  Staff_Department_Director: {
    label: "Staff Department Director",
    color: "#A855F7", // Purple for department director
    badgeUrl: null,
    formatted: true,
  },
  Appeals_Moderator: {
    label: "Appeals Moderator",
    color: "#06B6D4", // Light cyan for appeals moderator
    badgeUrl: null,
    formatted: true,
  },
  Community_Senior_Administrator: {
    label: "Community Senior Administrator",
    color: "#EF4444", // Red for community admin
    badgeUrl: null,
    formatted: true,
  },
  Community_Administrator: {
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
  Community_Senior_Moderator: {
    label: "Community Senior Moderator",
    color: "#0D9488", // Dark teal-green for senior moderators
    badgeUrl: null,
    formatted: true,
  },
  Community_Developer: {
    label: "Community Developer",
    color: "#6B7280",
    badgeUrl: null,
    formatted: true,
  },
  // Legacy staff ranks (kept for backward compatibility)
  Administrator: {
    label: "Administrator",
    color: "#6B7280",
    badgeUrl: null,
    formatted: true,
  },
  Senior_Administrator: {
    label: "Senior Administrator",
    color: "#6B7280",
    badgeUrl: null,
    formatted: true,
  },
  Moderator: {
    label: "Moderator",
    color: "#6B7280",
    badgeUrl: null,
    formatted: true,
  },
  // VIP ranks (tier-corresponding VIP badge)
  Bronze_VIP: {
    label: "Bronze VIP",
    color: "#CD7F32",
    badgeUrl: "https://i.imgur.com/G7B9P5N.png",
    formatted: true,
    isGradient: true,
    gradient: "linear-gradient(to right, #CD7F32, #A0522D)",
  },
  Diamond_VIP: {
    label: "Diamond VIP",
    color: "#B9F2FF",
    badgeUrl: "https://i.imgur.com/vH3m3YV.png",
    formatted: true,
    isGradient: true,
    gradient: "linear-gradient(to right, #B9F2FF, #00BFFF)",
  },
  Founders_Edition_VIP: {
    label: "Founders Edition VIP",
    color: "#FFBF00",
    badgeUrl: "https://i.imgur.com/Y3v1X7X.png",
    formatted: true,
    isGradient: true,
    gradient: "linear-gradient(to right, #FFBF00, #FFD700, #00BFFF)",
  },
  // Member types & statuses
  Trusted_Member: {
    label: "Trusted Member",
    color: "#10B981", // Green for trusted
    badgeUrl: null,
    formatted: true,
  },
  Active_Member: {
    label: "Active Member",
    color: "#3B82F6", // Blue for active
    badgeUrl: null,
    formatted: false,
  },
  Community_Partner: {
    label: "Community Partner",
    color: "#8B5CF6", // Purple for partner
    badgeUrl: null,
    formatted: true,
  },
  Banned: {
    label: "Banned",
    color: "#EF4444", // Red for banned
    badgeUrl: null,
    formatted: false,
  },
  // Sub-groups
  Customer_Relations: {
    label: "Customer Relations",
    color: "#6B7280",
    badgeUrl: null,
    formatted: false,
  },
  RS_Volunteer_Staff: {
    label: "RS Volunteer Staff",
    color: "#6B7280",
    badgeUrl: null,
    formatted: true,
  },
  Member: {
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
  rank = "Member",
  username,
  className = "",
  size = "md",
}: UserRankBadgeProps) {
  if (!rank || rank === "Member") return null;

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
        style={{
          color: config.isGradient ? "transparent" : config.color,
          backgroundImage: config.isGradient ? config.gradient : "none",
          WebkitBackgroundClip: config.isGradient ? "text" : "border-box",
          backgroundClip: config.isGradient ? "text" : "border-box",
        }}
      >
        {config.label}
      </span>
    </strong>
  );
}

export function FormattedUsername({
  rank = "Member",
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
        style={{
          color: config.isGradient ? "transparent" : config.color,
          backgroundImage: config.isGradient ? config.gradient : "none",
          WebkitBackgroundClip: config.isGradient ? "text" : "border-box",
          backgroundClip: config.isGradient ? "text" : "border-box",
        }}
      >
        {username}
      </span>
    </div>
  );
}
