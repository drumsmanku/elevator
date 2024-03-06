document.addEventListener('DOMContentLoaded', () => {
    const elevator = document.getElementById('elevator');
    const FLOOR_HEIGHT = window.innerHeight / 3; // Assuming 3 floors
    let queue = []; // Queue to manage floor requests
    let currentFloor = 0; // Ground floor
    let moving = false; // Flag to check if the elevator is currently moving

    // Event listeners for buttons
    document.getElementById('up0').addEventListener('click', () => addToQueue(1));
    document.getElementById('up1').addEventListener('click', () => addToQueue(2));
    document.getElementById('down1').addEventListener('click', () => addToQueue(0));
    document.getElementById('down2').addEventListener('click', () => addToQueue(1));

    function addToQueue(floor) {
        if (!moving && currentFloor !== floor && !queue.includes(floor)) {
            queue.push(floor);
            processQueue();
        }
    }

    function processQueue() {
        if (moving || queue.length === 0) return;
        const nextFloor = queue.shift(); // Get the next floor from the queue
        moveElevatorTo(nextFloor);
    }

    function moveElevatorTo(floor) {
        moving = true;
        const duration = Math.abs(floor - currentFloor) * 5000; // 5 seconds per floor
        elevator.style.transition = `bottom ${duration}ms`;
        elevator.style.bottom = `${floor * FLOOR_HEIGHT}px`;

        setTimeout(() => {
            currentFloor = floor;
            moving = false;
            processQueue(); // Process the next request in the queue
        }, duration);
    }
});
