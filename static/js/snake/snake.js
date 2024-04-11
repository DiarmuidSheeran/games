const grid = document.querySelector('.grid');
const width = 15;
let currentSnakeIndex = [112];
let currentFoodIndex = 90;

for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.grid div'));

currentSnakeIndex.forEach(index => squares[index].classList.add('snake'));
squares[currentFoodIndex].classList.add('food');

function moveSnake(e) {
    squares[currentSnakeIndex].classList.remove('snake');
    switch (e.key) {
        case 'ArrowLeft':
            if (currentSnakeIndex % width !== 0) currentSnakeIndex -= 1;
            break;
        case 'a':
            if (currentSnakeIndex % width !== 0) currentSnakeIndex -= 1;
            break;
        case 'ArrowRight':
            if (currentSnakeIndex % width < width - 1) currentSnakeIndex += 1;
            break;
        case 'd':
            if (currentSnakeIndex % width < width - 1) currentSnakeIndex += 1;
            break;
        case 'ArrowUp':
            if (currentSnakeIndex - width >= 0) currentSnakeIndex -= width;
            break;
        case 'w':
            if (currentSnakeIndex - width >= 0) currentSnakeIndex -= width;
            break;
        case 'ArrowDown':
            if (currentSnakeIndex + width < width * width) currentSnakeIndex += width;
            break;
        case 's':
            if (currentSnakeIndex + width < width * width) currentSnakeIndex += width;
            break;
    }
    squares[currentSnakeIndex].classList.add('snake');
    checkfoodEaten()
}


function checkfoodEaten(){
    if (squares[currentSnakeIndex].classList.contains('food')){
        squares[currentSnakeIndex].classList.remove('food');

        generateFood();
        currentSnakeIndex.push(currentSnakeIndex[currentSnakeIndex.length - 1])
    }

}

function generateFood() {
    currentFoodIndex = Math.floor(Math.random() * squares.length);
    while (squares[currentFoodIndex].classList.contains('snake')) {
        currentFoodIndex = Math.floor(Math.random() * squares.length);
    }
    squares[currentFoodIndex].classList.add('food');
}

document.addEventListener('keydown', moveSnake);

console.log(squares)