
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
    description: "For founders exploring strategic narratives",
    price: 49,
    frequency: "quarter",
    features: [
      { included: true, text: "Unlimited case studies access" },
      { included: true, text: "Advanced search functionality" },
      { included: true, text: "Weekly narrative insights" },
      { included: true, text: "Full case study library" },
      { included: false, text: "Private Slack community" },
      { included: false, text: "Founder interviews" },
      { included: false, text: "Custom lingo strategy session" },
    ],
    cta: "Start Learning"
  },
  {
    name: "Pro",
    description: "For serious founders building their narrative",
    price: 99,
    frequency: "quarter",
    popular: true,
    features: [
      { included: true, text: "Everything in Basic" },
      { included: true, text: "Advanced search & filters" },
      { included: true, text: "Save to personal library" },
      { included: true, text: "Exclusive founder interviews" },
      { included: true, text: "Monthly trend reports" },
      { included: true, text: "Narrative framework templates" },
      { included: false, text: "Custom lingo strategy session" },
    ],
    cta: "Start Building"
  },
  {
    name: "Lingo Strategy",
    description: "3-month complete narrative transformation",
    price: 4999,
    oneTime: true,
    features: [
      { included: true, text: "Everything in Pro" },
      { included: true, text: "Complete lingo strategy overhaul" },
      { included: true, text: "3-month transformation program" },
      { included: true, text: "1-on-1 strategic narrative coaching" },
      { included: true, text: "Custom market positioning analysis" },
      { included: true, text: "Narrative implementation roadmap" },
      { included: true, text: "Ongoing support & refinement" },
      { included: true, text: "Investor deck narrative review" },
    ],
    cta: "Transform Your Narrative"
  }
];
