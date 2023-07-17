const fieldList = document.querySelectorAll('.field')
const markerBtnX = document.getElementById('x')
const markerBtnO = document.getElementById('o')
let selectedMarker;

const Player = ( playerName, marker) => {
return {playerName, marker}
}

const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""]
    
    const getBoard = () => board
    
    const updateBoard = (index, marker) => {
        if (index >= 0 && index < board.length && board[index] === ""){
            board[index] = marker
            return true
        }
        return false
    }
    
    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""]
    }
    
    return { getBoard, updateBoard, resetBoard}

})()

const gameBoardDisplay = (() => {
    
    markerBtnX.addEventListener('click', () => {
        selectedMarker = 'X'
        console.log(selectedMarker)
        markerBtnX.classList.add('active')
        markerBtnO.classList.remove('active')
    })
    
    markerBtnO.addEventListener('click', () => {
        selectedMarker = 'O'
        console.log(selectedMarker)
        markerBtnO.classList.add('active')
        markerBtnX.classList.remove('active')
    })
    
    fieldList.forEach(field => {
        field.addEventListener('click', () => {
            field.textContent = selectedMarker
            let index = field.getAttribute('data-field')
            Gameboard.updateBoard(index, selectedMarker)
            console.log(selectedMarker)
            console.log(Gameboard.getBoard())
        })
    })

})()