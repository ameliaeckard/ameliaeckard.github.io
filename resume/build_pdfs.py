#!/usr/bin/env python3
"""Regenerate tailored .tex files and compile all resume PDFs locally.

No GitHub Actions are required. Run:
    python build_pdfs.py
"""
from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
LATEX = ROOT / "latex"
PDFS = ROOT / "pdfs"


def run(cmd: list[str], cwd: Path) -> None:
    result = subprocess.run(cmd, cwd=cwd, text=True, capture_output=True)
    if result.returncode != 0:
        print(result.stdout)
        print(result.stderr, file=sys.stderr)
        raise SystemExit(result.returncode)


def main() -> None:
    run([sys.executable, str(ROOT / "generate_profiles.py")], ROOT)
    pdflatex = shutil.which("pdflatex")
    if not pdflatex:
        raise SystemExit("pdflatex was not found. Install a TeX distribution, then rerun this script.")

    PDFS.mkdir(exist_ok=True)
    tex_files = [LATEX / "master.tex", *sorted(p for p in LATEX.glob("*.tex") if p.name != "master.tex")]

    for tex in tex_files:
        build_dir = ROOT / ".latex-build" / tex.stem
        build_dir.mkdir(parents=True, exist_ok=True)
        # Two passes keeps hyperlinks/metadata stable if the source grows later.
        for _ in range(2):
            run([
                pdflatex,
                "-interaction=nonstopmode",
                "-halt-on-error",
                f"-output-directory={build_dir}",
                tex.name,
            ], LATEX)
        compiled = build_dir / f"{tex.stem}.pdf"
        target = PDFS / f"{tex.stem}.pdf"
        shutil.copy2(compiled, target)
        print(f"compiled pdfs/{target.name}")

    run([sys.executable, str(ROOT / "generate_web_data.py")], ROOT)


if __name__ == "__main__":
    main()
