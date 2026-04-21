(function () {
  var topnav = document.getElementById('topnav');
  var burger = document.getElementById('topnav-burger');
  if (!topnav) return;

  // Scrolled state + scrollspy
  var onScroll = function () {
    topnav.classList.toggle('is-scrolled', window.scrollY > 8);

    // Scrollspy — only on pages with in-page anchors
    var links = Array.from(document.querySelectorAll('.topnav__links a'));
    var active = null;
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      if (href.charAt(0) !== '#') continue;
      var sec = document.getElementById(href.slice(1));
      if (!sec) continue;
      var r = sec.getBoundingClientRect();
      if (r.top <= 120) active = links[i];
    }
    links.forEach(function (a) {
      var href = a.getAttribute('href');
      if (href.charAt(0) === '#') {
        a.classList.toggle('is-active', a === active);
      }
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Burger menu
  if (burger) {
    burger.addEventListener('click', function () {
      topnav.classList.toggle('is-open');
    });
  }
  document.querySelectorAll('.topnav__links a').forEach(function (a) {
    a.addEventListener('click', function () {
      topnav.classList.remove('is-open');
    });
  });
})();
