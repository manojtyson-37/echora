(() => {
  const PHONE = '919187464146';
  const wa = (text) => `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;

  // ---- Catalogue ------------------------------------------------------
  // To use real photos: add `img: 'assets/products/<file>.webp'` to a product.
  const TONES = {
    wine:  ['#510007', '#7a1424', '#E8D5BC'],
    rose:  ['#c98f8f', '#e2b7b0', '#510007'],
    sand:  ['#E8D5BC', '#f3e6d3', '#510007'],
    plum:  ['#3b0a1c', '#6d1a3a', '#E8D5BC'],
    blush: ['#f0d4cf', '#fae8e3', '#7a1424'],
    olive: ['#8a7a4a', '#b5a574', '#fff4e3'],
  };

  const PRODUCTS = [
    { id: 'solo-premium', name: 'The Solo — Premium', line: 'solo', type: 'kurta', tone: 'wine',  desc: 'Single-piece kurti, the signature fit.', tag: 'New' },
    { id: 'solo-bloom',   name: 'The Solo — Bloom',   line: 'solo', type: 'kurta', tone: 'rose',  desc: 'Soft florals in a single-piece kurti.', tag: 'New' },
    { id: 'insync-premium', name: 'In Sync — Premium', line: 'sync', type: 'set',  tone: 'plum',  desc: 'Two-piece kurti set with pants.', tag: 'New' },
    { id: 'insync-bloom', name: 'In Sync — Bloom',    line: 'sync', type: 'set',   tone: 'blush', desc: 'Two-piece kurti set with dupatta.' },
    { id: 'trio-premium', name: 'The Trio — Premium', line: 'trio', type: 'trio',  tone: 'wine',  desc: 'Three-piece kurti set, fully coordinated.', tag: 'New' },
    { id: 'solo-basic',   name: 'The Solo — Basic',   line: 'solo', type: 'kurta', tone: 'sand',  desc: 'Everyday single-piece, effortless.' },
    { id: 'one-only',     name: 'One &amp; Only',         line: 'dress', type: 'dress', tone: 'olive', desc: 'One-piece dresses and frocks.' },
    { id: 'silhouette',   name: 'The Silhouette',     line: 'dress', type: 'dress', tone: 'rose', desc: 'A single flowing line from shoulder to hem.' },
  ];

  const EDIT = [
    { n: '01', title: 'The Solo',        sub: 'Single-piece kurtis',    type: 'kurta', tone: 'wine'  },
    { n: '02', title: 'In Sync',         sub: 'Two-piece kurti sets',   type: 'set',   tone: 'plum'  },
    { n: '03', title: 'The Trio',        sub: 'Three-piece kurti sets', type: 'trio',  tone: 'rose'  },
    { n: '04', title: 'One &amp; Only',      sub: 'One-piece dresses · The Silhouette', type: 'dress', tone: 'olive' },
  ];

  const REVIEWS = [
    { title: 'Comfort meets style', quote: 'Exactly what I wanted for everyday wear.', type: 'kurta', tone: 'wine' },
    { title: 'Beautifully simple',  quote: 'The colour and fabric are lovely.',        type: 'set',   tone: 'sand' },
  ];

  // ---- Placeholder garment art (swap for photos any time) -------------
  const garment = (type, tone) => {
    const [a, b, c] = TONES[tone] || TONES.wine;
    const id = Math.random().toString(36).slice(2, 7);
    const defs = `<defs><linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${b}"/><stop offset="1" stop-color="${a}"/></linearGradient></defs>`;
    const fill = `url(#g${id})`;
    const trim = `stroke="${c}" stroke-opacity=".55" stroke-width="1.4" fill="none"`;
    const kurta = `<path d="M70 20 Q100 38 130 20 L158 40 L170 120 L148 124 L146 360 L54 360 L52 124 L30 120 L42 40 Z" fill="${fill}"/><path d="M84 22 Q100 52 116 22" ${trim}/><path d="M100 44 V120" ${trim}/><path d="M54 340 H146" ${trim}/><path d="M100 120 Q112 240 104 360 H146 L148 124 Z" fill="#000" fill-opacity=".08"/><circle cx="100" cy="60" r="2.4" fill="${c}" fill-opacity=".7"/><circle cx="100" cy="80" r="2.4" fill="${c}" fill-opacity=".7"/>`;
    const svgs = {
      kurta: `<svg viewBox="0 0 200 380" aria-hidden="true">${defs}${kurta}</svg>`,
      set: `<svg viewBox="0 0 200 400" aria-hidden="true">${defs}<g transform="translate(0 -10) scale(1 .78)">${kurta}</g><path d="M56 270 L144 270 L150 392 L108 392 L100 300 L92 392 L50 392 Z" fill="${fill}" opacity=".85"/></svg>`,
      trio: `<svg viewBox="0 0 240 400" aria-hidden="true">${defs}<g transform="translate(20 -10) scale(1 .78)">${kurta}</g><path d="M76 270 L164 270 L170 392 L128 392 L120 300 L112 392 L70 392 Z" fill="${fill}" opacity=".85"/><path d="M6 60 Q50 160 10 330 L24 335 Q70 180 28 52 Z M234 60 Q190 160 230 330 L216 335 Q170 180 212 52 Z" fill="${c}" fill-opacity=".55"/></svg>`,
      dress: `<svg viewBox="0 0 200 400" aria-hidden="true">${defs}<path d="M76 18 Q100 34 124 18 L138 42 L128 118 L170 380 L30 380 L72 118 L62 42 Z" fill="${fill}"/><path d="M72 118 H128" ${trim}/><path d="M86 20 Q100 46 114 20" ${trim}/><path d="M44 340 H156" ${trim}/></svg>`,
    };
    return svgs[type];
  };

  const art = (p) => p.img
    ? `<img src="${p.img}" alt="${p.name}" loading="lazy">`
    : garment(p.type, p.tone);
  const bgFor = (tone) => {
    const [a, b] = TONES[tone] || TONES.wine;
    const light = ['sand', 'blush'].includes(tone);
    return `background:radial-gradient(90% 80% at 50% 30%,${light ? '#fff6ea' : b},${light ? b : a})`;
  };

  // ---- Render ---------------------------------------------------------
  const cardHTML = (p) => `
    <article class="card">
      <div class="card-art" style="${bgFor(p.tone)}">${p.tag ? `<span class="tag">${p.tag}</span>` : ''}${art(p)}</div>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <a class="enq" target="_blank" rel="noopener" href="${wa(`Hi ECHORA! I'd like to know more about ${p.name}.`)}">Enquire on WhatsApp</a>
    </article>`;

  const miniHTML = (p) => `
    <a class="card mini" target="_blank" rel="noopener" href="${wa(`Hi ECHORA! I love ${p.name}. Can you share details?`)}">
      <div class="card-art" style="${bgFor(p.tone)}">${art(p)}</div>
      <h3>${p.name}</h3>
    </a>`;

  document.getElementById('newTrack').innerHTML = PRODUCTS.slice(0, 6).map(cardHTML).join('');

  document.getElementById('editGrid').innerHTML = EDIT.map((e) => `
    <a class="edit" target="_blank" rel="noopener" href="${wa(`Hi ECHORA! I'd like to see ${e.title} (${e.sub}).`)}">
      <div class="bg" style="${bgFor(e.tone)}">${garment(e.type, e.tone)}</div>
      <span class="num">${e.n}</span>
      <h3>${e.title}</h3>
      <p>${e.sub}</p>
      <span class="go">Explore →</span>
    </a>`).join('');

  const rowA = PRODUCTS.slice(0, 6), rowB = PRODUCTS.slice(2).concat(PRODUCTS.slice(0, 2)).reverse();
  // duplicate set for seamless loop (animation moves -50%)
  document.getElementById('rowA').innerHTML = rowA.concat(rowA).map(miniHTML).join('');
  document.getElementById('rowB').innerHTML = rowB.concat(rowB).map(miniHTML).join('');
  [rowA, rowB].forEach((set, i) => {
    const links = document.querySelectorAll(`#${i ? 'rowB' : 'rowA'} a`);
    links.forEach((a, k) => { if (k >= set.length) { a.setAttribute('aria-hidden', 'true'); a.tabIndex = -1; } });
  });

  document.getElementById('reviews').innerHTML = REVIEWS.map((r) => `
    <article class="review">
      <div class="card-art" style="${bgFor(r.tone)}">${garment(r.type, r.tone)}</div>
      <h3>${r.title}</h3>
      <div class="rs" aria-label="5 out of 5 stars">★★★★★</div>
      <q>${r.quote}</q>
      <small>— Sample customer review</small>
    </article>`).join('');

  document.getElementById('heroFigure').innerHTML = garment('kurta', 'sand');

  // ---- WhatsApp / phone links ----------------------------------------
  const hello = wa("Hi ECHORA! I'd like to know more.");
  ['profileLink', 'footWa', 'waFloat'].forEach((id) => (document.getElementById(id).href = hello));
  document.getElementById('cartLink').href = wa("Hi ECHORA! I'd like to place an order.");
  document.getElementById('storyCta').href = wa("Hi ECHORA! Here's my ECHORA look — sharing my story.");
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---- Gifting occasion chips ----------------------------------------
  const giftCta = document.getElementById('giftCta');
  let occasion = '';
  const setGift = () => (giftCta.href = wa(`Hi ECHORA! I'd like a gift${occasion ? ` (occasion: ${occasion})` : ''}. Can you help me choose?`));
  setGift();
  document.querySelectorAll('.chip').forEach((chip) => {
    chip.setAttribute('aria-pressed', 'false');
    chip.addEventListener('click', () => {
      const on = chip.getAttribute('aria-pressed') === 'true';
      document.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', 'false'));
      chip.setAttribute('aria-pressed', String(!on));
      occasion = on ? '' : chip.dataset.v;
      setGift();
    });
  });

  // ---- Header ---------------------------------------------------------
  const header = document.getElementById('header');
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  const onScroll = () => header.classList.toggle('solid', scrollY > 60);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const closeMenu = () => { nav.classList.remove('open'); header.classList.remove('menu-open'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.setAttribute('aria-label', 'Open menu'); };
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    header.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  document.addEventListener('click', (e) => { if (nav.classList.contains('open') && !nav.contains(e.target) && !menuBtn.contains(e.target)) closeMenu(); });
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

  // ---- Carousel arrows -----------------------------------------------
  const track = document.getElementById('newTrack');
  document.querySelectorAll('.arrow').forEach((b) =>
    b.addEventListener('click', () => track.scrollBy({ left: +b.dataset.dir * track.clientWidth * 0.8, behavior: 'smooth' })));

  // ---- Search ---------------------------------------------------------
  const overlay = document.getElementById('searchOverlay');
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  const LINES = { solo: 'The Solo', sync: 'In Sync', trio: 'The Trio', dress: 'One &amp; Only' };
  const renderResults = () => {
    const q = input.value.trim().toLowerCase();
    const hits = PRODUCTS.filter((p) => !q || (p.name + ' ' + p.desc + ' ' + LINES[p.line]).toLowerCase().includes(q));
    results.innerHTML = hits.length
      ? hits.map((p) => `<li><a target="_blank" rel="noopener" href="${wa(`Hi ECHORA! I'm interested in ${p.name}.`)}">${p.name}<small>${LINES[p.line]}</small></a></li>`).join('')
      : '<li style="padding:14px 4px;color:#7a5a5c">Nothing yet — message us and we will make it for you.</li>';
  };
  const openSearch = () => { overlay.hidden = false; input.value = ''; renderResults(); input.focus(); };
  const closeSearch = () => { if (overlay.hidden) return; overlay.hidden = true; document.getElementById('searchBtn').focus(); };
  document.getElementById('searchBtn').addEventListener('click', openSearch);
  document.getElementById('searchClose').addEventListener('click', closeSearch);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSearch(); });
  input.addEventListener('input', renderResults);
  addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeSearch(); closeMenu(); } });

  // ---- Scroll reveal --------------------------------------------------
  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
  } else els.forEach((el) => el.classList.add('in'));
})();
