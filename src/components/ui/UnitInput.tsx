import type { LengthUnit } from "../../types";
import { unitOptions } from "../units";
import { useI18n } from "../../i18n";

interface UnitInputProps {
  id?: string;
  label: string;
  value: number;
  unit: LengthUnit;
  onValueChange: (value: number) => void;
  onUnitChange: (unit: LengthUnit) => void;
  error?: string;
  warning?: string;
  placeholder?: string;
  step?: number;
}

export default function UnitInput({
  id,
  label,
  value,
  unit,
  onValueChange,
  onUnitChange,
  error,
  warning,
  placeholder = "0",
  step,
}: UnitInputProps) {
  const { t } = useI18n();
  return (
    <div>
      <label htmlFor={id} className="label-base">
        {t(label)}
      </label>
      <div className="flex gap-2">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          step={step ?? "any"}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onValueChange(e.target.value === "" ? NaN : Number(e.target.value))}
          placeholder={placeholder}
          aria-invalid={!!error}
          className="input-base flex-1"
        />
        <select
          value={unit}
          onChange={(e) => onUnitChange(e.target.value as LengthUnit)}
          aria-label={`${label} unit`}
          className="input-base w-32 flex-none"
        >
          {unitOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {t(o.label)}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="mt-1 text-xs font-medium text-terracotta-600">{error}</p>}
      {!error && warning && (
        <p className="mt-1 text-xs font-medium text-gold-600">{warning}</p>
      )}
    </div>
  );
}
