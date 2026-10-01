import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronRight, RotateCcw, Save } from "lucide-react";
import type {
  AyadiBasis,
  AyadiFormulaSettings as AyadiFormulaSettingsType,
  BaseUnit,
  LengthUnit,
  RoundingMode,
  SavedAyadiCalculation,
} from "../types";
import AyadiInputForm from "../components/AyadiInputForm";
import AyadiFormulaSettings from "../components/AyadiFormulaSettings";
import AyadiResultsTable from "../components/AyadiResultsTable";
import SaveCalculationModal from "../components/SaveCalculationModal";
import DisclaimerCard from "../components/ui/DisclaimerCard";
import {
  defaultAyadiSettings,
  runAllAyadiFactors,
} from "../lib/ayadi";
import {
  calculateArea,
  calculatePerimeter,
  toCm,
  cmToViral,
  cmToKol,
} from "../lib/units";
import { fmt } from "../lib/format";
import { addSaved, makeId } from "../lib/storage";
import { unitLabel } from "../components/units";
import { useI18n } from "../i18n";

const baseUnitDivisor: Record<BaseUnit, number> = {
  viral: 3,
  kol: 72,
  cm: 1,
};

function roundBase(raw: number, mode: RoundingMode): number {
  switch (mode) {
    case "exact":
      return raw;
    case "nearest":
      return Math.round(raw);
    case "floor":
      return Math.floor(raw);
    case "ceil":
      return Math.ceil(raw);
  }
}

function roundBaseLabel(mode: RoundingMode): string {
  switch (mode) {
    case "exact":
      return "Exact Viral value";
    case "nearest":
      return "Rounded to nearest Viral";
    case "floor":
      return "Floored to Viral";
    case "ceil":
      return "Ceiled to Viral";
  }
}

export default function AyadiCalculator({
  initial,
  onConsumed,
}: {
  initial?: SavedAyadiCalculation | null;
  onConsumed?: () => void;
}) {
  const { t } = useI18n();
  const tu = (u: LengthUnit) => t(unitLabel(u));
  const [length, setLength] = useState(10);
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>("feet");
  const [width, setWidth] = useState(12);
  const [widthUnit, setWidthUnit] = useState<LengthUnit>("feet");
  const [basis, setBasis] = useState<AyadiBasis>("length");
  const [customBase, setCustomBase] = useState(0);
  const [baseUnit, setBaseUnit] = useState<BaseUnit>("viral");
  const [roundingMode, setRoundingMode] = useState<RoundingMode>("nearest");
  const [settings, setSettings] = useState<AyadiFormulaSettingsType>(() => ({
    factors: defaultAyadiSettings.factors.map((f) => ({
      ...f,
      interpretation: [...f.interpretation],
    })),
  }));
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);

  useEffect(() => {
    if (!initial) return;
    setLength(initial.length);
    setLengthUnit(initial.lengthUnit);
    setWidth(initial.width);
    setWidthUnit(initial.widthUnit);
    setBasis(initial.basis);
    setCustomBase(initial.customBase);
    setBaseUnit(initial.baseUnit);
    setRoundingMode(initial.roundingMode);
    onConsumed?.();
  }, [initial, onConsumed]);

  const lengthCm = toCm(length, lengthUnit);
  const widthCm = toCm(width, widthUnit);
  const lengthValid = Number.isFinite(length) && length > 0;
  const widthValid = Number.isFinite(width) && width > 0;

  const { workingLabel, baseValue, rawBase, isFractional } =
    useMemo(() => {
      const divisor = baseUnitDivisor[baseUnit];
      if (basis === "custom") {
        const raw = Number.isFinite(customBase) ? customBase : 0;
        return {
          workingCm: raw * divisor,
          workingLabel: `Custom base value (${raw} in ${baseUnit})`,
          baseValue: roundBase(raw, roundingMode),
          rawBase: raw,
          isFractional: raw % 1 !== 0,
        };
      }
      let wcm = 0;
      let wlabel = "";
      if (basis === "length") {
        wcm = lengthCm;
        wlabel = `Length (${fmt(length, 2)} ${unitLabel(lengthUnit)})`;
      } else if (basis === "width") {
        wcm = widthCm;
        wlabel = `Width (${fmt(width, 2)} ${unitLabel(widthUnit)})`;
      } else if (basis === "perimeter") {
        wcm = calculatePerimeter(lengthCm, widthCm);
        wlabel = `Perimeter (2 × (${fmt(lengthCm, 2)} + ${fmt(widthCm, 2)}) cm)`;
      } else if (basis === "area") {
        wcm = calculateArea(lengthCm, widthCm).sqCm;
        wlabel = `Area (${fmt(lengthCm, 2)} × ${fmt(widthCm, 2)} cm²)`;
      }
      const raw = wcm / divisor;
      return {
        workingCm: wcm,
        workingLabel: wlabel,
        baseValue: roundBase(raw, roundingMode),
        rawBase: raw,
        isFractional: raw % 1 !== 0,
      };
    }, [basis, baseUnit, customBase, roundingMode, lengthCm, widthCm, length, lengthUnit, width, widthUnit]);

  const results = useMemo(
    () => runAllAyadiFactors(baseValue, settings),
    [baseValue, settings],
  );

  const aaya = results.find((r) => r.id === "aaya");
  const vyaya = results.find((r) => r.id === "vyaya");

  const canCompute = basis === "custom" ? Number.isFinite(customBase) && customBase > 0 : lengthValid && widthValid;

  function reset() {
    setLength(10);
    setLengthUnit("feet");
    setWidth(12);
    setWidthUnit("feet");
    setBasis("length");
    setCustomBase(0);
    setBaseUnit("viral");
    setRoundingMode("nearest");
    setSettings({
      factors: defaultAyadiSettings.factors.map((f) => ({
        ...f,
        interpretation: [...f.interpretation],
      })),
    });
  }

  function handleSave(values: { projectName: string; note: string }) {
    const record: SavedAyadiCalculation = {
      id: makeId(),
      type: "ayadi",
      projectName: values.projectName,
      note: values.note,
      length,
      lengthUnit,
      width,
      widthUnit,
      basis,
      customBase,
      baseUnit,
      roundingMode,
      savedAt: new Date().toISOString(),
    };
    addSaved(record);
    setSaveOpen(false);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-temple-900">{t("Ayadi Calculator")}</h1>
        <p className="mt-1 text-sm text-temple-800/70">
          {t(
            "Traditional proportional calculations with transparent, configurable formulas.",
          )}
        </p>
      </header>

      <AyadiInputForm
        length={length}
        lengthUnit={lengthUnit}
        width={width}
        widthUnit={widthUnit}
        basis={basis}
        customBase={customBase}
        baseUnit={baseUnit}
        roundingMode={roundingMode}
        onLengthChange={setLength}
        onLengthUnitChange={setLengthUnit}
        onWidthChange={setWidth}
        onWidthUnitChange={setWidthUnit}
        onBasisChange={setBasis}
        onCustomBaseChange={setCustomBase}
        onBaseUnitChange={setBaseUnit}
        onRoundingModeChange={setRoundingMode}
      />

      <AyadiFormulaSettings settings={settings} onChange={setSettings} />

      {canCompute && (
        <section className="space-y-4">
          <div className="card p-4">
            <h2 className="mb-2 text-sm font-semibold text-temple-900">
              {t("Converted base value used in calculation")}
            </h2>
            <p className="text-sm text-temple-800">
              {workingLabel} → <span className="font-semibold">{fmt(rawBase, 2)} {baseUnit}</span>
            </p>
            <p className="mt-1 text-xs text-temple-800/70">
              {t("Rounding approach")}: {t(roundBaseLabel(roundingMode))} → base value used:{" "}
              <span className="font-semibold">{fmt(baseValue, 2)}</span>
            </p>
            {isFractional && (
              <div className="mt-2 rounded-lg border border-gold-200 bg-gold-50 p-2 text-xs text-gold-800">
                {t("This calculation uses a fractional Viral value.")}
              </div>
            )}
          </div>

          <AyadiResultsTable results={results} baseValue={baseValue} />

          <div className="card space-y-2 p-4">
            <h3 className="text-sm font-semibold text-temple-900">{t("Summary")}</h3>
            <p className="text-sm text-temple-800">
              {t("Aaya value")}: <span className="font-semibold">{aaya?.remainder}</span>{" "}
              <span className="text-temple-800/60">({t("Aaya remainder")})</span>
            </p>
            <p className="text-sm text-temple-800">
              {t("Vyaya value")}: <span className="font-semibold">{vyaya?.remainder}</span>{" "}
              <span className="text-temple-800/60">({t("Vyaya remainder")})</span>
            </p>
            {aaya && vyaya && (
              <p className="text-sm text-temple-800">
                {t("Aaya versus Vyaya")}:{" "}
                <span className="font-semibold">
                  {aaya.remainder > vyaya.remainder
                    ? t("Aaya is greater than Vyaya")
                    : aaya.remainder < vyaya.remainder
                      ? t("Vyaya is greater than Aaya")
                      : t("Aaya and Vyaya are equal")}
                </span>
              </p>
            )}
            <p className="rounded-lg bg-temple-50 p-3 text-xs leading-relaxed text-temple-800">
              {t(
                "Some traditions consider Aaya greater than Vyaya favourable. Interpretations can differ, so use this result as a consultation aid rather than a final decision.",
              )}
            </p>
          </div>

          <div className="no-print flex items-center gap-2">
            <button type="button" onClick={() => setSaveOpen(true)} className="btn-primary">
              <Save className="h-4 w-4" />
              {t("Save Calculation")}
            </button>
            <button type="button" onClick={reset} className="btn-secondary">
              <RotateCcw className="h-4 w-4" />
              {t("Reset")}
            </button>
          </div>

          <div className="card p-4">
            <button
              type="button"
              onClick={() => setDetailsOpen((o) => !o)}
              className="flex items-center gap-1 text-sm font-semibold text-temple-900 focus:outline-none"
              aria-expanded={detailsOpen}
            >
              {detailsOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              {t("Calculation Details")}
            </button>
            {detailsOpen && (
              <dl className="mt-3 grid gap-1 text-sm text-temple-800">
                <div className="flex justify-between gap-2">
                  <dt className="text-temple-800/70">{t("Original dimensions")}</dt>
                  <dd>
                    {fmt(length, 2)} {tu(lengthUnit)} × {fmt(width, 2)}{" "}
                    {tu(widthUnit)}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-temple-800/70">{t("Length")}</dt>
                  <dd>
                    {fmt(lengthCm, 2)} cm = {fmt(cmToViral(lengthCm), 2)} Viral ={" "}
                    {fmt(cmToKol(lengthCm), 2)} Kol
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-temple-800/70">{t("Width")}</dt>
                  <dd>
                    {fmt(widthCm, 2)} cm = {fmt(cmToViral(widthCm), 2)} Viral ={" "}
                    {fmt(cmToKol(widthCm), 2)} Kol
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-temple-800/70">{t("Calculation basis")}</dt>
                  <dd>{workingLabel}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-temple-800/70">Base value ({baseUnit})</dt>
                  <dd>
                    raw {fmt(rawBase, 4)} → {t(roundBaseLabel(roundingMode))} →{" "}
                    {fmt(baseValue, 2)}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-temple-800/70">{t("Formula steps")}</dt>
                  <dd className="text-right">
                    {settings.factors.map((f) => (
                      <span key={f.id} className="block">
                        {t(f.name)}: {fmt(baseValue, 2)} × {f.multiplier} ÷ {f.divisor}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-temple-800/70">{t("Formula preset")}</dt>
                  <dd>Default editable configuration</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-temple-800/70">{t("Date and time")}</dt>
                  <dd>{new Date().toLocaleString()}</dd>
                </div>
              </dl>
            )}
          </div>
        </section>
      )}

      <DisclaimerCard>
        {t(
          "Ayadi formulas and interpretations vary by Kerala Vasthu tradition, region, lineage, and consultant. Verify the preferred local tradition with a qualified Vasthu consultant. No result is guaranteed or absolute.",
        )}
      </DisclaimerCard>

      <SaveCalculationModal
        open={saveOpen}
        onClose={() => setSaveOpen(false)}
        onSave={handleSave}
        initial={{ projectName: "Ayadi calculation", note: "" }}
      />
    </div>
  );
}
