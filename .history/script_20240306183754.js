document.addEventListener('DOMContentLoaded', () => {
    const elevator = document.getElementById('elevator');
    let requestedFloors = [];
    let currentFloor = 0;
    let moving = false;

    const FLOOR_HEIGHT = window.innerHeight / 3;
    const SPEED = 5000;
    const localStorageKey = 'elevatorState';

    // Load elevator state from localStorage
    const savedState = JSON.parse(localStorage.getItem(localStorageKey)) || {};

    document.getElementById('up0').addEventListener('click', () => requestFloor(2));
    document.getElementById('up1').addEventListener('click', () => requestFloor(2));
    document.getElementById('down1').addEventListener('click', () => requestFloor(1));
    document.getElementById('down2').addEventListener('click', () => requestFloor(0));

    function requestFloor(floor) {
        if (floor === 0 && requestedFloors.length === 0) {
            if (!requestedFloors.includes(floor)) {
                requestedFloors.push(floor);
            }
        } else if (floor === 1) {
            if (!requestedFloors.includes(floor)) {
                requestedFloors.push(floor);
            }
        } else if (floor === 2 && requestedFloors.length === 0) {
            if (!requestedFloors.includes(floor)) {
                requestedFloors.push(floor);
            }
        }

        if (!moving) processNextFloor();
    }

    function processNextFloor() {
        if (requestedFloors.length === 0) return;
        if (moving) return;

        moving = true;

        let nextFloor;
        requestedFloors = requestedFloors.sort((a, b) => a - b);

        if (requestedFloors[0] > currentFloor) {
            nextFloor = requestedFloors.shift();
        } else {
            nextFloor = requestedFloors.pop();
        }

        let duration;

        if (nextFloor === 1 && (requestedFloors.includes(1) || requestedFloors.length === 0)) {
            duration = SPEED;
            // Set localStorage flag for stopping at level 1
            savedState.stopAtLevel1 = true;
        } else {
            duration = SPEED * 2;
            // Reset localStorage flag for stopping at level 1
            savedState.stopAtLevel1 = false;
        }

        console.log(`Moving to floor ${nextFloor}`);

        moveElevatorTo(nextFloor * FLOOR_HEIGHT, duration, () => {
            console.log(`Arrived at floor ${nextFloor}`);
            currentFloor = nextFloor;
            moving = false;

            // Save elevator state to localStorage
            localStorage.setItem(localStorageKey, JSON.stringify(savedState));

            processNextFloor();
        });
    }

    function moveElevatorTo(position, duration, callback) {
        elevator.style.transition = `bottom ${duration}ms`;
        elevator.style.bottom = `${position}px`;

        setTimeout(() => {
            if (callback) callback();
        }, duration);
    }
});
