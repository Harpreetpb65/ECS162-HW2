var isPaused = false;

document.body.onkeydown = function( e ) {
    var keys = {
        37: 'left',
        39: 'right',
        40: 'down',
        38: 'rotate',
        32: 'drop'
    };
    if ( typeof keys[ e.keyCode ] != 'undefined' ) {
        keyPress( keys[ e.keyCode ] );
        render();
    }
};

function pauseButtonClicked() {
    if (!isPaused) {
        clearInterval(interval);
        clearInterval(intervalRender);
        isPaused = true;
        document.getElementById("pausebutton").textContent = "Resume";
    } else {
        interval = setInterval(tick, 400);
        intervalRender = setInterval(render, 30);
        isPaused = false;
        document.getElementById("pausebutton").textContent = "Pause";
    }
}