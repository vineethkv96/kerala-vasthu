export type LengthUnit =
  | "kol"
  | "viral"
  | "feet"
  | "feetInches"
  | "kolViral"
  | "cm"
  | "metre";

export type RoomType =
  | "Bedroom"
  | "Living Room"
  | "Kitchen"
  | "Dining Room"
  | "Pooja Room"
  | "Study Room"
  | "Bathroom"
  | "Store Room"
  | "Balcony"
  | "Custom Room";

export type Tolerance = "strict" | "practical" | "flexible";

export type AyadiBasis = "length" | "width" | "perimeter" | "area" | "custom";

export type BaseUnit = "viral" | "kol" | "cm";

export type RoundingMode = "nearest" | "floor" | "ceil" | "exact";

export interface AyadiFactorConfig {
  id: string;
  name: string;
  multiplier: number;
  divisor: number;
  label: string;
  notes: string;
  interpretation: string[];
}

export interface AyadiFormulaSettings {
  factors: AyadiFactorConfig[];
}

export interface AyadiFactorResult {
  id: string;
  name: string;
  multiplier: number;
  divisor: number;
  quotient: number;
  remainderRaw: number;
  remainder: number;
  label: string;
  interpretation: string;
}

export interface SavedRoomCalculation {
  id: string;
  type: "room";
  projectName: string;
  note: string;
  roomType: RoomType;
  length: number;
  lengthUnit: LengthUnit;
  width: number;
  widthUnit: LengthUnit;
  height?: number;
  heightUnit?: LengthUnit;
  feetInches?: {
    length?: FeetInchesValue;
    width?: FeetInchesValue;
    height?: FeetInchesValue;
  };
  kolViral?: {
    length?: KolViralValue;
    width?: KolViralValue;
    height?: KolViralValue;
  };
  savedAt: string;
}

export interface SavedAyadiCalculation {
  id: string;
  type: "ayadi";
  projectName: string;
  note: string;
  length: number;
  lengthUnit: LengthUnit;
  width: number;
  widthUnit: LengthUnit;
  basis: AyadiBasis;
  customBase: number;
  baseUnit: BaseUnit;
  roundingMode: RoundingMode;
  savedAt: string;
}

export type SavedCalculation = SavedRoomCalculation | SavedAyadiCalculation;

export interface FeetInchesValue {
  feet: number;
  inches: number;
}

export interface KolViralValue {
  kol: number;
  viral: number;
}
