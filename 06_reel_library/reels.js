// Download buttons of the Reel Library site (2026-11-11): each card's video, to give Claude as an example, and the whole
// library as a zip with the videos and their prompts. This file is shipped as it is: no personal names in it.
// A plain script next to the page (build.mjs adds it to index.html), so it works without rebuilding the page itself:
// - in the details of an open card: "Download video" (reels/<section>-<name>.mp4, made by record_reels.mjs)
// - in the top bar: "Videos + prompts" (the zip made by build.mjs: one folder per section, each item's video and prompt)
(() => {
  const ZIP = 'reel-library-videos-and-prompts.zip';
  const style = document.createElement('style');
  style.textContent = `
    .reel-dl { align-self: center; margin-top: -2px; }
    .reel-dl small { font-weight: 500; opacity: .75; }
    @media (min-width: 761px) { .howto-ways:has(.reel-way) { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 760px) {
      .share-top { grid-template-columns: .9fr 1.25fr .8fr .8fr !important; }
    }
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
  const safe = (s) => s.replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, ' ').trim();

  const update = () => {
    if (!reels || !reels.size) return;
    // The "How to use it" page (#how-to): a fourth way, using the videos. Added here so the page itself is not rebuilt.
    const ways = document.querySelector('.howto-ways');
    if (ways && !ways.querySelector('.reel-way')) {
      const way = document.createElement('div');
      way.className = 'howto-way reel-way';
      way.innerHTML =
        '<h3>4. Show Claude a video</h3><p>Open a card and press <b>Download video</b>, or press <b>Videos + prompts</b> at the top to get every video in one zip, ' +
        'with a text file next to each video (what it does, when to use it, its prompt). Give Claude the video with its prompt as an example of what you want, ' +
        'then add your own text, timing and colours. In the Claude app, if it does not take the video, add a screenshot of it instead.</p>';
      ways.appendChild(way);
      const h = ways.closest('section')?.querySelector('h2');
      if (h && /^Three ways/.test(h.textContent)) h.textContent = h.textContent.replace('Three', 'Four');
    }
    // The zip, in the top bar after "Skill for Claude".
    const top = document.querySelector('.share-top');
    if (top && !top.querySelector('.reel-zip')) {
      const zip = link('lf-btn reel-zip', ZIP, ZIP, `Every item as a short video with its prompt next to it, one folder per section (${reels.size} videos, a zip file)`, '⬇ <span class="t-long">Videos + prompts</span><span class="t-short">Zip</span>');
      const terms = top.querySelector('.lf-link');
      top.insertBefore(zip, terms);
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
