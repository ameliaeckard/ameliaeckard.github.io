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
  