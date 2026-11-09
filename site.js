/* Mobile menu toggle. Without JS the links stay reachable through the in-page sections. */
(function () {
  var nav = document.querySelector('.nav');
  var btn = nav && nav.querySelector('.menu-btn');
  var links = nav && nav.querySelector('.links');
  if (!btn || !links) return;
  function set(open) {
    links.classList.toggle('open', open);
    nav.setAttribute('data-open', open ? 'true' : 'false');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  btn.addEventListener('click', function () { set(!links.classList.contains('open')); });
  links.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
})();
