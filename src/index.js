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
      Updated <a href="https://github.com/tinymachine/qt-tahoe-color-compare/commits/main">June 29, 2021</a> · 
      <a href="#method" data-button="noteToggle">Methodology</a> ·
      <a href="https://codesandbox.io/s/github/tinymachine/qt-tahoe-color-compare/tree/main">View Source</a>
    </p>
  </header>

  <div role="table" class="table">
    <div role="rowgroup" class="thead">
      <div role="row" class="tr">
        <div role="cell" class="th" data-sort="color">Colors (${uniqueHexColorSets.color.length})</div>
        <div role="cell" class="th" data-sort="figma">Figma Colors (${styleSets.figma.length})</div>
        <div role="cell" class="th" data-sort="android">Android Colors (${styleSets.android.length})</div>
        <div role="cell" class="th" data-sort="ios">iOS Colors (${styleSets.ios.length})</div>
      </div>
    </div>

    <div role="rowgroup" id="markup-container" class="tbody">
    </div>
  </div>
</main>
`

// set up Methodology note

loadNote()

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
  <span class="hex-with-swatch">
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
      <a id="${hex.substring(1)}" class="anchor"></a>
      <a href="${hex}" role="row" class="tr">
        <div role="cell" class="td mono color">${getHexMarkup(
          hex
        )}</div>
        <div role="cell" class="td mono small">${getMatchingColorNames(
          {
            colorSet: 'figma',
            hex,
          }
        )}</div>
        <div role="cell" class="td mono small">${getMatchingColorNames(
          {
            colorSet: 'android',
            hex,
          }
        )}</div>
        <div role="cell" class="td mono small">${getMatchingColorNames(
          {
            colorSet: 'ios',
            hex,
          }
        )}</div>
      </a>
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

/**
 * handle URL hashes (since DOM is built dynamically,
 * anchor links don't work by default)
 */

const hash = window.location.hash

if (hash === '#method') {
  toggleNote() // allow linking to methodology note
} else if (hash) {
  const href = window.location.href
  window.location.href = href
}
