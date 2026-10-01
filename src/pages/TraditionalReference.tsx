import DisclaimerCard from "../components/ui/DisclaimerCard";
import { useI18n } from "../i18n";

const basicUnits = [
  { unit: "1 Viral", relationship: "Base unit", metric: "3 cm", imperial: "about 1.18 in" },
  { unit: "1 Kol", relationship: "24 Viral", metric: "72 cm", imperial: "about 2.36 ft" },
  { unit: "6 Viral", relationship: "Quarter Kol", metric: "18 cm", imperial: "about 7.09 in" },
  { unit: "12 Viral", relationship: "Half Kol", metric: "36 cm", imperial: "about 1.18 ft" },
  { unit: "24 Viral", relationship: "One Kol", metric: "72 cm", imperial: "about 2.36 ft" },
];

export default function TraditionalReference() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-temple-900">{t("Traditional Reference")}</h1>
        <p className="mt-1 text-sm text-temple-800/70">
          {t("Kerala traditional measurement units and their modern equivalents.")}
        </p>
      </header>

      <section className="card p-5">
        <h2 className="mb-3 text-lg font-semibold text-temple-900">
          {t("Basic Kerala traditional units")}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-temple-900/10 text-xs uppercase tracking-wide text-temple-800/70">
                <th className="py-2 pr-3 font-semibold">{t("Unit")}</th>
                <th className="py-2 pr-3 font-semibold">{t("Traditional relationship")}</th>
                <th className="py-2 pr-3 text-right font-semibold">{t("Metric equivalent")}</th>
                <th className="py-2 text-right font-semibold">{t("Imperial equivalent")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-temple-900/5">
              {basicUnits.map((u) => (
                <tr key={u.unit}>
                  <td className="py-2.5 pr-3 font-medium text-temple-900">{u.unit}</td>
                  <td className="py-2.5 pr-3 text-temple-800">{t(u.relationship)}</td>
                  <td className="py-2.5 pr-3 text-right text-temple-800">{u.metric}</td>
                  <td className="py-2.5 text-right text-temple-800">{u.imperial}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card p-5">
        <h2 className="mb-3 text-lg font-semibold text-temple-900">{t("Important notes")}</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-temple-800">
          <li>
            {t(
              "Kerala traditional construction measurements can differ by locality, historical period, carpenter tradition, and Vasthu practitioner.",
            )}
          </li>
          <li>
            {t(
              "This application uses the working standard: 1 Viral = 3 cm and 1 Kol = 24 Viral = 72 cm.",
            )}
          </li>
          <li>
            {t(
              "Modern building plans must comply with structural safety requirements, local municipality rules, Kerala building rules, electrical and plumbing requirements, ventilation, fire safety, and professional architectural guidance.",
            )}
          </li>
          <li>
            {t("Vasthu calculations should not replace engineering or legal approvals.")}
          </li>
        </ul>
      </section>

      <section className="card p-5">
        <h2 className="mb-3 text-lg font-semibold text-temple-900">{t("Ayadi note")}</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-temple-800">
          <li>
            {t(
              "Ayadi is a set of traditional numerical calculations used in some Indian architectural traditions.",
            )}
          </li>
          <li>
            {t(
              "Different schools use different source dimensions, multipliers, divisors, and interpretation tables.",
            )}
          </li>
          <li>
            {t(
              "The calculator should show formulas openly and make settings editable rather than treating one formula as universally correct.",
            )}
          </li>
        </ul>
      </section>

      <DisclaimerCard>
        {t(
          "This reference is educational guidance only. Always consult qualified professionals before planning construction.",
        )}
      </DisclaimerCard>
    </div>
  );
}
