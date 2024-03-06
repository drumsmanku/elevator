document.addEventListener('DOMContentLoaded', () => {
  const elevator = document.getElementById('elevator');
  let targetFloors = []; // Floors where the elevator needs to stop
  let currentFloor = 0; // Ground floor

  const FLOOR_HEIGHT = window.innerHeight / 3; // Assuming 3 floors
  const SPEED = 500; // Time in ms to travel between floors

  // Add event listeners to buttons
  document.getElementById('up0').addEventListener('click', () => moveToFloor(1));
  document.getElementById('up1').addEventListener('click', () => requestFloor(2));
  document.getElementById('down1').addEventListener('click', () => requestFloor(1));
  document.getElementById('down2').addEventListener('click', () => moveToFloor(0));

  function requestFloor(floor) {
    if (!targetFloors.includes(floor)) {
      targetFloors.push(floor);
      targetFloors.sort(); // Ensure floors are in ascending order
    }
    processNextFloor();
  }

  function moveToFloor(floor) {
    // No need to sort here as we move directly to a floor
    targetFloors.push(floor);
    processNextFloor();
  }

  function processNextFloor() {
    if (targetFloors.length === 0 || typeof moving !== 'undefined') {
      // Either no requested floors or already processing a floor
      return;
    }

    let nextFloor = targetFloors.shift();
    
    // Determine direction for logging purposes
    let direction = nextFloor > currentFloor ? 'up' : 'down';
    console.log(`Moving ${direction} to floor ${nextFloor}`);

    // Set moving flag to prevent other operations from interfering
    moving = true;
    moveElevatorTo(nextFloor * FLOOR_HEIGHT, () => {
      console.log(`Arrived at floor ${nextFloor}`);
      currentFloor = nextFloor;
      moving = false; // Clear moving flag
      if (targetFloors.length > 0) {
        processNextFloor(); // Process next floor in the queue
      }
    });
  }

  function moveElevatorTo(position, callback) {
    const duration = Math.abs(position - (currentFloor * FLOOR_HEIGHT)) / FLOOR_HEIGHT * SPEED;
    elevator.style.transition = `bottom ${duration}ms`;
    elevator.style.bottom = `${position}px`;

    setTimeout(() => {
      callback && callback();
    }, duration);
  }

});

