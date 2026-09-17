# Checktrail icebreaker deck

`Checktrail-Icebreaker.pptx` is a 10-slide pitch about the game idea and how it works as a social icebreaker.

Visuals match the live scribble UI: black ground, white ink, wobbly outlines, **Gochi Hand** titles, **Patrick Hand** body. Slides are rasterized with those fonts so PowerPoint still looks right if the machine does not have them installed.

Rebuild:

```bash
python3 -m pip install python-pptx pillow
python3 docs/build_icebreaker_pptx.py
```

Fonts live in `docs/fonts/` (Google Fonts, SIL Open Font License).
