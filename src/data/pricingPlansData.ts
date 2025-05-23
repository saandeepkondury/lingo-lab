
import { PlanFeature } from "@/components/pricing/PricingPlan";

export interface PricingPlan {
  name: string;
  description: string;
  price: number;
  frequency?: string;
  oneTime?: boolean;
  popular?: boolean;
  features: PlanFeature[];
  cta: string;
}

export const pricingPlansData: PricingPlan[] = [
  {
    name: "Basic",
    description: "For founders and startup teams",
    price: 49,
    frequency: "month",
    features: [
      { included: true, text: "Unlimited case studies" },
      { included: true, text: "Advanced search functionality" },
      { included: true, text: "Weekly newsletter" },
      { included: true, text: "Full case study library" },
      { included: true, text: "Downloadable content" },
      { included: false, text: "Private Slack community" },
      { included: false, text: "Founder interviews" },
      { included: false, text: "Private mentorship sessions" },
    ],
    cta: "Start Basic"
  },
  {
    name: "Pro",
    description: "For serious founders and marketers",
    price: 99,
    frequency: "month",
    popular: true,
    features: [
      { included: true, text: "Unlimited case studies" },
      { included: true, text: "Advanced search & filters" },
      { included: true, text: "Download pitch decks & assets" },
      { included: true, text: "Exclusive founder interviews" },
      { included: true, text: "Save to personal library" },
      { included: true, text: "Private Slack community" },
      { included: true, text: "Monthly trend reports" },
      { included: false, text: "Private mentorship sessions" },
    ],
    cta: "Start Pro"
  },
  {
    name: "Investor",
    description: "For VCs and strategic investors",
    price: 4999,
    oneTime: true,
    features: [
      { included: true, text: "All Pro plan features" },
      { included: true, text: "Emerging narrative trends" },
      { included: true, text: "Market category analysis" },
      { included: true, text: "Dealflow narrative reporting" },
      { included: true, text: "Strategic narrative workshops" },
      { included: true, text: "Early access to new trends" },
      { included: true, text: "Founder matchmaking" },
      { included: true, text: "Private mentorship sessions" },
    ],
    cta: "Start Investor"
  }
];
