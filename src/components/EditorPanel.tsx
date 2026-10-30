import {
  AtSign,
  Bell,
  Image,
  MessageCircle,
  Palette,
  PencilLine,
  ShieldCheck,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

import type { MemeDraft, MemeType } from "../types/meme";

import {
  ChatEditor,
  NotificationEditor,
  PostEditor,
  ImageMemeEditor,
  ThreadsEditor,
} from "./meme-editor";

import { fieldLabel } from "./meme-editor/editor.utils";

interface Props {
  draft: MemeDraft;
  onChange: (updates: Partial<MemeDraft>) => void;
}

const typeNames: Record<MemeType, string> = {
  chat: "Đoạn chat",
  notification: "Thông báo",
  post: "Bài đăng",
  image: "Ảnh + chữ",
  threads: "Threads",
};

const typeIcons: Record<MemeType, LucideIcon> = {
  chat: MessageCircle,
  notification: Bell,
  post: Smartphone,
  image: Image,
  threads: AtSign,
};

export default function EditorPanel({ draft, onChange }: Props) {
  const memeTypes = Object.keys(typeNames) as MemeType[];

  return (
    <div className="editor-panel">
      <div className="editor-heading">
        <div>
          <span className="eyebrow">STUDIO CỦA BẠN</span>
          <h2>
            Chỉnh meme{" "}
            <PencilLine size={22} strokeWidth={1.8} aria-hidden="true" />
          </h2>
        </div>

        <span className="step-pill">01 / EDIT</span>
      </div>

      <section className="editor-section">
        <h3>Chọn kiểu meme</h3>

        <div className="type-grid">
          {memeTypes.map((type) => {
            const Icon = typeIcons[type];

            return (
              <button
                className={`type-button ${
                  draft.type === type ? "selected" : ""
                }`}
                key={type}
                onClick={() => onChange({ type })}
                type="button"
                aria-pressed={draft.type === type}
              >
                <Icon size={20} strokeWidth={1.8} aria-hidden="true" />

                <span>{typeNames[type]}</span>
              </button>
            );
          })}
        </div>
      </section>

      {draft.type === "chat" && (
        <ChatEditor draft={draft} onChange={onChange} />
      )}

      {draft.type === "notification" && (
        <NotificationEditor draft={draft} onChange={onChange} />
      )}

      {draft.type === "post" && (
        <PostEditor draft={draft} onChange={onChange} />
      )}

      {draft.type === "image" && (
        <ImageMemeEditor draft={draft} onChange={onChange} />
      )}

      {draft.type === "threads" && (
        <ThreadsEditor draft={draft} onChange={onChange} />
      )}

      <section className="editor-section">
        <h3>
          <Palette size={18} strokeWidth={1.8} aria-hidden="true" />
          Không khí của meme
        </h3>

        <div className="two-fields">
          {fieldLabel(
            "Màu nền",
            <div className="color-field">
              <input
                type="color"
                value={draft.background}
                onChange={(event) =>
                  onChange({ background: event.target.value })
                }
              />
              <code>{draft.background}</code>
            </div>,
          )}

          {fieldLabel(
            "Màu nhấn",
            <div className="color-field">
              <input
                type="color"
                value={draft.accent}
                onChange={(event) => onChange({ accent: event.target.value })}
              />
              <code>{draft.accent}</code>
            </div>,
          )}
        </div>
      </section>

      <div className="editor-note">
        <ShieldCheck size={22} strokeWidth={1.8} aria-hidden="true" />

        <p>
          <strong>Nhãn giả lập luôn bật.</strong>
          <br />
          Watermark sẽ xuất hiện trong bản xem trước và được gắn vào ảnh tải
          xuống.
        </p>
      </div>
    </div>
  );
}
