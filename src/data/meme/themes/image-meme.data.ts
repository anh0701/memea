import type { MemeDraft } from "../../../types/meme";

export const defaultImageMeme: Pick<
  MemeDraft,
  "imageUrl" | "imageTopText" | "imageBottomText"
> = {
  imageUrl: "",
  imageTopText: "TÔI: TỪ MAI SẼ TIẾT KIỆM",
  imageBottomText: "CŨNG LÀ TÔI KHI THẤY SALE",
};
