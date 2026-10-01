import { useMemo, useState } from "react";
import ConversionResult from "./ConversionResult";
import { cmToFeetInches, cmToKolViral } from "../lib/units";
import { fmt } from "../lib/format";
import { useI18n } from "../i18n";

type ConversionType =
  | "ftToM"
  | "mToFt"
  | "ftToCm"
  | "cmToFt"
  | "ftToKol"
  | "kolToFt"
  | "kolToM"
  | "mToKol"
  | "viralToCm"
  | "cmToViral"
  | "kolViralToCm"
  | "cmToKolViral";

const conversionTypes: { value: ConversionType; label: string }[] = [
  { value: "ftToM", label: "Feet to metres" },
  { value: "mToFt", label: "Metres to feet" },
  { value: "ftToCm", label: "Feet to centimetres" },
  { value: "cmToFt", label: "Centimetres to feet" },
  { value: "ftToKol", label: "Feet to Kol" },
  { value: "kolToFt", label: "Kol to feet" },
  { value: "kolToM", label: "Kol to metres" },
  { value: "mToKol", label: "Metres to Kol" },
  { value: "viralToCm", label: "Viral to centimetres" },
  { value: "cmToViral", label: "Centimetres to Viral" },
  { value: "kolViralToCm", label: "Kol + Viral to centimetres" },
  { value: "cmToKolViral", label: "Centimetres to Kol + Viral" },
];

export default function FeetMetreCalculator() {
  const { t } = useI18n();
  const [type, setType] = useState<ConversionType>("ftToM");
  const [value, setValue] = useState(1);
  const [kol, setKol] = useState(4);
  const [viral, setViral] = useState(12);

  const { result, formula } = useMemo(() => {
    const v = Number.isFinite(value) ? value : 0;
    let r = "";
    let f = "";
    switch (type) {
      case "ftToM":
        r = `${fmt(v * 0.3048, 4)} m`;
        f = `${v} ft × 0.3048 = ${r}`;
        break;
      case "mToFt":
        r = `${fmt(v / 0.3048, 4)} ft`;
        f = `${v} m ÷ 0.3048 = ${r}`;
        break;
      case "ftToCm":
        r = `${fmt(v * 30.48, 2)} cm`;
        f = `${v} ft × 30.48 = ${r}`;
        break;
      case "cmToFt":
        r = `${fmt(v / 30.48, 4)} ft`;
        f = `${v} cm ÷ 30.48 = ${r}`;
        break;
      case "ftToKol":
        r = `${fmt(v * 30.48 / 72, 4)} Kol`;
        f = `${v} ft → ${fmt(v * 30.48, 2)} cm ÷ 72 = ${r}`;
        break;
      case "kolToFt":
        r = `${fmt(v * 72 / 30.48, 4)} ft`;
        f = `${v} Kol → ${fmt(v * 72, 2)} cm ÷ 30.48 = ${r}`;
        break;
      case "kolToM":
        r = `${fmt(v * 72 / 100, 4)} m`;
        f = `${v} Kol → ${fmt(v * 72, 2)} cm ÷ 100 = ${r}`;
        break;
      case "mToKol":
        r = `${fmt(v * 100 / 72, 4)} Kol`;
        f = `${v} m → ${fmt(v * 100, 2)} cm ÷ 72 = ${r}`;
        break;
      case "viralToCm":
        r = `${fmt(v * 3, 2)} cm`;
        f = `${v} Viral × 3 = ${r}`;
        break;
      case "cmToViral":
        r = `${fmt(v / 3, 4)} Viral`;
        f = `${v} cm ÷ 3 = ${r}`;
        break;
      case "kolViralToCm":
        r = `${fmt(v * 72, 2)} cm`;
        f = `${v} Kol → ${fmt(v * 72, 2)} cm`;
        break;
      case "cmToKolViral": {
        const kv = cmToKolViral(v);
        r = `${kv.kol} Kol ${fmt(kv.viral, 2)} Viral`;
        f = `${v} cm ÷ 3 = ${fmt(v / 3, 2)} Viral → ${r}`;
        break;
      }
    }
    return { result: r, formula: f };
  }, [type, value]);

  const combinedCm = (kol || 0) * 72 + (viral || 0) * 3;
  const combinedFi = cmToFeetInches(combinedCm);
  const combinedText =
    `${kol || 0} Kol + ${viral || 0} Viral = ` +
    `${fmt(combinedCm, 2)} cm = ${fmt(combinedCm / 100, 2)} m = ` +
    `approx ${fmt(combinedCm / 30.48, 2)} ft = ` +
    `approx ${combinedFi.feet} ft ${fmt(combinedFi.inches, 1)} in`;

  return (
    <div className="card p-5">
      <h2 className="mb-4 text-sm font-semibold text-temple-900">
        {t("Feet and metre quick calculator")}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="quick-type" className="label-base">
            {t("Conversion")}
          </label>
          <select
            id="quick-type"
            value={type}
            onChange={(e) => setType(e.target.value as ConversionType)}
            className="input-base"
          >
            {conversionTypes.map((c) => (
              <option key={c.value} value={c.value}>
                {t(c.label)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="quick-value" className="label-base">
            {t("Value")}
          </label>
          <input
            id="quick-value"
            type="number"
            inputMode="decimal"
            step="any"
            value={Number.isFinite(value) ? value : ""}
            onChange={(e) => setValue(e.target.value === "" ? NaN : Number(e.target.value))}
            className="input-base"
          />
        </div>
      </div>

      <div className="mt-4">
        <ConversionResult value={result} formula={formula} />
      </div>

      <div className="mt-6 border-t border-temple-900/10 pt-4">
        <h3 className="mb-3 text-sm font-semibold text-temple-900">
          {t("Combined Kol + Viral")}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="comb-kol" className="label-base">
              {t("Kol")}
            </label>
            <input
              id="comb-kol"
              type="number"
              inputMode="decimal"
              step="any"
              min={0}
              value={Number.isFinite(kol) ? kol : ""}
              onChange={(e) => setKol(e.target.value === "" ? NaN : Number(e.target.value))}
              className="input-base"
            />
          </div>
          <div>
            <label htmlFor="comb-viral" className="label-base">
              {t("Viral")}
            </label>
            <input
              id="comb-viral"
              type="number"
              inputMode="decimal"
              step="any"
              min={0}
              value={Number.isFinite(viral) ? viral : ""}
              onChange={(e) => setViral(e.target.value === "" ? NaN : Number(e.target.value))}
              className="input-base"
            />
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-temple-50 p-4 ring-1 ring-temple-900/10">
          <p className="text-xs text-temple-800/70">Total = Kol × 72 cm + Viral × 3 cm</p>
          <p className="mt-1 text-sm font-medium text-temple-900">{combinedText}</p>
        </div>
      </div>
    </div>
  );
}
