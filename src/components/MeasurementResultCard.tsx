import { cmToFeet, cmToFeetInches, cmToKol, cmToKolViral, cmToMetre, cmToViral } from "../lib/units";
import { fmt } from "../lib/format";
import CopyButton from "./ui/CopyButton";
import { useI18n } from "../i18n";

interface MeasurementResultCardProps {
  title: string;
  cm: number;
  sourceLabel?: string;
}

export default function MeasurementResultCard({
  title,
  cm,
  sourceLabel,
}: MeasurementResultCardProps) {
  const { t } = useI18n();
  if (!Number.isFinite(cm) || cm < 0) return null;
  const kolViral = cmToKolViral(cm);
  const fi = cmToFeetInches(cm);

  const rows = [
    { label: t("Kol"), value: `${fmt(cmToKol(cm), 2)} Kol` },
    { label: t("Viral"), value: `${fmt(cmToViral(cm), 2)} Viral` },
    {
      label: t("Kol + Viral"),
      value: `${kolViral.kol} Kol ${fmt(kolViral.viral, 2)} Viral`,
    },
    { label: t("Centimetres"), value: `${fmt(cm, 2)} cm` },
    { label: t("Metres"), value: `${fmt(cmToMetre(cm), 2)} m` },
    { label: t("Feet"), value: `${fmt(cmToFeet(cm), 2)} ft` },
    {
      label: t("Feet & inches"),
      value: `${fi.feet} ft ${fmt(fi.inches, 2)} in`,
    },
  ];

  return (
    <div className="card p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-temple-900">{t(title)}</h3>
        {sourceLabel && (
          <span className="rounded-full bg-temple-50 px-2 py-0.5 text-xs text-temple-700">
            {sourceLabel}
          </span>
        )}
      </div>
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
