import { useState, useCallback } from "react";

export function useCopyToClipboard() {
  const [lastCopiedValue, setLastCopiedValue] = useState<string | null>(null);

  const markAsCopied = useCallback((text: string) => {
    setLastCopiedValue(text);
    setTimeout(() => setLastCopiedValue(null), 2000);
  }, []);

  const fallbackCopy = useCallback((text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "true");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);
    return copied;
  }, []);

  const copy = useCallback(async (text: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        markAsCopied(text);
        return true;
      }
      const copied = fallbackCopy(text);
      if (copied) {
        markAsCopied(text);
      }
      return copied;
    } catch {
      const copied = fallbackCopy(text);
      if (copied) {
        markAsCopied(text);
      }
      return copied;
    }
  }, [fallbackCopy, markAsCopied]);

  const isCopied = useCallback(
    (value: string) => lastCopiedValue === value,
    [lastCopiedValue]
  );

  return { copy, isCopied };
}
