import { cn } from "@/lib/utils";

interface FormatToggleProps {
  comMascara: boolean;
  onChange: (comMascara: boolean) => void;
}

export function FormatToggle({ comMascara, onChange }: FormatToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={comMascara}
      onClick={() => onChange(!comMascara)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors",
        comMascara ? "bg-[hsl(var(--accent-purple))]" : "bg-white/20"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform",
          comMascara ? "translate-x-5" : "translate-x-1"
        )}
      />
    </button>
  );
}
