# Checktrail icebreaker deck

`Checktrail-Icebreaker.pptx` is a 10-slide pitch about the game idea and how Icebreaker, Mirror Vote, and Feud unfreeze a room.

It matches the live editorial UI at [checktrail2.vercel.app](https://checktrail2.vercel.app/):

- Paper background `#ebe7e0`, charcoal lines, cream panels
- Display type **Syne**, body **DM Sans**
- Red / blue / green mode dots
- Geometric “guy” shapes in the margins

**Every title, body, card, and shape is a real PowerPoint object** — click and edit. There are no baked-in slide images. Syne and DM Sans are embedded in the file.

Rebuild:

```bash
python3 -m pip install python-pptx lxml
python3 docs/build_icebreaker_pptx.py
```
