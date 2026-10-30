import type { CSSProperties } from "react";

import type { MemeDraft } from "../types/meme";
import Watermark from "./Watermark";

import {
  ChatPreview,
  NotificationPreview,
  PostPreview,
  ImageMemePreview,
  ThreadsPreview,
} from "./meme-preview";

interface Props {
  draft: MemeDraft;
}

export default function MemePreview({ draft }: Props) {
  const style = {
    "--meme-bg": draft.background,
    "--meme-accent": draft.accent,
  } as CSSProperties;

  return (
    <div className="meme-canvas" id="meme-export" style={style}>
      {draft.type === "chat" && <ChatPreview draft={draft} />}

      {draft.type === "notification" && <NotificationPreview draft={draft} />}

      {draft.type === "post" && <PostPreview draft={draft} />}

      {draft.type === "image" && <ImageMemePreview draft={draft} />}

      {draft.type === "threads" && <ThreadsPreview draft={draft} />}

      <Watermark />
    </div>
  );
}
