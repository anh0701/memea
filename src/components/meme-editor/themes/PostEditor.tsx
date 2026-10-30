import { useId } from "react";
import type { ChangeEvent } from "react";
import { Image, ImagePlus, Type } from "lucide-react";

import type { EditorProps } from "../editor.utils";
import { fieldLabel } from "../editor.utils";

export default function PostEditor({ draft, onChange }: EditorProps) {
  const uploadId = useId();

  const uploadPostImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange({
          postImageUrl: reader.result,
        });
      }
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  return (
    <section className="editor-section">
      <h3>Bài đăng giả lập</h3>

      {fieldLabel(
        "Tên hiển thị",
        <input
          value={draft.postName}
          onChange={(event) => onChange({ postName: event.target.value })}
        />,
      )}

      {fieldLabel(
        "Tên tài khoản",
        <input
          value={draft.postHandle}
          onChange={(event) => onChange({ postHandle: event.target.value })}
        />,
      )}

      <div className="field">
        <span>Loại nội dung</span>

        <div className="type-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <button
            type="button"
            className={`type-button ${
              draft.postContentType === "text" ? "selected" : ""
            }`}
            onClick={() => onChange({ postContentType: "text" })}
            aria-pressed={draft.postContentType === "text"}
          >
            <Type size={20} />
            <span>Chữ</span>
          </button>

          <button
            type="button"
            className={`type-button ${
              draft.postContentType === "image" ? "selected" : ""
            }`}
            onClick={() => onChange({ postContentType: "image" })}
            aria-pressed={draft.postContentType === "image"}
          >
            <Image size={20} />
            <span>Ảnh</span>
          </button>
        </div>
      </div>

      {draft.postContentType === "image" && (
        <>
          <label className="upload-box" htmlFor={uploadId}>
            <ImagePlus size={22} />

            <strong>
              {draft.postImageUrl ? "Đổi ảnh" : "Tải ảnh bài đăng"}
            </strong>

            <span>PNG, JPG, WEBP</span>

            <input
              id={uploadId}
              type="file"
              accept="image/*"
              onChange={uploadPostImage}
            />
          </label>

          {draft.postImageUrl && (
            <button
              className="text-button"
              type="button"
              onClick={() => onChange({ postImageUrl: "" })}
            >
              Xóa ảnh
            </button>
          )}
        </>
      )}

      {fieldLabel(
        draft.postContentType === "image"
          ? "Caption (đồng thời hiển thị đè lên ảnh)"
          : "Nội dung bài đăng",
        <textarea
          rows={4}
          value={draft.postText}
          onChange={(event) => onChange({ postText: event.target.value })}
        />,
      )}

      <div className="two-fields">
        {fieldLabel(
          "Lượt thích",
          <input
            value={draft.likes}
            onChange={(event) => onChange({ likes: event.target.value })}
          />,
        )}

        {fieldLabel(
          "Bình luận",
          <input
            value={draft.comments}
            onChange={(event) => onChange({ comments: event.target.value })}
          />,
        )}
      </div>
    </section>
  );
}
