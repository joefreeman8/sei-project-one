//*//  Create the grid

//*//  Create frogger start point 
//*// Frogger needs to be able to move on the grid
//*// Frogger needs a working end goal
//*// Points added to score board 
//*// Obsticles need to be made
//*// collisions need to be made
//*// collisions bug needs to be fixed
//*// code needs to be refactored
//*// Arrays for the obtsacles
//*// created a hectic new score bug which aggressively loops



//* DOM Elements 
const grid = document.querySelector('#grid')
const cells = []
const displayScore = document.querySelector('#score-display')
const displayLives = document.querySelector('#lives-display')
const startBtn = document.querySelector('#start')
const playAgainBtn = document.querySelector('#play-again')
const pokeScore = document.querySelector('.poke-score')
const instructions = document.querySelector('.instructions')
const pokeLives = document.querySelector('.poke-lives')
const heading = document.querySelector('.heading')

playAgainBtn.style.visibility = 'hidden'



//* Variables
const width = 11
const height = 13
const gridCellCount = width * height 
const finalPokeBall = Math.floor(Math.random() * 10)
// const startingPosition = 137
const enemyPositions = [
  [111, 115, 118], 
  [99, 105], 
  [89, 90, 91, 95, 96],
  [85, 86, 87, 88, 80, 81, 82]
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


let lives = 3
let intervalId = null
let timer = null
let score = 0
let playerPosition = 137






//**************************
//*   Building the grid    *
//**************************

function createGrid() {
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.setAttribute('data-index', i)
    cells.push(cell)
    grid.appendChild(cell)
  }
}

createGrid()

//*********************************************/
//* Functions - adding Frogger & Obstacles   *
//********************************************/

function addPlayer() {
  cells[playerPosition].classList.add('player') 
}

function removePlayer() {
  cells[playerPosition].classList.remove('player')
}

function addPokeBall() {
  cells[finalPokeBall].classList.add('poke-ball-end')
}

function removePokeBall() {
  cells[finalPokeBall].classList.remove('poke-ball-end')
}

function addEnemies(enemies, className) {
  // console.log('adding', obstacles)
  enemies.forEach(enemy => {
    cells[enemy].classList.add(className)
  })
}

function removeEnemies(enemies, className) {
  // console.log('removing', obstacles)
  enemies.forEach(enemy => {
    cells[enemy].classList.remove(className)
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


function startGame() {
  heading.style.visibility = 'hidden'
  grid.classList.remove('hidden')
  grid.classList.add('grid')
  pokeScore.style.display = 'inline-block'
  pokeLives.style.display = 'inline-block'
  instructions.style.display = 'none'
  displayLives.textContent = lives
  checkEndGame()
  addPlayer()                           
  addPokeBall()
  moveEnemy(900, 120, 0, 'enemy-one')
  moveEnemy(300, 109, 1, 'enemy-two')
  moveEnemy(600, 88, 2, 'enemy-three', -1)
  moveEnemy(1000, 77, 3, 'enemy-four', -1)
  moveLog(900, 54, 0, 'log-one')
  moveLog(700, 33, 1, 'log-two', -1)
  moveLog(500, 32, 2, 'log-three')
  moveLog(600, 11, 3, 'log-four', -1) 
  moveWater(900, 54, 0, 'water-one')
  moveWater(700, 33, 1, 'water-two', -1)
  moveWater(500, 32, 2, 'water-three')
  moveWater(600, 11, 3, 'water-four', -1)
  startBtn.style.visibility = 'hidden'
  document.addEventListener('keyup', handleKeyControls)
}

function playAgain() {
  location.reload()
  clearInterval(checkEndGame)
  clearInterval(moveEnemy)
  clearInterval(moveWater)
  clearInterval(moveLog)
  lives = 3
  displayLives.textContent = lives
  intervalId = null
  timer = null
  score = 0
  playerPosition = 137

  startGame()
}

function endGame(endgamestatement) {
  grid.classList.remove('grid')
  // grid.classList.add('hide')
  displayScore.innerHTML = endgamestatement
  playAgainBtn.style.visibility = 'visible'
  clearInterval(timer = setInterval)
  removePlayer()
  
}

function checkEndGame() {
  timer = setInterval(() => {
    if (lives === 0) {
      endGame(`You are dead, you scored ${score}`)
    }
    if (finalPokeBall === playerPosition) {
      score += 1000
      if (score === 1000) {
        cells.classList.remove('player')
        removePokeBall()
        displayScore.textContent = score
      }
      endGame(`Champion, your score is ${score}`)
    }
  }, 100)
}

//******************************
//* Creating Frogger Movement *
//****************************** 

function handleKeyControls(e) {
  const x = playerPosition % width
  const y = Math.floor(playerPosition / width)
  e.preventDefault()
  removePlayer()              //* frogger must be removed first

  switch (e.code) {

    case 'KeyD':           //* right
      if (x < width - 1) {
        playerPosition++
      }
      break

    case 'KeyA':           //* left
      if (x > 0) {
        playerPosition--
      }
      break

    case 'KeyW':            //* up
      if (y > 0) {
        playerPosition -= width
      }
      break

    case 'KeyS':            //* down
      if (y < width - 1) {
        playerPosition += width
      }
      break
    
    default: 
      console.log('key not recognised')
  }
  addPlayer()
  checkEndGame()
}




//*****************************************
//*    M O V I N G    O b s t a c l e s   *
//*****************************************

function moveEnemy(
  intervalTime, 
  enemyIndexTarget, 
  rowIndex,
  className,
  direction = 1
) {
  timer = setInterval(() => {
    removeEnemies(enemyPositions[rowIndex], className)
    enemyPositions[rowIndex] = enemyPositions[rowIndex].map(enemyIndex => {
      if (enemyIndex >= enemyIndexTarget && direction === 1) {
        return enemyIndex -= 10
      } else if (enemyIndex <= enemyIndexTarget && direction === -1) {
        return enemyIndex += 10
      } else {
        return enemyIndex += direction 
      }
    })
    addEnemies(enemyPositions[rowIndex], className) 
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


function handleLose() {
  enemyPositions.forEach(row => {
    row.forEach(obstacle => {
      if (cells[obstacle].classList.contains('player')) {
        removePlayer()
        playerPosition = 137
        lives = lives - 1
        displayLives.textContent = lives
        checkEndGame()
        addPlayer()
        return 
      } 
    })
  })

  waterCellPositions.forEach(waterCell => {
    waterCell.forEach(water => {
      if (cells[water].classList.contains('player')) {
        removePlayer()
        playerPosition = 137
        lives = lives - 1
        displayLives.textContent = lives
        checkEndGame()
        addPlayer()
        return 
        
      }
    })
  })
}



//* Events 
startBtn.addEventListener('click', startGame)
playAgainBtn.addEventListener('click', playAgain)