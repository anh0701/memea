import type { MemeDraft } from "../../../types/meme";

export const defaultPostMeme: Pick<
  MemeDraft,
  | "postName"
  | "postHandle"
  | "postContentType"
  | "postImageUrl"
  | "postText"
  | "likes"
  | "comments"
> = {
  postName: "Hội người hay hứa",
  postHandle: "@loinguyenngaymai",

  postContentType: "text",
  postImageUrl: "",

  postText: "Ngày mai mình sẽ bắt đầu sống healthy. Hôm nay ăn nốt cái đã.",

  likes: "2.4K",
  comments: "318",
};
