import CopyButton from "./ui/CopyButton";
import { useI18n } from "../i18n";

interface ConversionResultProps {
  value: string;
  formula: string;
}

export default function ConversionResult({ value, formula }: ConversionResultProps) {
  const { t } = useI18n();
  return (
    <div className="rounded-xl bg-temple-50 p-4 ring-1 ring-temple-900/10">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-temple-800/70">
          {t("Result")}
        </span>
        <CopyButton text={value} />
      </div>
      <p className="mt-1 text-2xl font-bold text-temple-900">{value}</p>
      <p className="mt-1 text-xs text-temple-800/70">{formula}</p>
    </div>
  );
}
