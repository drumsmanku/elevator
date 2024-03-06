document.getElementById('up0').addEventListener('click', () => {
    // Start moving towards level 2 but might stop at level 1 if button there is pressed
    moveElevator(2, true);
  });
  document.getElementById('up1').addEventListener('click', () => {
    if (currentLevel === 0) {
      // If the elevator is at ground level and moving up, register an intermediate stop
      requestStopAtLevel1 = true;
    } else {
      // Otherwise, move directly to level 2
      moveElevator(2, false);
    }
  });
  document.getElementById('down2').addEventListener('click', () => moveElevator(1, false));
  document.getElementById('down1').addEventListener('click', () => moveElevator(0, false));
  
  let currentLevel = 0;
  let requestStopAtLevel1 = false; // New flag to indicate if stop at level 1 is requested
  
  function moveElevator(targetLevel, checkIntermediateStop) {
    if (checkIntermediateStop && targetLevel === 2 && requestStopAtLevel1) {
      // If moving to level 2 and an intermediate stop at level 1 was requested, stop there first
      setTimeout(() => {
        moveToLevel(1);
        requestStopAtLevel1 = false; // Reset the request flag after stopping
        // After a brief pause, continue to level 2
        setTimeout(() => {
          moveToLevel(2);
        }, 2000); // Adjust the delay as needed
      }, calculateSpeed(1)); // Speed to move from current level to level 1
    } else {
      // Move directly to the target level if no intermediate stop is required
      moveToLevel(targetLevel);
    }
  }
  
  function moveToLevel(targetLevel) {
    const elevator = document.getElementById('elevator');
    let distance = Math.abs(targetLevel - currentLevel) * 100; // each level is 100px apart
    let speed = calculateSpeed(distance);
  
    elevator.style.transition = `bottom ${speed}ms linear`;
    elevator.style.bottom = `${targetLevel * 100}px`;
  
    currentLevel = targetLevel;
  }
  
  function calculateSpeed(distance) {
    // Calculate speed based on distance
    return distance === 100 ? 5000 : 10000; // Adjust speeds as necessary
  }
  