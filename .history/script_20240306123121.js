document.addEventListener('DOMContentLoaded', () => {
    const elevator = document.getElementById('elevator');
    let elevatorQueue = []; // Tracks elevator's stop requests
    let currentFloor = 0; // Starts at ground level
  
    // Elevator movement speed and floor height constants
    const FLOOR_HEIGHT = window.innerHeight / 3;
    const SPEED = 5000; // Time (in milliseconds) to move between floors
  
    // Add event listeners for UP and DOWN buttons
    document.getElementById('up0').addEventListener('click', () => processFloorRequest(2)); // From Ground to Level 2
    document.getElementById('down2').addEventListener('click', () => processFloorRequest(0)); // From Level 2 to Ground
  
    // For UP and DOWN on Level 1, add specific requests
    document.getElementById('up1').addEventListener('click', () => addFloorToQueue(1, 'up'));
    document.getElementById('down1').addEventListener('click', () => addFloorToQueue(1, 'down'));
  
    function processFloorRequest(targetFloor) {
      // Reset queue and directly process target floor for simplicity
      elevatorQueue = [{ floor: targetFloor, direct: true }];
      moveToNextFloor();
    }
  
    function addFloorToQueue(floor, direction) {
      if (!elevatorQueue.find(req => req.floor === floor)) {
        elevatorQueue.push({ floor: floor, direct: false, direction: direction });
        // Sort based on current movement direction
        elevatorQueue.sort((a, b) => (currentFloor <= floor ? a.floor - b.floor : b.floor - a.floor));
      }
    }
  
    function moveToNextFloor() {
      if (elevatorQueue.length === 0) return; // Nothing to do if the queue is empty
  
      let nextFloorRequest = elevatorQueue.shift(); // Get the next floor request
  
      if (nextFloorRequest.direct) {
        moveToFloor(nextFloorRequest.floor);
      } else {
        // Check if the elevator is passing by the requested floor
        if ((nextFloorRequest.direction === 'up' && nextFloorRequest.floor > currentFloor) || 
            (nextFloorRequest.direction === 'down' && nextFloorRequest.floor < currentFloor)) {
          moveToFloor(nextFloorRequest.floor);
        } else {
          moveToNextFloor(); // Skip and move to the next request if current direction doesn't match
        }
      }
    }
  
    function moveToFloor(floor) {
      let position = FLOOR_HEIGHT * (2 - floor); // Calculate new bottom position based on floor number
      elevator.style.transition = `bottom ${SPEED}ms`;
      elevator.style.bottom = `${position}px`;
  
      setTimeout(() => {
        console.log(`Arrived at floor ${floor}`);
        currentFloor = floor;
        moveToNextFloor(); // Proceed to next request after reaching the floor
      }, SPEED);
    }
  });
  