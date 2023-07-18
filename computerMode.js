const homePageBtn = document.getElementById('homePageBtn')
const markerBtnX = document.getElementById('x')
const markerBtnO = document.getElementById('o')
const fieldList = document.querySelectorAll('.field')
const resetBtn = document.getElementById('resetBtn')
let playerMarker
let computerMarker
let gameOver
let currentPlayer

homePageBtn.addEventListener('click', () => {
    window.location.href = 'index.html'
})

resetBtn.addEventListener('click', () => {
    gameBoardDisplay.clearBoard()
    Gameboard.resetBoard();
})

markerBtnX.addEventListener('click', () => {
    playerMarker = 'X'
    computerMarker = 'O'
    currentPlayer = GameController.humanPlayer
    markerBtnX.classList.add('active')
    markerBtnO.classList.remove('active')
})

markerBtnO.addEventListener('click', () => {
    playerMarker = 'O'
    computerMarker = 'X'
    currentPlayer = GameController.computerPlayer
    markerBtnO.classList.add('active')
    markerBtnX.classList.remove('active')
})

const gameBoardDisplay = (() => {
    
    fieldList.forEach(field => {
        field.addEventListener('click', () => {
            field.textContent = playerMarker
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

const GameController = (() => {
    let humanPlayer = Player('Human', playerMarker)
    let computerPlayer = Player('Computer', computerMarker)
    gameOver = false

    const checkWin = (marker) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        return winningCombinations.some((combination) => {
            return combination.every((index) => {
                return Gameboard.getBoard()[index] === marker
            })
        })
    }

    const computerPlay = () => {
        let randomIndex;
        
        do {
            randomIndex = Math.floor(Math.random * 9)
        } while (Gameboard.getBoard()[randomIndex] === '')

        const field = fieldList[randomIndex]
        field.textContent = computerMarker

        Gameboard.updateBoard(randomIndex,computerMarker)

        if (GameController.checkWin(computerMarker)){
            alert('Computer Wins')
        }
        else if (Gameboard.getBoard().every((marker) => marker !== '')){
            alert('Its a Tie')
        }
        else {
            currentPlayer = GameController.humanPlayer
        }
    }

    return {humanPlayer, computerPlayer, computerPlay, checkWin}

})()

const Gameboard = (() => {
    let board = [ "", "", "", "", "", "", "", "", ""]

    const getBoard = () => board

    const updateBoard = (index, marker) => {
        if (index >= 0 && index < board.length && !gameOver && board[index] === ""){
            board[index] = marker
            return true
        }
        else return false
    }

    const resetBoard = () => {
        board =  [ "", "", "", "", "", "", "", "", ""]
    }

    return {getBoard, updateBoard, resetBoard}
})()