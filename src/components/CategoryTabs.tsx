import { User, FileText, CreditCard, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export type Category = "pessoa" | "docs" | "cartao" | "endereco";

interface CategoryTabsProps {
  active: Category;
  onSelect: (category: Category) => void;
}

const tabs: { id: Category; label: string; icon: React.ElementType }[] = [
  { id: "pessoa", label: "Pessoa", icon: User },
  { id: "docs", label: "Docs", icon: FileText },
  { id: "cartao", label: "Cartão", icon: CreditCard },
  { id: "endereco", label: "Endereço", icon: MapPin },
];

export function CategoryTabs({ active, onSelect }: CategoryTabsProps) {
  return (
    <div className="flex w-full shrink-0 gap-0.5 overflow-x-auto overflow-y-hidden rounded-lg border border-white/5 bg-white/[0.02] p-0.5">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={cn(
            "flex flex-1 min-w-0 items-center justify-center gap-1.5 rounded-md px-2 py-2 text-xs font-medium transition-all",
            active === id
              ? "bg-white/10 text-foreground shadow-sm"
              : "text-muted-foreground hover:bg-white/5 hover:text-accent-purple"
          )}
        >
          <Icon className="h-3.5 w-3.5 shrink-0" />
          {label}
        </button>
      ))}
    </div>
  );
}
