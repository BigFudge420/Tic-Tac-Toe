const homePageBtn = document.getElementById('homePageBtn')
const markerBtnX = document.getElementById('x')
const markerBtnO = document.getElementById('o')
const fieldList = document.querySelectorAll('.field')
const resetBtn = document.getElementById('resetBtn')
const resultPopup = document.querySelector('.resultPopup')
const closePopup = document.querySelector('.closeButton')
const overlay = document.getElementById('overlay')
const popupTitle = document.querySelector('.popupTitle')
const popupBody = document.querySelector('.popupBody')
let playerMarker
let computerMarker
let gameOver
let currentPlayer

homePageBtn.addEventListener('click', () => {
    window.location.href = 'index.html'
})

resetBtn.addEventListener('click', () => {
    GameController.reset()
    if (playerMarker === 'O'){
        GameController.computerPlay()
    }
})

markerBtnX.addEventListener('click', () => {
    playerMarker = 'X'
    computerMarker = 'O'
    currentPlayer = GameController.humanPlayer
    console.log(computerMarker)
    markerBtnX.classList.add('active')
    markerBtnO.classList.remove('active')
})

markerBtnO.addEventListener('click', () => {
    playerMarker = 'O'
    computerMarker = 'X'
    currentPlayer = GameController.computerPlayer
    markerBtnO.classList.add('active')
    markerBtnX.classList.remove('active')
    GameController.computerPlay()
})

closePopup.addEventListener('click', () => {
    resultPopup.classList.remove('active')
    overlay.classList.remove('active')
})

const gameBoardDisplay = (() => {
    
    fieldList.forEach(field => {
        field.addEventListener('click', () => {
            if (!gameOver){
                field.textContent = playerMarker
            }
            console.log(Gameboard.getBoard())
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
        let numIndex;
        let randomField
        let play = false
        
        do {
            randomIndex = Math.floor(Math.random() * 9)
            randomField = document.querySelector(`[data-field="${randomIndex}"]`)
            if (Gameboard.getBoard()[randomIndex] === '' && randomField.textContent === ''){
                play = true
            }
        } while(!play)

        if(play && !gameOver){
            
            numIndex = parseInt(randomIndex)    
            console.log(numIndex)
    
            const field = document.querySelector(`[data-field="${numIndex}"]`);
            field.textContent = computerMarker
    
            Gameboard.updateBoard(numIndex,computerMarker)
    
            if (checkWin(computerMarker)){
                popupTitle.textContent = "A Valiant Effort"
                popupBody.textContent = "You put up a valiant effort, but unfortunately, the computer emerged victorious in the game of Tic Tac Toe. Its algorithmic precision and strategic prowess proved too formidable for you to overcome. Don't be disheartened, though, as every defeat is an opportunity to learn and grow. Keep honing your skills, and your next encounter with the computer will surely be a different story. Keep your head up and keep striving for victory!"
                resultPopup.classList.add('active')
                overlay.classList.add('active')
                gameOver = true
            }
            else if (Gameboard.getBoard().every((marker) => marker !== '')){
                popupTitle.textContent = "An Unyielding Battle of Wits"
                popupBody.textContent = "You and the computer engaged in a fierce battle of wits, with neither side able to claim superiority. This result serves as a testament to your ability to challenge and match the computational prowess of the machine. Take pride in the fact that you have held your own against this formidable opponent, proving that human intellect can hold its ground in the face of artificial intelligence. Well played!"
                resultPopup.classList.add('active')
                overlay.classList.add('active')
                gameOver = true
            }
            else {
                currentPlayer = GameController.humanPlayer
                gameOver = false
            }
            
            play = true
        }
    }

    const humanPlay = (e) => {
        let index = e.target.getAttribute('data-field')
        console.log(Gameboard.getBoard())

        if (Gameboard.updateBoard(index, playerMarker) && !gameOver){
            if (checkWin(playerMarker)){
                popupTitle.textContent = "Your Brilliance Prevails"
                popupBody.textContent = "Your strategic brilliance and adaptability outmatched the computer's algorithms, leaving it in a state of defeat. Your skillful maneuvers and well-calculated moves have proven that human ingenuity can still conquer the realm of artificial intelligence. Revel in this accomplishment, knowing that you have conquered the digital realm and emerged as the ultimate victor. Well done!"
                resultPopup.classList.add('active')
                overlay.classList.add('active')
                gameOver = true
            }
            else if (Gameboard.getBoard().every((marker) => marker !== '')){
                popupTitle.textContent = "An Unyielding Battle of Wits"
                popupBody.textContent = "You and the computer engaged in a fierce battle of wits, with neither side able to claim superiority. This result serves as a testament to your ability to challenge and match the computational prowess of the machine. Take pride in the fact that you have held your own against this formidable opponent, proving that human intellect can hold its ground in the face of artificial intelligence. Well played!"
                resultPopup.classList.add('active')
                overlay.classList.add('active')
                gameOver = true
            }
            else {
                currentPlayer = GameController.computerPlayer
                gameOver = false
                computerPlay()
            }
        }
    }

    const start = () => {
        fieldList.forEach(field => {
            field.addEventListener('click', humanPlay)
        })
    }

    const reset = () => {
        gameBoardDisplay.clearBoard()
        Gameboard.resetBoard();
        gameOver = false
    }

    return {start, reset, humanPlayer, computerPlayer, computerPlay, humanPlay}

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

GameController.start()