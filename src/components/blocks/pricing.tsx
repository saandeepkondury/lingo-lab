
"use client";

import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useState, useRef } from "react";
import NumberFlow from "@number-flow/react";

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href?: string;
  isPopular: boolean;
  onSubscribe?: () => void;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
  };

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center space-y-4 mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          {title}
        </h2>
        <p className="text-muted-foreground text-base md:text-lg whitespace-pre-line px-4">
          {description}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 md:mb-10">
        <span className="font-semibold text-sm md:text-base">Quarterly</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <Label>
            <Switch
              ref={switchRef as any}
              checked={!isMonthly}
              onCheckedChange={handleToggle}
              className="relative"
            />
          </Label>
        </label>
        <span className="font-semibold text-sm md:text-base text-center">
          Annual <span className="text-primary">(Save 10%)</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 max-w-7xl mx-auto px-4">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 1 }}
            whileInView={{
              y: plan.isPopular ? -10 : 0,
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.2 + index * 0.1,
              opacity: { duration: 0.5 },
            }}
            className={cn(
              "rounded-2xl border p-6 bg-background text-center relative w-full max-w-sm mx-auto lg:max-w-none",
              plan.isPopular ? "border-primary border-2 shadow-lg" : "border-border",
              "flex flex-col h-full",
              !plan.isPopular && "mt-0 lg:mt-5"
            )}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary py-1 px-4 rounded-full flex items-center shadow-md">
                <Star className="text-primary-foreground h-3 w-3 fill-current mr-1" />
                <span className="text-primary-foreground text-xs font-semibold">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="flex-1 flex flex-col">
              <div className="mb-6">
                <p className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wide">
                  {plan.name}
                </p>
                <div className="mt-4 flex items-center justify-center gap-x-1">
                  <span className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                    <NumberFlow
                      value={
                        isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                      }
                      format={{
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }}
                      transformTiming={{
                        duration: 500,
                        easing: "ease-out",
                      }}
                      willChange
                      className="font-variant-numeric: tabular-nums"
                    />
                  </span>
                  {plan.period !== "one-time" && (
                    <span className="text-xs md:text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                      / {plan.period}
                    </span>
                  )}
                </div>

                <p className="text-xs leading-5 text-muted-foreground mt-1">
                  {plan.period === "one-time" ? "one-time payment" : isMonthly ? "billed quarterly" : "billed annually"}
                </p>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-left">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-4">
                <hr className="border-border" />
                
                <button
                  onClick={plan.onSubscribe}
                  className={cn(
                    buttonVariants({
                      variant: plan.isPopular ? "default" : "outline",
                      size: "lg",
                    }),
                    "w-full text-base font-semibold tracking-tight",
                    "transform-gpu transition-all duration-300 ease-out",
                    "hover:ring-2 hover:ring-primary hover:ring-offset-2",
                    plan.isPopular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "hover:bg-primary hover:text-primary-foreground"
                  )}
                >
                  {plan.buttonText}
                </button>
                
                <p className="text-xs md:text-sm leading-5 text-muted-foreground text-center px-2">
                  {plan.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
