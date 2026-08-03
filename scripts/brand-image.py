#!/usr/bin/env python3
"""Composite the DST mark onto a source image.

Used to brand generated/licensed imagery before it ships to a site. The mark
is drawn with its own rounded-square alpha (the source art has that shape
baked onto black rather than carrying transparency) and a soft shadow, so it
sits cleanly on a busy photograph.

  ./scripts/brand-image.py in.png out.jpg --at 1317,597 --size 72
  ./scripts/brand-image.py in.png out.jpg --corner bottom-right

--at places the centre of the mark at an exact point; --corner insets it from
the named corner instead. Exactly one of the two is required.
"""
import argparse
import pathlib
import sys

from PIL import Image, ImageDraw, ImageFilter

REPO = pathlib.Path(__file__).resolve().parent.parent
DEFAULT_MARK = REPO / "apps" / "dst" / "public" / "logo-mini.png"


def rounded_mask(size: int, radius: int) -> Image.Image:
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=255)
    return mask


def build_mark(path: pathlib.Path, size: int) -> Image.Image:
    mark = Image.open(path).convert("RGB").resize((size, size), Image.LANCZOS)
    mark.putalpha(rounded_mask(size, max(2, round(size * 0.18))))
    return mark


def paste_with_shadow(base: Image.Image, mark: Image.Image, centre: tuple[int, int]) -> None:
    size = mark.width
    blur = max(2, size // 8)
    pad = blur * 3

    shadow = Image.new("RGBA", (size + pad * 2, size + pad * 2), (0, 0, 0, 0))
    shadow.paste((0, 0, 0, 150), (pad, pad), mark.split()[3])
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))

    cx, cy = centre
    base.alpha_composite(shadow, (cx - size // 2 - pad, cy - size // 2 - pad + max(1, size // 24)))
    base.alpha_composite(mark, (cx - size // 2, cy - size // 2))


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("source")
    ap.add_argument("output")
    ap.add_argument("--mark", default=str(DEFAULT_MARK))
    ap.add_argument("--size", type=int, default=72)
    ap.add_argument("--at", help="centre of the mark as x,y")
    ap.add_argument("--corner", choices=["top-left", "top-right", "bottom-left", "bottom-right"])
    ap.add_argument("--inset", type=int, default=28, help="margin from the edge when using --corner")
    ap.add_argument("--quality", type=int, default=86)
    ap.add_argument("--max-width", type=int, default=0, help="downscale so width is at most this")
    args = ap.parse_args()

    if bool(args.at) == bool(args.corner):
        ap.error("pass exactly one of --at or --corner")

    base = Image.open(args.source).convert("RGBA")

    if args.at:
        cx, cy = (int(v) for v in args.at.split(","))
    else:
        half = args.size // 2
        cx = args.inset + half if "left" in args.corner else base.width - args.inset - half
        cy = args.inset + half if "top" in args.corner else base.height - args.inset - half

    paste_with_shadow(base, build_mark(pathlib.Path(args.mark), args.size), (cx, cy))

    if args.max_width and base.width > args.max_width:
        h = round(base.height * args.max_width / base.width)
        base = base.resize((args.max_width, h), Image.LANCZOS)

    out = pathlib.Path(args.output)
    out.parent.mkdir(parents=True, exist_ok=True)
    if out.suffix.lower() in (".jpg", ".jpeg"):
        base.convert("RGB").save(out, quality=args.quality, optimize=True, progressive=True)
    else:
        base.save(out)

    kb = out.stat().st_size / 1024
    print(f"{out}  {base.width}x{base.height}  {kb:.0f} KB  mark {args.size}px @ {cx},{cy}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
