import { useState } from "react";
import { ChevronDown, ChevronRight, Pencil } from "lucide-react";
import type { RoomRange } from "../lib/roomData";
import { useI18n } from "../i18n";

interface RoomReferenceTableProps {
  ranges: RoomRange[];
  onRangesChange: (ranges: RoomRange[]) => void;
}

export default function RoomReferenceTable({
  ranges,
  onRangesChange,
}: RoomReferenceTableProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  function update(index: number, patch: Partial<RoomRange>) {
    const next = ranges.map((r, i) => (i === index ? { ...r, ...patch } : r));
    onRangesChange(next);
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
          {open ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          {t("Room recommendation reference")}
        </button>
        <button
          type="button"
          onClick={() => setEditing((e) => !e)}
          className="btn-ghost text-xs"
          aria-label={editing ? "Finish editing" : "Edit table"}
        >
          <Pencil className="h-3.5 w-3.5" />
          {editing ? t("Done") : t("Edit")}
        </button>
      </div>
      <p className="mt-1 text-xs text-temple-800/70">
        {t("General planning reference — not a mandatory Vasthu rule.")}
      </p>

      {open && (
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-temple-900/10 text-xs uppercase tracking-wide text-temple-800/70">
                <th className="py-2 pr-3 font-semibold">{t("Room")}</th>
                <th className="py-2 pr-3 font-semibold">{t("Minimum")}</th>
                <th className="py-2 font-semibold">{t("Maximum")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-temple-900/5">
              {ranges.map((r, i) => (
                <tr key={r.room}>
                  <td className="py-2 pr-3 font-medium text-temple-900">{t(r.room)}</td>
                  <td className="py-2 pr-3 text-temple-800">
                    {editing ? (
                      <input
                        value={r.min}
                        onChange={(e) => update(i, { min: e.target.value })}
                        className="input-base"
                        aria-label={`${r.room} minimum`}
                      />
                    ) : (
                      r.min
                    )}
                  </td>
                  <td className="py-2 text-temple-800">
                    {editing ? (
                      <input
                        value={r.max}
                        onChange={(e) => update(i, { max: e.target.value })}
                        className="input-base"
                        aria-label={`${r.room} maximum`}
                      />
                    ) : (
                      r.max
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
