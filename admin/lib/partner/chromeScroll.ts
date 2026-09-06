let navEl: HTMLElement | null = null;
let spacerEl: HTMLElement | null = null;
let spacerBase = 0;
let progress = 0;

const FAB_OVERFLOW = 32;

export function registerChromeNav(
  nav: HTMLElement | null,
  spacer: HTMLElement | null,
) {
  navEl = nav;
  spacerEl = spacer;
  if (spacer && progress <= 0) spacerBase = spacer.offsetHeight;
  applyChrome();
}

export function getChromeNavHeight() {
  return navEl?.offsetHeight ?? 0;
}

export function setChromeProgress(next: number) {
  progress = Math.max(0, Math.min(1, next));
  if (progress <= 0 && spacerEl) spacerBase = spacerEl.offsetHeight;
  applyChrome();
}

export function resetChromeProgress() {
  setChromeProgress(0);
}

function applyChrome() {
  if (navEl) {
    const distance = navEl.offsetHeight + FAB_OVERFLOW;
    navEl.style.transform =
      progress <= 0 ? "" : `translate3d(0, ${progress * distance}px, 0)`;
  }
  if (spacerEl) {
    if (progress <= 0) {
      spacerEl.style.height = "";
    } else {
      const base = spacerBase || spacerEl.offsetHeight;
      spacerEl.style.height = `${Math.max(0, Math.round(base * (1 - progress)))}px`;
    }
  }
}
