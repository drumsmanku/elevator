let upPressedOn1 = false;
let downPressedOn1 = false;

document.getElementById('up0').addEventListener('click', () => moveElevator(2, true));
document.getElementById('up1').addEventListener('click', () => upPressedOn1 = true);
document.getElementById('down2').addEventListener('click', () => moveElevator(0, false));
document.getElementById('down1').addEventListener('click', () => downPressedOn1 = true);

function moveElevator(targetLevel, goingUp) {
  let timeouts = goingUp ? [5000, 10000] : [5000, 0]; // [First Stop Timeout, Second Stop Timeout]
  let firstStop = goingUp ? 1 : 1;
  
  // Determine whether to stop at level 1 based on the direction and button presses
  if (goingUp && upPressedOn1 || !goingUp && downPressedOn1) {
    // Stop at level 1
    setTimeout(() => { elevatorToLevel(firstStop); }, timeouts[0]);
    setTimeout(() => { elevatorToLevel(targetLevel); }, timeouts[1]);
  } else {
    // Direct to level 2 or Ground without stopping at level 1
    let directTimeout = goingUp ? 10000 : 10000; // Adjusted to go directly to the final target
    setTimeout(() => { elevatorToLevel(targetLevel); }, directTimeout);
  }

  // Reset button states
  upPressedOn1 = false;
  downPressedOn1 = false;
}

function elevatorToLevel(level, timeout = 5000) {
  const elevator = document.getElementById('elevator');
  elevator.style.transition = `bottom ${timeout}ms linear`;
  elevator.style.bottom = `${level * 100}px`; // Assuming each level's height is 100px
}
