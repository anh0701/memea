import { useState } from "react";
import { Download, Image, LoaderCircle } from "lucide-react";

import { exportMemeImage } from "../services/meme-export/meme-export.service";
import type { MemeDraft } from "../types/meme";
import type { MemeExportFormat } from "../types/export";

interface ExportButtonsProps {
  draft: MemeDraft;
  filename: string;
}

export default function ExportButtons({ draft, filename }: ExportButtonsProps) {
  const [exporting, setExporting] = useState<MemeExportFormat | null>(null);
  const [error, setError] = useState("");

  async function handleExport(format: MemeExportFormat) {
    if (exporting) return;

    setExporting(format);
    setError("");

    try {
      await exportMemeImage(draft, format, filename);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Xuất ảnh thất bại. Vui lòng thử lại.",
      );
    } finally {
      setExporting(null);
    }
  }

  return (
    <div className="export-actions">
      <button
        type="button"
        className="export-button export-button-primary"
        onClick={() => void handleExport("png")}
        disabled={exporting !== null}
      >
        {exporting === "png" ? (
          <LoaderCircle className="animate-spin" size={18} />
        ) : (
          <Download size={18} />
        )}

        <span>{exporting === "png" ? "Đang xuất PNG..." : "Xuất PNG"}</span>
      </button>

      <button
        type="button"
        className="export-button export-button-secondary"
        onClick={() => void handleExport("jpg")}
        disabled={exporting !== null}
      >
        {exporting === "jpg" ? (
          <LoaderCircle className="animate-spin" size={18} />
        ) : (
          <Image size={18} />
        )}

        <span>{exporting === "jpg" ? "Đang xuất JPG..." : "Xuất JPG"}</span>
      </button>

      {error && (
        <p className="export-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
