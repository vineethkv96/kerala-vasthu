import type { KolViralValue, LengthUnit } from "../../types";
import { unitOptions } from "../units";
import { useI18n } from "../../i18n";

interface KolViralInputProps {
  id?: string;
  label: string;
  value: KolViralValue;
  onChange: (value: KolViralValue) => void;
  error?: string;
  unit?: LengthUnit;
  onUnitChange?: (unit: LengthUnit) => void;
}

export default function KolViralInput({
  id,
  label,
  value,
  onChange,
  error,
  unit,
  onUnitChange,
}: KolViralInputProps) {
  const { t } = useI18n();
  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2">
        <span id={id} className="text-xs font-semibold uppercase tracking-wide text-temple-800/80">
          {t(label)}
        </span>
        {unit && onUnitChange && (
          <select
            value={unit}
            onChange={(e) => onUnitChange(e.target.value as LengthUnit)}
            aria-label={`${label} unit`}
            className="rounded-md border border-temple-900/15 bg-white px-2 py-1 text-xs text-temple-900 shadow-sm outline-none focus:border-temple-500 focus:ring-2 focus:ring-temple-500/25"
          >
            {unitOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {t(o.label)}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step="any"
            value={Number.isFinite(value.kol) ? value.kol : ""}
            onChange={(e) =>
              onChange({
                ...value,
                kol: e.target.value === "" ? NaN : Number(e.target.value),
              })
            }
            placeholder={t("Kol")}
            aria-label={`${label} Kol`}
            className="input-base"
          />
          <span className="mt-0.5 block text-[10px] uppercase tracking-wide text-temple-900/50">
            {t("Kol")}
          </span>
        </div>
        <div className="flex-1">
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step="any"
            value={Number.isFinite(value.viral) ? value.viral : ""}
            onChange={(e) =>
              onChange({
                ...value,
                viral: e.target.value === "" ? NaN : Number(e.target.value),
              })
            }
            placeholder={t("Viral")}
            aria-label={`${label} Viral`}
            className="input-base"
          />
          <span className="mt-0.5 block text-[10px] uppercase tracking-wide text-temple-900/50">
            {t("Viral")}
          </span>
        </div>
      </div>
      {error && <p className="mt-1 text-xs font-medium text-terracotta-600">{error}</p>}
    </div>
  );
}
