import {
  ArrowRight,
  BookOpen,
  Calculator,
  Ruler,
  Scaling,
} from "lucide-react";
import type { PageId } from "../components/nav";
import DisclaimerCard from "../components/ui/DisclaimerCard";
import { useI18n } from "../i18n";

interface HomeProps {
  onNavigate: (id: PageId) => void;
}

const quickActions = [
  {
    id: "room" as PageId,
    title: "Calculate Room Size",
    description: "Enter room dimensions and see Kol, Viral, feet and metres.",
    icon: Ruler,
  },
  {
    id: "ayadi" as PageId,
    title: "Check Ayadi",
    description: "Run traditional Ayadi calculations with transparent formulas.",
    icon: Calculator,
  },
  {
    id: "converter" as PageId,
    title: "Convert Units",
    description: "Convert between Kol, Viral, feet, metres and centimetres.",
    icon: Scaling,
  },
  {
    id: "reference" as PageId,
    title: "View Traditional Measurements",
    description: "Learn Kerala traditional units and their equivalents.",
    icon: BookOpen,
  },
];

const steps = [
  "Enter room dimensions in any supported unit.",
  "Convert the dimensions to Kol and Viral.",
  "Check traditional Ayadi values.",
  "Review suggested compatible dimensions.",
];

export default function Home({ onNavigate }: HomeProps) {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-temple-900 sm:text-4xl">
          {t("Kerala Vasthu Calculator")}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-temple-800/80 sm:text-base">
          {t(
            "Plan room dimensions using Kol, Viral, feet, metres and traditional Ayadi guidance.",
          )}
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => onNavigate(action.id)}
              className="group flex items-start gap-4 rounded-2xl bg-white p-5 text-left shadow-card ring-1 ring-temple-900/5 transition hover:-translate-y-0.5 hover:shadow-card-lg focus:outline-none focus:ring-2 focus:ring-temple-500/40"
            >
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-temple-100 text-temple-700 transition group-hover:bg-temple-700 group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="flex items-center gap-1 font-semibold text-temple-900">
                  {t(action.title)}
                  <ArrowRight className="h-4 w-4 text-temple-400 transition group-hover:translate-x-0.5 group-hover:text-temple-700" />
                </p>
                <p className="mt-1 text-xs leading-relaxed text-temple-800/70">
                  {t(action.description)}
                </p>
              </div>
            </button>
          );
        })}
      </section>

      <section className="card p-6">
        <h2 className="mb-3 text-lg font-semibold text-temple-900">
          {t("How it works")}
        </h2>
        <ol className="grid gap-2 text-sm text-temple-800">
          {steps.map((step, i) => (
            <li key={step} className="flex items-start gap-3">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-temple-700 text-xs font-semibold text-white">
                {i + 1}
              </span>
              <span className="pt-0.5">{t(step)}</span>
            </li>
          ))}
        </ol>
      </section>

      <DisclaimerCard>
        {t(
          "This tool provides traditional Kerala Vasthu calculation guidance for planning purposes. Consult a qualified Kerala Vasthu expert, architect, and structural engineer before finalizing a building plan.",
        )}
      </DisclaimerCard>
    </div>
  );
}
