export function round(value: number, decimals = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function fmt(value: number, decimals = 2): string {
  return round(value, decimals).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export function fmtCm(cm: number): string {
  return `${fmt(cm, 2)} cm`;
}

export function fmtMetre(cm: number): string {
  return `${fmt(cm / 100, 2)} m`;
}

export function fmtKol(cm: number): string {
  return `${fmt(cm / 72, 2)} Kol`;
}

export function fmtViral(cm: number): string {
  return `${fmt(cm / 3, 2)} Viral`;
}

export function fmtFeet(cm: number): string {
  return `${fmt(cm / 30.48, 2)} ft`;
}

export function fmtFeetInches(cm: number): string {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches - feet * 12;
  return `${feet} ft ${fmt(inches, 2)} in`;
}

export function fmtNumberInput(value: number): string {
  return round(value, 4).toString();
}
