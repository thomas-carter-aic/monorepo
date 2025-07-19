import os
import markdown
from bs4 import BeautifulSoup
import json
import yaml

input_dir = "./docs"  # Adjust path to where your .md files are
output_json = {}
output_yaml = {}

def markdown_to_json(md_content):
    html = markdown.markdown(md_content)
    soup = BeautifulSoup(html, "html.parser")

    def process_element(elem):
        if elem.name in ["h1", "h2", "h3", "h4", "h5", "h6"]:
            return {"type": "heading", "level": int(elem.name[1]), "text": elem.text}
        elif elem.name == "p":
            return {"type": "paragraph", "text": elem.text}
        elif elem.name == "ul":
            return {"type": "list", "items": [li.text for li in elem.find_all("li")]}
        elif elem.name == "pre":
            return {"type": "code", "code": elem.text}
        elif elem.name == "table":
            headers = [th.text for th in elem.find_all("th")]
            rows = [[td.text for td in row.find_all("td")] for row in elem.find_all("tr")[1:]]
            return {"type": "table", "headers": headers, "rows": rows}
        return {"type": "raw", "content": elem.text}

    return [process_element(child) for child in soup.children if child.name]

for filename in os.listdir(input_dir):
    if filename.endswith(".md"):
        path = os.path.join(input_dir, filename)
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
            data = markdown_to_json(content)
            base_name = os.path.splitext(filename)[0]
            output_json[base_name] = data
            output_yaml[base_name] = data

# Write outputs
with open("docs_as_json.json", "w") as jf:
    json.dump(output_json, jf, indent=2)

with open("docs_as_yaml.yaml", "w") as yf:
    yaml.dump(output_yaml, yf, sort_keys=False)
