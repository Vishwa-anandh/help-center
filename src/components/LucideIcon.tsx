import React from "react";
import { Rocket, CreditCard, ShieldCheck, Wrench, HelpCircle } from "lucide-react";

interface LucideIconProps {
  name: string;
  className?: string;
}

export default function LucideIcon({ name, className }: LucideIconProps) {
  switch (name) {
    case "Rocket":
      return <Rocket className={className} />;
    case "CreditCard":
      return <CreditCard className={className} />;
    case "ShieldCheck":
      return <ShieldCheck className={className} />;
    case "Wrench":
      return <Wrench className={className} />;
    default:
      return <HelpCircle className={className} />;
  }
}
