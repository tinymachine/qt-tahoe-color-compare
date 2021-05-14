import './styles.css'
import figmaColorsRaw from '../data/figma-colors'
import iosColorsRaw from '../data/ios-colors'

const figmaColors = figmaColorsRaw.map(({ name, hex }) => {
  return {
    name: name.replace(/ /g, ''),
    hex,
  }
})

const iosColors = Object.keys(iosColorsRaw).map((name) => {
  return {
    name,
    hex: iosColorsRaw[name].any.slice(0, -2), // strip alpha from end
  }
})

const allHexColors = [
  ...iosColors.map(({ hex }) => hex),
  ...figmaColors.map(({ hex }) => hex),
]

const uniqueHexColors = [
  ...new Set(allHexColors.map((hex) => hex.toLowerCase())),
]

const getColorDot = (hex) => `
  <span
    class="color-dot"
    style="background-color: ${hex};"
  >
  </span>
`

const styleHash = (hex) => `
  ${hex.replace(/#/, '<span class="subtle">#</span>')}
`

const getHexMarkup = (hex) => `
  <span class="hex-with-dot">
    ${getColorDot(hex)}
    <span>${styleHash(hex)}</span>
  </span>
`

const getMatchingColorNames = ({ colorSet, hex }) => {
  const matches = colorSet
    .filter((color) => color.hex.toLowerCase() === hex)
    .map(({ name }) => name)

  return matches.length > 0 ? matches : [`<span class="error">no match</span>`]
}

const markup = uniqueHexColors.map(
  (hex) => `
    <tr>
      <td class="mono">${getHexMarkup(hex)}</td>
      <td class="mono small">${getMatchingColorNames({
        colorSet: iosColors,
        hex,
      }).join('<br>')}</td>
      <td class="mono small">${getMatchingColorNames({
        colorSet: figmaColors,
        hex,
      }).join('<br>')}</td>
    </tr>
  `
)

document.getElementById('app').innerHTML = `
<main>
  <h1>Tahoe Colors</h1>
  <table>
    <thead>
      <tr>
        <th>Color <span class="small">(ignoring alpha)</span></th>
        <th>iOS Color Styles</th>
        <th>Figma Color Styles</th>
      </tr>
    </thead>
    <tbody id="markup-container">
      ${markup.join('')}
    </tbody>
  </table>
</main>
`
