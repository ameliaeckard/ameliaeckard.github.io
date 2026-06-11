// ── Infinite Carousel ──────────────────────────────────────────
(function () {
    const track      = document.getElementById('projects-carousel');
    const origSlides = Array.from(track.querySelectorAll('.carousel-slide'));
    const dots       = Array.from(document.querySelectorAll('.carousel-dot'));
    let pos          = 1;
    let busy         = false;

    // Clone first & last for seamless wrap
    const pre = origSlides[origSlides.length - 1].cloneNode(true);
    const suf = origSlides[0].cloneNode(true);
    [pre, suf].forEach(c => c.classList.remove('active'));
    track.prepend(pre);
    track.appendChild(suf);

    const all = Array.from(track.querySelectorAll('.carousel-slide'));
    const n   = origSlides.length;

    function moveTo(p, instant) {
        pos = p;
        const tx = `translateX(calc(10% - ${p * 80}%))`;
        if (instant) {
            track.style.transition = 'none';
            track.style.transform  = tx;
            requestAnimationFrame(() => { track.style.transition = ''; });
        } else {
            track.style.transform = tx;
        }
        const ri = ((p - 1) % n + n) % n;
        all.forEach((s, i) => s.classList.toggle('active', i === p));
        dots.forEach((d, i) => d.classList.toggle('active', i === ri));
    }

    track.addEventListener('transitionend', (e) => {
        if (e.propertyName !== 'transform') return;
        busy = false;
        if (pos === 0)          moveTo(n,  true);
        else if (pos === n + 1) moveTo(1,  true);
    });

    function step(dir) {
        if (busy) return;
        busy = true;
        moveTo(pos + dir, false);
    }

    document.getElementById('carousel-prev').addEventListener('click', () => step(-1));
    document.getElementById('carousel-next').addEventListener('click', () => step(1));
    dots.forEach((d, i) => d.addEventListener('click', () => {
        if (!busy) { busy = true; moveTo(i + 1, false); }
    }));

    moveTo(1, true);
})();

// ── Contact form ───────────────────────────────────────────────
document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;
    const msg  = document.getElementById('form-message');
    msg.textContent = 'Sending…';
    try {
        const res = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
            msg.textContent = "Message sent! I'll be in touch soon.";
            form.reset();
        } else {
            msg.textContent = 'Something went wrong — please email directly.';
        }
    } catch {
        msg.textContent = 'Something went wrong — please email directly.';
    }
});
