import { useId } from "react";
import type { ChangeEvent } from "react";
import { ImagePlus } from "lucide-react";

import type { EditorProps } from "../editor.utils";
import { fieldLabel } from "../editor.utils";

export default function ImageMemeEditor({ draft, onChange }: EditorProps) {
  const uploadId = useId();

  const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange({ imageUrl: reader.result });
      }
    };

    reader.readAsDataURL(file);

    // Cho phép chọn lại chính file vừa tải lên.
    event.target.value = "";
  };

  return (
    <section className="editor-section">
      <h3>Ảnh và caption</h3>

      <label className="upload-box" htmlFor={uploadId}>
        <ImagePlus size={23} />

        <strong>{draft.imageUrl ? "Chọn ảnh khác" : "Tải ảnh lên"}</strong>

        <span>PNG, JPG, WEBP · ảnh nằm trên máy bạn</span>

        <input
          id={uploadId}
          type="file"
          accept="image/*"
          onChange={uploadImage}
        />
      </label>

      {draft.imageUrl && (
        <button
          className="text-button"
          type="button"
          onClick={() => onChange({ imageUrl: "" })}
        >
          Xóa ảnh
        </button>
      )}

      {fieldLabel(
        "Chữ phía trên",
        <textarea
          rows={2}
          value={draft.imageTopText}
          onChange={(event) => onChange({ imageTopText: event.target.value })}
        />,
      )}

      {fieldLabel(
        "Chữ phía dưới",
        <textarea
          rows={2}
          value={draft.imageBottomText}
          onChange={(event) =>
            onChange({ imageBottomText: event.target.value })
          }
        />,
      )}
    </section>
  );
}
