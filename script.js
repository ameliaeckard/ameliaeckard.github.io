// Infinite featured project carousel, measured from actual slide geometry.
(function () {
    const track = document.getElementById('projects-carousel');
    const viewport = track && track.closest('.carousel-viewport');
    if (!track || !viewport) return;
    const originals = Array.from(track.querySelectorAll('.carousel-slide'));
    if (!originals.length) return;
    const dots = Array.from(document.querySelectorAll('.carousel-dot'));
    const prev = document.getElementById('carousel-prev');
    const next = document.getElementById('carousel-next');
    const count = originals.length;
    let position = 1;
    let busy = false;
    let touchStart = null;

    const before = originals[count - 1].cloneNode(true);
    const after = originals[0].cloneNode(true);
    before.classList.remove('active');
    after.classList.remove('active');
    before.setAttribute('aria-hidden', 'true');
    after.setAttribute('aria-hidden', 'true');
    track.prepend(before);
    track.append(after);
    const slides = Array.from(track.querySelectorAll('.carousel-slide'));

    function render(instant = false) {
        const slide = slides[position];
        if (!slide) return;
        const x = (viewport.clientWidth - slide.offsetWidth) / 2 - slide.offsetLeft;
        if (instant) track.style.transition = 'none';
        track.style.transform = 'translate3d(' + x + 'px, 0, 0)';
        slides.forEach((item, i) => {
            const active = i === position;
            item.classList.toggle('active', active);
            item.setAttribute('aria-hidden', String(!active));
            item.querySelectorAll('a, button').forEach(link => {
                if (active) link.removeAttribute('tabindex');
                else link.setAttribute('tabindex', '-1');
            });
        });
        const dotIndex = ((position - 1) % count + count) % count;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === dotIndex));
        if (instant) {
            // Flush the no-transition position before restoring animation.
            void track.offsetHeight;
            track.style.transition = '';
        }
    }

    function move(dir) {
        if (busy || count < 2) return;
        busy = true;
        position += dir;
        render();
    }
    track.addEventListener('transitionend', event => {
        if (event.target !== track || event.propertyName !== 'transform') return;
        if (position === 0) position = count;
        else if (position === count + 1) position = 1;
        render(true);
        busy = false;
    });
    if (prev) prev.addEventListener('click', () => move(-1));
    if (next) next.addEventListener('click', () => move(1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => {
        if (busy || position === i + 1) return;
        busy = true;
        position = i + 1;
        render();
    }));
    viewport.addEventListener('touchstart', e => {
        if (e.touches.length === 1) touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });
    viewport.addEventListener('touchend', e => {
        if (!touchStart || !e.changedTouches.length) return;
        const dx = e.changedTouches[0].clientX - touchStart.x;
        const dy = e.changedTouches[0].clientY - touchStart.y;
        touchStart = null;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) move(dx < 0 ? 1 : -1);
    }, { passive: true });
    window.addEventListener('resize', () => render(true));
    render(true);
})();

// ── Contact form ───────────────────────────────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
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
                msg.textContent = 'Something went wrong, please email directly.';
            }
        } catch {
            msg.textContent = 'Something went wrong, please email directly.';
        }
    });
}

// ── Bug report form ────────────────────────────────────────────
const bugForm = document.getElementById('bug-form');
if (bugForm) {
    bugForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const form = e.target;
        const msg  = document.getElementById('bug-form-message');
        msg.textContent = 'Sending…';
        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                msg.textContent = "Thanks, got it. I'll take a look.";
                form.reset();
            } else {
                msg.textContent = 'Something went wrong, please email me directly instead.';
            }
        } catch {
            msg.textContent = 'Something went wrong, please email me directly instead.';
        }
    });
}


// Site theme: follow OS preferences until visitor explicitly switches modes.
(function () {
    const storageKey = 'amelia-theme';
    const root = document.documentElement;
    const system = window.matchMedia('(prefers-color-scheme: dark)');
    let preference = null;
    try { preference = localStorage.getItem(storageKey); } catch (_) {}
    const currentTheme = () => preference === 'light' || preference === 'dark' ? preference : (system.matches ? 'dark' : 'light');
    function updateTheme() {
        const mode = currentTheme();
        root.dataset.theme = mode;
        root.style.colorScheme = mode;
        document.querySelectorAll('.theme-toggle').forEach(button => {
            button.setAttribute('aria-label', 'Switch to ' + (mode === 'dark' ? 'light' : 'dark') + ' mode');
            button.setAttribute('aria-pressed', String(mode === 'dark'));
            button.title = 'Switch to ' + (mode === 'dark' ? 'light' : 'dark') + ' mode';
        });
    }
    const footer = document.querySelector('.footer-links') || document.querySelector('.footer-content');
    if (footer && !footer.querySelector('.theme-toggle')) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'theme-toggle';
        button.textContent = '☼';
        button.addEventListener('click', () => {
            preference = currentTheme() === 'dark' ? 'light' : 'dark';
            try { localStorage.setItem(storageKey, preference); } catch (_) {}
            updateTheme();
        });
        footer.appendChild(button);
    }
    updateTheme();
    if (system.addEventListener) system.addEventListener('change', () => { if (!preference || (preference !== 'light' && preference !== 'dark')) updateTheme(); });
    else if (system.addListener) system.addListener(() => { if (!preference) updateTheme(); });
})();
