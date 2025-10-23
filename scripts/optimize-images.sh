#!/bin/bash

################################################################################
# Image Optimization Script
#
# This script optimizes images for web by:
# - Converting to modern formats (WebP, AVIF)
# - Generating responsive image sizes
# - Compressing images without quality loss
#
# Prerequisites:
# - ImageMagick (for image processing)
# - cwebp (for WebP conversion)
# - avifenc (for AVIF conversion)
#
# Installation (Ubuntu/Debian):
#   sudo apt-get install imagemagick webp
#   sudo apt-get install libavif-bin  # For AVIF support
#
# Installation (macOS):
#   brew install imagemagick webp libavif
#
# Usage:
#   ./scripts/optimize-images.sh [input_dir] [output_dir]
#
# Example:
#   ./scripts/optimize-images.sh ./public/assets ./public/assets-optimized
################################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default directories
INPUT_DIR="${1:-./public/assets}"
OUTPUT_DIR="${2:-./public/assets}"

# Image quality settings
JPEG_QUALITY=85
WEBP_QUALITY=80
AVIF_QUALITY=75

# Responsive image breakpoints (in pixels)
BREAKPOINTS=(320 640 768 1024 1280 1536)

echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Image Optimization Script${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "Input directory:  ${INPUT_DIR}"
echo -e "Output directory: ${OUTPUT_DIR}"
echo ""

# Check if required tools are installed
check_dependencies() {
    local missing_deps=()

    if ! command -v convert &> /dev/null; then
        missing_deps+=("imagemagick")
    fi

    if ! command -v cwebp &> /dev/null; then
        missing_deps+=("webp (cwebp)")
    fi

    if ! command -v avifenc &> /dev/null; then
        missing_deps+=("libavif (avifenc)")
        echo -e "${YELLOW}Warning: avifenc not found. AVIF conversion will be skipped.${NC}"
    fi

    if [ ${#missing_deps[@]} -gt 0 ]; then
        echo -e "${RED}Error: Missing dependencies: ${missing_deps[*]}${NC}"
        echo ""
        echo "Please install the required tools:"
        echo "  Ubuntu/Debian: sudo apt-get install imagemagick webp libavif-bin"
        echo "  macOS: brew install imagemagick webp libavif"
        echo ""
        return 1
    fi

    return 0
}

# Optimize a single image
optimize_image() {
    local input_file="$1"
    local output_dir="$2"
    local filename=$(basename "$input_file")
    local extension="${filename##*.}"
    local basename="${filename%.*}"
    local relative_dir=$(dirname "${input_file#$INPUT_DIR/}")

    # Create output directory structure
    local target_dir="${output_dir}/${relative_dir}"
    mkdir -p "$target_dir"

    echo -e "${GREEN}Processing:${NC} $filename"

    # Skip if not an image file
    if [[ ! "$extension" =~ ^(jpg|jpeg|png|JPG|JPEG|PNG)$ ]]; then
        echo -e "${YELLOW}  Skipping (not a raster image)${NC}"
        return
    fi

    # Get original image dimensions
    local dimensions=$(identify -format "%wx%h" "$input_file" 2>/dev/null || echo "")
    
    if [ -z "$dimensions" ]; then
        echo -e "${RED}  Error reading image dimensions${NC}"
        return
    fi

    local width=$(echo $dimensions | cut -d'x' -f1)
    local height=$(echo $dimensions | cut -d'x' -f2)

    echo -e "  Original: ${width}x${height}"

    # Generate responsive sizes
    for breakpoint in "${BREAKPOINTS[@]}"; do
        if [ "$width" -gt "$breakpoint" ]; then
            local output_base="${target_dir}/${basename}-${breakpoint}"

            # Generate JPEG/PNG at breakpoint
            convert "$input_file" \
                -resize "${breakpoint}x" \
                -quality "$JPEG_QUALITY" \
                -strip \
                "${output_base}.${extension}" 2>/dev/null

            # Generate WebP
            if command -v cwebp &> /dev/null; then
                cwebp -q "$WEBP_QUALITY" \
                    "${output_base}.${extension}" \
                    -o "${output_base}.webp" &>/dev/null
            fi

            # Generate AVIF (if available)
            if command -v avifenc &> /dev/null; then
                avifenc -s 4 -j 8 -q "$AVIF_QUALITY" \
                    "${output_base}.${extension}" \
                    "${output_base}.avif" &>/dev/null || true
            fi

            echo -e "  ${BLUE}✓${NC} Generated ${breakpoint}w variants"
        fi
    done

    # Optimize original size
    local output_original="${target_dir}/${basename}"

    # Optimize original JPEG/PNG
    convert "$input_file" \
        -quality "$JPEG_QUALITY" \
        -strip \
        "${output_original}.${extension}" 2>/dev/null

    # Generate WebP from original
    if command -v cwebp &> /dev/null; then
        cwebp -q "$WEBP_QUALITY" \
            "${output_original}.${extension}" \
            -o "${output_original}.webp" &>/dev/null
    fi

    # Generate AVIF from original (if available)
    if command -v avifenc &> /dev/null; then
        avifenc -s 4 -j 8 -q "$AVIF_QUALITY" \
            "${output_original}.${extension}" \
            "${output_original}.avif" &>/dev/null || true
    fi

    echo -e "  ${GREEN}✓${NC} Optimization complete"
    echo ""
}

# Main execution
main() {
    # Check dependencies
    if ! check_dependencies; then
        exit 1
    fi

    # Check if input directory exists
    if [ ! -d "$INPUT_DIR" ]; then
        echo -e "${RED}Error: Input directory does not exist: $INPUT_DIR${NC}"
        exit 1
    fi

    # Create output directory if it doesn't exist
    mkdir -p "$OUTPUT_DIR"

    echo -e "${BLUE}Starting image optimization...${NC}"
    echo ""

    # Process all images
    local count=0
    while IFS= read -r -d '' file; do
        optimize_image "$file" "$OUTPUT_DIR"
        ((count++))
    done < <(find "$INPUT_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0)

    echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}✓ Optimization complete!${NC}"
    echo -e "Processed ${count} image(s)"
    echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
}

# Run main function
main
