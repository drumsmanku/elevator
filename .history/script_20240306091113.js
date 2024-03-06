document.getElementById('up0').addEventListener('click', () => {
    moveElevator(2); // Intent to move to level 2, but might stop at level 1 if requested
  });
  document.getElementById('up1').addEventListener('click', () => {
    // Handle up button press at level 1
    if (currentLevel === 0 && !moving) {
      // The elevator is at ground level and not yet moving
      requestStopAtLevel1 = true;
    } else if (currentLevel === 0 && moving) {
      // If the elevator has already started moving
      requestStopAtLevel1 = true;
      // No immediate action needed, will check flag while moving
    } else {
      // For any condition not covered above, move directly to level 2
      moveElevator(2);
    }
  });
  document.getElementById('down2').addEventListener('click', () => moveElevator(1));
  document.getElementById('down1').addEventListener('click', () => moveElevator(0));
  
  let currentLevel = 0;
  let moving = false; // Flag to indicate if the elevator is currently moving
  let requestStopAtLevel1 = false; // Flag to indicate if stop at level 1 is requested
  
  function moveElevator(targetLevel) {
    moving = true; // Set the moving flag to true as we begin to move
    if (targetLevel === 2 && requestStopAtLevel1) {
      // Mimic stopping at level 1 before continuing to level 2
      performMove(1).then(() => {
        requestStopAtLevel1 = false; // Reset the request flag after stopping
        // Continue to level 2 after a brief pause
        setTimeout(() => performMove(2), 1000); // Pause at level 1 for a bit before continuing
      });
    } else {
      // Move directly to the target level if no intermediate stop is required
      performMove(targetLevel);
    }
  }
  
  function performMove(targetLevel) {
    return new Promise((resolve) => {
      const elevator = document.getElementById('elevator');
      let distance = Math.abs(targetLevel - currentLevel) * 100; // Each level is 100px apart
      let speed = calculateSpeed(distance);
  
      elevator.style.transition = `bottom ${speed}ms linear`;
      elevator.style.bottom = `${targetLevel * 100}px`;
  
      // Wait for the transition to end before resolving the promise
      setTimeout(() => {
        currentLevel = targetLevel; // Update the current level
        moving = false; // Reset the moving flag after the move is complete
        resolve();
      }, speed);
    });
  }
  
  function calculateSpeed(distance) {
    // Calculate speed based on distance
    return distance === 100 ? 5000 : 10000; // 5 seconds for 1 level, 10 seconds for 2 levels
  }
  