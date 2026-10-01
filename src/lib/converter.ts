import {
  cmToFeetInches,
  cmToInches,
  cmToKol,
  cmToKolViral,
  cmToMetre,
  cmToViral,
  feetInchesToCm,
  feetToCm,
  inchesToCm,
  kolToCm,
  kolViralToCm,
  metreToCm,
  viralToCm,
} from "./units";

export type ConverterUnit =
  | "kol"
  | "viral"
  | "kolViral"
  | "cm"
  | "m"
  | "mm"
  | "in"
  | "ft"
  | "ftin";

export const converterUnitLabels: Record<ConverterUnit, string> = {
  kol: "Kol",
  viral: "Viral",
  kolViral: "Kol & Viral",
  cm: "Centimetres",
  m: "Metres",
  mm: "Millimetres",
  in: "Inches",
  ft: "Feet",
  ftin: "Feet & inches",
};

export function converterToCm(value: number, unit: ConverterUnit): number {
  switch (unit) {
    case "kol":
      return kolToCm(value);
    case "viral":
      return viralToCm(value);
    case "cm":
      return value;
    case "m":
      return metreToCm(value);
    case "mm":
      return value / 10;
    case "in":
      return inchesToCm(value);
    case "ft":
      return feetToCm(value);
    case "ftin":
      return feetToCm(value);
    case "kolViral":
      return kolToCm(value);
    default:
      return value;
  }
}

export function converterFromCm(cm: number, unit: ConverterUnit): number {
  switch (unit) {
    case "kol":
      return cmToKol(cm);
    case "viral":
      return cmToViral(cm);
    case "cm":
      return cm;
    case "m":
      return cmToMetre(cm);
    case "mm":
      return cm * 10;
    case "in":
      return cmToInches(cm);
    case "ft":
      return cm / 30.48;
    case "ftin":
      return cm / 30.48;
    case "kolViral":
      return cmToKol(cm);
    default:
      return cm;
  }
}

export function formatConverterResult(cm: number, unit: ConverterUnit): string {
  switch (unit) {
    case "ftin": {
      const fi = cmToFeetInches(cm);
      return `${fi.feet} ft ${fi.inches.toFixed(2)} in`;
    }
    case "kolViral": {
      const kv = cmToKolViral(cm);
      return `${kv.kol} Kol ${kv.viral.toFixed(2)} Viral`;
    }
    default:
      return `${converterFromCm(cm, unit).toLocaleString("en-IN", {
        maximumFractionDigits: 4,
      })}`;
  }
}

export function formatFormula(
  value: number,
  from: ConverterUnit,
  to: ConverterUnit,
): string {
  return `${value} ${converterUnitLabels[from]} = ${formatConverterResult(
    converterToCm(value, from),
    to,
  )} ${converterUnitLabels[to]}`;
}

export { cmToKolViral, cmToFeetInches, kolViralToCm, feetInchesToCm };
