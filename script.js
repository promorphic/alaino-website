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

  // Hero bars: the Catalysis "lines" motif. Deterministic so it renders the same every load.
  var host = document.getElementById('hero-bars');
  if (host) {
    var W = 600, H = 1000, rows = 40, step = H / rows, bar = step * 0.32;
    var seed = 7;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    var s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none">';
    for (var i = 0; i < rows; i++) {
      var y = i * step + (step - bar) / 2;
      var cut = W * (0.74 + rnd() * 0.1);
      var gap = 10 + rnd() * 10;
      s += '<rect x="0" y="' + y.toFixed(1) + '" width="' + cut.toFixed(1) + '" height="' + bar.toFixed(1) + '" fill="#6586EA"/>';
      s += '<rect x="' + (cut + gap).toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + (W - cut - gap).toFixed(1) + '" height="' + bar.toFixed(1) + '" fill="#6586EA" opacity=".85"/>';
    }
    s += '</svg>';
    host.innerHTML = s;
  }

  // Only one FAQ item open at a time
  var items = document.querySelectorAll('.faq details');
  items.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) items.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });
})();
