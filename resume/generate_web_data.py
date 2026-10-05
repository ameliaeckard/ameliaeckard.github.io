#!/usr/bin/env python3
"""Generate resume-data.js for the static interactive resume page.

The web preview is derived from the same master/config used to generate PDFs,
so the visible resume and downloadable files stay aligned.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
LATEX = ROOT / "latex"
MASTER = LATEX / "master.tex"
CONFIG = ROOT / "profile_config.json"
OUT = ROOT / "resume-data.js"

SECTION_MARKER = re.compile(r"^% ---------- (.+?) ----------\s*$")
ENTRY_MACROS = ("\\resumeentry", "\\projectentry", "\\activityentry")


def latex_plain(text: str) -> str:
    text = text.strip()
    text = re.sub(r"\\href\{[^{}]+\}\{([^{}]+)\}", r"\1", text)
    # Apply simple formatting commands repeatedly in case they are nested.
    for _ in range(3):
        text = re.sub(r"\\(?:textit|textbf)\{([^{}]*)\}", r"\1", text)
    replacements = {
        r"\&": "&",
        r"\%": "%",
        r"\_": "_",
        r"\#": "#",
        r"\textbar{}": "|",
        r"\texttimes{}": "×",
        r"\quad": " ",
        "---": "—",
        "--": "–",
        "~": " ",
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    text = re.sub(r"\\[a-zA-Z]+\*?(?:\[[^\]]*\])?", "", text)
    text = text.replace("{", "").replace("}", "")
    return re.sub(r"\s+", " ", text).strip()


def braced_args(lines: list[str], macro_idx: int, count: int) -> list[str]:
    text = "\n".join(lines[macro_idx: macro_idx + count + 8])
    start = -1
    macro = None
    for candidate in ENTRY_MACROS:
        pos = text.find(candidate)
        if pos != -1 and (start == -1 or pos < start):
            start = pos
            macro = candidate
    if macro is None:
        raise ValueError("Entry macro not found")
    pos = start + len(macro)
    args: list[str] = []
    while pos < len(text) and len(args) < count:
        while pos < len(text) and text[pos] != "{":
            pos += 1
        if pos >= len(text):
            break
        depth = 0
        begin = pos + 1
        i = pos
        while i < len(text):
            if text[i] == "{":
                depth += 1
            elif text[i] == "}":
                depth -= 1
                if depth == 0:
                    args.append(text[begin:i])
                    pos = i + 1
                    break
            i += 1
        else:
            break
    if len(args) != count:
        raise ValueError(f"Expected {count} args for {macro}, got {len(args)}")
    return args


def split_sections(text: str) -> dict[str, list[str]]:
    lines = text.splitlines()
    markers = []
    for i, line in enumerate(lines):
        m = SECTION_MARKER.match(line)
        if m:
            markers.append((i, m.group(1).strip().lower()))
    result = {}
    for idx, (start, name) in enumerate(markers):
        end = markers[idx + 1][0] if idx + 1 < len(markers) else len(lines)
        result[name] = lines[start:end]
    return result


def parse_entries(section_lines: list[str]) -> list[dict]:
    tag_indices = [i for i, line in enumerate(section_lines) if line.strip().startswith("% TAGS:")]
    entries = []
    for n, start in enumerate(tag_indices):
        end = tag_indices[n + 1] if n + 1 < len(tag_indices) else len(section_lines)
        block = section_lines[start:end]
        macro_idx = next((i for i, line in enumerate(block) if line.strip() in ENTRY_MACROS), None)
        if macro_idx is None:
            continue
        macro = block[macro_idx].strip()
        count = {"\\resumeentry": 4, "\\projectentry": 3, "\\activityentry": 2}[macro]
        args = [latex_plain(x) for x in braced_args(block, macro_idx, count)]
        bullets = [latex_plain(line.strip()[6:]) for line in block if line.lstrip().startswith("\\item ")]
        tags = [t.strip() for t in block[0].split(":", 1)[1].split(",")]
        if macro == "\\resumeentry":
            item = {
                "kind": "experience",
                "title": args[0], "location": args[1], "subtitle": args[2], "date": args[3],
                "bullets": bullets, "tags": tags,
            }
        elif macro == "\\projectentry":
            item = {
                "kind": "project",
                "title": args[0], "subtitle": args[1], "date": args[2],
                "bullets": bullets, "tags": tags,
            }
        else:
            item = {
                "kind": "activity",
                "title": args[0], "date": args[1], "bullets": bullets, "tags": tags,
            }
        entries.append(item)
    return entries


def index_by_title(entries: list[dict]) -> dict[str, dict]:
    return {e["title"]: e for e in entries}


def choose(index: dict[str, dict], selection: dict[str, int]) -> list[dict]:
    out = []
    for raw_title, limit in selection.items():
        title = latex_plain(raw_title)
        if title not in index:
            raise KeyError(f"Missing web entry: {title}")
        item = dict(index[title])
        item["bullets"] = item.get("bullets", [])[: int(limit)] if int(limit) >= 0 else item.get("bullets", [])
        out.append(item)
    return out


def skills_from_master(section_lines: list[str]) -> list[list[str]]:
    rows = []
    for line in section_lines:
        if line.strip().startswith(r"\noindent\textbf{"):
            m = re.match(r"\\noindent\\textbf\{([^{}]+)\}\s*\\quad\s*(.*?)(?:\\\\\[1pt\])?$", line.strip())
            if m:
                rows.append([latex_plain(m.group(1)), latex_plain(m.group(2))])
    return rows


def profile_recipe(slug: str, p: dict) -> str:
    def names(key: str) -> str:
        vals = [latex_plain(x) for x in p.get(key, {}).keys()]
        return ", ".join(vals) if vals else "none"
    lines = [
        f"% selected profile: {p['label']}",
        rf"\profile{{{slug}}}",
        rf"\includeexperience{{{names('experience')}}}",
        rf"\includeprojects{{{names('projects')}}}",
        rf"\includeinvolvement{{{names('involvement')}}}",
        rf"\compileResume{{Amelia-Eckard-{slug}.pdf}}",
    ]
    return "\n".join(lines)


def main() -> None:
    master_text = MASTER.read_text(encoding="utf-8")
    sections = split_sections(master_text)
    education = parse_entries(sections["education"])
    experience = parse_entries(sections["experience"])
    projects = parse_entries(sections["projects"])
    involvement = parse_entries(sections["certifications & involvement"])
    master_skills = skills_from_master(sections["technical skills"])

    exp_idx, proj_idx, inv_idx = map(index_by_title, (experience, projects, involvement))
    config = json.loads(CONFIG.read_text(encoding="utf-8"))

    profiles: dict[str, dict] = {}
    for slug, p in config.items():
        profiles[slug] = {
            "label": p["label"],
            "shortLabel": p.get("short_label", p["label"]),
            "summary": p["summary"],
            "pdf": f"pdfs/{slug}.pdf",
            "tex": f"latex/{slug}.tex",
            "downloadName": f"Amelia-Eckard-{slug}-Resume.pdf",
            "pages": 1,
            "recipe": profile_recipe(slug, p),
            "education": education,
            "experience": choose(exp_idx, p.get("experience", {})),
            "projects": choose(proj_idx, p.get("projects", {})),
            "skills": [[latex_plain(a), latex_plain(b)] for a, b in p.get("skills", master_skills)],
            "involvement": choose(inv_idx, p.get("involvement", {})),
        }

    profiles["master"] = {
        "label": "Master Resume",
        "shortLabel": "Master",
        "summary": "The complete canonical resume with all experience, projects, technical skills, certifications, and involvement.",
        "pdf": "pdfs/master.pdf",
        "tex": "latex/master.tex",
        "downloadName": "Amelia-Eckard-Master-Resume.pdf",
        "pages": 2,
        "pageBreakBefore": "RoomCode",
        "recipe": "% canonical source\n\\profile{master}\n\\include{all-experience}\n\\include{all-projects}\n\\include{all-skills}\n\\compileResume{Amelia-Eckard-Master-Resume.pdf}",
        "education": education,
        "experience": experience,
        "projects": projects,
        "skills": master_skills,
        "involvement": involvement,
    }

    data = {
        "person": {
            "name": "Amelia Eckard",
            "location": "Charlotte, NC",
            "website": "ameliaeckard.com",
            "websiteUrl": "https://ameliaeckard.com",
            "github": "github.com/ameliaeckard",
            "githubUrl": "https://github.com/ameliaeckard",
            "linkedin": "linkedin.com/in/ameliaeckard",
            "linkedinUrl": "https://linkedin.com/in/ameliaeckard"
        },
        "defaultProfile": "ai-ml",
        "profileOrder": ["ai-ml", "research", "software", "xr", "creative", "teaching", "master"],
        "profiles": profiles,
    }
    OUT.write_text("window.RESUME_DATA = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
    print(f"generated {OUT.name}")


if __name__ == "__main__":
    main()
