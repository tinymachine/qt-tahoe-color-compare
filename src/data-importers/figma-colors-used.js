/**
 * Convert raw copy-and-paste from Figma plugin 'Style Lens'
 * used fill and stroke colors to an array of hex colors strings.
 */

import fileContents from '../../data/figma-colors-used.txt'

export const figmaColorsUsed = [
  ...new Set(
    fileContents
      .split('\n')
      .filter(
        (string) =>
          string.length === 6 &&
          string.match(/[ABCDEFabcdef0-9]{6}/) // extract hex colors (sans hashmark)
      )
      .map((hexSansHash) => `#${hexSansHash.toLowerCase()}`)
  ),
]