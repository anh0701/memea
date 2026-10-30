import { CONTENT_WIDTH, PADDING } from "../../../types/export";
import type { MemeDraft } from "../../../types/meme";
import { drawBellIcon } from "../canvas.icons";
import { drawText } from "../canvas.text";
import { roundedRect } from "../canvas.utils";

type CanvasContext = CanvasRenderingContext2D;

export function drawNotification(
  ctx: CanvasContext,
  draft: MemeDraft,
  startY: number,
): number {
  // Khung notification nằm trong vùng nội dung chính.
  const x = PADDING;
  const y = startY;
  const width = CONTENT_WIDTH;
  const height = 300;

  const gradient = ctx.createLinearGradient(x, y, x + width, y + height);

  gradient.addColorStop(0, "#b9a2ff");
  gradient.addColorStop(0.58, "#f3c4d5");
  gradient.addColorStop(1, "#ffddab");

  roundedRect(ctx, x, y, width, height, 12, gradient);

  // Đồng bộ padding ngang 4px của .notification-meme.
  const innerPadding = 4;
  const cardX = x + innerPadding;
  const cardY = y + 114;
  const cardWidth = width - innerPadding * 2;
  const cardHeight = 110;

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#ffffff";
  ctx.font = '600 50px "Space Grotesk", Arial, sans-serif';
  ctx.letterSpacing = "-2px";
  ctx.fillText("9:41", x + width / 2, y + 59);

  ctx.font = '800 8px "DM Sans", Arial, sans-serif';
  ctx.letterSpacing = "1.3px";
  ctx.fillText("THỨ HAI, MỘT NGÀY ĐẸP TRỜI", x + width / 2, y + 77);

  roundedRect(
    ctx,
    cardX,
    cardY,
    cardWidth,
    cardHeight,
    14,
    "rgba(255,255,255,0.86)",
    "rgba(255,255,255,0.55)",
  );

  roundedRect(ctx, cardX + 13, cardY + 13, 32, 32, 9, "#8d6bea");

  drawBellIcon(ctx, cardX + 19, cardY + 19, 20, "#ffffff");

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#81798e";
  ctx.font = '700 9px "DM Sans", Arial, sans-serif';

  ctx.fillText(
    draft.notificationApp || "Ứng dụng",
    cardX + 54,
    cardY + 22,
    cardWidth - 112,
  );

  ctx.textAlign = "right";
  ctx.font = '500 9px "DM Sans", Arial, sans-serif';
  ctx.fillText("vừa xong", cardX + cardWidth - 12, cardY + 22);

  ctx.textAlign = "left";
  ctx.fillStyle = "#302b3e";
  ctx.font = '700 12px "DM Sans", Arial, sans-serif';

  const titleEnd = drawText(
    ctx,
    draft.notificationTitle || "Tiêu đề thông báo",
    cardX + 54,
    cardY + 42,
    cardWidth - 68,
    16,
    2,
  );

  ctx.fillStyle = "#302b3e";
  ctx.font = '11px "DM Sans", Arial, sans-serif';

  drawText(
    ctx,
    draft.notificationBody || "Nội dung thông báo...",
    cardX + 54,
    titleEnd + 3,
    cardWidth - 68,
    15,
    3,
  );

  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = '600 9px "DM Sans", Arial, sans-serif';
  ctx.letterSpacing = "0px";

  ctx.fillText(
    "Nội dung hôm nay: tìm lý do để ngủ tiếp.",
    x + width / 2,
    y + height - 13,
    width - 16,
  );

  ctx.letterSpacing = "0px";

  return y + height;
}
