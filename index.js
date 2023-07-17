const fieldList = document.querySelectorAll('.field')
const markerBtnX = document.getElementById('x')
const markerBtnO = document.getElementById('o')
const resetBtn = document.getElementById('resetBtn')
const popupTitle = document.querySelector('.popupTitle')
const popupBody = document.querySelector('.popupBody')
const resultPopup = document.querySelector('.resultPopup')
const closePopup = document.querySelector('.closeButton')
const overlay = document.getElementById('overlay')
let currentPlayer;
let selectedMarker;

closePopup.addEventListener('click', () => {
    resultPopup.classList.remove('active')
    overlay.classList.remove('active')
})


const gameBoardDisplay = (() => {
    
    markerBtnX.addEventListener('click', () => {
        markerBtnX.classList.add('active')
        markerBtnO.classList.remove('active')
    })
    
    markerBtnO.addEventListener('click', () => {
        markerBtnO.classList.add('active')
        markerBtnX.classList.remove('active')
    })
        
    fieldList.forEach(field => {
        field.addEventListener('click', () => {
            field.textContent = currentPlayer.marker
            let index = field.getAttribute('data-field')
            console.log(currentPlayer.name)
            console.log(Gameboard.getBoard())
            console.log(`The current player uses the ${currentPlayer.marker} marker`)
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


const GameController = (()=> {
    let player1 = Player('Player 1', 'X')
    let player2 = Player('Player 2', 'O')
    let gameOver = false;
    currentPlayer = player1
    
    const switchTurn = () => {
        if (currentPlayer === player1){
            currentPlayer = player2
        } 
        else {
            currentPlayer = player1
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
        console.log('Checking')

        return winningCombinations.some((combination) => {
            return combination.every((index) => {
                return Gameboard.getBoard()[index] === marker
            })
        })
    }

    const handleClick = (e) => {
        let index = e.target.getAttribute('data-field')
        
        if (Gameboard.updateBoard(index, currentPlayer.marker)){
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
        console.log('RESET!!!')
        Gameboard.resetBoard();
        gameBoardDisplay.clearBoard();
        currentPlayer = player1;
        gameOver = false;
      };

      return {start, reset, player1, player2}
})()

const resetGame = (() => {
    resetBtn.addEventListener('click', GameController.reset)
})()


GameController.start()