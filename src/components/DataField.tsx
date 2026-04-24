import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataFieldProps {
  label: string;
  value: string;
  onCopy: (value: string) => void;
  copied?: boolean;
  className?: string;
}

export function DataField({
  label,
  value,
  onCopy,
  copied,
  className,
}: DataFieldProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 rounded-xl border border-white/15 bg-white/[0.06] p-3",
        className
      )}
    >
      <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <span className="flex-1 truncate text-sm font-semibold text-foreground">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onCopy(value)}
          title="Copiar"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/15 hover:text-accent-purple"
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
