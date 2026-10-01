import { useMemo, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import type { ConverterUnit } from "../lib/converter";
import {
  converterToCm,
  converterFromCm,
  converterUnitLabels,
  formatConverterResult,
  formatFormula,
} from "../lib/converter";
import { kolViralToCm } from "../lib/units";
import ConversionResult from "./ConversionResult";
import FeetInchesInput from "./ui/FeetInchesInput";
import KolViralInput from "./ui/KolViralInput";
import { useI18n } from "../i18n";

const unitList: ConverterUnit[] = [
  "kol",
  "viral",
  "kolViral",
  "cm",
  "m",
  "mm",
  "in",
  "ft",
  "ftin",
];

const quickChips: { label: string; value: number; unit: ConverterUnit }[] = [
  { label: "1 Kol", value: 1, unit: "kol" },
  { label: "1 Viral", value: 1, unit: "viral" },
  { label: "1 metre", value: 1, unit: "m" },
  { label: "1 foot", value: 1, unit: "ft" },
  { label: "10 feet", value: 10, unit: "ft" },
  { label: "100 cm", value: 100, unit: "cm" },
];

export default function UnitConverter() {
  const { t } = useI18n();
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState<ConverterUnit>("kolViral");
  const [to, setTo] = useState<ConverterUnit>("cm");
  const [feet, setFeet] = useState(1);
  const [inches, setInches] = useState(0);
  const [kol, setKol] = useState(1);
  const [viral, setViral] = useState(0);

  const fromIsFtIn = from === "ftin";
  const toIsFtIn = to === "ftin";
  const fromIsKolViral = from === "kolViral";
  const toIsKolViral = to === "kolViral";

  const cm = useMemo(() => {
    if (fromIsFtIn) {
      return (feet || 0) * 30.48 + (inches || 0) * 2.54;
    }
    if (fromIsKolViral) {
      return kolViralToCm(kol || 0, viral || 0);
    }
    return converterToCm(value, from);
  }, [from, value, fromIsFtIn, feet, inches, fromIsKolViral, kol, viral]);

  const result = useMemo(() => formatConverterResult(cm, to), [cm, to]);
  const resultNumber = converterFromCm(cm, to);
  const formula = useMemo(() => {
    if (fromIsFtIn) {
      return `${feet} ft ${inches} in = ${result}`;
    }
    if (fromIsKolViral) {
      return `${kol} Kol ${viral} Viral = ${result}`;
    }
    return formatFormula(value, from, to);
  }, [fromIsFtIn, feet, inches, fromIsKolViral, kol, viral, value, from, to, result]);

  function swap() {
    setFrom(to);
    setTo(from);
    setValue(Number.isFinite(resultNumber) ? Number(resultNumber.toFixed(4)) : 1);
  }

  return (
    <div className="card p-5">
      <h2 className="mb-4 text-sm font-semibold text-temple-900">
        {t("Single-value converter")}
      </h2>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div>
          <label htmlFor="conv-value" className="label-base">
            {t("Value")}
          </label>
          {fromIsFtIn ? (
            <FeetInchesInput
              label="Value (feet & inches)"
              value={{ feet, inches }}
              onChange={(v) => {
                setFeet(v.feet);
                setInches(v.inches);
              }}
            />
          ) : fromIsKolViral ? (
            <KolViralInput
              label="Value (Kol & Viral)"
              value={{ kol, viral }}
              onChange={(v) => {
                setKol(v.kol);
                setViral(v.viral);
              }}
            />
          ) : (
            <input
              id="conv-value"
              type="number"
              inputMode="decimal"
              step="any"
              value={Number.isFinite(value) ? value : ""}
              onChange={(e) => setValue(e.target.value === "" ? NaN : Number(e.target.value))}
              className="input-base"
            />
          )}
          <label htmlFor="conv-from" className="label-base mt-3">
            {t("From")}
          </label>
          <select
            id="conv-from"
            value={from}
            onChange={(e) => setFrom(e.target.value as ConverterUnit)}
            className="input-base"
          >
            {unitList.map((u) => (
              <option key={u} value={u}>
                {t(converterUnitLabels[u])}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={swap}
          className="btn-secondary mx-auto my-1 h-10 w-10 rounded-full p-0"
          aria-label={t("Swap units")}
        >
          <ArrowLeftRight className="h-4 w-4" />
        </button>

        <div>
          <label htmlFor="conv-to" className="label-base">
            {t("To")}
          </label>
          <select
            id="conv-to"
            value={to}
            onChange={(e) => setTo(e.target.value as ConverterUnit)}
            className="input-base"
          >
            {unitList.map((u) => (
              <option key={u} value={u}>
                {t(converterUnitLabels[u])}
              </option>
            ))}
          </select>
          {toIsFtIn && (
            <p className="mt-2 text-xs text-temple-800/70">
              {t("Feet & inches shown as a combined value.")}
            </p>
          )}
          {toIsKolViral && (
            <p className="mt-2 text-xs text-temple-800/70">
              {t("Shown as a combined Kol + Viral value.")}
            </p>
          )}
        </div>
      </div>

      {Number.isFinite(cm) && (
        <div className="mt-4">
          <ConversionResult value={result} formula={formula} />
        </div>
      )}

      <div className="mt-4">
        <p className="label-base">{t("Quick conversions")}</p>
        <div className="flex flex-wrap gap-2">
          {quickChips.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={() => {
                setFrom(c.unit);
                setValue(c.value);
              }}
              className="chip"
            >
              {t(c.label)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
