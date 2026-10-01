import type { LengthUnit, Tolerance } from "../types";
import {
  cmToKolViral,
  fromCm,
  getTraditionalAlignment,
  toleranceCmFor,
} from "../lib/units";
import { fmt } from "../lib/format";
import { unitLabel } from "./units";
import { useI18n } from "../i18n";

interface TraditionalAlignmentCardProps {
  label: string;
  cm: number;
  tolerance: Tolerance;
  unit: LengthUnit;
}

function traditionalVerdict(
  a: ReturnType<typeof getTraditionalAlignment>,
): string {
  if (a.isExactWholeKol) return "Exact whole Kol";
  if (a.isExactWholeViral) return "Exact whole Viral";
  if (a.isMultiple12Viral) return "Multiple of 12 Viral (half Kol)";
  if (a.isMultiple6Viral) return "Multiple of 6 Viral (quarter Kol)";
  return "Not a clean traditional multiple";
}

export default function TraditionalAlignmentCard({
  label,
  cm,
  tolerance,
  unit,
}: TraditionalAlignmentCardProps) {
  const { t } = useI18n();
  if (!Number.isFinite(cm) || cm <= 0) return null;
  const alignment = getTraditionalAlignment(cm, toleranceCmFor(tolerance));
  const kv = cmToKolViral(cm);

  const wholeKolInUnit = fromCm(alignment.nearestWholeKolCm, unit);
  const wholeViralInUnit = fromCm(alignment.nearestWholeViralCm, unit);
  const unitLabelText = t(unitLabel(unit));

  return (
    <div className="card p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-temple-900">
          {t("Traditional Dimension Check")} — {t(label)}
        </h3>
        <span className="rounded-full bg-gold-100 px-2 py-0.5 text-xs font-medium text-gold-800">
          {t(traditionalVerdict(alignment))}
        </span>
      </div>

      <p className="mb-3 text-sm text-temple-800">
        <span className="font-medium">{fmt(cm, 2)} cm</span> ={" "}
        <span className="font-medium">
          {fmt(alignment.kol, 2)} Kol ({fmt(alignment.viral, 2)} Viral)
        </span>{" "}
        ={" "}
        <span className="font-medium">
          {kv.kol} Kol {fmt(kv.viral, 2)} Viral
        </span>
      </p>

      <ul className="mb-3 grid gap-1 text-xs text-temple-800 sm:grid-cols-2">
        <li
          className={`rounded-md px-2 py-1 ${
            alignment.isMultiple6Viral ? "bg-temple-100 text-temple-900" : "bg-temple-50"
          }`}
        >
          {t("Multiple of 1 Viral")}: {alignment.isExactWholeViral ? t("Yes") : t("No")}
        </li>
        <li
          className={`rounded-md px-2 py-1 ${
            alignment.isMultiple6Viral ? "bg-temple-100 text-temple-900" : "bg-temple-50"
          }`}
        >
          {t("Multiple of 6 Viral")}: {alignment.isMultiple6Viral ? t("Yes") : t("No")}
        </li>
        <li
          className={`rounded-md px-2 py-1 ${
            alignment.isMultiple12Viral ? "bg-temple-100 text-temple-900" : "bg-temple-50"
          }`}
        >
          {t("Multiple of 12 Viral")}: {alignment.isMultiple12Viral ? t("Yes") : t("No")}
        </li>
        <li
          className={`rounded-md px-2 py-1 ${
            alignment.isMultiple24Viral ? "bg-temple-100 text-temple-900" : "bg-temple-50"
          }`}
        >
          {t("Multiple of 24 Viral (1 Kol)")}:{" "}
          {alignment.isMultiple24Viral ? t("Yes") : t("No")}
        </li>
      </ul>

      <div className="rounded-lg bg-cream-100 p-3 text-xs text-temple-800">
        <p className="mb-1 font-semibold">{t("Nearby traditional suggestions")}</p>
        <p>
          {t("Nearest whole Kol for")} {t(label)}:{" "}
          <span className="font-medium">
            {alignment.nearestWholeKol} Kol = {fmt(alignment.nearestWholeKolCm, 2)} cm ={" "}
            {fmt(wholeKolInUnit, 2)} {unitLabelText}
          </span>
        </p>
        <p>
          {t("Nearest whole Viral for")} {t(label)}:{" "}
          <span className="font-medium">
            {alignment.nearestWholeViral} Viral = {fmt(alignment.nearestWholeViralCm, 2)} cm ={" "}
            {fmt(wholeViralInUnit, 2)} {unitLabelText}
          </span>
        </p>
        <p className="mt-1 italic text-temple-900/70">
          {t("Dimensional alignment suggestion only — not a definitive Vasthu verdict.")}
        </p>
      </div>
    </div>
  );
}
