import { X } from "lucide-react";
import { useI18n } from "../i18n";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const { t } = useI18n();
  if (!open) return null;

  return (
    <div
      className="no-print fixed inset-0 z-40 flex items-center justify-center bg-temple-900/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-card-lg">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-temple-900">{title}</h2>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md p-1 text-temple-800/60 hover:bg-temple-900/5"
            aria-label={t("Close")}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mb-5 text-sm text-temple-800">{message}</p>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="btn-secondary">
            {t("Cancel")}
          </button>
          <button type="button" onClick={onConfirm} className="btn-terracotta">
            {t(confirmLabel ?? "Delete")}
          </button>
        </div>
      </div>
    </div>
  );
}
