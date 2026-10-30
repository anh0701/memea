import type { MemeDraft } from "../../../types/meme";

export const defaultChatMeme: Pick<
  MemeDraft,
  "chatName" | "chatFriend" | "messages"
> = {
  chatName: "Tui",
  chatFriend: "Đứa bạn thân",

  messages: [
    {
      id: "m1",
      sender: "them",
      text: "Mai dậy sớm chạy bộ không?",
      time: "22:41",
    },
    {
      id: "m2",
      sender: "me",
      text: "Có chứ, quyết tâm rồi!",
      time: "22:42",
    },
    {
      id: "m3",
      sender: "them",
      text: "Mấy giờ?",
      time: "22:42",
    },
    {
      id: "m4",
      sender: "me",
      text: "Tầm... chiều 😭",
      time: "22:43",
    },
  ],
};
