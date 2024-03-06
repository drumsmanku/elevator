document.addEventListener('DOMContentLoaded', () => {
    const elevator = document.getElementById('elevator');
    const FLOOR_HEIGHT = window.innerHeight / 3; // Assuming 3 floors
    let queue = []; // Queue to manage floor requests
    let currentFloor = 0; // Ground floor
    let moving = false; // Flag to check if the elevator is currently moving

    // Event listeners for buttons
    document.getElementById('up0').addEventListener('click', () => addToQueue(1));
    document.getElementById('up1').addEventListener('click', () => handleLevel1Up());
    document.getElementById('down1').addEventListener('click', () => handleLevel1Down());
    document.getElementById('down2').addEventListener('click', () => addToQueue(1));

    function addToQueue(floor) {
        if (!queue.includes(floor)) {
            queue.push(floor);
            processQueue();
        }
    }

    function handleLevel1Up() {
        if (currentFloor === 0 && !moving) {
            addToQueue(1);
        } else if (currentFloor === 2 && moving) {
            // If moving down from level 2 to ground, add level 1 to the queue
            addToQueue(1);
        }
    }

    function handleLevel1Down() {
        if (currentFloor === 2 && !moving) {
            addToQueue(1);
        } else if (currentFloor === 0 && moving) {
            // If moving up from ground to level 2, add level 1 to the queue
            addToQueue(1);
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
