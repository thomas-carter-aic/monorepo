
import os
import argparse
import json
import yaml
from pathlib import Path

def parse_markdown(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    structured = {
        "filename": file_path.name,
        "path": str(file_path),
        "title": None,
        "headings": [],
        "content": []
    }

    for line in lines:
        if line.startswith("# "):
            structured["title"] = line.strip("# ").strip()
        elif line.startswith("#"):
            structured["headings"].append(line.strip())
        else:
            structured["content"].append(line.strip())

    return structured

def write_output(data, output_path, fmt):
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        if fmt == "json":
            json.dump(data, f, indent=2)
        elif fmt == "yaml":
            yaml.dump(data, f, sort_keys=False)

def convert_markdown_docs(input_dir, output_dir, fmt="json"):
    input_path = Path(input_dir)
    output_path = Path(output_dir)
    all_docs = []

    for md_file in input_path.rglob("*.md"):
        parsed = parse_markdown(md_file)
        all_docs.append(parsed)
        output_file = output_path / md_file.relative_to(input_path)
        output_file = output_file.with_suffix(f".{fmt}")
        write_output(parsed, output_file, fmt)

    # Optional: write a combined file
    combined_file = output_path / f"combined.{fmt}"
    write_output(all_docs, combined_file, fmt)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert nested markdown files to structured JSON or YAML.")
    parser.add_argument("--input", required=True, help="Root input directory containing markdown files")
    parser.add_argument("--output", required=True, help="Output directory for structured files")
    parser.add_argument("--format", choices=["json", "yaml"], default="json", help="Output format")
    args = parser.parse_args()

    convert_markdown_docs(args.input, args.output, args.format)
