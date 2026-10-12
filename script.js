// Alaino — site script
(function () {
  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Console clock (UTC)
  var clock = document.getElementById('console-time');
  function tick() {
    if (!clock) return;
    var d = new Date();
    clock.textContent = d.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
  }
  tick(); setInterval(tick, 1000);

  // Proposed 16-validator fleet: 3 clouds, 6 regions, 3 continents
  var fleet = [
    { id: 'val-01', cloud: 'AWS',   region: 'us-east-1',       geo: 'N. Virginia', live: true },
    { id: 'val-02', cloud: 'AWS',   region: 'us-east-1',       geo: 'N. Virginia' },
    { id: 'val-03', cloud: 'AWS',   region: 'eu-central-1',    geo: 'Frankfurt' },
    { id: 'val-04', cloud: 'AWS',   region: 'eu-central-1',    geo: 'Frankfurt' },
    { id: 'val-05', cloud: 'AWS',   region: 'ap-northeast-1',  geo: 'Tokyo' },
    { id: 'val-06', cloud: 'GCP',   region: 'us-central1',     geo: 'Iowa' },
    { id: 'val-07', cloud: 'GCP',   region: 'us-central1',     geo: 'Iowa' },
    { id: 'val-08', cloud: 'GCP',   region: 'europe-west2',    geo: 'London' },
    { id: 'val-09', cloud: 'GCP',   region: 'europe-west2',    geo: 'London' },
    { id: 'val-10', cloud: 'GCP',   region: 'asia-southeast1', geo: 'Singapore' },
    { id: 'val-11', cloud: 'GCP',   region: 'asia-southeast1', geo: 'Singapore' },
    { id: 'val-12', cloud: 'Azure', region: 'eastus2',         geo: 'Virginia' },
    { id: 'val-13', cloud: 'Azure', region: 'eastus2',         geo: 'Virginia' },
    { id: 'val-14', cloud: 'Azure', region: 'westeurope',      geo: 'Netherlands' },
    { id: 'val-15', cloud: 'Azure', region: 'westeurope',      geo: 'Netherlands' },
    { id: 'val-16', cloud: 'Azure', region: 'japaneast',       geo: 'Tokyo' }
  ];
  var colors = { AWS: 'var(--aws)', GCP: 'var(--gcp)', Azure: 'var(--az)' };
  var grid = document.getElementById('fleet-grid');
  if (grid) {
    fleet.forEach(function (n, i) {
      var el = document.createElement('div');
      el.className = 'node ' + (n.live ? 'live' : 'planned');
      el.style.setProperty('--c', colors[n.cloud]);
      el.style.animationDelay = (i * 45) + 'ms';
      el.innerHTML =
        '<span class="node-id">' + n.id + '</span>' +
        '<span class="node-cloud">' + n.cloud + ' · ' + n.region + '</span>' +
        '<span class="node-region">' + n.geo + '</span>' +
        '<span class="node-state"><i></i>' + (n.live ? 'LIVE' : 'PLANNED') + '</span>';
      grid.appendChild(el);
    });
  }

})();
