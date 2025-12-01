import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Heart } from "lucide-react";

export default function VolunteerModeration() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 px-4">
      {/* Header */}
      <div className="space-y-4">
        <Badge variant="outline" className="gap-2 w-fit">
          <Shield className="w-3.5 h-3.5" />
          Help Build Our Community
        </Badge>
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
            RESYNC Volunteer Moderation Program
          </h1>
          <p className="text-lg text-muted-foreground">
            Join our moderation team and help maintain a safe, positive environment for all members.
          </p>
        </div>
      </div>

      {/* Why Join */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="hover-elevate">
          <CardHeader>
            <Users className="w-8 h-8 text-primary mb-2" />
            <CardTitle className="text-lg">Lead the Community</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Make a meaningful impact by helping guide discussions and enforce community standards.
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader>
            <Heart className="w-8 h-8 text-primary mb-2" />
            <CardTitle className="text-lg">Grow Your Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Develop leadership and moderation expertise while working with an experienced team.
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader>
            <Shield className="w-8 h-8 text-primary mb-2" />
            <CardTitle className="text-lg">Exclusive Perks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Receive special recognition, exclusive badges, and community privileges as a volunteer.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Requirements */}
      <Card className="bg-muted/30 border-muted">
        <CardHeader>
          <CardTitle>Moderator Requirements</CardTitle>
          <CardDescription>What we're looking for in candidates</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Active community member with a positive reputation</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Clear understanding of community guidelines and values</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Excellent communication and conflict resolution skills</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Ability to remain impartial and objective</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Commitment to maintaining a safe, inclusive environment</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Embed Form */}
      <div className="space-y-4">
        <div>
          <h2 className="font-display text-2xl font-bold mb-2">Apply Now</h2>
          <p className="text-muted-foreground">
            Fill out the form below to apply for our volunteer moderation program. We review all applications and will be in touch soon!
          </p>
        </div>

        <Card className="overflow-hidden border-0">
          <iframe
            src="https://resyncstudios.fillout.com/apply"
            style={{
              width: "100%",
              height: "800px",
              border: "none",
              borderRadius: "var(--radius)",
            }}
            title="RESYNC Volunteer Moderation Application"
          />
        </Card>
      </div>
    </div>
  );
}
