function includeHTML() {
  document.querySelectorAll('[data-include]').forEach(async el => {
    const file = el.getAttribute('data-include');
    const res = await fetch(file);
    const html = await res.text();
    el.innerHTML = html;

    // After footer loads
    if (file.includes("footer")) {
      const yearSpan = document.getElementById("year");
      if (yearSpan) yearSpan.textContent = new Date().getFullYear();

      const btn = document.getElementById("back-to-top-btn");
      if (btn) {
        btn.addEventListener("click", function () {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.onscroll = function () {
          if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            btn.style.display = "block";
          } else {
            btn.style.display = "none";
          }
        };
      }
    }
  });
}

window.addEventListener('DOMContentLoaded', includeHTML);
