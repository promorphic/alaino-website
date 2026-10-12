(function () {
  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); });
    });
  }

  // Hero bars: the Catalysis "lines" motif, animated.
  // Every row is one thick bar from the left edge to a moving split point, then a gap,
  // then a thinner, lighter bar to the right edge. The split sweeps slowly across the
  // panel and back, and each row drifts a little ahead or behind on its own smooth jitter.
  var host = document.getElementById('hero-bars');
  if (host) {
    var canvas = document.createElement('canvas');
    host.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var MAX = 40, ROWS = 40, W = 0, H = 0, dpr = 1;
    var rows = [];
    var seed = 11;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    for (var i = 0; i < MAX; i++) {
      rows.push({
        a1: 0.04 + rnd() * 0.07, w1: 0.35 + rnd() * 0.45, p1: rnd() * Math.PI * 2,
        a2: 0.02 + rnd() * 0.04, w2: 0.9 + rnd() * 0.9, p2: rnd() * Math.PI * 2
      });
    }
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = host.clientWidth; H = host.clientHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ROWS = Math.max(12, Math.min(MAX, Math.round(H / 22)));
    }
    function ease(x) { return 0.5 - 0.5 * Math.cos(Math.PI * x); }
    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      var step = H / ROWS, thick = Math.max(3, step * 0.34), thin = Math.max(2, step * 0.18);
      var gap = Math.max(8, W * 0.022);
      // one slow sweep: 0.28 -> 0.9 -> 0.28 over ~9s
      var cycle = (t / 9000) % 1;
      var base = 0.28 + 0.62 * ease(cycle < 0.5 ? cycle * 2 : 2 - cycle * 2);
      var s = t / 1000;
      for (var i = 0; i < ROWS; i++) {
        var r = rows[i];
        var jit = r.a1 * Math.sin(s * r.w1 + r.p1) + r.a2 * Math.sin(s * r.w2 + r.p2);
        var split = Math.min(0.96, Math.max(0.12, base + jit)) * W;
        var y = i * step + (step - thick) / 2;
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#6586EA';
        ctx.fillRect(0, y, split, thick);
        var x2 = split + gap;
        if (x2 < W) {
          ctx.globalAlpha = 0.5;
          ctx.fillRect(x2, y + (thick - thin) / 2, W - x2, thin);
        }
      }
      ctx.globalAlpha = 1;
    }
    var running = true, raf = 0, t0 = performance.now();
    function loop(now) { if (!running) return; draw(now - t0); raf = requestAnimationFrame(loop); }
    resize();
    if (reduce) { draw(2600); }
    else {
      raf = requestAnimationFrame(loop);
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (e) {
          var vis = e[0].isIntersecting;
          if (vis && !running) { running = true; raf = requestAnimationFrame(loop); }
          if (!vis && running) { running = false; cancelAnimationFrame(raf); }
        }).observe(host);
      }
    }
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { resize(); if (reduce) draw(2600); }, 80); });
  }

  // Only one FAQ item open at a time
  var items = document.querySelectorAll('.faq details');
  items.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) items.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });
})();
