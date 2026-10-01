import {
  CM_PER_FOOT,
  CM_PER_INCH,
  CM_PER_METRE,
  INCHES_PER_FOOT,
  KOL_CM,
  VIRAL_CM,
  VIRAL_PER_KOL,
} from "./constants";
import type { FeetInchesValue, LengthUnit, Tolerance } from "../types";

export interface AreaResult {
  sqCm: number;
  sqMetre: number;
  sqFoot: number;
  sqKol: number;
  sqViral: number;
}

export function kolToCm(kol: number): number {
  return kol * KOL_CM;
}

export function viralToCm(viral: number): number {
  return viral * VIRAL_CM;
}

export function cmToKol(cm: number): number {
  return cm / KOL_CM;
}

export function cmToViral(cm: number): number {
  return cm / VIRAL_CM;
}

export function feetToCm(feet: number): number {
  return feet * CM_PER_FOOT;
}

export function cmToFeet(cm: number): number {
  return cm / CM_PER_FOOT;
}

export function metreToCm(metres: number): number {
  return metres * CM_PER_METRE;
}

export function cmToMetre(cm: number): number {
  return cm / CM_PER_METRE;
}

export function inchesToCm(inches: number): number {
  return inches * CM_PER_INCH;
}

export function cmToInches(cm: number): number {
  return cm / CM_PER_INCH;
}

export function feetInchesToCm(feet: number, inches: number): number {
  return feetToCm(feet) + inchesToCm(inches);
}

export function cmToFeetInches(cm: number): FeetInchesValue {
  const totalInches = cmToInches(cm);
  const feet = Math.floor(totalInches / INCHES_PER_FOOT);
  const inches = totalInches - feet * INCHES_PER_FOOT;
  return { feet, inches };
}

export function kolViralToCm(kol: number, viral: number): number {
  return kolToCm(kol) + viralToCm(viral);
}

export function cmToKolViral(cm: number): { kol: number; viral: number } {
  const totalViral = cmToViral(cm);
  const kol = Math.floor(totalViral / VIRAL_PER_KOL);
  const viral = totalViral - kol * VIRAL_PER_KOL;
  return { kol, viral };
}

/**
 * Convert a numeric value from any supported unit into centimetres.
 * `feetInches` is a combined value already handled by the caller.
 */
export function toCm(value: number, unit: LengthUnit): number {
  switch (unit) {
    case "kol":
      return kolToCm(value);
    case "viral":
      return viralToCm(value);
    case "feet":
      return feetToCm(value);
    case "cm":
      return value;
    case "metre":
      return metreToCm(value);
    case "feetInches":
      return feetToCm(value);
    case "kolViral":
      return kolToCm(value);
    default:
      return value;
  }
}

export function fromCm(cm: number, unit: LengthUnit): number {
  switch (unit) {
    case "kol":
      return cmToKol(cm);
    case "viral":
      return cmToViral(cm);
    case "feet":
      return cmToFeet(cm);
    case "cm":
      return cm;
    case "metre":
      return cmToMetre(cm);
    case "feetInches":
      return cmToFeet(cm);
    case "kolViral":
      return cmToKol(cm);
    default:
      return cm;
  }
}

export function calculateArea(lengthCm: number, widthCm: number): AreaResult {
  const sqCm = lengthCm * widthCm;
  return {
    sqCm,
    sqMetre: sqCm / (CM_PER_METRE * CM_PER_METRE),
    sqFoot: sqCm / (CM_PER_FOOT * CM_PER_FOOT),
    sqKol: sqCm / (KOL_CM * KOL_CM),
    sqViral: sqCm / (VIRAL_CM * VIRAL_CM),
  };
}

export function calculatePerimeter(lengthCm: number, widthCm: number): number {
  return 2 * (lengthCm + widthCm);
}

export function roundToNearestViral(cm: number): number {
  return Math.round(cm / VIRAL_CM) * VIRAL_CM;
}

export function getNearestKol(cm: number): number {
  return Math.round(cmToKol(cm));
}

export function getNearestViral(cm: number): number {
  return Math.round(cmToViral(cm));
}

export interface TraditionalAlignment {
  kol: number;
  viral: number;
  cm: number;
  isExactWholeKol: boolean;
  isExactWholeViral: boolean;
  isMultiple6Viral: boolean;
  isMultiple12Viral: boolean;
  isMultiple24Viral: boolean;
  nearestWholeKolCm: number;
  nearestWholeViralCm: number;
  nearestWholeKol: number;
  nearestWholeViral: number;
  withinTolerance: boolean;
}

export function getTraditionalAlignment(
  cm: number,
  toleranceCm: number,
): TraditionalAlignment {
  const kol = cmToKol(cm);
  const viral = cmToViral(cm);
  const nearestWholeKol = getNearestKol(cm);
  const nearestWholeViral = getNearestViral(cm);
  const nearestWholeKolCm = kolToCm(nearestWholeKol);
  const nearestWholeViralCm = viralToCm(nearestWholeViral);

  const isExactWholeKol = Math.abs(cm - nearestWholeKolCm) < 0.0001;
  const isExactWholeViral = Math.abs(cm - nearestWholeViralCm) < 0.0001;
  const isMultiple6Viral = Math.abs(viral - Math.round(viral / 6) * 6) < 0.0001;
  const isMultiple12Viral =
    Math.abs(viral - Math.round(viral / 12) * 12) < 0.0001;
  const isMultiple24Viral =
    Math.abs(viral - Math.round(viral / 24) * 24) < 0.0001;

  const distanceToNearestTraditional = Math.min(
    Math.abs(cm - nearestWholeKolCm),
    Math.abs(cm - nearestWholeViralCm),
  );
  const withinTolerance = distanceToNearestTraditional <= toleranceCm;

  return {
    kol,
    viral,
    cm,
    isExactWholeKol,
    isExactWholeViral,
    isMultiple6Viral,
    isMultiple12Viral,
    isMultiple24Viral,
    nearestWholeKolCm,
    nearestWholeViralCm,
    nearestWholeKol,
    nearestWholeViral,
    withinTolerance,
  };
}

export function toleranceCmFor(tolerance: Tolerance): number {
  switch (tolerance) {
    case "strict":
      return 0;
    case "practical":
      return VIRAL_CM;
    case "flexible":
      return VIRAL_CM * 2;
  }
}

export function toleranceLabel(tolerance: Tolerance): string {
  switch (tolerance) {
    case "strict":
      return "Strict (exact traditional unit only)";
    case "practical":
      return "Practical (within 1 Viral / 3 cm)";
    case "flexible":
      return "Flexible (within 2 Viral / 6 cm)";
  }
}
