
import { CONTENT_WIDTH, PADDING } from "../../../types/export";
import type { MemeDraft, ThreadsPost, ThreadsReply } from "../../../types/meme";
import {
  drawCommentIcon,
  drawHeartIcon,
  drawSendIcon,
} from "../canvas.icons";
import { wrapText } from "../canvas.text";
import { roundedRect } from "../canvas.utils";

type CanvasContext = CanvasRenderingContext2D;

const AVATAR_SIZE = 36;
const AVATAR_COLUMN_WIDTH = 48;
const CARD_PADDING = 18;
const HEADER_HEIGHT = 38;
const LINE_HEIGHT = 19;
const ITEM_GAP = 22;

interface ThreadItemLayout {
  avatarY: number;
  contentY: number;
  textLines: string[];
  actionsY: number;
  bottomY: number;
}

function getItemLayout(
  ctx: CanvasContext,
  item: ThreadsPost | ThreadsReply,
  y: number,
  contentWidth: number,
): ThreadItemLayout {
  ctx.font = "13px Arial, sans-serif";

  const textLines = wrapText(ctx, item.text || "", contentWidth);

  const contentY = y;
  const textY = contentY + 43;
  const actionsY = textY + Math.max(1, textLines.length) * LINE_HEIGHT + 14;

  return {
    avatarY: y,
    contentY,
    textLines,
    actionsY,
    bottomY: actionsY + 20,
  };
}

function drawAvatar(
  ctx: CanvasContext,
  x: number,
  y: number,
  name: string,
  color: string,
) {
  const centerX = x + AVATAR_SIZE / 2;
  const centerY = y + AVATAR_SIZE / 2;

  ctx.save();

  ctx.beginPath();
  ctx.arc(centerX, centerY, AVATAR_SIZE / 2, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();

  ctx.fillStyle = "#333333";
  ctx.font = "700 15px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(
    (name || "?").charAt(0).toUpperCase(),
    centerX,
    centerY,
  );

  ctx.restore();
}

function drawUserHeader(
  ctx: CanvasContext,
  item: ThreadsPost | ThreadsReply,
  x: number,
  y: number,
  width: number,
) {
  ctx.save();

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  ctx.font = "700 12px Arial, sans-serif";
  ctx.fillStyle = "#101010";

  ctx.fillText(
    item.username || "@username",
    x,
    y + 12,
    width * 0.7,
  );

  const usernameWidth = ctx.measureText(
    item.username || "@username",
  ).width;

  ctx.font = "10px Arial, sans-serif";
  ctx.fillStyle = "#999999";

  ctx.fillText(
    item.time || "",
    x + Math.min(usernameWidth + 9, width * 0.72),
    y + 12,
    width * 0.28,
  );

  ctx.textAlign = "right";
  ctx.font = "12px Arial, sans-serif";
  ctx.fillStyle = "#777777";
  ctx.fillText("•••", x + width, y + 12);

  ctx.textAlign = "left";
  ctx.font = "11px Arial, sans-serif";
  ctx.fillStyle = "#777777";
  ctx.fillText(item.name || "", x, y + 29, width);

  ctx.restore();
}

function drawItemText(
  ctx: CanvasContext,
  lines: string[],
  x: number,
  y: number,
) {
  ctx.save();

  ctx.font = "13px Arial, sans-serif";
  ctx.fillStyle = "#101010";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * LINE_HEIGHT);
  });

  ctx.restore();
}

function drawActions(
  ctx: CanvasContext,
  item: ThreadsPost | ThreadsReply,
  x: number,
  y: number,
  width: number,
  isPost: boolean,
  replyCount: number,
) {
  const iconSize = 16;
  const iconY = y - 8;

  const positions = [
    x,
    x + width * 0.3,
    x + width * 0.58,
    x + width * 0.83,
  ];

  drawHeartIcon(ctx, positions[0], iconY, iconSize, "#555555");

  ctx.save();
  ctx.font = "10px Arial, sans-serif";
  ctx.fillStyle = "#777777";
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";

  ctx.fillText(
    item.likes || "0",
    positions[0] + 21,
    y,
  );

  drawCommentIcon(
    ctx,
    positions[1],
    iconY,
    iconSize,
    "#555555",
  );

  if (isPost) {
    ctx.fillText(
      String(replyCount),
      positions[1] + 21,
      y,
    );
  }

  ctx.font = "19px Arial, sans-serif";
  ctx.fillText("↻", positions[2], y + 1);

  drawSendIcon(
    ctx,
    positions[3],
    iconY,
    iconSize,
    "#555555",
  );

  ctx.restore();
}

export function drawThreads(
  ctx: CanvasContext,
  draft: MemeDraft,
  startY: number,
): number {
  const x = PADDING;
  const cardY = startY;
  const width = CONTENT_WIDTH;

  const contentX = x + CARD_PADDING + AVATAR_COLUMN_WIDTH;
  const contentWidth =
    width - CARD_PADDING * 2 - AVATAR_COLUMN_WIDTH;

  const post = draft.threadsPost;
  const replies = draft.threadsReplies;

  // Tính vị trí bài đăng chính và từng phản hồi.
  let currentY = cardY + CARD_PADDING + HEADER_HEIGHT + 12;

  const postLayout = getItemLayout(
    ctx,
    post,
    currentY,
    contentWidth,
  );

  currentY = postLayout.bottomY + ITEM_GAP;

  const replyLayouts: ThreadItemLayout[] = [];

  replies.forEach((reply) => {
    const layout = getItemLayout(
      ctx,
      reply,
      currentY,
      contentWidth,
    );

    replyLayouts.push(layout);
    currentY = layout.bottomY + ITEM_GAP;
  });

  const cardHeight =
    currentY - cardY + CARD_PADDING - ITEM_GAP;

  // Card nền.
  roundedRect(
    ctx,
    x,
    cardY,
    width,
    cardHeight,
    14,
    "#ffffff",
  );

  // Viền card.
  ctx.save();
  ctx.strokeStyle = "#eeeeee";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x, cardY, width, cardHeight, 14);
  ctx.stroke();
  ctx.restore();

  // Header Threads.
  ctx.save();
  ctx.font = "800 22px Arial, sans-serif";
  ctx.fillStyle = "#101010";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(
    "threads",
    x + CARD_PADDING,
    cardY + CARD_PADDING + 22,
  );

  ctx.font = "12px Arial, sans-serif";
  ctx.fillStyle = "#777777";
  ctx.textAlign = "right";
  ctx.fillText(
    "•••",
    x + width - CARD_PADDING,
    cardY + CARD_PADDING + 20,
  );
  ctx.restore();

  // Bài đăng chính.
  drawAvatar(
    ctx,
    x + CARD_PADDING,
    postLayout.avatarY,
    post.name,
    "#e8e8e8",
  );

  drawUserHeader(
    ctx,
    post,
    contentX,
    postLayout.contentY,
    contentWidth,
  );

  drawItemText(
    ctx,
    postLayout.textLines,
    contentX,
    postLayout.contentY + 43,
  );

  drawActions(
    ctx,
    post,
    contentX,
    postLayout.actionsY,
    contentWidth,
    true,
    replies.length,
  );

  // Đường phân cách trước phần phản hồi.
  if (replies.length > 0) {
    const dividerY = postLayout.bottomY + 1;

    ctx.save();
    ctx.strokeStyle = "#eeeeee";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(
      x + CARD_PADDING,
      dividerY,
    );
    ctx.lineTo(
      x + width - CARD_PADDING,
      dividerY,
    );
    ctx.stroke();
    ctx.restore();
  }

  // Đường nối giữa các bình luận, không nối với bài viết chính.
  if (replyLayouts.length > 1) {
    const lineX = x + CARD_PADDING + AVATAR_SIZE / 2;

    ctx.save();
    ctx.strokeStyle = "#e5e5e5";
    ctx.lineWidth = 1.5;

    replyLayouts.slice(0, -1).forEach((layout, index) => {
      const nextLayout = replyLayouts[index + 1];

      ctx.beginPath();
      ctx.moveTo(
        lineX,
        layout.avatarY + AVATAR_SIZE,
      );
      ctx.lineTo(
        lineX,
        nextLayout.avatarY,
      );
      ctx.stroke();
    });

    ctx.restore();
  }

  // Các phản hồi.
  replies.forEach((reply, index) => {
    const layout = replyLayouts[index];

    drawAvatar(
      ctx,
      x + CARD_PADDING,
      layout.avatarY,
      reply.name,
      "#eeeeee",
    );

    drawUserHeader(
      ctx,
      reply,
      contentX,
      layout.contentY,
      contentWidth,
    );

    drawItemText(
      ctx,
      layout.textLines,
      contentX,
      layout.contentY + 43,
    );

    drawActions(
      ctx,
      reply,
      contentX,
      layout.actionsY,
      contentWidth,
      false,
      0,
    );
  });

  return cardY + cardHeight;
}
