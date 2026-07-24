import hashlib
import json
import sys

import pdfplumber


for path in sys.argv[1:]:
    with open(path, "rb") as source:
        digest = hashlib.sha256(source.read()).hexdigest()
    with pdfplumber.open(path) as pdf:
        text = "\n\n".join((page.extract_text() or "") for page in pdf.pages)
        print(
            json.dumps(
                {
                    "path": path,
                    "pages": len(pdf.pages),
                    "sha256": digest,
                    "text": text,
                },
                ensure_ascii=False,
            )
        )
