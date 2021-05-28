import { androidColors } from './data-importers/android-colors'
import { figmaColors } from './data-importers/figma-colors'
import { iosColors } from './data-importers/ios-colors'

// make hex color arrays (sans names)

const hexColors = {
  android: androidColors.map(({ hex }) => hex),
  ios: iosColors.map(({ hex }) => hex),
  figma: figmaColors.map(({ hex }) => hex),
}

// add known unnamed colors to iOS and Android colors

const knownUnnamedColors = ['#ffffff', '#000000']
const unnamedColorName =
  '<span class="unnamed">[unnamed color]</span>'

knownUnnamedColors.forEach((hex) => {
  !hexColors.ios.includes(hex) &&
    iosColors.push({
      name: unnamedColorName,
      hex,
    })

  !hexColors.android.includes(hex) &&
    androidColors.push({
      name: unnamedColorName,
      hex,
    })
})

// set up array of colors

const allHexColors = {
  androidFirst: [
    ...hexColors.android,
    ...hexColors.ios,
    ...hexColors.figma,
  ],
  iosFirst: [
    ...hexColors.ios,
    ...hexColors.android,
    ...hexColors.figma,
  ],
  figmaFirst: [
    ...hexColors.figma,
    ...hexColors.android,
    ...hexColors.ios,
  ],
}

export const uniqueHexColorSets = {
  android: [
    ...new Set(allHexColors.androidFirst.map((hex) => hex)),
  ],
  ios: [...new Set(allHexColors.iosFirst.map((hex) => hex))],
  figma: [
    ...new Set(allHexColors.figmaFirst.map((hex) => hex)),
  ],
  color: [
    ...new Set(allHexColors.iosFirst.map((hex) => hex).sort()),
  ],
}

export const styleSets = {
  android: androidColors,
  figma: figmaColors,
  ios: iosColors,
}
