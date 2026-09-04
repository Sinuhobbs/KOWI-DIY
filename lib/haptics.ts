export function haptic(duration = 12) {
  if (typeof navigator === "undefined") return;
  try {
    navigator.vibrate?.(duration);
  } catch {
    /* unsupported */
  }
}
