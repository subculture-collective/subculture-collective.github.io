#!/usr/bin/env node
/**
 * Asset Optimization Script
 *
 * This script optimizes images, fonts, and other assets for production.
 * It processes files in the public/assets directory and generates optimized versions.
 *
 * Features:
 * - Image format conversion (WebP, AVIF)
 * - Responsive image generation
 * - Image compression
 * - SVG optimization
 * - Caching for faster rebuilds
 *
 * Usage:
 *   npm run optimize-assets
 *   node scripts/optimize-assets.ts [input-dir] [output-dir]
 */

import { readdir, stat, mkdir } from 'fs/promises'
import { join, extname, basename, dirname, relative } from 'path'
import sharp from 'sharp'
import { existsSync } from 'fs'

// Configuration
interface OptimizationConfig {
  inputDir: string
  outputDir: string
  breakpoints: number[]
  formats: Array<'webp' | 'avif' | 'original'>
  quality: {
    jpeg: number
    webp: number
    avif: number
    png: number
  }
  skipExisting: boolean
  verbose: boolean
}

const DEFAULT_CONFIG: OptimizationConfig = {
  inputDir: './public/assets',
  outputDir: './public/assets',
  breakpoints: [320, 640, 768, 1024, 1280, 1536],
  formats: ['webp', 'avif', 'original'],
  quality: {
    jpeg: 85,
    webp: 80,
    avif: 75,
    png: 85,
  },
  skipExisting: true,
  verbose: true,
}

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
}

function log(message: string, color: keyof typeof colors = 'reset'): void {
  // eslint-disable-next-line no-console
  console.log(`${colors[color]}${message}${colors.reset}`)
}

/**
 * Check if a file is an image
 */
function isImageFile(filename: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']
  return imageExtensions.includes(extname(filename).toLowerCase())
}

/**
 * Check if a file is an SVG
 */
function isSVGFile(filename: string): boolean {
  return extname(filename).toLowerCase() === '.svg'
}

/**
 * Get all files in a directory recursively
 */
async function getAllFiles(
  dir: string,
  fileList: string[] = []
): Promise<string[]> {
  const files = await readdir(dir)

  for (const file of files) {
    const filePath = join(dir, file)
    const fileStat = await stat(filePath)

    if (fileStat.isDirectory()) {
      await getAllFiles(filePath, fileList)
    } else {
      fileList.push(filePath)
    }
  }

  return fileList
}

/**
 * Generate image variant for a specific format
 */
function generateImageVariant(
  image: sharp.Sharp,
  format: 'webp' | 'avif' | 'original',
  targetDir: string,
  nameWithoutExt: string,
  size: number | null,
  ext: string,
  config: OptimizationConfig
): { image: sharp.Sharp; outputPath: string } {
  let outputPath: string
  let outputImage = image

  const sizeStr = size ? `-${size}` : ''

  if (format === 'webp') {
    outputPath = join(targetDir, `${nameWithoutExt}${sizeStr}.webp`)
    outputImage = outputImage.webp({
      quality: config.quality.webp,
    })
  } else if (format === 'avif') {
    outputPath = join(targetDir, `${nameWithoutExt}${sizeStr}.avif`)
    outputImage = outputImage.avif({
      quality: config.quality.avif,
    })
  } else {
    // Original format
    outputPath = join(targetDir, `${nameWithoutExt}${sizeStr}${ext}`)
    if (ext === '.jpg' || ext === '.jpeg') {
      outputImage = outputImage.jpeg({
        quality: config.quality.jpeg,
        progressive: true,
      })
    } else if (ext === '.png') {
      outputImage = outputImage.png({
        quality: config.quality.png,
        compressionLevel: 9,
      })
    }
  }

  return { image: outputImage, outputPath }
}

/**
 * Optimize a single image
 */
async function optimizeImage(
  inputPath: string,
  outputDir: string,
  config: OptimizationConfig
): Promise<void> {
  const filename = basename(inputPath)
  const ext = extname(inputPath).toLowerCase()
  const nameWithoutExt = basename(inputPath, ext)
  const relativePath = relative(config.inputDir, dirname(inputPath))
  const targetDir = join(outputDir, relativePath)

  // Skip SVG files - they're handled by Vite plugin
  if (isSVGFile(inputPath)) {
    if (config.verbose) {
      log(`  Skipping SVG: ${filename} (handled by Vite plugin)`, 'yellow')
    }
    return
  }

  // Ensure output directory exists
  await mkdir(targetDir, { recursive: true })

  try {
    // Get image metadata
    const image = sharp(inputPath)
    const metadata = await image.metadata()

    if (!metadata.width || !metadata.height) {
      log(`  ⚠ Warning: Could not read dimensions for ${filename}`, 'yellow')
      return
    }

    if (config.verbose) {
      log(
        `  Processing: ${filename} (${metadata.width}x${metadata.height})`,
        'cyan'
      )
    }

    let processedCount = 0

    // Process each breakpoint
    for (const breakpoint of config.breakpoints) {
      // Skip if image is smaller than breakpoint
      if (metadata.width <= breakpoint) {
        continue
      }

      const resizedImage = sharp(inputPath).resize(breakpoint, undefined, {
        fit: 'inside',
        withoutEnlargement: true,
      })

      // Generate each format
      for (const format of config.formats) {
        const variants = generateImageVariant(
          resizedImage.clone(),
          format,
          targetDir,
          nameWithoutExt,
          breakpoint,
          ext,
          config
        )

        if (config.skipExisting && existsSync(variants.outputPath)) {
          continue
        }

        await variants.image.toFile(variants.outputPath)
        processedCount++
      }
    }

    // Also optimize the original size
    for (const format of config.formats) {
      const variants = generateImageVariant(
        sharp(inputPath),
        format,
        targetDir,
        nameWithoutExt,
        null,
        ext,
        config
      )

      if (config.skipExisting && existsSync(variants.outputPath)) {
        continue
      }

      await variants.image.toFile(variants.outputPath)
      processedCount++
    }

    if (processedCount > 0) {
      log(`  ✓ Generated ${processedCount} optimized variant(s)`, 'green')
    } else if (config.verbose) {
      log(`  ℹ Skipped (already optimized)`, 'blue')
    }
  } catch (error) {
    log(
      `  ✗ Error processing ${filename}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      'red'
    )
  }
}

/**
 * Main optimization function
 */
async function optimizeAssets(config: OptimizationConfig): Promise<void> {
  log(`\n${'='.repeat(60)}`, 'blue')
  log('  Asset Optimization Script', 'bright')
  log(`${'='.repeat(60)}\n`, 'blue')

  log(`Input directory:  ${config.inputDir}`, 'cyan')
  log(`Output directory: ${config.outputDir}`, 'cyan')
  log(`Breakpoints:      ${config.breakpoints.join(', ')}`, 'cyan')
  log(`Formats:          ${config.formats.join(', ')}`, 'cyan')
  log('')

  // Check if input directory exists
  if (!existsSync(config.inputDir)) {
    log(`Error: Input directory does not exist: ${config.inputDir}`, 'red')
    process.exit(1)
  }

  // Ensure output directory exists
  await mkdir(config.outputDir, { recursive: true })

  // Get all files
  log('Scanning for images...', 'yellow')
  const files = await getAllFiles(config.inputDir)
  const imageFiles = files.filter(file => isImageFile(file) && !isSVGFile(file))

  log(`Found ${imageFiles.length} image(s) to process\n`, 'green')

  if (imageFiles.length === 0) {
    log('No images found to optimize.', 'yellow')
    return
  }

  // Process each image
  let successCount = 0
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i]
    log(`[${i + 1}/${imageFiles.length}] ${basename(file)}`, 'bright')
    await optimizeImage(file, config.outputDir, config)
    successCount++
    log('')
  }

  log('='.repeat(60), 'blue')
  log('✓ Optimization complete!', 'green')
  log(`Processed ${successCount} image(s)`, 'green')
  log(`${'='.repeat(60)}\n`, 'blue')
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2)

  const config: OptimizationConfig = {
    ...DEFAULT_CONFIG,
    inputDir: args[0] || DEFAULT_CONFIG.inputDir,
    outputDir: args[1] || DEFAULT_CONFIG.outputDir,
  }

  optimizeAssets(config).catch(error => {
    log(`\nFatal error: ${error.message}`, 'red')
    process.exit(1)
  })
}

export { optimizeAssets, type OptimizationConfig }
