import androidColorsRaw from '../../data/android-colors'

const themeToImport = 'light'
const colorsToRemove = ['colorEF0000']

const androidColors = Object.keys(androidColorsRaw)
  .map((name) => {
    return {
      name,
      hex: getHex(androidColorsRaw[name][themeToImport]),
    }
  })
  .filter((name) => !colorsToRemove.includes(name))

function getHex(string) {
  const hexWithOrWithoutAlpha =
    string[0] === '#'
      ? string
      : androidColorsRaw[string][themeToImport] // if it's not a hex value it's a ref to another style

  return hexWithOrWithoutAlpha.length === 7
    ? hexWithOrWithoutAlpha
    : '#' +
        hexWithOrWithoutAlpha
          .slice(3) // strip alpha (technically hash + first two digits)
          .toLowerCase()
}

export { androidColors }
