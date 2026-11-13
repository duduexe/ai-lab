// Download buttons of the Reel Library site (2026-11-11): each card's video, to give Claude as an example, and the whole
// library as a zip with the videos and their prompts. This file is shipped as it is: no personal names in it.
// A plain script next to the page (build.mjs adds it to index.html), so it works without rebuilding the page itself:
// - in the details of an open card: "Download video" (reels/<section>-<name>.mp4, made by record_reels.mjs)
// (The zip of every video and prompt is the page's own "Download everything" button since 2026-11-12, and the fourth way
// "Show Claude a video" is in Guide.tsx.)
(() => {
  const style = document.createElement('style');
  style.textContent = `
    .reel-dl { align-self: center; margin-top: -2px; }
    .reel-dl small { font-weight: 500; opacity: .75; }
    .reel-host { position: relative; }
    .reel-over { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 2; border-radius: inherit; background: #000; }
  `;
  document.head.appendChild(style);

  let reels = null;
  fetch('reels/index.json', {cache: 'no-cache'})
    .then((r) => (r.ok ? r.json() : []))
    .then((list) => {
      reels = new Map(list.map((c) => [c.key, c]));
      update();
    })
    .catch(() => (reels = new Map()));

  const link = (cls, href, download, title, html) => {
    const a = document.createElement('a');
    a.className = cls;
    a.href = href;
    a.download = download;
    a.title = title;
    a.innerHTML = html;
    return a;
  };
  // Cards whose example is a filmed clip the site cannot draw live (Camille's own footage): the card and its details
  // show the filmed video instead (2026-11-12, Paper craft collage: "update the public one with this one").
  const FILMED = new Set(['7.1-paper-craft-collage']);
  const overlay = (host, key, play) => {
    if (!host || host.querySelector(':scope > .reel-over')) return;
    const v = document.createElement('video');
    v.className = 'reel-over';
    v.src = `reels/${key}.mp4`;
    v.poster = `posters/${key}.jpg`;
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.setAttribute('playsinline', '');
    v.preload = play ? 'auto' : 'none';
    if (play) v.autoplay = true;
    else {
      host.addEventListener('mouseenter', () => v.play().catch(() => {}));
      host.addEventListener('mouseleave', () => { v.pause(); v.currentTime = 0; });
    }
    host.classList.add('reel-host');
    host.appendChild(v);
  };
  const safe = (s) => s.replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, ' ').trim();

  const update = () => {
    if (!reels || !reels.size) return;
    for (const key of FILMED) {
      if (!reels.has(key)) continue;
      for (const pic of document.querySelectorAll(`.lf-card[data-poster="${key}"] .lf-pic`)) overlay(pic, key, false);
      const dpic = document.querySelector('.lf-card.on')?.dataset.poster === key ? document.querySelector('.lf-detail-pic') : null;
      if (dpic && !dpic.querySelector('video[src^="reels/"]')) overlay(dpic, key, true);
    }
    // The video of the open card, under its preview.
    const detail = document.querySelector('.lf-detail');
    if (!detail) return;
    const key = document.querySelector('.lf-card.on')?.dataset.poster;
    const reel = key ? reels.get(key) : undefined;
    let btn = detail.querySelector('.reel-dl');
    if (!reel) return btn?.remove();
    const pic = detail.querySelector('.lf-detail-pic');
    if (!btn) {
      btn = link('lf-btn reel-dl', '', '', '', '');
      pic ? pic.after(btn) : detail.appendChild(btn);
    }
    if (btn.dataset.key === key) return;
    btn.dataset.key = key;
    btn.href = reel.file;
    btn.download = `${safe(reel.name) || key}.mp4`;
    btn.title = 'A 4-second video of this item (no sound). Give it to Claude with the prompt below as an example.';
    btn.innerHTML = `⬇ Download video <small>${Math.max(1, Math.round(reel.size / 1000))} KB</small>`;
  };

  // The page is drawn by React: watch for the details panel and the open card changing.
  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      update();
    });
  }).observe(document.documentElement, {childList: true, subtree: true, attributes: true, attributeFilter: ['class']});
})();
