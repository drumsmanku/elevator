document.addEventListener('DOMContentLoaded', () => {
    const elevator = document.getElementById('elevator');
    let targetFloors = []; // Floors where the elevator needs to stop
    let currentFloor = 0; // Ground floor
    let moving = false; // Flag to check if the elevator is currently moving
  
    const FLOOR_HEIGHT = window.innerHeight / 3; // Assuming 3 floors
    const SPEED = 2000; // Time in ms to travel between floors, adjusted for more precise control
  
    // Adjusted event listeners for conditional logic
    document.getElementById('up0').addEventListener('click', () => requestFloor(1, true));
    document.getElementById('up1').addEventListener('click', () => requestFloor(2, true));
    document.getElementById('down1').addEventListener('click', () => requestFloor(1, false));
    document.getElementById('down2').addEventListener('click', () => requestFloor(0, false));
  
    function requestFloor(floor, goingUp) {
      if (!targetFloors.includes(floor)) {
        targetFloors.push({ floor: floor, upwardMovement: goingUp });
      }
      processNextFloor();
    }
  
    function processNextFloor() {
      if (targetFloors.length === 0 || moving) {
        // Either no requested floors or already processing a floor
        return;
      }
  
      moving = true; // Set moving flag to true
      let targetFloorInfo = targetFloors.shift(); // Retrieve next target floor and its direction
  
      // Calculate duration based on current and target floors
      let duration = Math.abs(targetFloorInfo.floor - currentFloor) * SPEED;
  
      console.log(`Moving to floor ${targetFloorInfo.floor}`);
  
      // Move the elevator visually
      moveElevatorTo(targetFloorInfo.floor * FLOOR_HEIGHT, duration, () => {
        console.log(`Arrived at floor ${targetFloorInfo.floor}`);
        currentFloor = targetFloorInfo.floor;
  
        // Check conditions to stop at level 1
        checkAndProcessIntermediateStop(targetFloorInfo, () => {
          moving = false; // Clear moving flag after delay to allow intermediate processing
          if (targetFloors.length > 0) {
            processNextFloor(); // Process next target if any
          }
        });
      });
    }
  
    function checkAndProcessIntermediateStop(targetFloorInfo, callback) {
      // If moving from ground to 2nd and have not stopped at 1st, or moving from 2nd to ground without stopping at 1st
      if ((targetFloorInfo.floor === 2 && currentFloor === 0) || (targetFloorInfo.floor === 0 && currentFloor === 2)) {
        let shouldStopAtFirst = targetFloors.findIndex(floorInfo => floorInfo.floor === 1) !== -1;
        if (!shouldStopAtFirst) {
          // Remove any pending stop at 1st floor if it doesn't match the direction
          targetFloors = targetFloors.filter(floorInfo => floorInfo.floor !== 1);
        }
        // Delay to simulate processing time
        setTimeout(callback, 500);
      } else {
        callback();
      }
    }
  
    function moveElevatorTo(position, duration, callback) {
      elevator.style.transition = `bottom ${duration}ms`;
      elevator.style.bottom = `${position}px`;
    
      setTimeout(() => {
        callback && callback();
      }, duration);
    }
  });
  