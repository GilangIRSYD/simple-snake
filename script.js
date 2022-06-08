const CELL_SIZE = 20
const BOARD_SIZE = 600

function main() {
    const snkaeBoard = document.getElementById('snakeBoard')
    const ctx = snkaeBoard.getContext('2d')

    const snake = {
        x: 0,
        y: 0,
        color: 'orange',
        direction: 'RIGHT',
        score: 0,
        scoreBoard: document.getElementById('score1').getContext('2d')
    }

    const snake2 = {
        x: 400,
        y: 400,
        color: 'blue',
        direction: 'LEFT',
        score: 0,
        scoreBoard: document.getElementById('score2').getContext('2d')
    }

    const apple = {
        x: 200,
        y: 200,
        color: 'red'
    }

    setInterval(() => {
        ctx.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE)

        //apple
        ctx.fillStyle = apple.color
        ctx.fillRect(apple.x, apple.y, CELL_SIZE, CELL_SIZE)

        //snake
        ctx.fillStyle = snake.color
        ctx.fillRect(snake.x, snake.y, CELL_SIZE, CELL_SIZE)

        //snake2
        ctx.fillStyle = snake2.color
        ctx.fillRect(snake2.x, snake2.y, CELL_SIZE, CELL_SIZE)


        move(snake)
        eat(snake, apple)

        move(snake2)
        eat(snake2, apple)


    }, 100);

    document.addEventListener("keydown", ({ code }) => {
        if (code == 'ArrowDown') {
            snake.direction = 'DOWN'
        } else if (code == 'ArrowLeft') {
            snake.direction = 'LEFT'
        } else if (code == 'ArrowRight') {
            snake.direction = 'RIGHT'
        } else if (code == 'ArrowUp') {
            snake.direction = 'UP'
        }

        if (code == 'KeyS') {
            snake2.direction = 'DOWN'
        } else if (code == 'KeyA') {
            snake2.direction = 'LEFT'
        } else if (code == 'KeyD') {
            snake2.direction = 'RIGHT'
        } else if (code == 'KeyW') {
            snake2.direction = 'UP'
        }

        console.log(code)
    })
}

function move(snake) {
    if (snake.direction == 'DOWN') {
        snake.y += CELL_SIZE
    } else if (snake.direction == 'LEFT') {
        snake.x -= CELL_SIZE
    } else if (snake.direction == 'RIGHT') {
        snake.x += CELL_SIZE
    } else if (snake.direction == 'UP') {
        snake.y -= CELL_SIZE
    }

    teleport(snake)
}

function teleport(snake) {
    if (snake.x >= BOARD_SIZE) {
        snake.x = 0
    }

    if (snake.y >= BOARD_SIZE) {
        snake.y = 0
    }

    if (snake.y < 0) {
        snake.y = BOARD_SIZE - CELL_SIZE
    }

    if (snake.x < 0) {
        snake.x = BOARD_SIZE - CELL_SIZE
    }
}

function eat(snake, apple) {
    if (snake.x == apple.x && snake.y == apple.y) {
        snake.score++
        apple.x = getRandomCoordiante()
        apple.y = getRandomCoordiante()
    }
    drawScore(snake)
}

function getRandomCoordiante() {
    return ~~(Math.random() * 30) * CELL_SIZE
}


function drawScore(snake) {

    snake.scoreBoard.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE)
    snake.scoreBoard.font = "50px Arial"
    snake.scoreBoard.fillStyle = snake.color
    snake.scoreBoard.fillText(snake.score, 35, 65)
}