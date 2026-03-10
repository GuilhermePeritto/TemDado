import type { BandeiraId } from "@/lib/generators/cards-types";
import { cn } from "@/lib/utils";

const icons: Record<BandeiraId, React.ReactNode> = {
  visa: (
    <svg viewBox="0 0 48 32" className="h-7 w-10" fill="none">
      <rect width="48" height="32" rx="4" fill="#1A1F71" />
      <text
        x="24"
        y="21"
        fill="white"
        fontSize="14"
        fontWeight="bold"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
      >
        VISA
      </text>
    </svg>
  ),
  mastercard: (
    <svg viewBox="0 0 48 32" className="h-7 w-10">
      <circle cx="18" cy="16" r="10" fill="#EB001B" />
      <circle cx="30" cy="16" r="10" fill="#F79E1B" />
      <path
        d="M24 6a10 10 0 0 1 0 20 10 10 0 0 1 0-20z"
        fill="#FF5F00"
        fillOpacity="0.8"
      />
    </svg>
  ),
  amex: (
    <svg viewBox="0 0 48 32" className="h-7 w-10">
      <rect width="48" height="32" rx="4" fill="#006FCF" />
      <text x="24" y="20" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">
        AMEX
      </text>
    </svg>
  ),
  elo: (
    <svg viewBox="0 0 48 32" className="h-7 w-10">
      <rect width="48" height="32" rx="4" fill="#FFCB05" />
      <text x="24" y="20" fill="#1a1a1a" fontSize="11" fontWeight="bold" textAnchor="middle">
        ELO
      </text>
    </svg>
  ),
  hipercard: (
    <svg viewBox="0 0 48 32" className="h-7 w-10">
      <rect width="48" height="32" rx="4" fill="#EE4023" />
      <text x="24" y="20" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">
        HIPER
      </text>
    </svg>
  ),
  discover: (
    <svg viewBox="0 0 48 32" className="h-7 w-10">
      <rect width="48" height="32" rx="4" fill="#1a1a1a" />
      <text x="24" y="20" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">
        DISCOVER
      </text>
    </svg>
  ),
  jcb: (
    <svg viewBox="0 0 48 32" className="h-7 w-10">
      <rect width="48" height="32" rx="4" fill="#0E4C96" />
      <text x="24" y="20" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">
        JCB
      </text>
    </svg>
  ),
};

interface CardBrandIconProps {
  bandeira: BandeiraId;
  className?: string;
}

export function CardBrandIcon({ bandeira, className }: CardBrandIconProps) {
  return (
    <span className={cn("inline-flex items-center justify-center overflow-hidden rounded", className)}>
      {icons[bandeira]}
    </span>
  );
}
