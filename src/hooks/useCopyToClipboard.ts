import { useState, useCallback } from "react";

export function useCopyToClipboard() {
  const [lastCopiedValue, setLastCopiedValue] = useState<string | null>(null);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setLastCopiedValue(text);
      setTimeout(() => setLastCopiedValue(null), 2000);
      return true;
    } catch {
      return false;
    }
  }, []);

  const isCopied = useCallback(
    (value: string) => lastCopiedValue === value,
    [lastCopiedValue]
  );

  return { copy, isCopied };
}
