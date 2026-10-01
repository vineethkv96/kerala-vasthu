import { cmToKolViral } from "../lib/units";
import { fmt } from "../lib/format";
import CopyButton from "./ui/CopyButton";
import { useI18n } from "../i18n";

interface PerimeterResultCardProps {
  perimeterCm: number;
}

export default function PerimeterResultCard({ perimeterCm }: PerimeterResultCardProps) {
  const { t } = useI18n();
  if (!Number.isFinite(perimeterCm) || perimeterCm <= 0) return null;
  const kv = cmToKolViral(perimeterCm);

  const rows = [
    { label: t("Kol + Viral"), value: `${kv.kol} Kol ${fmt(kv.viral, 2)} Viral` },
    { label: t("Centimetres"), value: `${fmt(perimeterCm, 2)} cm` },
    { label: t("Metres"), value: `${fmt(perimeterCm / 100, 2)} m` },
  ];

  return (
    <div className="card p-4">
      <h3 className="mb-2 text-sm font-semibold text-temple-900">{t("Perimeter")}</h3>
      <dl className="divide-y divide-temple-900/5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between py-1.5">
            <dt className="text-xs text-temple-800/70">{r.label}</dt>
            <dd className="flex items-center gap-1 text-sm font-medium text-temple-900">
              {r.value}
              <CopyButton text={r.value} label="" />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
