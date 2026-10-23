// Motion system — inspired by landonorris.com, nickho-motorsports.nl and
// forgeautomotive.co.uk: inertial scroll (Lenis) + GSAP ScrollTrigger.
// Everything degrades to a static, fully visible page with reduced motion.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(pointer: fine)').matches;
const EASE = 'expo.out';

export function initMotion() {
  rollText();
  shopStatus(); // live clock is useful even without motion
  if (reduce) {
    document.getElementById('preloader')?.remove();
    odometers(true);
    return;
  }
  document.documentElement.classList.add('js-motion');

  const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  (window as any).__lenis = lenis;

  const intro = gsap.timeline({ paused: true });
  heroIntro(intro);

  document.fonts.ready.then(() => {
    splitReveals();
    reveals();
    parallax();
    bleedTitles();
    marquees(lenis);
    sequences();
    rails();
    scrubVideos();
    odometers(false);
    imageZooms();
    previewTables();
    footerGlow();
    ScrollTrigger.refresh();
  });
  if (fine) {
    cursor();
    magnetic();
  }

  preloader(lenis).then(() => intro.play());
}

/* ---------- Rolling hover text: duplicate label slides up ---------- */
function rollText() {
  document.querySelectorAll<HTMLElement>('.btn, .nav-link, .link-arrow, [data-roll]').forEach((el) => {
    if (el.querySelector('.roll')) return;
    const node = [...el.childNodes].find((n) => n.nodeType === 3 && n.textContent!.trim());
    if (!node) return;
    const txt = node.textContent!.trim();
    const wrap = document.createElement('span');
    wrap.className = 'roll';
    wrap.innerHTML = `<span></span><span aria-hidden="true"></span>`;
    wrap.children[0].textContent = txt;
    wrap.children[1].textContent = txt;
    el.replaceChild(wrap, node);
  });
}

/* ---------- Preloader: logo + 0→100 counter, curtain up ---------- */
function preloader(lenis: Lenis): Promise<void> {
  const el = document.getElementById('preloader');
  if (!el || !document.documentElement.classList.contains('has-preloader')) {
    el?.remove();
    return Promise.resolve();
  }
  lenis.stop();
  const num = el.querySelector<HTMLElement>('.pl-num')!;
  const o = { v: 0 };
  return new Promise((done) => {
    gsap
      .timeline({
        onComplete: () => {
          try { sessionStorage.setItem('lnc-pl', '1'); } catch {}
          el.remove();
          document.documentElement.classList.remove('has-preloader');
          lenis.start();
        },
      })
      .from(el.querySelector('.pl-logo'), { yPercent: 120, duration: 1, ease: EASE })
      .from(el.querySelector('.pl-cap'), { opacity: 0, duration: 0.8 }, 0.2)
      .to(o, { v: 100, duration: 1.7, ease: 'power2.inOut', onUpdate: () => (num.textContent = String(Math.round(o.v)).padStart(3, '0')) }, 0.1)
      .to(el.querySelectorAll('.pl-logo, .pl-cap, .pl-num'), { yPercent: -120, opacity: 0, duration: 0.6, ease: 'power3.in' }, '+=0.1')
      .add(() => done(), '-=0.1')
      .to(el, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' });
  });
}

/* ---------- Hero: per-character rise, media settle, info fade ---------- */
function heroIntro(tl: gsap.core.Timeline) {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const media = hero.querySelector('[data-hero-media]');
  const lines = [...hero.querySelectorAll<HTMLElement>('[data-hero-line]')];
  const fades = hero.querySelectorAll('[data-hero-fade]');
  const chars = lines.flatMap((l) => SplitText.create(l, { type: 'words,chars', wordsClass: 'inline-block whitespace-nowrap', charsClass: 'inline-block will-change-transform' }).chars);
  gsap.set(chars, { yPercent: 115, rotate: 6 });
  gsap.set(fades, { opacity: 0, y: 18 });
  if (media) gsap.set(media, { scale: 1.2 });
  if (media) tl.to(media, { scale: 1, duration: 2.6, ease: EASE }, 0);
  tl.to(chars, { yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.028, ease: EASE }, 0.15).to(
    fades,
    { opacity: 1, y: 0, duration: 1, stagger: 0.06, ease: EASE },
    0.65,
  );
  if (media)
    gsap.to(media, {
      yPercent: 16,
      opacity: 0.4,
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
      duration: 1.2,
      stagger: 0.08,
      ease: EASE,
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });
}

function reveals() {
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, stagger: 0.07, ease: EASE, overwrite: true }),
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
    gsap.fromTo(el, { scale: 1.14 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'center center', scrub: true } });
  });
}

/* ---------- Giant edge-bleeding titles slide sideways with scroll ---------- */
function bleedTitles() {
  document.querySelectorAll<HTMLElement>('[data-bleed]').forEach((el) => {
    const dir = el.dataset.bleed === 'right' ? 1 : -1;
    gsap.fromTo(
      el,
      { xPercent: -8 * dir },
      { xPercent: 8 * dir, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });
}

/* ---------- Marquee: constant drift, sped up and reversed by scroll ---------- */
function marquees(lenis: Lenis) {
  document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((el) => {
    const track = el.querySelector<HTMLElement>('[data-marquee-track]')!;
    track.innerHTML += track.innerHTML; // seamless loop
    let x = 0;
    let dir = -1;
    let boost = 0;
    lenis.on('scroll', (e: any) => {
      boost = Math.min(Math.abs(e.velocity) * 0.6, 14);
      if (e.direction) dir = e.direction > 0 ? -1 : 1;
    });
    gsap.ticker.add((_, dt) => {
      const half = track.scrollWidth / 2;
      x += dir * (0.045 * dt + boost);
      boost *= 0.9;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      track.style.transform = `translate3d(${x}px,0,0)`;
    });
  });
}

/* ---------- Pinned numbered sequence (01 / 03) ---------- */
function sequences() {
  document.querySelectorAll<HTMLElement>('[data-sequence]').forEach((sec) => {
    const steps = sec.querySelectorAll<HTMLElement>('[data-step]');
    const media = sec.querySelectorAll<HTMLElement>('[data-step-media]');
    const num = sec.querySelector('[data-step-num]');
    const n = steps.length;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      gsap.set([...steps].slice(1), { opacity: 0, y: 40 });
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
      for (let i = 1; i < n; i++) {
        tl.to(steps[i - 1], { opacity: 0, y: -40, duration: 0.4 }, i - 0.6).to(steps[i], { opacity: 1, y: 0, duration: 0.4 }, i - 0.3);
        if (media[i]) tl.to(media[i], { clipPath: 'inset(0% 0 0 0)', duration: 0.7, ease: 'power2.inOut' }, i - 0.7);
      }
      return () => gsap.set([...steps, ...media], { clearProps: 'all' });
    });
  });
}

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

/* ---------- Odometer digits: each digit rolls through 0–9 ---------- */
function buildOdo(el: HTMLElement) {
  const value = el.dataset.odo!;
  el.textContent = '';
  el.classList.add('odo');
  el.setAttribute('aria-label', value);
  const cols: { inner: HTMLElement; d: number }[] = [];
  [...value].forEach((ch, i) => {
    if (!/\d/.test(ch)) {
      const s = document.createElement('span');
      s.textContent = ch;
      s.setAttribute('aria-hidden', 'true');
      el.appendChild(s);
      return;
    }
    const col = document.createElement('span');
    col.className = 'odo-col';
    col.setAttribute('aria-hidden', 'true');
    const inner = document.createElement('span');
    inner.style.transitionDelay = `${i * 90}ms`;
    // two full cycles so it visibly spins before landing
    inner.innerHTML = Array.from({ length: 20 }, (_, k) => `<i>${k % 10}</i>`).join('');
    col.appendChild(inner);
    el.appendChild(col);
    cols.push({ inner, d: +ch });
  });
  return () => cols.forEach(({ inner, d }) => (inner.style.transform = `translateY(-${(10 + d) * 1}em)`));
}
function odometers(instant: boolean) {
  document.querySelectorAll<HTMLElement>('[data-odo]').forEach((el) => {
    const roll = buildOdo(el);
    if (instant) {
      el.querySelectorAll<HTMLElement>('.odo-col > span').forEach((s) => (s.style.transition = 'none'));
      roll();
      return;
    }
    ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: roll });
  });
}

/* ---------- Results table with cursor-following preview ---------- */
function previewTables() {
  document.querySelectorAll<HTMLElement>('[data-preview-table]').forEach((tbl) => {
    const box = tbl.querySelector<HTMLElement>('[data-preview-box]');
    const slides = tbl.querySelectorAll<HTMLElement>('[data-preview-slide]');
    if (!box || !fine) return;
    const xTo = gsap.quickTo(box, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(box, 'y', { duration: 0.6, ease: 'power3' });
    tbl.addEventListener('mousemove', (e) => {
      const r = tbl.getBoundingClientRect();
      xTo(e.clientX - r.left);
      yTo(e.clientY - r.top);
    });
    tbl.querySelectorAll<HTMLElement>('[data-preview-row]').forEach((row, i) => {
      row.addEventListener('mouseenter', () => {
        gsap.to(box, { scale: 1, opacity: 1, duration: 0.45, ease: EASE });
        slides.forEach((s, k) => gsap.to(s, { yPercent: (k - i) * 100, duration: 0.6, ease: EASE }));
      });
    });
    tbl.addEventListener('mouseleave', () => gsap.to(box, { scale: 0.6, opacity: 0, duration: 0.4 }));
  });
}

/* ---------- Footer glow swells as it enters ---------- */
function footerGlow() {
  document.querySelectorAll<HTMLElement>('[data-glow]').forEach((el) => {
    gsap.fromTo(el, { scaleY: 0.3, opacity: 0.2 }, { scaleY: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom bottom', scrub: true } });
  });
}

/* ---------- Cursor dot that grows into a label over [data-cursor] ---------- */
function cursor() {
  const c = document.createElement('div');
  c.className = 'cursor';
  c.innerHTML = '<span class="cursor-label"></span>';
  document.body.appendChild(c);
  const label = c.firstElementChild as HTMLElement;
  const xTo = gsap.quickTo(c, 'x', { duration: 0.35, ease: 'power3' });
  const yTo = gsap.quickTo(c, 'y', { duration: 0.35, ease: 'power3' });
  window.addEventListener('pointermove', (e) => (xTo(e.clientX), yTo(e.clientY)), { passive: true });
  document.querySelectorAll<HTMLElement>('[data-cursor]').forEach((el) => {
    el.addEventListener('mouseenter', () => ((label.textContent = el.dataset.cursor || ''), c.classList.add('is-big')));
    el.addEventListener('mouseleave', () => c.classList.remove('is-big'));
  });
}

/* ---------- Magnetic buttons ---------- */
function magnetic() {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * 0.3);
      yTo((e.clientY - r.top - r.height / 2) * 0.35);
    });
    el.addEventListener('mouseleave', () => (xTo(0), yTo(0)));
  });
}

/* ---------- Live shop clock (Pacific time) ---------- */
// Mon–Fri 08:00–17:30. Saturday by appointment, Sunday closed.
const OPEN = 8 * 3600;
const CLOSE = 17.5 * 3600;
function laNow() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)!.value;
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, sec: +get('hour') * 3600 + +get('minute') * 60 + +get('second') };
}
export function shopState() {
  const { day, sec } = laNow();
  const weekday = day >= 1 && day <= 5;
  if (weekday && sec >= OPEN && sec < CLOSE) return { open: true, day, left: CLOSE - sec };
  // seconds until next weekday 08:00
  let left = 0;
  let d = day;
  let s = sec;
  for (let i = 0; i < 8; i++) {
    const isWd = d >= 1 && d <= 5;
    if (isWd && s < OPEN) return { open: false, day, left: left + (OPEN - s) };
    left += 86400 - s;
    s = 0;
    d = (d + 1) % 7;
  }
  return { open: false, day, left };
}
function shopStatus() {
  const els = document.querySelectorAll<HTMLElement>('[data-shop-status]');
  const rows = document.querySelectorAll<HTMLElement>('[data-day]');
  if (!els.length && !rows.length) return;
  const pad = (n: number) => String(n).padStart(2, '0');
  const tick = () => {
    const st = shopState();
    const d = Math.floor(st.left / 86400);
    const h = Math.floor((st.left % 86400) / 3600);
    const m = Math.floor((st.left % 3600) / 60);
    const s = Math.floor(st.left % 60);
    els.forEach((el) => {
      el.dataset.open = String(st.open);
      el.querySelectorAll<HTMLElement>('[data-st-label]').forEach((x) => (x.textContent = st.open ? 'Open now · closes in' : 'Closed · opens in'));
      el.querySelectorAll<HTMLElement>('[data-st-short]').forEach((x) => (x.textContent = st.open ? `Open · closes in ${h}h ${pad(m)}m` : `Closed · opens in ${d ? d + 'd ' : ''}${h}h ${pad(m)}m`));
      const set = (k: string, v: number) => el.querySelectorAll<HTMLElement>(`[data-st-${k}]`).forEach((x) => (x.textContent = pad(v)));
      set('d', d);
      set('h', h);
      set('m', m);
      set('s', s);
    });
    rows.forEach((r) => r.toggleAttribute('data-today', +r.dataset.day! === st.day));
  };
  tick();
  setInterval(tick, 1000);
}
