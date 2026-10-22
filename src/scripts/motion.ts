// Motion system — Forge-style: smooth inertial scroll (Lenis) driving GSAP
// ScrollTrigger; masked line reveals; a once-per-session preloader; pinned
// numbered sequences; horizontal build rail; scroll-scrubbed video.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const EASE = 'expo.out';

export function initMotion() {
  if (reduce) {
    document.getElementById('preloader')?.remove();
    return;
  }
  document.documentElement.classList.add('js-motion');

  const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  (window as any).__lenis = lenis;
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
    a.addEventListener('click', (e) => {
      const el = document.querySelector(a.getAttribute('href')!);
      if (el) (e.preventDefault(), lenis.scrollTo(el as HTMLElement, { offset: -80 }));
    }),
  );

  const intro = gsap.timeline({ paused: true });
  heroIntro(intro);

  document.fonts.ready.then(() => {
    splitReveals();
    reveals();
    parallax();
    sequences();
    rails();
    scrubVideos();
    counters();
    imageZooms();
    ScrollTrigger.refresh();
  });

  preloader(lenis).then(() => intro.play());
}

function preloader(lenis: Lenis): Promise<void> {
  const el = document.getElementById('preloader');
  if (!el || !document.documentElement.classList.contains('has-preloader')) {
    el?.remove();
    return Promise.resolve();
  }
  lenis.stop();
  return new Promise((done) => {
    const tl = gsap.timeline({
      onComplete: () => {
        try { sessionStorage.setItem('lnc-pl', '1'); } catch {}
        el.remove();
        document.documentElement.classList.remove('has-preloader');
        lenis.start();
      },
    });
    tl.from(el.querySelector('.pl-logo'), { opacity: 0, y: -10, duration: 0.9, ease: EASE })
      .from(el.querySelector('.pl-line'), { opacity: 0, letterSpacing: '0.4em', duration: 1.2, ease: EASE }, 0.1)
      .to(el.querySelector('.pl-bar'), { width: '100%', duration: 1.5, ease: 'power2.inOut' }, 0.2)
      .add(() => done(), '-=0.15')
      .to(el, { yPercent: -100, duration: 1.1, ease: 'expo.inOut' });
  });
}

function heroIntro(tl: gsap.core.Timeline) {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const media = hero.querySelector('[data-hero-media]');
  const lines = hero.querySelectorAll('[data-hero-line]');
  const fades = hero.querySelectorAll('[data-hero-fade]');
  gsap.set(lines, { yPercent: 110 });
  gsap.set(fades, { opacity: 0, y: 16 });
  if (media) gsap.set(media, { scale: 1.18 });
  if (media) tl.to(media, { scale: 1, duration: 2.4, ease: EASE }, 0);
  tl.to(lines, { yPercent: 0, duration: 1.4, stagger: 0.09, ease: EASE }, 0.25)
    .to(fades, { opacity: 1, y: 0, duration: 1.1, stagger: 0.07, ease: EASE }, 0.7);
  // Scroll-away: hero media sinks and dims as content rises over it.
  if (media)
    gsap.to(media, {
      yPercent: 18,
      opacity: 0.55,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
}

function splitReveals() {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
    gsap.set(el, { visibility: 'visible' });
    gsap.from(split.lines, {
      yPercent: 110,
      duration: 1.3,
      stagger: 0.08,
      ease: EASE,
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });
}

function reveals() {
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.2, stagger: 0.08, ease: EASE, overwrite: true }),
  });
}

function parallax() {
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const amt = parseFloat(el.dataset.parallax || '12');
    gsap.fromTo(
      el,
      { yPercent: -amt / 2 },
      { yPercent: amt / 2, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });
}

function imageZooms() {
  document.querySelectorAll<HTMLElement>('[data-zoom]').forEach((el) => {
    gsap.fromTo(el, { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'center center', scrub: true } });
  });
}

// Pinned numbered sequence: 01 / 03 → 03 / 03 as you scroll.
function sequences() {
  document.querySelectorAll<HTMLElement>('[data-sequence]').forEach((sec) => {
    const steps = sec.querySelectorAll<HTMLElement>('[data-step]');
    const media = sec.querySelectorAll<HTMLElement>('[data-step-media]');
    const num = sec.querySelector('[data-step-num]');
    const bar = sec.querySelector<HTMLElement>('[data-step-bar]');
    const n = steps.length;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      gsap.set([...steps].slice(1), { opacity: 0, y: 30 });
      gsap.set([...media].slice(1), { clipPath: 'inset(100% 0 0 0)' });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: 'top top',
          end: `+=${n * 90}%`,
          pin: true,
          scrub: 0.6,
          onUpdate: (st) => {
            const i = Math.min(n - 1, Math.floor(st.progress * n));
            if (num) num.textContent = String(i + 1).padStart(2, '0');
          },
        },
      });
      if (bar) tl.fromTo(bar, { scaleX: 1 / n }, { scaleX: 1, ease: 'none', duration: n - 1 }, 0);
      for (let i = 1; i < n; i++) {
        tl.to(steps[i - 1], { opacity: 0, y: -30, duration: 0.4 }, i - 0.6)
          .to(steps[i], { opacity: 1, y: 0, duration: 0.4 }, i - 0.3);
        if (media[i]) tl.to(media[i], { clipPath: 'inset(0% 0 0 0)', duration: 0.7, ease: 'power2.inOut' }, i - 0.7);
      }
      return () => gsap.set([...steps, ...media], { clearProps: 'all' });
    });
  });
}

// Horizontal build rail, pinned on desktop.
function rails() {
  document.querySelectorAll<HTMLElement>('[data-rail]').forEach((sec) => {
    const track = sec.querySelector<HTMLElement>('[data-rail-track]');
    const prog = sec.querySelector<HTMLElement>('[data-rail-progress]');
    if (!track) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const dist = () => track.scrollWidth - track.clientWidth;
      gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: sec,
          start: 'top top',
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (st) => prog && (prog.style.transform = `scaleX(${st.progress})`),
        },
      });
      return () => gsap.set(track, { clearProps: 'all' });
    });
  });
}

// When real footage lands: <video data-scrub src="..." muted playsinline preload="auto">
function scrubVideos() {
  document.querySelectorAll<HTMLVideoElement>('video[data-scrub]').forEach((v) => {
    const go = () =>
      ScrollTrigger.create({
        trigger: v.closest('section') || v,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (st) => (v.currentTime = st.progress * (v.duration || 0)),
      });
    v.readyState >= 1 ? go() : v.addEventListener('loadedmetadata', go, { once: true });
  });
}

function counters() {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const end = parseFloat(el.dataset.count!);
    const dec = (el.dataset.count!.split('.')[1] || '').length;
    const o = { v: 0 };
    gsap.to(o, {
      v: end,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onUpdate: () => (el.textContent = o.v.toFixed(dec)),
    });
  });
}
