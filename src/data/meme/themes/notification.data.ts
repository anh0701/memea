import type { MemeDraft } from "../../../types/meme";

export const defaultNotificationMeme: Pick<
  MemeDraft,
  "notificationApp" | "notificationTitle" | "notificationBody"
> = {
  notificationApp: "Lịch nhắc nhở",
  notificationTitle: "Một lời nhắc nho nhỏ",
  notificationBody:
    "Bạn đã trì hoãn việc này 17 ngày liên tiếp. Kỷ lục mới! 🏆",
};
