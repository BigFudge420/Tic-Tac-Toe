const playerModeBtn = document.getElementById('playerModeBtn')
const computerModeBtn = document.getElementById('computerModeBtn')

playerModeBtn.addEventListener('click', () => {
    window.location.href = 'playerMode.html'
})

computerModeBtn.addEventListener('click', () => {
    window.location.href = 'computerMode.html'
})
