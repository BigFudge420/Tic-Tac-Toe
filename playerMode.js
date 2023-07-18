const fieldList = document.querySelectorAll('.field')
const resetBtn = document.getElementById('resetBtn')
const popupTitle = document.querySelector('.popupTitle')
const popupBody = document.querySelector('.popupBody')
const resultPopup = document.querySelector('.resultPopup')
const closePopup = document.querySelector('.closeButton')
const overlay = document.getElementById('overlay')
const homePageBtn = document.getElementById('homePageBtn')
let gameOver = false;
let currentPlayer;
let selectedMarker;

closePopup.addEventListener('click', () => {
    resultPopup.classList.remove('active')
    overlay.classList.remove('active')
})

homePageBtn.addEventListener('click', () => {
    GameController.reset
    window.location.href = 'index.html'
})


const gameBoardDisplay = (() => {
    
    fieldList.forEach(field => {
        field.addEventListener('click', () => {
            let index = field.getAttribute('data-field')
            if (!gameOver){
                if (Gameboard.getBoard()[index] === ""){
                    field.textContent = currentPlayer.marker
                }
            }
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

const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""]
    
    const getBoard = () => board
    
    const updateBoard = (index, marker) => {
        if (index >= 0 && index < board.length && board[index] === "" && !gameOver){
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

const GameController = (()=> {
    let playerX = Player('Player X', 'X')
    let playerO = Player('Player O', 'O')
    gameOver = false;
    currentPlayer = playerX
    
    const switchTurn = () => {
        if (currentPlayer === playerX){
            currentPlayer = playerO
        } 
        else {
            currentPlayer = playerX
        }
    }
    
    const endGame = () => {
        if (gameOver){
            
        }
    }
    
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

    const handleClick = (e) => {
        let index = e.target.getAttribute('data-field')
        
        if (Gameboard.updateBoard(index, currentPlayer.marker) && !gameOver){
            if (checkWin(currentPlayer.marker)){
                resultPopup.classList.add('active')
                overlay.classList.add('active')
                popupTitle.textContent = "Victory!!!"
                popupBody.textContent = `${currentPlayer.playerName}'s strategic moves and cunning gameplay have paid off, and they have emerged as the ultimate champion. The opponent was no match for ${currentPlayer.playerName}'s skill and determination. Enjoy this well-deserved victory, and revel in the glory of your triumph! Well done!`
                gameOver = true
            }
            else if (!Gameboard.getBoard().includes("")){
                resultPopup.classList.add('active')
                overlay.classList.add('active')
                popupTitle.textContent = "It's a tie..."
                popupBody.textContent = "Both players have displayed exceptional skill and strategic brilliance throughout the game of Tic Tac Toe. Every move was met with a countermove, and neither player could secure a definitive victory. This hard-fought battle ends in a draw, proving that both of you are true contenders. Take pride in your performance, as you've proven yourself a worthy adversary. Well played!"
                gameOver = true
            }
            else {
                switchTurn()
            }
        }
    }

    const start = () => {
        fieldList.forEach(field => {
            field.addEventListener('click', handleClick)
        })
    }

    const reset = () => {
        Gameboard.resetBoard();
        gameBoardDisplay.clearBoard();
        currentPlayer = playerX;
        gameOver = false;
      };

      return {start, reset, playerX, playerO}
})()

const resetGame = (() => {
    resetBtn.addEventListener('click', GameController.reset)
})()


GameController.start()