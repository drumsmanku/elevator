document.getElementById('up0').addEventListener('click', () => moveElevator(2));
// Modify the up1 event listener to set the flag when clicked
document.getElementById('up1').addEventListener('click', () => { up1Pressed = true; moveElevator(2); });
document.getElementById('down2').addEventListener('click', () => moveElevator(1, true));
// Ensure to reset the flag to false when moving down from level 2
document.getElementById('down1').addEventListener('click', () => { up1Pressed = false; moveElevator(0); });


let currentLevel = 0;
let up1Pressed = false;

function moveElevator(targetLevel, upButtonPressed = false) {
  const elevator = document.getElementById('elevator');
  // This check modifies the target level if coming from ground and up1 wasn't pressed
  if (currentLevel === 0 && targetLevel === 2 && !up1Pressed) {
    // If up1 wasn't pressed, skip level 1
    targetLevel = 2;
  } else if (currentLevel === 0 && targetLevel === 2 && up1Pressed) {
    targetLevel = 1; // If up1 was pressed, go to level 1 first
  }
  
  const distance = Math.abs(targetLevel - currentLevel) * 100;
  let speed;
  if (upButtonPressed) {
    if (currentLevel === 0 && targetLevel !== 1) {
      speed = 10000;
    } else {
      speed = 5000;
    }
  } else {
    speed = distance === 100 ? 5000 : 10000;
  }
  
  elevator.style.transition = `bottom ${speed}ms linear`;
  elevator.style.bottom = `${targetLevel * 100}px`;
  
  currentLevel = targetLevel;
  // After moving, if we reached level 2 directly or stopped at level 1, reset the flag
  if (currentLevel === 1 || currentLevel === 2) {
    up1Pressed = false;
  }
}
