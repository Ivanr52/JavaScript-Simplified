document.addEventListener('click', (e) => {
  if (!e.target.matches('.expand-button')) return

  const card = e.target.closest('.card')
  const cardBody = card.querySelector('.card-body')

  if (e.target.innerText === 'Expand') {
    cardBody.classList.add('show')
    e.target.innerText = 'Collapse'
  } else {
    cardBody.classList.remove('show')
    e.target.innerText = 'Expand'
  }
})

//When user clicks button, exapnd/collapse card body by adding/removing class 'show'. Change text of button to expand/collapse
//Use document as eventListener to detect new cards. Check if event target matches button.
