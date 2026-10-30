import { CONTENT_WIDTH, PADDING } from "../../../types/export";
import type { MemeDraft } from "../../../types/meme";
import { drawImageContain, loadImage } from "../canvas.image";
import { wrapText } from "../canvas.text";
import { roundedRect } from "../canvas.utils";

type CanvasContext = CanvasRenderingContext2D;

export async function drawImageMeme(
  ctx: CanvasContext,
  draft: MemeDraft,
  startY: number,
): Promise<number> {
  const x = PADDING;
  const y = startY;
  const width = CONTENT_WIDTH;
  const gap = 12;

  ctx.font = '900 20px Impact, "Arial Black", sans-serif';
  const topText = draft.imageTopText || "CHỮ Ở PHÍA TRÊN";
  const bottomText = draft.imageBottomText || "CHỮ Ở PHÍA DƯỚI";

  const topLines = wrapText(ctx, topText, width);
  const bottomLines = wrapText(ctx, bottomText, width);

  const lineHeight = 24;
  const topHeight = Math.max(lineHeight, topLines.length * lineHeight);
  const bottomHeight = Math.max(lineHeight, bottomLines.length * lineHeight);

  const image = await loadImage(draft.imageUrl);

  let imageHeight = 210;

  if (image) {
    const naturalRatio = image.naturalHeight / Math.max(1, image.naturalWidth);
    imageHeight = Math.min(360, width * naturalRatio);
    imageHeight = Math.max(80, imageHeight);
  }

  let currentY = y;

  function drawCaptionLines(lines: string[], boxY: number) {
    ctx.save();
    ctx.font = '900 20px Impact, "Arial Black", sans-serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.lineJoin = "round";
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#ffffff";
    ctx.fillStyle = "#211c29";

    lines.forEach((line, index) => {
      ctx.strokeText(line, x + width / 2, boxY + index * lineHeight, width);
      ctx.fillText(line, x + width / 2, boxY + index * lineHeight, width);
    });

    ctx.restore();
  }

  drawCaptionLines(topLines, currentY);
  currentY += topHeight + gap;

  if (image) {
    roundedRect(ctx, x, currentY, width, imageHeight, 5, "#ffffff");

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(x, currentY, width, imageHeight, 5);
    ctx.clip();
    drawImageContain(ctx, image, x, currentY, width, imageHeight);
    ctx.restore();
  } else {
    roundedRect(
      ctx,
      x,
      currentY,
      width,
      imageHeight,
      12,
      "#fff9f1",
      "#cbbcf4",
      2,
    );

    ctx.fillStyle = "#8c78c3";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "700 47px monospace";
    ctx.fillText("ಠ_ಠ", x + width / 2, currentY + imageHeight / 2 - 25);

    ctx.font = "700 12px Arial, sans-serif";
    ctx.fillText(
      "Ảnh meme của bạn sẽ ở đây",
      x + width / 2,
      currentY + imageHeight / 2 + 17,
    );

    ctx.fillStyle = "#a49aaf";
    ctx.font = "10px Arial, sans-serif";
    ctx.fillText(
      "Tải ảnh lên từ bảng chỉnh sửa",
      x + width / 2,
      currentY + imageHeight / 2 + 35,
    );
  }

  currentY += imageHeight + gap;
  drawCaptionLines(bottomLines, currentY);
  currentY += bottomHeight;

  return currentY;
}
