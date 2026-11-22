"""Prepare the current portfolio export for GitHub Pages project hosting."""

from pathlib import Path
import shutil


SOURCE = Path("published-portfolio/dist")
DEST = Path("_site")
PREFIX = "/Portfolio"


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
