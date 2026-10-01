import type {
  AyadiFactorConfig,
  AyadiFactorResult,
  AyadiFormulaSettings,
} from "../types";

export const defaultAyadiFactors: AyadiFactorConfig[] = [
  {
    id: "aaya",
    name: "Aaya",
    multiplier: 8,
    divisor: 12,
    label: "Aaya remainder",
    notes: "Base value × 8, then divide by 12.",
    interpretation: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  },
  {
    id: "vyaya",
    name: "Vyaya",
    multiplier: 3,
    divisor: 8,
    label: "Vyaya remainder",
    notes: "Base value × 3, then divide by 8.",
    interpretation: ["1", "2", "3", "4", "5", "6", "7", "8"],
  },
  {
    id: "yoni",
    name: "Yoni",
    multiplier: 3,
    divisor: 8,
    label: "Yoni remainder",
    notes: "Base value × 3, then divide by 8.",
    interpretation: ["1", "2", "3", "4", "5", "6", "7", "8"],
  },
  {
    id: "rksha",
    name: "Rksha / Nakshatra",
    multiplier: 8,
    divisor: 27,
    label: "Nakshatra remainder",
    notes: "Base value × 8, then divide by 27.",
    interpretation: Array.from({ length: 27 }, (_, i) => String(i + 1)),
  },
  {
    id: "vara",
    name: "Vara",
    multiplier: 9,
    divisor: 7,
    label: "Vara remainder",
    notes: "Base value × 9, then divide by 7.",
    interpretation: ["1", "2", "3", "4", "5", "6", "7"],
  },
  {
    id: "tithi",
    name: "Tithi",
    multiplier: 9,
    divisor: 30,
    label: "Tithi remainder",
    notes: "Base value × 9, then divide by 30.",
    interpretation: Array.from({ length: 30 }, (_, i) => String(i + 1)),
  },
  {
    id: "amsa",
    name: "Amsa",
    multiplier: 9,
    divisor: 12,
    label: "Amsa remainder",
    notes: "Base value × 9, then divide by 12.",
    interpretation: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  },
];

export const defaultAyadiSettings: AyadiFormulaSettings = {
  factors: defaultAyadiFactors.map((f) => ({ ...f, interpretation: [...f.interpretation] })),
};

export interface AyadiComputation {
  product: number;
  quotient: number;
  remainderRaw: number;
  remainder: number;
}

/**
 * Compute a single Ayadi factor.
 * Traditional display treats remainder 0 as the highest divisor value
 * (e.g. remainder 0 in divisor 12 displays as 12).
 */
export function calculateAyadi(
  baseValue: number,
  factor: AyadiFactorConfig,
): AyadiComputation {
  const product = baseValue * factor.multiplier;
  const quotient = Math.floor(product / factor.divisor);
  const remainderRaw = product % factor.divisor;
  const remainder = remainderRaw === 0 ? factor.divisor : remainderRaw;
  return { product, quotient, remainderRaw, remainder };
}

export function calculateAyadiFactorResult(
  baseValue: number,
  factor: AyadiFactorConfig,
): AyadiFactorResult {
  const calc = calculateAyadi(baseValue, factor);
  const interpretation =
    factor.interpretation[calc.remainder - 1] ?? String(calc.remainder);
  return {
    id: factor.id,
    name: factor.name,
    multiplier: factor.multiplier,
    divisor: factor.divisor,
    quotient: calc.quotient,
    remainderRaw: calc.remainderRaw,
    remainder: calc.remainder,
    label: factor.label,
    interpretation,
  };
}

export function runAllAyadiFactors(
  baseValue: number,
  settings: AyadiFormulaSettings,
): AyadiFactorResult[] {
  return settings.factors.map((f) => calculateAyadiFactorResult(baseValue, f));
}

export function getFactor(factors: AyadiFactorConfig[], id: string) {
  return factors.find((f) => f.id === id);
}
