# Software Engineering Immersive - Project One #

A solo project in which we had to create a classic grid style game within 1 week.

# POKE-DASH (Frogger) #
Armed with a brief, I had 1 week to make a game which was playable, had auto-generated obstacles and was fun (hopefully). I created a Pokemon themed Frogger game.

## Brief ##
* Render a game in the browser.
* Include separate HTML / CSS / JavaScript files.
* Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles.
* Use JavaScript for DOM manipulation.
* Deploy your game online, where the rest of the world can access it.
* Use semantic markup for HTML and CSS (adhere to best practises).
 
## Built With ##
* HTML 
* CSS
* Vanilla JavaScript
* Git
* GitHub

## Playing Instructions ## 
The aim is to get the Charmander safely across the grid. Whilst doing so the player must avoid the other Pokemon who are moving at different speeds to try and catch you out & cause a collision. After avoiding the other Pokemon the player must navigate their way over the river, remembering Charmander is a fire type Pokemon, so touching any water will result in losing a life. 
The player has a total of 3 lives. 
Movement is based on: WASD.
 
## Deployment ##
The deployed game can be found [**here**](https://joefreeman8.github.io/sei-project-one/ "here.")

![gameplay](/assets/gameplay.gif)

## Planning ##
The wireframe was created using Excalidraw:

![wireframe](/assets/wireframe.png)

By creating the plan this way I was able to easily visualise how my game would play and list all the features I wanted to include. 
I had originally planned to make it a Rick and Morty theme (hence a randomised final portal/end goal) however after struggling to find any good sprites I switched to a Pokemon theme and made the portal a pokeball. 

## Creating The Grid ##
First things first, create the surface in which the Pokemon can run and the logs can float. To do this I used DOM manipulation where I pushed cells into an empty div to create my grid. 
I opted for 11 cells wide and 13 cells in height, and used the for loop below to create the grid. 
```js
function createGrid() {
 for (let i = 0; i < gridCellCount; i++) {
   const cell = document.createElement('div')
   cell.setAttribute('data-index', i)
   cells.push(cell)
   grid.appendChild(cell)
 }
}
 
createGrid()
```

## Start Game ##
I created a function to start the game, this helped me create a landing screen prompting you to click a Poke-ball to play. This will then display the grid on which the game is played, the lives which the player has and also the Poke-ball end goal. All of the game movement mechanics also live within this function. 
```js
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
 ```

## The Player ##
For the player movement I created a switch statement and applied a “keyup” addEventListener.
Each time the player moves the game will check a function named checkEndGame which is explained in greater detail in the Win/Lose section below.

## Obstacles ##
Each line of obstacles ran on its own timer and in its own direction. This was achieved by passing many arguments to the functions which allowed me to customise each obstacle, log or water cell as required.
```js
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
```
The above just demonstrates each enemy, however I created replica functions for the log movement & water movement too, again allowing for greater customisation on each line of the game.

To overcome the challenge of the log and water stage, I gave water cells the same killing abilities as the enemy Pokemon, and the log cells act just as any other ordinary cell on the grid, therefore providing safety for the player.

Every time any enemy Pokemon or water cell moves, it will check for a collision.

## Player Lives ##
Every obstacle hit or Poke-toe (Pokemons toe 👀) which gets wet will result in a life lost and the player will be sent back to the starting cell. Once all lives are lost the player will be prompted to open another Pokeball which will allow for the game to be reset.
In order to do this I created a handleLose function which would move the player position back to the start, minus a life and then check if it’s the end of game.
```js
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
 ```

## Winning / Losing The Game ##
If the player reaches the safety of the Poke-ball they win the game, Great News!… or if the player loses all their lives they lose the game, less great news.
I achieved this by adding a checkEndGame function which is called every time a player moves or has a collision with an obstacle/water.
```js
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
```
The endGame function in the code block above is then called, the grid is removed and score is displayed.
```js
function endGame(endgamestatement) {
 grid.classList.remove('grid')
 displayScore.innerHTML = endgamestatement
 playAgainBtn.style.visibility = 'visible'
 clearInterval(timer = setInterval)
 removePlayer()
}
```
A play again button will also appear, If clicked it will reset the game & run the initial startGame function again.
```js
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
```

## Challenges ##
* Overcoming the water/log conundrum, again this took a bit of time & thinking how do I “turn off” the kill function of the logs but keep the water a death zone. Eventually I realised it would work by treating the water like any of the other obstacles in the game, and treating the logs as safe space. Each is their own separate array which are synced perfectly together.
* Playing the game again after winning or losing would make the interval timers implemented in my code to run again, giving the effect that everything was 2x speed. I created a work around of this with `window.restart()` in my code which refreshed the browser.

## Bugs ## 
* The point of no return - this bug comes from the way I set up the player movement with the irregular grid size. It affects the game by not allowing the player to move backwards in the first two rows of the grid. Between you and me, it’s a good bug, stops the ‘poke-dash campers’.
* The score mechanic, when reaching the pokeball may notice your score increases 1000 points per millisecond for eternity.

## Future Improvements ##
* Bug fixes.
* Have Charmander travel on the same timer as the log he(?) is standing on.
* Add sound to the game.
* Add a death icon when losing a life.
* Add levels. This game being Pokemon based has great potential for added features like Pokemon evolution as you progress through the levels. 
* Create a scoreboard.
* Give the game a time limit.
* Have score increase for each forward movement + time bonus.

## Wins & Key Learnings ##
Bugs are an essential part of life, and planet Earth would not survive without them…

Also, how incredibly useful it is to use arrays and the art of refactoring with the use of multiple arguments in functions. You can see in the history of my commits, initially they consisted of no arrays, this was my first solo lesson in how not to code. I quickly realised my code was not ‘DRY’ and it could be better. I implemented arrays, so each row of obstacles were linked together by one array, this saved me writing a function for each individual obstacle. Next, I brought in the use of arguments within my functions, meaning I could control multiple arrays from one function. This was a challenge, a key learning and a win for me.

This project really enabled me to learn how functions can interact with each other and also how keeping the readability of your code clean and uncluttered helps a lot with debugging.

