score = 0;
notcrossed = true;
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
        getX = parseInt(window.getComputedStyle(me,null).getPropertyValue('left'));
        myPlane.style.left = getX + 100 + "px";
    }
    if(e.keyCode == 37){
        myPlane = document.querySelector('.myPlane');
        getX = parseInt(window.getComputedStyle(me,null).getPropertyValue('left'));
        myPlane.style.left = getX - 100 + "px";
    }
}

setInterval(() => {
    me = document.querySelector('.myPlane');
    gameOver = document.querySelector('.gameOver');
    enemy = document.querySelector('.enemy');

    mx = parseInt(window.getComputedStyle(me,null).getPropertyValue('left'));
    my = parseInt(window.getComputedStyle(me,null).getPropertyValue('top'));
    ex = parseInt(window.getComputedStyle(enemy,null).getPropertyValue('left'));
    ey = parseInt(window.getComputedStyle(enemy,null).getPropertyValue('top'));

    offsetX = Math.abs(mx-ex);
    offsetY = Math.abs(my-ey);

    if(offsetX<100 && offsetY<50){
        gameOver.innerHTML = "Game Over -> Reload";
        enemy.classList.remove('moveEnemy');
        me.style.left = 50 + "px";
        notcrossed=false;
    }
    else if(offsetX<145 && notcrossed){
        score+=1;
        newScore(score);
        notcrossed = false;
        setTimeout(() => {
            notcrossed = true;
        }, 1000);
    }
}, 100);

function newScore(score){
    scoreCont.innerHTML = "Your Score: "+ score;
}