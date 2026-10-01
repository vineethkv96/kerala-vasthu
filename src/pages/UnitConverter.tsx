import UnitConverter from "../components/UnitConverter";
import FeetMetreCalculator from "../components/FeetMetreCalculator";
import { useI18n } from "../i18n";

export default function UnitConverterPage() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-temple-900">{t("Unit Converter")}</h1>
        <p className="mt-1 text-sm text-temple-800/70">
          {t("Convert between Kol, Viral, feet, metres, centimetres and more.")}
        </p>
      </header>
      <UnitConverter />
      <FeetMetreCalculator />
    </div>
  );
}
