import {
  CANVAS_WIDTH,
  PADDING,
  SCALE,
  WATERMARK_MARGIN_TOP,
  type MemeExportFormat,
} from "../../types/export";
import type { MemeDraft } from "../../types/meme";
import { canvasToBlob, downloadBlob, loadImage } from "./canvas.image";
import {
  drawBackground,
  drawWatermark,
  getInitialContentHeight,
} from "./canvas.shared";
import {
  drawChat,
  drawImageMeme,
  drawNotification,
  drawPost,
  drawThreads,
} from "./themes";

function estimateThreadsHeight(
  draft: Pick<MemeDraft, "threadsPost" | "threadsReplies" | "showMainPost">,
): number {
  const items = [
    ...(draft.showMainPost ? [draft.threadsPost] : []),
    ...draft.threadsReplies,
  ];

  const estimatedItemHeight = items.reduce((total, item) => {
    const lineCount = Math.max(1, Math.ceil((item.text || "").length / 35));

    return total + 100 + lineCount * 19;
  }, 0);

  return 120 + estimatedItemHeight + items.length * 22;
}

export async function exportMemeImage(
  draft: MemeDraft,
  format: MemeExportFormat,
  filename: string,
): Promise<void> {
  // Đảm bảo DM Sans và Space Grotesk đã sẵn sàng trước khi đo/vẽ chữ.
  await document.fonts.ready;

  const canvas = document.createElement("canvas");

  // Threads có chiều cao phụ thuộc số lượng và nội dung phản hồi.
  const initialContentHeight =
    draft.type === "threads"
      ? estimateThreadsHeight(draft)
      : getInitialContentHeight(draft);

  const initialHeight = initialContentHeight + PADDING * 2 + 50;

  canvas.width = CANVAS_WIDTH;
  canvas.height = Math.ceil(initialHeight * SCALE);

  let ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Trình duyệt không hỗ trợ Canvas 2D.");
  }

  ctx.scale(SCALE, SCALE);
  ctx.textBaseline = "alphabetic";

  drawBackground(ctx, initialHeight, draft.background);

  let contentBottom = PADDING;

  switch (draft.type) {
    case "chat":
      contentBottom = drawChat(ctx, draft, PADDING);
      break;

    case "notification":
      contentBottom = drawNotification(ctx, draft, PADDING);
      break;

    case "post": {
      const image =
        draft.postContentType === "image"
          ? await loadImage(draft.postImageUrl)
          : null;

      contentBottom = drawPost(ctx, draft, PADDING, image);
      break;
    }

    case "image":
      contentBottom = await drawImageMeme(ctx, draft, PADDING);
      break;

    case "threads":
      contentBottom = drawThreads(ctx, draft, PADDING);
      break;
  }

  const watermarkY = contentBottom + WATERMARK_MARGIN_TOP;

  const finalLogicalHeight = Math.ceil(watermarkY + 18 + PADDING);

  const finalPixelHeight = Math.ceil(finalLogicalHeight * SCALE);

  // Lưu bitmap đã vẽ trước khi resize Canvas.
  const previousCanvas = document.createElement("canvas");
  previousCanvas.width = canvas.width;
  previousCanvas.height = canvas.height;

  const previousContext = previousCanvas.getContext("2d");

  if (!previousContext) {
    throw new Error("Không thể lưu nội dung ảnh.");
  }

  previousContext.drawImage(canvas, 0, 0);

  const previousPixelHeight = previousCanvas.height;
  const copiedHeight = Math.min(previousPixelHeight, finalPixelHeight);

  // Resize Canvas về chiều cao cuối cùng.
  canvas.height = finalPixelHeight;

  ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Không thể hoàn tất ảnh xuất.");
  }

  // Khôi phục bitmap theo tọa độ pixel 1:1.
  ctx.drawImage(
    previousCanvas,
    0,
    0,
    canvas.width,
    copiedHeight,
    0,
    0,
    canvas.width,
    copiedHeight,
  );

  // Bổ sung nền nếu chiều cao cuối lớn hơn bitmap ban đầu.
  if (finalPixelHeight > previousPixelHeight) {
    ctx.fillStyle = draft.background;
    ctx.fillRect(
      0,
      previousPixelHeight,
      canvas.width,
      finalPixelHeight - previousPixelHeight,
    );
  }

  // Thiết lập lại hệ tọa độ logic sau khi resize.
  ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
  ctx.textBaseline = "alphabetic";

  drawWatermark(ctx, watermarkY);

  let exportCanvas = canvas;

  if (format === "jpg") {
    exportCanvas = document.createElement("canvas");
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;

    const exportContext = exportCanvas.getContext("2d");

    if (!exportContext) {
      throw new Error("Không thể xử lý nền ảnh JPG.");
    }

    exportContext.fillStyle = "#ffffff";
    exportContext.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    exportContext.drawImage(canvas, 0, 0);
  }

  const blob = await canvasToBlob(exportCanvas, format);

  const safeFilename = filename.replace(/\.(png|jpe?g)$/i, "");

  downloadBlob(blob, `${safeFilename}.${format}`);
}
