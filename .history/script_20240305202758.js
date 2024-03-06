document.getElementById('up0').addEventListener('click', () => moveElevator(1));
document.getElementById('up1').addEventListener('click', () => moveElevator(2));
document.getElementById('down2').addEventListener('click', () => moveElevator(1, true));
document.getElementById('down1').addEventListener('click', () => moveElevator(0));

let currentLevel = 0;

function moveElevator(targetLevel, upButtonPressed = false) {
  const elevator = document.getElementById('elevator');
  const distance = Math.abs(targetLevel - currentLevel) * 100;

  let speed;

  if (upButtonPressed) {
    if (currentLevel === 0 && targetLevel === 1) {
      // If UP button pressed on level 0, stop at level 1
       // 5 seconds to reach level 1
    } else if (currentLevel === 1 && targetLevel === 2) {
      // If UP button pressed on level 1, proceed directly to level 2
      speed = 10000; // 10 seconds to reach level 2
    } else {
      // If UP button pressed on level 2 or any other scenario, proceed directly to the requested level
      speed = 10000; // 10 seconds to reach the requested level
    }
  } else {
    // If DOWN button pressed, calculate speed based on distance
    speed = distance === 100 ? 5000 : 10000;
  }

  elevator.style.transition = `bottom ${speed}ms linear`;
  elevator.style.bottom = `${targetLevel * 100}px`;

  currentLevel = targetLevel;
}
