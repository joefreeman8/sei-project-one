//  Create the grid
// * Game starts by hitting Space bar
//  Create frogger start point 
// Frogger needs to be able to move on the grid
// Frogger needs a working end goal
//* Points added to score board 
//* Obsticles need to be made
//* collisions need to be made



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
// const froggerStartPosition = 137

let score = 0
let froggerPosition = 137

let obstacleOnePositionA = 111
let obstacleOnePositionB = 115
let obstacleOnePositionC = 119

let obstacleTwoPositionA = 99
let obstacleTwoPositionB = 105

let obstacleThreePartOnePositionA = 97
let obstacleThreePartTwoPositionA = 98




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

function addObstaclesOne() {
  cells[obstacleOnePositionA].classList.add('obstacle-one-a')
  cells[obstacleOnePositionB].classList.add('obstacle-one-b')
  cells[obstacleOnePositionC].classList.add('obstacle-one-c')
}

function removeObstaclesOne() {
  cells[obstacleOnePositionA].classList.remove('obstacle-one-a')
  cells[obstacleOnePositionB].classList.remove('obstacle-one-b')
  cells[obstacleOnePositionC].classList.remove('obstacle-one-c')
}


function addObstaclesTwo() {
  cells[obstacleTwoPositionA].classList.add('obstacle-two-a')
  cells[obstacleTwoPositionB].classList.add('obstacle-two-b')
}

function removeObstaclesTwo() {
  cells[obstacleTwoPositionA].classList.remove('obstacle-two-a')
  cells[obstacleTwoPositionB].classList.remove('obstacle-two-b')
}

function addObstaclesThree() {
  cells[obstacleThreePartOnePositionA].classList.add('obstacle-three-one-a')
  cells[obstacleThreePartTwoPositionA].classList.add('obstacle-three-two-a')
}

function removeObstaclesThree() {
  cells[obstacleThreePartOnePositionA].classList.remove('obstacle-three-one-a')
  cells[obstacleThreePartTwoPositionA].classList.remove('obstacle-three-two-a')
}
function endGame() {
  window.location.reload()
}

function handleStart() {
  if (startBtn === false) {
    return
  }


  addFrogger()                     //* this frogger helps the reset after win/lose          
  addPortal()



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

      default:
        console.log('key not recognised')
    }
    addFrogger()
    handleLose()
    handleWin() 
  }

  document.addEventListener('keyup', handleKeyControls)

  //***************************
  //* implementing Obstacles *
  //***************************
  //? How to make multiple obstacles on one line
  //? How to make larger obstacles taking two div's 


  function obstacleOneA() {
    setInterval(() => {
      removeObstaclesOne()
      if (obstacleOnePositionA >= 120) {
        obstacleOnePositionA = 110
        addObstaclesOne()
      } else {
        obstacleOnePositionA++ 
        addObstaclesOne()
      }
    }, 600)
  
  }
  obstacleOneA()

  function obstacleOneB() {
    setInterval(() => {
      removeObstaclesOne()
      if (obstacleOnePositionB >= 120) {
        obstacleOnePositionB = 110
        addObstaclesOne()
      } else { 
        obstacleOnePositionB++ 
        addObstaclesOne()
      }
    }, 600)
  
  }
  obstacleOneB()

  function obstacleOneC() {
    setInterval(() => {
      removeObstaclesOne()
      if (obstacleOnePositionC >= 120) {
        obstacleOnePositionC = 110
        addObstaclesOne()
      } else { 
        obstacleOnePositionC++ 
        addObstaclesOne()
      }
    }, 600)
  
  }
  obstacleOneC()


  function obstacleTwoA() {
    setInterval(() => {
      removeObstaclesTwo()
      if (obstacleTwoPositionA >= 109) {
        obstacleTwoPositionA = 99
        addObstaclesTwo()
      } else {
        obstacleTwoPositionA++ 
        addObstaclesTwo()
      }
    }, 150)
  
  }
  obstacleTwoA()

  function obstacleTwoB() {
    setInterval(() => {
      removeObstaclesTwo()
      if (obstacleTwoPositionB >= 109) {
        obstacleTwoPositionB = 99
        addObstaclesTwo()
      } else {
        obstacleTwoPositionB++ 
        addObstaclesTwo()
      }
    }, 150)
  
  }
  obstacleTwoB()



  function obstaclesThreePartOneA() {
    setInterval(() => {
      removeObstaclesThree()
      if (obstacleThreePartOnePositionA <= 88) {
        obstacleThreePartOnePositionA = 98
      } else {
        obstacleThreePartOnePositionA-- 
        addObstaclesThree()
      
      }
    }, 600)
  
  }
  obstaclesThreePartOneA()

  function obstaclesThreePartTwoA() {
    setInterval(() => {
      removeObstaclesThree()
      if (obstacleThreePartTwoPositionA <= 88) {
        obstacleThreePartTwoPositionA = 98
        addObstaclesThree()
      } else {
        obstacleThreePartTwoPositionA-- 
        addObstaclesThree()
      
      }
    }, 600)
  
  }
  obstaclesThreePartTwoA()

  //********************************** 
  //* Creating Win / Lose collisions*            
  //********************************* 


  //? Collisions are only working when frogger hits an obstacle, not when an obsacle hits frogger.

  function handleLose() {
    if (obstacleOnePositionA === froggerPosition ||
    obstacleOnePositionB === froggerPosition ||
    obstacleOnePositionC === froggerPosition ||

    obstacleTwoPositionA === froggerPosition || 
    obstacleTwoPositionB === froggerPosition ||

    obstacleThreePartOnePositionA === froggerPosition ||
    obstacleThreePartTwoPositionA === froggerPosition) {
      console.log('you lose')
      window.alert('dead')
      endGame()
    }
  }

  function handleWin() {
    if (finalPortal === froggerPosition) {
      score = score + 100
      displayScore.textContent = score
      // window.alert('you win', score)
      handleStart()
    }
  } 
}

//* Events 
startBtn.addEventListener('click', handleStart)


