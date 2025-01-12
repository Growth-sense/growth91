#!/bin/bash

# Define the list of directory and file patterns to ignore
IGNORE_PATTERNS=(
  "node_modules"
  "dist"
  "build"
  "*.log"
  "*.tmp"
  "coverage"
  "*.env"
  ".DS_Store"
  "*.lock"
  "tmp"
  "*.bak"
  "*.swp"
)

# Set the path for the .gitignore file in the root of your repository
GITIGNORE_FILE="$(git rev-parse --show-toplevel)/.gitignore"

# Check if the .gitignore file already exists
if [ -f "$GITIGNORE_FILE" ]; then
  echo "Updating existing .gitignore file at $GITIGNORE_FILE..."
else
  echo "Creating new .gitignore file at $GITIGNORE_FILE..."
fi

# Traverse the directory structure and find matches
find_matches() {
  for pattern in "${IGNORE_PATTERNS[@]}"; do
    # Find directories or files matching the pattern
    matches=$(find . -type d -name "$pattern" -o -type f -name "$pattern")
    for match in $matches; do
      # Add the match to the .gitignore file if not already present
      if ! grep -Fxq "$match" "$GITIGNORE_FILE" 2>/dev/null; then
        echo "$match" >> "$GITIGNORE_FILE"
        echo "Added $match to .gitignore"
      else
        echo "$match already exists in .gitignore"
      fi
    done
  done
}

# Run the find_matches function
find_matches

# Remove duplicates (if any) and sort the .gitignore file
sort -u "$GITIGNORE_FILE" -o "$GITIGNORE_FILE"

echo "Updated .gitignore successfully:"
cat "$GITIGNORE_FILE"
