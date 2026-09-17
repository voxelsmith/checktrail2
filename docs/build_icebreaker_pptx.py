#!/usr/bin/env python3
"""Build an *editable* PowerPoint in the live checktrail2.vercel.app look.

Shapes and text are native DrawingML (not pictures). Syne + DM Sans are
embedded so the deck keeps the game typefaces on machines that do not
have them installed.
"""

from __future__ import annotations

import shutil
import tempfile
import zipfile
from pathlib import Path

from lxml import etree
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE, MSO_SHAPE_TYPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.oxml.ns import qn
from pptx.util import Emu, Inches, Pt

ROOT = Path(__file__).resolve().parent
FONT_DIR = ROOT / "fonts"
PPTX_PATH = ROOT / "Checktrail-Icebreaker.pptx"

# Live iso-theme tokens from https://checktrail2.vercel.app/ui/shared/iso-theme.css
BG = RGBColor(0xEB, 0xE7, 0xE0)
PANEL = RGBColor(0xF7, 0xF5, 0xF1)
INK = RGBColor(0x1C, 0x1B, 0x19)
MUTED = RGBColor(0x6E, 0x6A, 0x64)
LINE = RGBColor(0x2A, 0x28, 0x26)
RED = RGBColor(0xB8, 0x3A, 0x3A)
TEAL = RGBColor(0x2A, 0x7D, 0x7A)
GREEN = RGBColor(0x4A, 0x7A, 0x45)
BLUE = RGBColor(0x2F, 0x4F, 0x9B)
CREAM = RGBColor(0xF7, 0xF5, 0xF1)

SYNE = "Syne"
DM = "DM Sans"
NSMAP = {
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
}
R_NS = NSMAP["r"]


def rgb(color: RGBColor) -> str:
    return f"{int(color):06X}"


def style_run(run, name: str, size: float, color: RGBColor, *, bold=False, spc: int | None = None) -> None:
    run.font.name = name
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.italic = False
    run.font.color.rgb = color
    rPr = run._r.get_or_add_rPr()
    if spc is not None:
        rPr.set("spc", str(spc))
    for tag in ("a:latin", "a:ea", "a:cs"):
        el = rPr.find(qn(tag))
        if el is None:
            el = etree.SubElement(rPr, qn(tag))
        el.set("typeface", name)


def set_para(paragraph, text: str, name: str, size: float, color: RGBColor, *, bold=False, spc: int | None = None, after: float = 0, align=PP_ALIGN.LEFT, line_spacing: float = 1.15) -> None:
    paragraph.alignment = align
    paragraph.text = text
    if not paragraph.runs:
        run = paragraph.add_run()
        run.text = text
    else:
        run = paragraph.runs[0]
    style_run(run, name, size, color, bold=bold, spc=spc)
    paragraph.space_after = Pt(after)
    paragraph.space_before = Pt(0)
    paragraph.line_spacing = line_spacing


def paint_bg(slide) -> None:
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = BG


def add_rect(slide, l, t, w, h, fill: RGBColor | None, line: RGBColor | None = LINE, line_pt: float = 1.75, shape=MSO_SHAPE.RECTANGLE):
    s = slide.shapes.add_shape(shape, Inches(l), Inches(t), Inches(w), Inches(h))
    s.shadow.inherit = False
    if fill is None:
        s.fill.background()
    else:
        s.fill.solid()
        s.fill.fore_color.rgb = fill
    if line is None:
        s.line.fill.background()
    else:
        s.line.color.rgb = line
        s.line.width = Pt(line_pt)
    return s


def add_line(slide, l, t, w, color=LINE, thickness=1.75):
    return add_rect(slide, l, t, w, thickness / 72.0, color, line=None)


def add_textbox(slide, l, t, w, h, paras: list[dict], *, anchor="t"):
    box = slide.shapes.add_textbox(Inches(l), Inches(t), Inches(w), Inches(h))
    tf = box.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.02)
    tf.margin_right = Inches(0.02)
    tf.margin_top = Inches(0.02)
    tf.margin_bottom = Inches(0.02)
    body_pr = tf._txBody.find(qn("a:bodyPr"))
    if body_pr is not None:
        body_pr.set("anchor", anchor)
    for i, spec in enumerate(paras):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        set_para(
            p,
            spec["text"],
            spec.get("font", DM),
            spec.get("size", 16),
            spec.get("color", INK),
            bold=spec.get("bold", False),
            spc=spec.get("spc"),
            after=spec.get("after", 4),
            align=spec.get("align", PP_ALIGN.LEFT),
            line_spacing=spec.get("line", 1.15),
        )
    return box


def fill_shape_text(shape, paras: list[dict], *, margin=0.2, anchor="t") -> None:
    tf = shape.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(margin)
    tf.margin_right = Inches(margin)
    tf.margin_top = Inches(0.18)
    tf.margin_bottom = Inches(0.16)
    body_pr = tf._txBody.find(qn("a:bodyPr"))
    if body_pr is not None:
        body_pr.set("anchor", anchor)
    for i, spec in enumerate(paras):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        set_para(
            p,
            spec["text"],
            spec.get("font", DM),
            spec.get("size", 15),
            spec.get("color", INK),
            bold=spec.get("bold", False),
            spc=spec.get("spc"),
            after=spec.get("after", 6),
            align=spec.get("align", PP_ALIGN.LEFT),
            line_spacing=spec.get("line", 1.15),
        )


def add_dot(slide, l, t, color, size=0.16):
    return add_rect(slide, l, t, size, size, color, LINE, 1.5)


def add_guy(slide, l, t, w, h, color, rotation=0, pill=False):
    shape = MSO_SHAPE.ROUNDED_RECTANGLE if pill else MSO_SHAPE.RECTANGLE
    s = add_rect(slide, l, t, w, h, color, LINE, 1.75, shape=shape)
    s.rotation = rotation
    if pill:
        try:
            s.adjustments[0] = 0.5
        except (AttributeError, IndexError, ValueError):
            pass
    return s


def footer(slide, page: int, total: int = 10) -> None:
    add_textbox(
        slide,
        0.55,
        7.12,
        6.5,
        0.28,
        [{"text": "Get Under My Skin  ·  Checktrail", "font": DM, "size": 11, "color": MUTED, "bold": True, "after": 0}],
    )
    add_textbox(
        slide,
        11.4,
        7.12,
        1.4,
        0.28,
        [{"text": f"{page} / {total}", "font": DM, "size": 11, "color": MUTED, "bold": True, "after": 0, "align": PP_ALIGN.RIGHT}],
    )


def title_block(slide, badge: str, title: str, sub: str | None = None) -> None:
    add_textbox(
        slide,
        0.55,
        0.28,
        12.2,
        0.28,
        [{"text": badge.upper(), "font": DM, "size": 11, "color": MUTED, "bold": True, "spc": 180, "after": 0}],
    )
    add_textbox(
        slide,
        0.55,
        0.52,
        12.2,
        0.7,
        [{"text": title, "font": SYNE, "size": 28, "color": INK, "bold": True, "spc": -40, "after": 0}],
    )
    if sub:
        add_textbox(
            slide,
            0.55,
            1.18,
            12.2,
            0.7,
            [{"text": sub, "font": DM, "size": 16, "color": MUTED, "after": 0}],
        )


def card(slide, l, t, w, h, title: str, body: str, accent: RGBColor | None = None) -> None:
    s = add_rect(slide, l, t, w, h, PANEL, LINE, 1.75)
    paras = [
        {"text": title, "font": SYNE, "size": 18, "color": INK, "bold": True, "spc": -20, "after": 8},
        {"text": body, "font": DM, "size": 14, "color": MUTED, "after": 0},
    ]
    fill_shape_text(s, paras, margin=0.22)
    if accent is not None:
        add_dot(slide, l + w - 0.38, t + 0.22, accent, 0.16)


def mode_row(slide, t, eyebrow: str, name: str, desc: str, color: RGBColor, l=0.75, w=11.8) -> None:
    add_line(slide, l, t, w)
    add_textbox(
        slide,
        l,
        t + 0.12,
        w - 0.5,
        1.15,
        [
            {"text": eyebrow.upper(), "font": DM, "size": 11, "color": MUTED, "bold": True, "spc": 160, "after": 2},
            {"text": name, "font": SYNE, "size": 24, "color": INK, "bold": True, "spc": -30, "after": 4},
            {"text": desc, "font": DM, "size": 14, "color": MUTED, "after": 0},
        ],
    )
    add_dot(slide, l + w - 0.22, t + 0.28, color, 0.16)


def scatter_guys(slide, *, dense: bool = False) -> None:
    # Keep decorations in the outer margin so they do not cover editable cards.
    add_guy(slide, 12.65, 0.14, 0.5, 0.26, GREEN, -8, pill=True)
    add_guy(slide, 12.78, 3.15, 0.34, 0.34, BLUE, -14)
    add_guy(slide, 12.58, 6.8, 0.36, 0.36, GREEN, 20)
    add_guy(slide, 0.1, 6.88, 0.44, 0.26, TEAL, 6, pill=True)
    if dense:
        add_guy(slide, 0.1, 0.18, 0.24, 0.72, RED, 8)
        add_guy(slide, 0.08, 3.4, 0.42, 0.3, TEAL, -6, pill=True)


def new_slide(prs, *, dense: bool = False) -> object:
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_bg(slide)
    scatter_guys(slide, dense=dense)
    return slide


def build_slides(prs) -> None:
    s = new_slide(prs, dense=True)
    frame = add_rect(s, 0.7, 0.38, 11.95, 6.55, PANEL, LINE, 1.75)
    frame.fill.solid()
    frame.fill.fore_color.rgb = PANEL
    add_textbox(s, 1.0, 0.58, 11.2, 0.28, [{"text": "PARTY GAMES", "font": DM, "size": 12, "color": MUTED, "bold": True, "spc": 220, "after": 0}])
    add_textbox(s, 1.0, 0.82, 11.2, 1.55, [
        {"text": "Get Under", "font": SYNE, "size": 46, "color": INK, "bold": True, "spc": -70, "after": 0, "line": 0.9},
        {"text": "My Skin", "font": SYNE, "size": 46, "color": INK, "bold": True, "spc": -70, "after": 0, "line": 0.9},
    ])
    add_textbox(s, 1.0, 2.42, 11.2, 0.36, [{"text": "Party games that unfreeze a room.", "font": SYNE, "size": 18, "color": INK, "bold": True, "spc": -20, "after": 0}])
    add_textbox(
        s,
        1.0,
        2.78,
        10.5,
        0.4,
        [{"text": "Hosts choose the game first, then create a room. Friends who get your invite link join that room directly.", "font": DM, "size": 14, "color": MUTED, "after": 0}],
    )
    mode_row(s, 3.25, "Game mode 1", "Icebreaker", "Secret questions, spinning wheel, rapid-fire finale", RED, l=1.0, w=11.35)
    mode_row(s, 4.48, "Game mode 2", "Mirror Vote", "Dirty or Philosophical decks — anonymous “most likely” votes", BLUE, l=1.0, w=11.35)
    mode_row(s, 5.71, "Game mode 3", "Feud", "Classic or Funny survey decks — match the room’s majority", GREEN, l=1.0, w=11.35)
    footer(s, 1)

    # 2 problem
    s = new_slide(prs)
    title_block(
        s,
        "The awkward part",
        "Icebreakers usually freeze people.",
        "A circle of strangers. A host with a script. Names, jobs, “fun facts.” Everyone waits for it to be over.",
    )
    card(s, 0.55, 2.05, 3.9, 4.7, "Too much spotlight", "Being asked to introduce yourself is a performance. Shy people go quiet. Loud people fill the air.", RED)
    card(s, 4.7, 2.05, 3.9, 4.7, "Too much honesty, too soon", "People protect themselves. They give safe answers. The room learns nothing real.", BLUE)
    card(s, 8.85, 2.05, 3.9, 4.7, "No shared dare", "Without a game, there is no reason to ask the interesting question — or to answer it.", GREEN)
    footer(s, 2)

    # 3 idea
    s = new_slide(prs)
    title_block(
        s,
        "The idea",
        "Phones in, host out of the way.",
        "Get Under My Skin turns a pile of phones into a party. The host picks a mode, creates a room, and sends a link. From then on the rules — not the host — decide who speaks.",
    )
    card(s, 0.55, 2.15, 3.9, 4.55, "Low friction", "No accounts. A name, a room, a link. People are playing in under a minute.", TEAL)
    card(s, 4.7, 2.15, 3.9, 4.55, "Shared dare", "A wheel, a vote, a feud board. Structure that makes asking and answering feel like a game, not an interview.", RED)
    card(s, 8.85, 2.15, 3.9, 4.55, "Safety first", "Questions and votes can stay anonymous until the room is ready. Honesty without a name on it.", BLUE)
    footer(s, 3)

    # 4 night flow
    s = new_slide(prs)
    title_block(s, "How a night starts", "Pick a mode. Make a room. Let the game talk.")
    steps = [
        ("01", "Pick a game mode", "Icebreaker, Mirror Vote, or Feud. That choice sets the mood: loud and messy, quiet and revealing, or competitive and shared."),
        ("02", "Make a room", "One person creates. Everyone else taps the invite. Names appear in the lobby. The room is already a group."),
        ("03", "Play on every phone", "Same live room. Same round. No passing one device around the table. Nobody is left watching."),
        ("04", "Let the game talk", "The host is not the icebreaker. The questions, the wheel, the votes, and the board are."),
    ]
    for i, (num, title, body) in enumerate(steps):
        top = 1.95 + i * 1.2
        box = add_rect(s, 0.55, top, 12.2, 1.08, PANEL, LINE, 1.75)
        fill_shape_text(
            box,
            [
                {"text": f"{num}    {title}", "font": SYNE, "size": 18, "color": INK, "bold": True, "spc": -20, "after": 4},
                {"text": body, "font": DM, "size": 14, "color": MUTED, "after": 0},
            ],
            margin=0.28,
        )
    footer(s, 4)

    # 5 three modes
    s = new_slide(prs)
    title_block(s, "Three modes", "Two kinds of courage — plus a room that argues together.")
    card(
        s,
        0.55,
        2.05,
        3.9,
        4.7,
        "Icebreaker",
        "The room writes questions in secret. A wheel picks who must answer. Skip too many times and you’re out. The last two smash a giant buzzer in rapid fire. At the end, you find out who asked what.",
        RED,
    )
    card(
        s,
        4.7,
        2.05,
        3.9,
        4.7,
        "Mirror Vote",
        "Everyone gets the same “most likely” questions — Dirty or Philosophical decks, shuffled. Votes stay anonymous. Then the room sees how people built you.",
        BLUE,
    )
    card(
        s,
        8.85,
        2.05,
        3.9,
        4.7,
        "Feud",
        "Classic or Funny survey decks. Match the room’s majority. You learn the group’s taste the way a family feud board does — out loud, together, with a score.",
        GREEN,
    )
    footer(s, 5)

    # 6 Icebreaker social
    s = new_slide(prs)
    title_block(s, "Game mode 1  ·  Icebreaker", "It breaks the ice by hiding the asker.")
    card(s, 0.55, 2.05, 6.0, 2.25, "Secret questions", "People ask what they actually want to know — crush stuff, weird habits, the story behind the quiet person — because their name is not on the card yet.", RED)
    card(s, 6.75, 2.05, 6.0, 2.25, "The wheel is the host", "Nobody has to pick on a friend. Chance does it. That keeps the dare fair, and it keeps shy players from being hunted.", TEAL)
    card(s, 0.55, 4.5, 6.0, 2.25, "Skips have a cost", "Three skips and you’re out. You can dodge once. You cannot hide all night. The game gently forces people into the circle.", BLUE)
    card(s, 6.75, 4.5, 6.0, 2.25, "Rapid fire, then reveal", "The finale is loud and competitive. The author reveal comes last — after the room has already laughed. Identity is a punchline, not a threat.", GREEN)
    footer(s, 6)

    # 7 Mirror Vote social
    s = new_slide(prs)
    title_block(s, "Game mode 2  ·  Mirror Vote", "It breaks the ice by showing you to yourself.")
    card(s, 0.55, 2.05, 6.0, 2.25, "Anonymous “most likely”", "Classic party questions, without the raised hands. You can name someone without owning the vote in front of them.", BLUE)
    card(s, 6.75, 2.05, 6.0, 2.25, "Dirty or Philosophical", "Pick the temperature of the room. The same mechanic, two decks — so a dinner party and a game-jam table can both play.", RED)
    card(s, 0.55, 4.5, 6.0, 2.25, "Shuffled decks", "Everyone answers the same prompts in a different order. You cannot copy the person next to you. The portrait is yours.", TEAL)
    card(s, 6.75, 4.5, 6.0, 2.25, "A trait portrait", "You leave with a sketch of how the group built you. That is a conversation that continues after the phones go down.", GREEN)
    footer(s, 7)

    # 8 Feud social
    s = new_slide(prs)
    title_block(s, "Game mode 3  ·  Feud", "It breaks the ice by making the room one team.")
    card(s, 0.55, 2.05, 6.0, 2.25, "Match the majority", "You are not performing a fun fact. You are guessing what this specific table believes. That is a reason to look at each other.", GREEN)
    card(s, 6.75, 2.05, 6.0, 2.25, "Classic or Funny decks", "Safe survey energy or chaotic punchlines. The host sets how sharp the night is without writing a script.", TEAL)
    card(s, 0.55, 4.5, 6.0, 2.25, "A shared scoreboard", "Attention goes to the board, not to “please like me.” Mixed groups (new + old friends) stay in one conversation.", RED)
    card(s, 6.75, 4.5, 6.0, 2.25, "The room’s taste, out loud", "You learn the majority the way you learn a family’s inside jokes — by missing, then hitting, then arguing about it.", BLUE)
    footer(s, 8)

    # 9 social design
    s = new_slide(prs)
    title_block(s, "Why it works", "What actually makes strangers talk")
    rows = [
        ("Anonymity with a timer", "Honesty first. Names later. People risk a real question because the social cost is delayed."),
        ("A shared object", "A wheel, a vote, a feud board. Attention goes to the game, not to “please like me.”"),
        ("Equal phones", "Every player has the same controls. No one is stuck as the audience. Shy and loud stay in one conversation."),
        ("Permission to be uncool", "The editorial, geometric look is a poster, not a networking app. It tells the room: this is play."),
    ]
    for i, (title, body) in enumerate(rows):
        top = 1.95 + i * 1.2
        box = add_rect(s, 0.55, top, 12.2, 1.08, PANEL, LINE, 1.75)
        fill_shape_text(
            box,
            [
                {"text": title, "font": SYNE, "size": 18, "color": INK, "bold": True, "spc": -20, "after": 4},
                {"text": body, "font": DM, "size": 14, "color": MUTED, "after": 0},
            ],
            margin=0.28,
        )
    footer(s, 9)

    s = new_slide(prs, dense=True)
    frame = add_rect(s, 0.7, 0.55, 11.95, 6.2, PANEL, LINE, 1.75)
    add_textbox(s, 1.05, 0.85, 11.2, 0.28, [{"text": "PARTY GAMES", "font": DM, "size": 12, "color": MUTED, "bold": True, "spc": 220, "after": 0}])
    add_textbox(s, 1.05, 1.2, 11.2, 0.55, [{"text": "Don’t introduce yourselves.", "font": SYNE, "size": 28, "color": INK, "bold": True, "spc": -30, "after": 0}])
    add_textbox(s, 1.05, 1.8, 11.2, 1.0, [{"text": "Play.", "font": SYNE, "size": 64, "color": INK, "bold": True, "spc": -80, "after": 0}])
    add_textbox(
        s,
        1.05,
        3.1,
        11.0,
        0.7,
        [{"text": "Host picks a game. Friends join the room. The questions do the rest.", "font": DM, "size": 18, "color": MUTED, "after": 0}],
    )
    mode_row(s, 3.9, "Play now", "checktrail2.vercel.app", "One link. Whole table. Icebreaker · Mirror Vote · Feud", TEAL, l=1.05, w=11.25)
    add_textbox(s, 1.05, 5.55, 3.5, 0.7, [{"text": "Icebreaker", "font": SYNE, "size": 18, "color": INK, "bold": True, "after": 0}])
    add_dot(s, 1.05, 6.15, RED)
    add_textbox(s, 4.7, 5.55, 3.5, 0.7, [{"text": "Mirror Vote", "font": SYNE, "size": 18, "color": INK, "bold": True, "after": 0}])
    add_dot(s, 4.7, 6.15, BLUE)
    add_textbox(s, 8.35, 5.55, 3.5, 0.7, [{"text": "Feud", "font": SYNE, "size": 18, "color": INK, "bold": True, "after": 0}])
    add_dot(s, 8.35, 6.15, GREEN)
    footer(s, 10)


def embed_fonts(pptx_path: Path) -> None:
    """Embed TTF files as PresentationML font parts (raw fntdata, not obfuscated)."""
    fonts = [
        # typeface, slot (regular|bold), path
        ("Syne", "regular", FONT_DIR / "Syne-Bold.ttf"),
        ("Syne", "bold", FONT_DIR / "Syne-ExtraBold.ttf"),
        ("DM Sans", "regular", FONT_DIR / "DMSans-Regular.ttf"),
        ("DM Sans", "bold", FONT_DIR / "DMSans-Bold.ttf"),
    ]
    tmp = Path(tempfile.mkdtemp(prefix="pptx-embed-"))
    try:
        with zipfile.ZipFile(pptx_path, "r") as zin:
            zin.extractall(tmp)

        fonts_dir = tmp / "ppt" / "fonts"
        fonts_dir.mkdir(parents=True, exist_ok=True)

        rels_path = tmp / "ppt" / "_rels" / "presentation.xml.rels"
        rels = etree.parse(str(rels_path))
        rels_root = rels.getroot()
        rel_ns = "http://schemas.openxmlformats.org/package/2006/relationships"
        existing = {el.get("Id") for el in rels_root}
        rids = []
        for i, (typeface, slot, path) in enumerate(fonts, start=1):
            rid = f"rIdFont{i}"
            while rid in existing:
                i += 1
                rid = f"rIdFont{i}"
            existing.add(rid)
            dest = fonts_dir / f"font{i}.fntdata"
            dest.write_bytes(path.read_bytes())
            etree.SubElement(
                rels_root,
                f"{{{rel_ns}}}Relationship",
                Id=rid,
                Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/font",
                Target=f"fonts/font{i}.fntdata",
            )
            rids.append((typeface, slot, rid))
        rels.write(str(rels_path), xml_declaration=True, encoding="UTF-8", standalone=True)

        ct_path = tmp / "[Content_Types].xml"
        ct = etree.parse(str(ct_path))
        ct_root = ct.getroot()
        if not any(el.get("Extension") == "fntdata" for el in ct_root):
            etree.SubElement(
                ct_root,
                "{http://schemas.openxmlformats.org/package/2006/content-types}Default",
                Extension="fntdata",
                ContentType="application/x-fontdata",
            )
        ct.write(str(ct_path), xml_declaration=True, encoding="UTF-8", standalone=True)

        pres_path = tmp / "ppt" / "presentation.xml"
        pres = etree.parse(str(pres_path))
        pres_root = pres.getroot()
        pres_root.set("embedTrueTypeFonts", "1")
        pres_root.set("saveSubsetFonts", "0")
        lst = pres_root.find("p:embeddedFontLst", NSMAP)
        if lst is None:
            lst = etree.Element(qn("p:embeddedFontLst"))
            default_style = pres_root.find("p:defaultTextStyle", NSMAP)
            if default_style is not None:
                default_style.addprevious(lst)
            else:
                pres_root.append(lst)
        lst[:] = []
        grouped: dict[str, dict[str, str]] = {}
        for typeface, slot, rid in rids:
            grouped.setdefault(typeface, {})[slot] = rid
        for typeface, slots in grouped.items():
            entry = etree.SubElement(lst, qn("p:embeddedFont"))
            etree.SubElement(
                entry,
                qn("p:font"),
                typeface=typeface,
                panose="00000000000000000000",
                pitchFamily="34",
                charset="0",
            )
            for slot in ("regular", "bold", "italic", "boldItalic"):
                if slot not in slots:
                    continue
                tag = {"regular": "p:regular", "bold": "p:bold", "italic": "p:italic", "boldItalic": "p:boldItalic"}[slot]
                el = etree.SubElement(entry, qn(tag))
                el.set(f"{{{R_NS}}}id", slots[slot])
        pres.write(str(pres_path), xml_declaration=True, encoding="UTF-8", standalone=True)

        theme_path = tmp / "ppt" / "theme" / "theme1.xml"
        if theme_path.exists():
            theme = etree.parse(str(theme_path))
            for major, face in (("a:majorFont", SYNE), ("a:minorFont", DM)):
                node = theme.find(f".//{major}/a:latin", NSMAP)
                if node is not None:
                    node.set("typeface", face)
            theme.write(str(theme_path), xml_declaration=True, encoding="UTF-8", standalone=True)

        with zipfile.ZipFile(pptx_path, "w", compression=zipfile.ZIP_DEFLATED) as zout:
            for file in tmp.rglob("*"):
                if file.is_file():
                    zout.write(file, file.relative_to(tmp).as_posix())
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def assert_editable(prs: Presentation) -> None:
    pictures = []
    texts = []
    for i, slide in enumerate(prs.slides, start=1):
        for shape in slide.shapes:
            if shape.shape_type == MSO_SHAPE_TYPE.PICTURE:
                pictures.append((i, shape.name))
            if shape.has_text_frame:
                blob = " ".join(p.text for p in shape.text_frame.paragraphs).strip()
                if blob:
                    texts.append(blob)
    if pictures:
        raise SystemExit(f"Refusing to ship picture-baked slides: {pictures}")
    joined = "\n".join(texts)
    for needle in ("Get Under My Skin", "Icebreaker", "Mirror Vote", "Feud", "checktrail2.vercel.app"):
        if needle not in joined:
            raise SystemExit(f"Missing expected editable text: {needle}")


def build() -> Path:
    prs = Presentation()
    prs.slide_width = Inches(13.333333)
    prs.slide_height = Inches(7.5)
    build_slides(prs)
    assert_editable(prs)
    PPTX_PATH.parent.mkdir(parents=True, exist_ok=True)
    prs.save(str(PPTX_PATH))
    embed_fonts(PPTX_PATH)
    return PPTX_PATH


if __name__ == "__main__":
    out = build()
    print(out)
    print("editable native shapes + embedded Syne / DM Sans")
