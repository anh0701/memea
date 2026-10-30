import { CONTENT_WIDTH, PADDING } from "../../../types/export";
import type { MemeDraft } from "../../../types/meme";
import {
  drawAvatar,
  drawCommentIcon,
  drawHeartIcon,
  drawSendIcon,
} from "../canvas.icons";
import { drawImageCover } from "../canvas.image";
import { drawText, wrapText } from "../canvas.text";
import { roundedRect } from "../canvas.utils";

type CanvasContext = CanvasRenderingContext2D;

export function drawPost(
  ctx: CanvasContext,
  draft: MemeDraft,
  startY: number,
  image: HTMLImageElement | null,
): number {
  const x = PADDING;
  const y = startY;
  const width = CONTENT_WIDTH;
  const cardX = x + 0;
  const cardY = y;
  const cardWidth = width;
  const inset = 15;

  const headerHeight = 45;
  const cardInnerWidth = cardWidth - inset * 2;

  ctx.font = "12px Arial, sans-serif";

  let contentHeight = 0;
  let postImageHeight = 0;
  let postCopyLines: string[] = [];

  if (draft.postContentType === "text") {
    contentHeight = 185;
  } else {
    postImageHeight = image
      ? Math.min(
          250,
          Math.max(
            120,
            (cardInnerWidth * image.naturalHeight) /
              Math.max(1, image.naturalWidth),
          ),
        )
      : 180;

    postCopyLines = wrapText(ctx, draft.postText || "", cardInnerWidth);
    contentHeight = postImageHeight + 14 + postCopyLines.length * 19 + 15;
  }

  const cardHeight = inset + headerHeight + 15 + contentHeight + 42 + 32;

  roundedRect(ctx, cardX, cardY, cardWidth, cardHeight, 13, "#ffffff");

  drawAvatar(ctx, cardX + inset, cardY + inset, "orange");

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#302b3e";
  ctx.font = "700 11px Arial, sans-serif";
  ctx.fillText(
    draft.postName || "Người dùng",
    cardX + inset + 45,
    cardY + inset + 15,
    cardWidth - 100,
  );

  ctx.fillStyle = "#96909e";
  ctx.font = "9px Arial, sans-serif";
  ctx.fillText(
    `${draft.postHandle || "@memelover"} · 2 giờ trước`,
    cardX + inset + 45,
    cardY + inset + 29,
    cardWidth - 100,
  );

  ctx.fillStyle = "#918a9c";
  ctx.font = "12px Arial, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("•••", cardX + cardWidth - inset, cardY + inset + 8);

  let contentY = cardY + inset + headerHeight + 15;

  if (draft.postContentType === "text") {
    const artGradient = ctx.createLinearGradient(
      cardX + inset,
      contentY,
      cardX + cardWidth - inset,
      contentY + contentHeight,
    );
    artGradient.addColorStop(0, "#ffb29b");
    artGradient.addColorStop(0.52, "#f9d9a8");
    artGradient.addColorStop(1, "#d5c8ff");

    roundedRect(
      ctx,
      cardX + inset,
      contentY,
      cardInnerWidth,
      contentHeight,
      10,
      artGradient,
    );

    ctx.save();
    ctx.translate(cardX + cardWidth / 2, contentY + contentHeight / 2);
    ctx.rotate((5 * Math.PI) / 180);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#30263d";
    ctx.font = '800 17px "Space Grotesk", Arial, sans-serif';

    const lines = wrapText(ctx, draft.postText || "", cardInnerWidth - 24);
    const lineHeight = 22;
    const firstY = -((lines.length - 1) * lineHeight) / 2;

    lines.forEach((line, index) => {
      ctx.fillText(line, 0, firstY + index * lineHeight);
    });

    ctx.restore();
    contentY += contentHeight;
  } else {
    const imageX = cardX + inset;
    const imageY = contentY;
    const imageW = cardInnerWidth;
    const imageH = postImageHeight;

    roundedRect(ctx, imageX, imageY, imageW, imageH, 5, "#ececec");

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(imageX, imageY, imageW, imageH, 5);
    ctx.clip();

    if (image) {
      drawImageCover(ctx, image, imageX, imageY, imageW, imageH);
    } else {
      ctx.fillStyle = "#f5f2f8";
      ctx.fillRect(imageX, imageY, imageW, imageH);
      ctx.fillStyle = "#8c78c3";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "12px Arial, sans-serif";
      ctx.fillText("Chưa có ảnh", imageX + imageW / 2, imageY + imageH / 2);
    }

    // Overlay text: the exact CSS for this element was not provided.
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.fillRect(imageX, imageY + imageH - 46, imageW, 46);

    ctx.fillStyle = "#ffffff";
    ctx.font = "700 12px Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    const overlayLines = wrapText(ctx, draft.postText || "", imageW - 24).slice(
      0,
      2,
    );
    overlayLines.forEach((line, index) => {
      ctx.fillText(line, imageX + 12, imageY + imageH - 30 + index * 15);
    });

    ctx.restore();

    contentY += imageH + 14;

    ctx.fillStyle = "#302b3e";
    ctx.font = "12px Arial, sans-serif";
    ctx.textBaseline = "top";
    contentY = drawText(
      ctx,
      draft.postText || "",
      cardX + inset,
      contentY,
      cardInnerWidth,
      19,
      20,
    );
    contentY += 14;
  }

  const statsY = cardY + cardHeight - 58;

  ctx.strokeStyle = "#f0edf3";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cardX + inset, statsY);
  ctx.lineTo(cardX + cardWidth - inset, statsY);
  ctx.stroke();

  ctx.font = "9px Arial, sans-serif";
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";
  ctx.fillStyle = "#938b9c";
  ctx.fillText(`${draft.likes} lượt thích`, cardX + inset, statsY + 13);

  ctx.textAlign = "right";
  ctx.fillText(
    `${draft.comments} bình luận`,
    cardX + cardWidth - inset,
    statsY + 13,
  );

  const actionsY = statsY + 29;
  const actionCenters = [
    cardX + cardWidth * 0.19,
    cardX + cardWidth * 0.5,
    cardX + cardWidth * 0.81,
  ];

  ctx.font = "700 10px Arial, sans-serif";
  ctx.fillStyle = "#726b7b";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  drawHeartIcon(ctx, actionCenters[0] - 24, actionsY - 8, 17, "#8d75df");
  ctx.fillText("Thích", actionCenters[0] - 3, actionsY);

  drawCommentIcon(ctx, actionCenters[1] - 32, actionsY - 8, 17, "#8d75df");
  ctx.fillText("Bình luận", actionCenters[1] - 9, actionsY);

  drawSendIcon(ctx, actionCenters[2] - 25, actionsY - 8, 17, "#8d75df");
  ctx.fillText("Chia sẻ", actionCenters[2] - 2, actionsY);

  return cardY + cardHeight;
}
