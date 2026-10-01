import type { AyadiFactorResult } from "../types";
import { fmt } from "../lib/format";
import Tooltip from "./ui/Tooltip";
import { useI18n } from "../i18n";

interface AyadiResultsTableProps {
  results: AyadiFactorResult[];
  baseValue: number;
}

export default function AyadiResultsTable({
  results,
  baseValue,
}: AyadiResultsTableProps) {
  const { t } = useI18n();
  const base = fmt(baseValue, 2);
  return (
    <div className="card overflow-x-auto p-4">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-temple-900/10 text-xs uppercase tracking-wide text-temple-800/70">
            <th className="py-2 pr-3 font-semibold">{t("Factor")}</th>
            <th className="py-2 pr-3 font-semibold">{t("Formula")}</th>
            <th className="py-2 pr-3 text-right font-semibold">{t("Base Value")}</th>
            <th className="py-2 pr-3 text-right font-semibold">{t("Divisor")}</th>
            <th className="py-2 pr-3 text-right font-semibold">{t("Remainder")}</th>
            <th className="py-2 pr-3 font-semibold">{t("Traditional Label")}</th>
            <th className="py-2 font-semibold">{t("Notes")}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-temple-900/5">
          {results.map((r) => (
            <tr key={r.id}>
              <td className="py-2.5 pr-3 font-medium text-temple-900">
                {t(r.name)}
                <Tooltip text="Calculations differ across Kerala Vasthu traditions." />
              </td>
              <td className="py-2.5 pr-3 text-temple-800">
                {base} × {r.multiplier} ÷ {r.divisor}
              </td>
              <td className="py-2.5 pr-3 text-right text-temple-800">{base}</td>
              <td className="py-2.5 pr-3 text-right text-temple-800">{r.divisor}</td>
              <td className="py-2.5 pr-3 text-right font-semibold text-temple-900">
                {r.remainder}
              </td>
              <td className="py-2.5 pr-3 text-temple-800">{r.interpretation}</td>
              <td className="py-2.5 text-xs text-temple-800/70">{t(r.label)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
