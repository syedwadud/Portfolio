import json
import sys

from pypdf import PdfReader


for path in sys.argv[1:]:
    reader = PdfReader(path)
    links = []
    for page_number, page in enumerate(reader.pages, start=1):
        for annotation_ref in page.get("/Annots", []):
            annotation = annotation_ref.get_object()
            action = annotation.get("/A")
            uri = action.get("/URI") if action else None
            if uri:
                links.append({"page": page_number, "url": str(uri)})
    print(json.dumps({"path": path, "links": links}, ensure_ascii=False, indent=2))
