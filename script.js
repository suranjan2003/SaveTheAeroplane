
let score = 0;
let maxscore = 0;
let notcrossed = true;
let intervalId; // Store the interval ID for later use
let isPlaying = false; // Flag to indicate if the game is in progress

document.onkeydown = function(e) {
    if (!isPlaying) return; // Prevent actions if the game is not playing

    console.log("key code is: ", e.keyCode);
    let myPlane = document.querySelector('.myPlane');
    let getX = parseInt(window.getComputedStyle(myPlane, null).getPropertyValue('left'));
    
    if (e.keyCode == 38) {
        myPlane.classList.add('animatePlane');
        setTimeout(() => {
            myPlane.classList.remove('animatePlane');
        }, 700);
    }
    if (e.keyCode == 39 && getX < window.innerWidth - myPlane.clientWidth) {
        myPlane.style.left = getX + 100 + "px";
    }
    if (e.keyCode == 37 && getX > 0) {
        myPlane.style.left = getX - 100 + "px";
    }
}

function reloadGame() {
    window.location.reload(); // Simply reload the page to reset the game
}

function startGame() {
    isPlaying = true; // Set the game to playing state
    score = 0;
    notcrossed = true;
    // enemySpeed = 5; // Reset enemy speed
    const scoreCont = document.getElementById('scoreCont');
    scoreCont.innerHTML = "Your Score: " + score;
    document.querySelector('.gameOver').innerHTML = "The Aero Adventure Game"; // keep the tittle mssge
    document.querySelector('.enemy').classList.add('moveEnemy'); // Start enemy movement
    document.querySelector('.myPlane').style.left = '50px'; // Reset player position
 
    // Start the game loop
    intervalId = setInterval(() => {
        if (!isPlaying) return; // Skip the loop if the game is not playing

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
            gameOver.innerHTML = "Game Over !";
            enemy.classList.remove('moveEnemy'); // Stop enemy movement
            me.style.left = '50px'; // Reset player position
            notcrossed = false;
            clearInterval(intervalId); // Stop the game loop
            isPlaying = false; // Set the game to not playing state
            if(score > maxscore) {
                newMaxscore(score);
                maxscore = score;
            }

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

function newScore(score) {
    const scoreCont = document.getElementById('scoreCont');
    scoreCont.innerHTML = "Your Score: " + score;
}

function newMaxscore(maxscore){
    const scoreCont = document.getElementById('maxScoreCont');
    scoreCont.innerHTML = "Max Score: " + score;
}
