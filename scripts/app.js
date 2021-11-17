//*//  Create the grid
//* Game starts by hitting Space bar
//*//  Create frogger start point 
//*// Frogger needs to be able to move on the grid
//*// Frogger needs a working end goal
//* Points added to score board 
//*// Obsticles need to be made
//*// collisions need to be made
//*// collisions bug needs to be fixed
//*// code needs to be refactored
//*// Arrays for the obtsacles
//*// created a hectic new score bug which aggressively loops



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

const logPositions = [
  [45, 46, 51, 52],
  [34, 35, 36, 40, 41, 42],
  [24, 25, 28, 29, 30],
  [13, 14, 17, 18, 21]
]

const waterCellPositions = [
  [44, 47, 48, 49, 50, 53, 54],
  [33, 37, 38, 39, 43],
  [22, 23, 26, 27, 31, 32],
  [11, 12, 15, 16, 17, 19, 20]
]





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



// addWater()


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



function addLogs(logs, className) {
  logs.forEach(log => {
    cells[log].classList.add(className)
  })
}

function removeLogs(logs, className) {
  // console.log('adding', obstacles)
  logs.forEach(log => {
    cells[log].classList.remove(className)
  })
}



function addWaterCell(water, className) { 
  water.forEach(cell => {
    cells[cell].classList.add(className)
  })
}
function removeWaterCell(water, className) { 
  water.forEach(cell => {
    cells[cell].classList.remove(className)
  })
}







function endGame() {
  window.location.reload()
}

function startGame() {
  addFrogger()                           
  addPortal()
  moveObstacle(900, 120, 0, 'obstacle-one')
  moveObstacle(300, 109, 1, 'obstacle-two')
  moveObstacle(1000, 88, 2, 'obstacle-three', -1)
  moveObstacle(600, 77, 3, 'obstacle-four', -1)
  moveLog(900, 54, 0, 'log-one')
  moveLog(700, 33, 1, 'log-two', -1)
  moveLog(500, 32, 2, 'log-three')
  moveLog(500, 11, 3, 'log-four', -1) 
  moveWater(900, 54, 0, 'water-one')
  moveWater(700, 33, 1, 'water-two', -1)
  moveWater(500, 32, 2, 'water-three')
  moveWater(500, 11, 3, 'water-four', -1)
  startBtn.style.visibility = 'hidden'

}





//******************************
//* Creating Frogger Movement *
//****************************** 

function handleKeyControls(e) {
  const x = froggerPosition % width
  const y = Math.floor(froggerPosition / width)
  e.preventDefault()
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
    
    default: 
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


function moveLog(
  intervalTime, 
  logIndexTarget, 
  rowIndex,
  className,
  direction = 1
) {
  timer = setInterval(() => {
    removeLogs(logPositions[rowIndex], className)
    logPositions[rowIndex] = logPositions[rowIndex].map(logIndex => {
      if (logIndex >= logIndexTarget && direction === 1) {
        return logIndex -= 10
      } else if (logIndex <= logIndexTarget && direction === -1) {
        return logIndex += 10
      } else {
        return logIndex += direction 
      }
    })
    addLogs(logPositions[rowIndex], className) 

    // if (addLogs(logPositions[rowIndex], className) === froggerPosition) {

    // }.map(froggerLog => {
    //   if (froggerLog >= logIndexTarget && direction === 1) {
    //     return froggerLog -= 10
    //   } else if (froggerLog <= logIndexTarget && direction === -1) {
    //     return froggerLog += 10
    //   } else {
    //     return froggerLog += direction 
    //   }
    // })
  
  }, intervalTime)
}


function moveWater(
  intervalTime, 
  waterIndexTarget, 
  rowIndex,
  className,
  direction = 1
) {
  timer = setInterval(() => {
    removeWaterCell(waterCellPositions[rowIndex], className)
    waterCellPositions[rowIndex] = waterCellPositions[rowIndex].map(waterIndex => {
      if (waterIndex >= waterIndexTarget && direction === 1) {
        return waterIndex -= 10
      } else if (waterIndex <= waterIndexTarget && direction === -1) {
        return waterIndex += 10
      } else {
        return waterIndex += direction 
      }
    })
    
    addWaterCell(waterCellPositions[rowIndex], className) 
    handleLose()
  
  }, intervalTime)
}



//********************************** 
//* Creating Win / Lose collisions *            
//********************************* 


//? Collisions are only working when frogger hits an obstacle, not when an obstacle hits frogger.

function handleLose() {
  obstaclePositions.forEach(row => {
    row.forEach(obstacle => {
      if (cells[obstacle].classList.contains('frogger')) {
        return endGame()
      } 
    })
  })

  waterCellPositions.forEach(waterCell => {
    waterCell.forEach(water => {
      if (cells[water].classList.contains('frogger')) {
        return endGame()
      }
    })
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