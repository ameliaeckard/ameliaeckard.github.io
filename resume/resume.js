(() => {
    "use strict";

    const data = window.RESUME_DATA;
    if (!data || !data.profiles) return;

    const els = {
        buttons: document.getElementById("profile-buttons"),
        summary: document.getElementById("profile-summary"),
        sourcePath: document.getElementById("source-path"),
        status: document.getElementById("compile-status"),
        codeScroll: document.getElementById("code-scroll"),
        codeLines: document.getElementById("code-lines"),
        cursor: document.getElementById("code-cursor"),
        compiler: document.getElementById("compiler-log"),
        previewMeta: document.getElementById("preview-meta"),
        document: document.getElementById("resume-document"),
        print: document.getElementById("print-resume"),
        replay: document.getElementById("replay-build"),
        pdf: document.getElementById("download-pdf"),
        tex: document.getElementById("download-tex")
    };

    const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let activeSlug = data.defaultProfile || data.profileOrder[0];
    let buildToken = 0;

    const sleep = ms => new Promise(resolve => window.setTimeout(resolve, ms));

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function highlightLatex(line) {
        const trimmed = line.trimStart();
        if (trimmed.startsWith("%")) {
            return `<span class="syn-comment">${escapeHtml(line)}</span>`;
        }
        let html = escapeHtml(line);
        html = html.replace(/(\\[A-Za-z@]+\*?)/g, '<span class="syn-command">$1</span>');
        html = html.replace(/([{}])/g, '<span class="syn-brace">$1</span>');
        html = html.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="syn-number">$1</span>');
        const comment = html.indexOf("%");
        if (comment >= 0) {
            html = html.slice(0, comment) + `<span class="syn-comment">${html.slice(comment)}</span>`;
        }
        return html;
    }

    function makeCodeLine(line, number) {
        const row = document.createElement("div");
        row.className = "code-line";
        const num = document.createElement("span");
        num.className = "code-number";
        num.textContent = number;
        const code = document.createElement("span");
        code.className = "code-text";
        code.innerHTML = highlightLatex(line || " ");
        row.append(num, code);
        return row;
    }

    function setStatus(text, mode = "") {
        els.status.textContent = text;
        els.status.classList.toggle("is-building", mode === "building");
        els.status.classList.toggle("is-done", mode === "done");
    }

    function updateButtons() {
        els.buttons.querySelectorAll("button[data-profile]").forEach(button => {
            button.setAttribute("aria-pressed", String(button.dataset.profile === activeSlug));
        });
    }

    function renderProfileButtons() {
        const fragment = document.createDocumentFragment();
        data.profileOrder.forEach(slug => {
            const profile = data.profiles[slug];
            if (!profile) return;
            const button = document.createElement("button");
            button.type = "button";
            button.className = "profile-button";
            button.dataset.profile = slug;
            button.textContent = profile.shortLabel || profile.label;
            button.setAttribute("aria-pressed", "false");
            button.addEventListener("click", () => selectProfile(slug, true));
            fragment.appendChild(button);
        });
        els.buttons.replaceChildren(fragment);
        updateButtons();
    }

    function makeHeader() {
        const p = data.person;
        const header = document.createElement("header");
        header.className = "paper-header";
        const name = document.createElement("div");
        name.className = "paper-name";
        name.textContent = p.name;
        const contact = document.createElement("div");
        contact.className = "paper-contact";
        contact.append(
            document.createTextNode(`${p.location} | `),
            link(p.website, p.websiteUrl),
            document.createTextNode(" | "),
            link(p.github, p.githubUrl),
            document.createTextNode(" | "),
            link(p.linkedin, p.linkedinUrl)
        );
        header.append(name, contact);
        return header;
    }

    function link(label, href) {
        const anchor = document.createElement("a");
        anchor.href = href;
        anchor.textContent = label;
        anchor.target = "_blank";
        anchor.rel = "noreferrer";
        return anchor;
    }

    function createSection(title) {
        const section = document.createElement("section");
        section.className = "paper-section";
        const heading = document.createElement("h3");
        heading.className = "paper-section-title";
        heading.textContent = title;
        section.appendChild(heading);
        return section;
    }

    function renderEntry(entry) {
        const wrap = document.createElement("div");
        wrap.className = "paper-entry";

        if (entry.kind === "project") {
            const row = document.createElement("div");
            row.className = "paper-row";
            const left = document.createElement("div");
            const title = document.createElement("span");
            title.className = "paper-project-title";
            title.textContent = entry.title;
            const tech = document.createElement("span");
            tech.className = "paper-project-tech";
            tech.textContent = ` | ${entry.subtitle}`;
            left.append(title, tech);
            const date = document.createElement("span");
            date.className = "paper-entry-date";
            date.textContent = entry.date || "";
            row.append(left, date);
            wrap.appendChild(row);
        } else if (entry.kind === "activity") {
            const row = document.createElement("div");
            row.className = "paper-row";
            const title = document.createElement("span");
            title.className = "paper-entry-title";
            title.textContent = entry.title;
            const date = document.createElement("span");
            date.className = "paper-entry-date";
            date.textContent = entry.date || "";
            row.append(title, date);
            wrap.appendChild(row);
        } else {
            const first = document.createElement("div");
            first.className = "paper-row";
            const title = document.createElement("span");
            title.className = "paper-entry-title";
            title.textContent = entry.title;
            const location = document.createElement("span");
            location.className = "paper-entry-location";
            location.textContent = entry.location || "";
            first.append(title, location);

            const second = document.createElement("div");
            second.className = "paper-row";
            const subtitle = document.createElement("span");
            subtitle.className = "paper-entry-subtitle";
            subtitle.textContent = entry.subtitle || "";
            const date = document.createElement("span");
            date.className = "paper-entry-date paper-entry-subtitle";
            date.textContent = entry.date || "";
            second.append(subtitle, date);
            wrap.append(first, second);
        }

        if (entry.bullets && entry.bullets.length) {
            const list = document.createElement("ul");
            list.className = "paper-bullets";
            entry.bullets.forEach(text => {
                const li = document.createElement("li");
                li.textContent = text;
                list.appendChild(li);
            });
            wrap.appendChild(list);
        }
        return wrap;
    }

    function appendEntries(section, entries) {
        entries.forEach(entry => section.appendChild(renderEntry(entry)));
    }

    function skillsSection(skills) {
        const section = createSection("Technical Skills");
        skills.forEach(([label, values]) => {
            const row = document.createElement("div");
            row.className = "paper-skill";
            const strong = document.createElement("strong");
            strong.textContent = label;
            row.append(strong, document.createTextNode(values));
            section.appendChild(row);
        });
        return section;
    }

    function normalPage(profile) {
        const page = document.createElement("article");
        page.className = "resume-paper";
        page.appendChild(makeHeader());

        const education = createSection("Education");
        appendEntries(education, profile.education || []);
        page.appendChild(education);

        if (profile.experience && profile.experience.length) {
            const experience = createSection("Experience");
            appendEntries(experience, profile.experience);
            page.appendChild(experience);
        }

        if (profile.projects && profile.projects.length) {
            const projects = createSection("Projects");
            appendEntries(projects, profile.projects);
            page.appendChild(projects);
        }

        if (profile.skills && profile.skills.length) page.appendChild(skillsSection(profile.skills));

        if (profile.involvement && profile.involvement.length) {
            const involvement = createSection("Certifications & Involvement");
            appendEntries(involvement, profile.involvement);
            page.appendChild(involvement);
        }
        return page;
    }

    function masterPages(profile) {
        const firstPage = document.createElement("article");
        const secondPage = document.createElement("article");
        firstPage.className = secondPage.className = "resume-paper";
        firstPage.appendChild(makeHeader());

        const education = createSection("Education");
        appendEntries(education, profile.education || []);
        firstPage.appendChild(education);

        const experience = createSection("Experience");
        appendEntries(experience, profile.experience || []);
        firstPage.appendChild(experience);

        const firstProjects = [];
        const secondProjects = [];
        let crossedBreak = false;
        (profile.projects || []).forEach(project => {
            if (project.title === profile.pageBreakBefore) crossedBreak = true;
            (crossedBreak ? secondProjects : firstProjects).push(project);
        });

        if (firstProjects.length) {
            const projects = createSection("Projects");
            appendEntries(projects, firstProjects);
            firstPage.appendChild(projects);
        }

        if (secondProjects.length) {
            const projects = createSection("Projects");
            appendEntries(projects, secondProjects);
            secondPage.appendChild(projects);
        }
        if (profile.skills && profile.skills.length) secondPage.appendChild(skillsSection(profile.skills));
        if (profile.involvement && profile.involvement.length) {
            const involvement = createSection("Certifications & Involvement");
            appendEntries(involvement, profile.involvement);
            secondPage.appendChild(involvement);
        }
        return [firstPage, secondPage];
    }

    function renderResume(profile) {
        const pages = profile.pages > 1 ? masterPages(profile) : [normalPage(profile)];
        els.document.replaceChildren(...pages);
    }

    async function loadSource(profile) {
        try {
            const response = await fetch(profile.tex, { cache: "no-store" });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.text();
        } catch (error) {
            return `${profile.recipe}\n\n% Full source available at ${profile.tex}`;
        }
    }

    async function animateSource(profile, token) {
        const source = await loadSource(profile);
        if (token !== buildToken) return false;
        const lines = source.replace(/\r\n/g, "\n").split("\n");
        els.codeLines.replaceChildren();
        els.compiler.textContent = `$ preparing ${profile.tex}...`;
        els.codeScroll.scrollTop = 0;

        const delay = prefersReducedMotion ? 0 : Math.max(5, Math.min(14, Math.round(1650 / Math.max(lines.length, 1))));
        const batch = prefersReducedMotion ? lines.length : (lines.length > 220 ? 2 : 1);

        for (let i = 0; i < lines.length; i += batch) {
            if (token !== buildToken) return false;
            const frag = document.createDocumentFragment();
            for (let j = i; j < Math.min(i + batch, lines.length); j += 1) {
                frag.appendChild(makeCodeLine(lines[j], j + 1));
            }
            els.codeLines.appendChild(frag);
            els.codeScroll.scrollTop = els.codeScroll.scrollHeight;
            if (delay) await sleep(delay);
        }
        return token === buildToken;
    }

    async function runCompiler(profile, token) {
        const filename = profile.tex.split("/").pop();
        const output = profile.pdf.split("/").pop();
        const messages = [
            `$ pdflatex -interaction=nonstopmode ${filename}`,
            "This is pdfTeX, entering extended mode...",
            `Applying profile: ${profile.label}`,
            `Writing ${output}...`,
            `Output written on ${output} (${profile.pages} page${profile.pages === 1 ? "" : "s"}).`,
            "✓ build complete"
        ];
        els.compiler.textContent = "";
        for (const message of messages) {
            if (token !== buildToken) return false;
            els.compiler.textContent += `${els.compiler.textContent ? "\n" : ""}${message}`;
            if (!prefersReducedMotion) await sleep(message.startsWith("Output") ? 230 : 120);
        }
        return token === buildToken;
    }

    async function selectProfile(slug, animate = true) {
        const profile = data.profiles[slug];
        if (!profile) return;
        activeSlug = slug;
        const token = ++buildToken;
        updateButtons();

        els.summary.textContent = profile.summary;
        els.sourcePath.textContent = profile.tex;
        els.previewMeta.textContent = `${profile.label} · ${profile.pages} page${profile.pages === 1 ? "" : "s"}`;
        els.pdf.href = profile.pdf;
        els.pdf.download = profile.downloadName;
        els.tex.href = profile.tex;
        els.tex.download = profile.tex.split("/").pop();
        els.document.classList.add("is-building");
        setStatus("writing", "building");

        if (!animate || prefersReducedMotion) {
            const source = await loadSource(profile);
            if (token !== buildToken) return;
            els.codeLines.replaceChildren(...source.replace(/\r\n/g, "\n").split("\n").map((line, index) => makeCodeLine(line, index + 1)));
            els.compiler.textContent = `$ pdflatex ${profile.tex.split("/").pop()}\nOutput written on ${profile.pdf.split("/").pop()} (${profile.pages} page${profile.pages === 1 ? "" : "s"}).\n✓ build complete`;
        } else {
            const sourceDone = await animateSource(profile, token);
            if (!sourceDone) return;
            setStatus("compiling", "building");
            const compileDone = await runCompiler(profile, token);
            if (!compileDone) return;
        }

        if (token !== buildToken) return;
        renderResume(profile);
        els.document.classList.remove("is-building");
        setStatus("compiled", "done");
    }

    els.print.addEventListener("click", () => window.print());
    els.replay.addEventListener("click", () => selectProfile(activeSlug, true));

    renderProfileButtons();
    const initial = data.profiles[activeSlug];
    renderResume(initial);
    els.summary.textContent = initial.summary;
    selectProfile(activeSlug, true);
})();
