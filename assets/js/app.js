document.addEventListener("DOMContentLoaded", function () {
    const squares = $('.square');
    const mole = $('.mole');
    const time = $('#seconds');
    let score = $('#score');
    let speed = 1000;
    let result = 0;
    let hiScore = '';
    let hitPos = '';
    let randomPos = '';
    let squareHit = '';
    let currentTime = 0;
    let timerId = null;
    let timerId2 = null;
    let startBtn = $("#startBtn");

    function randomSquare() {
        squares.removeClass('hammer');
        squares.removeClass('mole');
        squares.addClass('grass');
        let randomId = Math.floor(Math.random() * 9);
        if (randomPos === squares.eq(randomId)) {
            randomId = Math.floor(Math.random() * 9);
        } else {
            randomPos = squares.eq(randomId);
        }
        randomPos.removeClass('grass').addClass('mole');
        hitPos = randomPos[0];
        return hitPos;
    }

    squares.click(function (square) {
        squareHit = square.target;
        if (squareHit === hitPos) {
            result = result + 1;
            score.text(result);
            randomPos.removeClass('mole').addClass('hammer');
        }
    });

    function countDown() {
        currentTime--;
        time.text(currentTime);
        console.log(currentTime);
        if (currentTime === 0) {
            squares.removeClass('mole');
            squares.addClass('grass');
            randomPos = '';
            hitPos = '';
            clearInterval(timerId);
            clearInterval(timerId2);
            console.log('game over');
            currentTime = time.text();
        }
    }

    function resetTime() {
        time.text(20);
        currentTime = time.text();
    }

    function speedChng() {
        if (currentTime >= 15) {
            speed = 900;
        } else if (currentTime >= 10) {
            speed = 700;
        } else if (currentTime >= 5) {
            speed = 500;
        } else {
            speed = 300;
        }
    }

    startBtn.click(function () {
        result = 0;
        score.text(0);
        resetTime();
        randomPos = '';
        hitPos = '';
        randomSquare();
        setTimeout(function () {
            countDown();
            speedChng();
            timerId2 = setInterval(randomSquare, speed);
            timerId = setInterval(countDown, 1000);
        }, 1000);
    });

})