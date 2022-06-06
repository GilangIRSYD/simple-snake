const CELL_SIZE = 20;
const BOARD_SIZE = 600;
function main() {
    const snakeBoard = document.getElementById('snakeBoard');
    const ctx = snakeBoard.getContext('2d')


    let snake = {
        x: 0,
        y: 0,
        score: 0,
        direction: 'RIGHT',
        color: 'orange',
        scoreBoard: document.getElementById('score1').getContext('2d')
    }

    let snake2 = {
        x: 0,
        y: 0,
        score: 0,
        direction: 'DOWN',
        color: 'blue',
        scoreBoard: document.getElementById('score2').getContext('2d')
    }

    let apple = {
        x: getRandomCoordinate(),
        y: getRandomCoordinate()
    }

    setInterval(() => {
        ctx.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE)
        //apple
        ctx.fillStyle = "red"
        ctx.fillRect(apple.x, apple.y, CELL_SIZE, CELL_SIZE);

        //snake
        ctx.fillStyle = snake.color
        ctx.fillRect(snake.x, snake.y, CELL_SIZE, CELL_SIZE);

        ctx.fillStyle = snake2.color
        ctx.fillRect(snake2.x, snake2.y, CELL_SIZE, CELL_SIZE);

        move(snake)
        move(snake2)
        eat(snake, apple)
        eat(snake2, apple)

    }, 100);

    document.addEventListener('keydown', ({ code }) => {
        if (code == 'ArrowUp') {
            snake.direction = 'UP'
        } else if (code == 'ArrowRight') {
            snake.direction = 'RIGHT'
        } else if (code == 'ArrowDown') {
            snake.direction = "DOWN"
        } else if (code == 'ArrowLeft') {
            snake.direction = "LEFT"
        }

        if (code == 'KeyW') {
            snake2.direction = 'UP'
        } else if (code == 'KeyD') {
            snake2.direction = 'RIGHT'
        } else if (code == 'KeyS') {
            snake2.direction = "DOWN"
        } else if (code == 'KeyA') {
            snake2.direction = "LEFT"
        }
    })

}

function move(snake) {
    if (snake.direction == 'UP') {
        snake.y -= CELL_SIZE
    } else if (snake.direction == 'RIGHT') {
        snake.x += CELL_SIZE
    } else if (snake.direction == 'DOWN') {
        snake.y += CELL_SIZE
    } else {
        snake.x -= CELL_SIZE
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

    if (snake.x < 0) {
        snake.x = BOARD_SIZE - CELL_SIZE
    }

    if (snake.y < 0) {
        snake.y = BOARD_SIZE - CELL_SIZE
    }

}

function eat(snake, apple) {
    if (snake.x == apple.x && snake.y == apple.y) {
        snake.score++
        apple.x = getRandomCoordinate()
        apple.y = getRandomCoordinate()
    }
    drawScore(snake)
}

function drawScore(snake) {
    console.log(snake)
    snake.scoreBoard.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE)
    snake.scoreBoard.font = "50px Arial"
    snake.scoreBoard.fillStyle = snake.color
    snake.scoreBoard.fillText(snake.score, 35, 65)
}

function getRandomCoordinate() {
    return ~~(Math.random() * 30) * CELL_SIZE
}
