import type {
  SavedAyadiCalculation,
  SavedCalculation,
  SavedRoomCalculation,
} from "../types";
import {
  calculateArea,
  cmToKol,
  cmToKolViral,
  cmToViral,
  feetInchesToCm,
  kolViralToCm,
  toCm,
} from "../lib/units";
import { fmt } from "../lib/format";
import { defaultAyadiSettings, runAllAyadiFactors } from "../lib/ayadi";

function roomCm(saved: SavedRoomCalculation, dim: "length" | "width" | "height") {
  if (dim === "height" && saved.height === undefined) return null;
  const value = dim === "height" ? saved.height ?? 0 : saved[dim];
  const unit = dim === "height" ? saved.heightUnit ?? "feet" : saved[`${dim}Unit`];
  const fi = saved.feetInches?.[dim];
  if (unit === "feetInches") {
    return feetInchesToCm(fi?.feet ?? 0, fi?.inches ?? 0);
  }
  const kv = saved.kolViral?.[dim];
  if (unit === "kolViral") {
    return kolViralToCm(kv?.kol ?? 0, kv?.viral ?? 0);
  }
  return toCm(value, unit);
}

function baseUnitDivisor(baseUnit: string): number {
  return baseUnit === "viral" ? 3 : baseUnit === "kol" ? 72 : 1;
}

export default function PrintView({ saved }: { saved: SavedCalculation }) {
  const date = new Date(saved.savedAt).toLocaleString();

  return (
    <div className="print-area mx-auto max-w-2xl space-y-4 rounded-2xl bg-white p-6 shadow-card">
      <header className="border-b border-temple-900/10 pb-3">
        <h1 className="text-xl font-bold text-temple-900">
          Kerala Vasthu Calculator — {saved.type === "room" ? "Room" : "Ayadi"} Calculation
        </h1>
        <p className="text-sm text-temple-800">
          {saved.projectName}
          {saved.note ? ` — ${saved.note}` : ""}
        </p>
        <p className="mt-1 text-xs text-temple-800/60">Saved {date}</p>
      </header>

      {saved.type === "room" ? (
        <RoomPrintBody saved={saved} />
      ) : (
        <AyadiPrintBody saved={saved} />
      )}

      <footer className="border-t border-temple-900/10 pt-3 text-[11px] leading-relaxed text-temple-800/70">
        This tool provides traditional Kerala Vasthu calculation guidance for
        planning purposes. Consult a qualified Kerala Vasthu expert, architect,
        and structural engineer before finalizing a building plan.
      </footer>
    </div>
  );
}

function RoomPrintBody({ saved }: { saved: SavedRoomCalculation }) {
  const lengthCm = roomCm(saved, "length") ?? 0;
  const widthCm = roomCm(saved, "width") ?? 0;
  const heightCm = roomCm(saved, "height");
  const area = calculateArea(lengthCm, widthCm);
  const lkv = cmToKolViral(lengthCm);
  const wkv = cmToKolViral(widthCm);

  const rows: [string, string][] = [
    ["Room type", saved.roomType],
    ["Length", `${fmt(lengthCm, 2)} cm (${lkv.kol} Kol ${fmt(lkv.viral, 2)} Viral, ${fmt(lengthCm / 30.48, 2)} ft)`],
    ["Width", `${fmt(widthCm, 2)} cm (${wkv.kol} Kol ${fmt(wkv.viral, 2)} Viral, ${fmt(widthCm / 30.48, 2)} ft)`],
    ["Area", `${fmt(area.sqFoot, 2)} sq ft / ${fmt(area.sqMetre, 2)} m² / ${fmt(area.sqKol, 3)} Kol²`],
  ];
  if (heightCm !== null) {
    rows.splice(3, 0, ["Height", `${fmt(heightCm, 2)} cm (${fmt(heightCm / 30.48, 2)} ft)`]);
  }

  return (
    <dl className="space-y-1.5">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-4 text-sm">
          <dt className="text-temple-800/70">{k}</dt>
          <dd className="text-right font-medium text-temple-900">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function AyadiPrintBody({ saved }: { saved: SavedAyadiCalculation }) {
  const lengthCm = toCm(saved.length, saved.lengthUnit);
  const widthCm = toCm(saved.width, saved.widthUnit);
  const divisor = baseUnitDivisor(saved.baseUnit);

  let workingCm = lengthCm;
  let workingLabel = "Length";
  if (saved.basis === "width") {
    workingCm = widthCm;
    workingLabel = "Width";
  } else if (saved.basis === "perimeter") {
    workingCm = 2 * (lengthCm + widthCm);
    workingLabel = "Perimeter";
  } else if (saved.basis === "area") {
    workingCm = lengthCm * widthCm;
    workingLabel = "Area";
  } else if (saved.basis === "custom") {
    workingCm = saved.customBase * divisor;
    workingLabel = "Custom base value";
  }

  const rawBase = saved.basis === "custom" ? saved.customBase : workingCm / divisor;
  const baseValue =
    saved.roundingMode === "nearest"
      ? Math.round(rawBase)
      : saved.roundingMode === "floor"
        ? Math.floor(rawBase)
        : saved.roundingMode === "ceil"
          ? Math.ceil(rawBase)
          : rawBase;

  const results = runAllAyadiFactors(baseValue, defaultAyadiSettings);

  return (
    <div className="space-y-4">
      <dl className="space-y-1.5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-temple-800/70">Dimensions</dt>
          <dd className="font-medium text-temple-900">
            {fmt(lengthCm, 2)} cm ({fmt(cmToViral(lengthCm), 2)} Viral, {fmt(cmToKol(lengthCm), 2)} Kol) ×{" "}
            {fmt(widthCm, 2)} cm
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-temple-800/70">Calculation basis</dt>
          <dd className="font-medium text-temple-900">{workingLabel}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-temple-800/70">Base value ({saved.baseUnit})</dt>
          <dd className="font-medium text-temple-900">{fmt(baseValue, 2)}</dd>
        </div>
      </dl>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-temple-900/10 text-xs uppercase text-temple-800/70">
            <th className="py-1.5 pr-2 font-semibold">Factor</th>
            <th className="py-1.5 pr-2 text-right font-semibold">Remainder</th>
            <th className="py-1.5 font-semibold">Label</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-temple-900/5">
          {results.map((r) => (
            <tr key={r.id}>
              <td className="py-1.5 pr-2 font-medium text-temple-900">{r.name}</td>
              <td className="py-1.5 pr-2 text-right text-temple-900">{r.remainder}</td>
              <td className="py-1.5 text-temple-800">{r.interpretation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function savedRoomSummary(saved: SavedRoomCalculation): string {
  const lengthCm = roomCm(saved, "length") ?? 0;
  const widthCm = roomCm(saved, "width") ?? 0;
  return `${saved.roomType} · ${fmt(lengthCm / 30.48, 2)} ft × ${fmt(widthCm / 30.48, 2)} ft`;
}

export function savedAyadiSummary(saved: SavedAyadiCalculation): string {
  const base = saved.basis === "custom" ? "custom base" : saved.basis;
  return `${fmt(toCm(saved.length, saved.lengthUnit) / 30.48, 2)} ft × ${fmt(toCm(saved.width, saved.widthUnit) / 30.48, 2)} ft · ${base} (${saved.baseUnit})`;
}
