document.addEventListener('DOMContentLoaded', () => {
    const elevator = document.getElementById('elevator');
    const FLOOR_HEIGHT = window.innerHeight / 3; // Assuming 3 floors
    let queue = []; // Queue to manage floor requests
    let currentFloor = 0; // Ground floor
    let moving = false; // Flag to check if the elevator is currently moving
    let direction = null; // Direction of movement: 'up' or 'down'

    // Event listeners for buttons
    document.getElementById('up0').addEventListener('click', () => addToQueue(1, 'up'));
    document.getElementById('up1').addEventListener('click', () => addToQueue(2, 'up'));
    document.getElementById('down1').addEventListener('click', () => addToQueue(0, 'down'));
    document.getElementById('down2').addEventListener('click', () => addToQueue(1, 'down'));

    function addToQueue(floor, dir) {
        if (!queue.includes(floor)) {
            queue.push({ floor, dir });
            processQueue();
        }
    }

    function processQueue() {
        if (moving || queue.length === 0) return;
        const nextRequest = queue.shift(); // Get the next request from the queue
        moveElevatorTo(nextRequest.floor, nextRequest.dir);
    }

    function moveElevatorTo(floor, dir) {
        if (currentFloor === floor) return; // Already on the requested floor
        if (dir !== direction && moving) return; // Ignore requests against current direction

        moving = true;
        direction = dir; // Set the direction of movement
        const duration = Math.abs(floor - currentFloor) * 5000; // 5 seconds per floor
        elevator.style.transition = `bottom ${duration}ms`;
        elevator.style.bottom = `${floor * FLOOR_HEIGHT}px`;

        setTimeout(() => {
            currentFloor = floor;
            moving = false;
            direction = null; // Reset direction after stopping
            processQueue(); // Process the next request in the queue
        }, duration);
    }
});
