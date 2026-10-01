import type {
  AyadiBasis,
  BaseUnit,
  LengthUnit,
  RoundingMode,
} from "../types";
import { unitOptions } from "./units";
import { useI18n } from "../i18n";

interface AyadiInputFormProps {
  length: number;
  lengthUnit: LengthUnit;
  width: number;
  widthUnit: LengthUnit;
  basis: AyadiBasis;
  customBase: number;
  baseUnit: BaseUnit;
  roundingMode: RoundingMode;
  onLengthChange: (v: number) => void;
  onLengthUnitChange: (u: LengthUnit) => void;
  onWidthChange: (v: number) => void;
  onWidthUnitChange: (u: LengthUnit) => void;
  onBasisChange: (b: AyadiBasis) => void;
  onCustomBaseChange: (v: number) => void;
  onBaseUnitChange: (u: BaseUnit) => void;
  onRoundingModeChange: (m: RoundingMode) => void;
}

const basisOptions: { value: AyadiBasis; label: string }[] = [
  { value: "length", label: "Length only" },
  { value: "width", label: "Width only" },
  { value: "perimeter", label: "Perimeter" },
  { value: "area", label: "Area" },
  { value: "custom", label: "Custom Ayadi Base Value" },
];

const baseUnitOptions: { value: BaseUnit; label: string }[] = [
  { value: "viral", label: "Viral" },
  { value: "kol", label: "Kol" },
  { value: "cm", label: "Centimetres" },
];

const roundingOptions: { value: RoundingMode; label: string }[] = [
  { value: "nearest", label: "Nearest Viral" },
  { value: "exact", label: "Exact Viral value" },
  { value: "floor", label: "Floored to Viral" },
  { value: "ceil", label: "Ceiled to Viral" },
];

export default function AyadiInputForm({
  length,
  lengthUnit,
  width,
  widthUnit,
  basis,
  customBase,
  baseUnit,
  roundingMode,
  onLengthChange,
  onLengthUnitChange,
  onWidthChange,
  onWidthUnitChange,
  onBasisChange,
  onCustomBaseChange,
  onBaseUnitChange,
  onRoundingModeChange,
}: AyadiInputFormProps) {
  const { t } = useI18n();
  return (
    <div className="card p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ayadi-length" className="label-base">
            {t("Length")}
          </label>
          <div className="flex gap-2">
            <input
              id="ayadi-length"
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={Number.isFinite(length) ? length : ""}
              onChange={(e) => onLengthChange(e.target.value === "" ? NaN : Number(e.target.value))}
              className="input-base flex-1"
            />
            <select
              value={lengthUnit}
              onChange={(e) => onLengthUnitChange(e.target.value as LengthUnit)}
              aria-label="Length unit"
              className="input-base w-28 flex-none"
            >
              {unitOptions
                .filter((u) => u.value !== "feetInches" && u.value !== "kolViral")
                .map((o) => (
                  <option key={o.value} value={o.value}>
                    {t(o.label)}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="ayadi-width" className="label-base">
            {t("Width")}
          </label>
          <div className="flex gap-2">
            <input
              id="ayadi-width"
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={Number.isFinite(width) ? width : ""}
              onChange={(e) => onWidthChange(e.target.value === "" ? NaN : Number(e.target.value))}
              className="input-base flex-1"
            />
            <select
              value={widthUnit}
              onChange={(e) => onWidthUnitChange(e.target.value as LengthUnit)}
              aria-label="Width unit"
              className="input-base w-28 flex-none"
            >
              {unitOptions
                .filter((u) => u.value !== "feetInches" && u.value !== "kolViral")
                .map((o) => (
                  <option key={o.value} value={o.value}>
                    {t(o.label)}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="ayadi-basis" className="label-base">
            {t("Calculation basis")}
          </label>
          <select
            id="ayadi-basis"
            value={basis}
            onChange={(e) => onBasisChange(e.target.value as AyadiBasis)}
            className="input-base"
          >
            {basisOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {t(o.label)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ayadi-base-unit" className="label-base">
            {t("Traditional base unit")}
          </label>
          <select
            id="ayadi-base-unit"
            value={baseUnit}
            onChange={(e) => onBaseUnitChange(e.target.value as BaseUnit)}
            className="input-base"
          >
            {baseUnitOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {t(o.label)}
              </option>
            ))}
          </select>
        </div>

        {basis === "custom" && (
          <div>
            <label htmlFor="ayadi-custom" className="label-base">
              {t("Custom Ayadi base value")}
            </label>
            <input
              id="ayadi-custom"
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={Number.isFinite(customBase) ? customBase : ""}
              onChange={(e) =>
                onCustomBaseChange(e.target.value === "" ? NaN : Number(e.target.value))
              }
              className="input-base"
            />
          </div>
        )}

        <div>
          <label htmlFor="ayadi-rounding" className="label-base">
            {t("Rounding approach")}
          </label>
          <select
            id="ayadi-rounding"
            value={roundingMode}
            onChange={(e) => onRoundingModeChange(e.target.value as RoundingMode)}
            className="input-base"
          >
            {roundingOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {t(o.label)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
