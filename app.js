document.addEventListener('DOMContentLoaded', () => {
    const BIRD = document.querySelector('.bird');
    const GAME_DISPLAY = document.querySelector('.game-container');
    const GROUND = document.querySelector('.ground');
    const GAP = 430;

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 2;
    let isGameOver = false;

    function startGame() {
        birdBottom -= gravity;
        BIRD.style.bottom = birdBottom + 'px';
        BIRD.style.left = birdLeft + 'px';
    }

    let gameTimerId = setInterval(startGame, 20);

    function control(e) {
        switch(e.type) {
            case 'keyup':
                if (e.keyPress == 32) {
                    jump();
                }
            case 'touchend':
                jump();
        }
    }

    function jump() {
        if (birdBottom < 500) birdBottom += 50;
        BIRD.style.bottom = birdBottom + 'px';
    }

    document.addEventListener('keyup', control);
    document.addEventListener('touchend', control);

    function generateObstacle() {
        let obstacleLeft = 500;
        let randomHeight = Math.random() * 60;
        let obstacleBottom = randomHeight;

        const OBSTACLE = document.createElement('div');
        const TOP_OBSTACLE = document.createElement('div');

        if (!isGameOver) {
            OBSTACLE.classList.add('obstacle');
            TOP_OBSTACLE.classList.add('topObstacle');
        }

        GAME_DISPLAY.appendChild(OBSTACLE);
        GAME_DISPLAY.appendChild(TOP_OBSTACLE);

        OBSTACLE.style.left = obstacleLeft + 'px';
        TOP_OBSTACLE.style.left = obstacleLeft + 'px';

        OBSTACLE.style.bottom = obstacleBottom + 'px';
        TOP_OBSTACLE.style.bottom = obstacleBottom + GAP + 'px';

        function moveObstacle() {
            obstacleLeft -= 2;
            OBSTACLE.style.left = obstacleLeft + 'px';
            TOP_OBSTACLE.style.left = obstacleLeft + 'px';

            if (obstacleLeft === -60) {
                clearInterval(timerId);
                GAME_DISPLAY.removeChild(OBSTACLE);
                GAME_DISPLAY.removeChild(TOP_OBSTACLE);
            }

            if (obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200) ||
                birdBottom === 0) {
                gameOver();
                clearInterval(timerId);
            }
        }

        let timerId = setInterval(moveObstacle, 20);
        if (!isGameOver) setTimeout(generateObstacle, 3000);
    }

    generateObstacle();

    function gameOver() {
        clearInterval(gameTimerId);
        isGameOver = true;
        document.removeEventListener('keyup', control);
        document.removeEventListener('touchend', control);
    }
});