/**
 * Convert Figma CSS variables exported from
 * 'Export styles to CSS variables' Figma plugin
 * to a JS array of objects with `name` and `hex`
 * properties, and add all used colors from Figma.
 */

import figmaColorStylesRawTxt from '../../data/figma-color-styles.txt'
import { figmaColorsUsed } from './figma-colors-used'

// convert CSS vars to array of objects

const figmaColorStylesRaw = figmaColorStylesRawTxt
  .split('\n')
  .filter((line) => line && line.substring(0, 2) !== '/*')
  .map((line) => {
    return {
      name: line.split(': ')[0],
      hex: line.split(': ')[1].slice(0, -1),
    }
  })

// clean up `name` and `hex` values

const figmaColorStyles = figmaColorStylesRaw.map(
  ({ name, hex }) => {
    return {
      name: name
        .substring(2)
        .replace(/ /g, '')
        .replace(
          /----?/g,
          `<span class="subtle padded">/</span>`
        )
        .replace(/-(\S)-(\S)/g, '$1$2') // clean up extra dashes plugin adds
        .replace(/-(\S)$/, '$1')
        .replace(/\s-/g, ' ')
        .replace(/--/g, '-'),
      hex: hex.toLowerCase(),
    }
  }
)

// remove unused colors

const figmaColorStylesUsed = figmaColorStyles.filter((style) =>
  figmaColorsUsed.includes(style.hex)
)

// add unnamed colors to array, labeled as such

const figmaNamedColors = figmaColorStylesUsed.map(
  (style) => style.hex
)

const figmaUnnamedColors = figmaColorsUsed.filter(
  (hex) => !figmaNamedColors.includes(hex)
)

figmaColorStylesUsed.push(
  ...figmaUnnamedColors.map((hex) => {
    return {
      name: '<span class="unnamed">[unnamed color]</span>',
      hex,
    }
  })
)

// remove 'Meta' colors

/**
 * WARNING: if a color with the same hex as a 'Meta' color style
 * was used in the Figma file but was detached from a color style,
 * that color could also be removed here, which might be innacurate.
 */

const figmaColors = figmaColorStylesUsed.filter(
  (style) => !style.name.startsWith('meta<')
)

export { figmaColors }
