"""Prepare the current portfolio export for GitHub Pages project hosting."""

from pathlib import Path
import shutil
import re


SOURCE = Path("published-portfolio/dist")
DEST = Path("_site")
PREFIX = "/Portfolio"


SRCSET_ATTRIBUTE = re.compile(r"(?P<prefix>\bsrcset\s*=\s*['\"])(?P<value>[^'\"]*)(?P<suffix>['\"])", re.IGNORECASE)


def rewrite_srcset(match: re.Match[str]) -> str:
    """Prefix each root-relative responsive image candidate for project hosting."""
    candidates = []
    for candidate in match.group("value").split(","):
        parts = candidate.strip().split(None, 1)
        if parts and parts[0].startswith("/") and not parts[0].startswith("//"):
            parts[0] = f"{PREFIX}{parts[0]}"
        candidates.append(" ".join(parts))
    value = ", ".join(candidates)
    return f'{match.group("prefix")}{value}{match.group("suffix")}'


def main() -> None:
    if not SOURCE.is_dir():
        raise SystemExit(f"Missing portfolio export: {SOURCE}")

    if DEST.exists():
        shutil.rmtree(DEST)
    shutil.copytree(SOURCE, DEST)

    replacements = (
        ('href="/', f'href="{PREFIX}/'),
        ("href='/", f"href='{PREFIX}/"),
        ('src="/', f'src="{PREFIX}/'),
        ("src='/", f"src='{PREFIX}/"),
        ('action="/', f'action="{PREFIX}/'),
        ("action='/", f"action='{PREFIX}/"),
        ('content="0;url=/', f'content="0;url={PREFIX}/'),
        ("content='0;url=/", f"content='0;url={PREFIX}/"),
        ('url(/', f'url({PREFIX}/'),
        ('url("/', f'url("{PREFIX}/'),
        ("url('/", f"url('{PREFIX}/"),
    )
    text_extensions = {".html", ".css", ".js", ".json", ".xml", ".txt"}
    for path in DEST.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in text_extensions:
            continue
        text = path.read_text(encoding="utf-8")
        for old, new in replacements:
            text = text.replace(old, new)
        text = SRCSET_ATTRIBUTE.sub(rewrite_srcset, text)
        for attribute in ("href", "src", "action"):
            text = text.replace(f'{attribute}="{PREFIX}//', f'{attribute}="//')
            text = text.replace(f"{attribute}='{PREFIX}//", f"{attribute}='//")
        text = text.replace(f'url("{PREFIX}//', 'url("//')
        text = text.replace(f"url('{PREFIX}//", "url('//")
        path.write_text(text, encoding="utf-8", newline="\n")

    (DEST / ".nojekyll").touch()
    print(f"Prepared {DEST} from {SOURCE}")


if __name__ == "__main__":
    main()
