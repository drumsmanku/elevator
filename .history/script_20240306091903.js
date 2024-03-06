document.getElementById('up0').addEventListener('click', () => {
    if (!requestStopAtLevel1) { // If there's no request to stop at level 1, move directly to level 2.
        moveElevator(2);
    } else {
        moveElevator(1); // Otherwise, make sure we stop at level 1 first.
    }
});

document.getElementById('up1').addEventListener('click', () => {
    requestStopAtLevel1 = true; // This button press always requests a stop at level 1.
    if (currentLevel === 0 && moving) {
        // If the elevator has already started moving from the ground, no need to call moveElevator here.
    } else if (currentLevel === 0 && !moving) {
        // If on the ground level and not moving, begin the movement.
        moveElevator(1);
    } else {
        moveElevator(2);
    }
});

document.getElementById('down2').addEventListener('click', () => moveElevator(1));
document.getElementById('down1').addEventListener('click', () => moveElevator(0));

let currentLevel = 0;
let moving = false; // Indicates if the elevator is currently moving
let requestStopAtLevel1 = false; // Indicates if a stop at level 1 is requested

function moveElevator(targetLevel) {
    moving = true;
    performMove(targetLevel).then(() => {
        if (targetLevel === 1 && requestStopAtLevel1 && currentLevel === 1) {
            // Upon stopping or passing by level 1, reset the request and check if we need to move further.
            requestStopAtLevel1 = false; // Reset the stop request at level 1 as we've now satisfied it
            if (targetLevel < 2) {
                setTimeout(() => performMove(2), 1000); // Continue to level 2 after a brief pause
            }
        }
    });
}

function performMove(targetLevel) {
    return new Promise((resolve) => {
        const elevator = document.getElementById('elevator');
        let distance = Math.abs(targetLevel - currentLevel) * 100; // Distance calculation
        let speed = calculateSpeed(distance);

        elevator.style.transition = `bottom ${speed}ms linear`;
        elevator.style.bottom = `${targetLevel * 100}px`;

        setTimeout(() => {
            currentLevel = targetLevel; // Update the current level
            moving = false; // Elevator movement complete
            resolve();
        }, speed);
    });
}

function calculateSpeed(distance) {
    return distance === 100 ? 5000 : 10000; // Speed calculation
}
