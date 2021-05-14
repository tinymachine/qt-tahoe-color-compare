import './styles.css'
import figmaColorsRaw from '../data/figma-colors'
import iosColorsRaw from '../data/ios-colors'

const figmaColors = figmaColorsRaw.map(({ name, hex }) => {
  return {
    name: name.replace(/ /g, ''),
    hex: hex.toLowerCase(),
  }
})

const iosColors = Object.keys(iosColorsRaw).map((name) => {
  return {
    name,
    hex: iosColorsRaw[name].any.slice(0, -2).toLowerCase(), // strip alpha from end
  }
})

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

const uniqueHexColorsSortedBy = {
  ios: [...new Set(allHexColors.iosFirst.map((hex) => hex))],
  figma: [
    ...new Set(allHexColors.figmaFirst.map((hex) => hex)),
  ],
  color: [
    ...new Set(allHexColors.iosFirst.map((hex) => hex).sort()),
  ],
}

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
    .filter((color) => color.hex === hex)
    .map(({ name }) => name)

  return matches.length > 0
    ? matches
    : [`<span class="error">no match</span>`]
}

document.getElementById('app').innerHTML = `
<main>
  <h1>Tahoe Colors</h1>
  <table>
    <thead>
      <tr>
        <th data-sort="color">Color <span class="small">(ignoring alpha)</span></th>
        <th data-sort="ios">iOS Color Styles</th>
        <th data-sort="figma">Figma Color Styles</th>
      </tr>
    </thead>
    <tbody id="markup-container">
    </tbody>
  </table>
</main>
`

const markupContainer = document.querySelector(
  '#markup-container'
)

const getAndInsertMarkup = (hexSet) => {
  const markup = hexSet.map(
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

  markupContainer.innerHTML = markup.join('')
}

const toggles = document.querySelectorAll('[data-sort]')

const sortColorsBy = (sort) => {
  toggles.forEach((toggle) => {
    toggle.classList.remove('active')
  })
  const toggle = document.querySelector(`[data-sort="${sort}"]`)
  toggle.classList.add('active')

  getAndInsertMarkup(uniqueHexColorsSortedBy[sort])
}

toggles.forEach((toggle) => {
  toggle.addEventListener('click', () =>
    sortColorsBy(toggle.dataset.sort)
  )
})

sortColorsBy('ios')
