import { Copy, Pencil, Printer, Trash2 } from "lucide-react";
import type { SavedCalculation } from "../types";
import { savedRoomSummary, savedAyadiSummary } from "./PrintView";
import { useI18n } from "../i18n";

interface SavedCalculationListProps {
  items: SavedCalculation[];
  onEdit: (item: SavedCalculation) => void;
  onDuplicate: (item: SavedCalculation) => void;
  onDelete: (item: SavedCalculation) => void;
  onPrint: (item: SavedCalculation) => void;
}

function summary(item: SavedCalculation): string {
  return item.type === "room" ? savedRoomSummary(item) : savedAyadiSummary(item);
}

export default function SavedCalculationList({
  items,
  onEdit,
  onDuplicate,
  onDelete,
  onPrint,
}: SavedCalculationListProps) {
  const { t } = useI18n();
  if (items.length === 0) {
    return (
      <div className="card flex flex-col items-center justify-center gap-2 p-10 text-center">
        <p className="text-sm font-medium text-temple-900">{t("No saved calculations yet")}</p>
        <p className="max-w-xs text-xs text-temple-800/70">
          {t(
            "Save a room or Ayadi calculation and it will appear here, ready to reopen, duplicate, print, or export.",
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.id} className="card p-4">
          <div className="mb-1 flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-temple-900">
                {item.projectName}
              </p>
              <p className="text-xs text-temple-800/70">{summary(item)}</p>
              {item.note && (
                <p className="mt-1 truncate text-xs italic text-temple-800/60">
                  {item.note}
                </p>
              )}
            </div>
            <span
              className={`flex-none rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                item.type === "room"
                  ? "bg-temple-100 text-temple-700"
                  : "bg-terracotta-100 text-terracotta-700"
              }`}
            >
              {item.type}
            </span>
          </div>
          <p className="mb-3 text-[11px] text-temple-800/50">
            {new Date(item.savedAt).toLocaleString()}
          </p>
          <div className="flex flex-wrap gap-1">
            <button
              type="button"
              onClick={() => onEdit(item)}
              className="btn-ghost px-2 py-1 text-xs"
            >
              <Pencil className="h-3.5 w-3.5" />
              {t("Edit")}
            </button>
            <button
              type="button"
              onClick={() => onDuplicate(item)}
              className="btn-ghost px-2 py-1 text-xs"
            >
              <Copy className="h-3.5 w-3.5" />
              {t("Duplicate")}
            </button>
            <button
              type="button"
              onClick={() => onPrint(item)}
              className="btn-ghost px-2 py-1 text-xs"
            >
              <Printer className="h-3.5 w-3.5" />
              {t("Print")}
            </button>
            <button
              type="button"
              onClick={() => onDelete(item)}
              className="btn-ghost px-2 py-1 text-xs text-terracotta-600 hover:bg-terracotta-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              {t("Delete")}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
