import figmaColorsRaw from '../data/figma-colors'
import iosColorsRaw from '../data/ios-colors'

export const figmaColors = figmaColorsRaw.map(
  ({ name, hex }) => {
    return {
      name: name
        .substring(2)
        .replace(/ /g, '')
        .replace(/---/g, '/')
        .replace(/\//g, `<span class="subtle padded">/</span>`)
        .replace(/\s-/g, ' ')
        .replace(/--/g, '-'),
      hex: hex.toLowerCase(),
    }
  }
)

export const iosColors = Object.keys(iosColorsRaw).map(
  (name) => {
    return {
      name,
      hex: iosColorsRaw[name].any.slice(0, -2).toLowerCase(), // strip alpha from end
    }
  }
)

// set up array of colors

const allHexColors = {
  iosFirst: [
    ...iosColors.map(({ hex }) => hex),
    ...figmaColors.map(({ hex }) => hex),
  ],
  figmaFirst: [
    ...figmaColors.map(({ hex }) => hex),
    ...iosColors.map(({ hex }) => hex),
  ],
}

export const uniqueHexColorSets = {
  ios: [...new Set(allHexColors.iosFirst.map((hex) => hex))],
  figma: [
    ...new Set(allHexColors.figmaFirst.map((hex) => hex)),
  ],
  color: [
    ...new Set(allHexColors.iosFirst.map((hex) => hex).sort()),
  ],
}
