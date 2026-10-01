import { Coffee, Github, Languages } from "lucide-react";
import { useI18n } from "../i18n";

const GITHUB_URL = "https://github.com/vineethkv96/kerala-vasthu";

export default function Header() {
  const { lang, toggle, t } = useI18n();

  return (
    <header className="no-print sticky top-0 z-20 border-b border-temple-900/10 bg-cream-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-temple-700 text-cream-50">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M4 20 L12 4 L20 20" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 20 h8" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight text-temple-900">
              {t("Kerala Vasthu Calculator")}
            </p>
            <p className="text-[11px] leading-tight text-temple-800/70">
              {t("Kol · Viral · Ayadi")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-xs"
            aria-label={t("View on GitHub")}
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">{t("GitHub")}</span>
          </a>
          <a
            href="https://buymeacoffee.com/vineeth_k_v"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-xs"
            aria-label={t("Buy me a coffee")}
          >
            <Coffee className="h-4 w-4" />
            <span className="hidden sm:inline">{t("Buy me a coffee")}</span>
          </a>
          <button
            type="button"
            onClick={toggle}
            className="btn-ghost text-xs"
            aria-label={t("Toggle language")}
          >
            <Languages className="h-4 w-4" />
            {lang === "en" ? "മലയാളം" : "EN"}
          </button>
        </div>
      </div>
    </header>
  );
}
