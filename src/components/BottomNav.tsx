import type { PageId } from "./nav";
import { navItems } from "./nav";
import { useI18n } from "../i18n";

interface BottomNavProps {
  active: PageId;
  onNavigate: (id: PageId) => void;
}

export default function BottomNav({ active, onNavigate }: BottomNavProps) {
  const { t } = useI18n();
  return (
    <nav
      aria-label="Mobile navigation"
      className="no-print fixed inset-x-0 bottom-0 z-20 border-t border-temple-900/10 bg-white/95 backdrop-blur lg:hidden"
    >
      <div className="mx-auto flex max-w-md items-stretch justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition focus:outline-none ${
                isActive ? "text-temple-700" : "text-temple-800/60 hover:text-temple-900"
              }`}
            >
              <Icon className="h-5 w-5" />
              {t(item.label)}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
