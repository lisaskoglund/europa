#!/bin/bash
# Setup script for Europa project with multiple subjects

BASE_DIR="/Users/lisa.noren/develop/europa"

echo "Creating directory structure for Europa project..."

# Create subject directories
mkdir -p "$BASE_DIR/SO/huvudstader"
mkdir -p "$BASE_DIR/SO/instudering"
mkdir -p "$BASE_DIR/SO/js"
mkdir -p "$BASE_DIR/SO/css"

mkdir -p "$BASE_DIR/NO/huvudstader"
mkdir -p "$BASE_DIR/NO/instudering"
mkdir -p "$BASE_DIR/NO/js"
mkdir -p "$BASE_DIR/NO/css"

mkdir -p "$BASE_DIR/Engelska/huvudstader"
mkdir -p "$BASE_DIR/Engelska/instudering"
mkdir -p "$BASE_DIR/Engelska/js"
mkdir -p "$BASE_DIR/Engelska/css"

mkdir -p "$BASE_DIR/Franska/huvudstader"
mkdir -p "$BASE_DIR/Franska/instudering"
mkdir -p "$BASE_DIR/Franska/js"
mkdir -p "$BASE_DIR/Franska/css"

# Create shared directories
mkdir -p "$BASE_DIR/shared/js"
mkdir -p "$BASE_DIR/shared/css"

echo "✅ Directory structure created!"
echo ""
echo "Structure created:"
echo "europa/"
echo "├── SO/"
echo "│   ├── huvudstader/"
echo "│   ├── instudering/"
echo "│   ├── js/"
echo "│   └── css/"
echo "├── NO/"
echo "│   ├── huvudstader/"
echo "│   ├── instudering/"
echo "│   ├── js/"
echo "│   └── css/"
echo "├── Engelska/"
echo "│   ├── huvudstader/"
echo "│   ├── instudering/"
echo "│   ├── js/"
echo "│   └── css/"
echo "├── Franska/"
echo "│   ├── huvudstader/"
echo "│   ├── instudering/"
echo "│   ├── js/"
echo "│   └── css/"
echo "├── shared/"
echo "│   ├── js/      (shared utilities)"
echo "│   └── css/     (shared styles)"
echo "├── index.html   (main landing page)"
echo "└── css/, js/, images/ (root resources)"
echo ""
echo "Next steps:"
echo "1. Copy shared.js to shared/js/"
echo "2. Copy common CSS files to shared/css/"
echo "3. Copy subject-specific files to respective subject folders"
echo "4. Update HTML file paths to reference correct locations"

