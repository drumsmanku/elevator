document.addEventListener('DOMContentLoaded', () => {
    const elevator = document.getElementById('elevator');
    let requestedFloors = []; // Specific requests
    let currentFloor = 0; // Ground floor
    let moving = false; // Flag to check if the elevator is currently moving

    const FLOOR_HEIGHT = window.innerHeight / 3; // Assuming 3 floors
    const SPEED = 5000; // Speed for one floor

    // Adjust event listeners and requests processing
    document.getElementById('up0').addEventListener('click', () => requestFloor(1, 'up'));
    document.getElementById('up1').addEventListener('click', () => requestFloor(2, 'up'));
    document.getElementById('down1').addEventListener('click', () => requestFloor(0, 'down'));
    document.getElementById('down2').addEventListener('click', () => requestFloor(1, 'down'));

    function requestFloor(floor, direction) {
        if (!requestedFloors.some(request => request.floor === floor && request.direction === direction)) {
            requestedFloors.push({ floor, direction });
        }
        // Sort by floor number, then by direction for same floor requests
        requestedFloors.sort((a, b) => a.floor - b.floor || a.direction.localeCompare(b.direction));
        if (!moving) processNextFloor();
    }

    function processNextFloor() {
        if (requestedFloors.length === 0) return;

        let nextRequest = requestedFloors.find(request => request.floor !== currentFloor);
        if (!nextRequest) return; // No more requests for other floors

        moving = true; // Start moving
        let nextFloor = nextRequest.floor;

        // Calculate duration based on the number of floors to move
        let duration = SPEED * Math.abs(nextFloor - currentFloor);
        console.log(`Moving to floor ${nextFloor}`);

        moveElevatorTo(nextFloor * FLOOR_HEIGHT, duration, () => {
            console.log(`Arrived at floor ${nextFloor}`);
            currentFloor = nextFloor;
            moving = false; // Elevator stopped

            // Remove the processed request
            requestedFloors = requestedFloors.filter(request => request.floor !== currentFloor);

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
