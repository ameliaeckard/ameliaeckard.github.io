# Amelia Eckard Interactive Resume

This folder is designed to be copied directly into the root of `ameliaeckard/ameliaeckard.github.io` as `/resume/`.

## What it includes

- `index.html` - interactive resume page
- `resume.css` - styles for the builder, code editor, resume preview, and print view
- `resume.js` - profile switching, LaTeX build animation, printing, and PDF download behavior
- `resume-data.js` - generated structured resume content used by the web preview
- `latex/master.tex` - canonical master resume
- `latex/*.tex` - generated tailored LaTeX resumes
- `pdfs/*.pdf` - compiled resume PDFs
- `profile_config.json` - controls what appears in each profile
- `generate_profiles.py` - generates tailored LaTeX from the master
- `generate_web_data.py` - keeps the web preview synchronized with the master/config
- `build_pdfs.py` - regenerates the tailored source, PDFs, and web data locally

## Add it to the website

1. Copy this entire `resume` folder into the repository root.
2. Add this link to the main site's navigation wherever you want Resume to appear:

```html
<a href="/resume/">Resume</a>
```

No framework or GitHub Action is required. The published page will be available at:

`https://ameliaeckard.com/resume/`

## Update the resume later

1. Edit only `latex/master.tex` for resume content.
2. Adjust `profile_config.json` if you want to change which entries appear in a tailored profile.
3. Run from this folder:

```bash
python build_pdfs.py
```

4. Commit the regenerated `latex/*.tex`, `pdfs/*.pdf`, and `resume-data.js` files with the rest of your website changes.

## Profiles included

- AI / ML
- AI Research
- Software Engineering
- XR / Spatial Computing
- Creative Technology
- Teaching / Mentorship
- Master Resume

## Print behavior

The Print button calls the browser print dialog and the print stylesheet hides the website UI so only the currently selected resume is printed. The page is formatted as US Letter (8.5 × 11 in). The Master Resume prints as two pages; tailored profiles print as one page. The public page exposes only PDF downloads; the LaTeX source remains part of the site package for maintenance and the live build animation.
