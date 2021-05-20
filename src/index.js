import './styles.css'
import {
  figmaColors,
  iosColors,
  uniqueHexColorSets,
} from './colorData'

// set up document structure

document.getElementById('app').innerHTML = `
<main>
  <header>
    <h1>Tahoe Colors Compared</h1>
    <p class="meta small">
      Updated May 20, 2021 · 
      <a href="https://codesandbox.io/s/wonderful-butterfly-q8ze3">View Source</a>
    </p>
  </header>
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

// generate markup

const getColorSwatch = (hex) => `
  <span
    class="color-swatch"
    style="background-color: ${hex};"
  >
  </span>
`

const styleHash = (hex) => `
  ${hex.replace(/#/, '<span class="subtle">#</span>')}
`

const getHexMarkup = (hex) => `
  <span class="hex-with-dot">
    ${getColorSwatch(hex)}
    <span class="pad-bottom">${styleHash(hex)}</span>
  </span>
`

const getMatchingColorNames = ({ colorSet, hex }) => {
  const matches = colorSet
    .filter((color) => color.hex === hex)
    .map(({ name }) => name)

  return matches.length > 0
    ? matches.join(`<br>`)
    : `<span class="error">no match</span>`
}

// set up toggles

const markupContainer = document.querySelector(
  '#markup-container'
)

const getAndInsertMarkup = (hexSet) => {
  const markup = hexSet.map(
    (hex) => `
      <tr>
        <td class="mono color">${getHexMarkup(hex)}</td>
        <td class="mono small">${getMatchingColorNames({
          colorSet: iosColors,
          hex,
        })}</td>
        <td class="mono small">${getMatchingColorNames({
          colorSet: figmaColors,
          hex,
        })}</td>
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

  getAndInsertMarkup(uniqueHexColorSets[sort])
}

toggles.forEach((toggle) => {
  toggle.addEventListener('click', () =>
    sortColorsBy(toggle.dataset.sort)
  )
})

sortColorsBy('ios') // set default sort
