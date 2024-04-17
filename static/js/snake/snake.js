let lastRenderTime = 0
const SNAKE_SPEED = 5
let food = {x: 10, y: 1}
const snakeBody = [
    {x: 11, y: 11}
]

const gameBoard = document.getElementById('game-board')
let inputDirection = {x: 0, y: 0}
let lastInputDirection = {x:0, y:0}

const EXPANSION_RATE = 1
let newSegments = 0



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
        food = { x: 20, y: 10}
    }

    //Snake
    const inputDirection = getInputDirection()
    for (let i = snakeBody.length -2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i]}
    }

    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
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

function onSnake(position){
    return snakeBody.some(segement =>{
        return equalPositions(segement, position)
    })
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

