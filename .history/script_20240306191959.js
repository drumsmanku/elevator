document.addEventListener('DOMContentLoaded', () => {
    const elevator = document.getElementById('elevator');
    let requestedFloors = []; // Specific requests
    let currentFloor = 0; // Ground floor
    let moving = false; // Flag to check if the elevator is currently moving

    const FLOOR_HEIGHT = window.innerHeight / 3; // Assuming 3 floors
    const SPEED = 5000; // Speed for one floor

    // Adjust event listeners and requests processing
    document.getElementById('up0').addEventListener('click', () => requestFloor(2));
    document.getElementById('up1').addEventListener('click', () => requestFloor(2));
    document.getElementById('down1').addEventListener('click', () => requestFloor(0));
    document.getElementById('down2').addEventListener('click', () => requestFloor(0));

    function requestFloor(floor) {
        if (!requestedFloors.includes(floor)) {
            requestedFloors.push(floor);
        }
        requestedFloors.sort((a, b) => a - b); // Sort immediately to handle priority
        if (!moving) processNextFloor();
    }

    function processNextFloor() {
        if (requestedFloors.length === 0 || moving) return;

        moving = true; // Start moving
        let nextFloor = requestedFloors.shift(); // Always take the next floor in the sorted array

        // Calculate duration based on the number of floors to move
        let duration = SPEED * Math.abs(nextFloor - currentFloor);
        console.log(`Moving to floor ${nextFloor}`);

        moveElevatorTo(nextFloor * FLOOR_HEIGHT, duration, () => {
            console.log(`Arrived at floor ${nextFloor}`);
            currentFloor = nextFloor;
            moving = false; // Elevator stopped

            // Immediate attempt to process the next requested floor
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
