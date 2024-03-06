document.getElementById('up0').addEventListener('click', () => {
    moveElevator(2);
});

document.getElementById('up1').addEventListener('click', () => {
    requestStopAtLevel1 = true;
    if (!moving) { // If the elevator is not moving, move it to level 1 directly.
        moveElevator(1);
    }
    // If the elevator is moving, the flag alone will ensure it stops at level 1.
});

document.getElementById('down2').addEventListener('click', () => moveElevator(1));
document.getElementById('down1').addEventListener('click', () => moveElevator(0));

let currentLevel = 0;
let moving = false;
let requestStopAtLevel1 = false;

function moveElevator(targetLevel) {
    if (moving && targetLevel === 2 && requestStopAtLevel1 && currentLevel === 0) {
        // If already moving to 2 but got a late request for 1, adjust the target to 1 first.
        targetLevel = 1;
    }
    moving = true;
    performMove(targetLevel).then(() => {
        if (targetLevel === 1 && requestStopAtLevel1) {
            // Now check if we need to proceed to level 2 after stopping at 1.
            requestStopAtLevel1 = false; // Clear the request as it's being honored
            if (currentLevel === 1) {
                setTimeout(() => { performMove(2); }, 1000);
            }
        };
    });
}



function performMove(targetLevel) {
    return new Promise((resolve) => {
        const elevator = document.getElementById('elevator');
        let distance = Math.abs(targetLevel - currentLevel) * 100;
        let speed = calculateSpeed(distance);

        elevator.style.transition = `bottom ${speed}ms linear`;
        elevator.style.bottom = `${targetLevel * 100}px`;

        setTimeout(() => {
            currentLevel = targetLevel;
            moving = false;
            resolve();
        }, speed);
    });
}

function calculateSpeed(distance) {
    return distance === 100 ? 5000 : 10000;
}
