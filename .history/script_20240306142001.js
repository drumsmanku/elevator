document.addEventListener('DOMContentLoaded', () => {
    const elevator = document.getElementById('elevator');
    let targetFloors = []; // Floors where the elevator needs to stop
    let requestedFloors = []; // Specific requests
    let currentFloor = 0; // Ground floor
    let moving = false; // Flag to check if the elevator is currently moving
  
    const FLOOR_HEIGHT = window.innerHeight / 3; // Assuming 3 floors
    const SPEED = 2000; // Adjusted for different speeds between floors
  
    // Adjust event listeners and requests processing
    document.getElementById('up0').addEventListener('click', () => requestFloor(1));
    document.getElementById('up1').addEventListener('click', () => requestFloor(2));
    document.getElementById('down1').addEventListener('click', () => requestFloor(0));
    document.getElementById('down2').addEventListener('click', () => requestFloor(0));
  
    function requestFloor(floor) {
        if (!requestedFloors.includes(floor)) {
            requestedFloors.push(floor);
        }
        // Only if not moving, process next floor immediately
        if (!moving) processNextFloor();
    }
  
    function processNextFloor() {
        if (requestedFloors.length === 0) return;
        if (moving) return;

        moving = true; // Start moving

        // Sort floor requests based on the current direction
        let nextFloor;
        requestedFloors = requestedFloors.sort((a, b) => a - b);
        if (requestedFloors[0] > currentFloor) {
            // Moving up
            nextFloor = requestedFloors.shift();
        } else {
            // Moving down
            nextFloor = requestedFloors.pop();
        }
  
        // Calculate duration based on direction
        let duration = (Math.abs(nextFloor - currentFloor) === 1 ? SPEED : SPEED * 2);
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
