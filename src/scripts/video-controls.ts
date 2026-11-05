// Pause/play button for every autoplaying background film (WCAG 2.2.2 Pause, Stop, Hide).
// Reduced-motion visitors get the poster frame; the button lets them play it if they want.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const PAUSE = '<svg viewBox="0 0 24 24" class="size-3.5" fill="currentColor" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg>';
const PLAY = '<svg viewBox="0 0 24 24" class="ml-0.5 size-3.5" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>';

export function videoControls() {
  document.querySelectorAll<HTMLVideoElement>('video[data-media-video]').forEach((v) => {
    // Mount on the section so the button sits above the hero's overlays and copy.
    const host = v.closest('section') ?? v.parentElement;
    if (!host) return;
    if (reduce) {
      v.autoplay = false;
      v.pause();
    }
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className =
      'absolute right-4 bottom-4 z-30 grid size-11 place-items-center rounded-full bg-night/60 text-white ring-1 ring-white/30 backdrop-blur transition-colors hover:bg-night/85 md:right-6 md:bottom-6';
    const sync = () => {
      const playing = !v.paused;
      btn.innerHTML = playing ? PAUSE : PLAY;
      btn.setAttribute('aria-label', playing ? 'Pause background video' : 'Play background video');
    };
    btn.addEventListener('click', () => (v.paused ? v.play().catch(() => {}) : v.pause()));
    v.addEventListener('play', sync);
    v.addEventListener('pause', sync);
    sync();
    host.appendChild(btn);
  });
}
