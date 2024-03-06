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
        if (!requestedFloors.some(request => request.floor === floor)) {
            requestedFloors.push({ floor, direction });
        }
        processRequests();
    }

    function processRequests() {
        if (moving || !requestedFloors.length) return;

        // Find the next floor to move to based on the direction
        let nextFloor;
        if (requestedFloors[0].direction === 'up') {
            nextFloor = Math.min(...requestedFloors.filter(r => r.direction === 'up').map(r => r.floor));
        } else {
            nextFloor = Math.max(...requestedFloors.filter(r => r.direction === 'down').map(r => r.floor));
        }

        // Move if the next floor is different from the current floor
        if (nextFloor !== currentFloor) {
            moveElevatorTo(nextFloor);
        }
    }

    function moveElevatorTo(floor) {
        moving = true;
        let duration = SPEED * Math.abs(floor - currentFloor);
        elevator.style.transition = `bottom ${duration}ms`;
        elevator.style.bottom = `${floor * FLOOR_HEIGHT}px`;

        setTimeout(() => {
            currentFloor = floor;
            moving = false;
            requestedFloors = requestedFloors.filter(request => request.floor !== floor);
            processRequests();
        }, duration);
    }
});
