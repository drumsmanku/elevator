document.addEventListener('DOMContentLoaded', function() {
    let currentLevel = 0;
    let requestUpFromLevel1 = false;
    let requestDownFromLevel1 = false;

    document.getElementById('up0').addEventListener('click', () => moveElevator(1));
    document.getElementById('up1').addEventListener('click', () => requestUpFromLevel1 = true);
    document.getElementById('down1').addEventListener('click', () => requestDownFromLevel1 = true);
    document.getElementById('down2').addEventListener('click', () => moveElevator(1));

    function moveElevator(targetLevel) {
      // Calculate the duration it takes for the elevator to move based on the target level
      const duration = (Math.abs(targetLevel - currentLevel) === 1) ? 5000 : 10000;
      const elevator = document.getElementById('elevator');

      // Move the elevator
      elevator.style.transition = `bottom ${duration}ms linear`;
      elevator.style.bottom = `${targetLevel * 100}px`;

      setTimeout(() => {
        currentLevel = targetLevel;
        checkIntermediateStop();
      }, duration);
    }

    // Checks if an intermediate stop at level 1 is required based on button presses
    function checkIntermediateStop() {
      if (currentLevel === 2 && requestDownFromLevel1) {
        // If coming down from level 2 and the DOWN button was pressed at level 1
        setTimeout(() => moveElevator(1), 1000); // delay for any potential changes, e.g., button presses
        requestDownFromLevel1 = false; // Reset the request
      } else if (currentLevel === 0 && requestUpFromLevel1) {
        // If moving up from ground and the UP button was pressed at level 1
        setTimeout(() => moveElevator(1), 5000); // Takes 5 seconds to reach level 1
        requestUpFromLevel1 = false; // Reset the request
      }
    }
});
