/** Calculate an increasing offset whose endpoints fit within the zoom bleed. */
export function getImageMotion(start, end, travel, progress, height) {
  const scale = start + (end - start) * progress;
  const startOffset = -Math.min(travel, (start - 1) / 2) * height;
  const endOffset = Math.min(travel, (end - 1) / 2) * height;
  return { scale, offset: startOffset + (endOffset - startOffset) * progress };
}
