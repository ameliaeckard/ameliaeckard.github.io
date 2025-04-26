window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled-header');
  } else {
    header.classList.remove('scrolled-header');
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const vh = window.innerHeight;
  document.body.style.minHeight = vh + 'px';
});
