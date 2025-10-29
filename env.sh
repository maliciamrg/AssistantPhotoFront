#!/usr/bin/env sh
# ================================================================================
# File: env.sh
# Description: Replaces environment variables in asset files.
# Usage: Run this script in your terminal or Docker entrypoint.
#          Example:
#             APP_PREFIX="VITE_" ASSET_DIR="/usr/share/nginx/html" ./env.sh
# ================================================================================

# Exit immediately if any command fails
set -e

# ------------------------------------------------------------------------------
# 1️⃣ Validate required environment variables
# ------------------------------------------------------------------------------

# APP_PREFIX should be something like "APP_" or "VITE_"
: "${APP_PREFIX:?APP_PREFIX must be set (e.g. APP_PREFIX='APP_')}"

# ASSET_DIR should point to a directory (e.g. /usr/share/nginx/html)
: "${ASSET_DIR:?ASSET_DIR must be set (e.g. ASSET_DIR='/usr/share/nginx/html')}"

# ------------------------------------------------------------------------------
# 2️⃣ Check directory existence
# ------------------------------------------------------------------------------
if [ ! -d "$ASSET_DIR" ]; then
    echo "⚠️  Warning: directory '$ASSET_DIR' not found, skipping."
    exit 0
fi

echo "🔍 Scanning directory: $ASSET_DIR"

# ------------------------------------------------------------------------------
# 3️⃣ Replace variables in all files under ASSET_DIR
# ------------------------------------------------------------------------------
# On Alpine (BusyBox sed), the -i option does NOT take an argument.
# This syntax works for both GNU sed and BusyBox sed.

env | grep "^${APP_PREFIX}" | while IFS='=' read -r key value; do
    echo "  • Replacing ${key} → ${value}"
    find "$ASSET_DIR" -type f -exec sh -c '
        key="$1"
        value="$2"
        file="$3"
        sed -i "s|${key}|${value}|g" "$file"
    ' sh "$key" "$value" {} \;
done

echo "✅ Environment variable substitution complete."

# Then start the main command
exec "$@"
