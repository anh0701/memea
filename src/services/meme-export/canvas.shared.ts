import { LOGICAL_WIDTH } from "../../types/export";
import type { MemeDraft } from "../../types/meme";
import { assertNever } from "../../utils/type.utils";

type CanvasContext = CanvasRenderingContext2D;

export function drawBackground(
  ctx: CanvasContext,
  height: number,
  color: string,
) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, LOGICAL_WIDTH, height);
}

export function drawWatermark(ctx: CanvasContext, y: number) {
  const label = "fake meme";

  ctx.save();
  ctx.font = '800 8px "DM Sans", Arial, sans-serif';
  ctx.letterSpacing = "1.05px";

  const iconSize = 13;
  const gap = 5;
  const textWidth = ctx.measureText(label).width;
  const totalWidth = iconSize + gap + textWidth;
  const startX = (LOGICAL_WIDTH - totalWidth) / 2;
  const centerY = y + 7;

  // ShieldCheck icon, approximated with Canvas paths.
  ctx.save();
  ctx.translate(startX, centerY - iconSize / 2);
  ctx.scale(iconSize / 24, iconSize / 24);
  ctx.strokeStyle = "#625b70";
  ctx.lineWidth = 2.4;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(12, 22);
  ctx.bezierCurveTo(7, 20, 3, 16, 3, 10);
  ctx.lineTo(3, 5);
  ctx.lineTo(12, 2);
  ctx.lineTo(21, 5);
  ctx.lineTo(21, 10);
  ctx.bezierCurveTo(21, 16, 17, 20, 12, 22);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(8, 12);
  ctx.lineTo(11, 15);
  ctx.lineTo(17, 9);
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = "#625b70";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.globalAlpha = 0.95;
  ctx.fillText(label, startX + iconSize + gap, centerY);
  ctx.restore();
}

export function getInitialContentHeight(draft: MemeDraft): number {
  switch (draft.type) {
    case "chat": {
      // Ước lượng bảo thủ để không bị cắt nội dung khi vẽ.
      // 35 ký tự/dòng thấp hơn khả năng hiển thị thực tế,
      // giúp dự phòng cả chữ tiếng Việt có độ rộng khác nhau.
      const messagesHeight = draft.messages.reduce((total, message) => {
        const text = message.text || "...";
        const estimatedLines = Math.max(1, Math.ceil(text.length / 35));

        return total + estimatedLines * 18 + 38;
      }, 0);

      return (
        63 +
        32 +
        messagesHeight +
        Math.max(0, draft.messages.length - 1) * 9 +
        42
      );
    }

    case "notification":
      return 300;

    case "post":
      return 600;

    case "image": {
      const topLength = (draft.imageTopText || "CHỮ Ở PHÍA TRÊN").length;
      const bottomLength = (draft.imageBottomText || "CHỮ Ở PHÍA DƯỚI").length;

      const topLines = Math.max(1, Math.ceil(topLength / 35));
      const bottomLines = Math.max(1, Math.ceil(bottomLength / 35));

      return 450 + (topLines + bottomLines) * 24;
    }

    case "threads":
      return 400 + draft.threadsReplies.length * 110;

    default:
      return assertNever(draft.type);
  }
}
