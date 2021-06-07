import './styles.css'
import { styleSets, uniqueHexColorSets } from './colors'
import { figmaColorsUsed } from './data-importers/figma-colors-used'
import { noteEl, loadNote, toggleNote } from './note'

// set up document structure

document.getElementById('app').innerHTML = `
<main>
  <header>
    <h1>Tahoe App Colors Compared (ignoring alpha)</h1>
    <p class="meta small">
      Updated June 7, 2021 · 
      <a href="#method" data-button="noteToggle">Methodology</a> ·
      <a href="https://codesandbox.io/s/github/tinymachine/qt-tahoe-color-compare/tree/main">View Source</a>
    </p>
  </header>

  <table>
    <thead>
      <tr>
        <th data-sort="color">Colors (${uniqueHexColorSets.color.length})</th>
        <th data-sort="figma">Figma Colors (${styleSets.figma.length})</th>
        <th data-sort="android">Android Colors (${styleSets.android.length})</th>
        <th data-sort="ios">iOS Colors (${styleSets.ios.length})</th>
      </tr>
    </thead>
    <tbody id="markup-container">
    </tbody>
  </table>
</main>
`

// set up Methodology note

loadNote()
window.location.hash === '#method' && toggleNote() // allow linking to methodology note

const toggleNoteButton = document.querySelector(
  '[data-button="noteToggle"]'
)

toggleNoteButton.addEventListener('click', (e) => {
  toggleNote()
})

document.addEventListener('keyup', (e) => {
  // 'Esc' key closes modal
  ;['Esc', 'Escape'].includes(e.key) &&
    noteEl.classList.contains('visible') &&
    toggleNote()
})

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
  const matches = styleSets[colorSet]
    .filter(
      (color) => color.hex.toLowerCase() === hex.toLowerCase()
    )
    .map(({ name }) => name)

  const figmaColorUsedPrefix =
    colorSet === 'figma' && !figmaColorsUsed.includes(hex)
      ? '[not used in UI file]<br>'
      : ''

  return matches.length > 0
    ? figmaColorUsedPrefix + matches.join(`<br>`)
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
          colorSet: 'figma',
          hex,
        })}</td>
        <td class="mono small">${getMatchingColorNames({
          colorSet: 'android',
          hex,
        })}</td>
        <td class="mono small">${getMatchingColorNames({
          colorSet: 'ios',
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

sortColorsBy('figma') // set default sort
