import { CONTENT_WIDTH, PADDING } from "../../../types/export";
import type { MemeDraft } from "../../../types/meme";
import { drawAvatar, drawSendIcon } from "../canvas.icons";
import { wrapChatText } from "../canvas.text";
import { roundedRect } from "../canvas.utils";

type CanvasContext = CanvasRenderingContext2D;

export function drawChat(
  ctx: CanvasContext,
  draft: MemeDraft,
  startY: number,
): number {
  const x = PADDING;
  const y = startY;
  const width = CONTENT_WIDTH;

  const headerHeight = 63;
  const inputHeight = 32;
  const messages = draft.messages;

  const messageAreaWidth = width - 24;
  const maxBubbleWidth = messageAreaWidth * 0.84;
  const maxTextWidth = maxBubbleWidth - 20;

  // Đo chữ bằng đúng font Preview.
  ctx.font = '12px "DM Sans", sans-serif';

  const messageLayouts = messages.map((message) => {
    const text = message.text || "...";
    const lines = wrapChatText(ctx, text, maxTextWidth);

    const textHeight = Math.max(18, lines.length * 18);

    // Bubble gồm:
    // padding trên 9px + nội dung + margin dưới 5px
    // + dòng thời gian khoảng 9px + padding dưới 6px.
    const bubbleHeight = textHeight + 29;

    const textWidth = Math.max(
      0,
      ...lines.map((line) => ctx.measureText(line).width),
    );

    const bubbleWidth = Math.min(maxBubbleWidth, Math.max(75, textWidth + 20));

    return {
      message,
      lines,
      bubbleHeight,
      bubbleWidth,
    };
  });

  const messagesHeight =
    messageLayouts.reduce((sum, item) => sum + item.bubbleHeight, 0) +
    Math.max(0, messages.length - 1) * 9;

  // Khu vực tin nhắn có padding trên/dưới 16px.
  // Input có margin-bottom 10px.
  const cardHeight = headerHeight + 32 + messagesHeight + 9 + inputHeight + 10;

  // Vẽ khung chat.
  roundedRect(ctx, x, y, width, cardHeight, 14, "#f7f7fb", "#e9e4ed");

  ctx.save();

  ctx.beginPath();
  ctx.roundRect(x, y, width, cardHeight, 14);
  ctx.clip();

  // Header.
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x, y, width, headerHeight);

  ctx.strokeStyle = "#eae6ef";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, y + headerHeight);
  ctx.lineTo(x + width, y + headerHeight);
  ctx.stroke();

  drawAvatar(ctx, x + 13, y + 13, "purple");

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#302b3e";
  ctx.font = '700 12px "DM Sans", sans-serif';

  ctx.fillText(draft.chatFriend || "Đứa bạn thân", x + 59, y + 28, width - 100);

  ctx.fillStyle = "#9991a4";
  ctx.font = '9px "DM Sans", sans-serif';

  ctx.fillText("đang hoạt động", x + 59, y + 42);

  ctx.beginPath();
  ctx.arc(x + width - 14, y + 19, 3.5, 0, Math.PI * 2);
  ctx.fillStyle = "#66c88c";
  ctx.fill();

  // Messages.
  let messageY = y + headerHeight + 16;

  for (const item of messageLayouts) {
    const isMe = item.message.sender === "me";

    const bubbleX = isMe ? x + width - 12 - item.bubbleWidth : x + 12;

    roundedRect(
      ctx,
      bubbleX,
      messageY,
      item.bubbleWidth,
      item.bubbleHeight,
      12,
      isMe ? "#dcd0ff" : "#ffffff",
    );

    // Nội dung tin nhắn.
    ctx.fillStyle = "#302b3e";
    ctx.font = '12px "DM Sans", sans-serif';
    ctx.textBaseline = "top";
    ctx.textAlign = "left";

    item.lines.forEach((line, index) => {
      ctx.fillText(line, bubbleX + 10, messageY + 9 + index * 18);
    });

    // Thời gian.
    ctx.fillStyle = "#9a92a5";
    ctx.font = '8px "DM Sans", sans-serif';
    ctx.textAlign = "right";
    ctx.textBaseline = "alphabetic";

    ctx.fillText(
      item.message.time || "",
      bubbleX + item.bubbleWidth - 8,
      messageY + item.bubbleHeight - 6,
    );

    messageY += item.bubbleHeight + 9;
  }

  // Ô nhập tin nhắn.
  const inputY = y + cardHeight - inputHeight - 10;

  roundedRect(
    ctx,
    x + 10,
    inputY,
    width - 20,
    inputHeight,
    18,
    "#ffffff",
    "#eee9f2",
  );

  ctx.fillStyle = "#aaa2b2";
  ctx.font = '10px "DM Sans", sans-serif';
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";

  ctx.fillText("Nhập tin nhắn...", x + 21, inputY + inputHeight / 2);

  drawSendIcon(ctx, x + width - 32, inputY + 9, 15, "#8b68ec");

  ctx.restore();

  return y + cardHeight;
}
