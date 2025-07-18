#!/usr/bin/env bash

set -e

TYPE=$1
NAME=$2

if [[ -z "$TYPE" || -z "$NAME" ]]; then
  echo "Usage: $0 [app|package] <name>"
  exit 1
fi

if [[ "$TYPE" == "app" ]]; then
  DIR="apps/$NAME"
  mkdir -p "$DIR/src"
  cat <<EOF > "$DIR/package.json"
{
  "name": "$NAME",
  "version": "0.1.0",
  "scripts": {
    "dev": "echo Starting $NAME dev server...",
    "build": "echo Building $NAME..."
  }
}
EOF
  touch "$DIR/README.md" "$DIR/.env.example"
  echo "📦 App scaffolded at $DIR"

elif [[ "$TYPE" == "package" ]]; then
  DIR="packages/$NAME"
  mkdir -p "$DIR/src"
  cat <<EOF > "$DIR/package.json"
{
  "name": "@yourorg/$NAME",
  "version": "0.1.0",
  "main": "src/index.ts",
  "types": "src/index.ts"
}
EOF
  echo "// $NAME entry point" > "$DIR/src/index.ts"
  touch "$DIR/README.md"
  echo "📦 Package scaffolded at $DIR"

else
  echo "❌ Unknown type: $TYPE. Use 'app' or 'package'."
  exit 1
fi
