#!/usr/bin/env python3
"""Generate tailored one-page LaTeX resumes from the canonical master.tex.

The master resume stays canonical. Profile selections live in profile_config.json.
This script extracts complete tagged entries from the master and can trim the
number of bullet points per entry to keep role-specific resumes concise.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
LATEX = ROOT / "latex"
MASTER = LATEX / "master.tex"
CONFIG = ROOT / "profile_config.json"

SECTION_MARKER = re.compile(r"^% ---------- (.+?) ----------\s*$")
ENTRY_MACROS = ("\\resumeentry", "\\projectentry", "\\activityentry")


def tighten_preamble(text: str) -> str:
    return text


def first_braced_argument(lines: list[str], macro_index: int) -> str:
    # Extract the first top-level braced argument, preserving nested LaTeX braces.
    for line in lines[macro_index + 1 : macro_index + 5]:
        text = line.strip()
        start = text.find("{")
        if start < 0:
            continue
        depth = 0
        for i in range(start, len(text)):
            ch = text[i]
            if ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    return text[start + 1 : i]
    raise ValueError(f"Could not identify entry title near line: {lines[macro_index]}")


def trim_bullets(block: str, max_bullets: int) -> str:
    if max_bullets < 0 or "\\begin{itemize}" not in block:
        return block
    if max_bullets == 0:
        return re.sub(r"\n?\\begin\{itemize\}.*?\\end\{itemize\}", "", block, flags=re.S).rstrip()
    lines = block.splitlines()
    kept = []
    bullet_count = 0
    for line in lines:
        if line.lstrip().startswith("\\item "):
            bullet_count += 1
            if bullet_count > max_bullets:
                continue
        kept.append(line)
    return "\n".join(kept).rstrip()


def parse_master(text: str):
    lines = text.splitlines()
    begin_idx = next(i for i, line in enumerate(lines) if line.strip() == r"\begin{document}")
    preamble = "\n".join(lines[: begin_idx + 1])

    markers: list[tuple[int, str]] = []
    for i, line in enumerate(lines):
        match = SECTION_MARKER.match(line)
        if match:
            markers.append((i, match.group(1).strip().lower()))

    sections: dict[str, list[str]] = {}
    for idx, (start, name) in enumerate(markers):
        end = markers[idx + 1][0] if idx + 1 < len(markers) else len(lines)
        sections[name] = lines[start:end]

    education_marker_idx = next(i for i, line in enumerate(lines) if line.strip() == "% ---------- EDUCATION ----------")
    header = "\n".join(lines[begin_idx + 1 : education_marker_idx]).rstrip()

    return preamble, header, sections


def extract_entries(section_lines: list[str]) -> dict[str, str]:
    tag_indices = [i for i, line in enumerate(section_lines) if line.strip().startswith("% TAGS:")]
    entries: dict[str, str] = {}
    for pos, start in enumerate(tag_indices):
        end = tag_indices[pos + 1] if pos + 1 < len(tag_indices) else len(section_lines)
        block_lines = section_lines[start:end]
        while block_lines and block_lines[-1].strip() in {"", r"\smallskip"}:
            block_lines.pop()
        macro_idx = next((i for i, line in enumerate(block_lines) if line.strip() in ENTRY_MACROS), None)
        if macro_idx is None:
            continue
        title = first_braced_argument(block_lines, macro_idx)
        entries[title] = "\n".join(block_lines).rstrip()
    return entries


def raw_section_body(section_lines: list[str], section_name: str) -> str:
    # Remove the comment marker; retain the actual \section and content.
    body = list(section_lines)
    if body and SECTION_MARKER.match(body[0]):
        body = body[1:]
    # Strip terminal whitespace/smallskip and master-notes leftovers.
    while body and body[-1].strip() == "":
        body.pop()
    return "\n".join(body).rstrip()


def build_skills(profile: dict, default_skills: str) -> str:
    custom = profile.get("skills")
    if not custom:
        return default_skills
    lines = ["% ---------- TECHNICAL SKILLS ----------", r"\section{Technical Skills}", ""]
    for idx, (label, values) in enumerate(custom):
        suffix = r" \\[1pt]" if idx < len(custom) - 1 else ""
        lines.append(rf"\noindent\textbf{{{label}}} \quad {values}{suffix}")
    return "\n".join(lines)


def build_section(title: str, selected: dict[str, int], entries: dict[str, str]) -> str:
    if not selected:
        return ""
    blocks = []
    missing = []
    for entry_title, bullet_limit in selected.items():
        if entry_title not in entries:
            missing.append(entry_title)
            continue
        blocks.append(trim_bullets(entries[entry_title], int(bullet_limit)))
    if missing:
        raise KeyError(f"Missing {title} entries in master.tex: {missing}")
    if not blocks:
        return ""
    return f"% ---------- {title.upper()} ----------\n\\section{{{title}}}\n\n" + "\n\n\\smallskip\n\n".join(blocks)


def strip_comment_only_lines(text: str) -> str:
    """Remove generator/master annotation comments from tailored LaTeX output."""
    lines = [line for line in text.splitlines() if not line.lstrip().startswith("%")]
    compact: list[str] = []
    blank = False
    for line in lines:
        is_blank = not line.strip()
        if is_blank and blank:
            continue
        compact.append(line)
        blank = is_blank
    return "\n".join(compact).strip() + "\n"


def main() -> None:
    master_text = MASTER.read_text(encoding="utf-8")
    preamble, header, sections = parse_master(master_text)
    preamble = tighten_preamble(preamble)

    experience = extract_entries(sections["experience"])
    projects = extract_entries(sections["projects"])
    involvement = extract_entries(sections["certifications & involvement"])

    education = raw_section_body(sections["education"], "Education")
    skills = raw_section_body(sections["technical skills"], "Technical Skills")

    config = json.loads(CONFIG.read_text(encoding="utf-8"))
    for slug, profile in config.items():
        parts = [preamble, "", header, "", education]
        exp = build_section("Experience", profile.get("experience", {}), experience)
        if exp:
            parts += ["", exp]
        projs = build_section("Projects", profile.get("projects", {}), projects)
        if projs:
            parts += ["", projs]
        parts += ["", build_skills(profile, skills)]
        inv = build_section("Certifications \\& Involvement", profile.get("involvement", {}), involvement)
        if inv:
            parts += ["", inv]
        parts += ["", r"\end{document}", ""]
        output = strip_comment_only_lines("\n".join(parts))
        (LATEX / f"{slug}.tex").write_text(output, encoding="utf-8")
        print(f"generated latex/{slug}.tex")


if __name__ == "__main__":
    main()
