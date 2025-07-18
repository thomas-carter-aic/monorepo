#!/usr/bin/env bash

set -e

APPS_DIR="apps"
ENV_FILE=".env.example"

echo "🔍 Scanning for apps in $APPS_DIR..."

for app in "$APPS_DIR"/*; do
  if [[ -d "$app" ]]; then
    env_path="$app/$ENV_FILE"
    if [[ -f "$env_path" ]]; then
      echo "✅ $ENV_FILE already exists in $app"
    else
      cat <<EOF > "$env_path"
# .env.example for $(basename "$app")

# Example:
# API_URL=http://localhost:3000
# DATABASE_URL=postgres://user:pass@localhost:5432/db

EOF
      echo "📄 Created $ENV_FILE in $app"
    fi
  fi
done

echo "🎉 Done generating env templates."
