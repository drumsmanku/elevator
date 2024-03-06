document.addEventListener('DOMContentLoaded', () => {
    const elevator = document.getElementById('elevator');
    let elevatorQueue = []; // Tracks elevator's stop requests
    let currentFloor = 0; // Starts at ground level

    // Elevator movement parameters
    const FLOOR_HEIGHT = window.innerHeight / 3;

    // Since the speed needs to vary based on the number of floors traversed,
    // define a function that calculates the travel time
    function calculateSpeed(currentFloor, targetFloor) {
        const floorDifference = Math.abs(targetFloor - currentFloor);
        return floorDifference * 5000; // 5 seconds per floor
    }

    // Modified to add a request regardless of direction, handling logic is in moveToFloor
    document.getElementById('up0').addEventListener('click', () => addFloorToQueue(2));
    document.getElementById('down2').addEventListener('click', () => addFloorToQueue(0));
    document.getElementById('up1').addEventListener('click', () => addFloorToQueue(2));
    document.getElementById('down1').addEventListener('click', () => addFloorToQueue(0));

    function addFloorToQueue(targetFloor) {
        // Check for duplicate request
        if (!elevatorQueue.includes(targetFloor)) {
            elevatorQueue.push(targetFloor);
            // No need to sort the queue based on direction as it's a simple up/down system
        }
        moveToNextFloor(); // Ensure we process any queued requests
    }

    function moveToNextFloor() {
        if (elevatorQueue.length === 0) return; // Exit if no work to do

        // Simple direct floor selection, assuming one movement direction per request
        const targetFloor = elevatorQueue.shift(); // Get first in line
        moveToFloor(targetFloor);
    }

    function moveToFloor(floor) {
        const speed = calculateSpeed(currentFloor, floor); // Calculate speed based on floor difference
        elevator.style.transition = `bottom ${speed}ms`;
        elevator.style.bottom = `${FLOOR_HEIGHT * (2 - floor)}px`; // Move to the calculated position

        setTimeout(() => {
            console.log(`Arrived at floor ${floor}`);
            currentFloor = floor; // Update current floor
            moveToNextFloor(); // Process next floor request
        }, speed);
    }
});
