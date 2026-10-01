import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useI18n } from "../i18n";

export interface SaveFormState {
  projectName: string;
  note: string;
}

interface SaveCalculationModalProps {
  open: boolean;
  title?: string;
  initial?: SaveFormState;
  onSave: (values: SaveFormState) => void;
  onClose: () => void;
}

export default function SaveCalculationModal({
  open,
  title,
  initial,
  onSave,
  onClose,
}: SaveCalculationModalProps) {
  const { t } = useI18n();
  const resolvedTitle = t(title ?? "Save calculation");
  const [projectName, setProjectName] = useState(initial?.projectName ?? "");
  const [note, setNote] = useState(initial?.note ?? "");

  useEffect(() => {
    if (open) {
      setProjectName(initial?.projectName ?? "");
      setNote(initial?.note ?? "");
    }
  }, [open, initial]);

  if (!open) return null;

  return (
    <div
      className="no-print fixed inset-0 z-40 flex items-end justify-center bg-temple-900/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={resolvedTitle}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-card-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-temple-900">{resolvedTitle}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-temple-800/60 hover:bg-temple-900/5"
            aria-label={t("Close")}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="save-project" className="label-base">
              {t("Project name")}
            </label>
            <input
              id="save-project"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. New house plan"
              className="input-base"
            />
          </div>
          <div>
            <label htmlFor="save-note" className="label-base">
              {t("Note")}
            </label>
            <textarea
              id="save-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Ground-floor bedroom, Kitchen option B"
              rows={3}
              className="input-base resize-none"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn-secondary">
              {t("Cancel")}
            </button>
            <button
              type="button"
              onClick={() =>
                onSave({
                  projectName: projectName.trim() || "Untitled",
                  note: note.trim(),
                })
              }
              className="btn-primary"
            >
              {t("Save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
