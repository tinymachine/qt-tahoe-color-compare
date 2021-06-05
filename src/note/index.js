import './note.css'
import content from './content.md'
import marked from 'marked'

const noteEl = document.getElementById('note')
const activeClass = 'visible'

const loadNote = () => {
  noteEl.innerHTML = `
    <div class="scrim">
      <div class="modal">
        ${marked(content)}
      </div>
    </div>
  `

  const scrimEl = document.querySelector('.scrim')
  const modalEl = document.querySelector('.modal')

  // close modal when clicking scrim
  scrimEl.addEventListener('click', () => toggleNote())

  // don't close modal when clicking inside modal
  modalEl.addEventListener('click', (e) => e.stopPropagation())
}

const toggleNote = () => {
  noteEl.classList.contains(activeClass) && clearUrlHash()
  noteEl.classList.toggle(activeClass)
}

const clearUrlHash = () => {
  window.history.replaceState(
    '',
    document.title,
    window.location.pathname
  )
}

export { noteEl, loadNote, toggleNote }
