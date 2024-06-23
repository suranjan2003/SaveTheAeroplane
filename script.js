score = 0;
notcrossed = true;
let intervalId; // Store the interval ID for later use
document.onkeydown = function(e){
    console.log("key code is: ", e.keyCode);
    if(e.keyCode == 38){
        myPlane = document.querySelector('.myPlane'); /**get that class which is myPlane */
        myPlane.classList.add('animatePlane');
        setTimeout(() => {
            myPlane.classList.remove('animatePlane');
        }, 700);
    }
    if(e.keyCode == 39){
        myPlane = document.querySelector('.myPlane');
        getX = parseInt(window.getComputedStyle(myPlane,null).getPropertyValue('left'));
        myPlane.style.left = getX + 100 + "px";
    }
    if(e.keyCode == 37){
        myPlane = document.querySelector('.myPlane');
        getX = parseInt(window.getComputedStyle(myPlane,null).getPropertyValue('left'));
        myPlane.style.left = getX - 100 + "px";
    }
}

function reloadGame() {
    // Simply reload the page to reset the game
    window.location.reload();
}

function startGame() {
    intervalId = setInterval(() => {
        let me = document.querySelector('.myPlane');
        let gameOver = document.querySelector('.gameOver');
        let enemy = document.querySelector('.enemy');

        let mx = parseInt(window.getComputedStyle(me, null).getPropertyValue('left'));
        let my = parseInt(window.getComputedStyle(me, null).getPropertyValue('top'));
        let ex = parseInt(window.getComputedStyle(enemy, null).getPropertyValue('left'));
        let ey = parseInt(window.getComputedStyle(enemy, null).getPropertyValue('top'));

        let offsetX = Math.abs(mx - ex);
        let offsetY = Math.abs(my - ey);

        if (offsetX < 170 && offsetY < 110) {
            gameOver.innerHTML = "Game Over -> Reload";
            enemy.style.animationDuration = '0s'; // Stop enemy movement
            me.style.left = '50px'; // Reset player position
            notcrossed = false;
            clearInterval(intervalId); // Stop the game loop
        } else if (offsetX < 145 && notcrossed) {
            score += 1;
            newScore(score);
            notcrossed = false;
            setTimeout(() => {
                notcrossed = true;
            }, 1000);
        }
    }, 100);
}

startGame();

function newScore(score){
    scoreCont.innerHTML = "Your Score: "+ score;
}