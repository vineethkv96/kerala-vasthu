import { useRef, useState } from "react";
import { Download, Printer, Upload, X } from "lucide-react";
import type {
  SavedAyadiCalculation,
  SavedCalculation,
  SavedRoomCalculation,
} from "../types";
import SavedCalculationList from "../components/SavedCalculationList";
import PrintView from "../components/PrintView";
import ConfirmDialog from "../components/ConfirmDialog";
import {
  deleteSaved,
  loadSaved,
  makeId,
  persistSaved,
  replaceAllSaved,
} from "../lib/storage";
import { useI18n } from "../i18n";

interface SavedCalculationsProps {
  onEditRoom: (calc: SavedRoomCalculation) => void;
  onEditAyadi: (calc: SavedAyadiCalculation) => void;
}

function isValidSaved(item: unknown): item is SavedCalculation {
  if (typeof item !== "object" || item === null) return false;
  const obj = item as Record<string, unknown>;
  if (typeof obj.id !== "string" || typeof obj.savedAt !== "string") return false;
  if (typeof obj.projectName !== "string") return false;
  return obj.type === "room" || obj.type === "ayadi";
}

export default function SavedCalculations({
  onEditRoom,
  onEditAyadi,
}: SavedCalculationsProps) {
  const { t } = useI18n();
  const [items, setItems] = useState<SavedCalculation[]>(() => loadSaved());
  const [printItem, setPrintItem] = useState<SavedCalculation | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SavedCalculation | null>(null);
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function refresh(next: SavedCalculation[]) {
    setItems(next);
  }

  function handleDelete() {
    if (!deleteTarget) return;
    refresh(deleteSaved(deleteTarget.id));
    setDeleteTarget(null);
  }

  function handleDuplicate(item: SavedCalculation) {
    const copy: SavedCalculation = {
      ...item,
      id: makeId(),
      projectName: `${item.projectName} (copy)`,
      savedAt: new Date().toISOString(),
    };
    const next = [copy, ...items];
    persistSaved(next);
    refresh(next);
  }

  function handleEdit(item: SavedCalculation) {
    if (item.type === "room") onEditRoom(item);
    else onEditAyadi(item);
  }

  function downloadFile(filename: string, content: string, type: string) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleExportAll() {
    downloadFile(
      "kerala-vasthu-saved-calculations.json",
      JSON.stringify(items, null, 2),
      "application/json",
    );
  }

  function handleExportHtml(item: SavedCalculation) {
    const title = item.type === "room" ? "Room" : "Ayadi";
    const content = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Kerala Vasthu Calculator — ${title} Calculation</title>
<style>
  body { font-family: system-ui, sans-serif; color: #1B3627; background: #fff; max-width: 720px; margin: 2rem auto; padding: 0 1rem; }
  h1 { font-size: 1.25rem; }
  table { border-collapse: collapse; width: 100%; }
  td, th { border-bottom: 1px solid #ddd; padding: 6px 8px; text-align: left; }
  .muted { color: #555; font-size: 0.8rem; }
</style>
</head>
<body>${document.getElementById("print-slot")?.innerHTML ?? ""}</body>
</html>`;
    downloadFile(
      `kerala-vasthu-${item.type}-${item.id.slice(0, 8)}.html`,
      content,
      "text/html",
    );
  }

  function handleImport(file: File) {
    file
      .text()
      .then((text) => {
        const parsed = JSON.parse(text);
        if (!Array.isArray(parsed)) throw new Error("Expected a JSON array");
        const valid = parsed.filter(isValidSaved);
        if (valid.length === 0) {
          setImportMessage("No valid calculations found in file.");
          return;
        }
        replaceAllSaved(valid);
        refresh(valid);
        setImportMessage(
          `Imported ${valid.length} calculation${valid.length === 1 ? "" : "s"}.`,
        );
      })
      .catch(() => {
        setImportMessage("Could not read file. Please provide a valid exported JSON file.");
      });
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-temple-900">{t("Saved Calculations")}</h1>
          <p className="mt-1 text-sm text-temple-800/70">
            {t("Stored locally in your browser.")}
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={handleExportAll} className="btn-secondary text-xs">
            <Download className="h-4 w-4" />
            {t("Export all (JSON)")}
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn-secondary text-xs"
          >
            <Upload className="h-4 w-4" />
            {t("Import JSON")}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleImport(f);
              e.target.value = "";
            }}
          />
        </div>
      </header>

      {importMessage && (
        <div className="flex items-center justify-between rounded-lg border border-temple-200 bg-temple-50 px-3 py-2 text-xs text-temple-800">
          {importMessage}
          <button
            type="button"
            onClick={() => setImportMessage(null)}
            aria-label="Dismiss"
            className="text-temple-800/60 hover:text-temple-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <SavedCalculationList
        items={items}
        onEdit={handleEdit}
        onDuplicate={handleDuplicate}
        onDelete={setDeleteTarget}
        onPrint={setPrintItem}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title={t("Delete calculation")}
        message={
          deleteTarget
            ? `${t("Delete")} "${deleteTarget.projectName}"?`
            : ""
        }
        confirmLabel={t("Delete")}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {printItem && (
        <div className="no-print fixed inset-0 z-40 overflow-y-auto bg-temple-900/40 p-4">
          <div className="mx-auto max-w-2xl">
            <div className="no-print mb-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-primary"
              >
                <Printer className="h-4 w-4" />
                {t("Print / Save PDF")}
              </button>
              <button
                type="button"
                onClick={() => handleExportHtml(printItem)}
                className="btn-secondary"
              >
                <Download className="h-4 w-4" />
                {t("Download HTML")}
              </button>
              <button
                type="button"
                onClick={() => setPrintItem(null)}
                className="btn-secondary"
              >
                {t("Close")}
              </button>
            </div>
            <div id="print-slot">
              <PrintView saved={printItem} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
