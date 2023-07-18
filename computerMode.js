const homePageBtn = document.getElementById('homePageBtn')
const markerBtnX = document.getElementById('x')
const markerBtnO = document.getElementById('o')
const fieldList = document.querySelectorAll('.field')
let marker

homePageBtn.addEventListener('click', () => {
    window.location.href = 'index.html'
})

markerBtnX.addEventListener('click', () => {
    marker = 'X'
    markerBtnX.classList.add('active')
    markerBtnO.classList.remove('active')
})

markerBtnO.addEventListener('click', () => {
    marker = 'O'
    markerBtnO.classList.add('active')
    markerBtnX.classList.remove('active')
})

const gameBoardDisplay = (() => {
    
    fieldList.forEach(field => {
        field.addEventListener('click', () => {
            field.textContent = marker
        })
    })

    const clearBoard = () => {
        fieldList.forEach(field => {
            field.textContent = ''
        })
    }

    return {clearBoard}

})()

const Player = ( playerName, marker) => {
    return {playerName, marker}
}