export function drawFakeIdFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
): void {
  ctx.fillStyle = "#37474f";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#eceff1";
  ctx.fillRect(20, 30, 600, 300);
  ctx.fillStyle = "#b0bec5";
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(40, 50 + i * 28, 200 + i * 20, 10);
  }
  ctx.fillStyle = "#ffe082";
  ctx.fillRect(480, 70, 40, 50);
}
