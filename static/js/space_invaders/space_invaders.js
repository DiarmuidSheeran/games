const grid = document.querySelector('.grid');
const resultDisplay = document.querySelector('.results');
const scoreText = document.querySelector('.score');
const resultForm = document.querySelector('.form');
const recordResult = document.querySelector('.recordResult');
const leaderboard = document.querySelector('.leaderboard');
const scorecard = document.querySelector('.scorecard');
const mainBanner = document.querySelector('.main-banner-game');
const width = 15;
const aliensRemoved = [];
let currentShooterIndex = 202;
let invadersId;
let isGoingRight = true;
let direction = 1;
let results = 0;
let result = 0;
var game_won = false;
const levelSelect = document.getElementById('level');
const moveLeftBtn = document.getElementById('moveLeftBtn');
const moveRightBtn = document.getElementById('moveRightBtn');

mainBanner.style.display = 'none';

const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', startGame);
let gameStarted = false;

const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', function() {
    location.reload();
});

const resultsBtn = document.getElementById('resultsBtn');
resultsBtn.style.display = 'none'; // Hide initially


function startGame(event) {
    const selectedLevel = levelSelect.value;
    let speed;
    switch (selectedLevel) {
        case '1':
            speed = 600; // Adjust speed for Level 1
            break;
        case '2':
            speed = 500; // Adjust speed for Level 2
            break;
        case '3':
            speed = 400; // Adjust speed for Level 3
            break;
        case '4':
            speed = 300; // Adjust speed for Level 3
            break;
        case '5':
            speed = 200; // Adjust speed for Level 3
            break;
        case '6':
            speed = 100; // Adjust speed for Level 3
            break;
    }
    if (!gameStarted) {
        gameStarted = true;
        scoreText.style.display = 'block';
        resultDisplay.style.display = 'block';
        startBtn.style.display = 'none';
        scorecard.style.display = 'block';
        mainBanner.style.display = 'block';
        document.querySelectorAll('.leaderboard').forEach(element => {
            element.style.display = 'none';
        });

        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            grid.appendChild(square);
        }

        const squares = Array.from(document.querySelectorAll('.grid div'));

        const alienInvaders = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
            30, 31, 32, 33, 34, 35, 36, 37, 38, 39
        ];

        function draw() {
            for (let i = 0; i < alienInvaders.length; i++) {
                if (!aliensRemoved.includes(i)) {
                    squares[alienInvaders[i]].classList.add('invader');
                }
            }
        }
        draw();

        squares[currentShooterIndex].classList.add('shooter');

        function remove() {
            for (let i = 0; i < alienInvaders.length; i++) {
                squares[alienInvaders[i]].classList.remove('invader');
            }
        }

        function moveShooter(e) {
            squares[currentShooterIndex].classList.remove('shooter');
            switch (e.key) {
                case 'ArrowLeft':
                    if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
                    break;
                case 'a':
                    if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
                    break;
                case 'ArrowRight':
                    if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
                    break;
                case 'd':
                    if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
                    break;
            }
            squares[currentShooterIndex].classList.add('shooter');
        }
        moveLeftBtn.addEventListener('click', function() {
            moveShooter({ key: 'ArrowLeft' }); 
        });
        
        moveRightBtn.addEventListener('click', function() {
            moveShooter({ key: 'ArrowRight' }); 
        });
        document.addEventListener('keydown', moveShooter);

        function moveInvaders() {
            const leftEdge = alienInvaders[0] % width === 0;
            const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
            remove();

            if (rightEdge && isGoingRight) {
                for (let i = 0; i < alienInvaders.length; i++) {
                    alienInvaders[i] += width + 1;
                    direction = -1;
                    isGoingRight = false;
                }
            }

            if (leftEdge && !isGoingRight) {
                for (let i = 0; i < alienInvaders.length; i++) {
                    alienInvaders[i] += width - 1;
                    direction = 1;
                    isGoingRight = true;
                }
            }
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += direction;
            }
            draw();

            const shooterRow = Math.floor(currentShooterIndex / width);
            const invadersRows = alienInvaders.map(index => Math.floor(index / width));
            if (invadersRows.includes(shooterRow)){
                scoreText.innerHTML = 'GAME OVER!';
                resultDisplay.innerHTML = 'SCORE: ' + result;
                clearInterval(invadersId);
            
                document.removeEventListener('keydown', moveShooter);
                document.removeEventListener('keydown', shoot);
                document.removeEventListener('click', shoot);

                const squares = document.querySelectorAll('.grid div');
                squares.forEach(square => square.classList.remove('invader'));
                squares[currentShooterIndex].classList.remove('shooter');

               
                setTimeout(() => {
                    recordResult.style.display = 'block';
                    resetBtn.style.display = 'block';
                    resultForm.style.display = 'block';
                    document.getElementById('scoreInput').value = result;
                }, 1000);
            
             
            }
             
            const winning_condition = aliensRemoved.length >= alienInvaders.length;
            if (winning_condition) {
                document.removeEventListener('keydown', moveShooter);
                document.removeEventListener('keydown', shoot);
                document.removeEventListener('click', shoot);
                endGame();
            }
        }
        invadersId = setInterval(moveInvaders, speed);

        function shoot(e) {
            let laserId;
            let currentLaserIndex = currentShooterIndex;

            function moveLaser() {
                squares[currentLaserIndex].classList.remove('laser');
                currentLaserIndex -= width;
                squares[currentLaserIndex].classList.add('laser');

                if (squares[currentLaserIndex].classList.contains('invader')) {
                    squares[currentLaserIndex].classList.remove('laser');
                    squares[currentLaserIndex].classList.remove('invader');
                    squares[currentLaserIndex].classList.add('boom');

                    setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300);
                    clearInterval(laserId);

                    const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
                    aliensRemoved.push(alienRemoved);
                    results += 1;
                    result = results * selectedLevel;
                    resultDisplay.innerHTML = result;
                }
            }

            switch (e.type) {
                case 'keydown':
                    switch (e.key) {
                        case 'ArrowUp':
                        case ' ':
                            laserId = setInterval(moveLaser, 100);
                            break;
                    }
                    break;
                case 'click':
                    if (e.button === 0) {
                        laserId = setInterval(moveLaser, 100);
                    }
                    break;
            }
        }
        document.addEventListener('keydown', shoot);
        document.addEventListener('click', shoot);
    }
}

function endGame() {
    scoreText.style.display = 'block';
    resultDisplay.style.display = 'block';
    scoreText.innerHTML = game_won ? 'YOU WIN! <br>' : 'GAME OVER! <br>';
    resultDisplay.innerHTML = 'SCORE: ' + result;
    game_won = true;
    setTimeout(() => {
        recordResult.style.display = 'block';
        resetBtn.style.display = 'block';
        resultForm.style.display = 'block';
        document.getElementById('scoreInput').value = result;
    }, 1000);

    squares[currentShooterIndex].classList.remove('shooter');
    const squares = document.querySelectorAll('.grid div');
    squares.forEach(square => square.classList.remove('invader'));

    
}