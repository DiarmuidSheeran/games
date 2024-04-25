let scoreDisplay = document.getElementById('score')
let finalScore = document.getElementById('finalScore')
let score = 0
const startBtn = document.getElementById('startBtn');
const levelSelect = document.getElementById('level');
startBtn.addEventListener('click', startGame);
const resultForm = document.querySelector('.form');
let gameBoard = document.getElementById('game-board')
let scoreBoard = document.getElementById('scoreBoard')
let snakeStartGame = document.getElementById('snakeStartGame')
const moveLeftBtn = document.getElementById('moveLeftBtn');
const moveRightBtn = document.getElementById('moveRightBtn');
const moveUpBtn = document.getElementById('moveUpBtn');
const moveDownBtn = document.getElementById('moveDownBtn');
const footer = document.getElementById('main-footer');
const gameOverMessage = document.getElementById('gameOverMessage');


function startGame(){
    let selectedLevel = levelSelect.value;
    snakeStartGame.style.display = 'none';
    scoreBoard.style.display = 'block';
    gameBoard.style.display = 'grid';
    controler.style.display = 'block';
    footer.style.display = 'none';

    // Move Up
    moveUpBtn.addEventListener('touchstart', () => {
        if (lastInputDirection.y !== 0) return;
        inputDirection = { x: 0, y: -1 };
    });

    // Move Down
    moveDownBtn.addEventListener('touchstart', () => {
        if (lastInputDirection.y !== 0) return;
        inputDirection = { x: 0, y: 1 };
    });

    // Move Left
    moveLeftBtn.addEventListener('touchstart', () => {
        if (lastInputDirection.x !== 0) return;
        inputDirection = { x: -1, y: 0 };
    });

    // Move Right
    moveRightBtn.addEventListener('touchstart', () => {
        if (lastInputDirection.x !== 0) return;
        inputDirection = { x: 1, y: 0 };
    });


    let lastRenderTime = 0
let SNAKE_SPEED = selectedLevel
GRID_SIZE = 21

const snakeBody = [
    {x: 11, y: 11}
]
let food = getRandomFoodPosition()
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
        document.getElementById('scoreInput').value = score;
        resultForm.style.display = 'block';
        gameBoard.style.display = 'none';
        controler.style.display = 'none';
        footer.style.display = 'block';
        gameOverMessage.style.display = 'block';
        scoreBoard.style.display = 'none';
        finalScore.innerHTML = score;
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
        score += parseInt(selectedLevel)
        scoreDisplay.innerHTML = score
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
}

