import type { FeetInchesValue, LengthUnit } from "../../types";
import { unitOptions } from "../units";
import { useI18n } from "../../i18n";

interface FeetInchesInputProps {
  id?: string;
  label: string;
  value: FeetInchesValue;
  onChange: (value: FeetInchesValue) => void;
  error?: string;
  unit?: LengthUnit;
  onUnitChange?: (unit: LengthUnit) => void;
}

export default function FeetInchesInput({
  id,
  label,
  value,
  onChange,
  error,
  unit,
  onUnitChange,
}: FeetInchesInputProps) {
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
            value={Number.isFinite(value.feet) ? value.feet : ""}
            onChange={(e) =>
              onChange({
                ...value,
                feet: e.target.value === "" ? NaN : Number(e.target.value),
              })
            }
            placeholder={t("Feet")}
            aria-label={`${label} feet`}
            className="input-base"
          />
          <span className="mt-0.5 block text-[10px] uppercase tracking-wide text-temple-900/50">
            {t("Feet")}
          </span>
        </div>
        <div className="flex-1">
          <input
            type="number"
            inputMode="decimal"
            min={0}
            max={11}
            step="any"
            value={Number.isFinite(value.inches) ? value.inches : ""}
            onChange={(e) =>
              onChange({
                ...value,
                inches: e.target.value === "" ? NaN : Number(e.target.value),
              })
            }
            placeholder={t("Inches")}
            aria-label={`${label} inches`}
            className="input-base"
          />
          <span className="mt-0.5 block text-[10px] uppercase tracking-wide text-temple-900/50">
            {t("Inches")}
          </span>
        </div>
      </div>
      {error && <p className="mt-1 text-xs font-medium text-terracotta-600">{error}</p>}
    </div>
  );
}
