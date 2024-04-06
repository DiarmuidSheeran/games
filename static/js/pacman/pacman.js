document.addEventListener('DOMContentLoaded', function() {
 
    let scoreDisplay = document.getElementById('score')
    let width = 28
    let score = 0
    let grid = document.querySelector('.grid')
    let level = 1;
    let ghostSpeed = 500;
    let movePacman;
    
    const moveLeftBtn = document.getElementById('moveLeftBtn');
    const moveRightBtn = document.getElementById('moveRightBtn');
    const moveUpBtn = document.getElementById('moveUpBtn');
    const moveDownBtn = document.getElementById('moveDownBtn');
    const footer = document.getElementById('main-footer');
    const startGameButton = document.getElementById('startGameButton');
    const restartGameButton = document.getElementById('restartGameButton');
    const startGame = document.getElementById('startGame');
    let gameStarted = false;

     // Add event listener for keyboard arrow key presses
    startGameButton.addEventListener('click', function() {
        gameStarted = true;
        startGame.style.display = 'block';
        startGameButton.style.display = 'none';
    });

    restartGameButton.addEventListener('click', function() {
        location.reload();
    });
   
    
        function initializeGame() {
            footer.style.display = 'none';
            const layout = [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
                1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
                1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
                1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
                4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
                1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
                1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
                1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
                1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
                1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
                1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
            ]
    
            // 0 - pac-dots
            // 1 - wal
            // 2 - ghost-lair
            // 3 - power-pellet
            // 4 - empty
    
            const squares = []
            // create board
            function createBoard() {
                for (let i = 0; i < layout.length; i++ ) {
                    const square = document.createElement('div')
                    square.id = i
                    grid.appendChild(square)
                    squares.push(square)
    
                    //add layout to the board
                    if (layout[i] === 0) {
                        squares[i].classList.add('pac-dot')
                    }
                    if (layout[i] === 1) {
                        squares[i].classList.add('wall')
                    }
                    if (layout[i] === 2) {
                        squares[i].classList.add('ghost-lair')
                    }
                    if (layout[i] === 3) {
                        squares[i].classList.add('power-pellet')
                    }
                }
            }
            createBoard()
    
            // Display level
            document.getElementById('level').textContent = level;
    
    
            moveLeftBtn.addEventListener('click', function() {
                movePacman('ArrowLeft');
            });
            moveRightBtn.addEventListener('click', function() {
                movePacman('ArrowRight');
            });
            moveUpBtn.addEventListener('click', function() {
                movePacman('ArrowUp');
            });
            moveDownBtn.addEventListener('click', function() {
                movePacman('ArrowDown');
            });
    
            document.addEventListener('keyup', function(e) {
                movePacman(e.key);
            });
        
    
            // Create charecters
            // Draw pac-man onto the board
            let pacmanCurrentIndex = 490
            squares[pacmanCurrentIndex].classList.add('pac-man')
    
            // Function to move Pac-Man
            function movePacman(direction) {
                // Remove the existing pac-man class
                squares[pacmanCurrentIndex].classList.remove('pac-man');
    
                // Move pac-man in the specified direction
                switch (direction) {
                    
                    case 'ArrowLeft':
                        if (
                            pacmanCurrentIndex % width !== 0 &&
                            !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
                            !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')
                        ) {
                            pacmanCurrentIndex -= 1;
                            squares[pacmanCurrentIndex].style.transform = 'scaleX(-1)';
                        }
                        if (squares[pacmanCurrentIndex - 1] === squares[363]) {
                            pacmanCurrentIndex = 391;
                        }
                        break;
    
                    case 'ArrowRight':
                        if (
                            pacmanCurrentIndex % width < width - 1 &&
                            !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
                            !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')
                        ) {
                            pacmanCurrentIndex += 1;
                            squares[pacmanCurrentIndex].style.transform = 'scaleX(1)';
                        }
                        if (squares[pacmanCurrentIndex + 1] === squares[392]) {
                            pacmanCurrentIndex = 364;
                        }
                        break;
    
                    case 'ArrowUp':
                        if (
                            pacmanCurrentIndex - width >= 0 &&
                            !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                            !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')
                        ) {
                            pacmanCurrentIndex -= width;
                            squares[pacmanCurrentIndex].style.transform = 'rotate(-90deg)';
                        }
                        break;
    
                    case 'ArrowDown':
                        if (
                            pacmanCurrentIndex + width < width * width &&
                            !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                            !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')
                        ) {
                            pacmanCurrentIndex += width;
                            squares[pacmanCurrentIndex].style.transform = 'rotate(90deg)';
                        }
                        break;
                }
    
                // Add the pac-man class to the new position
                squares[pacmanCurrentIndex].classList.add('pac-man');
                
                // Call the necessary functions after the movement
                pacDotEaten();
                powerPelleteEaten();
                checkForGameOver();
                checkForWin();
    
            }
            
    
    
            // What happens when you eat a pac-dot
            function pacDotEaten(){
                if(squares[pacmanCurrentIndex].classList.contains('pac-dot')){
                    score ++
                    scoreDisplay.innerHTML = score
                    squares[pacmanCurrentIndex].classList.remove('pac-dot')
                }
            }
    
            // Create ghosts using Constructer
            class Ghost {
                constructor(className, startIndex, speed){
                    this.className = className
                    this.startIndex = startIndex
                    this.speed = speed
                    this.currentIndex = startIndex
                    this.isScared = false
                    this.timerId = NaN
                }
            }
    
            // All my Ghosts
            const ghosts = [
                new Ghost ('blinky', 348, ghostSpeed),
                new Ghost ('pinky', 376, ghostSpeed),
                new Ghost ('inky', 351, ghostSpeed),
                new Ghost ('clyde', 379, ghostSpeed),
            ]
    
            // What happens when you eat a power-pellet
            function powerPelleteEaten(){
                if(squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
                    score += 10
                    scoreDisplay.innerHTML = score
                    ghosts.forEach(ghost => ghost.isScared = true)
                    setTimeout(unScareGhosts, 10000)
                    squares[pacmanCurrentIndex].classList.remove('power-pellet')
                }
            }
    
    
            // Make the Ghosts Not Scared
            function unScareGhosts() {
                ghosts.forEach(ghost => ghost.isScared = false)
            }
            
            // Draw Ghosts Onto the Grid
            ghosts.forEach(ghost => {
                squares[ghost.currentIndex].classList.add(ghost.className)
                squares[ghost.currentIndex].classList.add('ghost')
            })
    
            //move ghosts randomly
            ghosts.forEach(ghost => moveGhost(ghost))
    
            function moveGhost(ghost) {
                const initialDirection = [-1, 1, width, -width];
                const directions = [-1, 1, width, -width];
                let direction = initialDirection[0]; // Initial direction to move out of the ghost lair
            
                ghost.timerId = setInterval(function() {
            
                    // Save the previous index of the ghost
                    const previousIndex = ghost.currentIndex;
            
                    // If the ghost is still in the ghost lair and Pac-Man is on the same square, send the ghost back to the ghost lair
                    if (squares[ghost.currentIndex].classList.contains('pac-man')) {
                        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
                        score += 100
                        scoreDisplay.innerHTML = score
                        ghost.currentIndex = ghost.startIndex; // Send the ghost back to its initial position
                        ghost.isScared = false;
                        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
                        return; // Exit the function to prevent further movement
                    }
            
                    // If the ghost is still in the ghost lair, move according to initial direction
                    if (squares[ghost.currentIndex].classList.contains('ghost-lair')) {
                        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
                        ghost.currentIndex += direction;
                        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
                    } else {
                        // If the ghost has exited the ghost lair, move randomly
                        if (!squares[ghost.currentIndex + direction].classList.contains('ghost') && !squares[ghost.currentIndex + direction].classList.contains('wall')) {
                            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
                            ghost.currentIndex += direction;
                            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
                        } else {
                            // If blocked, find a new random direction
                            direction = directions[Math.floor(Math.random() * directions.length)];
                        }
                    }
            
                    // Handle scared ghost logic
                    if (ghost.isScared) {
                        squares[ghost.currentIndex].classList.add('scared-ghost');
                    }
            
                    // Remove 'no-border' class from pac-dot if ghost leaves the square
                    if (!squares[previousIndex].classList.contains('ghost') && squares[previousIndex].classList.contains('pac-dot')) {
                        squares[previousIndex].classList.remove('no-border');
                    }
            
                    // Toggle class to remove border from pac-dot if a ghost is on the same square
                    if (squares[ghost.currentIndex].classList.contains('pac-dot')) {
                        squares[ghost.currentIndex].classList.toggle('no-border');
                    }
                    // Check for game over
                    checkForGameOver();
                }, ghost.speed);
            }
    
        
    
            // Check for game over
            function checkForGameOver() {
                if (
                    squares[pacmanCurrentIndex].classList.contains('ghost') && !squares[pacmanCurrentIndex].classList.contains('scared-ghost')
                ){
                    restartGameButton.style.display = 'block';
                    ghosts.forEach(ghost => clearInterval(ghost.timerId))
                    document.removeEventListener('keyup', movePacman)
                    startGame.style.display = 'none';
                    document.getElementById('scoreForm').style.display = 'block';
                    document.getElementById('scoreInput').value = score;
                    setTimeout(function(){ alert('Game Over!\nYou Scored: ' + score + ' points!')}, 500)
                }
            }
    
            // Check for a Win
            function checkForWin() {
                let pelletsRemaining = 0;
    
                squares.forEach(square => {
                    if (square.classList.contains('pac-dot') || square.classList.contains('power-pellet')) {
                        pelletsRemaining++;
                    }
                });
    
                if (pelletsRemaining == 1) {
                    squares.forEach(square => {
                        square.classList.remove('pac-dot', 'power-pellet');
                    });
                    ghosts.forEach(ghost => clearInterval(ghost.timerId))
                    document.removeEventListener('keyup', movePacman)
                    // Clear the grid
                    grid.innerHTML = '';
                    
                    level++;
    
                    // Reset ghost speed
                    ghostSpeed -= 50;
                    
                    // Restart the game with the next level after a delay
                    setTimeout(initializeGame, 1000);
                }
    
            }
        }
        initializeGame();
    
       
    

    
    
})


    



