import type { AreaResult } from "../lib/units";
import { fmt } from "../lib/format";
import CopyButton from "./ui/CopyButton";
import { useI18n } from "../i18n";

interface AreaResultCardProps {
  area: AreaResult;
}

export default function AreaResultCard({ area }: AreaResultCardProps) {
  const { t } = useI18n();
  const rows = [
    { label: t("Square feet"), value: `${fmt(area.sqFoot, 2)} sq ft` },
    { label: t("Square metres"), value: `${fmt(area.sqMetre, 2)} m²` },
    { label: t("Square centimetres"), value: `${fmt(area.sqCm, 0)} cm²` },
  ];

  return (
    <div className="card p-4">
      <h3 className="mb-2 text-sm font-semibold text-temple-900">{t("Area")}</h3>
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
