document.getElementById('up0').addEventListener('click', () => moveElevator(2));
document.getElementById('up1').addEventListener('click', () => { up1Pressed = true; });
document.getElementById('down2').addEventListener('click', () => moveElevator(1, true));
document.getElementById('down1').addEventListener('click', () => { down1Pressed = true; });



let currentLevel = 0;
let up1Pressed = false;
let down1Pressed = false;


function moveElevator(targetLevel, isDownPressed = false) {
  const elevator = document.getElementById('elevator');

  // Determine the initial speed and distance based on the current and target levels
  let distance = Math.abs(targetLevel - currentLevel) * 100; 
  let speed = distance === 100 ? 5000 : 10000; // Default speed adjustments

  if (currentLevel === 0 && targetLevel === 2 && !up1Pressed) {
    // Going up directly from ground to level 2 without stopping
    speed = 10000; 
  }

  if (currentLevel === 2 && targetLevel === 0 && !down1Pressed) {
    // Coming down directly from level 2 to ground without stopping
    speed = 10000;
  }

  // Adjust behavior based on elevator's current motion and button presses
  const checkIntermediateStop = () => {
    if (currentLevel < targetLevel && up1Pressed) {
      // If moving up and up1 button is pressed, stop at level 1
      targetLevel = 1;
      speed = 5000;
    } else if (currentLevel > targetLevel && down1Pressed) {
      // If moving down and down1 button is pressed, stop at level 1
      targetLevel = 1;
      speed = 5000;
    }
  };

  checkIntermediateStop();

  elevator.style.transition = `bottom ${speed}ms linear`;
  elevator.style.bottom = `${targetLevel * 100}px`;

  // After movement delay, update current level and reset flags
  setTimeout(() => {
    currentLevel = targetLevel;
    up1Pressed = false;
    down1Pressed = false;
  }, speed);
}
