function includeHTML() {
    document.querySelectorAll('[data-include]').forEach(async el => {
      const file = el.getAttribute('data-include');
      const res = await fetch(file);
      const html = await res.text();
      el.innerHTML = html;
  
      if (file.includes("footer")) {
        const yearSpan = document.getElementById("year");
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
      }
    });
  }
  window.addEventListener('DOMContentLoaded', includeHTML);

  // Scroll to top
  window.onscroll = function () {
    const btn = document.getElementById("backToTopBtn");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };
  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("backToTopBtn");
    if (btn) {
      btn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  });