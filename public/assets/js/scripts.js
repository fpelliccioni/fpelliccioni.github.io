document.addEventListener('DOMContentLoaded', function () {
  const button = document.querySelector('button.menu');
  const nav = document.querySelector('#site-navigation');
  if (button && nav) {
    nav.classList.add('menu-ready');
    button.addEventListener('click', function () {
      const expanded = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(expanded));
      nav.classList.toggle('is-open', expanded);
    });
  }
  document.querySelectorAll('article.post iframe').forEach(function (frame) {
    const wrapper = document.createElement('div');
    wrapper.className = 'video-container';
    frame.parentNode.insertBefore(wrapper, frame);
    wrapper.appendChild(frame);
  });
});
