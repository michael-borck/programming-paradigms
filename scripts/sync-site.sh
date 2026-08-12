#!/bin/sh
# Copy the paradigm calculators into docs/paradigms/ for the website.
# Run this after editing any calculator.py so the GitHub Pages site
# runs the same code as the repo. (GitHub Pages serves only docs/.)
set -e
cd "$(dirname "$0")/.."
cp imperative/calculator.py      docs/paradigms/imperative.py
cp functional/calculator.py      docs/paradigms/functional.py
cp object-oriented/calculator.py docs/paradigms/object_oriented.py
echo "Site sources synced."
