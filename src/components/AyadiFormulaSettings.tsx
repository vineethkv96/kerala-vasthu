import { useState } from "react";
import { ChevronDown, ChevronRight, RotateCcw } from "lucide-react";
import type { AyadiFormulaSettings } from "../types";
import { defaultAyadiSettings } from "../lib/ayadi";
import { useI18n } from "../i18n";

interface AyadiFormulaSettingsProps {
  settings: AyadiFormulaSettings;
  onChange: (settings: AyadiFormulaSettings) => void;
}

export default function AyadiFormulaSettings({
  settings,
  onChange,
}: AyadiFormulaSettingsProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [openFactor, setOpenFactor] = useState<string | null>(null);

  function updateFactor(id: string, patch: Partial<(typeof settings.factors)[number]>) {
    onChange({
      factors: settings.factors.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    });
  }

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1 text-sm font-semibold text-temple-900 focus:outline-none"
          aria-expanded={open}
        >
          {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          {t("Ayadi Formula Settings")}
        </button>
        <button
          type="button"
          onClick={() => onChange({ factors: defaultAyadiSettings.factors.map((f) => ({ ...f, interpretation: [...f.interpretation] })) })}
          className="btn-ghost text-xs"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {t("Reset to defaults")}
        </button>
      </div>
      <p className="mt-1 text-xs text-temple-800/70">
        {t(
          "Edit divisors, multipliers, labels and interpretation values. Formulas vary by Kerala Vasthu tradition.",
        )}
      </p>

      {open && (
        <div className="mt-3 space-y-2">
          {settings.factors.map((factor) => (
            <div key={factor.id} className="rounded-lg border border-temple-900/10">
              <button
                type="button"
                onClick={() => setOpenFactor(openFactor === factor.id ? null : factor.id)}
                className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-temple-900 hover:bg-cream-100"
                aria-expanded={openFactor === factor.id}
              >
                <span>{t(factor.name)}</span>
                {openFactor === factor.id ? (
                  <ChevronDown className="h-4 w-4 text-temple-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-temple-500" />
                )}
              </button>
              {openFactor === factor.id && (
                <div className="grid gap-3 border-t border-temple-900/10 p-3 sm:grid-cols-2">
                  <div>
                    <label className="label-base">{t("Multiplier")}</label>
                    <input
                      type="number"
                      value={factor.multiplier}
                      onChange={(e) => updateFactor(factor.id, { multiplier: Number(e.target.value) })}
                      className="input-base"
                      aria-label={`${factor.name} multiplier`}
                    />
                  </div>
                  <div>
                    <label className="label-base">{t("Divisor")}</label>
                    <input
                      type="number"
                      min={1}
                      value={factor.divisor}
                      onChange={(e) => updateFactor(factor.id, { divisor: Math.max(1, Number(e.target.value)) })}
                      className="input-base"
                      aria-label={`${factor.name} divisor`}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label-base">{t("Output label")}</label>
                    <input
                      value={factor.label}
                      onChange={(e) => updateFactor(factor.id, { label: e.target.value })}
                      className="input-base"
                      aria-label={`${factor.name} output label`}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label-base">
                      {t("Interpretation labels (comma-separated, one per remainder)")}
                    </label>
                    <textarea
                      value={factor.interpretation.join(", ")}
                      onChange={(e) =>
                        updateFactor(factor.id, {
                          interpretation: e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      rows={2}
                      className="input-base resize-none"
                      aria-label={`${factor.name} interpretation labels`}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
