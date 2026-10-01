import { AlertTriangle } from "lucide-react";
import { useI18n } from "../../i18n";

interface DisclaimerCardProps {
  title?: string;
  children: React.ReactNode;
  tone?: "default" | "warning";
}

export default function DisclaimerCard({
  title,
  children,
  tone = "default",
}: DisclaimerCardProps) {
  const { t } = useI18n();
  const isWarning = tone === "warning";
  return (
    <div
      className={`rounded-xl border p-4 text-sm leading-relaxed ${
        isWarning
          ? "border-gold-300 bg-gold-50 text-temple-900"
          : "border-temple-200 bg-temple-50 text-temple-800"
      }`}
    >
      <div className="mb-1 flex items-center gap-2 font-semibold">
        <AlertTriangle className={`h-4 w-4 ${isWarning ? "text-gold-600" : "text-temple-600"}`} />
        {t(title ?? "Planning guidance only")}
      </div>
      {children}
    </div>
  );
}
