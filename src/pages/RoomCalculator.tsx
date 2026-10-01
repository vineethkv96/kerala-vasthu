import { useEffect, useMemo, useState } from "react";
import { RotateCcw, Save } from "lucide-react";
import type {
  LengthUnit,
  RoomType,
  SavedRoomCalculation,
  Tolerance,
} from "../types";
import RoomDimensionForm, {
  type DimensionState,
  emptyDimension,
} from "../components/RoomDimensionForm";
import MeasurementResultCard from "../components/MeasurementResultCard";
import PerimeterResultCard from "../components/PerimeterResultCard";
import AreaResultCard from "../components/AreaResultCard";
import TraditionalAlignmentCard from "../components/TraditionalAlignmentCard";
import RoomReferenceTable from "../components/RoomReferenceTable";
import SaveCalculationModal from "../components/SaveCalculationModal";
import DisclaimerCard from "../components/ui/DisclaimerCard";
import {
  calculateArea,
  calculatePerimeter,
  feetInchesToCm,
  kolViralToCm,
  toCm,
  toleranceLabel,
} from "../lib/units";
import { fmt } from "../lib/format";
import { addSaved, makeId } from "../lib/storage";
import { defaultRoomRanges, type RoomRange } from "../lib/roomData";
import { unitLabel } from "../components/units";
import { useI18n } from "../i18n";

interface Preset {
  label: string;
  length: DimensionState;
  width: DimensionState;
}

const presets: Preset[] = [
  { label: "10 ft × 12 ft", length: { unit: "feet", value: 10, feet: NaN, inches: NaN, kol: NaN, viral: NaN }, width: { unit: "feet", value: 12, feet: NaN, inches: NaN, kol: NaN, viral: NaN } },
  { label: "12 ft × 14 ft", length: { unit: "feet", value: 12, feet: NaN, inches: NaN, kol: NaN, viral: NaN }, width: { unit: "feet", value: 14, feet: NaN, inches: NaN, kol: NaN, viral: NaN } },
  { label: "4 Kol × 5 Kol", length: { unit: "kol", value: 4, feet: NaN, inches: NaN, kol: NaN, viral: NaN }, width: { unit: "kol", value: 5, feet: NaN, inches: NaN, kol: NaN, viral: NaN } },
  { label: "5 Kol × 6 Kol", length: { unit: "kol", value: 5, feet: NaN, inches: NaN, kol: NaN, viral: NaN }, width: { unit: "kol", value: 6, feet: NaN, inches: NaN, kol: NaN, viral: NaN } },
  { label: "8 Kol × 10 Kol", length: { unit: "kol", value: 8, feet: NaN, inches: NaN, kol: NaN, viral: NaN }, width: { unit: "kol", value: 10, feet: NaN, inches: NaN, kol: NaN, viral: NaN } },
];

function dimToCm(dim: DimensionState): number {
  if (dim.unit === "feetInches") {
    return feetInchesToCm(dim.feet || 0, dim.inches || 0);
  }
  if (dim.unit === "kolViral") {
    return kolViralToCm(dim.kol || 0, dim.viral || 0);
  }
  return toCm(dim.value, dim.unit);
}

function dimHasInput(dim: DimensionState): boolean {
  if (dim.unit === "feetInches") {
    return Number.isFinite(dim.feet) || Number.isFinite(dim.inches);
  }
  if (dim.unit === "kolViral") {
    return Number.isFinite(dim.kol) || Number.isFinite(dim.viral);
  }
  return Number.isFinite(dim.value);
}

function dimIssues(dim: DimensionState, label: string): { error?: string; warning?: string } {
  if (!dimHasInput(dim)) return {};
  const cm = dimToCm(dim);
  if (cm < 0) return { error: `${label} cannot be negative.` };
  if (cm === 0) return { error: `${label} must be greater than zero.` };
  if (cm < 90) return { warning: `${label} is unusually small (${fmt(cm, 0)} cm).` };
  if (cm > 1500) return { warning: `${label} is unusually large (${fmt(cm, 0)} cm).` };
  return {};
}

function dimSourceLabel(dim: DimensionState): string {
  if (dim.unit === "feetInches") {
    const f = dim.feet || 0;
    const i = dim.inches || 0;
    return `${f} ft ${i} in`;
  }
  if (dim.unit === "kolViral") {
    const k = dim.kol || 0;
    const v = dim.viral || 0;
    return `${k} Kol ${v} Viral`;
  }
  return `${fmt(dim.value, 2)} ${unitLabel(dim.unit)}`;
}

export default function RoomCalculator({
  initial,
  onConsumed,
}: {
  initial?: SavedRoomCalculation | null;
  onConsumed?: () => void;
}) {
  const { t } = useI18n();
  const [roomType, setRoomType] = useState<RoomType>("Bedroom");
  const [length, setLength] = useState<DimensionState>({ ...emptyDimension, value: 10 });
  const [width, setWidth] = useState<DimensionState>({ ...emptyDimension, value: 12 });
  const [height, setHeight] = useState<DimensionState>({ ...emptyDimension });
  const [includeHeight, setIncludeHeight] = useState(false);
  const [tolerance, setTolerance] = useState<Tolerance>("practical");
  const [ranges, setRanges] = useState<RoomRange[]>(defaultRoomRanges);
  const [saveOpen, setSaveOpen] = useState(false);

  useEffect(() => {
    if (!initial) return;
    setRoomType(initial.roomType);
    setLength({
      unit: initial.lengthUnit,
      value: initial.length,
      feet: initial.feetInches?.length?.feet ?? NaN,
      inches: initial.feetInches?.length?.inches ?? NaN,
      kol: initial.kolViral?.length?.kol ?? NaN,
      viral: initial.kolViral?.length?.viral ?? NaN,
    });
    setWidth({
      unit: initial.widthUnit,
      value: initial.width,
      feet: initial.feetInches?.width?.feet ?? NaN,
      inches: initial.feetInches?.width?.inches ?? NaN,
      kol: initial.kolViral?.width?.kol ?? NaN,
      viral: initial.kolViral?.width?.viral ?? NaN,
    });
    if (initial.heightUnit || initial.height !== undefined) {
      setIncludeHeight(true);
      setHeight({
        unit: initial.heightUnit ?? "feet",
        value: initial.height ?? NaN,
        feet: initial.feetInches?.height?.feet ?? NaN,
        inches: initial.feetInches?.height?.inches ?? NaN,
        kol: initial.kolViral?.height?.kol ?? NaN,
        viral: initial.kolViral?.height?.viral ?? NaN,
      });
    } else {
      setIncludeHeight(false);
      setHeight({ ...emptyDimension });
    }
    onConsumed?.();
  }, [initial, onConsumed]);

  const lengthCm = dimToCm(length);
  const widthCm = dimToCm(width);
  const heightCm = dimToCm(height);

  const lengthValid = dimHasInput(length) && lengthCm > 0;
  const widthValid = dimHasInput(width) && widthCm > 0;
  const heightValid = includeHeight && dimHasInput(height) && heightCm > 0;

  const area = useMemo(
    () => (lengthValid && widthValid ? calculateArea(lengthCm, widthCm) : null),
    [lengthCm, widthCm, lengthValid, widthValid],
  );

  const perimeterCm =
    lengthValid && widthValid ? calculatePerimeter(lengthCm, widthCm) : 0;

  const canSave = lengthValid && widthValid;

  function applyPreset(p: Preset) {
    setLength({ ...p.length });
    setWidth({ ...p.width });
    setIncludeHeight(false);
  }

  function reset() {
    setRoomType("Bedroom");
    setLength({ ...emptyDimension, value: 10 });
    setWidth({ ...emptyDimension, value: 12 });
    setHeight({ ...emptyDimension });
    setIncludeHeight(false);
    setTolerance("practical");
  }

  function handleSave(values: { projectName: string; note: string }) {
    const record: SavedRoomCalculation = {
      id: makeId(),
      type: "room",
      projectName: values.projectName,
      note: values.note,
      roomType,
      length: length.value,
      lengthUnit: length.unit,
      width: width.value,
      widthUnit: width.unit,
      height: includeHeight ? height.value : undefined,
      heightUnit: includeHeight ? height.unit : undefined,
      feetInches: {
        length: length.unit === "feetInches" ? { feet: length.feet, inches: length.inches } : undefined,
        width: width.unit === "feetInches" ? { feet: width.feet, inches: width.inches } : undefined,
        height: includeHeight && height.unit === "feetInches" ? { feet: height.feet, inches: height.inches } : undefined,
      },
      kolViral: {
        length: length.unit === "kolViral" ? { kol: length.kol, viral: length.viral } : undefined,
        width: width.unit === "kolViral" ? { kol: width.kol, viral: width.viral } : undefined,
        height: includeHeight && height.unit === "kolViral" ? { kol: height.kol, viral: height.viral } : undefined,
      },
      savedAt: new Date().toISOString(),
    };
    addSaved(record);
    setSaveOpen(false);
  }

  const lengthIssue = dimIssues(length, "Length");
  const widthIssue = dimIssues(width, "Width");
  const heightIssue = includeHeight ? dimIssues(height, "Height") : {};

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-temple-900">{t("Room Size Calculator")}</h1>
        <p className="mt-1 text-sm text-temple-800/70">
          {t(
            "Enter dimensions and see Kol, Viral, feet, metres, area and traditional alignment instantly.",
          )}
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <button key={p.label} type="button" onClick={() => applyPreset(p)} className="chip">
            {p.label}
          </button>
        ))}
      </div>

      <RoomDimensionForm
        roomType={roomType}
        onRoomTypeChange={setRoomType}
        length={length}
        width={width}
        height={height}
        includeHeight={includeHeight}
        onToggleHeight={setIncludeHeight}
        onChange={(key, dim) => {
          if (key === "length") setLength(dim);
          if (key === "width") setWidth(dim);
          if (key === "height") setHeight(dim);
        }}
      />

      {(lengthIssue.error || widthIssue.error || heightIssue.error) && (
        <div className="rounded-lg border border-terracotta-200 bg-terracotta-50 p-3 text-xs text-terracotta-700">
          {[lengthIssue.error, widthIssue.error, heightIssue.error]
            .filter(Boolean)
            .map((m) => (
              <p key={m}>{m}</p>
            ))}
        </div>
      )}

      {canSave && (
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
      )}

      {canSave && (
        <section className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {lengthValid && (
              <MeasurementResultCard
                title="Length"
                cm={lengthCm}
                sourceLabel={dimSourceLabel(length)}
              />
            )}
            {widthValid && (
              <MeasurementResultCard
                title="Width"
                cm={widthCm}
                sourceLabel={dimSourceLabel(width)}
              />
            )}
          </div>
          {heightValid && (
            <MeasurementResultCard
              title="Height"
              cm={heightCm}
              sourceLabel={dimSourceLabel(height)}
            />
          )}
          {area && (
            <>
              <PerimeterResultCard perimeterCm={perimeterCm} />
              <AreaResultCard area={area} />
            </>
          )}
        </section>
      )}

      {canSave && (
        <section className="space-y-4">
          <div className="card p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-temple-900">
                {t("Traditional Dimension Check")}
              </h2>
              <label className="flex items-center gap-2 text-xs text-temple-800">
                {t("Tolerance")}
                <select
                  value={tolerance}
                  onChange={(e) => setTolerance(e.target.value as Tolerance)}
                  className="input-base w-auto"
                  aria-label={t("Tolerance")}
                >
                  <option value="strict">{t("Strict")}</option>
                  <option value="practical">{t("Practical")}</option>
                  <option value="flexible">{t("Flexible")}</option>
                </select>
              </label>
            </div>
            <p className="mb-3 text-xs text-temple-800/70">{t(toleranceLabel(tolerance))}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <TraditionalAlignmentCard
                label="Length"
                cm={lengthCm}
                tolerance={tolerance}
                unit={length.unit as LengthUnit}
              />
              <TraditionalAlignmentCard
                label="Width"
                cm={widthCm}
                tolerance={tolerance}
                unit={width.unit as LengthUnit}
              />
            </div>
            {(lengthIssue.warning || widthIssue.warning) && (
              <div className="mt-3 rounded-lg border border-gold-200 bg-gold-50 p-3 text-xs text-gold-800">
                {[lengthIssue.warning, widthIssue.warning].filter(Boolean).map((m) => (
                  <p key={m}>{m}</p>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <RoomReferenceTable ranges={ranges} onRangesChange={setRanges} />

      <DisclaimerCard>
        {t(
          "Room sizes are general planning guidance only. Confirm structural safety and local building rules with a qualified architect or engineer.",
        )}
      </DisclaimerCard>

      <SaveCalculationModal
        open={saveOpen}
        onClose={() => setSaveOpen(false)}
        onSave={handleSave}
        initial={{ projectName: roomType, note: "" }}
      />
    </div>
  );
}
