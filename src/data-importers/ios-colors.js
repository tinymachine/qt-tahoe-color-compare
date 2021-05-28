/**
 * Convert iOS color styles JSON to an array of
 * objects with `name` and `hex` properties.
 */

import iosColorsRaw from '../../data/ios-colors'

const themeToImport = 'any'

export const iosColors = Object.keys(iosColorsRaw).map(
  (name) => {
    return {
      name,
      hex: iosColorsRaw[name][themeToImport]
        .slice(0, -2) // strip alpha (last two digits)
        .toLowerCase(),
    }
  }
)
