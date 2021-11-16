//  Create the grid
// * Game starts by hitting Space bar
//  Create frogger start point 
// Frogger needs to be able to move on the grid
// Frogger needs a working end goal
//* Points added to score board 
//* Obsticles need to be made
// collisions need to be made
//* collisions bug needs to be fixed
//* code needs to be refactored
//* Arrays for the obtsacles
//* created a hectic new score bug which aggressively loops



//* DOM Elements 
const grid = document.querySelector('.grid')
const cells = []
const displayScore = document.querySelector('#score-display')
const startBtn = document.querySelector('#start')



//* Variables
const width = 11
const height = 13
const gridCellCount = width * height 
const finalPortal = Math.floor(Math.random() * 10)
const startingPosition = 137

// const froggerStartPosition = 137
const water = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54]


let intervalId = null
let timer = null
let score = 0
let froggerPosition = 137

const obstaclePositions = [
  [111, 115, 118], 
  [99, 105], 
  [89, 90, 91, 95, 96],
  [85, 86, 87, 80, 81]
]



let logFirstRow = [44, 45, 46, 50, 51, 52]









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






//* Functions - Creating Frogger & Obstacles 
function addFrogger() {
  cells[froggerPosition].classList.add('frogger') 
}

function removeFrogger() {
  cells[froggerPosition].classList.remove('frogger')
}

function addPortal() {
  cells[finalPortal].classList.add('end-portal')
}

function addObstacles(obstacles, className) {
  // console.log('adding', obstacles)
  obstacles.forEach(obstacle => {
    cells[obstacle].classList.add(className)
  })
}

function removeObstacles(obstacles, className) {
  // console.log('removing', obstacles)
  obstacles.forEach(obstacle => {
    cells[obstacle].classList.remove(className)
  })
}


function addWater() { 
  water.forEach(cell => {
    cells[cell].classList.add('water')
  })
}
function removeWater() { 
  water.forEach(cell => {
    cells[cell].classList.remove('water')
  })
}



function addLog() {
  logFirstRow.forEach(log => {
    cells[log].classList.add('log')
  })
}

function removeLog() {
  logFirstRow.forEach(log => {
    cells[log].classList.remove('log')
  })
}




function endGame() {
  window.location.reload()
}

function startGame() {
  if (startBtn === false) {
    return
  }
}

startGame()
addFrogger()                     //* this frogger helps the reset after win/lose          
addPortal()
addLog()
addWater()



//******************************
//* Creating Frogger Movement *
//****************************** 

function handleKeyControls(e) {
  const x = froggerPosition % width
  const y = Math.floor(froggerPosition / width)
  
  removeFrogger()              //* frogger must be removed first

  switch (e.code) {

    case 'KeyD':           //* right
      if (x < width - 1) {
        froggerPosition++
      }
      break

    case 'KeyA':           //* left
      if (x > 0) {
        froggerPosition--
      }
      break

    case 'KeyW':            //* up
      if (y > 0) {
        froggerPosition -= width
      }
      break

    case 'KeyS':            //* down
      if (y < width - 1) {
        froggerPosition += width
      }
      break

    default: 'Space'
      console.log('key not recognised')
  }
  addFrogger()
  console.log(froggerPosition)
  handleLose()
  handleWin() 
}

document.addEventListener('keyup', handleKeyControls)


//***************************
//*    MOVING  Obstacles *
//***************************

function moveObstacle(
  intervalTime, 
  obstacleIndexTarget, 
  rowIndex,
  className,
  direction = 1
) {
  timer = setInterval(() => {
    removeObstacles(obstaclePositions[rowIndex], className)
    obstaclePositions[rowIndex] = obstaclePositions[rowIndex].map(obstacleIndex => {
      if (obstacleIndex >= obstacleIndexTarget && direction === 1) {
        return obstacleIndex -= 10
      } else if (obstacleIndex <= obstacleIndexTarget && direction === -1) {
        return obstacleIndex += 10
      } else {
        return obstacleIndex += direction 
      }
    })
    addObstacles(obstaclePositions[rowIndex], className) 
    handleLose()
  
  }, intervalTime)
}
moveObstacle(900, 120, 0, 'obstacle-one')
moveObstacle(300, 109, 1, 'obstacle-two')
moveObstacle(800, 88, 2, 'obstacle-three', -1)
moveObstacle(1500, 77, 3, 'obstacle-four', -1)



function moveLogFirstRow() {
  timer = setInterval(() => {
    if ('water.log' === water) {
      removeWater()
    } else {
      addWater()
    }
    removeLog()
    logFirstRow = logFirstRow.map(logIndex => {
      if (logIndex >= 54) {
        return logIndex - 10
      } else {
        return logIndex + 1
      }
    })
    addLog()
    
  
  }, 800)
}

moveLogFirstRow()


//********************************** 
//* Creating Win / Lose collisions *            
//********************************* 


//? Collisions are only working when frogger hits an obstacle, not when an obstacle hits frogger.

function handleLose() {
  obstaclePositions.forEach(row => {
    row.forEach(obstacle => {
      if (cells[obstacle].classList.contains('frogger')) {
        return window.location.reload()
      } 
    })
  })


  water.forEach(river => {
    if (river === froggerPosition) {
      window.location.reload()
    } 
  })
}

function handleWin() {
  if (finalPortal === froggerPosition) {
    score += 100
    displayScore.textContent = score
    window.alert('you win', score)
    window.location.reload()
    startGame()
  }
} 


//* Events 
startBtn.addEventListener('click', startGame)
