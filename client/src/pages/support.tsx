import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  HelpCircle,
  MessageSquare,
  AlertCircle,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";

const FAQ_ITEMS = [
  {
    category: "Account",
    question: "How do I reset my password?",
    answer:
      "Visit the login page and click 'Forgot Password'. Enter your email and follow the instructions sent to your inbox.",
  },
  {
    category: "Account",
    question: "How do I link my Discord account?",
    answer:
      "Go to Settings > Connections and click 'Link Discord'. You'll be guided through the Discord authorization process.",
  },
  {
    category: "Account",
    question: "How do I link my Roblox account?",
    answer:
      "Go to Settings > Connections and click 'Link Roblox'. Enter your Roblox username to verify ownership. Contact the CEO directly at sharky.owlskv@gmail.com if you cannot complete the roblox integration process.",
  },
  {
    category: "Billing & Subscriptions",
    question: "What are the VIP tiers?",
    answer:
      "We offer Bronze ($10.99), Diamond ($19.99), Founders Edition ($35.99), and Founders Edition Lifetime (64.99) tiers with varying benefits.",
  },
  {
    category: "Billing & Subscriptions",
    question: "When does my VIP subscription renew?",
    answer:
      "VIP subscriptions renew monthly on the same date you purchased. You'll receive an email notification before renewal.",
  },
  {
    category: "Billing & Subscriptions",
    question: "Can I upgrade or downgrade my VIP tier?",
    answer:
      "Yes! You can change your VIP tier at any time from the VIP page. Price adjustments are prorated.",
  },
  {
    category: "Projects",
    question:
      "Why is the Highville Project discontinued if it is still in use?",
    answer:
      "The Highville Project is labled as discontinued because it is no longer supported under the company. The former COO has offered to take over as the Project Manager. In short, the project is mentally labled discontinued because RS is no longer supporting it.",
  },
  {
    category: "Projects",
    question: "What is Project Foxtrot?",
    answer:
      "Project Foxtrot is one of our flagship ROBLOX projects featuring immersive roleplay experiences and community gameplay. The game is currently under active development.",
  },
  {
    category: "Reports",
    question: "How do I report a player or content?",
    answer:
      "In order to report a player or content, you must submit a report via the corresponding forum using the provided format.",
  },
  {
    category: "Appeals",
    question: "How do I appeal an in-game ban or moderation action?",
    answer:
      "In order to appeal a ban or moderation action, you must submit an appeal via the corresponding appeals forum with your case details.",
  },
  {
    category: "Appeals",
    question: "How do I appeal a website ban?",
    answer:
      "Website bans are permanent and cannot be appealed. If you believe this is an error, please contact support.",
  },
  {
    category: "Error Codes",
    question: "What are the error codes and what do they mean?",
    answer: "400	Bad Request",
    answer1: "401 	Unauthorized",
    answer2: "402 	Payment Required",
    answer3: "403 	Forbidden",
    answer4: "404 	NotFound",
    answer5: "405 	Method Not Allowed",
    answer6: "406 	Not Acceptable",
    answer7: "407 	Proxy Authentication Required",
    answer8: "408 	Request Timeout",
    answer9: "409 	Conflict",
    answer10: "410	Gone",
    answer11: "411	Length Required",
    answer12: "412	Precondition Failed",
    answer13: "413	Payload Too Large",
    answer14: "414	URI Too Long",
    answer15: "415	Unsupported Media Type",
    answer16: "416	Range Not Satisfiable",
    answer17: "417	Expectation Failed",
    answer18: "418	ImATeapot",
    answer19: "421	Misdirected Request",
    answer20: "422	Unprocessable Entity",
    answer21: "423	Locked",
    answer22: "424	Failed Dependency",
    answer23: "425	Too Early",
    answer24: "426	Upgrade Required",
    answer25: "428	Precondition Required",
    answer26: "429	Too Many Requests",
    answer27: "431	Request Header Fields TooLarge",
    answer28: "451	Unavailable For Legal Reasons",
    answer29: "500	Internal Server Error",
    answer30: "501	Not Implemented",
    answer31: "502	Bad Gateway",
    answer32: "503	Service Unavailable",
    answer33: "504	Gateway Timeout",
    answer34: "505	HTTP Version Not Supported",
    answer35: "506	Variant Also Negotiates",
    answer36: "507	Insufficient Storage",
    answer37: "508	Loop Detected",
    answer38: "509	Bandwidth Limit Exceeded",
    answer39: "510	Not Extended",
    answer40: "511	Network Authentication Required",
  },
  {
    category: "DMCA",
    question:
      "I've received a DMCA takedown notice on my assets! What do I do?",
    answer:
      "DMCA notices are issued by the DMCA Team which is compiled of select support team specialists. DMCA takedowns are issued when our team finds assets owned by us and/or our partners that have been published anywhere without explicit permission. If you believe that assets you own have been flagged for takedown, please contact Roblox Supprt with details and proof of ownership as our support team cannot access Roblox' backend servers.",
  },
  {
    category: "Partnership",
    question: "How do I apply for a partnership?",
    answer:
      "Visit the Partnerships page and fill out the application form. Our team will review your application and contact you if selected.",
  },
];

export default function Support() {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("Account");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [...new Set(FAQ_ITEMS.map((item) => item.category))];
  const filtered = FAQ_ITEMS.filter((item) => item.category === activeCategory);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/support/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Error code 400: Failed to submit");
      toast({
        title: "Message Sent",
        description: "Our support team will respond within 24 hours.",
      });
      setContactForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast({
        title: "Error code: 400",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="text-center space-y-2">
        <Badge variant="outline" className="mx-auto gap-2">
          <HelpCircle className="w-3.5 h-3.5" />
          Help Center
        </Badge>
        <h1 className="font-display text-3xl sm:text-4xl font-bold">
          RS Support
        </h1>
        <p className="text-lg text-muted-foreground">
          Get help with your account, billing issues, community issues,
          partnership requests, DMCA issues, and more.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover-elevate">
          <CardContent className="pt-6 text-center">
            <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-1">Quick Response</h3>
            <p className="text-sm text-muted-foreground">
              24-hour support response time
            </p>
          </CardContent>
        </Card>
        <Card className="hover-elevate">
          <CardContent className="pt-6 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-1">Expert Team</h3>
            <p className="text-sm text-muted-foreground">
              Dedicated support specialists
            </p>
          </CardContent>
        </Card>
        <Card className="hover-elevate">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-1">VIP Priority</h3>
            <p className="text-sm text-muted-foreground">
              Priority support for VIP members
            </p>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              size="sm"
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((item, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-base">{item.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Contact Support
          </CardTitle>
          <CardDescription>
            Can't find what you're looking for? Send us a message
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  placeholder="Your name"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Subject</label>
              <Input
                placeholder="i.e. Account Issue"
                value={contactForm.subject}
                onChange={(e) =>
                  setContactForm({ ...contactForm, subject: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea
                placeholder="Describe your issue or question..."
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm({ ...contactForm, message: e.target.value })
                }
                required
                className="min-h-32"
              />
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3 flex gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-600">
                Please note that our support response time is 24 hours. During
                high volume intake periods and/or holiday events (such as
                Christmas), response times may be longer. If you have not
                received a response within 72 hours, please reply to the most
                recent email thread with an escalation request. Requesting an
                escalation under 72 hours prior to the initial response will
                only hurt your case and reset your position in the queue.
                <br />
                <span className="text-xs text-red-600"> </span>{" "}
                <span className="font-semibold"> </span>
                Do not include sensitive information such as passwords or credit
                card numbers. Our support team will never ask for this
                information. If you receive a request for sensitive information,
                please report it to us immediately. Once reported, our Trust &
                Safety team will investigate the issue. Once the investigation
                is complete, we will notify you of the results. If the
                investigation finds that the request was made in good faith, we
                will refund any funds that were lost as a result of the request.
                If the investigation finds that the request was made in bad
                faith, we will take appropriate action against the individual
                who made the request. This may include banning the individual
                from our platform and the involvement of local law enforcement
                (and federal law enforcement if it passes into federal
                jurisdiction). We take the security of our users very seriously
                and we appreciate your cooperation in this matter. Thank you for
                your understanding and for being a part of the RESYNC Studios
                community. We look forward to serving you better in the future.
                If you have any questions or concerns, please do not hesitate to
                contact us. We are here to help. Our support team will never ask
                for any PII (Personally Identifiable Information) such as
                passwords or credit card numbers. This is a scam and we will
                never ask for this information. If you receive a request for
                this information, please report it to us immediately. Our Trust
                & Safety team will investigate the issue and notify you of the
                results.
                <span className="font-semibold">,</span>
                VIP members receive priority support with responses within 2
                hours.
              </p>
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
