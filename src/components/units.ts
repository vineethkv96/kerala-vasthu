import type { LengthUnit } from "../types";

export interface UnitOption {
  value: LengthUnit;
  label: string;
  short: string;
}

export const unitOptions: UnitOption[] = [
  { value: "kol", label: "Kol", short: "Kol" },
  { value: "viral", label: "Viral", short: "Viral" },
  { value: "kolViral", label: "Kol & Viral", short: "Kol Viral" },
  { value: "feet", label: "Feet", short: "ft" },
  { value: "feetInches", label: "Feet & inches", short: "ft in" },
  { value: "cm", label: "Centimetres", short: "cm" },
  { value: "metre", label: "Metres", short: "m" },
];

export function unitLabel(unit: LengthUnit): string {
  return unitOptions.find((u) => u.value === unit)?.label ?? unit;
}
