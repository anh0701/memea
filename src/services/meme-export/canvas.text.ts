type CanvasContext = CanvasRenderingContext2D;

export function wrapText(
  ctx: CanvasContext,
  text: string,
  maxWidth: number,
): string[] {
  const result: string[] = [];

  for (const paragraph of text.split("\n")) {
    if (!paragraph) {
      result.push("");
      continue;
    }

    let line = "";

    for (const word of paragraph.split(/\s+/)) {
      const candidate = line ? `${line} ${word}` : word;

      if (ctx.measureText(candidate).width > maxWidth && line) {
        result.push(line);
        line = word;
      } else {
        line = candidate;
      }

      // Keep unusually long words inside the available width.
      if (ctx.measureText(line).width > maxWidth) {
        let part = "";

        for (const char of line) {
          if (part && ctx.measureText(part + char).width > maxWidth) {
            result.push(part);
            part = char;
          } else {
            part += char;
          }
        }

        line = part;
      }
    }

    if (line) result.push(line);
  }

  return result;
}

export function wrapChatText(
  ctx: CanvasContext,
  text: string,
  maxWidth: number,
): string[] {
  const result: string[] = [];

  for (const paragraph of text.split("\n")) {
    if (paragraph === "") {
      result.push("");
      continue;
    }

    const tokens = paragraph.match(/\s+|[^\s]+/g) || [];
    let line = "";

    for (const token of tokens) {
      const candidate = line + token;

      if (ctx.measureText(candidate).width <= maxWidth) {
        line = candidate;
        continue;
      }

      // Nếu token là khoảng trắng, chuyển sang dòng mới.
      if (/^\s+$/.test(token)) {
        if (line) {
          result.push(line);
          line = "";
        }
        continue;
      }

      // Nếu từ vừa với một dòng mới, chuyển cả từ xuống dòng.
      if (ctx.measureText(token).width <= maxWidth) {
        if (line) {
          result.push(line);
        }

        line = token;
        continue;
      }

      // Từ quá dài: ngắt theo từng ký tự,
      // tương tự overflow-wrap: anywhere.
      if (line) {
        result.push(line);
        line = "";
      }

      let part = "";

      for (const char of Array.from(token)) {
        const next = part + char;

        if (part && ctx.measureText(next).width > maxWidth) {
          result.push(part);
          part = char;
        } else {
          part = next;
        }
      }

      line = part;
    }

    if (line) {
      result.push(line);
    }
  }

  return result.length > 0 ? result : [""];
}

export function drawText(
  ctx: CanvasContext,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 100,
): number {
  const lines = wrapText(ctx, text, maxWidth).slice(0, maxLines);

  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });

  return y + lines.length * lineHeight;
}
