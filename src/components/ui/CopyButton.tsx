import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useI18n } from "../../i18n";

interface CopyButtonProps {
  text: string;
  label?: string;
}

export default function CopyButton({ text, label = "Copy" }: CopyButtonProps) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-temple-600 transition hover:bg-temple-50 hover:text-temple-800 focus:outline-none"
      aria-label={`${t(label)}: ${text}`}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? t("Copied") : t(label)}
    </button>
  );
}
