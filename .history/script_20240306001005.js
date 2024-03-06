let currentFloor = 0;
let requestedFloors = []; // To keep track of which floors have been requested

function requestElevator(floor, direction) {
    if (!requestedFloors.includes(floor)) {
        requestedFloors.push(floor);
    }
    
    moveElevator();
}

function moveElevator() {
    if (requestedFloors.length === 0) return;

    const nextFloor = requestedFloors.shift(); // Get the next requested floor
    const elevator = document.getElementById("elevator");
    const floorHeight = document.querySelector(".floor").offsetHeight; // Assuming equal height for all floors

    // Calculate new bottom position
    let newBottom = nextFloor * floorHeight;

    elevator.style.bottom = `${newBottom}px`;

    currentFloor = nextFloor;

    // Simulate time taken to move between floors
    let timeTaken = Math.abs(nextFloor - currentFloor) * 5 * 1000; // 5 seconds per floor
    setTimeout(() => {
        if (requestedFloors.length > 0) moveElevator();
    }, timeTaken);
}
