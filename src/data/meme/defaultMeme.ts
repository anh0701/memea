import type { MemeDraft } from "../../types/meme";

import { defaultChatMeme } from "./themes/chat.data";
import { defaultNotificationMeme } from "./themes/notification.data";
import { defaultPostMeme } from "./themes/post.data";
import { defaultImageMeme } from "./themes/image-meme.data";
import { defaultThreadsMeme } from "./themes/threads.data";

export const defaultMeme: MemeDraft = {
  type: "chat",
  title: "Meme chat",

  background: "#fff1d6",
  accent: "#8b5cf6",

  ...defaultChatMeme,
  ...defaultNotificationMeme,
  ...defaultPostMeme,
  ...defaultImageMeme,
  ...defaultThreadsMeme,
};
