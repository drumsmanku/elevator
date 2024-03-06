document.addEventListener('DOMContentLoaded', () => {
    const elevator = document.getElementById('elevator');
    let requestedFloors = []; // Specific requests
    let currentFloor = 0; // Ground floor
    let moving = false; // Flag to check if the elevator is currently moving

    const FLOOR_HEIGHT = window.innerHeight / 3; // Assuming 3 floors
    const SPEED = 5000; // Speed for one floor in milliseconds

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
        console.log('Processing requests:', requestedFloors);
        if (moving || !requestedFloors.length) return;
    
        // Sort requests based on direction and proximity to current floor
        requestedFloors.sort((a, b) => {
            if (a.direction === 'up') {
                return a.floor - b.floor; // Ascending for 'up'
            } else {
                return b.floor - a.floor; // Descending for 'down'
            }
        });
    
        // Find the next floor to move to based on the direction
        let nextFloor = requestedFloors[0].floor;
    
        // Check if the next floor should be skipped
        if ((nextFloor === 1 && !document.getElementById('up1').classList.contains('pressed')) ||
            (nextFloor === 1 && !document.getElementById('down1').classList.contains('pressed'))) {
            // Remove the request for the next floor and process the next request
            requestedFloors.shift();
            processRequests();
            return;
        }
    
        console.log('Moving to floor:', nextFloor);
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
            document.querySelectorAll('.buttons button').forEach(button => button.classList.remove('pressed'));
        // Add 'pressed' class to the button of the current floor
            document.getElementById(`up${currentFloor}`).classList.add('pressed');
            document.getElementById(`down${currentFloor}`).classList.add('pressed');
        }, duration);
    }
});
