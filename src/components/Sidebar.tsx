import { Github } from "lucide-react";
import type { PageId } from "./nav";
import { navItems } from "./nav";
import { useI18n } from "../i18n";

const GITHUB_URL = "https://github.com/vineethkv96/kerala-vasthu";

interface SidebarProps {
  active: PageId;
  onNavigate: (id: PageId) => void;
}

export default function Sidebar({ active, onNavigate }: SidebarProps) {
  const { t } = useI18n();
  return (
    <aside className="no-print sticky top-0 hidden h-screen w-56 flex-none flex-col border-r border-temple-900/10 bg-cream-100/50 p-3 lg:flex">
      <nav aria-label="Main navigation" className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-temple-500/40 ${
                isActive
                  ? "bg-temple-700 text-white"
                  : "text-temple-800 hover:bg-temple-900/5"
              }`}
            >
              <Icon className="h-4 w-4" />
              {t(item.label)}
            </button>
          );
        })}
      </nav>
      <div className="mt-auto space-y-3">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-temple-800 transition hover:bg-temple-900/5"
        >
          <Github className="h-4 w-4" />
          GitHub
          <span className="ml-auto text-[10px] font-normal text-temple-800/60">
            {t("Open for contributions")}
          </span>
        </a>
        <p className="px-3 text-[11px] leading-relaxed text-temple-800/60">
          {t(
            "Traditional Kerala Vasthu guidance. Not a substitute for engineering or legal approval.",
          )}
        </p>
      </div>
    </aside>
  );
}
