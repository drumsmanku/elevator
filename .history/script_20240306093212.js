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
    moving = true;

    // Adjusting the target level if there is a pending stop request at level 1
    // Check if moving from ground level directly to level 2 but a stop at level 1 was requested
    if (currentLevel === 0 && targetLevel === 2 && requestStopAtLevel1) {
        targetLevel = 1; // Adjust target to stop at level 1 first
    }

    performMove(targetLevel).then(() => {
        moving = false; // Move completed, set moving to false
        
        // Check and handle a pending request to stop at level 1 after reaching the target
        if (requestStopAtLevel1) {
            // Clear the request as it's being examined
            requestStopAtLevel1 = false;

            // If the elevator is currently at level 1 and a request to move to level 2 exists, handle it
            if (currentLevel === 1) {
                setTimeout(() => { moveElevator(2); }, 1000);
            }
        } else if (currentLevel === 1 && targetLevel === 1) {
            // If the elevator just moved to level 1, check if it needs to continue to level 2
            if (!moving && !requestStopAtLevel1) {
                moveElevator(2);
            }
        }
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
