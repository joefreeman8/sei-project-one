//  Create the grid
// * Game starts by hitting Space bar
//  Create frogger start point 
// Frogger needs to be able to move on the grid
//* Frogger needs a working end goal
//* Points added to score board 
//* Obsticles need to be made



//* DOM Elements 
const grid = document.querySelector('.grid')
const cells = []
const displayScore = document.querySelector('.score-display')
const startBtn = document.querySelector('#start')



//* Variables
const width = 11
const height = 13
const gridCellCount = width * height 
const finalPortal = Math.floor(Math.random() * 10)
// const froggerStartPosition = 137

let froggerPosition = 137
let obstacleOnePosition = 110
let timer

//* Building the grid 
function createGrid() {
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.textContent = i 
    cell.setAttribute('data-index', i)
    cells.push(cell)
    grid.appendChild(cell)
  }
}
createGrid()



//* Functions

function addFrogger() {
  cells[froggerPosition].classList.add('frogger') 
}

function removeFrogger() {
  cells[froggerPosition].classList.remove('frogger')
}

function addPortal() {
  cells[finalPortal].classList.add('end-portal')
}

function addObstacleOne() {
  cells[obstacleOnePosition].classList.add('obstacle-one')
}

function removeObstacleOne() {
  cells[obstacleOnePosition].classList.remove('obstacle-one')
}

function endGame() {
  window.location.reload()
}


addFrogger() 
addObstacleOne()               //* this frogger helps the reset after win/lose
addPortal()

function handleKeyControls(e) {
  const x = froggerPosition % width
  const y = Math.floor(froggerPosition / width)
  
  removeFrogger()              //* frogger must be removed first

  switch (e.code) {

    case 'KeyD':           //* moves frogger right
      if (x < width - 1) {
        froggerPosition++
      }
      break

    case 'KeyA':           //* moves frogger left
      if (x > 0) {
        froggerPosition--
      }
      break

    case 'KeyW':            //* moves frogger up
      if (y > 0) {
        froggerPosition -= width
      }
      break

    case 'KeyS':            //* moves frogger down
      if (y < width - 1) {
        froggerPosition += width
      }
      break

    default:
      console.log('key not recognised')
  }
  addFrogger()
  
  function win() {
    if (finalPortal === froggerPosition) {
      console.log('you win')
      window.alert('you win')
      endGame()
      
    }
  } 
  win()
}



function obstacleOne() {
  timer = setInterval(() => {
    if (obstacleOnePosition >= 120) {
      removeObstacleOne()
      obstacleOnePosition = 110
    } else {
      // obstacleOnePosition++
      removeObstacleOne()
      obstacleOnePosition = obstacleOnePosition + 1
      addObstacleOne()
      
    }
  }, 500)
  
}
obstacleOne()



//* Events 
// startBtn.addEventListener('click', playGame)
document.addEventListener('keyup', handleKeyControls)
