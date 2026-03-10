import type { BandeiraId } from "@/lib/generators/cards-types";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const BANDEIRA_CORES: Record<BandeiraId, string> = {
  visa: "from-[#1A1F71] to-[#2d3480]",
  mastercard: "from-[#EB001B] via-[#F79E1B] to-[#FF5F00]",
  amex: "from-[#006FCF] to-[#0080e8]",
  elo: "from-[#FFCB05] to-[#ffd633]",
  hipercard: "from-[#EE4023] to-[#ff5533]",
  discover: "from-[#1a1a1a] to-[#2d2d2d]",
  jcb: "from-[#0E4C96] to-[#1565c0]",
};

interface CardDataDisplayProps {
  bandeira: BandeiraId;
  numero: string;
  validade: string;
  cvv: string;
  nomeTitular: string;
  onCopy: (value: string) => void;
  isCopied: (value: string) => boolean;
}

export function CardDataDisplay({
  bandeira,
  numero,
  validade,
  cvv,
  nomeTitular,
  onCopy,
  isCopied,
}: CardDataDisplayProps) {
  const gradient = BANDEIRA_CORES[bandeira];
  const isLightBg = bandeira === "elo";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br p-5 shadow-xl",
        gradient,
        isLightBg ? "text-black/90" : "text-white"
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_50%)]" />
      <div className="absolute right-0 top-0 h-24 w-24 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/10" />
      <div className="relative space-y-4">
        <div className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-80">
          Número do cartão
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-lg font-semibold tracking-wider">
            {numero}
          </span>
          <button
            type="button"
            onClick={() => onCopy(numero)}
            className="rounded-lg p-1.5 opacity-70 transition-opacity hover:opacity-100"
            title="Copiar"
          >
            {isCopied(numero) ? (
              <Check className="h-4 w-4 text-emerald-300" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="text-[9px] font-medium uppercase tracking-wider opacity-70">
              Validade
            </div>
            <div className="flex items-center gap-1">
              <span className="font-mono text-sm font-semibold">{validade}</span>
            <button
              type="button"
              onClick={() => onCopy(validade)}
              className="rounded p-0.5 opacity-60 hover:opacity-100"
            >
              {isCopied(validade) ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
            </div>
          </div>
          <div>
            <div className="text-[9px] font-medium uppercase tracking-wider opacity-70">
              CVV
            </div>
            <div className="flex items-center gap-1">
              <span className="font-mono text-sm font-semibold">{cvv}</span>
            <button
              type="button"
              onClick={() => onCopy(cvv)}
              className="rounded p-0.5 opacity-60 hover:opacity-100"
            >
              {isCopied(cvv) ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
            </div>
          </div>
        </div>
        <div>
          <div className="text-[9px] font-medium uppercase tracking-wider opacity-70">
            Nome no cartão
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold tracking-wider">{nomeTitular}</span>
            <button
              type="button"
              onClick={() => onCopy(nomeTitular)}
              className="rounded p-0.5 opacity-60 hover:opacity-100"
            >
              {isCopied(nomeTitular) ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
