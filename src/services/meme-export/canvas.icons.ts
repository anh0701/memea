type CanvasContext = CanvasRenderingContext2D;

export function drawUserIcon(
  ctx: CanvasContext,
  x: number,
  y: number,
  size: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 24, size / 24);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1.8;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.arc(12, 8, 4, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(4, 21);
  ctx.bezierCurveTo(4, 16, 7, 14, 12, 14);
  ctx.bezierCurveTo(17, 14, 20, 16, 20, 21);
  ctx.stroke();

  ctx.restore();
}

export function drawSendIcon(
  ctx: CanvasContext,
  x: number,
  y: number,
  size: number,
  color: string,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 24, size / 24);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(22, 2);
  ctx.lineTo(11, 13);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(22, 2);
  ctx.lineTo(15, 22);
  ctx.lineTo(11, 13);
  ctx.lineTo(2, 9);
  ctx.closePath();
  ctx.stroke();

  ctx.restore();
}

export function drawBellIcon(
  ctx: CanvasContext,
  x: number,
  y: number,
  size: number,
  color: string,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 24, size / 24);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(18, 8);
  ctx.bezierCurveTo(18, 4, 16, 2, 12, 2);
  ctx.bezierCurveTo(8, 2, 6, 5, 6, 8);
  ctx.lineTo(5, 15);
  ctx.lineTo(3, 18);
  ctx.lineTo(21, 18);
  ctx.lineTo(19, 15);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(10, 21);
  ctx.lineTo(14, 21);
  ctx.stroke();

  ctx.restore();
}

export function drawHeartIcon(
  ctx: CanvasContext,
  x: number,
  y: number,
  size: number,
  color: string,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 24, size / 24);

  ctx.beginPath();
  ctx.moveTo(12, 21);
  ctx.bezierCurveTo(10, 19, 2, 13, 2, 7);
  ctx.bezierCurveTo(2, 2, 8, 1, 12, 6);
  ctx.bezierCurveTo(16, 1, 22, 2, 22, 7);
  ctx.bezierCurveTo(22, 13, 14, 19, 12, 21);
  ctx.closePath();

  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8;
  ctx.stroke();
  ctx.restore();
}

export function drawCommentIcon(
  ctx: CanvasContext,
  x: number,
  y: number,
  size: number,
  color: string,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 24, size / 24);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8;
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.roundRect(3, 3, 18, 14, 4);
  ctx.moveTo(8, 17);
  ctx.lineTo(6, 21);
  ctx.lineTo(13, 17);
  ctx.stroke();

  ctx.restore();
}

export function drawAvatar(
  ctx: CanvasContext,
  x: number,
  y: number,
  variant: "purple" | "orange",
) {
  const gradient = ctx.createLinearGradient(x, y, x + 36, y + 36);

  if (variant === "purple") {
    gradient.addColorStop(0, "#b79bff");
    gradient.addColorStop(1, "#7756df");
  } else {
    gradient.addColorStop(0, "#ffc178");
    gradient.addColorStop(1, "#ff875e");
  }

  ctx.save();
  ctx.beginPath();
  ctx.arc(x + 18, y + 18, 18, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.clip();
  drawUserIcon(ctx, x + 8, y + 8, 20);
  ctx.restore();
}
