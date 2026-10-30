import type { MemeDraft } from "../../../types/meme";

export const defaultThreadsMeme: Pick<
  MemeDraft,
  "threadsPost" | "threadsReplies" | "showMainPost"
> = {
  showMainPost: true,

  threadsPost: {
    name: "Người hay trì hoãn",
    username: "@ngaymai_lam",
    text: "Từ ngày mai mình sẽ bắt đầu dậy sớm, tập thể dục và ăn uống lành mạnh.",
    time: "2 giờ",
    likes: "1.2K",
  },

  threadsReplies: [
    {
      id: "r1",
      name: "Bạn thân",
      username: "@ban_than",
      text: "Câu này nghe quen quen, tuần trước cũng nói.",
      time: "1 giờ",
      likes: "128",
    },
    {
      id: "r2",
      name: "Người hay trì hoãn",
      username: "@ngaymai_lam",
      text: "Lần này khác, lần này mình nghiêm túc!",
      time: "58 phút",
      likes: "56",
    },
    {
      id: "r3",
      name: "Bạn thân",
      username: "@ban_than",
      text: "Ừ, thế hôm nay mấy giờ dậy?",
      time: "45 phút",
      likes: "89",
    },
    {
      id: "r4",
      name: "Người hay trì hoãn",
      username: "@ngaymai_lam",
      text: "Ngày mai nhé...",
      time: "30 phút",
      likes: "342",
    },
  ],
};
