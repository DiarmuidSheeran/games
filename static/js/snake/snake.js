let lastRenderTime = 0
const SNAKE_SPEED = 5
GRID_SIZE = 21

const snakeBody = [
    {x: 11, y: 11}
]
let food = getRandomFoodPosition()
const gameBoard = document.getElementById('game-board')
let inputDirection = {x: 0, y: 0}
let lastInputDirection = {x:0, y:0}

const EXPANSION_RATE = 1
let newSegments = 0
let gameOver = false



window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (lastInputDirection.y !== 0) break
            inputDirection = { x: 0, y: -1}
            break
        case 'ArrowDown':
            if (lastInputDirection.y !== 0) break
            inputDirection = { x: 0, y: 1}
            break
        case 'ArrowLeft':
            if (lastInputDirection.x !== 0) break
            inputDirection = { x: -1, y: 0}
            break
        case 'ArrowRight':
            if (lastInputDirection.x !== 0) break
            inputDirection = { x: 1, y: 0}
            break
    }
        
    
})

function main(currentTime) {
    if (gameOver){
        if(confirm('You Lost. Press Ok to Restart')) {
            window.location = '/snake/game/'
        }
        return 
    }
        
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    console.log('Render')
    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main)

function getInputDirection(){
    lastInputDirection = inputDirection
    return inputDirection
}

function update(){
    //Food
    if (onSnake(food)){
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPosition()
    }

    //Snake
    const inputDirection = getInputDirection()
    for (let i = snakeBody.length -2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i]}
    }

    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y

    checkDeath()
}

function draw(){
    gameBoard.innerHTML = ""

    //Food
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)

    //Snake
    addSegments()
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}

function expandSnake(amount) {
    newSegments += amount
}

function onSnake(position, {ignoreHead = false} = {}){
    return snakeBody.some((segement, index) =>{
        if (ignoreHead && index === 0 ) return false
        return equalPositions(segement, position)
    })
}

function getSnakeHead() {
    return snakeBody[0]
}

function snakeIntersection() {
    return onSnake(snakeBody[0], {ignoreHead: true})
}


function equalPositions(pos1, pos2){
    return (
        pos1.x === pos2.x && pos1.y === pos2.y
    )
}

function addSegments(){
    for (let i =0; i < newSegments; i++){
     snakeBody.push({ ...snakeBody[snakeBody.length -1]})
    }

    newSegments = 0
}

function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
}

function outsideGrid(position) {
    return (
        position.x < 1 || position.x > GRID_SIZE ||
        position.y < 1 || position.y > GRID_SIZE
    )
}

function getRandomFoodPosition() {
    let newFoodPosition
    while(newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}


