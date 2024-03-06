// Variables to keep track of button presses
let upPressedOn1 = false;
let downPressedOn1 = false;

// Button event listeners
document.getElementById('up0').addEventListener('click', () => moveElevator(1, 5000));
document.getElementById('up1').addEventListener('click', () => upPressedOn1 = true);
document.getElementById('down2').addEventListener('click', () => moveElevator(1, 5000));
document.getElementById('down1').addEventListener('click', () => downPressedOn1 = true);

function moveElevator(targetLevel, initialTimeout) {
  // Clear any previous conditions
  upPressedOn1 = false;
  downPressedOn1 = false;

  setTimeout(() => {
    if(targetLevel === 1) {
      // If moving to level 1, check conditions
      if (upPressedOn1) {
        elevatorToLevel(1);
      } else {
        // Skip to level 2 or Ground based on the direction of movement
        elevatorToLevel(initialTimeout === 5000 ? 2 : 0, initialTimeout === 5000 ? 10000 : 5000);
      }
    }
    else {
      elevatorToLevel(targetLevel);
    }
  }, initialTimeout);
}

function elevatorToLevel(level, timeout = 0) {
  const elevator = document.getElementById('elevator');
  elevator.style.transition = `bottom ${timeout || 5000}ms linear`;
  elevator.style.bottom = `${level * 100}px`; // Assuming each level's height is 100px
}
